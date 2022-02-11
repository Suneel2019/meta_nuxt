<template>
  <v-row v-if="relatedProducts.length>0" class="pa-2"
         no-gutters>
    <v-col style="background-color: white" cols="12" class="pa-0">
      <div class="subtitle-2 font-weight-bold pa-1 px-2">Related Products</div>
    </v-col>
    <v-col cols="12" class="mt-2">
      <v-card
        :to="{ name:'ProductDetail',params:{slug:product.slug}}"
        v-for="(product,index) in relatedProducts" class="pa-1 mb-1"
        :key="index" elevation="0"
        tile>
        <v-row no-gutters class="pb-3" style="border-bottom: 1px solid #e5e5e5">
          <v-col cols="4">
            <v-card width="100" tile elevation="2">
              <img :src="product.featured_image"
                   class="related_product_image">
            </v-card>
          </v-col>
          <v-col cols="8">
            <div class="related_product_name ml-2">{{ product.product_name }}</div>
            <v-rating class="rating_design ml-1" small v-model="rating" color="yellow darken-3"
                      background-color="yellow darken-4"></v-rating>
            <div class="caption font-weight-bold ml-2 price_color">{{ product.price }}</div>
            <div class="related_product_category ml-2">Brand: {{ product.brand }}</div>
            <div class="related_product_category ml-2">Category: {{ product.category }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RelateProducts",
  props: ['product_code'],
  data() {
    return {
      rating: 3,
      related_products: [],
    }
  },

  watch: {

    '$routes': {

      handler() {

        this.$store.dispatch("product/loadAllRelatedProducts", {

          slug: this.$route.params.slug

        }).then(response => {

          this.related_products = response;

          console.log(response, 'response');

          this.$emit('related-products', response);

        })

      },

      immediate: true

    }

  },

  computed: {

    relatedProducts() {

      let splicedRelatedProduct = [];

      splicedRelatedProduct = this.related_products;

      if (this.related_products.length > 3) {

        return splicedRelatedProduct.splice(0, 3);

      } else {

        return splicedRelatedProduct;

      }

    },

  },
}
</script>
