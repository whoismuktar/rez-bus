<template>
  <div class="header">
    <v-toolbar dense flat class="app-container">
      <router-link to="/">
        <v-img
          alt="Rez Bus Logo"
          contain
          src="@/assets/logo.svg"
          transition="scale-transition"
          max-width="86px"
          height="auto"
        />
      </router-link>

      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <div class="d-flex signedIn-menuWrapper primary--text mr-2">
          <router-link
            v-for="(menu, index) in menus"
            :key="index"
            :to="menu.route"
            class="signedIn-menu mr-3"
          >
            <v-icon>{{ menu.icon }}</v-icon>
            <span>{{ menu.title }}</span>
          </router-link>
        </div>

        <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">expand_more</v-icon>
            <v-icon class="round-avatar">person</v-icon>
          </template>

          <v-list>
            <v-list-group
              v-for="(item, index) in dropdownMenu"
              :key="index"
              v-model="item.active"
            >
              <template v-slot:activator>
                <v-list-item @click="$router.push(item.route)">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list-item v-for="(subItem, i) in item.items" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-menu>

        <!-- <v-menu nudge-top="-50">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <img
                class="round-avatar mt-2"
                :src="require('@/assets/img/avatar.png')"
              />
              {{ attrs["aria-expanded"] }}
              <v-icon v-if="attrs['aria-expanded']">expand_more</v-icon>
              <v-icon v-else>expand_less</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
      </div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "navHeader",
  data() {
    return {
      menus: [
        {
          icon: "work_outline",
          title: "Comparaison de billet",
          route: "/compare-ticket",
        },
        { icon: "search", title: "Rechercher", route: "/search-trip" },
      ],
      dropdownMenu: [
        {
          title: "Inscription",
          route: "/signin",
          items: [],
        },
        {
          title: "Connexion",
          route: "/register",
          active: false,
          items: [],
        },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid var(--v-secondary3-lighten5);
  height: 80px;
  display: flex;
  align-items: center;
}
.round-avatar {
  height: 40px;
  width: 40px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid #dedede;
  background-color: var(--v-borderLine-base);
}
</style>
