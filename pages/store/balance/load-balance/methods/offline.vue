<template>
  <v-card>
    <Header />
    <v-row no-gutters class="body-2 mt-5">

      <v-col cols="12">
        <v-card class="px-3 pb-4" style="box-shadow: 0 0 1rem rgba(0,0,0,.175);">
          <v-row class="pt-5" no-gutters>
            <v-col cols="12" class="body-2 red--text pl-3">
              Field with asterisk (*) is required.
            </v-col>

            <v-col cols="12" class="subtitle-1 font-weight-medium headerPrimaryColor mt-2 px-3 pt-1 pb-1">
              Payment Detail
            </v-col>

            <v-col cols="12" lg="6"  class="mt-5 pl-3">
              <v-row no-gutters>
                <v-col cols="5" xs="6" sm="6" class="mt-2">
                  Payment Type: <span class="red--text">*</span>
                </v-col>

                <v-col cols="7" xs="6"  sm="6">
                  <v-form ref="paymentTypeForm">
                    <v-autocomplete
                      solo
                      flat
                      dense
                      item-text="name"
                      item-value="value"
                      placeholder="--- Payment Type ---"
                      class="auto_complete_with_append_inner_icon"
                      :items="paymentTypeList"
                      v-model="selectedPaymentType"
                      :rules="paymentTypeRules"
                    >
                    </v-autocomplete>
                  </v-form>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
         <cash-payment v-if="selectedPaymentType === 'cash'" @close-form="resetPaymentType" />
          <cheque-payment v-if="selectedPaymentType === 'cheque'"  @close-form="resetPaymentType"  />
          <remit-payment v-if="selectedPaymentType === 'remit'" @close-form="resetPaymentType" />
          <payment-gateway v-if="selectedPaymentType === 'wallet'" @close-form="resetPaymentType" />
          <mobile-banking v-if="selectedPaymentType === 'mobile_banking'" @close-form="resetPaymentType" />
          <i-p-s-connection v-if="selectedPaymentType === 'connect_ips'" @close-form="resetPaymentType" />

        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Header from "../../../../../components/store/payment/offline-header/Header";
import CashPayment from "../../../../../components/store/payment/offline-payment/cash-payment";
import ChequePayment from "../../../../../components/store/payment/offline-payment/cheque-payment";
import RemitPayment from "../../../../../components/store/payment/offline-payment/remit-payment";
import PaymentGateway from "../../../../../components/store/payment/offline-payment/payment-gateway";
import MobileBanking from "../../../../../components/store/payment/offline-payment/mobile-banking";
import IPSConnection from "../../../../../components/store/payment/offline-payment/ips-connection";
export default {
name: "Offline",
  layout: 'store-dashboard',
  components: {IPSConnection, MobileBanking, PaymentGateway, RemitPayment, ChequePayment, CashPayment, Header},
  data() {
    return {
      selectedPaymentType: null,
      serverErrors: [],
      referralCode: "",
      paymentTypeList: [
        {
          name: 'Cash',
          value: 'cash'
        },
        {
          name: 'Cheque',
          value: 'cheque'
        },
        {
          name: 'Remit',
          value: 'remit'
        },
        {
          name: 'Payment Gateway',
          value: 'wallet'
        },
        {
          name: 'Mobile Banking',
          value: 'mobile_banking'
        },
        {
          name: 'IPS Connection',
          value: 'connect_ips'
        }
      ],
      paymentTypeRules: [
        v => !!v || "Payment type is required."
      ],
    }
  },
  methods: {
    resetPaymentType() {
      this.selectedPaymentType = null;
      this.$refs.paymentTypeForm.resetValidation();
    },
  }
}
</script>

<style scoped>

</style>
