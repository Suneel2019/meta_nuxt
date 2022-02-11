<template>
  <v-container fluid>
    <Header />
    <v-data-table
      :headers="paymentHeaders"
      :items="allPaymentList"
      :loading="loadingItems"
      hide-default-footer
      item-key="store_order_code"
      class="elevation-1 mt-6"
      no-data-text="No Orders Available at the moment."
    >
      <template v-slot:top>
        <v-row dense>
          <v-col cols="12">
            <v-toolbar flat>
              <v-toolbar-title>Payment List</v-toolbar-title>
              <span class="mt-1 ml-4 mt-xl-1 mt-lg-1 ml-lg-3 ml-xl-3 caption ">Total Items: {{allPaymentList.meta}}</span>
            </v-toolbar>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row dense>
          <v-col cols="2"  class="caption text-left">Rows Per Page:</v-col>
          <v-col cols="2" >
            <v-autocomplete
              class="auto_complete_with_append_inner_icon"
              dense
              solo
              placeholder="5"
              v-model="itemPerPage"
              :items="['5','10','15']"
              item-text="value"
              item-value="value"
              @change="showPaymentList(1)"
            ></v-autocomplete>

          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2"  class="mb-2 mb-xl-0 mb-lg-0">
            <span class="caption font-weight-medium">Search:</span>
          </v-col>
          <v-col cols="3" >
            <v-text-field
              solo
              dense
              v-model="search"
              label="Search...."
              class="text_field_with_prepend_inner_icon"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card class="px-3 ma-xl-3 ma-lg-3 mt-xl-0 mt-lg-0" elevation="2" tile color="#fbfbfb">
          <v-row dense no-gutters>
            <v-col cols="6" xl="2" lg="2" md="2" sm="4">
              <v-row>
                <v-col cols="12" xl="12" lg="12" class="mt-xl-1 mt-lg-1 pb-xl-0 pb-lg-0">
                  <span class="caption font-weight-medium">Payment Code:</span>
                </v-col>
                <v-col cols="11" xl="11" lg="11" md="11">
                  <v-text-field
                    solo
                    v-model="payment_code"
                    dense
                    placeholder="Payment Code"
                    class="simple_text_field"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" xl="5" lg="5" md="4" sm="4">
              <v-row>
                <v-col cols="12" xl="12" lg="12" class="mt-xl-1 mt-lg-1 pb-xl-0 pb-lg-0">
                  <span class="caption font-weight-medium">Verification Status:</span>
                </v-col>
                <v-col cols="12" xl="12" lg="12" md="11" sm="11">
                  <v-autocomplete
                    class="auto_complete_with_append_inner_icon"
                    solo
                    label="--Verification Status--"
                    v-model="verification_status"
                    :items="verificationStatusItems"
                    item-text="name"
                    item-value="value"
                    chips
                    small-chips
                    deletable-chips
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" xl="4" lg="4" md="4" sm="4">
              <v-row>
                <v-col cols="12" xl="12" lg="12" class="mt-xl-1 mt-lg-1 pb-xl-0 pb-lg-0">
                  <span class="caption font-weight-medium ml-xl-8 ml-lg-8">Payment Type:</span>
                </v-col>
                <v-col cols="12" xl="12" lg="12" md="11" sm="11">
                  <v-autocomplete
                    class="auto_complete_with_append_inner_icon"
                    solo
                    label="--Payment Type--"
                    v-model="payment_type"
                    :items="paymentTypeItems"
                    multiple
                    chips
                    small-chips
                    deletable-chips
                    item-text="name"
                    item-value="value"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" xl="5" lg="5">
              <v-row style="background-color: white;border:1px solid #e5e5e5">
                <v-col cols="12" class="pa-xl-2 pa-lg-2" style="background-color: #b7b7b7;">
                  <span class="font-weight-bold caption white--text">Select Date</span>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" xl="3" lg="3">
                      <span class="caption font-weight-medium">From:</span>
                    </v-col>
                    <v-col cols="12" xl="8" lg="8">
                      <v-menu
                        v-model="dateFromDatePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            solo
                            v-model="payment_date_from"
                            dense
                            height="30"
                            label="Select"
                            prepend-inner-icon="event"
                            class="text_field_with_prepend_inner_icon"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker @input="showSearchResultForDateFrom(payment_date_from)" color="darkBlue"
                                       v-model="payment_date_from"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" xl="3" lg="3">
                      <span class="caption font-weight-medium">To:</span>
                    </v-col>
                    <v-col cols="12" xl="8" lg="8">
                      <v-menu
                        v-model="dateToDatePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            solo
                            v-model="payment_date_to"
                            dense
                            height="30"
                            label="Select"
                            prepend-inner-icon="event"
                            class="text_field_with_prepend_inner_icon"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker color="darkBlue" v-model="payment_date_to"
                                       @input="showSearchResultForDateTo(payment_date_to)"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" xl="6" lg="6">
              <v-row style="background-color: white;border:1px solid #e5e5e5">
                <v-col cols="12" class="pa-xl-2 pa-lg-2" style="background-color: #b7b7b7;">
                  <span class="font-weight-bold caption white--text">Select Price</span>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" lg="4" xl="4">
                      <span class="caption font-weight-medium">Condition: </span>
                    </v-col>
                    <v-col cols="12" lg="8" xl="8">
                      <v-autocomplete
                        class="auto_complete_with_append_inner_icon"
                        dense
                        height="30"
                        solo
                        label="--Condition--"
                        v-model="amount_condition"
                        :items="amountConditionItems"
                        item-text="name"
                        item-value="value"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" lg="4" xl="4">
                      <span class="caption font-weight-medium">Price: </span>
                    </v-col>
                    <v-col cols="12" lg="8" xl="8">
                      <v-text-field
                        solo
                        v-model="total_price"
                        dense
                        height="30"
                        label="Price"
                        class="simple_text_field"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense no-gutters align="end" justify="end">
            <v-col cols="12" xl="2" lg="2" class="pl-xl-7 pl-lg-7">
              <v-btn @click="showSearchResult()" :block="$mq==='mobile'" dark tile color="darkBlue"
                     class="ml-xl-16 ml-lg-16 mb-3 mt-2" :small="$mq !=='mobile'"
                     :loading="loadingItems">Search
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>
      <template v-slot:item.serial_no="{item}">
        <span class="font-weight-medium">{{ item.serial_no }}.</span>
      </template>
      <template v-slot:item.store_misc_payment_code="{item}">
        <span class="font-weight-medium">{{ item.payment_code }}</span>
      </template>
      <template v-slot:item.deposited_by="{item}">
        <span class="font-weight-medium">{{titleCase(item.payment_method)  }}</span>
      </template>
      <template v-slot:item.payment_type="{item}">
        <span class="font-weight-medium">{{ item.payment_type }}</span>
      </template>
      <template v-slot:item.payment_for="{item}">
        <v-chip text-color="white" small label color="primary" v-if="item.payment_for==='initial_registration'">Initial
          Registration
        </v-chip>
        <v-chip v-else text-color="white" small label color="green" class="font-weight-medium">Load Balance</v-chip>
      </template>
      <template v-slot:item.amount="{item}">
        <span class="font-weight-medium">Rs.  {{ item.amount }}</span>
      </template>
      <template v-slot:item.verification_status="{item}">
        <v-chip label text-color="white" small
                :color="getDeliveryStatusColor(item.verification_status)"
                dark
        >
          <span class="text-uppercase font-weight-medium">{{ item.verification_status }}</span>
        </v-chip>
      </template>
      <template v-slot:item.created_at="{item}">
        <span class="caption font-weight-medium">{{ item.created_at.substring(10, 0) }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="viewOrderDetail(item)" small dark color="darkBlue" tile>
          <v-icon
            small
            class="mr-2"
          >
            mdi-eye
          </v-icon>
          View
        </v-btn>
      </template>
    </v-data-table>
    <div>

      <v-pagination
        :length="totalPages"
        v-model="page"
        @input="getListOfPayment"
      >
      </v-pagination>
    </div>
  </v-container>
</template>

<script>

import stringHandler from '@/helpers/shared/dataFormatter';
import storeListOfPayment from "@/store/store/list-of-payment";
import Header from "../../../../components/store/payment/offline-header/Header";
export default {
  name: "list",
  layout: 'store-dashboard',
  components: {
    Header
  },
  data() {
    return {
      itemPerPage:10,
      page:1,
      search:'',
      totalPages:null,
      loadingItems:false,
      paymentHeaders: [
        {
          text: 'S. No.',
          align: 'start',
          value: 'serial_no'
        },
        {
          text: 'Code No.',
          align: 'start',
          sortable: true,
          value: 'payment_code',
        },
        {
          text: 'Payment Methods',
          sortable: true,
          align: 'center',
          value: 'payment_method',
        },
        {
          text: 'Deposited Amount',
          align: 'center',
          sortable: false,
          value: 'amount',
        },
        {
          text: 'Payment Type',
          align: 'center',
          sortable: false,
          value: 'payment_type',
        },
        {
          text: 'Payment For',
          align: 'center',
          sortable: false,
          value: 'payment_for',
        },
        {
          text: 'Verification Status',
          align: 'center',
          sortable: false,
          value: 'verification_status',
        },
        {
          text: 'Created At',
          align: 'center',
          sortable: false,
          value: 'created_at',
        },
        {
          text: 'Action',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      paymentList: [],
      allLoading: true,
      payment_code: '',
      verification_status: '',
      payment_type: '',
      payment_date_from: '',
      payment_date_to: '',
      amount_condition: '',
      total_price: '',
      dateFromDatePicker: false,
      dateToDatePicker: false,
      verificationStatusItems: [
        {
          id: 1,
          value: 'pending',
          name: 'Pending'
        },
        {
          id: 2,
          value: 'verified',
          name: 'Verified'
        },
        {
          id: 3,
          value: 'rejected',
          name: 'Rejected'
        },
        {
          id: 4,
          value: 'all',
          name: 'All'
        }
      ],
      paymentTypeItems: [
        {
          id: 1,
          name: 'Cash',
          value: 'cash'
        },
        {
          id: 2,
          name: 'Cheque',
          value: 'cheque'
        },
        {
          id: 3,
          name: 'Remit',
          value: 'remit'
        },
        {
          id: 4,
          name: 'Wallet',
          value: 'wallet'
        },
        {
          id: 5,
          name: 'All',
          value: 'all'
        }
      ],
      amountConditionItems: [
        {
          id: 1,
          value: '>',
          name: 'Greater than (>)'
        },
        {
          id: 2,
          value: '<',
          name: 'Less than (<)'
        },
        {
          id: 3,
          value: '=',
          name: 'Equals to (=)'
        },
        {
          id: 4,
          value: '<=',
          name: 'Less & Equals to (<=)'
        },
        {
          id: 5,
          value: '>=',
          name: 'Greater & Equals to (>=)'
        },
        {
          id: 6,
          value: 'all',
          name: 'All'
        }
      ],
    }
  },
  fetch() {
    !this.$store.hasModule('storeListOfPayment') ? this.$store.registerModule('storeListOfPayment', storeListOfPayment) : '';
    this.showPaymentList();
  },


  beforeDestroy() {
    this.$store.unregisterModule('storeListOfPayment');

  },


  computed: {
    allPaymentList() {
      return this.$store.getters['storeListOfPayment/LOAD_ALL_PAYMENTS'].map((item, idx)=>{
        item['serial_no'] = `${idx + 1}.`;
        return item;
      })
    },
  },

  methods: {

    titleCase(value){
      return stringHandler.convertToTitleCase(value)
    },


    getDeliveryStatusColor(deliveryStatus) {

      if (deliveryStatus === 'Pending') {

        return 'orange';

      } else if (deliveryStatus === 'Verified') {

        return 'green';

      } else if (deliveryStatus === 'Rejected') {

        return 'red';

      }

    },
    getListOfPayment(type){
      if (type === 'change-items-per-page') {
        this.page = 1;
      }
      this.showPaymentList()
    },
    showPaymentList(value) {

      if(value){
        this.page = 1
      }
      let payload = {
        records_per_page: this.itemPerPage,
        page: this.page,
        search:'',
        has_price:'',
        product_name:'',
        category_name:'',
        brand_name:'',
        package_type:'',
        store_order_code:'',
        order_date_from:'',
        order_date_to:'',
        price_condition:'',
        misc_payment_code:''
      }
      this.$store.dispatch("storeListOfPayment/LoadPaymentList", payload).then((res) => {
        this.allLoading = false;
        this.loadingItems = false
        this.totalPages = res.meta['last_page']
        this.totalItems = res.data['total'];
      }).catch(() => {
      });

    },
    viewOrderDetail(item) {
      if(item['payment_method']=='offline'){
        this.$router.push({
          name: "store-balance-payment-info-offline",
          params: {
            offline: item.payment_code,
          },
          query:{
            type:item.payment_method
          }

        });
      }else if(item['payment_method']=='online'){
        this.$router.push({
          name: "store-balance-payment-info-online",
          params: {
            online: item.payment_code,
          },
          query:{
            type:item.payment_method
          }

        });
      }

    },
    showSearchResultForDateFrom(value) {
      this.dateFromDatePicker = false;
    },
    showSearchResultForDateTo(){
      this.dateToDatePicker = false
    },
    showSearchResult() {
      let payload = {
        records_per_page:this.itemsPerPage,
        page:this.page,
        search:'',
        amount:this.total_price,
        payment_type:this.payment_type,
        verification_status:this.verification_status,
        brand_name:this.brand_name,
        package_type:this.package_type,
        store_order_code:'',
        order_date_from:this.payment_date_from,
        order_date_to:this.payment_date_to,
        amount_condition:this.amount_condition,
        misc_payment_code:this.payment_code
      }

      this.$store.dispatch("storeListOfPayment/LoadPaymentList", payload).then((res) => {
        this.allLoading = false;
        this.loadingItems = false
        this.totalPages = res.meta['last_page']

      }).catch(() => {
      });
    },

  }


}
</script>
