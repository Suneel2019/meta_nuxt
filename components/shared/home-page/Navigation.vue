<template>
  <v-app-bar app height="60">
    <v-row
      no-gutters
      align="center"
      justify="space-between"
    >
      <v-col cols="2" class="text-center">
        <nuxt-link :to="{name: 'index'}">
          <img
            width="120"
            alt="Company Logo"
            class="company_logo mt-1"
            src="~assets/img/shared/logo.png">
        </nuxt-link>
      </v-col>

      <v-col cols="3">

        <v-menu
          tile
          offset-y
          max-width="620"
          max-height="350"
          :close-on-content-click="searchCloseOnContentClick"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              solo
              flat
              dense
              v-on="on"
              hide-details
              v-bind="attrs"
              :loading="searchLoadingState"
              class="search-product-text-field"
              placeholder="Are you looking for something?"
              v-model="searchQuery"
              @input="searchProduct">
            </v-text-field>
          </template>

          <v-card tile class="py-3">
            <v-row no-gutters>
              <v-col cols="12" class="text-center pt-1" v-if="searchedProductsList.length === 0">
                No products found.
              </v-col>

              <v-col
                cols="12"
                no-gutters
                v-for="(product, idx) in searchedProductsList"
                :key="idx"
              >
                <v-card
                  tile
                  flat
                  class="search-product pt-2"
                  :to="{name: 'ProductDetail', params: {slug: product['slug']}}"
                  @click="closeSearchProductMenu"
                >
                  <v-row no-gutters class="px-3">
                    <v-col cols="2">
                      <v-img width="50" :src="product['featured_image']"></v-img>
                    </v-col>
                    <v-col cols="10">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <span v-html="product['product_name']"></span>
                        </v-col>
                        <v-col cols="12" class="caption font-weight-medium">
                          Variants: {{ product['variants_count'] }}
                        </v-col>
                        <v-col cols="12" class="caption font-weight-medium mb-1">
                          {{ product['price'] }}
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col
                cols="12"
                class="view-more-products mt-1"
                v-if="searchedProductsList.length !== 0"
                @click="viewMoreProducts"
              >
                <span>View More</span>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>

      </v-col>

      <v-col v-if="!isUserLoggedIn" cols="3" class="text-center">
        <v-menu offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              small
              outlined
              v-on="on"
              depressed
              v-bind="attrs"
              color="black"
            >
              {{ $t('become_a_partner') }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list dense color="#fafafa">
            <v-list-item dense :to="{ name:'JoinNow' }">
              <v-list-item-title>
                <v-icon size="20" class="mr-2">mdi-account-arrow-right</v-icon>
                <span class="caption">{{ $t('store') }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-col v-else cols="3">
                  <span v-if="!showBalance">
                    {{ $t('active_balance') }} : {{ $t('rupees') }} XXXX
                    <v-btn
                      icon
                      small
                      color="primary"
                      @click="getCurrentBalance"
                    >
                      <v-icon small>mdi-eye-off</v-icon>
                    </v-btn>
                   </span>
        <span v-if="currentBalanceInfo">
                            Active Balance :
                            <span class="font-weight-medium">
                               {{ convertCurrency(currentBalanceInfo['active_balance']) }}
                            </span>
                  <StoreBalanceInformation icon-color="primary"
                                           :balance-info="currentBalanceInfo"></StoreBalanceInformation>
                            <v-icon
                              small
                              class="ml-2"
                              color="primary"
                              @click="hideBalanceInformation"
                            >
                              mdi-eye
                            </v-icon>
                          </span>

      </v-col>

      <v-col v-if="!isUserLoggedIn" cols="2" class="text-end">

        <v-menu offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              small
              outlined
              v-on="on"
              depressed
              width="150"
              v-bind="attrs"
              color="black"
            >
              <v-icon size="16" left>mdi-account</v-icon>
              <span>{{ $t('login') }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list dense color="#fafafa">
            <v-list-item dense :to="{ name:'store-login' }">
              <v-list-item-title>
                <v-icon size="20" class="mr-2">mdi-account-arrow-right</v-icon>
                <span class="caption">{{ $t('store') }} {{ $t('login') }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-col>

      <v-col v-else cols="2" class="text-end">

        <v-menu offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              small
              outlined
              depressed
              v-on="on"
              v-bind="attrs"
              color="primary"
              class="logged_in_user_button_list"
            >
              <v-icon size="18" color="darkBlue" class="mr-1">
                mdi-account-circle
              </v-icon>
              <span>{{ loggedInUserName | truncate(18) }}</span>
              <v-icon size="20" color="white" class="dropdown_list ml-1">
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>

          <v-list dense color="#f7f7f7">
            <v-list-item dense @click="goToStoreDashboard">
              <v-list-item-title>
                <v-icon size="18" class="mr-2">mdi-view-dashboard</v-icon>
                <span class="caption">{{ $t('go_to_dashboard') }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="logoutUser">
              <v-list-item-title>
                <v-icon size="20" class="mr-2">mdi-logout</v-icon>
                <span class="caption">{{ $t('logout') }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-col>

      <v-col v-if="isUserLoggedIn" cols="1" class="text-center">
        <v-btn icon :to="{ name: 'CartProducts' }" class="mr-3">
          <v-badge top overlap color="darkOrange" offset-x="1">
            <template v-slot:badge>
              <span>{{ totalCartItems }}</span>
            </template>
            <v-icon size="24" color="darkBlue">mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </v-col>

      <v-col cols="1" class="text-center">
      <span
        class="caption language"
        v-for="el in locales"
        :key="el.code"
        :class="{ active: (el.code === locale) }"
        @click="switchLanguage(el.code)"
      >
        <span>{{ el.name }} | </span>
      </span>
      </v-col>

    </v-row>
  </v-app-bar>
</template>

<script>
import Logout from "@/helpers/shared/logout";
import dataFormatter from "@/helpers/shared/dataFormatter";
import StoreBalanceInformation from "@/components/shared/home-page/StoreBalanceInformation";
import wallet from "@/store/store/wallet";

export default {

  name: "Navigation",

  components: {StoreBalanceInformation},

  data() {

    return {

      showBalance: false,
      currentBalanceInfo: null,
      searchCloseOnContentClick: false,
      searchLoadingState: false,
      searchQuery: '',
      searchedProductsList: [],

    }

  },

  created() {

    this.$store.registerModule('wallet', wallet);

  },

  watch: {

    '$route': {

      handler() {

        if ('name' in this.$route.query) {

          this.searchQuery = this.$route.query.name;

          this.searchProduct(this.searchQuery);

        }

      },

      immediate: true,
    },
  },

  beforeRouteLeave(to, from, next) {

    this.$store.unregisterModule('wallet');

    next();
  },

  computed: {

    locales() {

      return this.$store.state.locale.locales;

    },

    totalCartItems() {

      return this.$store.getters['cart/GET_CARTS_COUNT'];

    },

    locale() {

      return this.$store.state.locale.locale;

    },

    isUserLoggedIn() {

      return this.$store.getters['login/ISLOGINED'];

    },

    loggedInUserName() {

      return this.$store.getters['login/USERCRED']['name'];

    }

  },

  methods: {

    switchLanguage(localeCode) {

      document.cookie = `locale=${localeCode}`;

      this.$store.commit("locale/SET_LANG", localeCode);

      location.reload();

    },

    goToStoreDashboard() {

      this.$store.dispatch("dashboard/getStoreDashboardInfo").then(() => {

        this.$router.push({

          name: "store-dashboard-info"

        })

      });

      console.log('go to redirect page');

    },

    getCurrentBalance() {

      this.$store.dispatch('wallet/getCurrentUserWalletDetail').then(res => {

        if (res.length) {

          console.log('array');

          this.currentBalanceInfo = res[0];

        } else {

          console.log('object');

          this.currentBalanceInfo = res;

        }

        console.log(this.currentBalanceInfo, 'balance info');

        console.log(this.currentBalanceInfo, 'balance info');

        this.showBalance = true;

      });

    },

    logoutUser() {

      let context = this;

      Logout(context);

    },

    searchProduct(val) {

      const query = val.trim();

      if (query !== '') {

        this.searchLoadingState = true;

        this.$store.dispatch('category/searchResultProduct', query).then(res => {

          this.searchLoadingState = false;

          console.log(res, 'response');

          this.searchedProductsList = res.data.map(product => {

            const productName = this.makeSearchedKeywordBold(product, query);

            product['product_name'] = productName.join("");

            return product;

          });

        });

      } else {

        this.searchedProductsList = [];
      }
    },

    makeSearchedKeywordBold({product_name: productName}, keyword) {

      return productName.split().map(letter => {

        letter = letter.toLowerCase().replace(keyword.toLowerCase(), `<b>${keyword}</b>`);

        return letter;

      });

    },

    hideBalanceInformation() {

      this.showBalance = false;

      this.currentBalanceInfo = null;

    },

    convertCurrency(currency) {

      return dataFormatter.formatCurrency(currency);

    },

    closeSearchProductMenu() {

      this.searchCloseOnContentClick = true;

      setTimeout(() => {

        this.searchCloseOnContentClick = false;

      }, 500);
    },

    viewMoreProducts() {

      this.$router.push({

        name: "SearchProduct",

        query: {

          name: this.searchQuery,

        }

      });

      this.closeSearchProductMenu();
    },

  }

}
</script>

<style lang="scss" scoped>

.language {
  cursor: pointer;
}

.language.active {
  text-decoration: underline;
}

.language:hover span {
  text-decoration: underline;
}

.search-product-text-field {
  border-radius: 0;
  font-size: 0.875rem;
  border: 1px solid #dfdfdf;
}

.search-product {
  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
}

.view-more-products {
  text-align: center;
  font-size: 0.75rem;

  span {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
