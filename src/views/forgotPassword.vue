<template>
  <div class="forgot-password">
    <v-row justify="center">
      <v-col cols="9">
        <div v-if="resetError" class="in-popUp fail">
          <div class="in-popUp-message">
            Cette valeur n'est pas une adresse email valide.
          </div>
          <v-icon class="in-popUp-closer" @click="resetError = false">
            close
          </v-icon>
        </div>

        <div v-if="resetSuccess" class="in-popUp pass">
          <div class="in-popUp-message">
            Un line de réinitialisation vient de vous être envoyé
          </div>
          <v-icon class="in-popUp-closer" @click="resetSuccess = false">
            close
          </v-icon>
        </div>
      </v-col>
      <v-col cols="12" lg="5" md="6">
        <h2 class="text-center">Reinitialise le mot de passe</h2>

        <v-form ref="resetPasswordForm" @submit.prevent="resetPassword">
          <div class="input-wrapper">
            <div class="input-label">E-mail</div>
            <v-text-field
              v-model="loginID"
              dense
              outlined
              hide-details
              placeholder="xxx@gmail.com ou +226XXXXXX"
              :rules="[
                rules.required,
                loginID.charAt(0) == '+' ? rules.phoneNumber : rules.email,
              ]"
            ></v-text-field>
          </div>

          <div class="text-center">
            <v-btn
              depressed
              x-large
              color="primary"
              class="gen-button"
              @click.prevent="resetPassword"
            >
              Soumettre
            </v-btn>
          </div>
        </v-form></v-col
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loginID: "",
      password: "",
      resetError: false,
      resetSuccess: false,
    };
  },
  methods: {
    resetPassword() {
      const validation = this.$refs.resetPasswordForm.validate();

      if (validation) {
        this.resetError = false; // disable error msg regardless

        // Initial forgot password method
        this.resetSuccess = true;
      } else {
        this.resetSuccess = false; // disable success msg regardless
        this.resetError = true;
      }
    },
  },
  computed: {
    ...mapGetters(["rules"]),
  },
};
</script>

<style></style>
