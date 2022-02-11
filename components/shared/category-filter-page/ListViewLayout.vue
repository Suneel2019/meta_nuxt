<template>
  <div>
    <v-row v-if="products.length>0" dense no-gutters class="pt-0">
      <v-col cols="12" class="pt-0">
        <v-card v-for="(product,index) in products" class="card_hover pa-3" :key="index" elevation="0"
                min-width="100%">
          <v-row dense no-gutters>
            <v-col cols="3">
              <v-hover v-slot:default="{ hover }">
                <div class="product_image_zoomer">
                  <img @click="goToDetailPage(product)"
                       class="product_image" height="180" width="180"
                       :class="{ product_image_hover: hover }" :src="product.featured_image">
                </div>
              </v-hover>
            </v-col>
            <v-col cols="9" xl="6" lg="6" md="9">
              <div class="title font-weight-medium mb-2 product_name" @click="goToDetailPage(product)">
                {{ product.product_name }}
              </div>
              <v-rating
                dense
                small
                background-color="grey darken-1"
                color="yellow darken-3"
                v-model="rating"
              ></v-rating>
              <div>
                <div class="caption font-weight-regular mb-1" v-for="(highlight, index) in product['highlights']"
                     :key="index">
                  <span class="mr-1"><v-icon x-small>mdi-circle-medium</v-icon></span>{{ highlight }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" xl="3" lg="3" md="12">
              <div class="title font-weight-medium product_price">{{ product.price }}</div>
            </v-col>
          </v-row>
          <v-divider class="mt-6" style="opacity: 0.6;"></v-divider>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else style="height: 300px" align="center" justify="center">
      <v-col cols="8" xl="4" lg="4" class="text-uppercase font-weight-bold">
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
    <v-row align="center" justify="center" class="title font-weight-medium mt-8"
           v-if="no_more_products && products.length>0">
      No more products to load.
    </v-row>
  </div>
</template>

<script>
export default {

  name: "ListViewLayout",

  props: ['products', 'load_more', 'no_more_products'],

  data() {

    return {

      sheet: false,
      selectedProductSlug: '',
      selectedProductName: '',
      rating: 3,
    }

  },

  methods: {

    goToDetailPage(product) {

      this.$router.push({
        name: 'ProductDetail', params: {slug: product.slug}
      })

    },

  }

}
</script>

<style scoped>

</style>
