import { info } from "./info";

const type = {
  dropdown: "dropdown",
  item: "item",
  mainMenu: "main",
  subMenu: "sub",
  logout: "logout",
};

const admin = info.firebase.values.roles.admin;
const athlete = info.firebase.values.roles.athlete;

const navMenu = {
  [admin]: [
    {
      type: type.mainMenu,
      active: true,
      elements: [
        {
          type: type.item,
          name: info.views.dashboard,
          route: info.routes.dashboard.path,
          active: true,
        },
        {
          type: type.dropdown,
          name: "Sucursales",
          active: false,
          elements: [
            {
              name: info.views.locations.juriquilla,
              route: info.routes.locations.nested.juriquilla.absolutePath,
              active: true,
            },
            {
              name: info.views.locations.grandreserva,
              route: info.routes.locations.nested.grandreserva.absolutePath,
              active: true,
            },
          ],
        },
        {
          type: type.item,
          name: info.views.leaderboard,
          route: info.routes.leaderboard.path,
          active: true,
        },
        {
          type: type.dropdown,
          name: "Skill & Strength",
          active: true,
          elements: [
            {
              name: info.views.records,
              route: info.routes.movements.path,
              active: true,
            },
            {
              name: info.views.skills,
              route: info.routes.skills.path,
              active: true,
            },
          ],
        },

        {
          type: type.dropdown,
          name: "Atletas",
          active: true,
          elements: [
            {
              name: info.views.athletes,
              route: info.routes.athlete.path,
              active: true,
            },
            {
              name: info.views.addAthlete,
              route: info.routes.athlete.nested.add.absolutePath,
              active: true,
            },
          ],
        },

        {
          type: type.item,
          name: info.views.payments,
          route: info.routes.payments.path,
          active: true,
        },
        {
          type: type.item,
          name: info.views.groups,
          route: info.routes.groups.path,
          active: true,
        },
        {
          type: type.item,
          name: info.views.plans,
          route: info.routes.plans.path,
          active: true,
        },
      ],
    },
    {
      type: type.subMenu,
      subtitle: "Recursos",
      active: true,
      elements: [
        {
          type: type.item,
          name: info.views.users,
          route: info.routes.users.path,
          active: true,
        },
        {
          type: type.dropdown,
          name: "Programación",
          active: true,
          elements: [
            {
              name: info.views.wods,
              route: info.routes.wods.path,
              active: true,
            },
            {
              name: info.views.addWod,
              route: info.routes.wods.nested.add.absolutePath,
              active: true,
            },
          ],
        },
      ],
    },
    {
      type: type.subMenu,
      subtitle: "Cuenta",
      active: true,
      elements: [
        {
          type: type.item,
          name: info.views.settings,
          route: info.routes.settings.path,
          active: true,
        },
        {
          type: type.item,
          name: info.views.profile,
          route: info.routes.profile.path,
          active: true,
        },
        {
          type: type.logout,
          name: "Salir",
          active: true,
        },
      ],
    },
  ],
  [athlete]: [
    {
      type: type.mainMenu,
      active: true,
      elements: [
        {
          type: type.item,
          name: info.views.home,
          route: info.routes.home,
          active: true,
        },
        {
          type: type.item,
          name: info.views.leaderboard,
          route: info.routes.leaderboard.path,
          active: true,
        },

        {
          type: type.dropdown,
          name: "Skill & Strength",
          active: true,
          elements: [
            {
              name: info.views.records,
              route: info.routes.movements.path,
              active: true,
            },
            {
              name: info.views.skills,
              route: info.routes.skills.path,
              active: true,
            },
          ],
        },
      ],
    },
    {
      type: type.subMenu,
      subtitle: "Recursos",
      active: false,
      elements: [
        {
          type: type.item,
          name: info.views.videos,
          route: info.routes.videos.path,
          active: true,
        },
      ],
    },
    {
      type: type.subMenu,
      subtitle: "Cuenta",
      active: true,
      elements: [
        {
          type: type.item,
          name: info.views.settings,
          route: info.routes.settings.path,
          active: true,
        },
        {
          type: type.item,
          name: info.views.profile,
          route: info.routes.profile.path,
          active: true,
        },
        {
          type: type.logout,
          name: "Salir",
          active: true,
        },
      ],
    },
  ],
};

export { type, navMenu };
