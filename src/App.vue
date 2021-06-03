<template>
  <v-app class="bodyBG">
    <nav-header />
    <v-main class="mainBody">
      <router-view />
    </v-main>
    <nav-footer />
  </v-app>
</template>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
<script>
import navHeader from "./components/header.vue";
import navFooter from "./components/footer.vue";
export default {
  components: { navHeader, navFooter },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
