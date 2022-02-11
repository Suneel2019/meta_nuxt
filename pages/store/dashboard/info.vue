<template>
  <v-container fluid class="pl-2 pl-xl-0 pl-lg-0 pt-0 pt-xl-2 pt-lg-2">
    <div v-if="isAccountVerified">
      <div v-if="dashboardInfo">
        <v-row no-gutters justify="center" class="dashboard px-5 pt-3 pt-xl-3 pt-lg-3 pb-16">
          <v-col cols="12" class="mt-2">
            <v-card>
              <v-row no-gutters class="px-5">
                <v-col cols="12" class="headline mt-5">Overview Stats</v-col>
                <v-col cols="12" class="mt-3 mb-5">
                  <v-row>
                    <v-col cols="12" xl="3" lg="3" sm="6" md="4">
                      <v-card elevation="3" :to="{name: 'store-orders-list'}">
                        <v-row no-gutters>
                          <v-col cols="5" class="text-center pt-10 pb-8" style="background-color: #003574;">

                            <v-icon size="64" color="white"> mdi-gift</v-icon>
                          </v-col>
                          <v-col cols="7" class="pl-5 mt-3">
                            <span class="title font-weight-bold"> All Orders</span>
                            <div v-if="isVerified" class="subtitle-2">
                              ({{ dashboardInfo['orders_count']['delivery_status']['total_orders'] }})
                            </div>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                    <v-col cols="12" xl="3" lg="3" sm="6" md="4">
                      <v-card elevation="3">
                        <v-row no-gutters>
                          <v-col cols="5" class="text-center pt-10 pb-8" style="background-color: green;">
                            <!--                          <i class="fa fa-spinner"></i>-->
                            <v-icon size="64" color="white">mdi-progress-check</v-icon>
                          </v-col>
                          <v-col cols="7" class="pl-5 mt-3">
                            <div class="subtitle-2">( Delivery )</div>
                            <span class="title font-weight-bold">Processing</span>
                            <div v-if="isVerified"
                                 class="subtitle-2 mr-2">
                              ({{ dashboardInfo['orders_count']['delivery_status']['processing'] }}) orders
                            </div>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" class="mt-5">
            <v-row justify="space-between" class="py-5">
              <v-col cols="12">
                <v-card>
                  <v-row no-gutters class="px-5 py-5">
                    <v-col cols="12" class="headline">Latest Added Orders:</v-col>
                    <v-col cols="12" class="mt-3">
                      <v-data-table
                        no-data-text="No data found!"
                        :headers="headers"
                        :items="dashboardInfo['latestOrders']">
                        <template v-slot:item.store_order_code="{ item }">
                          <v-btn :ripple="false" small elevation="0" text
                                 :to="{ name: 'SingleOrderDetail',params: {order_code: item.store_order_code}}"
                                 class="font-weight-medium links static_new_tab_button_design">
                            {{ item['store_order_code'] }}
                          </v-btn>
                        </template>
                        <template v-slot:item.total_price="{ item }">
                          <span class="font-weight-medium">Rs. {{ item['total_price'] }}</span>
                        </template>
                        <template v-slot:item.acceptable_price="{ item }">
                          <span class="font-weight-medium">Rs. {{ item['acceptable_price'] }}</span>
                        </template>
                        <template v-slot:item.payment_status="{ item }">
                          <v-chip label text-color="white" small
                                  :color="paymentStatus[item.payment_status]"
                                  dark
                          >
                            <span class="text-uppercase font-weight-medium">{{ item.payment_status }}</span>
                          </v-chip>
                        </template>
                        <template v-slot:item.delivery_status="{ item }">
                          <v-chip label text-color="white" small
                                  :color="deliveryStatus[item.delivery_status]"
                                  dark
                          >
                            <span class="text-uppercase font-weight-medium">{{ item.delivery_status }}</span>
                          </v-chip>
                        </template>
                        <template v-slot:item.created_at="{ item }">
                          <span class="font-weight-medium">{{ item['created_at'].substring(0, 10) }}</span>
                        </template>
                      </v-data-table>
                    </v-col>
                    <v-col cols="12" class="body-2 text-center mt-4">
                      <v-btn elevation="0" text small :ripple="false" class="links static_new_tab_button_design"
                             :to="{name:'store-orders-list'}">View More Orders
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {

  name: "info",

  data() {

    return {

      headers: [
        {text: 'Order Code', value: 'store_order_code'},
        {text: 'Total Price', value: 'total_price'},
        {text: 'Payable Price', value: 'acceptable_price'},
        {text: 'Delivery Status', value: 'delivery_status'},
        {text: 'Date', value: 'created_at'},
      ],
      paymentStatus: {
        'Paid': 'green',
        'Pending': 'orange',
        'Unpaid': 'primary',
        'Rejected': 'red'
      },
      deliveryStatus: {
        'Accepted': 'green',
        'Cancelled': 'red',
        'Processing': 'primary',
        'Pending': 'orange',
        'Dispatched': 'red',
        'Under-verification': '#68b36b',
        'Partially-accepted': 'green',
      },

    }

  },

  layout: 'store-dashboard',

  fetch() {

    this.$store.dispatch("dashboard/getStoreDashboardInfo")

  },

  computed: {

    dashboardInfo() {

      return this.$store.getters['dashboard/GET_DASHBOARD_INFO'];

    },

    isAccountVerified() {

      return this.$store.getters["login/ACCOUNT_STATUS"]['status'] === 'approved';

    },

    isVerified() {

      return this.$store.getters['dashboard/GET_DASHBOARD_INFO']['store_barrier_conditions']['verified'];

    },

  }

}
</script>

<style scoped>

</style>
