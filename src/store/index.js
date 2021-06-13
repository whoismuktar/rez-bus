import Vue from "vue";
import Vuex from "vuex";
import all_countries from "../utils/countries.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {
    rules() {
      return {
        required: (value) => !!value || "Required",
        min3: (value) => value.length >= 3 || "Min 3 characters",
        min4: (value) => value.length >= 4 || "Min 4 characters",
        phoneNumber: (value) =>
          !value ||
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{10,14}$/.test(value) ||
          "Enter a valid international phone number",
        alphabet: (value) =>
          !value || /^[a-zA-Z]+$/.test(value) || "Only alpabets are allowed",
        number: (value) => !value || /^[0-9]*$/.test(value) || "Invalid value",
        email: (value) =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid E-mail",
        password: (value) => {
          const pattern =
            /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*([^\w\s]|[_]))\S{8,}$/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
      };

      // return rules;
    },
    countryByName() {
      var data = all_countries;
      var names = [];
      data.forEach((item) => {
        names.push(item.name);
      });

      return names;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
