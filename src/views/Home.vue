<template>
  <div class="home">
    <home-hero></home-hero>
  </div>
</template>

<script>
import homeHero from "@/components/homeAssets/hero";
export default {
  name: "Home",
  components: {
    homeHero,
  },
};
</script>
<style scoped>
.home {
  background-color: #ffffff;
}
</style>
