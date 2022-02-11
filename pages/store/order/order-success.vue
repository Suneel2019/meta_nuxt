<template>
  <v-container pt-10 pb-16 fluid>
    <div v-if="isLoading">
      <Loading></Loading>
    </div>
    <v-row no-gutters justify="center" v-else>
      <v-col cols="11" lg="9" xl="8">
        <v-card color="grey lighten-4" elevation="5" class="pa-5">
          <v-row no-gutters>
            <v-col cols="12" class="green--text font-weight-medium pa-4" style="background-color: #E1EDE1;">
              <v-row no-gutters>
                <v-col cols="10"> {{ orderMessage }}</v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" class="text-end">
                  <v-icon color="green">mdi-check</v-icon>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mt-5">
              <v-row no-gutters justify="center">
                <v-col cols="12" sm="6" md="5">
                  <v-card tile elevation="0" class="px-4 py-3">
                    <v-row no-gutters>
                      <v-col cols="12" class="title font-weight-medium">
                        Order Summary
                        <v-divider class="mt-1"></v-divider>
                      </v-col>
                      <v-col class="mt-4" cols="12">
                        <span class="body-2">Order Code :</span>
                        <span class="body-2 font-weight-bold ml-2">{{ orderDetail.store_order_code }}</span>
                      </v-col>
                      <v-col cols="12" class="mt-1">
                        <span class="body-2">Store Code :</span>
                        <span class="body-2 font-weight-bold ml-2">{{ orderDetail.store_code }}</span>
                      </v-col>
                      <v-col cols="12" class="mt-1">
                        <span class="body-2">Delivery Status :</span>
                        <span class="body-2 font-weight-bold ml-2">{{ orderDetail.delivery_status }}</span>
                      </v-col>
                      <v-col cols="12" class="mt-1">
                        <span class="body-2">Total Price :</span>
                        <span class="body-2 font-weight-bold ml-2">{{ orderDetail.total_price.toFixed(2) }}</span>
                      </v-col>
                      <v-col cols="12" class="mt-1">
                        <span class="body-2">Created At :</span>
                        <span class="body-2 font-weight-bold ml-2">{{ orderDetail.created_at.substring(10, 0) }}</span>
                      </v-col>
                      <v-col cols="12" class="mt-1">
                        <span class="body-2">Updated At :</span>
                        <span class="body-2 font-weight-bold ml-2">{{ orderDetail.updated_at.substring(10, 0) }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="5" class="mt-5 mt-sm-0">
                  <v-card color="white" elevation="0" class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <span class="font-weight-medium">Want to visit Order Detail Page?</span>
                      </v-col>
                      <v-col cols="12" class="text-center text-md-left mt-4">
                        <v-btn
                          dark
                          small
                          depressed
                          color="darkBlue"
                          class="mr-3"
                          @click="goToDashboard"
                        >
                          Yes
                        </v-btn>
                        <v-btn
                          small
                          outlined
                          depressed
                          color="darkBlue"
                          :to="{ name:'index' }"
                        >
                          Cancel
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderPlacedSuccessful",
  components: {
    Loading: () => import("@/components/shared/Loading")
  },
  data() {
    return {
      isLoading: true,
      orderMessage: '',
      orderDetail: null,
    }
  },

  created() {

    this.orderMessage = this.$store.getters['cart/GET_ORDER_PLACE_SUCCESSFUL_MESSAGE']['message'];

    this.orderDetail = this.$store.getters['cart/GET_ORDER_PLACE_SUCCESSFUL_MESSAGE']['data'];

    this.$store.dispatch("cart/loadAllCartProductsCount");

    this.isLoading = false;

  },

  methods: {

    goToDashboard() {

      this.$router.push({

        name: 'orders-detail',

        params: {order_code: this.orderDetail.store_order_code}

      });

    },

  }
}
</script>
