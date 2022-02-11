<template>
  <v-container fluid>
    {{ collectionInformation }}
    <!--    <v-row no-gutters class="text-center my-5">-->
    <!--      <v-col cols="12" class="title">-->
    <!--        {{ collectionInformation['product_collection_title'] }}-->
    <!--      </v-col>-->
    <!--      <v-col cols="12" class="body-2 grey&#45;&#45;text font-weight-normal">-->
    <!--        {{ collectionInformation['products_count'] }} Items Found-->
    <!--      </v-col>-->
    <!--    </v-row>-->
    <!--    <v-row v-if="collectionInformation['product_collection_image']">-->
    <!--      <v-img :src="collectionInformation['product_collection_image']"></v-img>-->
    <!--    </v-row>-->
    <v-row dense>
      <v-col cols="12" lg="9" md="9"></v-col>
      <v-col cols="12" lg="2" md="12">
        <change-layout></change-layout>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row dense class="mt-5">
      <v-col cols="12">
        <div v-if="gridLayout">
          <GridViewLayout :products="collectionProductList" :load_more="loading"
                          :no_more_products="noMoreProducts"></GridViewLayout>
        </div>
      </v-col>
      <v-col cols="12">
        <div v-if="listViewLayout">
          <ListViewLayout :products="collectionProductList" :load_more="loading"
                          :no_more_products="noMoreProducts"></ListViewLayout>
        </div>
      </v-col>
    </v-row>
    <div v-if="!noMoreProducts" class="text-center">
      <v-btn @click="loadMoreCollectionProducts" small :disabled="loading" :dark="!loading" color="darkOrange"
             :loading="loading">
        Load More
      </v-btn>
    </div>
  </v-container>
</template>

<script>

import ProductCollection from "@/services/shared/product-collection";
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "view-all-products",

  components: {

    ListViewLayout: () => import("@/components/shared/category-filter-page/ListViewLayout"),

    ChangeLayout: () => import("@/components/shared/category-filter-page/ChangeLayout"),

    GridViewLayout: () => import("@/components/shared/category-filter-page/GridViewLayout")

  },

  data() {

    return {

      collectionProducts: [],
      loading: false,
      page_no: 1,
      noMoreProducts: false,
      product_collection_slug: null,
      collectionInformation: null,

    }

  },

  asyncData({params}) {

    return {

      product_collection_slug: params['collection_name']

    }

  },

  async fetch() {

    await this.getSelectedProductCollectionProducts();

  },

  computed: {

    collectionProductList() {

      return this.collectionProducts;

    },

    listViewLayout() {

      return this.$store.getters['category/LIST_VIEW_LAYOUT'];

    },

    gridLayoutIcon() {

      return this.$store.getters['category/GRID_LAYOUT_ICON'];

    },

    viewListLayoutIcon() {

      return this.$store.getters['category/VIEW_LIST_LAYOUT_ICON'];

    },

    gridLayout() {

      return this.$store.getters['category/GRID_LAYOUT'];

    },

  },

  methods: {

    loadMoreCollectionProducts() {

      this.page_no = this.page_no + 1;

      this.loading = true;

      this.getSelectedProductCollectionProducts();

    },

    getSelectedProductCollectionProducts() {

      console.log(this.product_collection_slug, 'collection');

      let payload = {

        page: this.page_no,

        slug: this.product_collection_slug

      }

      ProductCollection.selectedProductCollectionAllProductsList(payload).then(response => {

        this.noMoreProducts = response.data.length === 0;

        this.collectionProducts = this.collectionProducts.concat(response.data);

        this.loading = false;

      }).catch(e => {

        errorHandler(e, this);

        this.loading = false;

      }).finally(() => {

        this.loading = false;

      })

    }

  }

}
</script>

<style scoped>

</style>
