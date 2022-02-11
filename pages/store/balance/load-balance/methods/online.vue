<template>
<v-card>
  <Header />
  <v-row no-gutters class="body-2 mt-5">
    <v-col cols="11">
      <v-row no-gutters justify="space-between">
        <v-col cols="12" xl="3" lg="3">
          <v-row no-gutters>
            <v-col
              cols="12"
              class="payment_method py-4"
              v-for="(item,idx) in paymentTypeList"
              :key="idx"
              @click="changePaymentType(idx)"
            >
              <v-card
                :elevation="activeIndex === idx ? cardElevation: 0"
                class="text-center"
              >
                <div style="border: 1px solid #dfdfdf;">
                  <img width="200" :src="item.logo">
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" xl="8" lg="8" class="pt-4">
          <v-form ref="ipsConnectForm">
            <v-card tile>
              <v-row no-gutters align="center">
                <v-col style="background-color: #3274c3" cols="12"
                       class=" subtitle-1 font-weight-medium white--text px-3 pt-2 pb-1">
                  Connect IPS Transaction
                </v-col>
                <v-col cols="12" class="pa-3 category-title">
                  <v-row no-gutters>
                    <v-col cols="9" xl="4" lg="4">
                      <v-text-field
                        solo
                        flat
                        type="number"
                        dense
                        v-model="amount"
                        :rules="amountRequired"
                        class="simple_text_field mt-1"
                        placeholder="Enter amount">
                      </v-text-field>
                    </v-col>
                    <v-col cols="2" xl="8" lg="8">
                      <v-btn
                        tile
                        small
                        :loading="loadingButton"
                        dark
                        height="32"
                        class="mt-1"
                        color="#3274c3"
                        @click="getTheApi"
                      >
                        Submit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-form>

          <v-card v-if="showProceedToUser" class="mt-8" tile>
            <v-row no-gutters align="center">
              <v-col style="background-color: #3274c3" cols="12"
                     class=" subtitle-1 font-weight-medium white--text px-3 pt-2 pb-1">
                <div>
                  <v-icon dark>mdi-information-variant</v-icon>
                  Confirmation Message
                </div>
              </v-col>
              <v-col cols="12" class="pa-3 category-title">
                <v-row no-gutters>
                  <v-col cols="12">
                    <div class="text-center subtitle-2">Are you sure you want to confirm the transaction amount of
                      <span style="color:#3274c3" class="font-weight-bold subtitle-1">Rs. {{ amount }} </span> ?
                    </div>
                    <div class="text-center subtitle-2">Once you confirm, it cannot be undone!!!</div>
                  </v-col>
                  <v-col class="mt-3" cols="12">
                    <form class="form-horizontal" :action="ispConnectData.ACTIONURL" enctype="multipart/form-data"
                          method="post">
                      <input type="hidden" name="MERCHANTID" :value="ispConnectData.MERCHANTID"/>
                      <input type="hidden" name="APPID" :value="ispConnectData.APPID"/>
                      <input type="hidden" name="APPNAME" :value="ispConnectData.APPNAME"/>
                      <input type="hidden" name="TXNID" :value="ispConnectData.TXNID"/>
                      <input type="hidden" name="TXNDATE" :value="ispConnectData.TXNDATE"/>
                      <input type="hidden" name="TXNCRNCY" :value="ispConnectData.TXNCRNCY"/>
                      <input type="hidden" name="TXNAMT" :value="ispConnectData.TXNAMT"/>
                      <input type="hidden" name="REFERENCEID" :value="ispConnectData.REFERENCEID"/>
                      <input type="hidden" name="REMARKS" :value="ispConnectData.REMARKS"/>
                      <input type="hidden" name="PARTICULARS" :value="ispConnectData.PARTICULARS"/>
                      <input type="hidden" name="TOKEN" :value="ispConnectData.TOKEN"/>
                      <v-row no-gutters justify="center" align="center">
                        <v-col cols="4" xl="2" lg="2">
                          <button type="submit" style="width: 49%;margin-left: 17%;"
                                  :class="$mq==='desktop' || $mq==='laptop' || $mq==='xlscreen'?'agree_button':'agree_button'"
                                  class="btn btn-block btn-primary">I Agree
                          </button>
                        </v-col>
                        <v-col cols="4" xl="2" lg="2">
                          <v-btn tile small color="error" @click="showProceedToUser=!showProceedToUser" dark>Cancel
                          </v-btn>
                        </v-col>
                      </v-row>
                    </form>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import connectIPSStore from "@/store/store/online-payment";
import Header from "../../../../../components/store/payment/offline-header/Header";
export default {
  name: "Online",
  components:{Header},
  layout: 'store-dashboard',
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
  created() {

    !this.$store.hasModule('connectIPSStore') ? this.$store.registerModule('connectIPSStore', connectIPSStore) : '';

  },
  methods: {
    showPayment(type) {
      this.paymentType = type;
    },
    changePaymentType(idx) {
      this.activeIndex = idx;
    },
    resetData() {
      this.activeIndex = null;
      this.paymentType = null;
    },
    getTheApi() {

      if (this.$refs.ipsConnectForm.validate()) {

        this.loadingButton = true;

        this.$store.dispatch('connectIPSStore/getTheApiForTheIPSConnect', {
          amount: this.amount
        }).then(response => {

          this.loadingButton = false;

          this.showProceedToUser = true;

          this.ispConnectData = response;

        }).catch(() => {

          this.loadingButton = false;

          this.showProceedToUser = false;

          // if (this.$store.getters['login/ERRORS']['errors']) {
          //
          //   this.$store.commit('snackbar/COMMIT_SNACKBAR', {
          //     message: this.$store.state.login.error.errors.amount[0],
          //     color: 'red'
          //   });
          //
          // } else {
          //
          //   this.$store.commit('snackbar/COMMIT_SNACKBAR', {
          //     message: this.$store.state.login.error.message,
          //     color: 'red'
          //   });
          //
          //
          // }

        })

      }
    },
  }
}
</script>

<style scoped>

</style>
