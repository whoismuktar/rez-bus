<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return { query: {}, searchResult: {} };
  },
  created() {
    this.query = this.$route.query;
  },
};
</script>

<style></style>
