<template>
  <v-container fluid>
    <banner-slider></banner-slider>
    <product-collections></product-collections>
    <brand-slider></brand-slider>
    <popular-products v-if="isUserLoggedIn"></popular-products>
  </v-container>
</template>

<script>

import CategoryService from "@/services/shared/category";

export default {

  components: {

    PopularProducts: () => import("@/components/shared/home-page/popular-products"),

    BrandSlider: () => import("@/components/shared/home-page/brand-slider"),

    ProductCollections: () => import("@/components/shared/home-page/product-collections"),

    BannerSlider: () => import("@/components/shared/home-page/banner-slider")

  },

  data() {

    return {}

  },

  head() {

    return {

      title: 'Aba chai sure vayo la chagne garda title'

    }

  },

  async fetch() {

    await this.getCategoryList();

  },

  computed: {

    isUserLoggedIn() {

      return this.$store.getters['login/ISLOGINED'];

    }

  },

  methods: {

    getCategoryList() {

      try {

        CategoryService.getAllCategories().then(response => {

          this.$store.commit("category/SET_ALL_CATEGORIES", response.data);

        })

      } catch (e) {

        console.log(e, 'response');

      }

    },

  }

}
</script>
