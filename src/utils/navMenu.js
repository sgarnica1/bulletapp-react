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
const coach = info.firebase.values.roles.coach;

const navMenu = {
  [admin]: [
    {
      type: type.mainMenu,
      active: true,
      elements: [
        {
          type: type.item,
          name: info.views.dashboard,
          route: info.routes.dashboard,
          active: true,
        },
        {
          type: type.dropdown,
          name: "Sucursales",
          active: false,
          elements: [
            {
              name: info.views.locations.juriquilla,
              route: info.routes.locations.juriquilla,
              active: true,
            },
            {
              name: info.views.locations.grandreserva,
              route: info.routes.locations.grandreserva,
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
              route: info.routes.athletes,
              active: true,
            },
            {
              name: info.views.addAthlete,
              route: info.routes.addAthlete,
              active: true,
            },
          ],
        },

        {
          type: type.item,
          name: info.views.payments,
          route: info.routes.payments,
          active: true,
        },
        {
          type: type.item,
          name: info.views.groups,
          route: info.routes.groups,
          active: true,
        },
        {
          type: type.item,
          name: info.views.plans,
          route: info.routes.plans,
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
          type: type.dropdown,
          name: "Programación",
          active: true,
          elements: [
            {
              name: info.views.programming,
              route: info.routes.programming,
              active: true,
            },
            {
              name: info.views.wods,
              route: info.routes.wods,
              active: true,
            },
            {
              name: info.views.addWod,
              route: info.routes.addWod,
              active: true,
            },
          ],
        },
        {
          type: type.item,
          name: info.views.videos,
          route: info.routes.videos,
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
          route: info.routes.settings,
          active: true,
        },
        {
          type: type.item,
          name: info.views.profile,
          route: info.routes.profile,
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
          route: info.routes.leaderboard,
          active: true,
        },

        {
          type: type.dropdown,
          name: "Skill & Strength",
          active: true,
          elements: [
            {
              name: info.views.records,
              route: info.routes.records,
              active: true,
            },
            {
              name: info.views.prs,
              route: info.routes.prs,
              active: true,
            },
            {
              name: info.views.skills,
              route: info.routes.skills,
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
          route: info.routes.videos,
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
          route: info.routes.settings,
          active: true,
        },
        {
          type: type.item,
          name: info.views.profile,
          route: info.routes.profile,
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
