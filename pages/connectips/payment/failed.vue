<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row v-if="transactionAmount" no-gutters align="center" justify="center" style="height: 150px;">
          <v-col cols="5" xl="3" lg="3">
            <v-icon color="error" dark size="150">mdi-close-outline</v-icon>
          </v-col>
        </v-row>
        <v-row v-if="transactionAmount" no-gutters align="center" justify="center" class="mt-3 ml-7">
          <v-col cols="12" xl="5" lg="5">
            <div class="load_balance_successful_message error--text ml-6">Your payment was failed.</div>
          </v-col>
        </v-row>
        <v-row v-if="transactionAmount" no-gutters align="center" justify="center">
          <v-col cols="8" xl="3" lg="3">
            <div class="transaction_id_text black--text mt-5">Transaction ID : {{ $route.query.TXNID }}</div>
          </v-col>
        </v-row>
        <v-row v-if="transactionAmount" no-gutters align="center" justify="center">
          <v-col cols="10" xl="4" lg="4">
            <div class="transaction_id_text black--text mt-5 ml-0">Transaction Amount : Rs. {{
                transactionAmount
              }}
            </div>
          </v-col>
        </v-row>
        <v-row style="height: 200px" no-gutters align="center" justify="center">
          <v-col cols="12" v-if="errorMessage!==''">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" xl="6" lg="6">
                <v-alert dismissible border="left" type="error" outlined tile dense dark>
                  <div class="text-center subtitle-2">{{ errorMessage }}</div>
                </v-alert>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="4" xl="2" lg="2" class="pl-6">
            <v-btn :to="{name:'StoreBalance'}" color="green" dark tile small>Load Again</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import connectIPSStore from "@/store/store/online-payment";
import errorHandler from "@/helpers/shared/errorHandler";

export default {
  name: "failed",
  component: {
  },

  data() {
    return {
      errorTransactionId: null,
      errorMessage: '',
      transactionAmount: null,
      loading: true,
    }
  },

  layout: 'store-dashboard',

  created() {

    !this.$store.hasModule('connectIPSStore') ? this.$store.registerModule('connectIPSStore', connectIPSStore) : '';

  },
  watch: {

    '$routes': {

      handler() {

        if (this.$route.query.TXNID) {

          this.errorTransactionId = this.$route.query.TXNID;

          this.checkWhetherTheTransactionIsFailed(this.errorTransactionId);

        }

      },

      immediate: true

    }

  },

  methods: {

    checkWhetherTheTransactionIsFailed(transactionId) {

      this.$store.dispatch("connectIPSStore/checkForTheTransactionFailed", {TXNID: transactionId}).then(response => {

        this.errorMessage = '';

        this.transactionAmount = response.data.txnAmt;

        this.loading = false;

      }).catch((e) => {

        this.loading = false;
        errorHandler(e, this)

      })

    }

  }
}
</script>

<style scoped>

</style>
