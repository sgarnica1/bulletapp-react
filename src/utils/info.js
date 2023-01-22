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
    },
    button: {
      type: {
        submit: "submit",
        link: "link",
        href: "href",
        button: "button",
      },
      classes: {
        primary: "primary",
        secondary: "secondary",
        error: "error",
        sm: "sm",
        lg: "lg",
      },
    },
    buttonSelectFilter: {
      values: {
        all: "all",
      },
    },
    input: {
      type: {
        text: "text",
        email: "email",
        password: "password",
        number: "number",
        date: "date",
        time: "time",
        weight: "weight",
        sets: "sets",
        rounds: "rounds",
        checkbox: "checkbox",
        textarea: "textarea",
        birthDay: "birthDay",
      },
    },
    sortby: {
      label: "Ordenar",
      options: {
        mostRecent: "Más reciente",
        oldest: "Más antiguo",
        az: "A-Z",
        za: "Z-A",
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
    weightPercents: [95, 90, 85, 80, 70, 60, 50, 40, 30],
  },
  firebase: {
    values: {
      movementCategories: {
        barbell: "Barbell",
        bodyweight: "Bodyweight",
        cardio: "Cardio",
        dumbell: "Dumbell",
        gymnastics: "Gymnastics",
        kettlebell: "Kettlebell",
        skills: "Skills",
        weightlifting: "Weightlifting",
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
            sec: "sec",
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
          units: {
            lbs: "lb",
            // kg: "kg",
          },
        },
        distance: {
          name: "distance",
          units: {
            m: "m",
            km: "km",
            mi: "mi",
          },
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
        unlockedSkills: "unlocked_skills",
        records: "records",
        latest: "latest",
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
        movementCategory: "movement_category",
        scoreType: "score_types",
        isSkill: "skill",
        timescore: "timescore",
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
      records: {
        movement: "movement",
        idMovement: "id_movement",
        movementCategory: "movement_category",
        timescore: "timescore",
        scores: {
          date: "date",
          reps: "reps",
          sets: "sets",
          units: "units",
          weight: "weight",
          seconds: "seconds",
        },
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
      skills: {
        key: "skills",
        movement: "movement",
        movementCategory: "movement_category",
        movementId: "id_movement",
        date: "date",
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
        displayName: "displayName",
        email: "email",
        phoneNumber: "phone_number",
        plan: "plan",
        schedule: "group",
        birthDay: "birth_day",
        birthMonth: "birth_month",
        active: "active",
        role: "role",
        group: "group",
        plan: "plan",
        location: "location",
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      wods: {
        active: "active",
        title: "title",
        description: "description",
        date: "date",
        category: "category",
        timecap: "timecap",
        reps: "reps",
        rounds: "rounds",
        timescore: "timescore",
        scoreType: "score_type",
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
    movements: "BCF_MOVEMENTS",
    wodCategories: "BCF_WOD_CATEGORIES",
  },
  messages: {
    error: {
      allMissingData: "Todos los campos son requeridos",
      emptyScore: "Por favor ingresa un score",
      emptyFields: "Todos los campos son requeridos",
      errorWriting: "Ocurrió un error, por favor vuelve a intentarlo.",
      errorUpdating: "Ocurrió un error, por favor vuelve a intentarlo.",
      fetchError: "Error en la conexión",
      insufficientPermissions: "No tienes permisos para realizar esta acción",
      invalidDate: "El formato de fecha no es válido",
      invalidPassword:
        "La contraseña debe tener al menos 8 caracteres, un número y un caracter especial (#@$!%*?&)",
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
      passwordUpdated: "Contraseña actualizada correctamente",
      userCreated:
        "¡Gracias por tu registro! \n\nRevisa tu correo para verificar tu cuenta (incluida la carpeta de Spam) y espera a que el administrador te active.",
    },
  },
  routes: {
    home: "/",
    notFound: "/recurso-no-encontrado",
    leaderboard: {
      path: "/leaderboard",
      value: "leaderboard",
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
        tracking: {
          absolutePath: "/movimientos/tracking/:id",
          absolutePathNoParms: "/movimientos/tracking",
          path: "/tracking/:id",
          value: "tracking/:id",
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
    register: {
      path: "/registro",
      value: "registro",
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
    users: {
      path: "/usuarios",
      value: "usuarios",
    },
  },
  theme: {
    light: "light",
    dark: "dark",
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
    programming: "Programación",
    profile: "Perfil",
    records: "Records Personales",
    settings: "Ajustes",
    skills: "Skills",
    users: "Usuarios",
    videos: "Videos",
    wods: "WODs",
  },
};

export { info };
