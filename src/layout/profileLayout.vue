<template>
  <div class="layout-wrapper profile-layout">
    <div class="d-flex">
      <v-navigation-drawer v-model="toggle" permanent width="15%" height="auto">
        <v-list class="pt-0">
          <v-list-item-group v-model="currentMenu">
            <v-list-item
              v-for="(menu, i) in profileMenu"
              :key="i"
              :class="[menu.logout ? 'mt-10' : '']"
              :disabled="menu.disabled"
              @click="
                menu.pathName ? $router.push({ name: menu.pathName }) : logout()
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-content class="drawer-content">
        <router-view class="ddd"></router-view>
      </v-content>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      toggle: true,
      currentMenu: null,
      profileMenu: [
        {
          title: "Mon Profit",
          icon: "person",
          pathName: "profile",
          disabled: false,
        },
        {
          title: "Mes Reservations",
          icon: "assignment",
          pathName: "myReservations",
          disabled: false,
        },
        {
          title: "Mes Modes de Paiement",
          icon: "credit_card",
          pathName: "paymentMode",
          disabled: false,
        },
        {
          title: "Se Déconnecter",
          icon: "logout",
          disabled: false,
          logout: true,
        },
      ],
    };
  },
  methods: {
    logout() {
      console.log("logout");
    },
  },
  created() {
    // Set tab selection
    const route = this.$route;
    const menus = this.profileMenu;
    this.currentMenu = menus.findIndex((menu) => menu.pathName == route.name);
  },
};
</script>

<style>
.drawer-content {
  width: 85%;
  padding: 0 30px 90px 30px !important;
}
</style>
