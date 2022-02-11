<template>
  <v-container fluid>
    <v-data-table
      v-if="!allLoading && storeOrders.data"
      :headers="Orders"
      :items="storeOrders.data"
      :items-per-page="itemsPerPage"
      :loading="loadingItems"
      item-key="store_order_code"
      hide-default-footer
      class="elevation-1"
      no-data-text="No Orders Available at the moment."
    >
      <template v-slot:top>
        <v-row dense>
          <v-col cols="12" xl="4" lg="4">
            <v-toolbar flat>
              <v-toolbar-title>Order List</v-toolbar-title>
              <span
                class="mt-1 ml-4 mt-xl-1 mt-lg-1 ml-lg-3 ml-xl-3 caption font-weight-bold">Total Items: {{
                  storeOrders.meta.total
                }}</span>
            </v-toolbar>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row dense>
          <v-col cols="4" xl="3" lg="3" md="4" sm="4">
            <list-per-page class="ml-4" store="storeOrder"></list-per-page>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="7" xl="4" lg="4" md="7" sm="7">
            <table-search store="storeOrder"></table-search>
          </v-col>
        </v-row>
        <v-card class="px-3 ma-xl-3 ma-lg-3 mt-xl-0 mt-lg-0" elevation="2" tile color="#fbfbfb">
          <v-row dense no-gutters>
            <v-col cols="6" xl="2" lg="2" md="2" sm="4">
              <v-row>
                <v-col cols="12" xl="12" lg="12" class="mt-xl-1 mt-lg-1 pb-xl-0 pb-lg-0">
                  <span class="caption font-weight-medium">Order Code:</span>
                </v-col>
                <v-col cols="11" xl="11" lg="11" md="11">
                  <v-text-field
                    solo
                    v-model="order_code"
                    dense
                    height="30"
                    label="Order Code"
                    class="simple_text_field"
                    @input="showSearchResultForOrderCode(order_code)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" xl="5" lg="5" md="4" sm="4">
              <v-row>
                <v-col cols="12" xl="12" lg="12" class="mt-xl-1 mt-lg-1 pb-xl-0 pb-lg-0">
                  <span class="caption font-weight-medium">Delivery Status:</span>
                </v-col>
                <v-col cols="12" xl="12" lg="12" md="11" sm="11">
                  <v-autocomplete
                    class="auto_complete_with_append_inner_icon"
                    dense
                    solo
                    label="--Delivery Status--"
                    v-model="selected_delivery_status"
                    :items="deliveryStatusItems"
                    item-text="name"
                    item-value="value"
                    multiple
                    chips
                    small-chips
                    deletable-chips
                    @change="showSearchResultForDeliveryStatus(selected_delivery_status)"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row dense>
            <v-col class="pa-0 pa-xl-4 pa-lg-4 pa-md-4" cols="12" xl="4" lg="4" md="6">
              <v-row style="background-color: white;border:1px solid #e5e5e5">
                <v-col cols="12" class="pa-xl-2 pa-lg-2" style="background-color: #b7b7b7;">
                  <span class="font-weight-bold caption white--text">Select Date</span>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" xl="12" lg="12">
                      <span class="caption font-weight-medium">From:</span>
                    </v-col>
                    <v-col cols="12" xl="12" lg="12">
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
                            v-model="selected_date_from"
                            dense
                            label="Select Date From"
                            prepend-inner-icon="event"
                            class="text_field_with_prepend_inner_icon"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker @input="showSearchResultForDateFrom(selected_date_from)" color="darkBlue"
                                       v-model="selected_date_from"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" xl="12" lg="12">
                      <span class="caption font-weight-medium">To:</span>
                    </v-col>
                    <v-col cols="12" xl="12" lg="12">
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
                            v-model="selected_date_to"
                            dense
                            label="Select Date To"
                            prepend-inner-icon="event"
                            class="text_field_with_prepend_inner_icon"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker color="darkBlue" v-model="selected_date_to"
                                       @input="showSearchResultForDateTo(selected_date_to)"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="pa-0 pa-xl-4 pa-lg-4 pa-md-4" cols="12" xl="4" lg="4" md="6">
              <v-row style="background-color: white;border:1px solid #e5e5e5">
                <v-col cols="12" class="pa-xl-2 pa-lg-2" style="background-color: #b7b7b7;">
                  <span class="font-weight-bold caption white--text">Select Price</span>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" lg="12" xl="12">
                      <span class="caption font-weight-medium">Condition: </span>
                    </v-col>
                    <v-col cols="12" lg="12" xl="12">
                      <v-autocomplete
                        class="auto_complete_with_append_inner_icon"
                        dense
                        height="30"
                        solo
                        label="--Condition--"
                        v-model="selected_price_condition"
                        :items="priceConditionItems"
                        item-text="name"
                        item-value="value"
                        @change="showSearchResultForPriceCondition(selected_price_condition)"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" lg="12" xl="12">
                      <span class="caption font-weight-medium">Total Price: </span>
                    </v-col>
                    <v-col cols="12" lg="12" xl="12">
                      <v-text-field
                        solo
                        v-model="selected_total_price"
                        dense
                        height="30"
                        label="Price"
                        type="number"
                        class="simple_text_field"
                        @input="showSearchResultForPrice(selected_total_price)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="pa-0 pa-xl-4 pa-lg-4 pa-md-4" cols="12" xl="4" lg="4" md="6">
              <v-row style="background-color: white;border:1px solid #e5e5e5">
                <v-col cols="12" xl="12" lg="12" class="pa-xl-2 pa-lg-2" style="background-color: #b7b7b7;">
                  <span class="font-weight-bold caption white--text">Payable Price Range</span>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" lg="12" xl="12">
                      <span class="caption font-weight-medium">From: </span>
                    </v-col>
                    <v-col cols="12" lg="12" xl="12">
                      <v-text-field
                        solo
                        v-model="selected_payable_price_to"
                        dense
                        height="30"
                        label="In (Rs.)"
                        class="simple_text_field"
                        type="number"
                        @input="showSearchResultForPayablePriceFrom(selected_payable_price_to)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" xl="6" lg="6" class="mt-xl-1 mt-lg-1">
                  <v-row dense>
                    <v-col cols="12" lg="12" xl="12">
                      <span class="caption font-weight-medium">To: </span>
                    </v-col>
                    <v-col cols="12" lg="12" xl="12">
                      <v-text-field
                        solo
                        v-model="selected_payable_price_from"
                        dense
                        height="30"
                        label="In (Rs.)"
                        class="simple_text_field"
                        type="number"
                        @input="showSearchResultForPayablePriceTo(selected_payable_price_from)"
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
      <template v-slot:item.store_order_code="{item}">
        <span @click="viewOrderDetail(item)" class="font-weight-medium order_code_hover">{{
            item.store_order_code
          }}</span>
      </template>
      <template v-slot:item.delivery_status="{item}">
        <v-chip label text-color="white" small
                :color="deliveryStatusColor[item.delivery_status]"
                dark
        >
          <span class="text-uppercase font-weight-medium">{{ item.delivery_status }}</span>
        </v-chip>
      </template>
      <template v-slot:item.created_at="{item}">
        <span class="font-weight-medium">{{ item.created_at.substring(10, 0) }}</span>
      </template>
      <template v-slot:item.payment_status="{item}">
        <v-chip label text-color="white" small
                :color="paymentStatusColor[item.payment_status]"
                dark
        >
          <span class="text-uppercase font-weight-medium">{{ item.payment_status }}</span>
        </v-chip>
      </template>
      <template v-slot:item.total_price="{item}">
        <span class="font-weight-medium">Rs. {{ item.total_price }}</span>
      </template>
      <template v-slot:item.acceptable_price="{item}">
        <span class="font-weight-medium" v-if="item.acceptable_price !=='N/A'">Rs. {{ item.acceptable_price }}</span>
        <span class="font-weight-medium" v-else>{{ item.acceptable_price }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn small :to="`/store/orders/${item.store_order_code}/detail`" dark tile elevation="3" color="darkBlue">
          <v-icon small class="mr-2">mdi-eye</v-icon>
          View Order
        </v-btn>
      </template>
    </v-data-table>
    <v-data-table
      v-if="!allLoading && storeOrders.length===0"
      :headers="Orders"
      :items="storeOrders"
      item-key="store_order_code"
      hide-default-footer
      class="elevation-1"
      no-data-text="No Orders Available at the moment."
    >
    </v-data-table>
    <pagination v-if="!allLoading && storeOrders.data" store="storeOrder" :disable=this.loadingItems
                collection="ordersList"></pagination>
  </v-container>
</template>

<script>
import dataFormatter from "@/helpers/shared/dataFormatter";

export default {

  name: "store-orders-list",

  data() {
    return {

      itemsCount: [
        {
          id: 1,
          value: "10"
        },
        {
          id: 2,
          value: "25"
        },
        {
          id: 3,
          value: "50"
        }
      ],
      Orders: [
        {
          text: 'S. No.',
          align: 'start',
          sortable: true,
          value: 'serial_no',
        },
        {
          text: 'Code No.',
          align: 'start',
          sortable: true,
          value: 'store_order_code',
        },
        {
          text: 'Delivery Status',
          sortable: true,
          align: 'center',
          value: 'delivery_status',
          filter: value => {
            if (!this.deliveryStatus) return true;
            return value === this.deliveryStatus.value;
          }
        },
        {
          text: 'Created At',
          align: 'center',
          sortable: false,
          value: 'created_at',
        },
        {
          text: 'Price',
          align: 'center',
          sortable: true,
          value: 'total_price',
        },
        {
          text: 'Payable Price',
          align: 'center',
          sortable: true,
          value: 'acceptable_price'
        },
        {
          text: 'Action',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      deliveryStatusColor: {
        'Pending': 'yellow',
        'Accepted': 'green',
        'Under-verification': '#68b36b',
        'Processing': 'primary',
        'Dispatched': 'red',
        'Cancelled': 'red',
        'Partially-accepted': 'green'

      },
      paymentStatusColor: {
        'Paid': 'green',
        'Pending': 'orange',
        'Rejected': 'red',
        'Unpaid': 'primary',
      },
      deliveryStatusItem: [
        {
          id: 1,
          value: 'pending'
        },
        {
          id: 2,
          value: 'dispatched'
        },
        {
          id: 3,
          value: 'processing'
        },
        {
          id: 5,
          value: 'accepted'
        },

      ],
      deliveryStatus: null,
      allLoading: true,
      loading: false,
      loadSearchButton: false,
      order_code: '',
      selected_delivery_status: [],
      selected_payment_status: [],
      dateToDatePicker: false,
      selected_date_to: '',
      dateFromDatePicker: false,
      selected_date_from: '',
      selected_price_condition: '',
      selected_total_price: '',
      deliveryStatusItems: [
        {
          id: 1,
          value: 'pending',
          name: 'Pending'
        },
        {
          id: 2,
          value: 'dispatched',
          name: 'Dispatched'
        },
        {
          id: 3,
          value: 'cancelled',
          name: 'Cancelled'
        },
        {
          id: 3,
          value: 'partially-accepted',
          name: 'Partially Accepted'
        },
        {
          id: 3,
          value: 'processing',
          name: 'Processing'
        },
        {
          id: 4,
          value: 'accepted',
          name: 'Accepted'
        },
        {
          id: 5,
          value: 'under-verification',
          name: 'Under-Verification'
        },
        {
          id: 6,
          value: 'all',
          name: 'All'
        }
      ],
      paymentStatusItems: [
        {
          id: 1,
          value: 'all',
          name: 'All'
        },
        {
          id: 2,
          value: 'pending',
          name: 'Pending'
        },
        {
          id: 3,
          value: 'unpaid',
          name: 'Unpaid'
        },
        {
          id: 4,
          value: 'verified',
          name: 'Paid'
        },
        {
          id: 5,
          value: 'rejected',
          name: 'Rejected'
        },
        {
          id: 6,
          value: 'all',
          name: 'All'
        }
      ],
      priceConditionItems: [
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
      selected_payable_price_to: '',
      selected_payable_price_from: '',
      alreadySearched: false,
    }
  },

  layout: "store-dashboard",

  components: {

    TableSearch: () => import("@/components/shared/table-search"),

    ListPerPage: () => import("@/components/shared/list-per-page"),

    Pagination: () => import("@/components/shared/pagination")

  },

  fetch() {

    this.loadAllStoreOrders();

  },

  computed: {

    storeOrders() {

      console.log(this.$store.state.storeOrder.ordersList.data, 'store order list');

      return this.$store.state.storeOrder.ordersList;

    },

    itemsPerPage() {

      if (this.$store.state.storeOrder.ordersList.length > 0) {

        return this.$store.state.storeOrder.ordersList.meta.per_page;

      } else {

        return 10;

      }

    },

    loadingItems() {

      return this.$store.state.storeOrder.loading;

    },

  },

  methods: {

    loadAllStoreOrders() {

      this.$store.commit("tableConfig/CLEAR_TABLE_CONFIG");

      this.$store.dispatch("storeOrder/getAllStoreOrders").then(() => {

        let defaultFilter = this.$store.getters['storeOrder/DEFAULT_FILTER_STATUS'];

        let defaultPaymentFilter = this.$store.getters['storeOrder/DEFAULT_PAYMENT_STATUS'];

        if (defaultFilter !== '') {

          let selectedValue = this.deliveryStatusItems.find(data => data.value === defaultFilter);

          this.selected_delivery_status.push(selectedValue.value);

          this.showSearchResultForDeliveryStatus(this.selected_delivery_status);

          this.showSearchResult();

          this.$store.commit('storeOrder/SET_SELECTED_STATUS_FOR_DEFAULT_FILTERING', '');

        }

        if (defaultPaymentFilter !== '') {

          let selectedValue = this.paymentStatusItems.find(data => data.value === defaultPaymentFilter);

          this.selected_payment_status.push(selectedValue.value);

          this.showSearchResultForPaymentStatus(this.selected_payment_status);

          this.showSearchResult();

          this.$store.commit('storeOrder/SET_PENDING_STATUS_FOR_DEFAULT_FILTERING', '');

        }

        this.allLoading = false;

      }).catch(() => {

        this.allLoading = false;

      });

    },

    showSearchResultForPayablePriceTo(value) {

      this.$store.commit("tableConfig/SET_PAYABLE_PRICE_TO", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    showSearchResultForPayablePriceFrom(value) {

      this.$store.commit("tableConfig/SET_PAYABLE_PRICE_FROM", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    showSearchResult() {

      this.alreadySearched = true;

      this.showResult();

    },

    showResult() {

      this.$store.commit('storeOrder/SET_LOADER_FOR_TABLE', true);

      let returnObj = dataFormatter.filter(this.$store.state.tableConfig.config)

      this.$store.dispatch('storeOrder/paginatedLists', returnObj).then(() => {

        this.$store.commit('storeOrder/SET_LOADER_FOR_TABLE', false);

      }).catch(() => {

        this.loadingItems = false;

        this.$store.commit('storeOrder/SET_LOADER_FOR_TABLE', false);

      });

    },

    showSearchResultForPrice(value) {

      this.$store.commit("tableConfig/SET_TOTAL_PRICE", value);

      this.$store.commit("tableConfig/SET_PRICE_CONDITION", this.selected_price_condition);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    showSearchResultForDateTo(value) {

      this.dateToDatePicker = false;

      this.$store.commit("tableConfig/SET_ORDER_DATE_TO", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);


    },

    showSearchResultForDateFrom(value) {

      this.dateFromDatePicker = false;

      this.$store.commit("tableConfig/SET_ORDER_DATE_FROM", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    showSearchResultForDeliveryStatus(value) {

      this.$store.commit("tableConfig/SET_DELIVERY_STATUS", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    showSearchResultForPaymentStatus(value) {

      this.$store.commit("tableConfig/SET_PAYMENT_STATUS", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    showSearchResultForOrderCode(value) {

      this.$store.commit("tableConfig/SET_STORE_CODE", value);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

    },

    viewOrderDetail(selectedItem) {

      this.$router.push({

        name: 'store-orders-order_code-detail',

        params: {order_code: selectedItem.store_order_code}

      });

    },

    showSearchResultForPriceCondition(value) {

      if (this.$store.state.tableConfig.config.total_price !== '') {

        this.$store.commit("tableConfig/SET_PRICE_CONDITION", value);

        this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

        this.showResult();

      }

    }

  },

}
</script>

<style scoped>

</style>
