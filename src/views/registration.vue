<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="5" md="6">
        <div class="form-prelude">
          <div>J’ai un compte <v-icon>add</v-icon></div>
          <div class="separator"><span>ou</span></div>
          <div>Je souhaite m'inscrire</div>
        </div>
        <v-form ref="registerForm">
          <div class="input-wrapper">
            <div class="input-label">Nom <span class="asterisk">*</span></div>
            <v-text-field
              v-model="nom"
              dense
              outlined
              hide-details
              :rules="[rules.required, rules.min3]"
            ></v-text-field>
          </div>

          <div class="input-wrapper">
            <div class="input-label">
              Prénom <span class="asterisk">*</span>
            </div>
            <v-text-field
              v-model="prenom"
              dense
              outlined
              hide-details
              :rules="[rules.required, rules.min4]"
            ></v-text-field>
          </div>

          <div class="input-wrapper">
            <div class="input-label">
              Adresse mail <span class="asterisk">*</span>
            </div>
            <v-text-field
              v-model="email"
              dense
              outlined
              hide-details
              :rules="[rules.email, rules.required]"
            ></v-text-field>
          </div>

          <div class="input-wrapper">
            <div class="input-label">
              Téléphone <span class="asterisk">*</span>
            </div>

            <country-phone
              v-model.number="tel"
              dense
              outlined
              hide-details
              label=""
              :rules="[rules.number]"
            />
          </div>

          <div class="input-wrapper">
            <div class="input-label">
              Mot de passe <span class="asterisk">*</span>
            </div>
            <v-text-field
              v-model="password"
              outlined
              hide-details
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </div>

          <div class="input-wrapper">
            <div class="input-label">
              Confirmer votre mot de passe <span class="asterisk">*</span>
            </div>

            <v-text-field
              v-model="confirmPassword"
              outlined
              hide-details
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              @paste.prevent
              @click:append="show2 = !show2"
              :rules="[
                rules.required,
                confirmPassword == password || 'Password must match',
              ]"
            ></v-text-field>
          </div>
          <div class="input-wrapper d-flex align-center">
            <v-checkbox
              v-model="agree"
              outlined
              hide-details
              class="noSpaceCheckbox"
              :rules="[rules.required]"
            ></v-checkbox>
            <div class="input-label">
              J'accepte les termes et
              <router-link to="#">conditions générales</router-link> et la
              <router-link to="#">politique de cinnfidentialité</router-link>
            </div>
          </div>

          <div class="text-right">
            <v-btn color="primary" x-large> S'inscrire </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countryPhone from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";

export default {
  components: {
    countryPhone,
  },
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
      agree: false,
      show1: false,
      show2: false,
    };
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
