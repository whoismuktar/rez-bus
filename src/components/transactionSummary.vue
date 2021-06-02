.
<template>
  <div class="transaction-summary app-container">
    <div
      class="
        d-flex
        flex-column
        align-center
        def-section
        position-relative
        transaction-summary-wrapper
      "
    >
      <v-icon>drafts</v-icon>
      <h2 class="app-title">Réservation réssie</h2>

      <div>Merci de voyager avec RezBus!</div>
      <div>
        Votre confirmation de réservation (<b>#1092749914</b>) a été envoyée à
        <b>user@website.com</b>
      </div>

      <v-btn
        text
        plain
        color="primary"
        class="gen-button"
        :ripple="false"
        @click="modalActive = true"
      >
        Vous n'avez pas reçu l'email?
      </v-btn>

      <div class="text-center my-5">
        <v-btn depressed color="primary" class="gen-button mr-2">Billet</v-btn>
        <v-btn outlined color="primary" class="gen-button mr-2">Facture</v-btn>
        <v-btn outlined color="primary" class="gen-button">
          Étiqquette baga...
        </v-btn>
      </div>

      <div class="def-section primary-border text-left">
        <div class="d-flex align-start">
          <i class="material-icons-outlined mr-2"> info </i>
          <div>
            Cliquez ici pour plus d'informations Cliquez ici pour plus
            d'informations Cliquez ici pour plus d'informations Cliquez ici pour
            plus d'informations Cliquez ici pour plus d'informations Cliquez ici
            pour plus d'informations Cliquez ici pour plus d'informations plus
            <router-link to="#"> https://corona-virus-link </router-link>
          </div>
        </div>
      </div>

      <div class="def-section primary-border text-left">
        <div class="d-flex align-start">
          <div>
            Lorem ipsum <b>dolor sit amet</b>, consectetur adipisicing elit.
            Consectetur officia harum reprehenderit quisquam tempora repellendus
            optio dolores ut ipsa quas cum <b>quis vitae</b>, eaque possimus sed
            repellat ab? Unde, totam.
          </div>
        </div>
      </div>

      <div class="summary-bottom">
        <hr class="broken my-2" />
        <div>
          <b>Samedi, {{ new Date().toDateString() }}</b>
        </div>

        <v-row justify="space-between">
          <v-col cols="7" class="d-flex justify-space-between">
            <div class="route">
              <div class="d-flex">
                <div class="mr-2">11:00</div>
                <div class="d-route begin">Destination A</div>
              </div>

              <div class="d-flex">
                <div class="mr-2">12:00</div>
                <div class="d-route end">Destination B</div>
              </div>
            </div>
            <div>
              <div>6:11h</div>
              <div>Direct</div>
            </div>
          </v-col>

          <v-col cols="3">
            <div>
              <v-btn outlined color="primary" class="gen-button">
                <v-icon>date_range</v-icon>
                Ajouter à ...
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Dialog -->
    <v-dialog
      v-model="modalActive"
      max-width="500px"
      content-class="no-box-shadow"
    >
      <div class="def-section text-center">
        <div>
          <b>Confirmez votre adresse mail</b>
        </div>
        <v-text-field
          v-model="email"
          outlined
          class="centered-input"
        ></v-text-field>
        <v-btn color="primary" class="gen-button">Renvoyer</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return { modalActive: false, email: "user@email.com" };
  },
};
</script>

<style scoped>
.transaction-summary .summary-bottom {
  position: relative;
  width: 100%;
}
.transaction-summary .summary-bottom hr {
  position: relative;
}
.transaction-summary .summary-bottom::before,
.transaction-summary .summary-bottom::after {
  content: "";
  position: absolute;
  top: -9px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--v-bodyBG-base);
  background-color: var(--v-bodyBG-base);
}
.transaction-summary .summary-bottom::before {
  left: -40px;
  box-shadow: inset -4px 0px 1px -1px #e1e1e1;
}
.transaction-summary .summary-bottom::after {
  right: -40px;
  box-shadow: inset 4px 0px 1px -1px #e1e1e1;
}
</style>
