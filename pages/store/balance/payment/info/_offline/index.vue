<template>
  <v-container class="pt-0 pt-xl-2 pt-lg-2">
    <!--    <div v-if="loading">-->
    <!--      <loading></loading>-->
    <!--    </div>-->
    <div class="mb-12" v-if="!loading">
      <v-card elevation="0" tile>
        <v-card-title class="pl-0 pt-0 pt-xl-2 pt-lg-2">Payment Detail For {{this.$route.params.code}}</v-card-title>
      </v-card>
      <v-row class="pa-2 pt-0 pt-xl-2 pt-lg-2" style="background-color:#f9f9f9" dense>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="4" lg="4">
              <span class="caption font-weight-medium">Created By :</span>
            </v-col>
            <v-col cols="12" xl="8" lg="8">
              <span class="caption">{{ singlePaymentDetail.created_by }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="4" lg="4">
              <span class="caption font-weight-medium">Deposited By:</span>
            </v-col>
            <v-col cols="12" xl="8" lg="8">
              <span class="caption">{{ singlePaymentDetail.deposited_by }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="5" lg="5">
              <span class="caption font-weight-medium">Created At:</span>
            </v-col>
            <v-col cols="12" xl="7" lg="7">
              <span class="caption">{{ singlePaymentDetail.created_at.substring(10, 0) }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" xl="3" lg="3">
          <v-row dense>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption font-weight-medium">Verification Status:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <v-icon v-if="singlePaymentDetail.verification_status==='pending'" size="17" color="orange" class="mr-3">
                mdi-account-clock
              </v-icon>
              <v-icon v-if="singlePaymentDetail.verification_status==='verified'" size="17" color="green" class="mr-3">
                mdi-shield-check
              </v-icon>
              <v-icon v-if="singlePaymentDetail.verification_status==='rejected'" size="17" color="red" class="mr-3">
                highlight_off
              </v-icon>
              <span v-if="singlePaymentDetail.verification_status==='pending'"
                    class="caption orange--text text-uppercase font-weight-medium">{{
                  singlePaymentDetail.verification_status
                }}</span>
              <span v-if="singlePaymentDetail.verification_status==='verified'"
                    class="caption green--text text-uppercase font-weight-medium">{{
                  singlePaymentDetail.verification_status
                }}</span>
              <span v-if="singlePaymentDetail.verification_status==='rejected'"
                    class="caption red--text text-uppercase font-weight-medium">{{
                  singlePaymentDetail.verification_status
                }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="px-2 pb-2" style="background-color:#f9f9f9" dense>
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
            <v-col cols="4">
              <span class="caption font-weight-medium">Phone no.:</span>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <span class="caption">{{ singlePaymentDetail.contact_phone_no }}</span>
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
      <v-row class="pa-2 gradient_color_for_card" dense>
        <span class="subtitle-2 font-weight-medium text-uppercase">document detail</span>
      </v-row>
      <v-row class="pa-2" style="background-color: #f9f9f9" dense>
        <v-col cols="12" xl="4" lg="4" v-for="(documents,index) in singlePaymentDetail.payment_documents" :key="_index">
          <v-row class="my-3" dense>
            <v-col cols="12" xl="4" lg="4">
              <span class="subtitle-2 font-weight-medium ml-3"
                    v-if="documents.document_type==='cheque_front'">Cheque Front :</span>
              <span class="subtitle-2 font-weight-medium ml-3" v-if="documents.document_type==='cheque_back'">Cheque Back :</span>
              <span class="subtitle-2 font-weight-medium ml-3" v-if="documents.document_type==='voucher'">Voucher :</span>
            </v-col>
            <v-col cols="12" xl="8" lg="8">
              <v-img style="border-radius: 4px" height="170" gradient="to top right, rgba(255,255,255,.33), rgba(62,32,72,.7)" :aspect-ratio="3/2"
                     :src="documents.file_name">
                <v-row dense style="height: 170px" align="center" justify="center">
                  <v-col cols="2">
                    <v-btn
                      @click="showPreview(documents.file_name)"
                      small style="margin-left: -32px" outlined
                      tile depressed color="white" dark>Preview
                    </v-btn>
                  </v-col>
                </v-row>
              </v-img>
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
    // Loading:()=>import("@shared~views/Loading")
  },
  layout: 'store-dashboard',
  data() {
    return {
      loading: true,
      singlePaymentDetail: null,
      showDialogBox: false,
      dialogBoxImage: "",
    }
  },
  async fetch() {
    let payload ={
      code:this.$route.params.offline,
      status:this.$route.query.type
    }
    const data = await   PaymentService.showSinglePaymentAllDetails(payload);
    this.singlePaymentDetail = data['data']
    this.loading = false
  },

  // created() {
  //
  //   this.showSinglePaymentDetail();
  //
  // },

  methods: {

    showPreview(image) {

      this.showDialogBox = true;

      this.dialogBoxImage = image;

    },

    showSinglePaymentDetail() {
      let payload ={
        code:this.$route.params.offline,
        status:this.$route.query.type
      }
      PaymentService.showSinglePaymentAllDetails(payload).then(response => {

        this.singlePaymentDetail = response.data.data;

        this.loading = false;

      }).catch(() => {

      })

    }

  }
}
</script>
