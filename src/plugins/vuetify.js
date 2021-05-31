import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#0e74bc",
        secondary1: "#e5006d",
        secondary2: "#cc0061",
        secondary3: "#124340",
        bodyBG: "#f7f7f7",
        borderLine: "#e1e1e1",
        accent: "#1CA092",
        error: "#b71c1c",
      },
    },
  },
});
