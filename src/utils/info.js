const info = {
  app: {
    errors: {
      fetchError: "Failed to fetch",
    },
  },
  components: {
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
    buttonSelectFilter: {
      values: {
        all: "all",
      },
    },
    sortby: {
      label: "Ordenar",
      options: {
        mostRecent: "Más reciente",
        oldest: "Más antiguo",
        alphabetic: "Alfabético",
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
    locations: {
      juriquilla: "Juriquilla",
      zibata: "Zibatá",
      grandreserva: "Grand Reserva",
    },
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
    scores: {
      time: "Tiempo",
      reps: "Repeticiones",
      rounds: "Rondas",
      weight: "Peso",
    },
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
      movementCategories: {
        cardio: "Cardio",
        gymnastics: "Gymnastics",
        kettlebell: "Kettlebell",
        dumbell: "Dumbell",
        barbell: "Barbell",
        bodyweight: "Bodyweight",
        other: "Otro",
      },
      recordCategories: {
        maxLift: {
          name: "Máximo levantamiento",
          score_type: "weight",
          active: true,
        },
        maxReps: {
          name: "Máximas repeticiones",
          score_type: "reps",
          active: true,
        },
        bestTime: {
          name: "Mejor Tiempo",
          score_type: "time",
          active: true,
        },
        newSkill: {
          name: "Desbloquear habilidad",
          score_type: "",
          active: true,
        },
      },
      roles: {
        admin: "admin",
        athlete: "athlete",
        coach: "coach",
      },
      scoreTypes: {
        time: {
          name: "time",
          units: {
            min: "min",
            sec: "seg",
          },
        },
        reps: {
          name: "reps",
          units: "reps",
        },
        rounds: {
          name: "rounds",
          units: "rounds",
        },
        weight: {
          name: "weight",
          units: "lbs",
        },
      },
      wodCategories: {
        amrap: "AMRAP",
        emom: "EMOM",
        chipper: "Chipper",
        roundsForTime: "Rounds For Time",
        tabata: "Tabata",
        ladder: "Ladder",
      },
    },
    collections: {
      athletes: "athletes",
      groups: "groups",
      locations: "locations",
      movementCategories: "movement_categories",
      movements: "movements",
      personalRecords: "personal_records",
      plans: "plans",
      roles: "roles",
      scoreTypes: "score_types",
      users: "users",
      wodCategories: "wod_categories",
      wodScores: "wod_scores",
      wods: "wods",
    },
    subcollections: {
      users: {
        personalRecords: "personal_records",
      },
      wods: {
        scores: "scores",
      },
    },
    docKeys: {
      movements: {
        active: "active",
        name: "name",
        description: "description",
        movementCategory: "id_movement_category",
        scoreType: "id_score_type",
        isSkill: "skill",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      personalRecords: {
        movement: "movement",
        idMovement: "id_movement",
        movementCategory: "movement_category",
        score_type: "score_type",
        scores: {
          name: "scores",
          value: "value",
          date: "date",
        },
        units: "units",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
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
      users: {
        firstName: "first_name",
        lastName: "last_name",
        email: "email",
        phoneNumber: "phone_number",
        plan: "plan",
        schedule: "group",
        birthDay: "birth_day",
        birthMonth: "birth_month",
        active: "active",
        role: "role",
        location: "location",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      wods: {
        description: "description",
        date: "date",
        active: "active",
        scoreType: "score_type",
        timecap: "timecap",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      wodScores: {
        uid: "uid",
        username: "username",
        score: "score",
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
        userNotFound: "Firebase: Error (auth/user-not-found).",
        insufficientPermissions:
          "Request failed with error: Missing or insufficient permissions.",
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
      allMissingData: "Todos los campos son requeridos",
      emptyScore: "Por favor ingresa un score",
      emptyFields: "Todos los campos son requeridos",
      errorWriting: "Ocurrió un error, por favor vuelve a intentarlo.",
      fetchError: "Error en la conexión",
      insufficientPermissions: "No tienes permisos para realizar esta acción",
      invalidDate: "El formato de fecha no es válido",
      invalidPassword:
        "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial (@!%*?&)",
      invalidMatchingPassword: "Las contraseñas no coinciden",
      invalidEmail: "Por favor ingrese un correo electrónico válido",
      invalidTimeCap: "El Timecap debe ser un número igual o mayor a 0",
      missingData: "Este campo es requerido",
      sameScore: "El score que ingresaste es el mismo que ya tienes registrado",
      wodAlreadyExists: "Ya existe un WOD registrado para esta fecha",
    },
    success: {
      wodScoreUpdated: "Tu score se ha actualizado correctamente",
      wodScoreCreated: "Score registrado correctamente",
      wodCreated: "WOD registrado correctamente",
      movementCreated: "Movimiento añadido correctamente",
    },
  },
  requests: {
    refreshToken: "https://securetoken.googleapis.com/v1/token?key=",
  },
  routes2: {
    addAthlete: "/atletas/nuevo",
    addMovement: "/movimientos/nuevo",
    addPersonalGoal: "/metas/nuevo",
    addPersonalRecord: "/prs/nuevo",
    addSkill: "/skills/nuevo",
    addWod: "/wods/nuevo",
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
    personalGoals: "/metas",
    plans: "/planes",
    prs: "/prs",
    prsHistory: "/prs/historial",
    profile: "/perfil",
    programming: "/programacion",
    records: "/records",
    serverError: "server-error",
    settings: "/ajustes",
    skills: "/skills",
    singleAthlete: "/atletas",
    videos: "/videos",
    wods: "/wods",
  },
  routes: {
    home: "/",
    notFound: "/recurso-no-encontrado",
    leaderboard: {
      path: "/leaderboard",
      value: "leaderboard",
    },
    prs: {
      path: "/prs",
      value: "prs",
      nested: {
        history: {
          absolutePath: "/prs/:id",
            absolutePathNoParms: "/prs",
          path: "/:id",
          value: ":id",
        },
        add: {
          absolutePath: "/prs/nuevo",
          path: "/nuevo",
          value: "nuevo",
        },
        update: {
          absolutePath: "/prs/:id/actualizar",
          path: "/actualizar",
          value: "/actualizar",
        }
      },
    },
    athlete: {
      path: "/atletas",
      value: "atletas",
      nested: {
        add: {
          absolutePath: "/atletas/nuevo",
          path: "/nuevo",
          value: "nuevo",
        },
        single: {
          absolutePath: "/atletas/:id",
          path: "/:id",
          value: ":id",
        },
      },
    },
    movements: {
      path: "/movimientos",
      value: "movimientos",
      nested: {
        add: {
          absolutePath: "/movimientos/nuevo",
          path: "/nuevo",
          value: "nuevo",
        },
        single: {
          absolutePath: "/movimientos/:id",
          path: "/:id",
          value: ":id",
        },
      },
    },
    skills: {
      path: "/skills",
      value: "skills",
      nested: {
        add: {
          absolutePath: "/skills/nuevo",
          path: "/nuevo",
          value: "nuevo",
        },
      },
    },
    personalGoals: {
      path: "/metas",
      value: "metas",
      nested: {
        add: {
          absolutePath: "/metas/nuevo",
          path: "/nuevo",
          value: "nuevo",
        },
      },
    },
    wods: {
      path: "/wods",
      value: "wods",
      nested: {
        add: {
          absolutePath: "/wods/nuevo",
          path: "/nuevo",
          value: "nuevo",
        },
      },
    },
    programming: {
      path: "/programacion",
      value: "programacion",
    },
    videos: {
      path: "/videos",
      value: "videos",
    },
    settings: {
      path: "/ajustes",
      value: "ajustes",
      nested: {
        changePassword: {
          absolutePath: "/ajustes/contrasena/cambiar",
          path: "/contrasena/cambiar",
          value: "contrasena/cambiar",
        },
      },
    },
    dashboard: {
      path: "/escritorio",
      value: "escritorio",
    },
    locations: {
      path: "/sucursales",
      value: "sucursales",
      nested: {
        juriquilla: {
          absolutePath: "/sucursales/juriquilla",
          path: "/juriquilla",
          value: "juriquilla",
        },
        zibata: {
          absolutePath: "/sucursales/zibata",
          path: "/zibata",
          value: "zibata",
        },
        grandreserva: {
          absolutePath: "/sucursales/grandreserva",
          path: "/grandreserva",
          value: "grandreserva",
        },
      },
    },
    login: {
      path: "/login",
      value: "login",
    },
    serverError: {
      path: "/server-error",
      value: "server-error",
    },
    payments: {
      path: "/pagos",
      value: "pagos",
    },
    plans: {
      path: "/planes",
      value: "planes",
    },
    groups: {
      path: "/grupos",
      value: "grupos",
    },
    profile: {
      path: "/perfil",
      value: "perfil",
    },
    passwordRecover: {
      path: "/contrasena/recuperar",
      value: "contrasena/recuperar",
    },
  },
  states: {
    theme: {
      light: "light",
      dark: "dark",
    },
  },
  views: {
    addAthlete: "Añadir Atleta",
    addWod: "Añadir WOD",
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
    programming: "Programación",
    profile: "Perfil",
    records: "Personal Records",
    settings: "Ajustes",
    skills: "Skills",
    videos: "Videos",
    wods: "WODs",
  },
};

export { info };
