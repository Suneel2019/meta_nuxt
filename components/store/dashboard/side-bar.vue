<template>
  <v-navigation-drawer app clipped v-model="drawer">
    <v-list dense>
      <v-list-item two-line class="user-info">
        <v-list-item-avatar size="48">
          <img :src="storeUser['store_logo']">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{ storeUser['name'] }}</v-list-item-title>
          <v-list-item-subtitle>{{ storeUser['login_email'] }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item class="mt-3" @click="goToDashboardInfo">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name:'index' }">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Visit Home Page</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group no-action prepend-icon="mdi-gift-outline">
        <template v-slot:activator>
          <v-list-item-title>Orders</v-list-item-title>
        </template>

        <v-list-item :to="{ name:'store-orders-list' }">
          <v-list-item-content>
            <v-list-item-title>List of Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item :to="{ name:'store-balance-info' }">
        <v-list-item-icon>
          <v-icon>mdi-wallet</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Balance</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {

  name: "side-bar",

  data() {

    return {

      drawer: true,

    }

  },

  computed: {

    storeUser() {

      return this.$store.getters['login/USERCRED'];

    }

  },

  methods:{

    goToDashboardInfo(){

      this.$store.dispatch("dashboard/getStoreDashboardInfo").then(() => {

        this.$router.push({

          name: "store-dashboard-info"

        })

      });

    }

  }

}
</script>

<style scoped>

</style>
