<template>
  <v-dialog
    width="60%"
    scrollable
    persistent
    v-model="dialogState"
  >
    <v-card tile>
      <v-card-actions class="pa-0">
        <v-row no-gutters align="center" class="primary px-5 pt-2 pb-1">
          <v-col cols="11" class="subtitle-1 white--text">
            {{ stockDetail[0]['product_name'] }}
          </v-col>
          <v-col cols="1" class="text-end">
            <v-icon color="white" @click="closeDialog">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-text class="px-0 body-2">
        <v-row no-gutters class="pt-3 px-5">
          <v-col cols="12">
            <v-card outlined>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="pb-2"
                  v-for="(variant, variantIndex) in stockDetail"
                  :key="variantIndex"
                >
                  <v-row no-gutters>
                    <v-col cols="12" class="primary white--text px-3 pt-2 pb-1">
                      Variant Type: {{ variant['product_variant_name'] }}
                    </v-col>
                  </v-row>

                  <v-row
                    no-gutters
                    class="px-3 pt-2"
                    v-for="(packagingInformation, packagingInformationIndex) in variant['packaging_information']"
                    :key="packagingInformationIndex"
                  >
                    <v-col cols="12" class="font-weight-bold">
                      Package Type: {{ packagingInformation['package_name'] }}
                      <v-tooltip right color="black">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            small
                            v-on="on"
                            v-bind="attrs"
                            color="primary"
                          >
                            mdi-information
                          </v-icon>
                        </template>
                        {{ packagingInformation['package_consists'] }}
                      </v-tooltip>
                    </v-col>

                    <v-col cols="4">
                      <div class="product_price font-weight-bold">Rs. {{ packagingInformation.price.toFixed(2) }}</div>
                      <div class="caption green--text font-weight-medium">
                        Available in Stock : ({{ packagingInformation['cartable_stock'] }})
                      </div>
                      <div class="caption green--text font-weight-medium">
                        Order Quantity : ({{ packagingInformation['ordered_quantity'] }})
                      </div>
                    </v-col>

                    <v-col cols="5">
                      <v-row no-gutters justify="center">
                        <v-col cols="10">
                          <v-row no-gutters justify="space-between">
                            <v-col cols="3">
                              <v-btn
                                tile
                                small
                                depressed
                                height="34"
                                @click="decreaseQuantity(packagingInformation)"
                              >
                                <v-icon size="15">mdi-minus</v-icon>
                              </v-btn>
                            </v-col>

                            <v-col cols="4">
                              <v-text-field
                                solo
                                flat
                                dense
                                hide-details
                                class="quantity-text-field"
                                v-model="packagingInformation.quantity">
                              </v-text-field>
                            </v-col>

                            <v-col cols="3">
                              <v-btn
                                tile
                                small
                                depressed
                                height="34"
                                @click="increaseQuantity(packagingInformation)"
                              >
                                <v-icon size="15">mdi-plus</v-icon>
                              </v-btn>
                            </v-col>

                            <v-col cols="12" class="caption mt-1">
                              Item in cart:
                              <span class="font-weight-bold">{{ packagingInformation['cart_quantity'] }}</span>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="3" class="text-center">
                      <v-btn
                        small
                        outlined
                        height="34"
                        color="darkOrange"
                        :loading="packagingInformation['btn_loading_state']"
                        @click="addProductToCart(variant, packagingInformation)"
                      >
                        <v-icon small left>mdi-cart</v-icon>
                        Add to Cart
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "SajiloAddToCart",

  props: {
    productSlug: {
      type: String
    },
    stockDetail: {
      type: Array
    }
  },

  data() {

    return {

      dialogState: true,
      btnLoadingState: false,
    }

  },

  methods: {

    closeDialog() {

      this.dialogState = false;

      this.$emit('close-dialog');

    },

    decreaseQuantity(packingInformation) {

      if (packingInformation['quantity'] > 1) {

        packingInformation['quantity']--;

      }

    },

    increaseQuantity(packingInformation) {

      if (packingInformation['cartable_stock'] >= 1) {

        packingInformation['quantity']++;

      }

    },

    addProductToCart(variant, packagingInformation) {

      console.log('sajilo cart');

      packagingInformation['btn_loading_state'] = true;

      const {product_variant_code} = variant;

      let payload = {

        quantity: packagingInformation['quantity'],

        package_code: packagingInformation.package_code,

        product_slug: this.$route.params.slug ?? this.productSlug

      }

      if (product_variant_code) {

        payload['combination_name'] = product_variant_code;

      }

      this.$store.dispatch("cart/addProductToCart", payload).then(response => {

        variant['packaging_information'].forEach((packageType, idx) => {

          packageType['cartable_stock'] = response.data['product_packaging_types'][idx]['stock'];

          packageType['cart_quantity'] = response.data['product_packaging_types'][idx]['stock_in_cart']

        });

        this.$store.dispatch("cart/loadAllCartProductsCount");

        this.$store.commit('notification/COMMIT_SNACKBAR', {

          message: response['message'],

          color: 'success'

        });

      }).catch(e => {

        errorHandler(e, this);

      }).finally(() => {

        packagingInformation['btn_loading_state'] = false;

      });

    },

  }

}
</script>

<style lang="scss" scoped>
.quantity-text-field {
  border-radius: 0;
  font-size: 0.875rem;
  border: 1px solid #dfdfdf;
}

.quantity-text-field ::v-deep .v-input__control {
  min-height: 32px !important;

  input {
    text-align: center;
  }
}
</style>
