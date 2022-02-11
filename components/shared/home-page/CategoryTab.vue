<template>
  <v-container fluid class="pa-0 primary">
    <v-row no-gutters>
      <v-col v-if="allCategories.length>0" cols="12">
        <v-slide-group class="category-menu">
          <v-slide-item v-for="(firstCategory, i) in allCategories" :key="i">
            <v-menu
              offset-y
              min-width="100%"
              max-height="450"
              :open-on-hover="navMenuOpenOnHoverState"
              :close-on-content-click="closeNavMenuOnContentClick"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-card
                  dark
                  tile
                  color="primary"
                  v-on="on"
                  v-bind="attrs"
                  elevation="0"
                  class="nav_menu_card body-2"
                >
                  <div class="text-uppercase font-weight-medium px-5" @click="saveMainCategory(firstCategory)">
                    {{ firstCategory['category_name'] }}
                  </div>
                </v-card>
              </template>

              <v-card tile>
                <v-row no-gutters>
                  <v-col cols="3" xl="2" v-for="(secondCategory, j) in firstCategory['children']" :key="j">
                    <v-list dense>
                      <v-list-item @click="saveSecondLevelCategory(secondCategory, firstCategory);">
                        <v-list-item-title class="subtitle-1 py-2">
                          <!-- Grocery -->
                          {{ secondCategory['category_name'] }}
                        </v-list-item-title>
                      </v-list-item>

                      <div v-for="(thirdCategory, k) in secondCategory['children']" :key="k">
                        <!-- Local Grocery -->
                        <v-list-group v-if="thirdCategory['has_children']">
                          <template v-slot:activator>
                            <v-list-item-content
                              @click="saveSelectedLevelThreeCategory(thirdCategory, secondCategory)">
                              <v-list-item-title class="caption font-weight-medium">
                                {{ thirdCategory['category_name'] }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </template>

                          <template v-slot:appendIcon>
                            <v-icon @click="closeNavMenuOnContentClick = false">mdi-chevron-down</v-icon>
                          </template>

                          <v-list-item
                            v-for="(fourthCategory, l) in thirdCategory['children']"
                            :key="l"
                            @click="saveSelectedLevelFourCategory(fourthCategory, thirdCategory)"
                          >
                            <v-list-item-content>
                              <v-list-item-title style="font-size: 12px;">
                                <v-icon small class="mr-2">mdi-circle-medium</v-icon>
                                <!-- Chocalate -->
                                {{ fourthCategory['category_name'] }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-group>

                        <v-list-item
                          class="caption font-weight-medium"
                          @click="saveSelectedLevelThreeCategory(thirdCategory, secondCategory)"
                          v-else
                        >
                          <!-- Cooking oil and ghee-->
                          {{ thirdCategory['category_name'] }}
                        </v-list-item>
                      </div>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card>
            </v-menu>

          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {

  name: "CategoryTab",

  data() {

    return {

      navMenuOpenOnHoverState: true,
      closeNavMenuOnContentClick: true,

    }

  },

  computed: {

    allCategories() {

      return this.$store.getters["category/GET_ALL_CATEGORIES"];

    }

  },

  methods: {

    saveMainCategory(selected) {

      this.$store.commit('category/SET_MIN_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_MAX_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_IS_TAXABLE_FOR_FILTER', '');

      this.$store.commit('category/SET_PAGE_FOR_FILTER', 0);

      this.navMenuOpenOnHoverState = false;

      setTimeout(() => {

        this.navMenuOpenOnHoverState = true;

      }, 1000);

      let cat_selected = [selected['category_name']];

      this.$store.commit("category/SET_SELECTED_CATEGORY_FOR_FILTER", selected);

      this.$store.commit("category/SET_CATEGORY_FROM_CHECKBOX", false);

      this.$store.commit("category/CHECK_FOR_MULTIPLE_CHECKBOX", false);

      this.$store.commit('category/SET_CAT_SELECTED_FOR_FILTER', cat_selected);

      let array = [];

      array.push(selected.slug);

      this.$router.push({

        name: 'CategoryFilter',

        query: {

          category: array,

          c: this.generateRandomUrlPath(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        }

      })

    },

    saveSecondLevelCategory(selected, mainCategory) {

      this.$store.commit('category/SET_MIN_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_MAX_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_IS_TAXABLE_FOR_FILTER', '');

      this.$store.commit('category/SET_PAGE_FOR_FILTER', 0);

      this.closeNavMenuOnContentClick = true;

      let cat_selected = [selected['category_name']];

      this.$store.commit("category/SET_SELECTED_CATEGORY_FOR_FILTER", selected)

      this.$store.commit("category/SET_PARENT_CATEGORY", mainCategory)

      this.$store.commit("category/SET_CATEGORY_FROM_CHECKBOX", false)

      this.$store.commit("category/CHECK_FOR_MULTIPLE_CHECKBOX", false)

      this.$store.commit('category/SET_CAT_SELECTED_FOR_FILTER', cat_selected);

      let array = [];

      array.push(selected.slug);

      this.$router.push({

        name: 'CategoryFilter',

        query: {

          category: array,

          c: this.generateRandomUrlPath(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        }

      })

    },

    saveSelectedLevelThreeCategory(selected, subCategory) {

      this.$store.commit('category/SET_MIN_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_MAX_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_IS_TAXABLE_FOR_FILTER', '');

      this.$store.commit('category/SET_PAGE_FOR_FILTER', 0);

      this.closeNavMenuOnContentClick = true;

      let cat_selected = [selected['category_name']];

      this.$store.commit("category/SET_SELECTED_CATEGORY_FOR_FILTER", selected)

      this.$store.commit("category/SET_PARENT_CATEGORY", subCategory)

      this.$store.commit("category/SET_CATEGORY_FROM_CHECKBOX", false)

      this.$store.commit("category/CHECK_FOR_MULTIPLE_CHECKBOX", false);

      this.$store.commit('category/SET_CAT_SELECTED_FOR_FILTER', cat_selected);

      let array = [];

      array.push(selected.slug);

      this.$router.push({

        name: 'CategoryFilter',

        query: {

          category: array,

          c: this.generateRandomUrlPath(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        }

      })

    },

    saveSelectedLevelFourCategory(selected, subCategory) {

      this.$store.commit('category/SET_MIN_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_MAX_PRICE_FOR_FILTER', '');

      this.$store.commit('category/SET_IS_TAXABLE_FOR_FILTER', '');

      this.$store.commit('category/SET_PAGE_FOR_FILTER', 0);

      this.closeNavMenuOnContentClick = true;

      let cat_selected = [selected['category_name']];

      let multipleSelect = [];

      multipleSelect.push(selected);

      this.$store.commit("category/SET_SELECTED_CATEGORY_FOR_FILTER", multipleSelect)

      this.$store.commit("category/SET_PARENT_CATEGORY", subCategory)

      this.$store.commit("category/SET_CATEGORY_FROM_CHECKBOX", true)

      this.$store.commit("category/CHECK_FOR_MULTIPLE_CHECKBOX", true);

      this.$store.commit('category/SET_CAT_SELECTED_FOR_FILTER', cat_selected);

      let array = [];

      array.push(selected.slug);

      this.$router.push({

        name: 'CategoryFilter',

        query: {

          category: array,

          c: this.generateRandomUrlPath(10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

        }

      })

    },

    generateRandomUrlPath(length) {

      let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

      let result = ''

      for (let i = length; i > 0; --i) {

        result += chars[Math.floor(Math.random() * chars.length)]

      }

      return result

    },

  }

}
</script>

<style lang="scss" scoped>
.category-menu {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background-color: #003574;
}

.nav_menu_card {
  &:hover {
    color: white;
    cursor: pointer;
    background-color: #FF5C00 !important;
  }
}
</style>
