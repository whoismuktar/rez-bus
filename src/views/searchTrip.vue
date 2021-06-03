<template>
  <div class="search-trip">
    <div class="white pa-3">
      <div class="app-container def-section">
        <div class="search-box">
          <div class="way-trip">
            <v-radio-group v-model="tripMode" row>
              <v-radio label="Aller simple" color="accent" value="oneway">
              </v-radio>

              <v-radio label="Aller-retour" color="accent" value="returnWay">
              </v-radio>
            </v-radio-group>
          </div>

          <v-form ref="searchTrip-form">
            <v-row align="center">
              <v-col cols="5">
                <div class="d-flex position-relative">
                  <div>
                    <div>de</div>
                    <v-text-field
                      v-model="query.from"
                      dense
                      outlined
                      prepend-inner-icon="location_on"
                      append-icon="swap_horiz"
                      class="join-input-left route-from"
                    >
                      <template slot="prepend-inner-icon">
                        <i class="material-icons-outlined"> power </i>
                      </template>
                    </v-text-field>
                  </div>

                  <div>
                    <div>à</div>
                    <v-text-field
                      v-model="query.to"
                      dense
                      outlined
                      prepend-inner-icon="location_on"
                      class="join-input-last route-to"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col cols="3" class="d-flex">
                <div>
                  <div>Départ</div>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="query.rideDate"
                        placeholder="Pick a date"
                        prepend-inner-icon="date_range"
                        persistent-hint
                        dense
                        outlined
                        readonly
                        :class="[
                          tripMode == 'returnWay' ? 'join-input-left' : '',
                        ]"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="query.rideDate"
                      :menu-props="{ offsetY: true }"
                      :min="nowDate"
                      scrollable
                      color="primary"
                      header-color="primary"
                      event-color="blue"
                    >
                    </v-date-picker>
                  </v-menu>
                </div>

                <div v-if="tripMode == 'returnWay'">
                  <div>Départ</div>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="query.rideDate"
                        persistent-hint
                        dense
                        outlined
                        readonly
                        class="join-input-last"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="query.rideDate"
                      :menu-props="{ offsetY: true }"
                      :min="nowDate"
                      scrollable
                      color="primary"
                      header-color="primary"
                      event-color="blue"
                    >
                    </v-date-picker>
                  </v-menu>
                </div>
              </v-col>
              <v-col cols="2" align-self="start">
                <div>
                  <div>Passagers/vélos</div>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="400"
                    content-class="chooseDetails-menu"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        outlined
                        append-inner-icon="location_on"
                        class="
                          parentWidth
                          gen-button
                          chooseDetails-btn
                          justify-space-between
                        "
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span>
                          {{ query.adult }} Adult, {{ query.children }} Enfants,
                          {{ query.bike_slot }} Vélos</span
                        >
                        <div class="text-right">
                          <v-icon>expand_more</v-icon>
                        </div>
                      </v-btn>
                    </template>
                    <div class="chooseDetails-board def-section mb-0">
                      <div class="chooseDetails-layer">
                        <div class="chooseDetails-text">
                          <h2 class="app-title">Adultes</h2>
                          <div>à partir de 16 ans</div>
                        </div>
                        <div class="chooseDetails-action">
                          <v-btn depressed plain small :ripple="false">
                            <v-icon>remove</v-icon>
                          </v-btn>
                          <span class="persons-qty">3</span>
                          <v-btn depressed plain small :ripple="false">
                            <v-icon>add</v-icon>
                          </v-btn>
                        </div>
                      </div>

                      <div class="chooseDetails-layer">
                        <div class="chooseDetails-text">
                          <h2 class="app-title">Enfants</h2>
                          <div>de 0 à 15 ans</div>
                        </div>
                        <div class="chooseDetails-action">
                          <v-btn depressed plain small :ripple="false">
                            <v-icon>remove</v-icon>
                          </v-btn>
                          <span class="persons-qty">3</span>
                          <v-btn depressed plain small :ripple="false">
                            <v-icon>add</v-icon>
                          </v-btn>
                        </div>
                      </div>

                      <div class="chooseDetails-layer">
                        <div class="chooseDetails-text">
                          <h2 class="app-title">Vélos</h2>
                          <div>
                            Les vélos électriques ne sont pas autorisés dans les
                            bus.
                          </div>
                        </div>
                        <div class="chooseDetails-action">
                          <v-btn depressed plain small :ripple="false">
                            <v-icon>remove</v-icon>
                          </v-btn>
                          <span class="persons-qty">1</span>
                          <v-btn depressed plain small :ripple="false">
                            <v-icon>add</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </v-menu>
                </div>
              </v-col>
              <v-col cols="2">
                <div>
                  <v-btn
                    depressed
                    color="primary"
                    class="gen-button"
                    @click.prevent="searchRoute"
                  >
                    Chercher
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </div>

    <div v-if="searResultReady" class="app-container">
      <div class="searchResult">
        <v-row>
          <v-col cols="4">
            <div class="searchResult-sidebar">
              <div class="filterBy searchResult-child">
                <div class="d-flex justify-space-between">
                  <div>
                    <b>Filtrer selon</b>
                  </div>
                  <div>Réinitialiser</div>
                </div>

                <div class="filterBy-child">
                  <v-checkbox
                    label="Direct"
                    outlined
                    hide-details
                    class="noSpaceCheckbox"
                  ></v-checkbox>
                </div>

                <div class="filterBy-child">
                  <v-checkbox
                    label="1 Transfert"
                    outlined
                    hide-details
                    class="noSpaceCheckbox"
                  ></v-checkbox>
                </div>
              </div>

              <div class="fromTo searchResult-child">
                <div class="fromTo-child">
                  <div class="mb-4">
                    <div class="d-flex justify-space-between">
                      <b>Départ de: {{ query.from }}</b>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>
                        {{
                          new Date(query.rideDate).toDateString().split(" ")[0]
                        }}.,
                        {{
                          fromRange[0]
                            .toString()
                            .replace(/(\d{2})(\d{2})/, "$1:$2")
                        }}
                      </div>
                      <div>
                        {{
                          fromRange[1]
                            .toString()
                            .replace(/(\d{2})(\d{2})/, "$1:$2")
                        }}
                      </div>
                    </div>
                    <v-range-slider
                      v-model="fromRange"
                      step="30"
                      :min="minFromTime"
                      :max="maxFromTime"
                    ></v-range-slider>
                  </div>

                  <div class="mb-4">
                    <div class="d-flex justify-space-between">
                      <b>Arrivée à: {{ query.to }}</b>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div>
                        {{
                          new Date(query.rideDate).toDateString().split(" ")[0]
                        }}.,
                        {{
                          fromRange[0]
                            .toString()
                            .replace(/(\d{2})(\d{2})/, "$1:$2")
                        }}
                      </div>
                      <div>
                        {{
                          fromRange[1]
                            .toString()
                            .replace(/(\d{2})(\d{2})/, "$1:$2")
                        }}
                      </div>
                    </div>
                    <v-range-slider
                      v-model="fromRange"
                      step="30"
                      :min="minFromTime"
                      :max="maxFromTime"
                    ></v-range-slider>
                  </div>
                </div>
              </div>

              <div class="fromStops searchResult-child">
                <div class="fromStops-child">
                  <div class="d-flex justify-space-between">
                    <b>Arrêts - {{ query.from }}</b>
                  </div>

                  <v-btn
                    text
                    plain
                    color="primary"
                    class="gen-button pa-0 mr-3 right-vert-divider"
                    :ripple="false"
                    @click="selectAllFromStops"
                  >
                    Tout sélectionner
                  </v-btn>
                  <v-btn
                    text
                    plain
                    color="primary"
                    class="gen-button pa-0"
                    :ripple="false"
                    @click="resetAllFromStops"
                  >
                    Tout effacer
                  </v-btn>

                  <div
                    v-for="(stop, index) in fromStops"
                    :key="index"
                    class="fromStops-child"
                  >
                    <v-checkbox
                      v-model="stop.isActive"
                      outlined
                      hide-details
                      class="noSpaceCheckbox"
                    >
                      <template slot="label">
                        <span class="mr-1">
                          {{ query.from + " " + (index + 1) }}
                        </span>
                        <span class="borderLine--text">({{ stop.count }})</span>
                      </template>
                    </v-checkbox>
                  </div>
                </div>
              </div>

              <div class="toStops searchResult-child">
                <div class="toStops-child">
                  <div class="d-flex justify-space-between">
                    <b>Arrêts - {{ query.to }}</b>
                  </div>

                  <v-btn
                    text
                    plain
                    color="primary"
                    class="gen-button pa-0 mr-3 right-vert-divider"
                    :ripple="false"
                    @click="selectAllToStops"
                  >
                    Tout sélectionner
                  </v-btn>
                  <v-btn
                    text
                    plain
                    color="primary"
                    class="gen-button pa-0"
                    :ripple="false"
                    @click="resetAllToStops"
                  >
                    Tout effacer
                  </v-btn>

                  <div
                    v-for="(stop, index) in toStops"
                    :key="index"
                    class="toStops-child"
                  >
                    <v-checkbox
                      v-model="stop.isActive"
                      outlined
                      hide-details
                      class="noSpaceCheckbox"
                    >
                      <template slot="label">
                        <span class="mr-1">
                          {{ query.to + " " + (index + 1) }}
                        </span>
                        <span class="borderLine--text">({{ stop.count }})</span>
                      </template>
                    </v-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="8">
            <div class="d-flex align-center justify-space-between">
              <div>Voyage aller</div>

              <div>
                <div>Trier selon</div>
                <v-select
                  outlined
                  dense
                  :menu-props="{ offsetY: true }"
                  background-color="white"
                  :items="sortBy"
                  item-text="text"
                  item-value="sortBy"
                ></v-select>
              </div>
            </div>

            <div class="def-section py-3 d-flex align-center">
              <i class="material-icons-outlined mr-1"> info </i>
              <span
                >Veuillez consulter les
                <router-link to="#">
                  consignes des autorités compétentes
                </router-link>
                avant de voyager.</span
              >
            </div>

            <div class="def-section position-relative">
              <div class="text-uppercase">Voyager en toute sécurité</div>
              <b>Nous nous engageons à assurer votre sécurité</b>
              <div>Pour la sécurité de tous :</div>
              <ul>
                <li v-for="(rule, index) in safetyRules" :key="index">
                  {{ rule }}
                </li>
              </ul>

              <router-link to="#" class="check-guidelines">
                Consultez nos consignes
              </router-link>
            </div>

            <div
              v-for="(station, index) in stations"
              :key="index"
              class="def-section searchResult-tab"
            >
              <v-row>
                <v-col cols="8">
                  <div>
                    <div class="d-flex">
                      <b class="searchResult-tab-start mr-2">
                        {{ station.start }}
                      </b>
                      <div class="time-separator">
                        <span>{{ station.duration }}</span>
                      </div>
                      <b class="searchResult-tab-end ml-2">
                        {{ station.end }}
                      </b>
                    </div>

                    <div class="d-flex justify-space-bewteen">
                      <div class="stopsDests-start">
                        <span
                          v-for="(stop, index) in station.startStops"
                          :key="index"
                        >
                          {{ stop }}
                        </span>
                      </div>
                      <div class="spacer-b"></div>
                      <div class="stopsDests-end">
                        <span
                          v-for="(dest, index) in station.endStops"
                          :key="index"
                        >
                          {{ dest }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex align-center justify-space-between mt-4">
                    <div>
                      <div v-if="station.tripType == 'direct'">
                        <v-icon class="icon-outlined">directions_bus</v-icon>
                        <span class="mx-1">Direct</span>
                        <v-icon>expand_more</v-icon>
                      </div>

                      <div v-else class="d-flex align-center">
                        <div>
                          <v-icon class="icon-outlined">directions_bus</v-icon>
                          <v-icon class="icon-outlined tiny mx-n2">
                            chevron_right
                          </v-icon>
                          <v-icon class="icon-outlined">directions_bus</v-icon>
                        </div>
                        <span class="mx-1">1 Corresp.</span>
                        <v-icon>expand_more</v-icon>
                      </div>
                    </div>

                    <div class="d-flex justify-self-end">
                      <div v-if="station.isUtilityActive">
                        <v-icon>wifi</v-icon>
                        <i class="material-icons-outlined"> power </i>
                        <i class="material-icons-outlined"> sanitizer </i>
                      </div>

                      <div
                        v-if="!station.emptyStatus"
                        class="left-vert-divider"
                      >
                        <v-icon>groups</v-icon>
                        <span>Presque vide</span>
                      </div>
                    </div>
                  </div>
                </v-col>

                <v-col cols="4">
                  <div
                    class="
                      parentHeight
                      d-flex
                      flex-column
                      align-end
                      justify-space-between
                    "
                  >
                    <h2 class="app-title fareCost">
                      <span>{{ station.fare.toString().split(".")[0] }}</span>
                      <sup>,{{ station.fare.toString().split(".")[1] }}</sup>
                      <span class="currency">€</span>
                    </h2>
                    <v-btn depressed color="primary" class="gen-button">
                      Réserver
                      {{ parseInt(query.adult) + parseInt(query.children) }}
                      sièges
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripMode: "oneway",
      searResultReady: false,
      query: {
        from: "Berlin",
        to: "Munich",
      },
      stations: [
        {
          start: "7:10",
          duration: "9:10h",
          end: "10:10",
          startStops: ["start1", "start2", "start3", "start4"],
          endStops: ["Dest1", "Dest2", "Dest3", "Dest4"],
          tripType: "direct",
          isUtilityActive: true,
          emptyStatus: false,
          fare: 90.34,
        },
        {
          start: "9:10",
          duration: "11:10h",
          end: "8:10",
          startStops: ["start1", "start2", "start3", "start4"],
          endStops: ["Dest1", "Dest2", "Dest3", "Dest4"],
          tripType: "transfer",
          isUtilityActive: true,
          emptyStatus: false,
          fare: 101.55,
        },
      ],
      searchResult: {},
      fromRange: [0, 1300],
      minFromTime: 0,
      maxFromTime: 1300,
      minToTime: 0,
      maxToTime: 0,
      nowDate: new Date().toISOString().slice(0, 10),
      fromStops: [
        { isActive: true, ext: "a", count: 15 },
        { isActive: true, ext: "b", count: 4 },
        { isActive: false, ext: "c", count: 10 },
        { isActive: false, ext: "d", count: 40 },
      ],
      toStops: [
        { isActive: true, ext: "a", count: 1 },
        { isActive: false, ext: "b", count: 60 },
        { isActive: false, ext: "c", count: 44 },
        { isActive: false, ext: "d", count: 27 },
      ],
      sortBy: [
        { sortBy: "departure", text: "Prix (le plus bas)" },
        { sortBy: "price", text: "Départ (le plus tôt)" },
        { sortBy: "duration", text: "Durée (la moins longue)" },
      ],
      safetyRules: [
        "L'enregistrement se fait sans contact",
        "Les bus sont entièrement désinfectés",
        "Nos trains sont soigneusement nettoyés",
        "Les passagers doivent porter un masque",
        "Veuillez rester assis lorsque vous êtes à bord",
      ],
    };
  },
  methods: {
    searchRoute() {
      // this.$router.push({ path: "search-trip", query: this.query });

      const obj = this.query;
      var str = "";
      for (var key in obj) {
        if (str != "") {
          str += "&";
        }
        str += key + "=" + obj[key];
      }

      console.log(str);
      window.location.href = "/search-trip?" + str;
    },
    selectAllFromStops() {
      this.fromStops.map((stop) => (stop.isActive = true));
    },
    resetAllFromStops() {
      this.fromStops.map((stop) => (stop.isActive = false));
    },
    selectAllToStops() {
      this.toStops.map((stop) => (stop.isActive = true));
    },
    resetAllToStops() {
      this.toStops.map((stop) => (stop.isActive = false));
    },
  },
  created() {
    if (this.$route.query) {
      this.query = this.$route.query;
      this.searResultReady = true;
    }
    console.log("query", this.query);
  },
};
</script>

<style scoped>
>>> .route-from .v-input__append-inner {
  border: 1px solid var(--v-primary-base);
  border-radius: 50%;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px !important;
  position: absolute;
  right: -19px;
  background-color: #ffffff;
  z-index: 1;
}
>>> .route-to .v-input__prepend-inner {
  margin-left: 17px !important;
}
.chooseDetails-board {
  width: 100%;
  height: 100%;
}
.chooseDetails-layer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.chooseDetails-text {
  width: 50%;
}
.chooseDetails-btn span {
  white-space: nowrap;
  width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chooseDetails-layer:not(:last-child) {
  border-bottom: 1px solid var(--v-borderLine-base);
}
.persons-qty {
  border: 1px solid var(--v-borderLine-base);
  border-radius: 4px;
  padding: 10px 20px;
}

.searchResult-child {
  padding: 20px 0;
}
.searchResult-child:not(:last-child) {
  border-bottom: 1px solid var(--v-borderLine-base);
}
.check-guidelines {
  position: absolute;
  right: 15px;
  bottom: 20px;
}
.searchResult-tab .v-icon {
  cursor: pointer;
}
.searchResult-tab .icon-outlined.tiny {
  background-color: white;
  position: relative;
  z-index: 1;
}
.stopsDests-start {
  width: calc(8px + 30%);
}
.stopsDests-end {
  width: 25%;
}
.searchResult-tab .spacer-b {
  width: calc(16px + 40%);
}
.time-separator {
  position: relative;
  width: 60%;
  text-align: center;
}
.time-separator span {
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  padding: 0 8px;
}
.time-separator::before,
.time-separator::after {
  content: "";
  position: absolute;
  width: 50%;
  height: 1px;
  background-color: var(--v-borderLine-base);
  top: 50%;
}
.time-separator::before {
  left: 0;
}
.time-separator::after {
  right: 0;
}
.searchResult-tab-start,
.searchResult-tab-end {
  width: 11%;
}
</style>
