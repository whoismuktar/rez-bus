<template>
  <div class="footer">
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

    <v-spacer></v-spacer>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "navHeader",
};
</script>

<style scoped>
.footer {
  /* position: absolute; */
  /* bottom: 0; */
  width: 100%;
}
</style>
