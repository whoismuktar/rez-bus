import "material-design-icons-iconfont/dist/material-design-icons.css";
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
        secondary: "#e5006d",
        secondary2: "#cc0061",
        secondary3: "#124340",
        secondary4: "#50C878",
        bodyBG: "#f7f7f7",
        borderLine: "#e1e1e1",
        error: "#b71c1c",
      },
    },
  },
});
