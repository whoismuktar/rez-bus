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
            <div class="input-label">
              Adresse mail <span class="asterisk">*</span>
            </div>
            <v-text-field
              v-model="email"
              dense
              outlined
              hide-details="auto"
              :rules="[rules.email, rules.required]"
            ></v-text-field>
          </div>

          <div class="input-wrapper">
            <div class="input-label">
              Mot de passe <span class="asterisk">*</span>
            </div>
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

          <div class="text-right">
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
      email: "",
      password: "",
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
