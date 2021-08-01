<template>
  <div class="auth profile">
    <div class="app-title">Mon Profil</div>

    <div>
      <v-radio-group v-model="user.title" row>
        <v-radio color="accent" value="mrs" label="Mme." class="mb-0">
        </v-radio>

        <v-radio color="accent" value="mr" label="M." class="mb-0"> </v-radio>
      </v-radio-group>
    </div>

    <div>
      <v-row>
        <v-col cols="12" lg="9" md="9" sm="12">
          <v-form ref="profileUpdateForm">
            <v-row>
              <v-col cols="6" lg="6" md="6" sm="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">
                    Prénom <span class="asterisk">*</span>
                  </div>
                  <v-text-field
                    v-model="user.firstName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" lg="6" md="6" sm="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">
                    Nom <span class="asterisk">*</span>
                  </div>
                  <v-text-field
                    v-model="user.lastName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Téléphone portable</div>
                  <country-phone
                    v-model.number="user.tel"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.number]"
                  />
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Date de naissance</div>
                  <date-dropdown
                    v-model="user.dob"
                    :max="maxYear"
                    :min="minYear"
                    :default="user.dob ? user.dob : maxYear"
                  />
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Numéro de CNIB</div>
                  <v-text-field
                    v-model="user.cnib"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Date d'établissement</div>
                  <date-dropdown
                    v-model="user.cnibDate"
                    :max="maxYear"
                    :min="minYear"
                    :default="user.dob ? user.dob : maxYear"
                  />
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Lieu d'établissement</div>
                  <v-text-field
                    v-model="user.cnibLocation"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <div class="text-right">
              <v-btn
                class="gen-button"
                color="primary"
                :loading="profileLoader"
                @click="updateProfile"
              >
                Enregistrer
              </v-btn>
            </div>
          </v-form>
        </v-col>

        <v-col cols="12" lg="9" md="9" sm="12">
          <hr class="my-5" />

          <div class="app-title mb-7">Changer le mot de passe</div>

          <v-form ref="passwordUpdateForm">
            <v-row align="end">
              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Ancien mot de passe</div>
                  <v-text-field
                    v-model="user.firstName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="6"></v-col>
              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Nouveau mot de passe</div>
                  <v-text-field
                    v-model="user.firstName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">
                    Confirmer le nouveau mot de passe
                  </div>
                  <v-text-field
                    v-model="user.firstName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <div class="text-right">
              <v-btn
                class="gen-button"
                color="primary"
                :loading="passwordLoader"
                @click="updatePassword"
              >
                Enregistrer
              </v-btn>
            </div>
          </v-form>

          <hr class="my-5" />

          <div
            class="cursorMe primary--text"
            @click="
              modalActive = true;
              deleteAccountActive = true;
            "
          >
            Supprimer le compte
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog -->
    <v-dialog
      v-model="modalActive"
      max-width="500px"
      content-class="no-box-shadow"
    >
      <div class="def-section text-center">
        <div v-if="deleteAccountActive">
          <div class="mb-2">
            <b class="app-title">souhaitez-vous vraiment</b>
            <br />
            <b class="app-title">supprimer votre compte</b>
          </div>

          <div class="mb-10">Cette action est irréversible.</div>

          <v-btn
            color="primary"
            class="gen-button"
            :loading="deleteLoader"
            @click="deleteAccount"
          >
            Confirmer
          </v-btn>
          <span class="mx-5"></span>
          <v-btn
            color="secondary"
            class="gen-button"
            @click="modalActive = false"
          >
            Annuler
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countryPhone from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
import DateDropdown from "@/components/dropdownDate.vue";

export default {
  components: {
    countryPhone,
    DateDropdown,
  },
  data() {
    return {
      modalActive: false,
      deleteAccountActive: false,
      profileLoader: false,
      passwordLoader: false,
      deleteLoader: false,
      user: {
        // dob: "0-0-0",
      },
    };
  },
  watch: {
    modalActive(val) {
      if (val == false) {
        // disable all possible modals
        this.deleteAccountActive = false;
      }
    },
  },
  methods: {
    deleteAccount() {
      this.deleteLoader = true;
      setTimeout(() => {
        this.deleteLoader = false;
        this.modalActive = false;

        // Redirect to homepage
        this.$router.push("/");
      }, 1500);
    },
    updateProfile() {
      const validation = this.$refs.profileUpdateForm.validate();
      if (validation) {
        this.profileLoader = true;

        setTimeout(() => {
          this.profileLoader = false;
        }, 1500);
      }
    },
    updatePassword() {
      const validation = this.$refs.passwordUpdateForm.validate();
      if (validation) {
        this.passwordLoader = true;

        setTimeout(() => {
          this.passwordLoader = false;

          // Redirect to homepage
          this.$router.push("/");
        }, 1500);
      }
    },
  },
  computed: {
    ...mapGetters(["rules", "nowDate", "countryByName"]),
    maxYear() {
      let current = this.nowDate.split("-");
      const minYear = parseInt(this.nowDate.split("-")[0]) - 18;
      current[0] = minYear;

      return current.join("-");
    },
    minYear() {
      let current = this.nowDate.split("-");
      const minYear = parseInt(this.nowDate.split("-")[0]) - 100;
      current[0] = minYear;

      return current.join("-");
    },
  },
};
</script>

<style></style>
