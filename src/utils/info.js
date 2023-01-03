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
    addRecordForm: {
      recordType: {
        personalRecord: "personal_record",
        newSkill: "new_skill",
        personalGoal: "personal_goal",
      },
      recordCategories: {
        maxLift: "Max Lift",
        minTime: "Min Time",
        maxReps: "Max Reps",
        unlockSkill: "Desbloquear habilidad",
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
    weekDayNumber: {
      sunday: {
        num: 0,
        ref: "S",
      },
      monday: {
        num: 1,
        ref: "L",
      },
      tuesday: {
        num: 2,
        ref: "M",
      },
      wednesday: {
        num: 3,
        ref: "M",
      },
      thursday: {
        num: 4,
        ref: "J",
      },
      friday: {
        num: 5,
        ref: "V",
      },
      saturday: {
        num: 6,
        ref: "S",
      },
    },
    weekDayNumberArray: [
      {
        day: "sunday",
        num: 0,
        ref: "S",
      },
      {
        day: "monday",
        num: 1,
        ref: "L",
      },
      {
        day: "tuesday",
        num: 2,
        ref: "M",
      },
      {
        day: "wednesday",
        num: 3,
        ref: "M",
      },
      {
        day: "thursday",
        num: 4,
        ref: "J",
      },
      {
        day: "friday",
        num: 5,
        ref: "V",
      },
      {
        day: "saturday",
        num: 6,
        ref: "S",
      },
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
        time: {
          name: "time",
          units: "min",
        },
        reps: {
          name: "reps",
          units: "REPS",
        },
        weight: {
          name: "weight",
          units: "lbs",
        },
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
  messages: {
    error: {
      invalidPassword:
        "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial (@!%*?&)",
      invalidMatchingPassword: "Las contraseñas no coinciden",
      invalidEmail: "Correo electrónico incorrecto",
    },
  },
  requests: {
    refreshToken: "https://securetoken.googleapis.com/v1/token?key=",
  },
  routes: {
    addAthlete: "/atletas/nuevo",
    athletes: "/atletas",
    changePassword: "/contrasena/cambiar",
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
    passwordRecover: "/contrasena/recuperar",
    payments: "/pagos",
    plans: "/planes",
    prs: "/records/prs",
    profile: "/perfil",
    programming: "/programacion",
    records: "/records",
    recordHistory: "/records/historial",
    serverError: "server-error",
    settings: "/ajustes",
    skills: "/records/skills",
    singleAthlete: "/atletas",
    videos: "/videos",
  },
  states: {
    theme: {
      light: "light",
      dark: "dark",
    },
  },
  views: {
    addAthlete: "Añadir Atleta",
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
    prs: "PRs",
    progrgamming: "Programación",
    profile: "Perfil",
    records: "Personal Records",
    settings: "Ajustes",
    skills: "Skills",
    videos: "Videos",
  },
};

export { info };
