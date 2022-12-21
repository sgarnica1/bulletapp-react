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
    values: {
      roles: {
        admin: "admin",
        athlete: "athlete",
        coach: "coach",
      },
    },
    collections: {
      users: "users",
      plans: "plans",
      groups: "groups",
      roles: "roles",
    },
    docKeys: {
      users: {
        firstName: "first_name",
        lastName: "last_name",
        email: "email",
        phoneNumber: "phone_number",
        plan: "id_plan",
        schedule: "id_schedule",
        birthDay: "birth_day",
        birthMonth: "birth_month",
        active: "active",
        role: "id_role",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      roles: {
        type: "type",
      },
    },
    errors: {
      auth: {
        wrongPassword: "Firebase: Error (auth/wrong-password).",
        invalidEmail: "Firebase: Error (auth/invalid-email).",
      },
    },
  },
  components: {
    button: {
      type: {
        submit: "submit",
        link: "link",
      },
      classes: {
        primary: "primary",
        secondary: "secondary",
        sm: "sm",
        lg: "lg",
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
    ],
  },
};

export { info };
