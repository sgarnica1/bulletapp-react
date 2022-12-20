const info = {
  states: {
    theme: {
      light: "light",
      dark: "dark",
    },
  },
  localStorageKeys: {
    theme: "BFC_THEME",
    authToken: "BCF_TOKEN",
    refreshToken: "BCFRT",
  },
  requests: {
    refreshToken: "https://securetoken.googleapis.com/v1/token?key=",
  },
  firebase: {
    errors: {
      auth: {
        wrongPassword: "Firebase: Error (auth/wrong-password).",
        invalidEmail: "Firebase: Error (auth/invalid-email).",
      },
    },
  },
  data: {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]
  }
};

export { info };
