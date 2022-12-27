const info = {
  components: {
    button: {
      type: {
        submit: "submit",
        link: "link",
        href: "href",
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
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
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
      },
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
        networkFailed: "Firebase: Error (auth/network-request-failed).",
      },
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
  routes: {
    addAthlete: "/atletas/nuevo",
    athletes: "/atletas",
    changePassword: "/ajustes/cambiar-contraseña",
    dashboard: "/escritorio",
    groups: "groups",
    home: "/",
    leaderboard: "/leaderboard",
    locations: {
      juriquilla: "/sucursales/juriquilla",
      zibata: "sucurales/zibata",
      grandreserva: "sucursales/grandreserva",
    },
    login: "/login",
    payments: "/pagos",
    plans: "/plans",
    profile: "/perfil",
    programming: "/programación",
    serverError: "server-error",
    settings: "/ajustes",
    videos: "/videos",
  },
  states: {
    theme: {
      light: "light",
      dark: "dark",
    },
  },
  views: {
    athletes: "Atletas",
    dashboard: "Escritorio",
    groups: "Clases",
    home: "Home",
    leaderboard: "Leaderboard",
    locations: {
      juriquilla: "Juriquilla",
      zibata: "Zibatá",
      grandreserva: "Grand Reserva",
    },
    payments: "Pagos",
    plans: "Planes",
    progrgamming: "Programación",
    profile: "Perfil",
    settings: "Ajustes",
    videos: "Videos",
  },
};

export { info };
