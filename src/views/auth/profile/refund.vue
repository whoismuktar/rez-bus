<template>
  <div class="auth refund">
    <div class="app-title mb-3">Mes réservations</div>
    <!-- <pre class="testFloat">{{ selectedReservation }}</pre> -->
    <div v-if="!reservationSelected">
      <div
        v-for="(item, index) in reservations"
        :key="index"
        class="selection-wrapper def-section"
        @click="openReservation(item)"
      >
        <div class="reservation">
          <div>
            <div class="d-flex">
              <v-icon>airline_seat_recline_normal</v-icon>
              <v-icon
                v-if="item.completed"
                color="secondary4"
                class="tiny ml-n2 mb-n4"
              >
                check_circle
              </v-icon>
              <div class="ml-3">
                <h2 class="app-title">{{ item.from }} - {{ item.to }}</h2>
              </div>

              <v-spacer></v-spacer>

              <v-icon>chevron_right</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12" lg="8">
          <h3>Annuler / modifier votre réservation</h3>

          <div class="def-section d-flex justify-space-between">
            <div>
              <div>Réservation: #{{ selectedReservation.id }}</div>
              <div>
                E-mail: <span>{{ user.email }}</span>
              </div>
            </div>

            <div>
              <v-btn outlined color="primary" class="mr-2 gen-button">
                <v-icon class="mr-2">get_app</v-icon>
                <span>Billet</span>
              </v-btn>
              <v-btn outlined color="primary" class="gen-button">
                <v-icon class="mr-2">get_app</v-icon>
                <span>Facture</span>
              </v-btn>
            </div>
          </div>

          <div class="def-section">
            <div class="d-flex">
              <div>
                <div>
                  <b>{{ selectedReservation.from }}</b>
                  <span>
                    <v-icon>chevron_right</v-icon>
                  </span>
                  <b>{{ selectedReservation.to }}</b>
                </div>
                <div>
                  {{ getDateTime }}
                </div>
              </div>

              <v-spacer></v-spacer>
            </div>

            <!-- <pre>{{ toRefund }}</pre> -->
            <div
              v-for="(person, index) in toRefund"
              :key="index"
              class="def-section"
            >
              <div class="d-flex">
                <i class="material-icons-outlined mr-1"> person </i>
                <div
                  class="mr-2"
                  :class="person.cancelled ? 'lineThrough' : ''"
                >
                  <span>{{ person.firstName }} </span>
                  <span>{{ person.lastName }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="4">
          <h3>Vos Modifications</h3>
          <div>
            <b>{{ getDateTime }}</b>

            <div class="route">
              <div class="d-route begin">{{ selectedReservation.from }}</div>
              <div class="d-route end">{{ selectedReservation.to }}</div>
            </div>

            <div class="d-flex justify-space-between">
              <div>
                <s>
                  {{ selectedReservation.from }} - {{ selectedReservation.to }}
                </s>
              </div>
              <b>-{{ selectedReservation.grandTotal }} €</b>
            </div>
            <div class="ml-3 d-flex flex-column">
              <div v-for="(person, index) in toRefund" :key="index">
                <s>{{ person.firstName }} {{ person.lastName }}d</s>
              </div>
            </div>

            <hr class="my-3" />

            <div class="d-flex justify-space-between">
              <b>Remboursement</b>
              <h2>{{ selectedReservation.grandTotal }} €</h2>
            </div>
          </div>

          <!-- <div>
            Vous navez apporté aucune modification a votre réservation jusqu’a
            présent.
          </div> -->

          <div class="text-center mt-5">
            <v-btn color="primary" class="gen-button" @click="proceedToVoucher">
              Passer au bon
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <div>
      updateProhibited: {{ updateProhibited }}
      <br />
      Date: {{ selectedReservation.rideDate }}
    </div> -->

    <!-- Dialog -->
    <v-dialog
      v-model="modalActive"
      max-width="500px"
      content-class="no-box-shadow"
    >
      <div class="def-section">
        <div v-if="editTripBioActive">
          <v-form ref="editTripBioForm">
            <div class="mb-2">
              <b class="app-title">Modifer les données</b>
            </div>
            <v-row>
              <v-col cols="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Prénom</div>
                  <v-text-field
                    v-model="selectedPassenger.firstName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Nom de Famille</div>
                  <v-text-field
                    v-model="selectedPassenger.lastName"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" class="py-0">
                <div class="input-wrapper">
                  <div class="input-label">Numéro de téléphone portable</div>
                  <v-text-field
                    v-model.number="selectedPassenger.phone"
                    dense
                    outlined
                    hide-details="auto"
                    :rules="[rules.required]"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <div class="text-center">
              <v-btn
                outlined
                color="primary"
                class="gen-button"
                @click="modalActive = false"
              >
                Annuler la modification
              </v-btn>
              <span class="mx-5"></span>
              <v-btn color="secondary" class="gen-button" @click="editTripBio">
                Enregistrer
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      toRefund: [],
      modalActive: false,
      editTripBioActive: false,
      reservationSelected: !false,
      refundActive: false,
      disableProceed: true,
      changeDetected: false,
      selectedPassenger: {},
      passengerIndex: null,
      selectedReservation: {
        id: 1234567,
        from: "Berlin",
        to: "Munich",
        adult: "2",
        children: "2",
        bike_slot: "0",
        fare: 90,
        rideDate: "2021-11-30",
        completed: true,
        grandTotal: 400,
        passengers: [
          {
            firstName: "csdsd",
            lastName: "cdsdc",
            type: "adult",
            // cancelled: true,
          },
          {
            firstName: "sdcsd",
            lastName: "csdcsdc",
            type: "adult",
          },
          {
            firstName: "sdcsdc",
            lastName: "sdcsd",
            type: "children",
            dob: "2021-06-22",
          },
          {
            firstName: "sdcsdc",
            lastName: "verer",
            type: "children",
            dob: "2021-06-22",
          },
          {
            firstName: "csdsd",
            lastName: "cdsdc",
            type: "adult",
          },
          {
            firstName: "sdcsd",
            lastName: "csdcsdc",
            type: "adult",
          },
          {
            firstName: "sdcsdc",
            lastName: "sdcsd",
            type: "children",
            dob: "2021-06-22",
          },
          {
            firstName: "sdcsdc",
            lastName: "verer",
            type: "children",
            dob: "2021-06-22",
          },
        ],
      },
      reservations: [
        {
          id: 1234567,
          from: "PSV",
          to: "Croatia",
          adult: "2",
          children: "2",
          bike_slot: "0",
          fare: 90,
          rideDate: "2021-06-16",
          completed: true,
        },
        {
          id: 432432,
          from: "Berlin",
          to: "Munich",
          adult: "2",
          children: "2",
          bike_slot: "0",
          fare: 90,
          rideDate: "2021-06-16",
          completed: false,
        },
      ],
    };
  },
  watch: {
    modalActive(val) {
      if (val == false) {
        // disable all possible modals
        this.editTripBioActive = false;
        this.selectedPassenger = {};
        this.passengerIndex = null;
      }
    },
    refundActive(val) {
      if (val) {
        this.disableProceed = false;
      }
    },
  },
  methods: {
    proceedToVoucher() {
      this.refundActive = false;
      const collateRefunds = this.selectedReservation.passengers.filter(
        (passenger) => (passenger.cancelled = true)
      );
      console.log(collateRefunds);
      this.$router.push({
        name: "refundVoucher",
        params: { grandTotal: this.selectedReservation.grandTotal },
      });
    },
    openReservation(trip) {
      console.log(trip);

      this.reservationSelected = true;
      // this.selectedReservation = trip // uncomment in production
    },
  },
  computed: {
    ...mapGetters(["nowDate", "rules", "daysOfTheWeek", "monthNames"]),
    ...mapState(["user"]),
    getDateTime() {
      const dateTime = new Date(this.selectedReservation.rideDate);
      const dateTimeArr = dateTime.toString().split(" ");
      const monthName = this.monthNames[dateTime.getMonth()];
      const dayOfWeek = this.daysOfTheWeek[dateTime.getDay()];
      const day = dateTimeArr[2];

      let hr = new Date(dateTime).getHours();
      let min = new Date(dateTime).getMinutes();

      if (hr.toString().length == 1) {
        hr = `0${hr}`;
      }
      if (min.toString().length == 1) {
        min = `0${min}`;
      }

      const final = hr + ":" + min;

      const concat = `${dayOfWeek}, ${day} ${monthName}, ${final}`;
      // return dateTimeArr;
      return concat;
    },
  },
  created() {
    this.toRefund = this.$route.params.collateRefunds;

    // Return back to reservations if no refund was process via route
    if (this.toRefund === undefined) {
      alert("No refund to process");
      this.$router.push({ name: "myReservations" });
    }
  },
};
</script>

<style scoped>
.selection-wrapper {
  cursor: pointer;
}
>>> .v-application .v-main__wrap {
  overflow: auto;
}
</style>
