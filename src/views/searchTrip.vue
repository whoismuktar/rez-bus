<template>
  <div class="search-trip">
    <div class="white pa-3">
      <div class="app-container">
        <div class="search-box">
          <div class="way-trip">
            <v-radio-group row>
              <v-radio
                label="Aller simple"
                color="accent"
                value="company"
                class="selection-wrapper mb-0"
              >
              </v-radio>

              <v-radio
                label="Aller-retour"
                color="accent"
                value="company"
                class="selection-wrapper mb-0"
              >
              </v-radio>
            </v-radio-group>
          </div>

          <v-row align="center">
            <v-col cols="5">
              <div class="d-flex position-relative">
                <div>
                  <div>de</div>
                  <v-text-field
                    v-model="query.from"
                    dense
                    outlined
                    prepend-inner-icon="mdi-map-marker"
                    append-icon="mdi-swap-horizontal"
                    class="join-input-left route-from"
                  ></v-text-field>
                </div>

                <div>
                  <div>à</div>
                  <v-text-field
                    v-model="query.to"
                    dense
                    outlined
                    prepend-inner-icon="mdi-map-marker"
                    class="join-input-last route-to"
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="3">
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
                      prepend-inner-icon="mdi-calendar"
                      persistent-hint
                      dense
                      outlined
                      readonly
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
                      append-inner-icon="mdi-map-marker"
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
                        <v-icon right>mdi-chevron-down</v-icon>
                      </div>
                    </v-btn>
                  </template>
                  <div class="chooseDetails-board def-section mb-0">
                    <div class="chooseDetails-layer">
                      <div class="chooseDetails-text">
                        <h2>Adultes</h2>
                        <div>à partir de 16 ans</div>
                      </div>
                      <div class="chooseDetails-action">
                        <v-btn depressed plain small :ripple="false">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="persons-qty">3</span>
                        <v-btn depressed plain small :ripple="false">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <div class="chooseDetails-layer">
                      <div class="chooseDetails-text">
                        <h2>Enfants</h2>
                        <div>de 0 à 15 ans</div>
                      </div>
                      <div class="chooseDetails-action">
                        <v-btn depressed plain small :ripple="false">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="persons-qty">3</span>
                        <v-btn depressed plain small :ripple="false">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <div class="chooseDetails-layer">
                      <div class="chooseDetails-text">
                        <h2>Vélos</h2>
                        <div>
                          Les vélos électriques ne sont pas autorisés dans les
                          bus.
                        </div>
                      </div>
                      <div class="chooseDetails-action">
                        <v-btn depressed plain small :ripple="false">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="persons-qty">1</span>
                        <v-btn depressed plain small :ripple="false">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="2">
              <div>
                <v-btn depressed color="primary" class="gen-button"
                  >Chercher</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <div class="app-container">
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
          <v-col cols="8"></v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {},
      searchResult: {},
      fromRange: [0, 1300],
      minFromTime: 0,
      maxFromTime: 1300,
      minToTime: 0,
      maxToTime: 0,
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
      nowDate: new Date().toISOString().slice(0, 10),
    };
  },
  methods: {
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
    this.query = this.$route.query;
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
</style>
