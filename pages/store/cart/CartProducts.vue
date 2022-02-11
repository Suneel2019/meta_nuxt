<template>
  <v-container fluid>
    <v-row no-gutters v-if="eligibleCartItems.length > 0">
      <v-col cols="12" lg="8" xl="8" class="pr-lg-4 ">
        <v-row class="pa-1 px-2 border_radius_row" style="background-color: #003574;" no-gutters>
          <div class="subtitle-2 font-weight-medium white--text">Eligible Products</div>
        </v-row>
        <v-row class="pa-1 px-2 border_radius_bottom" no-gutters style="background-color:#003574;">
          <div class="caption font-weight-medium white--text">Note: Only these products will be added to your checkout
            list
          </div>
        </v-row>
        <v-alert
          outlined
          width="100%"
          border="left"
          class="pa-2 pl-6 mt-3"
          color="error"
          v-if="nonEligibleCartItems.length>0"
        >
          <v-row no-gutters>
            <v-col cols="12" xl="9" lg="9">
              <div class="caption font-weight-medium">Your cart also have non-eligible products that cannot be added
                to your checkout list.
              </div>
            </v-col>
            <v-col cols="12" xl="3" lg="3">
              <v-btn class="ml-4" small color="red" text v-scroll-to="{ el: '#uneligible_products', duration: 1000 }">
                <v-icon dark color="red" small>mdi-chevron-double-left</v-icon>
                <div class="caption font-weight-bold text-decoration-underline">Click to visit</div>
                <v-icon dark color="red" small>mdi-chevron-double-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card tile elevation="0" class="px-4 py-3">
                  <span class="total_items font-weight-400 text-uppercase">
                    Total Items : ( {{ eligibleCartItems.length }} )
                  </span>
            </v-card>
          </v-col>
          <v-col cols="12" class="mt-4">
            <v-card tile elevation="0" class="px-4 pt-3">
              <v-row no-gutters>
                <v-col cols="12" sm="9">
                  <v-checkbox
                    class="select_all_checkbox"
                    color="darkOrange"
                    :ripple="ripple"
                    :label="`Select all ( ${totalSelectedCartItemCount} Items)`"
                    v-model="selectAllCheckBox"
                    @change="chooseAllCartItemsForOrder(selectAllCheckBox)">
                  </v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" class="text-sm-end pl-1 pl-sm-0">
                  <v-btn
                    text
                    small
                    class="pa-0 delete_text"
                    :ripple="ripple"
                    :disabled="!isAllCartItemSelected"
                    :loading="deleteAllProductLoading"
                    @click="deleteAllProducts"
                  >
                    <v-icon size="21" left>mdi-trash-can-outline</v-icon>
                    <span class="mt-1">Delete</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" class="mt-4" v-for="(cartProduct, index) in eligibleCartItems" :key="index">
            <v-card tile elevation="0">
              <v-row no-gutters>
                <v-col cols="12" sm="2" xl="2" class="px-4 py-3 pr-lg-0">
                  <v-row no-gutters align="center">
                    <v-col cols="2">
                      <v-checkbox
                        :ripple="ripple"
                        color="darkOrange"
                        class="select_all_checkbox"
                        v-model="cartProduct.is_checked"
                        @change="chooseSingleCartItem(cartProduct)"
                      >
                      </v-checkbox>
                    </v-col>
                    <v-col cols="6" sm="7" offset-sm="1">
                      <v-img width="80" height="80" :src="cartProduct['product']['featured_image']">
                      </v-img>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="10" xl="10" class="px-4" style="background-color: #fcfcfc;">
                  <v-row no-gutters>
                    <v-col cols="12" class="cart_product_name font-weight-medium mt-2">
                      <v-row no-gutters>
                        <v-col cols="12" class="mt-2">
                            <span @click="redirectToProductDetailPage(cartProduct)">{{
                                cartProduct['product']['product_name']
                              }}</span>
                        </v-col>
                        <v-col cols="12" class="brand_detail font-weight-bold mt-2">
                               <span v-if="cartProduct['product_variant']">
                                 {{ cartProduct['product_variant']['product_variant_name'] }}
                               </span>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="10" sm="4">
                      <div class="caption black--text body-2 font-weight-medium mt-3">
                        Package Type: {{ cartProduct['package_name'] }}
                      </div>
                      <div class="product_price body-2 font-weight-medium mt-3"> Rs.
                        {{ cartProduct['price'].toFixed(2) }}
                      </div>
                      <div class="caption green--text font-weight-bold" v-if="cartProduct['is_taxable']">(13% VAT
                        Included)
                      </div>
                    </v-col>
                    <v-col cols="2" sm="1" order-sm="2" class="text-end">
                      <v-btn
                        icon
                        color="gray"
                        :ripple="ripple"
                        @click="deleteSingleProductDialog(cartProduct)"
                      >
                        <v-icon size="21">mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="7" order-sm="1" class="mt-3 mt-sm-1">
                      <v-row no-gutters justify="center">
                        <v-col cols="8" sm="10">
                          <v-row no-gutters>
                            <v-col cols="4" sm="3">
                              <v-hover v-slot:default="{ hover }">
                                <v-btn
                                  tile
                                  x-small
                                  depressed
                                  height="30"
                                  :ripple="ripple"
                                  :color="hover ? '#e5e5e5':'#eff0f5'"
                                  :loading="cartProduct.decreaseLoadingButton"
                                  :disabled="cartProduct.disableDecreaseButton"
                                  @click="decreaseQuantity(cartProduct)"
                                >
                                  <v-icon size="15" :color="hover ? '#fff':'black'">mdi-minus</v-icon>
                                </v-btn>
                              </v-hover>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                @change="updateQuantity(cartProduct)"
                                class="quantity"
                                dense
                                v-model="cartProduct.quantity"
                                height="30"
                                :disabled="cartProduct.disableIncreaseButton && cartProduct.disableDecreaseButton"
                                solo
                                :rules="updateQuantityRules"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="4" sm="3">
                              <v-hover v-slot:default="{ hover }">
                                <v-btn
                                  tile
                                  x-small
                                  depressed
                                  height="30"
                                  :ripple="ripple"
                                  :loading="cartProduct.increaseLoadingButton"
                                  :color="hover ? '#e5e5e5':'#eff0f5'"
                                  :disabled="cartProduct.disableIncreaseButton"
                                  @click="increaseQuantity(cartProduct)"
                                >
                                  <v-icon size="15" :color="hover ? '#fff':'black'">mdi-plus</v-icon>
                                </v-btn>
                              </v-hover>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="10">
                          <div class=" caption font-weight-medium ml-xl-0 ml-lg-0">Available in Stock :
                            ({{ cartProduct.display_stock }})
                          </div>
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
      <v-col cols="12" lg="4" xl="4"
             class="mt-8 mt-lg-0">
        <v-card tile elevation="0">
          <v-row no-gutters justify="center" class="pa-4">
            <v-col cols="12" class="font-weight-bold pb-1" style="border-bottom: 2px solid #e5e5e5">
              Order Summary
            </v-col>
            <v-row class="mt-5" v-if="eligibleCartItems.length===0" no-gutters>
              <v-col cols="7">
                Total : (0 items)
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="5" class="total_price text-end">
                Rs. 0
              </v-col>
            </v-row>
            <v-col v-else cols="12" class="mt-5 mb-4">
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="subtitle-1 font-weight-bold black--text mb-2">Taxable Products</div>
                </v-col>
                <v-col cols="7" class="black--text caption font-weight-bold">
                  Total: ({{ taxableProducts.length }} items)
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5" class="black--text text-end caption font-weight-bold">
                  Rs.{{ taxablePriceForVat.toFixed(2) }}
                </v-col>
                <v-col cols="7" class="black--text caption font-weight-bold">
                  13% VAT:
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5" class="black--text text-end caption font-weight-bold">
                  Rs. {{ taxablePriceWithoutPrice.toFixed(2) }}
                </v-col>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-row no-gutters>
                <v-col cols="7" class="black--text caption font-weight-bold">
                  Sub Total Price:
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5" class="black--text text-end caption font-weight-bold">
                  <span class="text-right"> Rs. {{ totalTaxablePriceWithVat.toFixed(2) }}</span>
                </v-col>
              </v-row>
              <v-divider class="mt-2" v-if="nonTaxableProducts.length>0"></v-divider>
            </v-col>
            <v-col v-if="nonTaxableProducts.length>0" cols="12" class="mt-5">
              <v-row no-gutters>
                <v-col cols="12">
                  <div class="subtitle-1 font-weight-bold black--text mb-2">Non Taxable Products</div>
                </v-col>
                <v-col cols="7" class="black--text caption font-weight-bold">
                  Total: ({{ nonTaxableProducts.length }} items)
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5" class="black--text text-end caption font-weight-bold">
                  Rs. {{ totalNonTaxablePrice.toFixed(2) }}
                </v-col>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-row no-gutters>
                <v-col cols="7" class="black--text caption font-weight-bold">
                  Sub Total Price:
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5" class="black--text text-end caption font-weight-bold">
                  Rs. {{ totalNonTaxablePrice.toFixed(2) }}
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
            <v-col cols="12" class="mt-5">
              <v-btn
                tile
                block
                depressed
                color="darkOrange"
                class="checkout"
                :ripple="ripple"
                style="padding: 0;"
                :dark="!disableProceedToCheckBox"
                :disabled="disableProceedToCheckBox"
                @click="checkout"
              >
                Proceed to checkout
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" class="mt-16" id="uneligible_products"></v-col>
    </v-row>
    <v-row no-gutters v-if="eligibleCartItems.length===0 && nonEligibleCartItems.length===0">
      <v-col cols="12" class="text-center">
        <v-card tile color="grey lighten-4" elevation="0">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-icon class="mb-4" size="150" color="#e5e5e5">remove_shopping_cart</v-icon>
            </v-col>
            <v-col cols="12">No items Available.</v-col>
            <v-col cols="12" sm="6" md="5" lg="4" xl="3" class="mt-8">
              <v-btn
                tile
                block
                outlined
                depressed
                color="darkOrange"
                class="delete_text"
                :to="{ name: 'index' }"
              >
                Continue Shopping
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="nonEligibleCartItems.length>0">
      <v-col cols="12" class="mt-5">
        <v-card color="grey lighten-4">
          <v-card-title class="subtitle-1 red lighten-1 pa-2">
            <v-icon color="white" size="25" class="mr-3">mdi-alert</v-icon>
            <span class="white--text">Non-Eligible Products</span>
          </v-card-title>
          <v-card-text class="body-2 black--text pt-4">
            <v-alert
              outlined
              width="100%"
              border="left"
              class="pa-2 pl-6"
              color="error"
            >
              <div class="subtitle-2">Your cart has products that is <span
                class="font-weight-bold text-decoration-underline mx-1">in-active</span>
              </div>
              <div class="subtitle-2 mt-2">These products will not be added to your checkout list. You can wait until
                the in-active products are active to checkout products.
              </div>
              <v-row no-gutters class="mt-2">
                <v-col cols="9" xl="2" lg="2">
                  <div class="subtitle-2 font-weight-medium">Note : Product with color</div>
                </v-col>
                <v-col style="width: 20px !important;" cols="3" xl="1" lg="1" class="pa-2">
                  <div
                    style="background-color:#ffd6be;height: 20px;width: 20px;margin-top: -8px;border: 1px solid #a9a9a9;"></div>
                </v-col>
                <v-col cols="12" xl="9" lg="9">
                  <div class="subtitle-2 font-weight-medium">indicates the product is <span
                    class="red--text text-decoration-underline mx-1">in-active</span>.You cannot <span
                    class="red--text text-decoration-underline mx-1">update the quantity</span> until it is active.
                  </div>
                </v-col>
              </v-row>
            </v-alert>
            <v-data-table
              :headers="notEligibleProductHeaders"
              :items="nonEligibleCartItems"
              item-key="serial_no"
              :item-class="notActiveProducts"
              class="elevation-2"
              style="min-width: 100%"
            >
              <template v-slot:top>
                <v-row no-gutters align="end" justify="end">
                  <v-col cols="8" xl="2" lg="2" class="my-3">
                    <v-btn
                      color="red"
                      tile
                      dark
                      small
                      @click="deleteAllNonEligibleProducts"
                      class="ml-8"
                    >
                      <v-icon small dark size="15" class="mr-2">mdi-delete</v-icon>
                      Remove All
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.serial_no="{item}">
                <span class="font-weight-medium caption">{{ item.serial_no }}.</span>
              </template>
              <template v-slot:item.product.product_name="{item}">
                <span class="font-weight-medium caption">{{ item.product.product_name }}</span>
                <div class="mt-2">
              <span v-if="item.product_variant"
                    class="font-weight-regular caption">Variants: {{ item.product_variant.product_variant_name }}</span>
                </div>
              </template>
              <template v-slot:item.product.featured_image="{item}">
                <v-img @click="showImagePreview(item.product.featured_image)" class="my-2 image_hover"
                       :src="item.product.featured_image" width="50"
                       height="50"></v-img>
              </template>
              <template v-slot:item.quantity="{item}">
                <v-row class="mt-2" no-gutters dense>
                  <v-col cols="3">
                    <v-hover v-slot:default="{ hover }">
                      <v-btn
                        tile
                        x-small
                        depressed
                        :ripple="false"
                        class="button_design"
                        :color="hover ? 'grey':'#e5e5e5'"
                        :loading="item.decreaseLoadingButton"
                        :disabled="item.disableDecreaseButton || !item.is_active"
                        @click="decreaseQuantity(item)"
                      >
                        <v-icon size="10" :color="hover ? '#fff':'black'">mdi-minus</v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      class="ml-1"
                      :class="item.is_active?'quantity':'disable_quantity'"
                      dense
                      v-model="item.quantity"
                      height="30"
                      solo
                      :disabled="!item.is_active"
                      type="number"
                      @change="updateQuantity(item)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-hover v-slot:default="{ hover }">
                      <v-btn
                        tile
                        x-small
                        depressed
                        class="button_design"
                        :ripple="false"
                        :loading="item.increaseLoadingButton"
                        :color="hover ? 'grey':'#e5e5e5'"
                        :disabled="item.disableIncreaseButton || !item.is_active"
                        @click="increaseQuantity(item)"
                      >
                        <v-icon size="10" :color="hover ? '#fff':'black'">mdi-plus</v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item.stock="{item}">
                <span class="font-weight-medium caption">{{ item.stock }}</span>
              </template>
              <template v-slot:item.price="{item}">
                <span class="font-weight-medium caption">Rs. {{ item.price.toFixed(2) }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn @click="deleteSingleNonEligibleProduct(item)" small icon>
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "CartProducts",

  data() {

    return {

      productsEligibleForOrders: [],
      productsNotEligibleForOrders: [],
      loading: true,
      selectAllCheckBox: false,
      ripple: false,
      productSelectedForOrderingCount: 0,
      deleteAllProductLoading: false,
      updateQuantityRules: [
        v => /^[0-9]*$/.test(v) || "Must be number"
      ],
      productSelectedForOrdering: [],
      notEligibleProductHeaders: [
        {
          text: 'S.N',
          align: 'start',
          sortable: false,
          value: 'serial_no',
        },
        {
          text: 'Product Name',
          align: 'start',
          sortable: false,
          value: 'product.product_name',
        },
        {
          text: 'Featured Image',
          align: 'center',
          sortable: false,
          value: 'product.featured_image',
        },
        {
          text: 'Quantity',
          align: 'center',
          sortable: false,
          value: 'quantity',
          width: '20%'
        },
        {
          text: 'Package Type',
          align: 'center',
          sortable: false,
          value: 'package_name',
          width: '20%'
        },
        {
          text: 'Available Stock',
          align: 'center',
          sortable: false,
          value: 'stock',
        },
        {
          text: 'Unit Rate',
          align: 'center',
          sortable: false,
          value: 'price',
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'actions',
        }
      ],
      removeNonEligibleProducts: false,

    }

  },

  watch: {

    '$route': '$fetch'

  },

  async fetch() {

    await this.getAllCartProductsList();

  },

  computed: {

    eligibleCartItems() {

      return this.productsEligibleForOrders;

    },

    nonEligibleCartItems() {

      return this.productsNotEligibleForOrders;

    },

    isAllCartItemSelected() {

      console.log(!this.productsEligibleForOrders.some(data => !data['is_checked']));

      return !this.productsEligibleForOrders.some(data => !data['is_checked']);

    },

    totalSelectedCartItemCount() {

      return this.productSelectedForOrdering.length;

    },

    taxableProducts() {

      return this.productSelectedForOrdering.filter(cart => cart['is_taxable']);

    },

    nonTaxableProducts() {

      return this.productSelectedForOrdering.filter(cart => !cart['is_taxable']);

    },

    taxablePriceForVat() {

      return (this.totalPrice / 1.13);

    },

    taxablePriceWithoutPrice() {

      return this.totalPrice - this.taxablePriceForVat;

    },

    totalTaxablePriceWithVat() {

      return this.totalPrice;

    },

    totalPrice() {

      let sum = 0;

      this.taxableProducts.forEach(function (cartItem) {

        sum += (cartItem.price.toFixed(2) * cartItem.quantity);

      });

      return sum;

    },

    totalNonTaxablePrice() {

      let sum = 0;

      this.nonTaxableProducts.forEach(function (cartItem) {

        sum += (cartItem.price * cartItem.quantity);

      });

      return sum;
    },

    finalPrice() {

      return this.totalTaxablePriceWithVat + this.totalNonTaxablePrice;

    },

    disableProceedToCheckBox() {

      return this.totalSelectedCartItemCount === 0;

    },

  },

  methods: {

    notActiveProducts(item) {

      return item['is_active'] ? 'white_background' : 'red_background';

    },

    getAllCartProductsList() {

      this.$store.dispatch("cart/loadAllCartProducts").then(response => {

        console.log(response.data, 'success');

        this.productsEligibleForOrders = response.data.filter(data => data['is_active']);

        this.productsNotEligibleForOrders = response.data.filter(data => !data['is_active']);

        if (this.productsNotEligibleForOrders.length > 0) {

          this.productsNotEligibleForOrders.map((data, index) => {

            data.serial_no = index + 1;

          });

        }

        this.loading = false;

      }).catch(e => {

        console.log(e.response, 'error');

        this.loading = false;

      })

    },

    chooseAllCartItemsForOrder(selectAllValue) {

      for (let i = 0; i < this.productsEligibleForOrders.length; i++) {

        this.productsEligibleForOrders[i]['is_checked'] = selectAllValue;

        this.chooseSingleCartItem(this.productsEligibleForOrders[i]);

      }

    },

    chooseSingleCartItem(cartItem) {

      if (cartItem['is_checked']) {

        let checkIfProductSelectedAlreadyExistsInTheOrdering = this.productSelectedForOrdering.find(cart => cart['cart_code'] === cartItem['cart_code']);

        if (checkIfProductSelectedAlreadyExistsInTheOrdering) {

          console.log('duplicate entry');

        } else {

          this.productSelectedForOrdering.push(cartItem);

        }

      } else {

        let cartIndex = this.productSelectedForOrdering.findIndex(data => data['cart_code'] === cartItem['cart_code']);

        this.productSelectedForOrdering.splice(cartIndex, 1);

      }

      if (this.productSelectedForOrdering.length === this.productsEligibleForOrders.length) {

        this.selectAllCheckBox = true;

      } else {

        this.selectAllCheckBox = false;

      }

    },

    decreaseQuantity(cartItem) {

      cartItem.decreaseLoadingButton = true;

      if (cartItem.quantity > 1) {

        console.log('decrease gar');

        this.updateCartItemForNewQuantity(cartItem);

      }

    },

    updateQuantity(cartItem) {

      console.log(cartItem, 'cart item');

      setTimeout(() => {

        let updatedQuantity = parseInt(cartItem['quantity']);

        if (updatedQuantity > cartItem['stock']) {

          cartItem['quantity'] = cartItem['stock'];

        } else if (updatedQuantity < 1) {

          cartItem['quantity'] = 1;

        }

        this.updateCartItemForNewQuantity(cartItem);


      }, 1000);

    },

    increaseQuantity(cartItem) {

      cartItem.increaseLoadingButton = true;

      if (cartItem.quantity <= cartItem['stock']) {

        console.log('increase gar');

        this.updateCartItemForNewQuantity(cartItem);

      }

    },

    updateCartItemForNewQuantity(cartItem) {

      const fd = new FormData();

      let updatedQuantity = parseInt(cartItem.quantity);

      if (cartItem['increaseLoadingButton']) {

        updatedQuantity = updatedQuantity + 1;

      } else if (cartItem['decreaseLoadingButton']) {

        updatedQuantity = updatedQuantity - 1;

      }

      fd.append("quantity", updatedQuantity);

      fd.append("_method", "PUT");

      let payload = {

        formData: fd,

        cart_code: cartItem['cart_code'],

      };

      this.$store.dispatch('cart/updateQuantityForProduct', payload).then(response => {

        console.log(response.data, 'response');

        this.changeStockAndOtherValueBasedOnAffectedCartItems(response.data);

        cartItem.quantity = updatedQuantity;

      }).catch(e => {

        errorHandler(e, this);

      }).finally(() => {

        cartItem['increaseLoadingButton'] = false;

        cartItem['decreaseLoadingButton'] = false;

      });

    },

    changeStockAndOtherValueBasedOnAffectedCartItems(response) {

      for (let i = 0; i < response.length; i++) {

        let responseCartItems = response[i];

        for (let j = 0; j < this.productsEligibleForOrders.length; j++) {

          let cartItems = this.productsEligibleForOrders[j];

          if (responseCartItems['cart_code'] === cartItems['cart_code']) {

            cartItems['display_stock'] = responseCartItems['display_stock'];

            cartItems['stock'] = responseCartItems['stock'];

          }

        }

      }

    },

    deleteAllProducts() {

      console.log('delete cart items');

      let eligibleCartItem = [];

      for (let i = 0; i < this.eligibleCartItems.length; i++) {

        eligibleCartItem.push(this.eligibleCartItems[i]['cart_code']);

      }

      this.$store.commit('notification/SHOW_DELETE_DIALOG', {

        title: 'Delete Product',

        message: `Are you sure you want to remove all the item from the cart list?`,

        data: {

          delete_url: '/carts/mass-destroy',

          params: {

            cart_codes: eligibleCartItem

          }

        },

      });

      this.$nuxt.$once('delete_success_event', (value) => {

        if (value['success']) {

          this.$store.dispatch("cart/loadAllCartProductsCount");

          this.deleteAllProductLoading = false;

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: value['response']['message'],

            color: 'success'

          });

          this.productSelectedForOrdering = [];

          this.productsEligibleForOrders = [];

        } else {

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: value['response']['message'],

            color: 'error'

          })

        }

      });

      this.deleteAllProductLoading = false;

    },

    deleteAllNonEligibleProducts() {

      console.log('delete cart items');

      let nonEligibleCartItem = [];

      this.removeNonEligibleProducts = true;

      for (let i = 0; i < this.nonEligibleCartItems.length; i++) {

        nonEligibleCartItem.push(this.nonEligibleCartItems[i]['cart_code']);

      }

      this.$store.commit('notification/SHOW_DELETE_DIALOG', {

        title: 'Delete Product',

        message: `Are you sure you want to remove all the item from the cart list?`,

        data: {

          delete_url: '/carts/mass-destroy',

          params: {

            cart_codes: nonEligibleCartItem

          }

        },

      });

      this.$nuxt.$once('delete_success_event', (value) => {

        if (value['success']) {

          this.$store.dispatch("cart/loadAllCartProductsCount");

          this.productsNotEligibleForOrders = [];

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: value['response']['data']['message'],

            color: 'success'

          });

        } else {

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: value['response']['data']['message'],

            color: 'error'

          })

        }

      });

      this.removeNonEligibleProducts = false;

    },

    redirectToProductDetailPage(selectedProduct) {

      this.$router.push({

        name: 'ProductDetail',

        params: {

          slug: selectedProduct.product.slug

        },

      });

    },

    deleteSingleNonEligibleProduct(cartItem) {

      this.removeNonEligibleProducts = true;

      this.deleteSingleProductDialog(cartItem);

    },

    deleteSingleProductDialog(cartItem) {

      console.log(cartItem, 'cart item');

      this.$store.commit('notification/SHOW_DELETE_DIALOG', {

        title: 'Delete Product',

        message: `Are you sure you want to <b>${cartItem['product']['product_name']}</b> from the cart list?`,

        data: {

          delete_url: `/user/carts/${cartItem['cart_code']}`,

          params: {}

        },

      });

      this.removeTheProductFromTheCartListAndShowSnackbar(cartItem);

    },

    removeTheProductFromTheCartListAndShowSnackbar(cartItem) {

      this.$nuxt.$once('delete_success_event', (value) => {

        console.log(value, 'value');

        if (value['success']) {

          if (this.removeNonEligibleProducts) {

            let removedCartIndex = this.productsNotEligibleForOrders.findIndex(cart => cart['cart_code'] === cartItem['cart_code']);

            this.productsNotEligibleForOrders.splice(removedCartIndex, 1);

          } else {

            let removedCartIndex = this.productsEligibleForOrders.findIndex(cart => cart['cart_code'] === cartItem['cart_code']);

            this.productsEligibleForOrders.splice(removedCartIndex, 1);

            if (cartItem['is_checked']) {

              let removedFromSelectedCartIndex = this.productSelectedForOrdering.findIndex(cart => cart['cart_code'] === cartItem['cart_code']);

              this.productSelectedForOrdering.splice(removedFromSelectedCartIndex, 1);

            }

          }

          this.removeNonEligibleProducts = false;

          if (value['response']['data'].length > 0) {

            this.changeStockAndOtherValueBasedOnAffectedCartItems(value['response']['data']);

          }

          this.$store.dispatch("cart/loadAllCartProductsCount");

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: value['response']['message'],

            color: 'success'

          });

        } else {

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: value['response']['data']['message'],

            color: 'error'

          })

        }

      });

    },

    checkout() {

      console.log('checkout gar');

      this.$store.commit("cart/ADD_CART_ITEMS", this.productSelectedForOrdering);

      this.$router.push({name: "store-orders-place-orders"});

    }

  }

}
</script>

<style scoped>

</style>
