<template>
  <div>
    <SajiloAddToCart
      :product-slug="selectedProductSlug"
      :stock-detail="productStockList"
      v-if="productStockList.length>0"
      @close-dialog="closeStockInfoDialog"
    >
    </SajiloAddToCart>
    <v-row no-gutters v-if="products.length > 0">
      <v-col cols="12" lg="3" md="3" xl="3" class="my-3" v-for="(product, index) in products" :key="index">
        <v-card
          tile
          hover
          class="mx-2"
          color="grey lighten-4"
        >
          <div class="product_image_zoomer">
            <v-card tile elevation="0" :to="{ name: 'ProductDetail', params: {slug: product.slug}}">
              <img
                height="180"
                class="product_image"
                :src="product.featured_image"
              >
            </v-card>
          </div>
          <v-divider></v-divider>
          <v-row no-gutters class="pa-2 pt-0">
            <v-col cols="12" class="product_name mt-1 text-truncate display-6">
                        <span @click="goToProductDetail(product.slug)" :title="product.product_name"
                              class="font-weight-medium subtitle-2 cursor_on_hover">{{ product.product_name }}</span>
            </v-col>
            <v-col cols="12">
              <v-row dense>
                <v-col cols="8" xl="12" lg="12" md="8" class="product_price font-weight-bold mb-0 pb-0 subtitle-2 mt-0">
                  {{ product.price }}
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="8" class="pt-0 pt-xl-1 pt-lg-1 mb-2">
              <v-rating
                dense
                small
                background-color="grey darken-1"
                color="yellow darken-3"
                v-model="rating"
              ></v-rating>
            </v-col>
            <v-col class="pt-1 text-right"
                   cols="2">
              <v-btn v-if="product.price!=='Rs. N/A'" @click="openProductStockDialog(product)"
                     icon x-small>
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else style="height: 300px" align="center" justify="center">
      <v-col cols="8" xl="4" lg="4" class="text-uppercase text-center font-weight-bold">
        <div>
          <img height="250" src="@/assets/img/shared/no-products.jpg">
        </div>
        <div class="text-left ml-xl-5 ml-lg-5 ml-4">
          No Products Available
        </div>
      </v-col>
    </v-row>
    <v-row v-if="load_more" align="center" justify="center" class="mt-4">
      <v-progress-circular
        width="3"
        indeterminate
        color="primary"
        size="35">
      </v-progress-circular>
    </v-row>
    <v-row align="center" justify="center" class="mt-8" v-if="no_more_products && products.length>0">
      <v-col cols="12" xl="4" lg="4" class="text-uppercase font-weight-bold">No More Products.</v-col>
    </v-row>
  </div>
</template>

<script>
export default {

  name: "GridViewLayout",

  props: ['products', 'load_more', 'no_more_products'],

  components: {

    SajiloAddToCart: () => import("@/components/shared/product-page/SajiloAddToCart")

  },

  data() {

    return {

      openDialogToAddToCart: false,
      selectedProductSlug: '',
      selectedProductName: '',
      sheet: false,
      rating: 3,
      productStockList: [],
      dialogState: false,
      popularProduct: true,
      showQuickStockInfoBtnLoadingState: false,

    }

  },

  methods: {

    openProductStockDialog(product) {

      const {product_code} = product;

      this.selectedProductSlug = product.slug;

      this.$store.dispatch("product/getTheSingleProductsListViewDetails", product_code).then(response => {

        this.productStockList = response.map(product => {

          product['packaging_information'] = product['packaging_information'].map(item => {

            item['btn_loading_state'] = false;

            item['quantity'] = 1;

            return item;

          });

          return product;

        });

        this.sheet = true;

      });

    },

    closeStockInfoDialog() {

      this.sheet = false;

      this.productStockList = [];

    },

    goToProductDetail(slug) {

      this.$router.push({

        name: 'ProductDetail', params: {slug: slug}

      })

    },

  }

}
</script>

<style scoped>

</style>
