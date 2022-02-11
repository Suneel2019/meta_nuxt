<template>
  <v-app-bar dense app color="darkBlue" dark clipped-left class="app_bar_button_design">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>
      <!--      <v-img-->
      <!--        alt="Logo"-->
      <!--        max-height="60"-->
      <!--        max-width="120"-->
      <!--        :src="companyLogo"-->
      <!--        @click="goToHomePage">-->
      <!--      </v-img>-->
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <span v-if="isAccountVerified && !showBalance" class="ml-4 subtitle-2">
        Active Balance : Rs. XXXX
        <v-btn
          icon
          small
          @click="getCurrentBalance"
        >
          <v-icon small>mdi-eye-off</v-icon>
        </v-btn>
    </span>
    <span v-if="isAccountVerified && currentBalanceInfo">
      <span class="body-2 mr-2">Active Balance : Rs. {{ currentBalanceInfo['active_balance'] }}</span>
      <store-balance-information :balance-info="currentBalanceInfo"></store-balance-information>
      <v-icon
        small
        class="ml-2"
        @click="hideBalanceInformation"
      >
        mdi-eye
      </v-icon>
    </span>

    <span class="body-2 ml-5">{{ userName }}</span>

    <v-menu offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense class="caption">
        <v-list-item :to="{name:'store-profile'}">
          <v-icon size="18">mdi-account</v-icon>
          <span class="ml-2">My Profile</span>
        </v-list-item>
        <v-list-item @click="logOut">
          <v-icon size="18">mdi-logout</v-icon>
          <span class="ml-2">Log Out</span>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import logout from "@/helpers/shared/logout";
import wallet from "@/store/store/wallet";
import dataFormatter from "@/helpers/shared/dataFormatter";

export default {

  name: "nav-bar",

  components: {

    StoreBalanceInformation: () => import("@/components/shared/home-page/StoreBalanceInformation")

  },

  data() {

    return {

      showBalance: false,
      currentBalanceInfo: null,

    }

  },

  created() {

    this.$store.registerModule('wallet', wallet);

  },

  beforeRouteLeave(to, from, next) {

    this.$store.unregisterModule('wallet');

    next();
  },

  computed: {

    isAccountVerified() {

      return this.$store.getters["login/ACCOUNT_STATUS"]['status'] === 'approved';

    },

    userName() {

      return this.$store.getters["login/USERCRED"]['name'];

    },

  },

  methods: {

    goToHomePage() {

      this.$router.push({name: "index"});

    },

    logOut() {

      let context = this;

      logout(context);

      this.$router.push({name: "index"});

    },

    getCurrentBalance() {

      this.$store.dispatch('wallet/getCurrentUserWalletDetail').then(res => {

        if (res.length) {

          console.log('array');

          this.currentBalanceInfo = res[0];

        } else {

          console.log('object');

          this.currentBalanceInfo = res;

        }

        console.log(this.currentBalanceInfo, 'balance info');

        this.showBalance = true;

      });

    },

    hideBalanceInformation() {

      this.showBalance = false;

      this.currentBalanceInfo = null;

    },

    convertCurrency(currency) {

      return dataFormatter.formatCurrency(currency);

    },

  }

}
</script>

<style scoped>

</style>
