<template>
  <v-container fluid>
    <Loading v-if="loadingState"></Loading>
    <v-row no-gutters v-else>
      <v-col v-if="storeTypeList.length>0">
        <v-card class="pb-8">
          <v-row no-gutters>

            <v-col cols="2" class="mt-2 px-3">
              <v-card class="pa-3">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    class="my-1"
                    v-for="(item, index) in storeTypeList"
                    :key="index"
                  >
                    <v-row no-gutters align="center">
                      <v-col cols="2">
                        <v-checkbox
                          dense
                          hide-details
                          class="mt-0 pt-0"
                          :value="index"
                          v-model="selectedPackageIndex"
                          @change="changeCheckboxList(index, item)">
                        </v-checkbox>
                      </v-col>

                      <v-col cols="9" class="font-weight-medium">
                        {{ item['store_type_name'] }}
                      </v-col>
                    </v-row>
                    <v-divider class="mt-2"></v-divider>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>


            <v-col cols="10" class="mt-2">
              <Loading v-if="packageLoadingState"></Loading>

              <v-row no-gutters justify="center" v-else>
                <v-col cols="12" class="d-flex justify-center" v-if="isSelectedPackageEmpty">
                  <v-alert
                    text
                    dense
                    type="info"
                    color="primary"
                    class="body-2 mb-0"
                  >
                    Package coming soon for {{ packageName }}.
                  </v-alert>
                </v-col>

                <v-col cols="12" v-if="packageTypeList.length >0">
                  <v-row no-gutters justify="center">
                    <v-col cols="11">
                      <v-card>
                        <v-row no-gutters justify="space-around">
                          <v-col cols="12" class="header_title font-weight-medium py-2 px-3">
                            {{ packageName }} Packages
                          </v-col>

                          <v-col cols="12" class="pa-3">
                            <v-row no-gutters>
                              <v-col
                                cols="4"
                                class="pa-2"
                                v-for="(item, index) in packageTypeList"
                                :key="index"
                              >
                                <v-card elevation="4">
                                  <v-row no-gutters style="background-color: #F0F4F6;">
                                    <v-col cols="12"
                                           class="headline font-weight-bold text-uppercase text-center px-2 pt-10 pb-2"
                                    >
                                      {{ item['package_name'] }}
                                    </v-col>

                                    <v-col cols="12" class="text-center">
                                      <span class="font-weight-bold">
                                        {{ formatCurrency(item['annual_purchasing_limit']) }}
                                      </span> / yearly

                                      <v-tooltip right color="black">
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-icon
                                            small
                                            v-on="on"
                                            v-bind="attrs"
                                            color="primary"
                                          >
                                            mdi-information
                                          </v-icon>
                                        </template>
                                        Annual Purchasing Limit
                                      </v-tooltip>

                                      <div class="caption mt-4">
                                        <u class="learn-more" @click="openDialog(item)">
                                          Learn More
                                        </u>
                                      </div>

                                      <v-divider class="mt-5 mx-2"></v-divider>
                                    </v-col>

                                    <v-col cols="12" class="px-2 pt-5">
                                      <v-row no-gutters>
                                        <v-col cols="12">
                                          <v-row no-gutters>
                                            <v-col cols="6" align-self="center">Registration Charge</v-col>
                                            <v-col
                                              cols="6"
                                              class="font-weight-bold"
                                              v-if="item['non_refundable_registration_charge'] !== 0"
                                            >
                                              {{ formatCurrency(item['non_refundable_registration_charge']) }}
                                            </v-col>
                                            <v-col cols="6" v-else>
                                              <v-chip small color="warning">Free</v-chip>
                                            </v-col>
                                          </v-row>
                                        </v-col>

                                        <v-col cols="12" class="mt-3">
                                          <v-row no-gutters>
                                            <v-col cols="6" align-self="center">Refundable Charge</v-col>
                                            <v-col
                                              cols="6"
                                              class="font-weight-bold"
                                              v-if="item['refundable_registration_charge'] !== 0"
                                            >
                                              {{ formatCurrency(item['refundable_registration_charge']) }}
                                            </v-col>
                                            <v-col cols="6" v-else>
                                              <v-chip small color="warning">Free</v-chip>
                                            </v-col>
                                          </v-row>
                                        </v-col>

                                        <v-col cols="12" class="mt-3">
                                          <v-row no-gutters>
                                            <v-col cols="6" align-self="center">Base Investment</v-col>
                                            <v-col
                                              cols="6"
                                              class="font-weight-bold"
                                              v-if="item['base_investment'] !== 0"
                                            >
                                              {{ formatCurrency(item['base_investment']) }}
                                            </v-col>
                                            <v-col cols="6" v-else>
                                              <v-chip small color="warning">Free</v-chip>
                                            </v-col>
                                          </v-row>
                                        </v-col>

                                        <v-col cols="12" class="mt-8 mb-3">
                                          <v-btn
                                            small
                                            block
                                            rounded
                                            outlined
                                            height="36"
                                            color="primary"
                                            class="register-now-btn"
                                            @click="packageRegister(item)"
                                          >
                                            Register
                                          </v-btn>
                                        </v-col>
                                      </v-row>
                                    </v-col>
                                  </v-row>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col v-else>
        No any Store Types
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import storeRegistration from "@/store/store/registration";
import errorHandler from "@/helpers/shared/errorHandler";
import Loading from "@/components/shared/Loading";
import dataFormatter from "@/helpers/shared/dataFormatter";

export default {

  name: "join-now",

  components: {Loading},

  data() {

    return {

      loadingState: true,
      storeTypeList: [],
      selectedPackageIndex: [0],
      packageLoadingState: false,
      isSelectedPackageEmpty: false,
      packageName: null,
      packageTypeList: [],

    }

  },

  created() {

    this.$store.registerModule("registration", storeRegistration);

    this.getStoreOptionForRegistration();

  },

  beforeRouteLeave(to, from, next) {

    this.$store.unregisterModule('registration');

    next();
  },

  head: {

    title: 'Store Registration'

  },

  methods: {

    getStoreOptionForRegistration() {

      this.$store.dispatch("registration/getStoreType").then(response => {

        console.log(response, 'response');

        this.storeTypeList = response;

        this.loadingState = false;

      }).catch(e => {

        errorHandler(e, this);

        this.loadingState = false;

      })

    },

    changeCheckboxList(index, item) {

      this.selectedPackageIndex = [];

      this.selectedPackageIndex.push(index);

      this.getPackageDetail(item);

    },

    getPackageDetail({store_type_name, store_type_code}) {

      this.isSelectedPackageEmpty = false;

      this.packageLoadingState = true;

      this.packageName = store_type_name;

      this.packageTypeList = [];

      this.$store.dispatch('registration/getStorePackageTypes', store_type_code).then(response => {

        console.log(response, 'response');

        if (response.length > 0) {

          this.packageTypeList = response;

          this.packageTypeList.map(packageType => {

            packageType.view_more = false;

            return packageType;

          });

        } else {

          this.isSelectedPackageEmpty = true;

        }

      }).catch(() => {

        this.isSelectedPackageEmpty = true;

      }).finally(() => {

        this.packageLoadingState = false;

      });

    },

    formatCurrency(amount) {

      return dataFormatter.formatCurrency(amount);

    },

    packageRegister(item) {

      console.log(item, 'item');

      this.$store.commit('registration/PACKAGE_TYPE_SELECTION', item)

      this.$router.push({

        name: 'StoreRegistration',

        params: {

          id: item['store_type_code'],

          type: item['store_type_package_history_code']

        }

      })

    }

  }

}
</script>

<style scoped>

</style>
