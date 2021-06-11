<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="5" md="6">
        <v-expansion-panels v-model="activeMode" accordion flat class="white">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="form-prelude">
                <div>J’ai un compte</div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form ref="registerForm">
                <div class="input-wrapper">
                  <div class="input-label">
                    Nom <span class="asterisk">*</span>
                  </div>
                  <v-text-field
                    v-model="nom"
                    dense
                    outlined
                    hide-details="auto"
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
                    hide-details="auto"
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
                    hide-details="auto"
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
                    hide-details="auto"
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
                    dense
                    outlined
                    hide-details="auto"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </div>

                <div class="input-wrapper">
                  <div class="input-label">
                    Confirmer votre mot de passe
                    <span class="asterisk">*</span>
                  </div>

                  <v-text-field
                    v-model="confirmPassword"
                    dense
                    outlined
                    hide-details="auto"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :type="show2 ? 'text' : 'password'"
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
                    hide-details="auto"
                    class="noSpaceCheckbox"
                    :rules="[rules.required]"
                  ></v-checkbox>
                  <div class="input-label">
                    J'accepte les termes et
                    <router-link to="#">conditions générales</router-link> et la
                    <router-link to="#"
                      >politique de cinnfidentialité</router-link
                    >
                  </div>
                </div>

                <div class="text-right">
                  <v-btn
                    depressed
                    x-large
                    color="primary"
                    class="gen-button"
                    @click.prevent="register"
                  >
                    S'inscrire
                  </v-btn>
                </div>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <div class="separator"><span>ou</span></div>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="form-prelude">
                <div>Je souhaite m'inscrire</div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form ref="registerForm">
                <div class="input-wrapper">
                  <div class="input-label">
                    Adresse mail ou numéro de téléphone
                  </div>
                  <v-text-field
                    v-model="loginID"
                    dense
                    outlined
                    hide-details="auto"
                    placeholder="xxx@gmail.com ou +226XXXXXX"
                    :rules="[
                      rules.required,
                      loginID.charAt(0) == '+'
                        ? rules.phoneNumber
                        : rules.email,
                    ]"
                  ></v-text-field>
                </div>

                <div class="input-wrapper mb-4">
                  <div class="input-label">Mot de passe</div>
                  <v-text-field
                    v-model="loginPassword"
                    dense
                    outlined
                    hide-details="auto"
                    :append-icon="show1pass ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required]"
                    :type="show1pass ? 'text' : 'loginPassword'"
                    @click:append="show1pass = !show1pass"
                  ></v-text-field>
                </div>

                <router-link to="/forgot-loginPassword">
                  Mot de passe oubilé?
                </router-link>

                <div
                  class="d-flex align-center justify-space-between text-right"
                >
                  <div class="input-wrapper d-flex align-center mt-4">
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
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog
      v-model="modalActive"
      max-width="500px"
      content-class="no-box-shadow"
    >
      <div class="def-section text-center">
        <div>
          <h2 class="app-title">Inscription réussie</h2>
        </div>
        <div>Veuillez vérifier votre email pour valider votre inscription</div>

        <v-btn
          dark
          depressed
          x-large
          color="primary"
          class="gen-button"
          @click="$router.push('/signin')"
        >
          Continuez
        </v-btn>
      </div>
    </v-dialog>
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
      modalActive: false,
      activeMode: 1, // set initial expanded panel
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
      agree: false,
      show1: false,
      show2: false,
      loginID: "",
      loginPassword: "",
      remember: false,
      show1pass: false,
    };
  },
  methods: {
    register() {
      const validation = this.$refs.registerForm.validate();
      if (validation) {
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
.separator span {
  position: relative;
  background-color: #ffffff;
  padding: 4px 10px;
  z-index: 1;
}
.separator:before {
  content: "";
  height: 1px;
  background-color: var(--v-secondary3-base);
  width: 100%;
  position: absolute;
  left: 0;
  margin-top: 12px;
}

.v-expansion-panel-header {
  display: flex;
  justify-content: center;
}
.v-expansion-panel-header > *:not(.v-expansion-panel-header__icon) {
  flex: unset;
}

>>> .v-expansion-panel-header__icon {
  margin-left: unset !important;
}
</style>
