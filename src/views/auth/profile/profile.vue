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
        <v-col cols="9">
          <v-form ref="profileUpdateForm">
            <v-row>
              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Date de naissance</div>
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
                  <div class="input-label">Date de naissance</div>
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
                  <div class="input-label">Date de naissance</div>
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

              <v-col cols="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Adresse</div>
                  <v-text-field
                    v-model="user.streetNo"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Complément d'adresse</div>
                  <v-text-field
                    v-model="user.streetNo"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Adresse</div>
                  <v-text-field
                    v-model="user.postal"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Adresse</div>
                  <v-text-field
                    v-model="user.city"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Adresse</div>
                  <v-select
                    v-model="user.country"
                    outlined
                    dense
                    :menu-props="{ offsetY: true }"
                    :items="countryByName"
                  ></v-select>
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

        <v-col cols="9">
          <hr />

          <div class="app-title">Changer le mot de passe</div>

          <v-form ref="passwordUpdateForm">
            <v-row>
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

          <hr />

          <div
            class="cursorMe"
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
