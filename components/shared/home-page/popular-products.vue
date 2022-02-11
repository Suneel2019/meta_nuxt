<template>
  <div class="mt-3">
    <div class="title font-weight-bold mb-3">Most Popular Products</div>
    <GridViewLayout :products="popularProducts" :load_more="loading"
                    :no_more_products="noMoreProducts"></GridViewLayout>
    <div v-if="!noMoreProducts" class="text-center">
      <v-btn @click="loadMoreProducts" small :disabled="loading" :dark="!loading" color="darkOrange" :loading="loading">
        Load
        More
      </v-btn>
    </div>
  </div>
</template>

<script>
import HomePageService from "@/services/shared/home-page";
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "popular-products",

  components: {

    GridViewLayout: () => import("@/components/shared/category-filter-page/GridViewLayout"),

  },
  data() {

    return {

      popular_products: [],
      page_no: 1,
      loading: false,
      noMoreProducts: false,

    }

  },

  async fetch() {

    await this.getPopularProductsList();

  },

  computed: {

    popularProducts() {

      return this.popular_products;

    }

  },

  methods: {

    loadMoreProducts() {

      this.page_no = this.page_no + 1;

      this.loading = true;

      this.getPopularProductsList();

    },

    getPopularProductsList() {

      HomePageService.getMostPopularAllProducts({page: this.page_no}).then(response => {

        console.log(response.data);

        this.noMoreProducts = response.data.length === 0;

        this.popular_products = this.popular_products.concat(response.data);

        this.loading = false;

      }).catch(e => {

        errorHandler(e, this);

      })

    }

  }

}
</script>

<style scoped>

</style>
