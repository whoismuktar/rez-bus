<template>
  <div class="footer py-4 borderLine">
    <div class="app-container">
      <v-row justify="space-between" align="center">
        <v-col cols="2">
          <div class="app-container">
            <v-img
              alt="Rez Bus Logo"
              class="shrink mr-2"
              contain
              src="@/assets/logo.svg"
              transition="scale-transition"
              width="86"
              height="49"
            />
          </div>
        </v-col>

        <v-col cols="4">
          <div class="d-flex justify-space-between">
            <router-link to="/confidential"> Confidentialité </router-link>
            <router-link to="/legal-notice"> Mentions légales </router-link>
            <router-link to="/contact">Contacts</router-link>
          </div>
        </v-col>
      </v-row>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "navHeader",
  data() {
    return {
      menu: [],
    };
  },
};
</script>

<style scoped>
.footer {
  /* position: absolute; */
  /* bottom: 0; */

  width: 100%;
}
</style>
