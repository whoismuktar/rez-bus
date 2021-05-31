<template>
  <div class="app-container">
    <v-row>
      <v-col cols="8">
        <div class="retour">Retour</div>

        <!-- Passengers -->
        <div class="def-section">
          <div class="passengers">
            <div class="d-flex align-center mb-3">
              <div class="sectionNo">1</div>
              <div class="sectionTitle">Passagers</div>
            </div>

            <v-row>
              <v-col cols="6">
                <div class="input-wrapper">
                  <div class="input-label">Nom</div>
                  <v-text-field
                    v-model="nom"
                    dense
                    outlined
                    hide-details
                    :rules="[rules.required, rules.min3]"
                  ></v-text-field></div
              ></v-col>

              <v-col cols="6">
                <div class="input-wrapper">
                  <div class="input-label">Prénom</div>
                  <v-text-field
                    v-model="prenom"
                    dense
                    outlined
                    hide-details
                    :rules="[rules.required, rules.min4]"
                  ></v-text-field></div
              ></v-col>
            </v-row>
          </div>
        </div>

        <!-- Reservation -->
        <div class="def-section">
          <div class="reservation">
            <div class="d-flex align-center mb-3">
              <div class="sectionNo">2</div>
              <div class="sectionTitle">Réservation de siège</div>
            </div>

            <div class="selection-wrapper" @click="modalActive">
              <div class="d-flex">
                <v-icon large>mdi-seat-recline-extra</v-icon>
                <div class="ml-3">
                  <h2>Sélectionnez votre siège</h2>
                  <p>à partir de 2,99 €</p>
                </div>

                <v-spacer></v-spacer>

                <v-icon>mdi-chevron-right</v-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Options -->
        <div class="def-section">
          <div class="options">
            <div class="d-flex align-center mb-3">
              <div class="sectionNo">2</div>
              <div class="sectionTitle">Options</div>
            </div>

            <div class="selection-wrapper" @click="modalActive">
              <div class="d-flex">
                <v-icon large>mdi-seat-recline-extra</v-icon>
                <div class="ml-3">
                  <h2>Assurances</h2>
                  <p>à partir de 0,69 €</p>
                </div>

                <v-spacer></v-spacer>

                <v-icon>mdi-chevron-right</v-icon>
              </div>
            </div>

            <div class="selection-wrapper" @click="modalActive">
              <div class="d-flex">
                <v-icon large>mdi-seat-recline-extra</v-icon>
                <div class="ml-3">
                  <h2>Bagage supplémentaire</h2>
                  <p>à partir de 3,99 €</p>
                </div>

                <v-spacer></v-spacer>

                <v-icon>mdi-chevron-right</v-icon>
              </div>
            </div>

            <div class="selection-wrapper d-flex" @click="modalActive">
              <v-checkbox class="noSpaceCheckbox x1-5transform"></v-checkbox>
              <div class="d-flex align-start">
                <v-icon large>mdi-leaf</v-icon>
                <div class="mt-n1 ml-3">
                  <h2>Bagage supplémentaire</h2>
                  <p>à partir de 3,99 €</p>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="def-section">
          <div class="contact">
            <div class="d-flex align-center mb-3">
              <div class="sectionNo">4</div>
              <div class="sectionTitle">Contact</div>
            </div>

            <v-row>
              <v-col cols="6">
                <div class="input-wrapper">
                  <div class="input-label">E-mail</div>
                  <v-text-field
                    v-model="nom"
                    dense
                    outlined
                    hide-details
                    :rules="[rules.required, rules.min3]"
                  ></v-text-field></div
              ></v-col>

              <v-col cols="6">
                <div class="input-wrapper">
                  <div class="input-label">Numéro de tél. (facultatif)</div>

                  <country-phone
                    v-model.number="tel"
                    dense
                    outlined
                    hide-details
                    label=""
                    :rules="[rules.number]"
                  />
                  <div>
                    Utilisé uniquement pour vous contacter en cas de retards ou
                    de changements d'itinéraires.
                  </div>
                </div></v-col
              >
            </v-row>
          </div>
        </div>

        <!-- Payment -->
        <div class="def-section">
          <div class="payment">
            <div class="d-flex align-center mb-3">
              <div class="sectionNo">5</div>
              <div class="sectionTitle">Paiement</div>
            </div>

            <v-radio-group>
              <v-radio
                color="accent"
                value="company"
                class="selection-wrapper mb-0"
              >
                <template slot="label">
                  <v-img
                    src="@/assets/img/credit_card_jcb.svg"
                    max-width="40"
                  ></v-img>
                  <div class="ml-2">Carte de crédit</div>
                </template>
              </v-radio>
              <span class="mx-4"></span>
              <v-radio
                color="accent"
                value="person"
                class="selection-wrapper mb-0"
              >
                <template slot="label">
                  <v-img src="@/assets/img/paypal.svg" max-width="40"></v-img>
                  <div class="ml-2">Paypal</div>
                </template></v-radio
              >
            </v-radio-group>

            <hr class="my-3" />

            <div class="d-flex align-center">
              <v-checkbox
                hide-details
                class="mt-1 ml-1 noSpaceCheckbox x1-5transform"
              ></v-checkbox>
              <div>J'ai besoin d'une facture.</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="4" class="position-relative">
        <div class="position-sticky checkout-summary">
          <div>Votre commande</div>

          <div>
            {{ new Date().toDateString() }},
            <b>{{ new Date().getHours() }}:{{ new Date().getMinutes() }}-</b>
            <b>{{ new Date().getHours() }}:{{ new Date().getMinutes() }}</b>
          </div>

          <div class="route">
            <div class="d-route begin">Destinaiton A</div>
            <div class="d-route end">Destinaiton B</div>
          </div>

          <div class="d-flex justify-space-between">
            <div>X Adults</div>
            <b>27,99 €</b>
          </div>

          <hr class="my-3" />

          <div class="d-flex justify-space-between">
            <b>Total</b>
            <b>27,99 €</b>
          </div>

          <!-- Coupon -->
          <div class="sub-coupon primary--text">
            <p @click="slideCoupon" class="slideCoupon">
              <v-icon color="primary">mdi-ticket</v-icon>
              <span> Saisir le bon d'achat</span>
              <v-icon color="primary">mdi-chevron-down</v-icon>
            </p>
            <div class="d-flex">
              <v-text-field
                dense
                hide-details
                outlined
                class="coupon-input mr-1"
                @input="couponToUpperCase"
              ></v-text-field>
              <v-btn depressed outlined color="primary" class="gen-button">
                Valider
              </v-btn>
            </div>
            <span v-if="couponReady" class="caption">
              <em>{{ couponMsg }}</em>
            </span>
          </div>

          <div class="mt-1 d-flex align-center">
            <v-checkbox
              v-model="agree"
              outlined
              hide-details
              class="mt-1 ml-1 noSpaceCheckbox x1-5transform"
              :rules="[rules.required]"
            ></v-checkbox>
            <div class="input-label">
              Je déclare avoir lu la
              <router-link to="#">politique de confidentialité</router-link> et
              accepter les
              <router-link to="#">conditions générales de vente</router-link> et
              de
              <router-link to="#">transport</router-link>
            </div>
          </div>

          <!-- <div>Vous devez acceptez les conditions générales de vente</div> -->

          <v-btn depressed color="primary gen-button parentWidth">
            Procéder au paiement
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countryPhone from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
import $ from "jquery";

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
  methods: {
    modalActive() {
      console.log("active");
    },
    couponToUpperCase(val) {
      this.coupon = val.toUpperCase();
    },
    slideCoupon() {
      // this.haveCoupon = !this.haveCoupon;
      $(".coupon-input").slideToggle("fast", function () {
        // Animation complete.
      });
    },
    // calcDayTime() {
    //   let hr = new Date().getHours();

    //   if (hr > 12) {
    //     // console.log("pm");
    //     return hr - 12;
    //   } else {
    //     // console.log("am");
    //     return hr;
    //   }
    // },
  },
  computed: {
    ...mapGetters(["rules"]),
  },
};
</script>

<style scoped>
.sectionNo {
  font-size: 1.3em;
  background-color: var(--v-primary-base);
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  text-align: center;
  margin-right: 10px;
}
.selection-wrapper {
  cursor: pointer;
  border: 1px solid var(--v-borderLine-base);
  padding: 10px 24px;
  border-radius: 5px;
}
.selection-wrapper:not(:last-child) {
  margin-bottom: 17px;
}
.payment .selection-wrapper {
  width: 100%;
}
.payment .selection-wrapper:not(:last-child) {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.payment .selection-wrapper:last-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.slideCoupon {
  cursor: pointer;
}
.d-route {
  position: relative;
  padding-left: 20px;
}
.d-route::before {
  content: "";
  position: absolute;
  left: 0;
  width: 10px;
  height: 10px;
  top: 31%;
  border-radius: 50%;
}
.d-route::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 4px;
  width: 2px;
  height: 100%;
  background-color: var(--v-secondary-base);
}
.d-route.begin::before {
  background: transparent;
  border: 2px solid var(--v-secondary-base);
}
.d-route.end::before {
  background-color: var(--v-secondary-base);
}
.d-route.end::after {
  display: none;
}
.checkout-summary {
  top: 0;
}
</style>
