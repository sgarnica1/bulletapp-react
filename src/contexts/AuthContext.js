import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  updatePassword,
  updateCurrentUser,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/index";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { REFRESH_TOKEN_API } from "../utils/requests";
import { getUserInfoApi } from "../api/user";
import { postUserApi } from "../api/user";
import { info } from "../utils/info";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  // GET TOKEN FROM COOKIE AND SET IT TO STATE
  // const getTokenFromCookie = (name, callback) => {
  //   let refreshTokenCookie;
  //   try {
  //     // GET REFRESH TOKEN FROM COOKIE
  //     let cookies = document.cookie.split("=");
  //     // console.log(cookies);

  //     // VERIFY IF REFRESH TOKEN EXISTS
  //     cookies.forEach((value, index) => {
  //       if (value == name) {
  //         refreshTokenCookie = cookies[index + 1].split("expires")[0];
  //       }
  //     });
  //     // console.log(refreshTokenCookie);
  //     return refreshTokenCookie;
  //   } catch (err) {
  //     if (callback) callback();
  //     else console.log(err);
  //   }
  // };

  const getTokenFromLocalStorage = (name, callback) => {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (err) {
      if (callback) callback();
      else console.log(err);
    }
  };

  // VERIFY IF TOKEN EXISTS
  const tokensExist = localStorage.getItem(info.localStorageKeys.authToken)
    ? JSON.parse(localStorage.getItem(info.localStorageKeys.authToken))
    : null;

  const refreshTokenExist = localStorage.getItem(
    info.localStorageKeys.refreshToken
  )
    ? getTokenFromLocalStorage(info.localStorageKeys.refreshToken)
    : null;

  // VERIFY IF USER EXISTS
  let userExist = localStorage.getItem(info.localStorageKeys.authToken)
    ? jwt_decode(localStorage.getItem(info.localStorageKeys.authToken))
    : null;

  // INITIAL STATES
  const [authTokens, setAuthTokens] = useState({
    token: tokensExist,
    refreshToken: refreshTokenExist,
  });
  const [user, setUser] = useState(userExist);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [, setStoredMovements] = useLocalStorage(
    info.localStorageKeys.movements,
    []
  );
  const [, setStoredWodCategories] = useLocalStorage(
    info.localStorageKeys.wodCategories,
    []
  );

  // LOGIN USER
  async function loginUser(event, loginData, setErrorMessage) {
    if (event) event.preventDefault();
    setLoading(true);
    setLoggingIn(true);
    setErrorMessage(false);

    const email =
      loginData && loginData.email
        ? loginData.email
        : event.target.username.value;
    const password =
      loginData && loginData.password
        ? loginData.password
        : event.target.password.value;

    // FETCH DATA FROM SERVER
    try {
      let userCredentials = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      // GET USER CREDENTIALS
      userCredentials = userCredentials.user;
      // GET USER INFO
      userCredentials = await getUserInfoApi(
        userCredentials,
        userCredentials.uid
      );

      if (!userCredentials.emailVerified) {
        setErrorMessage("Tu cuenta no ha sido verificada");
        setLoading(false);
        setLoggingIn(false);
        return logoutUser();
      }

      if (!userCredentials.data.active) {
        console.log("here");
        setErrorMessage(
          "Tu cuenta no ha sido activada. Por favor contacta a tu coach"
        );
        setLoading(false);
        setLoggingIn(false);
        return logoutUser();
      }

      // SET USER
      setUser(userCredentials);

      // SET TOKENS
      setAuthTokens({
        token: userCredentials.stsTokenManager.accessToken,
        refreshToken: userCredentials.stsTokenManager.refreshToken,
      });

      // SET TOKEN ON LOCAL STORAGE
      localStorage.setItem(
        info.localStorageKeys.authToken,
        JSON.stringify(userCredentials.stsTokenManager.accessToken)
      );
      localStorage.setItem(
        info.localStorageKeys.refreshToken,
        JSON.stringify(userCredentials.stsTokenManager.refreshToken)
      );

      // SET REFRESH TOKEN ON COOKIE
      let date = new Date();
      date.setDate(date.getDate() + 1);
      document.cookie = `${info.localStorageKeys.refreshToken}=${userCredentials.stsTokenManager.refreshToken}; expires=${date}; path=/;`;

      setLoading(false);
      setLoggingIn(false);
    } catch (err) {
      console.log(err);
      console.log(err.message);

      setError("Ocurrió un error. Por favor intenta de nuevo");
      // Review error messages
      if (
        err.message === info.firebase.errors.auth.wrongPassword ||
        err.message === info.firebase.errors.auth.userNotFound ||
        err.message === info.firebase.errors.auth.invalidEmail
      ) {
        setError("Credenciales inválidas");
      }

      if (err.message === info.firebase.errors.auth.insufficientPermissions) {
        setError("No tienes permisos para acceder a esta aplicación");
      }

      setLoggingIn(false);
      setLoading(false);
    }
  }

  // REGISTER USER
  async function registerUser(event, data, setSuccess, callback) {
    if (event) event.preventDefault();
    setLoading(true);
    setError(false);
    let user;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      user = userCredential.user;
      await updateProfile(user, {
        displayName: data.displayName,
      });
      await sendEmailVerification(user);

      await postUserApi(user.uid, data);
      setSuccess(info.messages.success.userCreated);
      setLoading(false);
      callback();
    } catch (err) {
      console.log(err);
      setError(info.messages.error.errorWriting);
      setLoading(false);
      callback(err);
      throw err;
    }
  }

  // LOGOUT USER
  function logoutUser(callback) {
    // Clean states
    setAuthTokens(null);
    setUser(null);
    setError(false);

    // Logout from firebase
    updateCurrentUser(auth, null);

    // Clean local storage
    setStoredMovements([]);
    setStoredWodCategories([]);

    // Remove tokens
    localStorage.removeItem(info.localStorageKeys.authToken);
    localStorage.removeItem(info.localStorageKeys.refreshToken);
    // document.cookie = `${info.localStorageKeys.refreshToken}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    if (callback) callback();
  }

  // UPDATE PASSWORD
  function changePassword(
    newPassword,
    setSuccessMessage,
    setErrorMessage,
    setLoading,
    callback
  ) {
    const user = auth.currentUser;

    updatePassword(user, newPassword)
      .then(() => {
        setSuccessMessage(info.messages.success.passwordUpdated);
        setLoading(false);
        callback();
        return loginUser(null, { email: user.email, password: newPassword });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        return setErrorMessage(info.messages.error.errorUpdating);
      });
  }

  // SEND PASSWORD RESET EMAIL
  function sendPasswordReset(email, setSuccess, setError, callback) {

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
        callback();
      })
      .catch((error) => {
        callback();
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
  }

  // UPDATE TOKEN
  async function updateToken() {
    setLoading(true);
    setLoggingIn(false);
    setError(false);
    setStoredMovements([]);

    // Fetch new tokens
    try {
      const res = await fetch(
        `${REFRESH_TOKEN_API}${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=refresh_token&refresh_token=${authTokens?.refreshToken}`,
        }
      );
      const authData = await res.json();

      // OBTAIN DATA FROM TOKENS
      if (!authData.error) {
        // GET USER INFO
        const userCredentials = await getUserInfoApi(user, authData.user_id);
        if (
          userCredentials.emailVerified
            ? !userCredentials.emailVerified
            : !userCredentials.email_verified
        ) {
          setLoading(false);
          return logoutUser();
        }

        if (!userCredentials.data.active) {
          setLoading(false);
          return logoutUser();
        }

        // SET USER
        setUser(userCredentials);

        // SET NEW TOKENS
        setAuthTokens({
          token: authData.access_token,
          refreshToken: authData.refresh_token,
        });

        // SET TOKEN ON LOCAL STORAGE
        localStorage.setItem(
          info.localStorageKeys.authToken,
          JSON.stringify(authData.access_token)
        );

        localStorage.setItem(
          info.localStorageKeys.refreshToken,
          JSON.stringify(authData.refresh_token)
        );

        // SET REFRESH TOKEN ON COOKIE
        // let date = new Date();
        // date.setDate(date.getDate() + 1);
        // document.cookie = `${info.localStorageKeys.refreshToken}=${authData.refresh_token}; expires=${date}; path=/;`;

        setLoading(false);
        setLoggingIn(false);
      } else {
        // logoutUser();
        setLoggingIn(false);
      }
    } catch (err) {
      if (err.message === info.firebase.errors.auth.networkFailed) {
        setError("Error en la red");
      } else if (err.message === info.app.errors.fetchError) {
        setError(info.messages.error.fetchError);
      } else {
        setError(err.message);
        console.log(err);
      }
      setLoggingIn(false);
      // logoutUser();
    }
    if (loading) setLoading(false);
  }

  useEffect(() => {
    if (loading) updateToken();

    const fourMinutes = 1000 * 60 * 4; // FOUR MINUTES IN SECONDS

    const interval = setInterval(() => {
      if (authTokens) updateToken();
    }, fourMinutes);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        error,
        loading,
        loggingIn,
        loginUser,
        logoutUser,
        registerUser,
        changePassword,
        sendPasswordReset,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
