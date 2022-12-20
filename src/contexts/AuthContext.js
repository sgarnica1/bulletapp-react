import { createContext, useContext, useState, useEffect } from "react";
import { messages } from "../utils/messages";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/index";
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
  const tokensExist = localStorage.getItem("BCF_TOKEN")
    ? JSON.parse(localStorage.getItem("BCF_TOKEN"))
    : null;

  // VERIFY IF USER EXISTS
  const userExist = localStorage.getItem("BCF_TOKEN")
    ? jwt_decode(localStorage.getItem("BCF_TOKEN"))
    : null;

  // INITIAL STATES
  const [authTokens, setAuthTokens] = useState({
    token: tokensExist,
    refreshToken: getTokenFromCookie("BCFRT"),
  });
  const [user, setUser] = useState(userExist);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  const loginUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoggingIn(true);

    const email = event.target.username.value;
    const password = event.target.password.value;

    // FETCH DATA FROM SERVER
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loginData = userCredentials.user;
      // SET USER
      setUser(userCredentials.user);

      // SET TOKENS
      setAuthTokens({
        token: loginData.stsTokenManager.accessToken,
        refreshToken: loginData.stsTokenManager.refreshToken,
      });

      // SET TOKEN ON LOCAL STORAGE
      localStorage.setItem(
        "BCF_TOKEN",
        JSON.stringify(loginData.stsTokenManager.accessToken)
      );

      // SET REFRESH TOKEN ON COOKIE
      let date = new Date();
      date.setDate(date.getDate() + 1);
      document.cookie =
        "BCFRT=" + loginData.stsTokenManager.refreshToken + "expires=" + date;

      setLoading(false);
      setLoggingIn(false);
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo");

      // REVIEW ERROR MESSAGE
      if (err.message === messages.firebase.errors.auth["wrong-password"]) {
        setError("Contraseña incorrecta");
      }

      if (err.message === messages.firebase.errors.auth["invalid-email"]) {
        setError("Correo electrónico inválido");
      }

      setLoggingIn(false);
      setLoading(false);
    }
  };

  const logoutUser = (callback) => {
    setAuthTokens(null);
    setUser(null);

    // REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.removeItem("BCF_TOKEN");
    // REMOVE TOKEN FROM COOKIE
    document.cookie = "BCFRT=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    if (callback) callback();
  };

  const updateToken = async () => {
    setLoading(true);
    setLoggingIn(true);

    // FETCH NEW TOKEN FROM SERVER
    try {
      const res = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
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
        // SET USER
        setUser(userExist);

        // SET NEW TOKENS
        setAuthTokens({
          token: authData.access_token,
          refreshToken: authData.refresh_token,
        });

        // SET TOKEN ON LOCAL STORAGE
        localStorage.setItem(
          "BCF_TOKEN",
          JSON.stringify(authData.access_token)
        );

        // SET REFRESH TOKEN ON COOKIE
        let date = new Date();
        date.setDate(date.getDate() + 1);
        document.cookie = "BCFRT=" + authData.refresh_token + "expires=" + date;

        setLoading(false);
        setLoggingIn(false);
      } else {
        logoutUser();
      }
    } catch (err) {
      console.log(err);
      logoutUser();
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
