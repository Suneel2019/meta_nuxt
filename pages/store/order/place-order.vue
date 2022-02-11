<template>
  <div class="grey lighten-4">
    <v-container class="pt-5 pb-16 pa-0">
      <v-row no-gutters dense v-if="placeOrderList.length > 0 || placeOrderListForNonTaxableProducts.length > 0">
        <v-col cols="12" lg="8" xl="8">
          <v-row v-if="placeOrderList.length > 0" no-gutters>
            <v-col cols="12" class="px-sm-2">
              <v-card tile elevation="0" color="#e1e5e7" dark class="px-3 mb-2 py-2">
                <span class="total_items font-weight-400 black--text text-uppercase">
                 <span class="font-weight-medium black--text">Taxable Products </span><span class="black--text"> Checkout List: ( {{
                    placeOrderList.length
                  }} )</span>
                </span>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" class="px-sm-2 mb-4" v-for="(placeOrderList, index) in placeOrderList"
                   :key="index">
              <v-card tile elevation="0">
                <v-row no-gutters style="background-color: #fcfcfc;">
                  <v-col cols="12" sm="2">
                    <v-img :src="placeOrderList['product_image']">
                    </v-img>
                  </v-col>
                  <v-col cols="12" sm="10" class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="12" class="product_name font-weight-medium">
                        <span @click="goToSinglePage(placeOrderList)">
                          {{ placeOrderList['product_name'] }}
                        </span>
                      </v-col>
                      <v-col cols="9" class="brand_detail font-weight-bold mt-2">
                        <span v-if="placeOrderList['product_variant']">
                          {{ placeOrderList['product_variant']['product_variant_name'] }}
                        </span>
                      </v-col>
                      <v-col cols="4" class="caption body-2 font-weight-medium text-left mt-2">
                        Package Type :
                        <span class="ml-1">{{ placeOrderList['package_name'] }}</span>
                      </v-col>
                      <v-col cols="3" class="product_price body-2 font-weight-medium text-left mt-2">
                        NRs.
                        <span class="ml-1">{{ placeOrderList['price'].toFixed(2) }}</span>
                      </v-col>
                      <v-col cols="4" class="green--text caption font-weight-medium">
                        <span>(13% VAT Included)</span>
                      </v-col>
                      <v-col cols="12" class="mt-3">
                        <v-row no-gutters align="center">
                          <v-col cols="8" class="body-2 font-weight-medium">
                            Quantity:
                            <span class="ml-1">{{ placeOrderList['quantity'] }}</span>
                          </v-col>
                          <v-col cols="4" class="text-end">
                            <v-btn icon
                                   color="gray"
                                   :ripple="ripple"
                                   @click="deleteProduct(placeOrderList['id'],index,placeOrderList)"
                            >
                              <v-icon size="21">
                                mdi-trash-can-outline
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="placeOrderListForNonTaxableProducts.length > 0" class="mt-4 mt-xl-4 mt-lg-4" no-gutters>
            <v-col cols="12" class="px-sm-2">
              <v-card tile elevation="0" dark color="#e1e5e7" class="px-2 mb-2 py-2">
               <span class="total_items font-weight-400 black--text text-uppercase">
                 <span class="font-weight-medium black--text">Non - Taxable Products </span><span class="black--text"> Checkout List: ( {{
                   placeOrderListForNonTaxableProducts.length
                 }} )</span>
                </span>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" class="px-sm-2 mb-4"
                   v-for="(placeOrderList, index) in placeOrderListForNonTaxableProducts"
                   :key="index">
              <v-card tile elevation="0">
                <v-row no-gutters style="background-color: #fcfcfc;">
                  <v-col cols="12" sm="2">
                    <v-img :src="placeOrderList['product_image']">
                    </v-img>
                  </v-col>
                  <v-col cols="12" sm="10" class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="12" class="product_name font-weight-medium">
                        <span @click="goToSinglePage(placeOrderList)">
                          {{ placeOrderList['product_name'] }}
                        </span>
                      </v-col>
                      <v-col cols="8" class="brand_detail font-weight-bold mt-2">
                        <span v-if="placeOrderList['product_variant']">
                          {{ placeOrderList['product_variant']['product_variant_name'] }}
                        </span>
                        <div class="mt-2">
                          Package Type :
                          <span class="ml-1">{{ placeOrderList['package_name'] }}</span>
                        </div>
                      </v-col>
                      <v-col cols="4" class="product_price body-2 font-weight-medium text--left mt-2">
                        NRs.
                        <span class="ml-1">{{ placeOrderList['price'] }}</span>
                      </v-col>
                      <v-col cols="12" class="mt-3">
                        <v-row no-gutters align="center">
                          <v-col cols="8" class="body-2 font-weight-medium">
                            Quantity:
                            <span class="ml-1">{{ placeOrderList['quantity'] }}</span>
                          </v-col>
                          <v-col cols="4" class="text-end">
                            <v-btn icon
                                   color="gray"
                                   :ripple="ripple"
                                   @click="deleteProduct(placeOrderList['id'],index,placeOrderList)"
                            >
                              <v-icon size="21">
                                mdi-trash-can-outline
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="4" class="mt-8 mt-lg-0 px-sm-2">
          <v-card tile elevation="0">
            <v-row no-gutters justify="center" class="pa-4">
              <v-col cols="12" class="font-weight-bold pb-1" style="border-bottom: 2px solid #e5e5e5">
                Order Summary
              </v-col>
              <v-row class="mt-5"
                     v-if="this.placeOrderListForNonTaxableProducts.length===0 && this.placeOrderList.length===0"
                     no-gutters>
                <v-col cols="7">
                  Total : (0 items)
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5" class="total_price text-end">
                  Rs. 0
                </v-col>
              </v-row>
              <v-col v-if="placeOrderList.length>0" cols="12" class="mt-5 mb-4">
                <v-row no-gutters>
                  <v-col cols="12">
                    <div class="subtitle-1 font-weight-bold black--text mb-2">Taxable Products</div>
                  </v-col>
                  <v-col cols="7" class="black--text caption font-weight-bold">
                    Total: ({{ totalProductQuantity }} items)
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="5" class="black--text text-end caption font-weight-bold">
                    Rs. {{ priceForVat.toFixed(2) }}
                  </v-col>
                  <v-col cols="7" class="black--text caption font-weight-bold">
                    13% VAT :
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="5" class="black--text text-end caption font-weight-bold">
                    Rs. {{ totalPriceWithoutTax.toFixed(2) }}
                  </v-col>
                </v-row>
                <v-divider class="my-2"></v-divider>
                <v-row no-gutters>
                  <v-col cols="7" class="black--text caption font-weight-bold">
                    Sub Total Price:
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="5" class="black--text text-end caption font-weight-bold">
                    Rs. {{ totalPriceWithVat.toFixed(2) }}
                  </v-col>
                </v-row>
                <v-divider class="mt-2" v-if="this.placeOrderListForNonTaxableProducts.length>0"></v-divider>
              </v-col>
              <v-col v-if="placeOrderListForNonTaxableProducts.length>0" cols="12" class="mt-5">
                <v-row no-gutters>
                  <v-col cols="12">
                    <div class="subtitle-1 font-weight-bold black--text mb-2">Non Taxable Products</div>
                  </v-col>
                  <v-col cols="7" class="black--text caption font-weight-bold">
                    Total: ({{ totalProductQuantityForNonTaxable }} items)
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="5" class="black--text text-end caption font-weight-bold">
                    Rs. {{ totalPriceForNonTaxable.toFixed(2) }}
                  </v-col>
                </v-row>
                <v-divider class="my-2"></v-divider>
                <v-row no-gutters>
                  <v-col cols="7" class="black--text caption font-weight-bold">
                    Sub Total Price:
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="5" class="black--text text-end caption font-weight-bold">
                    Rs. {{ totalPriceForNonTaxable.toFixed(2) }}
                  </v-col>
                </v-row>
                <v-divider class="my-2"></v-divider>
              </v-col>
              <v-col cols="12">
                <v-row v-if="finalPrice>0" no-gutters>
                  <v-col cols="8" class="subtitle-1 total_price">
                    Total Price:
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="4" class="subtitle-1 text-right total_price">
                    {{ finalPrice.toFixed(2) }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="8" md="6" lg="12" class="mt-5 mt-sm-8 pb-3">
                <v-btn v-if="isBillable"
                       dark
                       tile
                       block
                       large
                       depressed
                       color="darkOrange"
                       :ripple="ripple"
                       :loading="placeOrderLoading"
                       @click="placeOrder"
                >
                  Place Order
                </v-btn>

                <v-btn v-else
                       dark
                       tile
                       block
                       large
                       depressed
                       color="darkOrange"
                       :ripple="ripple"
                       @click="displayMessageWithForm()"
                >
                  Place Order
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="this.placeOrderList.length===0 && this.placeOrderListForNonTaxableProducts.length===0">
        <v-col cols="12" class="text-center">
          <v-card tile color="grey lighten-4" elevation="0">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12">
                <v-icon class="mb-4" size="150" color="#e5e5e5">remove_shopping_cart</v-icon>
              </v-col>
              <v-col cols="12">No items Available.</v-col>
              <v-col cols="8" sm="6" md="5" lg="4" xl="3" class="mt-8">
                <v-btn tile
                       block
                       outlined
                       depressed
                       color="darkOrange"
                       :to="{ name: 'index' }"
                >
                  Continue Shopping
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="storeDetailFormDialog"
      persistent
      max-width="1000"
    >
      <StorePanNoRegistration v-on:closeDialog="closeDialog"></StorePanNoRegistration>
    </v-dialog>

    <v-dialog persistent width="650" v-model="removeProductsFromCheckoutListDialog">
      <v-card color="grey lighten-4">
        <v-card-title class="subtitle-1 red lighten-1">
          <v-icon class="mr-3" color="white" size="30">mdi-alert</v-icon>
          <span class="white--text">Warning</span>
        </v-card-title>
        <v-card-text class="black--text body-2 pt-4">
          <div class="subtitle-2 mb-4">
            These products should be removed from the checkout list in order to place your order. They will be placed in
            your cart so that you can either update the product quantity that made it Ineligible to add or wait until
            the in-active products are active in your cart list.
          </div>
          <v-alert
            v-for="(error,index) in this.errorMessage" :key="index"
            outlined
            width="100%"
            border="left"
            class=" pa-0 pl-4 mt-2"
            color="error"
          >
            <v-row no-gutters>
              <v-col cols="2">
                <v-img class="pa-1" :src="error.image" width="60" height="60"></v-img>
              </v-col>
              <v-col cols="10">
                <div class="font-weight-medium caption mt-2">
                  <span class="font-weight-bold">{{ error.product_name }}</span> cannot be added to order due to <span
                  class="font-weight-bold">{{ error.message }} .</span>
                </div>
              </v-col>
            </v-row>
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn
            text
            small
            color="red"
            @click="deleteInEligibleProductsFromCheckoutList"
          >
            Delete & Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  components: {

    StorePanNoRegistration: () => import("@/components/store/place-order/StorePanNoRegistration"),

  },

  data() {

    return {

      placeOrderList: [],
      ripple: false,
      showDeleteCartDialog: false,
      selectedCartCode: null,
      selectedCartIndex: null,
      placeOrderLoading: false,
      errorMessage: [],
      placeOrderListForNonTaxableProducts: [],
      selectedProductForDelete: null,
      removeProductsFromCheckoutListDialog: false,
      allCheckoutListProducts: [],
      storeDetailFormDialog: false

    }
  },

  watch: {

    checkoutListProducts: {

      handler() {

        this.allCheckoutListProducts = this.checkoutListProducts;

        this.placeOrderList = this.allCheckoutListProducts.filter(data => data.is_taxable);

        this.placeOrderListForNonTaxableProducts = this.allCheckoutListProducts.filter(data => !data.is_taxable);

      },

      immediate: true

    }

  },

  computed: {

    isBillable() {

      return this.$store.getters['login/IS_BILLABLE']

    },

    checkoutListProducts() {

      return this.$store.getters['cart/GET_CART_ITEMS_FOR_ORDER'];

    },

    totalPriceWithoutTax() {

      return this.totalPrice - this.priceForVat;

    },

    finalPrice() {

      return this.totalPriceWithVat + this.totalPriceForNonTaxable;

    },

    totalPrice() {

      let sum = 0;

      this.placeOrderList.forEach(function (cartItem) {

        sum += (cartItem.price.toFixed(2) * cartItem.quantity);

      });

      return sum;

    },

    totalPriceWithVat() {

      return this.totalPrice;

    },

    priceForVat() {

      let vatAdded = (this.totalPrice / 1.13);

      return vatAdded;

    },

    totalPriceForNonTaxable() {

      let sum = 0;

      this.placeOrderListForNonTaxableProducts.forEach(function (cartItem) {

        sum += (cartItem.price * cartItem.quantity);

      });

      return sum;

    },

    totalProductQuantityForNonTaxable() {

      let total = 0;

      this.placeOrderListForNonTaxableProducts.forEach(function (cartItem) {

        total += cartItem.quantity;

      });

      return total;

    },

    totalProductQuantity() {

      let total = 0;

      this.placeOrderList.forEach(function (cartItem) {

        total += cartItem.quantity;

      });

      return total;

    }

  },

  methods: {

    displayMessageWithForm() {

      this.storeDetailFormDialog = true;

    },

    closeDialog(value) {

      this.storeDetailFormDialog = value;
    },

    deleteInEligibleProductsFromCheckoutList() {

      let productsNeededToBeDeletedFromTheCheckoutList = [];

      for (let i = 0; i < this.errorMessage.length; i++) {

        let removableProduct = this.allCheckoutListProducts.find(data => data.id === this.errorMessage[i]['cart_code']);

        productsNeededToBeDeletedFromTheCheckoutList.push(removableProduct);

      }

      for (let i = 0; i < productsNeededToBeDeletedFromTheCheckoutList.length; i++) {

        let findRemovableProductIndex = this.allCheckoutListProducts.findIndex(data => data.id === productsNeededToBeDeletedFromTheCheckoutList[i]['id']);

        this.allCheckoutListProducts.splice(findRemovableProductIndex, 1);

      }

      this.$store.commit('cart/SET_CHECKOUT_LIST', this.allCheckoutListProducts);

      this.removeProductsFromCheckoutListDialog = false;

    },

    goToSinglePage(selectedProduct) {

      this.$router.push({

        name: 'ProductDetail',

        params: {

          slug: selectedProduct.product.slug

        },

      });

    },

    placeOrder() {

      this.placeOrderLoading = true;

      const fd = new FormData();

      let allPlaceOrderList = this.placeOrderList.concat(this.placeOrderListForNonTaxableProducts);

      console.log(allPlaceOrderList, 'orders list');

      for (let i = 0; i < allPlaceOrderList.length; i++) {

        let product_code = allPlaceOrderList[i]['cart_code']

        fd.append(`cart_codes[${i}]`, product_code)

      }

      this.$store.dispatch("cart/placeOrder", fd).then(response => {

        this.$router.push({

          name: "store-orders-orders-success",

        });

        this.$store.commit("cart/PLACE_ORDER_SUCCESSFUL_MESSAGE", response)

        this.placeOrderLoading = false

      }).catch(e => {

        errorHandler(e, this);

        this.placeOrderLoading = false;

      });

    },

    deleteProduct(cartCode, index, cartProduct) {

      this.selectedCartIndex = index;

      this.selectedCartCode = cartCode;

      this.selectedProductForDelete = cartProduct;

      this.$nuxt.$once('delete_success_event', (value) => {

        if (value) {

          if (cartProduct['is_taxable']) {

            let selectedIndex = this.placeOrderList.findIndex(data => data.id === this.selectedCartCode)

            this.placeOrderList.splice(selectedIndex, 1)

          } else {

            let selectedIndex = this.placeOrderListForNonTaxableProducts.findIndex(data => data.id === this.selectedCartCode)

            this.placeOrderListForNonTaxableProducts.splice(selectedIndex, 1)

          }

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: 'Product deleted from the cart list.',

            color: 'success'

          })

        } else {

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: `Product couldn't be deleted from the cart list.`,

            color: 'error'

          });

        }

      });

      this.$store.commit('notification/SHOW_DELETE_DIALOG', {

        title: 'Delete Product',

        message: `Are you sure you want to remove item from the cart list?`,

        data: {

          delete_url: `/user/carts/${cartProduct['cart_code']}`,

          params: {}

        },

      });

    }

  }
}
</script>
