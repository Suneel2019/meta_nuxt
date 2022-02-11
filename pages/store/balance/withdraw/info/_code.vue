<template>
  <v-container pt-0 fluid>
    <v-dialog width="600" v-model="dialogState">
      <v-img :src="selectedImage"></v-img>
    </v-dialog>

    <v-row no-gutters v-if="loadingSpinner">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-col>
    </v-row>

    <v-row no-gutters class="body-2" v-else>
      <v-col cols="12" v-if="withdrawDetail">
        <div class="category_title subtitle-1 font-weight-medium px-4 pt-2 pb-1">
          Withdraw Request Details : {{ withdrawDetail['withdraw_request_code'] }}
        </div>
        <v-card class="pa-4">
          <v-row no-gutters justify="space-between">
            <v-col cols="12" md="5" xl="5">
              <v-card>
                <v-row no-gutters>
                  <v-col cols="12" class="category_title font-weight-medium px-4 pt-2 pb-1">
                    Request Details
                  </v-col>
                  <v-col cols="12" class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="3">Amount</v-col>
                          <v-col cols="8" class="font-weight-medium">
                            {{ withdrawDetail['requested_amount'] }}
                          </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                      </v-col>
                      <v-col cols="12" class="pt-2">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="3">Created</v-col>
                          <v-col cols="8" class="font-weight-medium">
                            {{ withdrawDetail['created_at'] }}
                          </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                      </v-col>
                      <v-col cols="12" class="pt-2">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="3" class="mt-1">Status</v-col>
                          <v-col cols="8" class="font-weight-medium">
                            <v-chip small :color="getStatusColor(withdrawDetail['status'])" class="mr-2">
                              {{ getStatus(withdrawDetail['status']) }}
                            </v-chip>
                            <span class="caption" title="Responded At" v-if="withdrawDetail['verified_at']">
                              ({{ withdrawDetail['verified_at'] }})
                            </span>
                          </v-col>
                        </v-row>
                        <v-divider class="mt-2"></v-divider>
                      </v-col>
                      <v-col cols="12" class="pt-2">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="3">Reason</v-col>
                          <v-col cols="8" class="font-weight-medium">
                            {{ withdrawDetail['reason'] }}
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="12" md="6" lg="5" xl="5" class="mt-8 mt-md-0">
              <v-card>
                <v-row no-gutters>
                  <v-col cols="12" class="category_title font-weight-medium px-4 pt-2 pb-1">
                    Account Details
                  </v-col>
                  <v-col cols="12" class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="3">{{ withdrawDetail['payment_method'] }} Name</v-col>
                          <v-col cols="8" class="font-weight-medium">
                            {{ withdrawDetail['payment_body_name'] }}
                          </v-col>
                        </v-row>
                        <v-divider class="mt-1"></v-divider>
                      </v-col>
                      <v-col cols="12" class="pt-2">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="3">Account No</v-col>
                          <v-col cols="8" class="font-weight-medium">
                            {{ withdrawDetail['account_no'] }}

                            <v-tooltip bottom v-if="withdrawDetail['account_no']">
                              <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                  v-on="on"
                                  size="18"
                                  color="grey"
                                  v-bind="attrs"
                                  class="ml-2"
                                >
                                  mdi-information
                                </v-icon>
                              </template>
                              <div v-for="(value, key, index) in withdrawDetail['account_meta']" :key="index">
                                {{ key }} : {{ value }}
                              </div>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="12" class="mt-8" v-if="withdrawDetail['remarks']">
              <v-card>
                <v-row no-gutters>
                  <v-col cols="12" class="category_title font-weight-medium px-4 pt-2 pb-1">
                    Request Details
                  </v-col>
                  <v-col cols="12" class="pa-4">
                    <span v-html="withdrawDetail['remarks']"></span>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="12" class="mt-8">
              <v-card>
                <v-row no-gutters>
                  <v-col cols="12" class="category_title font-weight-medium px-4 pt-2 pb-1">
                    Verification Details
                  </v-col>
                  <v-col cols="12" class="pa-4">
                    <v-data-table
                      disable-sort
                      disable-filtering
                      hide-default-footer
                      class="elevation-3"
                      :headers="tableHeaders"
                      :items-per-page="itemsPerPage"
                      :loading="tableLoadingState"
                      :items="verificationDetailsList"
                    >
                      <template v-slot:top>
                        <v-row no-gutters justify="center" justify-md="start" class="pt-4 px-3">
                          <v-col cols="6" sm="3" md="2">
                            Per Page:
                            <v-autocomplete
                              solo
                              dense
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

                      <template v-slot:item.proof="{ item }">
                        <v-img
                          width="40"
                          class="show_image"
                          :src="item['proof']"
                          @click="showImage(item['proof'])">
                        </v-img>
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
                    </v-data-table>
                  </v-col>

                  <v-col cols="12" class="mt-4 mb-4">
                    <v-row no-gutters justify="center">
                      <v-col cols="6">
                        <v-pagination
                          :disabled="tableLoadingState"
                          :length="totalItemsFound"
                          v-model="currentPage"
                          @input="paginateTableData">
                        </v-pagination>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" class="text-center" v-else>
       <ErrorHandling422 v-if="isError422"></ErrorHandling422>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import stringHandler from '@/helpers/shared/dataFormatter'
import storeBalanceWithdraw from "@/store/store/withdraw";
import getColorCodes from "@/helpers/shared/getColorCodes";
import errorHandler from "@/helpers/shared/errorHandler";
import ErrorHandling422 from "../../../../../components/shared/ErrorHandling422";


export default {
  name: "_code",
  components: {ErrorHandling422},
  layout: 'store-dashboard',
  data() {
    return {
      doesDataExist: false,
      loadingSpinner: true,
      errorMessage: null,
      withdrawDetail: null,
      tableLoadingState: true,
      tableHeaders: [
        {text: 'S.N.', value: 'sn'},
        {text: 'Payment Method', value: 'payment_method'},
        {text: 'Paid Amount', value: 'amount'},
        {text: 'Bank Name', value: 'payment_body_name'},
        {text: 'Verification Source', value: 'payment_verification_source'},
        {text: 'Proof', value: 'proof'},
        {text: 'Created At:', value: 'created_at'},
        {text: 'Status', value: 'status'},
      ],
      verificationDetailsList: [],
      currentPage: 1,
      totalItemsFound: null,
      itemsPerPage: 10,
      dialogState: false,
      selectedImage: null,
    }
  },
  created() {
    !this.$store.hasModule('storeBalanceWithdraw') ? this.$store.registerModule('storeBalanceWithdraw', storeBalanceWithdraw) : '';

    const withdrawRequestCode = this.$route.params['code'];

    this.$store.dispatch('storeBalanceWithdraw/getBalanceWithdrawRequestDetail', withdrawRequestCode).then(res => {
      this.withdrawDetail = res;
      this.doesDataExist = true;
    }).catch((e) => {
      errorHandler(e);
    }).finally(() => {
      this.loadingSpinner = false;
    });

    this.getVerificationDetails();
  },
  computed:{
    isError422() {

      return this.$store.getters['error/IS422Error'];

    }
  },
  beforeDestroy() {
    this.$store.unregisterModule('storeBalanceWithdraw');
  },
  methods: {
    getVerificationDetails() {
      const withdrawRequestCode = this.$route.params['code'];
      this.tableLoadingState = true;

      const params = {
        query: {
          page: this.currentPage,
          records_per_page: this.itemsPerPage
        },
        code: withdrawRequestCode
      }

      this.$store.dispatch('storeBalanceWithdraw/getBalanceWithdrawRequestVerificationDetails', params).then(res => {
        this.verificationDetailsList = [];
        this.verificationDetailsList = res.data;
        this.totalItemsFound = res['meta']['last_page'];
      }).finally(() => {
        this.tableLoadingState = false;
      });
    },
    getStatus(status) {
      return stringHandler.convertToCamelCase(status);
    },
    getStatusColor(status) {
      return getColorCodes.getColorByStatus(status);
    },
    showImage(imageUrl) {
      this.selectedImage = imageUrl;
      this.dialogState = true;
    },
    paginateTableData(type) {
      if (type === 'change-items-per-page') {
        this.currentPage = 1;
      }

      this.getVerificationDetails();
    },
  }
}
</script>

<style lang="scss" scoped>
.show_image {
  &:hover {
    cursor: pointer;
  }
}
</style>
