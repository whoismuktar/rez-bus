<template>
  <div class="voucher">
    <div>
      <v-btn outlined color="primary" class="mr-2 gen-button">
        <v-icon class="mr-2">chevron_left</v-icon>
        <span>Revenir aux Réservations</span>
      </v-btn>
    </div>
    <div class="allChildrenCenter halfFillHeight">
      <div class="def-section centerWidth50">
        Suite a votre demande de remboursement, vous beneficier d'un code promo
        d'une valeur de <b>{{ grandTotal }} FCA</b> correspondant au montant de
        votre ticket de voyage . Le code promo est le
        <span class="secondary--text">#{{ voucherId }}</span>
        , il est utilisable dans la limite d’une année.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grandTotal: 0,
      voucherId: 123456,
    };
  },
  created() {
    this.grandTotal = this.$route.params.grandTotal;

    console.log(this.$route);
    console.log(this.grandTotal);

    // Return back to reservations if no voucher was process via route
    if (this.grandTotal === undefined) {
      alert("No voucher to process");
      this.$router.push({ name: "myReservations" });
    }
  },
};
</script>

<style></style>
