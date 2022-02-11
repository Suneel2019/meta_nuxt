<template>
  <v-container class="pt-0 pt-xl-2 pt-lg-2">
    <div class="mb-12">
      <v-card elevation="0" tile>
        <v-card-title class="pl-0 pt-0 pt-xl-2 pt-lg-2">Payment Detail For {{this.$route.params.code}}</v-card-title>
      </v-card>
      <v-row class="pa-2 pt-0 pt-xl-2 pt-lg-2" style="background-color:#f9f9f9" dense>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="4" lg="4">
              <span class="caption font-weight-medium">Deposited By:</span>
            </v-col>
            <v-col cols="12" xl="8" lg="8">
              <span class="caption">{{ singlePaymentDetail.amount }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="4">
              <span class="caption font-weight-medium">Amount:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption">{{ singlePaymentDetail.amount }}</span>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="5" xl="5" lg="5">
              <span class="caption font-weight-medium">Payment Type :</span>
            </v-col>
            <v-col cols="7" xl="7" lg="7">
              <span class="caption">{{ singlePaymentDetail.payment_type }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="4">
              <span class="caption font-weight-medium">Payment For:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption">{{ singlePaymentDetail['payment_for'] }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="6">
              <span class="caption font-weight-medium">Payment Code:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption">{{ singlePaymentDetail.payment_code }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="6">
              <span class="caption font-weight-medium">Payment Holder Type:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption">{{ singlePaymentDetail.payment_holder_type }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="5">
              <span class="caption font-weight-medium">Transaction Date</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption">{{ singlePaymentDetail.transaction_date }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption font-weight-medium">Verification Status:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <v-icon v-if="singlePaymentDetail.status==='pending'" size="17" color="orange" class="mr-3">
                mdi-account-clock
              </v-icon>
              <v-icon v-if="singlePaymentDetail.status==='verified'" size="17" color="green" class="mr-3">
                mdi-shield-check
              </v-icon>
              <v-icon v-if="singlePaymentDetail.status==='rejected'" size="17" color="red" class="mr-3">
                highlight_off
              </v-icon>
              <span v-if="singlePaymentDetail.status==='pending'"
                    class="caption orange--text text-uppercase font-weight-medium">{{
                  singlePaymentDetail.status
                }}</span>
              <span v-if="singlePaymentDetail.status==='verified'"
                    class="caption green--text text-uppercase font-weight-medium">{{
                  singlePaymentDetail.status
                }}</span>
              <span v-if="singlePaymentDetail.status==='rejected'"
                    class="caption red--text text-uppercase font-weight-medium">{{
                  singlePaymentDetail.verification_status
                }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption font-weight-medium">Verified By Admin:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <v-btn tile x-small depressed dark color="success" v-if="singlePaymentDetail.is_verified">Approved</v-btn>
              <v-btn tile x-small depressed dark color="red" v-else>Not Approved</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="pa-2 gradient_color_for_card" dense>
        <span class="subtitle-2 font-weight-medium text-uppercase">{{ singlePaymentDetail.payment_type }} detail</span>
      </v-row>
      <v-row class="pa-2" style="background-color:#f9f9f9" dense>
        <v-col cols="12" xl="4" lg="4" v-for="(paymentTypeDetail,index) in singlePaymentDetail.payment_meta_data" :key="_index">
          <v-row dense>
            <v-col cols="4" xl="6" lg="6">
              <span class="caption font-weight-medium">{{ paymentTypeDetail.key }} :</span>
            </v-col>
            <v-col cols="8" xl="6" lg="6">
              <span class="caption">{{ paymentTypeDetail.value }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-dialog class="pa-0"
              v-model="showDialogBox"
              width="900"
              style="border-radius: 0px !important;"
    >
      <v-card color="grey lighten-4 pa-0">
        <v-img width="900" height="550" :src="dialogBoxImage"></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PaymentService from "@/services/store/list-of-payment";
export default {
  name: "index",
  components: {
  },
  layout: 'store-dashboard',
  data() {
    return {
      loading: true,
      singlePaymentDetail: '',
      showDialogBox: false,
      dialogBoxImage: "",
    }
  },
  async fetch() {
    let payload ={
      code:this.$route.params.online,
      status:this.$route.query.type
    }
    const data = await  PaymentService.showSinglePaymentAllDetails(payload);
    this.singlePaymentDetail = data['data']
    this.loading = false
  },


  methods: {

    showPreview(image) {

      this.showDialogBox = true;

      this.dialogBoxImage = image;

    },

    showSinglePaymentDetail() {
      let payload ={
        code:this.$route.params.online,
        status:this.$route.query.type
      }

      PaymentService.showSinglePaymentAllDetails(payload).then(response => {

        this.singlePaymentDetail = response.data;

        this.loading = false;

      }).catch(() => {

      })

    }

  }
}
</script>
