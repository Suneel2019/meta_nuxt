<template>
  <v-container fluid>
    <Header />
    <v-row no-gutters justify="space-around" class="body-2 mt-5" v-if="!paymentType">
      <v-col cols="5" xl="3" lg="3">
        <v-card
          elevation="4"
          class="payment_card text-center pa-3"
          @click="gotoOnline"
        >
          <div>
            <v-icon size="64" color="success">mdi-bank-check</v-icon>
          </div>
          <div class="mt-3">Online Payment</div>
        </v-card>
      </v-col>
      <v-col cols="5" xl="3" lg="3">
        <v-card
          elevation="4"
          class="payment_card text-center pa-3"
          @click="gotoOffline"
        >
          <div>
            <v-icon size="64" color="primary">mdi-bank-minus</v-icon>
          </div>
          <div class="mt-3">Offline Payment</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Offline from "./methods/offline";
import Online from "./methods/online";
import Header from "../../../../components/store/payment/offline-header/Header";
export default {
  name: "LoadBalance",
  layout: 'store-dashboard',
  components: {Online, Offline, Header},
  data() {
    return {
      activeIndex: null,
      cardElevation: 4,
      paymentType: null,
      paymentTypeList: [
        {
          logo: 'https://play-lh.googleusercontent.com/cusQ9xWY6oknKf8iTufVDt0bvkQILza8Ayimo395h1oy6HzYFI-NGplsDQjKXm07NxDd'
        },
      ],
      amount: null,
      amountRequired: [v => !!v || "Please Type Amount."],
      loadingButton: false,
      showProceedToUser: false,
      ispConnectData: null,
    }
  },
  methods: {
    resetData() {
      this.activeIndex = null;
      this.paymentType = null;
    },
    gotoOnline(){
      this.$router.push({
        name:'store-balance-load-balance-methods-online'
      })
    },
    gotoOffline(){
        this.$router.push({
          name:'store-balance-load-balance-methods-offline'
        })
    }
  }
}
</script>

<style scoped>

</style>
