<template>
  <v-container fluid>
    <div>
      <v-row no-gutters>
        <SajiloAddToCart
          :stock-detail="productStockList"
          v-if="productStockList.length>0"
          @close-dialog="closeStockInfoDialog"
        >
        </SajiloAddToCart>

        <v-col cols="12" md="3" lg="4" xl="3" class="pr-5 ">
          <v-row no-gutters>
            <v-col cols="12">
              <v-row no-gutters>
                <v-col cols="12" class="subtitle-2">
                  Related Categories
                </v-col>
                <v-col cols="12" class="category_color caption font-weight-medium text-uppercase mt-1">
                  <div class="pr-1">
                    {{ categoryTitle }}
                  </div>
                  <v-divider class="mt-2"></v-divider>
                </v-col>
                <v-col cols="12" v-if="selectedCategoryChildren.length > 0">
                  <v-checkbox
                    v-for="(categoryChild,index) in selectedCategoryChildren"
                    hide-details
                    :ripple="ripple"
                    color="darkOrange"
                    :value="categoryChild"
                    :multiple="checkIfCategoryHasChildren"
                    class="checkbox_design"
                    :label="`${categoryChild.category_name}`"
                    v-model="checkboxSelectedCategory"
                    @click="showSelectedCategoryProductsFromCheckBox(checkboxSelectedCategory)"
                    :key="index">
                  </v-checkbox>
                </v-col>
                <v-divider class="mt-2"></v-divider>
                <v-row dense>
                  <v-col cols="12" class="subtitle-2 font-weight-medium mt-3">Price</v-col>
                  <v-col cols="12">
                    <v-range-slider
                      color="darkOrange"
                      track-color="#f7ccb4"
                      v-model="range"
                      :min="minimumValue"
                      :max="maximumValue"
                      hide-details
                      class="text-center range_slider ml-2"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="range[0]"
                          class="mt-0 pt-0 range_slider_design"
                          type="number"
                          solo
                          height="30"
                          style="width: 60px"
                          @change="$set(range, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="range[1]"
                          class="mt-0 pt-0 range_slider_design"
                          solo
                          height="30"
                          type="number"
                          style="width: 60px"
                          @change="$set(range, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                  <v-col cols="4" lg="3" class="mt-9 body-2 ml-2">Minimum</v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="4" lg="3" class="mt-9 text-end body-2">Maximum</v-col>
                  <v-col cols="12" class="text-center mt-8">
                    <v-btn
                      dark
                      tile
                      depressed
                      color="darkOrange"
                      :loading="loadingPriceButton"
                      @click="showProductAccordingToPriceRange"
                    >
                      Filter
                    </v-btn>
                  </v-col>
                </v-row>

              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="9" lg="8" xl="9" class="mb-3">
          <v-row no-gutters>
            <v-col cols="12" class="subtitle-1 font-weight-medium text-uppercase">
              <v-row>
                <v-col class="pb-0 pl-5" cols="10">
                  <div>{{ categoryTitle }}</div>
                  <div class="caption grey--text mt-1">
                    {{ selectedCategoryTotalProductCount }} items found in{{ categoryTitle }}
                  </div>
                </v-col>
                <v-col class="pb-0  text-right" cols="12" xl="2" lg="2" md="12">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <ChangeLayout></ChangeLayout>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider class="mt-4"></v-divider>
            </v-col>
            <v-col cols="12" v-if="loading">
              <v-row align="center" justify="center" style="height: 300px;">
                <v-progress-circular :size="60" color="darkBlue" indeterminate></v-progress-circular>
              </v-row>
            </v-col>
            <v-col cols="12" v-else>
              <div v-if="gridLayout">
                <GridViewLayout :products="showCategoriesProducts" :load_more="loadMore"
                                :no_more_products="noMoreProducts"></GridViewLayout>
              </div>
              <div v-if="listViewLayout">
                <ListViewLayout :products="showCategoriesProducts" :load_more="loadMore"
                                :no_more_products="noMoreProducts"></ListViewLayout>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col offset="1"></v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

export default {

  name: "CategoryFilter",

  data() {

    return {

      selectedCategoryProducts: [],
      loadMore: false,
      noMoreProducts: false,
      bottom: false,
      categoryTitle: '',
      categoryName: [],
      range: [20, 20000],
      minimumValue: 20,
      maximumValue: 50000,
      loadingPriceButton: false,
      productFilter: [
        {
          id: 1,
          name: 'Taxable',
          value: 'yes'
        },
        {
          id: 2,
          name: 'Non-Taxable',
          value: 'no'
        },
        {
          id: 3,
          name: 'All',
          value: 'all'
        },
      ],
      loading: false,
      selectedCategoryTotalProductCount: 0,
      productStockList: [],
      ripple: false,
      checkboxSelectedCategory: [],
      selectedCategoryChildren: [],
      checkIfCategoryHasChildren: false,
      selectedCategoryFromRoute: [],
      selectedCategoryTitle: '',
      selected_product_filter: null,
      returnBack: false,
      daddyCategories: [],
      routeChange: false,
      hasModulesDefined: false,
      loadingPage: true,
      showQuickStockInfoBtnLoadingState: false,
    }

  },

  components: {

    ListViewLayout: () => import("@/components/shared/category-filter-page/ListViewLayout"),

    GridViewLayout: () => import("@/components/shared/category-filter-page/GridViewLayout"),

    ChangeLayout: () => import("@/components/shared/category-filter-page/ChangeLayout"),

    SajiloAddToCart: () => import("@/components/shared/product-page/SajiloAddToCart")

  },

  watch: {

    '$route.query': '$fetch'

  },

  async fetch() {

    await this.changeProductsAccordingToRoute();

  },

  computed: {

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

    showCategoriesProducts() {

      return this.selectedCategoryProducts;

    },

    parentCategoryToGoBack() {

      return this.$store.getters['category/PARENT_CATEGORY'];

    },

  },

  methods: {

    changeProductsAccordingToRoute() {

      if (this.$store.getters['category/SELECTED_CAT_MIN_PRICE'] !== '') {

        this.range = [this.$store.getters['category/SELECTED_CAT_MIN_PRICE'], this.$store.getters['category/SELECTED_CAT_MAX_PRICE']];

      }

      if (this.$store.getters['category/SELECTED_CAT_IS_TAXABLE'] !== '') {

        this.selected_product_filter = this.productFilter.find(data => data.value === this.$store.getters['category/SELECTED_CAT_IS_TAXABLE']);

      }

      this.$store.commit('category/SET_PAGE_FOR_FILTER', 0);

      this.checkboxSelectedCategory = [];

      this.showProductOnRouteChange();

    },

    showProductOnRouteChange() {

      this.bottom = false;

      this.noMoreProducts = false;

      this.selectedCategoryProducts = [];

      this.getSelectedCategoryChildren();

      this.getSelectedCategoryProducts();

    },

    getSelectedCategoryChildren() {

      let selectedCategory = null;

      if (this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER'][0]) {

        selectedCategory = this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER'][0];

      } else {

        selectedCategory = this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER'];

      }

      console.log(selectedCategory, 'selected category herum ta');

      if (selectedCategory['has_children']) {

        this.selectedCategoryChildren = selectedCategory['children'];

      } else {

        this.selectedCategoryChildren = this.$store.getters['category/PARENT_CATEGORY']['children'];

        if (this.$store.getters['category/MULTIPLE_CHECKBOX_SELECT']) {

          this.checkIfCategoryHasChildren = true;

          this.checkboxSelectedCategory = this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER'];

        } else {

          this.checkIfCategoryHasChildren = false;

          this.checkboxSelectedCategory = this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER'];

        }

      }

      let checkIfCategoryHasChildrens = this.selectedCategoryChildren.some(data => data['has_children'] === true);

      this.checkIfCategoryHasChildren = !checkIfCategoryHasChildrens;

      this.$store.commit('category/CHECK_FOR_MULTIPLE_CHECKBOX', this.checkIfCategoryHasChildren);

    },

    checkIfBottomReached(checkForBottom) {

      if (checkForBottom) {

        this.loadMore = true;

        setTimeout(() => {

          this.getSelectedCategoryProducts();

          this.loadMore = false;

        }, 1000);

      }

    },

    getSelectedCategoryProducts() {

      window.addEventListener("scroll", () => {

        if (this.noMoreProducts) {

          this.bottom = false;

        } else {

          this.bottom = this.bottomVisible();

        }

      });

      this.selectedCategoryFromRoute = this.$route.query.category;

      this.selectedCategoryTitle = this.selectedCategoryFromRoute;

      if (typeof (this.selectedCategoryTitle) === 'string') {

        this.categoryTitle = this.selectedCategoryTitle;

      } else {

        this.categoryTitle = this.selectedCategoryTitle.join(' / ');

      }

      if (this.selectedCategoryTitle.length === 0) {

        this.showPreviousSelectedCategory();

      } else {

        this.showSelectedCategoryOptions();

      }

    },

    showSelectedCategoryOptions() {

      if (this.bottom || this.selectedCategoryProducts.length > 0) {

        this.loading = false;

      } else {

        this.loading = true;

      }
      let selectedPage = this.$store.getters['category/SELECTED_CAT_PAGE'];

      this.$store.commit('category/SET_PAGE_FOR_FILTER', selectedPage + 1);

      this.$store.commit('category/SET_CAT_SELECTED_FOR_FILTER', this.selectedCategoryFromRoute);

      let queryParamsForFilter = this.$store.getters['category/CATEGORY_FILTERATION_FIELDS'];

      const removeEmptyOrNull = (obj) => {

        Object.keys(obj).forEach(k =>

          (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||

          (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );

        return obj;

      };

      let removeEmptyValueAttributesFromQueryParams = removeEmptyOrNull(queryParamsForFilter);

      console.log('it is query ', removeEmptyValueAttributesFromQueryParams)

      this.$store.dispatch('category/loadProductsAccordingToQueryString', removeEmptyValueAttributesFromQueryParams).then(response => {

        console.log(response, 'category ko product ko list')

        if (this.routeChange) {

          this.selectedCategoryProducts = [];

        }

        if (response.links.next) {

          let newArray = this.selectedCategoryProducts.concat(response.data);

          this.selectedCategoryProducts = newArray;

          this.noMoreProducts = false;

          this.loading = false;

          this.loadingPriceButton = false;

        } else {

          this.selectedCategoryProducts = this.selectedCategoryProducts.concat(response.data);

          this.bottom = false;

          this.noMoreProducts = true;

          this.loading = false;

          this.loadingPriceButton = false;

        }

        this.selectedCategoryTotalProductCount = response.meta.total;

        this.loadMore = false;

        if (this.returnBack) {

          this.selectedCategoryChildren = this.daddyCategories;

          if (!this.selectedCategoryChildren[0]['upper_category_code']) {

            this.$store.commit('category/SET_SELECTED_CATEGORY_FOR_FILTER', null);

            this.$store.commit('category/SET_PARENT_CATEGORY', null);

          }

          this.checkboxSelectedCategory = [];

        }

        this.loadingPage = false;

      }).catch(() => {

      });
    },

    showPreviousSelectedCategory() {

      let array = [];

      this.$store.commit('category/SET_SELECTED_CATEGORY_FOR_FILTER', this.$store.getters['category/PARENT_CATEGORY']);

      array.push(this.$store.getters['category/PARENT_CATEGORY']['slug']);

      this.pushRoute(array);

    },

    showProductAccordingToPriceRange() {

      this.loadingPriceButton = true;

      this.$store.commit('category/SET_MIN_PRICE_FOR_FILTER', this.range[0]);

      this.$store.commit('category/SET_MAX_PRICE_FOR_FILTER', this.range[1]);

      this.pushRoute(this.$route.query.category);

    },

    showSelectedCategoryProductsFromCheckBox(selected) {

      if (!this.checkIfCategoryHasChildren) {

        this.selectedCategoryNoChildren(selected);


      } else {

        this.selectedCategoryHasChildren(selected);

      }

    },

    selectedCategoryNoChildren(selected) {

      let array = [];

      array.push(selected['slug']);

      if (selected['has_children']) {

        this.$store.commit('category/SET_SELECTED_CATEGORY_FOR_FILTER', selected);

        this.$store.commit('category/SET_PARENT_CATEGORY', selected);

      } else {

        if (this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER']['has_children']) {

          this.$store.commit('category/SET_PARENT_CATEGORY', this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER']);

        }

        this.$store.commit('category/SET_SELECTED_CATEGORY_FOR_FILTER', selected);

      }

      this.pushRoute(array);

    },

    selectedCategoryHasChildren(selected) {

      let array = [];

      let findValue = this.$store.getters['category/SELECTED_CATEGORY_FOR_FILTER'];

      if (findValue.length >= 1) {

        this.$store.commit('category/SET_SELECTED_CATEGORY_FOR_FILTER', selected);

        selected.forEach(value => {

          array.push(value.slug);

        });

      } else {

        this.$store.commit('category/SET_PARENT_CATEGORY', findValue);

        this.$store.commit('category/SET_SELECTED_CATEGORY_FOR_FILTER', selected);

        selected.forEach(value => {

          array.push(value.slug);

        });

      }

      this.pushRoute(array);

    },

    closeStockInfoDialog() {

      this.productStockList = [];

    },

    pushRoute(array) {

      this.$router.push({

        name: 'CategoryFilter',

        query: {

          category: array,

          min_price: this.$store.state.category.categoryFilterationField.min_price,

          max_price: this.$store.state.category.categoryFilterationField.max_price,

          is_taxable: this.$store.state.category.categoryFilterationField.is_taxable,

          c: this.generateRandomUrlPath(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        }

      });

    },

    generateRandomUrlPath(length, chars) {

      let result = ''

      for (let i = length; i > 0; --i) {

        result += chars[Math.floor(Math.random() * chars.length)];

      }

      return result

    },

    bottomVisible() {

      const scrollY = window.scrollY;

      const visible = document.documentElement.clientHeight;

      const pageHeight = document.documentElement.scrollHeight - 450;

      const bottomOfPage = visible + scrollY >= pageHeight;

      return bottomOfPage || pageHeight < visible;

    },

  }

}
</script>

<style scoped>

</style>
