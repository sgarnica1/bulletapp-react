import { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore/lite";
import { db, auth } from "../firebase/index";
import { info } from "../utils/info";
import jwt_decode from "jwt-decode";

// CREATE CONTEXT
const AuthContext = createContext();

// CONTEXT HOOK
const useAuth = () => useContext(AuthContext);

// PROVIDER
const AuthProvider = ({ children }) => {
  // GET TOKEN FROM COOKIE AND SET IT TO STATE
  const getTokenFromCookie = (name, callback) => {
    let refreshTokenCookie;
    try {
      // GET REFRESH TOKEN FROM COOKIE
      let cookies = document.cookie.split("=");

      // VERIFY IF REFRESH TOKEN EXISTS
      cookies.forEach((value, index) => {
        if (value == name) {
          refreshTokenCookie = cookies[index + 1].split("expires")[0];
        }
      });
      return refreshTokenCookie;
    } catch (err) {
      if (callback) callback();
      else console.log(err);
    }
  };

  // VERIFY IF TOKEN EXISTS
  const tokensExist = localStorage.getItem(info.localStorageKeys.authToken)
    ? JSON.parse(localStorage.getItem(info.localStorageKeys.authToken))
    : null;

  // VERIFY IF USER EXISTS
  const userExist = localStorage.getItem(info.localStorageKeys.authToken)
    ? jwt_decode(localStorage.getItem(info.localStorageKeys.authToken))
    : null;

  // INITIAL STATES
  const [authTokens, setAuthTokens] = useState({
    token: tokensExist,
    refreshToken: getTokenFromCookie(info.localStorageKeys.refreshToken),
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

    const email = event.target.username.value;
    const password = event.target.password.value;

    // FETCH DATA FROM SERVER
    try {
      let userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // GET USER CREDENTIALS
      userCredentials = userCredentials.user;
      // GET USER INFO
      userCredentials = await getUserInfo(userCredentials, userCredentials.uid);

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

      // SET REFRESH TOKEN ON COOKIE
      let date = new Date();
      date.setDate(date.getDate() + 1);
      document.cookie = `${info.localStorageKeys.refreshToken}=${userCredentials.stsTokenManager.refreshToken}; expires=${date}; path=/;}`;

      setLoading(false);
      setLoggingIn(false);
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo");

      // REVIEW ERROR MESSAGE
      if (err.message === info.firebase.errors.auth.wrongPassword) {
        setError("Credenciales inválidas");
      }

      if (err.message === info.firebase.errors.auth.invalidEmail) {
        setError("Credenciales inválidas");
      }

      setLoggingIn(false);
      setLoading(false);
    }
  };

  const logoutUser = (callback) => {
    setAuthTokens(null);
    setUser(null);

    // REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.removeItem(info.localStorageKeys.authToken);
    // REMOVE TOKEN FROM COOKIE
    document.cookie = `${info.localStorageKeys.refreshToken}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;}`;

    if (callback) callback();
  };

  const updateToken = async () => {
    setLoading(true);
    setLoggingIn(false);

    // FETCH NEW TOKEN FROM SERVER
    try {
      const res = await fetch(
        `${info.requests.refreshToken}${process.env.REACT_APP_FIREBASE_API_KEY}`,
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
        const userCredentials = await getUserInfo(userExist, userExist.user_id);
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

        // SET REFRESH TOKEN ON COOKIE
        let date = new Date();
        date.setDate(date.getDate() + 1);
        document.cookie = `${info.localStorageKeys.refreshToken}=${authData.refresh_token}; expires=${date}; path=/;}`;

        setLoading(false);
        setLoggingIn(false);
      } else {
        // logoutUser();
        setLoggingIn(false);
      }
    } catch (err) {
      console.log(err);
      setLoggingIn(false);
      // logoutUser();
    }
    if (loading) setLoading(false);
  };

  useEffect(() => {
    if (loading) updateToken();

    const fourMinutes = 1000 * 60 * 4; // FOUR MINUTES IN SECONDS
    const interval = setInterval(() => {
      if (authTokens) updateToken();
    }, fourMinutes);
    return () => clearInterval(interval);
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

// UTILS
const getUserInfo = async (user, id) => {
  try {
    const ref = doc(db, info.firebase.collections.users, id);
    const snapshot = await getDoc(ref);
    user.data = snapshot.data();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
