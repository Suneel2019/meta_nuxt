<template>
  <div v-if="allCategories.length>0" class="pa-2 pb-0">
    <v-row no-gutters>
      <v-col cols="1" class="text-center" v-for="(category,index) in allCategories" :key="index">
        <v-avatar @click="saveMainCategory(category)" class="pointer-on-hover" size="50"
                  style="border:1px solid #e5e5e5;">
          <img :src="category['category_image']">
        </v-avatar>
        <div class="font-weight-medium pointer-on-hover text-center caption mt-0 ml-2"> {{ category['category_name'] }}
          <span v-if="category['has_children']">
            <v-menu offset-y nudge-top="0" nudge-right="-40">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          :ripple="false"
          v-on="on"
        >
           <v-icon class="pointer-on-hover" size="20">mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          dense
          class="category-dropdown-menu"
          v-for="(secondCategory, index) in category['children']"
          :key="index"
          @click="saveSecondLevelCategory(secondCategory,category)"
        >
          <v-list-item-title>{{ secondCategory['category_name'] }}
            <span v-if="secondCategory['has_children']"></span>
          </v-list-item-title>
           <v-list-item-action>
             <span class="pointer-on-hover" v-if="secondCategory['has_children']">
                <v-menu offset-y nudge-top="85" nudge-right="45">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          :ripple="false"
          v-on="on"
        >
           <v-icon class="pointer-on-hover" size="20">mdi-menu-right</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          dense
          class="category-dropdown-menu"
          v-for="(thirdCategory, index) in secondCategory['children']"
          :key="index"
          @click="saveSelectedLevelThreeCategory(thirdCategory,secondCategory)"
        >
          <v-list-item-title>{{ thirdCategory['category_name'] }}</v-list-item-title>
          <v-list-item-action>
             <span class="pointer-on-hover" v-if="thirdCategory['has_children']">
                <v-menu offset-y nudge-top="45" nudge-right="47">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          :ripple="false"
          v-on="on"
        >
           <v-icon class="pointer-on-hover" size="20">mdi-menu-right</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          dense
          class="category-dropdown-menu"
          v-for="(fourthCategory, index) in thirdCategory['children']"
          :key="index"
          @click="saveSelectedLevelFourCategory(fourthCategory,thirdCategory)"
        >
          <v-list-item-title>{{ fourthCategory['category_name'] }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
             </span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
             </span>
            </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
          </span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

  name: "category-section",

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

<style scoped>

</style>
