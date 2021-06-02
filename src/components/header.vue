<template>
  <div class="header">
    <v-toolbar dense flat class="app-container">
      <v-app-bar-nav-icon>
        <v-img
          alt="Rez Bus Logo"
          contain
          src="@/assets/logo.svg"
          transition="scale-transition"
          width="86"
          height="auto"
        />
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <div></div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "navHeader",
};
</script>

<style scoped>
.header {
  /* box-shadow: 0 5px 6px 0px var(--v-secondary-lighten5); */
  border-bottom: 1px solid var(--v-secondary3-base);
  height: 80px;
  display: flex;
  align-items: center;
}
</style>
