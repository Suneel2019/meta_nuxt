<template>
  <div>
    <SajiloAddToCart :stock-detail="productStockList"
                     v-if="productStockList.length !== 0"
                     @close-dialog="closeStockInfoDialog">

    </SajiloAddToCart>
    <v-row class="px-4 mt-3" no-gutters>
      <v-col cols="12">
        <div class="product_name_single_page">{{ product_detail['product_name'] }}</div>
      </v-col>
      <v-col cols="12">
        <div class="brand_name">Brand: {{ product_detail['brand']['brand_name'] }}</div>
      </v-col>
      <v-col cols="12">
        <div class="brand_name">Category: {{ product_detail['category']['category_name'] }}</div>
      </v-col>
      <v-col cols="12" lg="3">
        <v-rating
          dense
          small
          background-color="yellow darken-4"
          color="yellow darken-4"
          v-model="product_detail['rating']"
        ></v-rating>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="8" lg="7" class="mt-lg-0 mt-md-0 mt-sm-3">
            <v-card class="mt-1" tile color="darkBlue" elevation="0">
              <div class="available_stock text-center">Stock Available: {{ variant_stock }}
              </div>
            </v-card>
          </v-col>
          <v-col cols="4" lg="3" sm="6" class="px-2 px-xl-0 px-lg-0  ">
            <v-card class="mt-1 ml-md-0 ml-lg-2 mt-lg-1" tile :color="product_detail['is_taxable']?'darkBlue':'red'"
                    elevation="0">
              <div v-if="product_detail['is_taxable']" class="available_stock text-center">Taxable</div>
              <div v-else class="available_stock text-center">Non-Taxable</div>
            </v-card>
          </v-col>
          <v-col cols="12" class="mt-2">
            <v-btn
              tile
              x-small
              depressed
              height="22"
              color="primary"
              :loading="showQuickStockInfoBtnLoadingState"
              @click="openProductStockDialog"
            >
              <template v-slot:loader>
                <v-progress-circular
                  size="14"
                  width="2"
                  indeterminate>
                </v-progress-circular>
              </template>
              सजिलो cart
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!--      <v-col cols="12" class="mt-3">-->
      <!--        <div v-if="product_detail['video_link'] !==''" class="brand_name mt-1">Video:-->
      <!--          <v-btn-->
      <!--            dark-->
      <!--            icon-->
      <!--            x-small-->
      <!--            @click="showVideoPlayerDialog(product_detail['video_link'])"-->
      <!--          >-->
      <!--            <v-icon color="darkBlue">mdi-play-circle</v-icon>-->
      <!--          </v-btn>-->
      <!--        </div>-->
      <!--      </v-col>-->
    </v-row>
    <v-row no-gutters class="px-4">
      <v-divider class="mt-3 mb-1"></v-divider>
    </v-row>
    <v-row class="pl-4" no-gutters>
      <v-col v-if="!variant_price" cols="12">
        <div class="price mb-2"><span
          v-if="product_detail['product_variants'].length===0">Rs.</span>{{ product_detail['rate'] }}
          <span class="ml-2 brand_name"
                v-if="product_detail['is_taxable']">(13% VAT included)</span></div>
      </v-col>
      <v-col v-else-if="variant_price" cols="12">
        <div class="price mb-2">Rs.{{ variant_price.toFixed(2) }}
          <span class="ml-2 brand_name"
                v-if="product_detail['is_taxable']">(13% VAT included)</span></div>
      </v-col>
      <v-col v-else cols="12" class="my-2">
        Rs.
        <v-icon small v-for="(item,index) in 3" :key="index" color="darkOrange">mdi-help</v-icon>
      </v-col>
      <v-col v-if="!variant_price" cols="12">
        <div class="price mb-2">{{ product_detail['rate'] }}
          <span class="ml-2 brand_name"
                v-if="product_detail['is_taxable']">(13% VAT included)</span></div>
      </v-col>
      <v-col v-else-if="variant_price" cols="12">
        <div class="price mb-2">Rs.{{ variant_price.toFixed(2) }}
          <span class="ml-2 brand_name"
                v-if="product_detail['is_taxable']">(13% VAT included)</span></div>
      </v-col>
      <v-card v-if="product_detail['first_variant'].length>0" color="#f1f1f1" tile
              width="100%"
              class="py-2 px-2" elevation="4">
        <v-col cols="12">
          <div class="mb-1">
                  <span class="variant_name">{{ product_detail['first_variant'][0]['variant_name'] }}: <span
                    class="selected_variant">{{ selected_variant[0] }}</span></span>
          </div>
          <div>
            <v-btn v-for="(variantValue,index) in product_detail['first_variant']" :key="index"
                   tile
                   dark
                   x-small
                   outlined
                   depressed
                   height="30"
                   class="mr-2 mb-1"
                   :ripple="false"
                   :color="variantValue['color']"
                   v-on:click="$emit('change-image-and-price-according-to-variant',variantValue)"
            >
                    <span :class="variantValue['color']==='#FF5C00'?'variant_button':'unselected_variant_button'">{{
                        variantValue['variant_value_name']
                      }}</span>
            </v-btn>
          </div>
        </v-col>
        <v-col v-for="(associated,index) in associated_variants" :key="index" cols="12">
          <div class="mb-1">
                  <span class="variant_name">{{ associated[0]['variant_name'] }}: <span
                    class="selected_variant">{{ selected_variant[index + 1] }}</span></span>
          </div>
          <div>
            <v-btn v-for="(variantValue,index) in associated" :key="index"
                   tile
                   dark
                   x-small
                   outlined
                   depressed
                   height="30"
                   class="mr-2 mb-1"
                   :ripple="false"
                   :color="variantValue['color']"
                   v-on:click="$emit('change-image-and-price-according-to-variant',variantValue)"
            >
                    <span :class="variantValue['color']==='#FF5C00'?'variant_button':'unselected_variant_button'">{{
                        variantValue['variant_value_name']
                      }}</span>
            </v-btn>
          </div>
        </v-col>
        <v-overlay
          absolute
          :value="loading_variant_icon"
        >
          <div> Loading Variants....</div>
        </v-overlay>
      </v-card>
    </v-row>
  </div>
</template>

<script>

import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "ProductDescription",
  components: {
    SajiloAddToCart: () => import("@/components/shared/product-page/SajiloAddToCart")
  },
  props: [
    'product_detail',
    'variant_price',
    'variant_stock',
    'selected_variant',
    'associated_variants',
    'loading_variant_icon',
    'loading',
  ],

  data() {

    return {

      showQuickStockInfoBtnLoadingState: false,
      product_reviews: '1,420',
      videoUrl: '',
      videoPlayerDialog: false,
      productStockList: [],
      dialogState: false,

    }

  },

  methods: {

    openProductStockDialog() {

      this.showQuickStockInfoBtnLoadingState = true;

      const {product_code} = this.product_detail;

      this.$store.dispatch("product/getTheSingleProductsListViewDetails", product_code).then(res => {

        this.productStockList = res.map(product => {

          product['packaging_information'] = product['packaging_information'].map(item => {

            item['btn_loading_state'] = false;

            item['quantity'] = 1;

            return item;

          });

          return product;

        });

        this.dialogState = true;

      }).catch(e => {

        errorHandler(e, this);

      }).finally(() => {

        this.showQuickStockInfoBtnLoadingState = false;

      });

    },

    closeStockInfoDialog() {

      this.dialogState = false;

      this.productStockList = [];

    },

    // showVideoPlayerDialog(url) {
    //
    //   this.videoUrl = url;
    //
    //   $('#ytplayer').attr('src', this.videoUrl);
    //
    //   this.videoPlayerDialog = true;
    //
    // },
    //
    // closeVideo() {
    //
    //   $('#ytplayer').attr('src', '');
    //
    //   this.videoPlayerDialog = false;
    //
    // },

  }


}
</script>

<style scoped>

</style>
