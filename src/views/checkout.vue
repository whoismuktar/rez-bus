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

            <v-row
              v-for="(passenger, index) in passengersData"
              :key="index"
              align="end"
            >
              <v-col cols="6" class="py-0">
                <b>
                  <span>{{ index + 1 }}.</span>
                  <span
                    v-if="passenger.type == 'adult'"
                    class="text-capitalize"
                  >
                    {{ passenger.type }}
                  </span>
                  <span
                    v-if="passenger.type == 'children'"
                    class="text-capitalize"
                  >
                    Enfant
                  </span>
                </b>
                <div class="input-wrapper">
                  <div class="input-label">Prénom</div>
                  <v-text-field
                    v-model="passenger.firstName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field></div
              ></v-col>

              <v-col cols="6" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Nom</div>
                  <v-text-field
                    v-model="passenger.lastName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col v-if="passenger.type == 'children'" cols="5" class="py-0">
                <div>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="passenger.dob"
                        label="Date de naissanceDate de naissance"
                        prepend-inner-icon="date_range"
                        persistent-hint
                        dense
                        outlined
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="passenger.dob"
                      :menu-props="{ offsetY: true }"
                      scrollable
                      color="primary"
                      header-color="primary"
                      event-color="blue"
                    >
                    </v-date-picker>
                  </v-menu>
                </div>
              </v-col>
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

            <div
              class="selection-wrapper"
              @click="
                reservationActive = true;
                modalActive = true;
              "
            >
              <div class="d-flex">
                <v-icon>airline_seat_recline_normal</v-icon>
                <v-icon
                  v-if="reservationDone"
                  color="secondary4"
                  class="tiny ml-n2 mb-n4"
                >
                  check_circle
                </v-icon>
                <div class="ml-3">
                  <h2 class="app-title">Sélectionnez votre siège</h2>
                  <p>à partir de 2,99 €</p>
                </div>

                <v-spacer></v-spacer>

                <v-icon>chevron_right</v-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Options -->
        <div class="def-section">
          <div class="options">
            <div class="d-flex align-center mb-3">
              <div class="sectionNo">3</div>
              <div class="sectionTitle">Options</div>
            </div>

            <div
              class="selection-wrapper"
              @click="
                optionsActive = true;
                modalActive = true;
              "
            >
              <div class="d-flex">
                <v-icon large>airline_seat_recline_normal</v-icon>
                <div class="ml-3">
                  <h2 class="app-title">Assurances</h2>
                  <p>à partir de 0,69 €</p>
                </div>

                <v-spacer></v-spacer>

                <v-icon>chevron_right</v-icon>
              </div>
            </div>

            <div class="selection-wrapper pa-0" @click="luggaageActive = true">
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div class="d-flex">
                      <v-icon large>luggage</v-icon>
                      <div class="ml-3">
                        <h2 class="app-title mb-2">Bagage supplémentaire</h2>
                        <p>à partir de 3,99 €</p>
                      </div>

                      <v-spacer></v-spacer>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <hr class="mb-5" />

                    <div class="d-flex mb-5">
                      <div class="d-flex">
                        <div class="d-flex mr-3">
                          <v-icon>backpack</v-icon>
                          <v-icon class="tiny ml-n2 mb-n4">backpack</v-icon>
                        </div>

                        <div>
                          <div>
                            1 Bagage à main + 1 Bagage en soute par personne
                          </div>
                          <div>7 kg · 42×30×18 cm | 20 kg · 80×50×30 cm</div>
                        </div>
                      </div>

                      <v-spacer></v-spacer>

                      <div
                        class="primary radius5 pa-2 white--text"
                        style="height: fit-content"
                      >
                        Gratuit
                      </div>
                    </div>

                    <div class="d-flex">
                      <div class="d-flex align-center justify-center">
                        <div class="d-flex mr-3">
                          <v-icon>backpack</v-icon>
                        </div>

                        <v-spacer></v-spacer>

                        <div>
                          <div>Bagage supplémentaire</div>
                          <div>20 kg - 80×50×30 cm</div>
                        </div>
                      </div>

                      <div class="chooseDetails-action">
                        <v-btn
                          width="20"
                          depressed
                          plain
                          small
                          class="borderMe"
                          :ripple="false"
                          :disabled="extraBags <= 0"
                          @click="extraBags > 0 ? extraBags-- : ''"
                        >
                          <v-icon>remove</v-icon>
                        </v-btn>
                        <span class="persons-qty mx-2">{{ extraBags }}</span>
                        <v-btn
                          width="20"
                          depressed
                          plain
                          small
                          class="borderMe"
                          :ripple="false"
                          :disabled="extraBags == getTotalPassengers"
                          @click="extraBags++"
                        >
                          <v-icon>add</v-icon>
                        </v-btn>
                      </div>

                      <v-spacer></v-spacer>
                      <div>
                        {{ eachBagCost }}
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
                    v-model="email"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
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

            <v-radio-group v-model="paymentType">
              <v-radio
                color="accent"
                value="card"
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

              <div v-if="paymentType == 'card'" class="card-holder py-4">
                <div class="ml-3 centerWidth50">
                  <div class="card-layer">
                    <div class="card-label">Numéro de la carte</div>
                    <v-text-field
                      v-model="card.number"
                      placeholder="1234 5678 9012 3456"
                      dense
                      outlined
                      hide-details="auto"
                      class="contact-input number"
                      :rules="[rules.required, rules.number]"
                    ></v-text-field>
                  </div>

                  <v-row class="card-layer">
                    <v-col cols="6" class="py-0">
                      <div class="card-label">Date d'expiration</div>
                      <v-text-field
                        v-model="card.exp"
                        placeholder="01/12"
                        dense
                        outlined
                        hide-details="auto"
                        class="contact-input exp"
                        :rules="[rules.required, ownRules.exp]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <div class="card-label">CVC/CVV</div>
                      <v-text-field
                        v-model="card.cvv"
                        placeholder="123"
                        dense
                        outlined
                        hide-details="auto"
                        class="contact-input cvv"
                        :rules="[rules.required, rules.number]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <div class="card-layer">
                    <div class="card-label">Nom sur la carte</div>
                    <v-text-field
                      v-model="card.name"
                      placeholder="John Memphis"
                      dense
                      outlined
                      hide-details="auto"
                      class="contact-input name"
                      :rules="[rules.required, ownRules.fullName]"
                    ></v-text-field>
                  </div>
                </div>
              </div>

              <v-radio
                color="accent"
                value="paypal"
                class="selection-wrapper mb-0"
              >
                <template slot="label">
                  <v-img src="@/assets/img/paypal.svg" max-width="40"></v-img>
                  <div class="ml-2">Paypal</div>
                </template>
              </v-radio>

              <v-radio
                color="accent"
                value="cash"
                class="selection-wrapper mb-0"
              >
                <template slot="label">
                  <v-icon>money</v-icon>
                  <div class="ml-2">Cash</div>
                </template>
              </v-radio>
            </v-radio-group>

            <hr class="my-3" />

            <div class="d-flex align-center">
              <v-checkbox
                v-model="invoiceActive"
                hide-details
                class="mt-1 ml-1 noSpaceCheckbox x1-5transform"
                :disabled="paymentType == 'cash'"
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
            <div class="d-route begin">{{ queryData.from }}</div>
            <div class="d-route end">{{ queryData.to }}</div>
          </div>

          <div class="d-flex justify-space-between">
            <div>
              <span v-if="queryData.adult > 0">
                {{ queryData.adult }} Adults
              </span>
              <span v-if="queryData.children > 0">
                , {{ queryData.children }} Enfants
              </span>
            </div>
            <b>{{ queryData.station.fare }} €</b>
          </div>

          <div class="d-flex justify-space-between">
            <div>
              <span v-if="reservedSeats.length">
                Seats: {{ getSeletedSeatNames }}
              </span>
            </div>
            <b>{{ getTotalCost }} €</b>
          </div>

          <div class="d-flex justify-space-between">
            <div>
              <span v-if="extraBags > 0">
                {{ extraBags }} Bagage(s) supplémentaire(s)
              </span>
            </div>
            <b>{{ extraBags * eachBagCost }} €</b>
          </div>

          <hr class="my-3" />

          <div class="d-flex justify-space-between">
            <b>Total</b>
            <b>{{ getGrandTotal }} €</b>
          </div>

          <!-- Coupon -->
          <div class="sub-coupon primary--text">
            <p @click="slideCoupon" class="slideCoupon">
              <v-icon color="primary">book_online</v-icon>
              <span> Saisir le bon d'achat</span>
              <v-icon color="primary">expand_more</v-icon>
            </p>
            <div class="d-flex">
              <v-text-field
                dense
                hide-details
                outlined
                class="coupon-input mr-1"
                @input="couponToUpperCase"
              ></v-text-field>
              <v-btn
                depressed
                outlined
                color="primary"
                class="coupon-input gen-button"
              >
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

          <v-btn depressed color="primary gen-button parentWidth">
            Procéder au paiement
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog
      v-model="modalActive"
      persistent
      content-class="ma-0 modalDialog fullscreen"
      transition="scroll-x-reverse-transition"
      :max-width="invoiceActive ? '50%' : ''"
    >
      <div v-if="reservationActive" class="fillHeight reservationActive">
        <v-form ref="selectSeat" class="d-flex justify-end">
          <v-card
            tile
            min-width="344"
            max-width="100%"
            min-height="100vh"
            class="seat-category-description grey lighten-4"
          >
            <div class="d-flex flex-column justify-center parentHeight pa-4">
              <h2>Catégories de sièges</h2>

              <div class="d-flex align-center description-wrapper">
                <div class="description-icon d-flex flex-column available mr-3">
                  <div class="seat white">
                    <v-icon>star</v-icon>
                  </div>
                  <div class="seat-head white"></div>
                </div>

                <div class="description-text">Panorama</div>

                <v-spacer></v-spacer>

                <div class="description-price">
                  <b>+ 3,99 €</b>
                </div>
              </div>

              <div class="d-flex align-center description-wrapper">
                <div class="description-icon d-flex flex-column available mr-3">
                  <div class="seat white"></div>
                  <div class="seat-head white"></div>
                </div>

                <div class="description-text">Classique</div>

                <v-spacer></v-spacer>

                <div class="description-price">
                  <b>+ 3,99 €</b>
                </div>
              </div>

              <div class="d-flex align-center description-wrapper">
                <div class="description-icon d-flex flex-column available mr-3">
                  <div class="seat white">
                    <v-icon>fit_screen</v-icon>
                  </div>
                  <div class="seat-head white"></div>
                </div>

                <div class="description-text">Table</div>

                <v-spacer></v-spacer>

                <div class="description-price">
                  <b>+ 3,99 €</b>
                </div>
              </div>

              <div class="d-flex align-center description-wrapper">
                <div class="description-icon d-flex flex-column available mr-3">
                  <div class="seat secondary">
                    <v-icon color="borderLine">person</v-icon>
                  </div>
                  <div class="seat-head secondary"></div>
                </div>

                <div class="description-text">Votre siège</div>

                <v-spacer></v-spacer>

                <div class="description-price">
                  <b>+ 3,99 €</b>
                </div>
              </div>

              <div class="d-flex align-center description-wrapper">
                <div class="description-icon d-flex flex-column available mr-3">
                  <div class="seat white">
                    <v-icon>height</v-icon>
                  </div>
                  <div class="seat-head white"></div>
                </div>

                <div class="description-text">Siège confort</div>

                <v-spacer></v-spacer>

                <div class="description-price">
                  <b>+ 3,99 €</b>
                </div>
              </div>

              <div class="d-flex align-center description-wrapper">
                <div class="description-icon d-flex flex-column cancelled mr-3">
                  <div class="seat">
                    <v-icon>close</v-icon>
                  </div>
                  <div class="seat-head"></div>
                </div>

                <div class="description-text">
                  Indisponible à la réservation
                </div>

                <v-spacer></v-spacer>

                <div class="description-price">
                  <b>+ 3,99 €</b>
                </div>
              </div>
            </div>
          </v-card>

          <v-card tile min-width="410" min-height="100vh" class="ml-n2">
            <v-card tile class="pa-2 text-center">
              <div>
                <h2 class="app-title">Réservation de siège</h2>

                <span class="closeModal">
                  <v-btn
                    fab
                    plain
                    :ripple="false"
                    @click="
                      modalActive = false;
                      reservationActive = false;
                    "
                  >
                    <v-icon>close</v-icon>
                  </v-btn></span
                >
              </div>

              <p>{{ queryData.from }} - {{ queryData.to }}</p>
            </v-card>
            <v-card-text class="borderTestx">
              <div class="bus-diagram-diagram">
                <div class="seat-index-wrapper d-flex">
                  <div class="seat-index">A</div>
                  <div class="seat-index">B</div>
                  <v-spacer></v-spacer>
                  <div class="seat-index">C</div>
                  <div class="seat-index">D</div>
                </div>

                <div class="bus-diagram-mapping d-flex">
                  <div
                    class="left-mapping d-flex justify-space-between flex-wrap"
                  >
                    <div
                      v-for="(seat, index) in seats.slice(0, seats.length / 2)"
                      :key="index"
                      class="seat-wrapper"
                      @click="initSelection(seat.id)"
                    >
                      <div
                        v-if="seat.status == 'cancelled'"
                        class="d-flex flex-column cancelled"
                      >
                        <div class="seat">
                          <v-icon>close</v-icon>
                        </div>
                        <div class="seat-head"></div>
                      </div>

                      <div
                        v-else-if="seat.status == 'available' && !seat.selected"
                        class="d-flex flex-column available"
                      >
                        <div class="seat"></div>
                        <div class="seat-head"></div>
                      </div>

                      <div
                        v-if="seat.status == 'available' && seat.selected"
                        class="d-flex flex-column available selected"
                      >
                        <div class="seat secondary">
                          <v-icon color="borderLine">person</v-icon>
                        </div>
                        <div class="seat-head secondary"></div>
                      </div>
                    </div>
                  </div>
                  <div class="mapping-separator d-flex flex-column">
                    <div
                      v-for="(n, index) in seats.length / 4"
                      :key="index"
                      class="allChildrenCenter flex-grow-1 flex-shrink-0"
                    >
                      {{ n }}
                    </div>
                  </div>
                  <div
                    class="right-mapping d-flex justify-space-between flex-wrap"
                  >
                    <div
                      v-for="(seat, index) in seats.slice(
                        seats.length / 2,
                        seats.length
                      )"
                      :key="index"
                      class="seat-wrapper"
                      @click="initSelection(seat.id)"
                    >
                      <div
                        v-if="seat.status == 'cancelled'"
                        class="d-flex flex-column cancelled"
                      >
                        <div class="seat">
                          <v-icon>close</v-icon>
                        </div>
                        <div class="seat-head"></div>
                      </div>

                      <div
                        v-else-if="seat.status == 'available' && !seat.selected"
                        class="d-flex flex-column available"
                      >
                        <div class="seat"></div>
                        <div class="seat-head"></div>
                      </div>

                      <div
                        v-if="seat.status == 'available' && seat.selected"
                        class="d-flex flex-column available selected"
                      >
                        <div class="seat secondary">
                          <v-icon color="borderLine">person</v-icon>
                        </div>
                        <div class="seat-head secondary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="bus-diagram-action white">
              <div>
                {{ getCurrentSelection }} des {{ getTotalPassengers }} sièges
                réservés.
              </div>
              <v-spacer></v-spacer>
              <v-btn
                dense
                depressed
                color="primary"
                class="gen-button"
                @click="confirmReservation"
              >
                Confirmer ({{ getTotalCost }})
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </div>

      <div v-if="invoiceActive" class="white pa-12 position-relative">
        <span class="closeModal">
          <v-btn
            fab
            plain
            :ripple="false"
            @click="
              modalActive = false;
              invoiceActive = false;
            "
          >
            <v-icon>close</v-icon>
          </v-btn>
        </span>
        <div class="app-title text-center">Facture</div>
        <div>
          <v-radio-group v-model="invoice.type" row>
            <v-radio
              color="accent"
              value="personal"
              label="Personne"
              class="mb-0"
            >
            </v-radio>

            <v-radio
              color="accent"
              value="enterprise"
              label="Entreprise"
              class="mb-0"
            >
            </v-radio>
          </v-radio-group>
        </div>

        <div>
          <v-radio-group v-model="invoice.title" row>
            <v-radio color="accent" value="mrs" label="Mme." class="mb-0">
            </v-radio>

            <v-radio color="accent" value="mr" label="M." class="mb-0">
            </v-radio>
          </v-radio-group>
        </div>

        <div>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="invoice.firstName"
                label="Prénom"
                dense
                outlined
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="invoice.lastName"
                label="Nom de famille"
                dense
                outlined
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="invoice.address"
                label="Informations d'adresse complémentaires"
                dense
                outlined
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="invoice.streetNo"
                label="Rue + n°"
                dense
                outlined
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="invoice.postal"
                label="Cose Postal"
                dense
                outlined
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="invoice.city"
                label="Ville"
                dense
                outlined
                hide-details="auto"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="invoice.country"
                label="Pays"
                outlined
                dense
                :menu-props="{ offsetY: true }"
                :items="countryByName"
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <div class="text-center">
          <v-btn
            depressed
            color="primary"
            class="gen-button"
            @click="modalActive = false"
            >Confirmer</v-btn
          >
        </div>
      </div>
    </v-dialog>
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
      modalActive: false,
      queryData: null,
      // queryData: {
      //   from: "Berlin",
      //   to: "Munich",
      //   adult: "2",
      //   children: "2",
      //   bike_slot: "0",
      //   fare: 90,
      //   rideDate: "2021-06-16",
      // },
      seats: [
        {
          status: "cancelled",
          id: 0,
          cost: "5.95",
          category: "siège confort",
        },
        {
          status: "available",
          id: 1,
          cost: "8.40",
          category: "classique",
        },
        {
          status: "cancelled",
          id: 2,
          cost: "10.85",
          category: "classique",
        },
        {
          status: "cancelled",
          id: 3,
          cost: "13.30",
          category: "table",
        },
        {
          status: "cancelled",
          id: 4,
          cost: "15.75",
          category: "classique",
        },
        {
          status: "cancelled",
          id: 5,
          cost: "18.20",
          category: "classique",
        },
        {
          status: "available",
          id: 6,
          cost: "20.65",
          category: "table",
        },
        {
          status: "available",
          id: 7,
          cost: "23.10",
          category: "siège confort",
        },
        {
          status: "available",
          id: 8,
          cost: "25.55",
          category: "table",
        },
        {
          status: "available",
          id: 9,
          cost: "28.00",
          category: "classique",
        },
        {
          status: "available",
          id: 10,
          cost: "30.45",
          category: "classique",
        },
        {
          status: "available",
          id: 11,
          cost: "32.90",
          category: "siège confort",
        },
        {
          status: "cancelled",
          id: 12,
          cost: "35.35",
          category: "classique",
        },
        {
          status: "available",
          id: 13,
          cost: "37.80",
          category: "siège confort",
        },
        {
          status: "cancelled",
          id: 14,
          cost: "40.25",
          category: "table",
        },
        {
          status: "cancelled",
          id: 15,
          cost: "42.70",
          category: "classique",
        },
        {
          status: "cancelled",
          id: 16,
          cost: "45.15",
          category: "siège confort",
        },
        {
          status: "cancelled",
          id: 17,
          cost: "47.60",
          category: "table",
        },
        {
          status: "available",
          id: 18,
          cost: "50.05",
          category: "classique",
        },
        {
          status: "available",
          id: 19,
          cost: "52.50",
          category: "classique",
        },
        {
          status: "available",
          id: 20,
          cost: "54.95",
          category: "table",
        },
        {
          status: "available",
          id: 21,
          cost: "57.40",
          category: "table",
        },
        {
          status: "available",
          id: 22,
          cost: "59.85",
          category: "table",
        },
        {
          status: "available",
          id: 23,
          cost: "62.30",
          category: "siège confort",
        },
      ],
      childMinAge: new Date().toISOString().slice(0, 10),
      passengersData: [],
      reservedSeats: [],
      invoiceActive: false,
      invoice: {
        type: "",
        title: "",
      },
      reservationActive: false,
      reservationDone: false,
      optionsActive: false,
      luggaageActive: false,
      extraBags: 0,
      eachBagCost: 40,
      paymentType: "",
      card: {
        number: "",
        exp: "",
        cvv: "",
        name: "",
      },
      couponReady: false,
      lastName: "",
      firstName: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
      agree: false,
      show1: false,
      show2: false,
      ownRules: {
        exp: (value) =>
          !value ||
          /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value) ||
          "invalid expiry date",
        fullName: (value) =>
          !value ||
          /(\w+)(?:\s[^\s]+)?\s(\w+).*/.test(value) ||
          "invalid full name",
      },
    };
  },
  methods: {
    couponToUpperCase(val) {
      this.coupon = val.toUpperCase();
    },
    slideCoupon() {
      // this.haveCoupon = !this.haveCoupon;
      $(".coupon-input").slideToggle("fast", function () {
        // Animation complete.
      });
    },
    initSelection(seatId) {
      const currentSeat = this.seats[seatId];

      if (currentSeat.status == "available" && currentSeat.selected == true) {
        // Deselect Seat
        this.deselectSeat(seatId);
      } else if (this.getCurrentSelection < this.getTotalPassengers) {
        // Check total selection against total passengers
        // Select Seat
        if (currentSeat.status == "available") {
          this.selectSeat(seatId);
        }
      }
    },
    selectSeat(seatId) {
      // console.log("selected");
      this.seats[seatId].selected = true;
      this.reservedSeats.push(this.seats[seatId]);
      // console.log("getCurrentSelection:", this.getCurrentSelection);

      this.$forceUpdate();
    },
    deselectSeat(seatId) {
      console.log("deselected");
      delete this.seats[seatId].selected; // delete selected key from seat object
      this.reservedSeats = this.reservedSeats.slice(seatId, 1);
      // console.log("reservedSeats", this.reservedSeats);
      // console.log("getCurrentSelection:", this.getCurrentSelection);

      this.$forceUpdate();
    },
    confirmReservation() {
      this.modalActive = false;
      this.reservationActive = false;
      this.reservationDone = true;
    },
    gatherPassengersData() {
      const adult = this.queryData.adult;
      const children = this.queryData.children;

      for (let i = 0; i < adult; i++) {
        const item = { firstName: "", lastName: "", type: "adult" };
        this.passengersData.push(item);
      }

      for (let i = 0; i < children; i++) {
        const item = { firstName: "", lastName: "", type: "children", dob: "" };
        this.passengersData.push(item);
      }
    },
  },
  watch: {
    invoiceActive(val) {
      if (val == true) {
        this.modalActive = true;
      } else if (val == false) {
        this.invoice = {};
      }
    },
    modalActive(val) {
      if (val == false) {
        // disable all possible modals
        // this.invoiceActive = false;
        this.reservationActive = false;
      }
    },
  },
  created() {
    this.queryData = this.$route.params.data;
    if (this.queryData == null) {
      alert("Please select trips");
      this.$router.push("/search-trip");
      // this.gatherPassengersData();
    }
    this.gatherPassengersData();
  },
  computed: {
    ...mapGetters(["rules", "countryByName"]),
    getTotalPassengers() {
      console.log(this.queryData);
      return parseInt(this.queryData.adult) + parseInt(this.queryData.children);
    },
    // getPassengers() {
    //   let passengers = [];
    //   passengers.type;
    //   passengers.map((passenger)=> {pasereturn passenger})
    //   parseInt(this.queryData.adult) + parseInt(this.queryData.children);
    //   return passengers;
    // },
    getCurrentSelection: {
      cache: false,
      get() {
        // console.log("action");
        const seats = this.seats;
        let count = 0;

        seats.map((seat) => {
          // console.log(seat);
          if (seat.selected == true) {
            console.log(seat);
            count++;
          }
        });

        return count;
      },
    },
    getTotalCost() {
      const reducer = (acc, current) => acc + current;
      let totalArr = this.reservedSeats.map((seat) => parseFloat(seat.cost));

      let total = totalArr.reduce(reducer, 0);

      return total.toFixed(2) || 0;
    },
    getGrandTotal() {
      const extraBagCost = this.extraBags * this.eachBagCost || 0;
      return (
        extraBagCost +
        parseFloat(this.getTotalCost) +
        parseFloat(this.queryData.station.fare)
      );
    },
    getSeletedSeatNames() {
      let seats = this.reservedSeats.map((seat) => seat.id);
      console.log("seats:", seats);
      return seats.join();
    },
    calcSeats() {
      return this.seats.map((seat) => {
        const categories = ["classique", "table", "siège confort"];
        const random = Math.floor(Math.random() * categories.length);
        seat.category = categories[random];
        return seat;
      });
    },
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

.seat-category-description .description-icon {
  width: 20%;
}
.seat-category-description .description-text {
  width: 30%;
}
.seat-category-description .description-icon.available .seat-head,
.seat-category-description .description-icon.available .seat {
  border-color: var(--v-borderLine-base) !important;
}
.seat-category-description .description-wrapper {
  margin-bottom: 12px;
}

.reservationActive .closeModal {
  right: 0px;
  top: 3px;
}

/* Bus Diagram */
.bus-diagram-mapping {
  border-radius: 30px;
  border: 2px solid var(--v-borderLine-base);
  min-height: 60vh;
}
.bus-diagram-mapping,
.seat-index-wrapper {
  padding: 20px;
}
.seat-index-wrapper {
  font-weight: bold;
  text-align: center;
  padding-bottom: 0;
}
.seat-index {
  width: 20%;
}
.left-mapping,
.right-mapping {
  width: 40%;
}
.mapping-separator {
  width: 20%;
}
.seat-wrapper {
  width: 45%;
  margin-bottom: 10px;
  cursor: pointer;
}
.seat {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
}
.cancelled .seat {
  background-color: var(--v-borderLine-base);
  border-radius: 6px 6px 0 0;
}
.available .seat {
  background-color: transparent;
  border-radius: 6px 6px 0 0;
  border: 3px solid var(--v-borderLine-base);
  border-bottom: none;
  height: 55px;
}

.seat-head {
  height: 10px;
  border-radius: 0px 0px 6px 6px;
}
.cancelled .seat-head {
  background-color: var(--v-borderLine-base);
  margin-top: 2px;
}
.available .seat-head {
  background-color: transparent;
  border-radius: 6px;
  border: 3px solid var(--v-borderLine-base);
  height: 14px;
  margin-top: -7px;
}
.available.selected .seat-head {
  border: 3px solid var(--v-borderLine-base);
  height: 10px;
  border-radius: 0px 0px 6px 6px;
  margin-top: 2px;
}
.available.selected .seat {
  height: 50px;
}

.seat::after {
  content: "";
}
.cancelled::after {
  content: "";
}

.bus-diagram-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -2px 7px -1px rgb(0 0 0 / 37%);
  padding: 20px;
}
.card-holder {
  border-left: 1px solid var(--v-borderLine-base);
  border-right: 1px solid var(--v-borderLine-base);
}
.card-layer {
  margin-bottom: 20px !important;
}
</style>
