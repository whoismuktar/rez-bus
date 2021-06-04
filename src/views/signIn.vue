<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="5" md="6">
        <div class="form-prelude">
          <div>
            Je souhaite m'inscrire
            <v-icon class="cursorMe" @click="$router.push('/register')">
              expand_less
            </v-icon>
          </div>
          <div class="separator"><span>ou</span></div>
          <div>
            J’ai un compte
            <v-icon class="cursorMe"> expand_more </v-icon>
          </div>
        </div>
        <v-form ref="registerForm">
          <div class="input-wrapper">
            <div class="input-label">Adresse mail ou numéro de téléphone</div>
            <v-text-field
              v-model="loginID"
              dense
              outlined
              hide-details="auto"
              placeholder="xxx@gmail.com ou +226XXXXXX"
              :rules="[
                rules.required,
                loginID.charAt(0) == '+' ? rules.phoneNumber : rules.email,
              ]"
            ></v-text-field>
          </div>

          <div class="input-wrapper">
            <div class="input-label">Mot de passe</div>
            <v-text-field
              v-model="password"
              dense
              outlined
              hide-details="auto"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </div>

          <router-link to="/forgot-password">Mot de passe oubilé?</router-link>
          <router-link to="/register">S’inscrire?</router-link>

          <div class="d-flex align-center justify-space-between text-right">
            <div class="input-wrapper d-flex align-center">
              <v-checkbox
                v-model="remember"
                outlined
                hide-details="auto"
                class="noSpaceCheckbox"
                :rules="[rules.required]"
              ></v-checkbox>
              <div class="input-label">Rester connecté</div>
            </div>
            <v-btn
              depressed
              x-large
              color="primary"
              class="gen-button"
              @click.prevent="login"
            >
              Connexion
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loginID: "",
      password: "",
      remember: false,
      show1: false,
    };
  },
  methods: {
    login() {
      const validation = this.$refs.registerForm.validate();
      if (!validation) {
        this.modalActive = true;
        this.registerSuccess = true;
      }
    },
  },
  computed: {
    ...mapGetters(["rules"]),
  },
};
</script>

<style scoped>
.form-prelude {
  text-align: center;
}
.form-prelude .separator span {
  position: relative;
  background-color: var(--v-bodyBG-base);
  padding: 4px 10px;
  z-index: 1;
}
.form-prelude .separator {
  position: relative;
}
.form-prelude .separator:before {
  content: "";
  content: "";
  height: 1px;
  background-color: var(--v-secondary3-base);
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
}
</style>
