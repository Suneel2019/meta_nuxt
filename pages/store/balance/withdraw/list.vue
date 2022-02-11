<template>
  <v-card class="body-2 pa-4">
    <Header />
    <v-form ref="form">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12" class="category_title subtitle-1 font-weight-medium px-3 pt-2 pb-1">
            Withdraw
          </v-col>
          <v-col cols="12" sm="5" md="4" lg="3" xl="3" class="mt-5 px-3">
            Transaction Amount:
            <v-text-field
              solo
              dense
              class="simple_text_field mt-1"
              placeholder="Enter transaction amount"
              v-model="transactionAmount"
              :rules="transactionAmountRule">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="5" lg="3" xl="3" class="mt-5 px-3" offset-md="1">
            Reason:
            <v-text-field
              solo
              dense
              class="simple_text_field mt-1"
              placeholder="Enter reason"
              v-model="reason"
              :rules="reasonRule">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-3">
          <v-col cols="12" class="category_title subtitle-1 font-weight-medium px-3 pt-2 pb-1">
            Withdraw Balance Saving Bank Account
          </v-col>
          <v-col cols="12" sm="5" md="4" lg="3" xl="3" class="mt-5 px-3">
            KYC:
            <v-autocomplete
              solo
              dense
              item-value="id"
              item-text="name"
              placeholder="Select KYC"
              class="auto_complete_with_append_inner_icon mt-1"
              :items="kycTypesList"
              v-model="selectedKYC"
              :rules="kycRule"
              @input="getBanks">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="5" md="4" lg="3" xl="3" class="mt-5 px-3" offset-md="1">
            Banks:
            <v-autocomplete
              solo
              dense
              return-object
              item-text="bank_name"
              placeholder="Select Banks"
              class="auto_complete_with_append_inner_icon mt-1"
              :items="bankList"
              v-model="selectedBank"
              :rules="bankRule">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" lg="4" xl="4" offset-lg="1" class="pr-lg-3 mt-4" v-if="selectedBank">
            <v-card outlined>
              <v-row no-gutters class="caption pa-3">
                <v-col cols="12">
                  <v-alert dark dense type="info" color="primary" class="body-2">
                    <template v-slot:prepend>
                      <v-icon size="20">mdi-information</v-icon>
                    </template>

                    <span class="ml-3">Bank Details</span>
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters justify="space-between">
                    <v-col cols="4">Bank Branch:</v-col>
                    <v-col cols="6" class="font-weight-medium">
                      {{ selectedBank['bank_branch_name'] }}
                    </v-col>
                  </v-row>
                  <v-divider class="my-2"></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters justify="space-between">
                    <v-col cols="4">Account No:</v-col>
                    <v-col cols="6" class="font-weight-medium">
                      {{ selectedBank['bank_account_no'] }}
                    </v-col>
                  </v-row>
                  <v-divider class="my-2"></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters justify="space-between">
                    <v-col cols="5">Account Holder:</v-col>
                    <v-col cols="6" class="font-weight-medium">
                      {{ selectedBank['bank_account_holder_name'] }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center text-lg-left mt-4 px-3 pb-4">
            <v-btn
              tile
              small
              class="primary"
              :loading="btnLoadingState"
              @click="checkValidation"
            >
              Submit
            </v-btn>
          </v-col>
          <v-col col></v-col>
        </v-row>
      </v-card>
    </v-form>

    <v-row no-gutters class="mt-12">
      <v-col cols="12">
        <v-data-table
          disable-sort
          disable-filtering
          hide-default-footer
          class="elevation-3"
          :headers="tableHeaders"
          :items="balanceWithdrawList"
          :loading="tableLoadingState"
          :items-per-page="itemsPerPage"
        >
          <template v-slot:top>
            <v-row no-gutters justify="center" justify-md="start" class="pt-4 px-3">
              <v-col cols="12">
                Per Page:
                <v-autocomplete
                  solo
                  dense
                  style="width: 120px;"
                  :items="[10,20,30]"
                  class="auto_complete_with_append_inner_icon mt-1"
                  v-model="itemsPerPage"
                  @input="paginateTableData('change-items-per-page')">
                </v-autocomplete>
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.sn="{ item }">
            {{ item.sn }}.
          </template>

          <template v-slot:item.withdraw_request_code="{ item }">
            <nuxt-link
              class="remove_router_link_style"
              :to="`info/${item['withdraw_request_code']}`">
              {{ item['withdraw_request_code'] }}
            </nuxt-link>
          </template>

          <template v-slot:item.account_no="{ item }">
            <v-tooltip bottom v-if="item['account_meta_info']">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  {{ item.account_no }}
                </span>
              </template>

              <div v-for="(value, key, index) in item['account_meta']" :key="index">
                {{ key }}: {{ value }}
              </div>
            </v-tooltip>

            <span v-else>{{ item.account_no }}</span>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              dark
              small
              :color="getStatusColor(item.status)"
            >
              {{ getStatus(item.status) }}
            </v-chip>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn
              tile
              small
              color="error"
              v-if="item['status'] === 'pending'"
              @click="cancelWithdrawRequest(item)"
            >
              Cancel
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <v-col cols="12" class="mt-6">
        <v-row no-gutters justify="center">
          <v-col cols="6">
            <v-pagination
              :length="totalItemsFound"
              v-model="currentPage"
              @input="paginateTableData">
            </v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import stringHandler from '@/helpers/shared/dataFormatter'
import storeBalanceWithdraw from "@/store/store/withdraw";
import getColorCodes from "@/helpers/shared/getColorCodes";
import errorHandler from "@/helpers/shared/errorHandler";
import Header from "../../../../components/store/payment/offline-header/Header";
export default {
  name: "list",
  layout: 'store-dashboard',
  components: {Header},
  data() {
    return {
      transactionAmount: '',
      reason: '',
      kycTypesList: [
        {
          id: 'sanchalak',
          name: 'Sanchalak'
        },
        {
          id: 'firm',
          name: 'Firm KYC'
        }
      ],
      selectedKYC: null,
      bankList: [],
      selectedBank: null,
      transactionAmountRule: [
        v => !!v || 'Transaction amount is required.',
        v => /^\d+$/.test(v) || 'Must be number only.',
        v => (v && (v.length < 7)) || 'Amount not matched.'
      ],
      reasonRule: [
        v => !!v || 'Reason is required.',
      ],
      kycRule: [
        v => !!v || 'Please select KYC.',
      ],
      bankRule: [
        v => !!v || 'Please select one of the bank.',
      ],
      btnLoadingState: false,
      tableLoadingState: true,
      tableHeaders: [
        {text: 'S.N.', value: 'sn', sortable: false},
        {text: 'Code No.', value: 'withdraw_request_code', sortable: false},
        {text: 'Payment Method', value: 'payment_method', sortable: false},
        {text: 'Requested Amount', value: 'requested_amount', sortable: false},
        {text: 'Account No.', value: 'account_no', sortable: false},
        {text: 'Bank Name', value: 'payment_body_name', sortable: false},
        {text: 'Created At:', value: 'created_at', sortable: false},
        {text: 'Status', value: 'status', sortable: false},
        {text: 'Action', value: 'action', sortable: false},
      ],
      balanceWithdrawList: [],
      currentPage: 1,
      totalItemsFound: null,
      itemsPerPage: 10,
      totalItems: null,
    }
  },
  async fetch() {
    !this.$store.hasModule('storeBalanceWithdraw') ? this.$store.registerModule('storeBalanceWithdraw', storeBalanceWithdraw) : '';
    this.tableLoadingState = true;
    const query = {
      'page': this.currentPage,
      'records_per_page': this.itemsPerPage
    }
    let {data, meta} = await this.$store.dispatch('storeBalanceWithdraw/getListOfWithdrawRequests', query)
    this.balanceWithdrawList = [];
    this.balanceWithdrawList = data;
    this.balanceWithdrawList.map((item, index) => {
      item['sn'] = index +1
    })
    this.totalItemsFound = meta['last_page'];
    this.tableLoadingState = false;
  },
  computed:{

    isError422() {

      return this.$store.getters['error/IS422Error'];

    }

  },
  methods: {
    async getBalanceWithdrawRequests(){
      this.tableLoadingState = true;
      const query = {
        'page': this.currentPage,
        'records_per_page': this.itemsPerPage
      }
      let {data, meta} = await this.$store.dispatch('storeBalanceWithdraw/getListOfWithdrawRequests', query)
      this.balanceWithdrawList = [];
      this.balanceWithdrawList = data;
      this.balanceWithdrawList.map((item, index) => {
        item['sn'] = index +1
      })
      this.totalItemsFound = meta['last_page'];
      this.tableLoadingState = false;
    },
    getBanks() {
      let payload = {
        kycType:this.selectedKYC,
        storeCode:this.$store.getters["login/STORECRED"]['store_code']
      }
      this.$store.dispatch('storeBalanceWithdraw/getBanks', payload).then(res => {
        this.selectedBank = null;
        this.bankList = res;
      });
    },
    getStatus(status) {
      return stringHandler.convertToTitleCase(status);
    },
    getStatusColor(status) {
      return getColorCodes.getColorByStatus(status);
    },
    checkValidation() {
      if (this.$refs.form.validate()) {
        this.submitForm();
      }
    },
    submitForm() {
      this.btnLoadingState = true;
      let storeCode = this.$store.getters["login/STORECRED"]['store_code'];

      const formData = new FormData();
      formData.append('store_code', storeCode);
      formData.append('requested_amount', this.transactionAmount);
      formData.append('reason', this.reason);
      formData.append('kyc_type', this.selectedKYC);
      formData.append('kyc_code', this.selectedBank['kyc_code']);
      formData.append('bank_code', this.selectedBank['bank_code']);
      this.$store.dispatch('storeBalanceWithdraw/submitWithdraw', formData).then(res => {
        this.$store.commit("error/SET_422_ERROR", false);

        this.$store.commit("error/SET_422_ERROR_MESSAGE", null);
        this.$store.commit('notification/COMMIT_DIALOG', {
          message: res['message'],
          color: 'success'
        });

        this.balanceWithdrawList.unshift(res.data);
        this.balanceWithdrawList.map((item, index) => {
          item['sn'] = index +1
        })
        this.resetData();
      }).catch((e) => {
        errorHandler(e, this);
      }).finally(() => {
        this.btnLoadingState = false;
      })
    },
    paginateTableData(type) {
      if (type === 'change-items-per-page') {
        this.currentPage = 1;
      }

      this.getBalanceWithdrawRequests();
    },
    cancelWithdrawRequest({withdraw_request_code}) {
      this.$store.dispatch('storeBalanceWithdraw/cancelWithdrawRequest', {withdraw_request_code}).then(res => {
        this.$store.commit("error/SET_422_ERROR", false);

        this.$store.commit("error/SET_422_ERROR_MESSAGE", null);
        this.$store.commit('notification/COMMIT_DIALOG', {
          message: res.message,
          color: 'success'
        });

        this.getBalanceWithdrawRequests();
      }).catch(err => {
        this.$store.commit('notification/COMMIT_DIALOG', {
          message: err.response.data.message,
          color: 'error'
        });
        errorHandler(err, this)
      });
    },
    resetData() {
      this.transactionAmount = '';
      this.reason = '';
      this.selectedKYC = null;
      this.bankList = [];
      this.selectedBank = null;
      this.$refs.form.reset();
    }
  }
}
</script>

<style scoped>

</style>
