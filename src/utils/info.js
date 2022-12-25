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
      scoreTypes: {
        time: "time",
        reps: "reps",
      }
    },
    collections: {
      users: "users",
      plans: "plans",
      groups: "groups",
      roles: "roles",
      wods: "wods",
      wodScores: "wod_scores",
      scoreTypes: "score_types",
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
      wods: {
        description: "description",
        date: "date",
        active: "active",
        idScoreType: "id_score_type",
        timecap: "timecap",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      wodScores: {
        idWod: "id_wod",
        idUser: "id_user",
        score: "score",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
        active: "active",
      },
      roles: {
        type: "type",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
        active: "active",
      },
      scoreTypes: {
        active: "active",
        name: "name",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
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
