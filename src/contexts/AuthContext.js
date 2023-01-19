import { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/index";
import { getUserInfoApi } from "../api/user";
import { info } from "../utils/info";
import { REFRESH_TOKEN_API } from "../utils/requests";
import jwt_decode from "jwt-decode";

// CREATE CONTEXT
const AuthContext = createContext();

// CONTEXT HOOK
const useAuth = () => useContext(AuthContext);

// PROVIDER
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

  // LOGIN USER
  const loginUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoggingIn(true);
    setError(false);

    const email = event.target.username.value;
    const password = event.target.password.value;

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
      // REVIEW ERROR MESSAGE
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
  };

  const logoutUser = (callback) => {
    setAuthTokens(null);
    setUser(null);
    setError(false);

    // REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.removeItem(info.localStorageKeys.authToken);
    localStorage.removeItem(info.localStorageKeys.refreshToken);
    // REMOVE TOKEN FROM COOKIE
    // document.cookie = `${info.localStorageKeys.refreshToken}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    if (callback) callback();
  };

  // UPDATE TOKEN
  const updateToken = async () => {
    setLoading(true);
    setLoggingIn(false);
    setError(false);
    // console.log(authTokens.refreshToken);

    // FETCH NEW TOKEN FROM SERVER
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
  };

  useEffect(() => {
    if (loading) updateToken();

    // if(user) console.log(user)
    // auth.onAuthStateChanged((updatedUser) => {
    //   console.log(updatedUser);
    // });

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
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
