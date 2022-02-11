<template>
  <v-container fluid>
    <v-container fluid py-16>
      <v-row no-gutters justify="space-around" class="body-2">
        <v-col cols="8" class=" mb-3">
          <v-alert
            border="left"
            colored-border
            color="darkBlue accent-4"
            elevation="2">
            <v-card outlined class="pb-3">
              <v-row no-gutters>
                <v-col cols="12" class="text-center mt-5 pb-1">
                  <v-row no-gutters>
                    <v-col cols="12" class=" font-weight-medium py-2">
                      You have selected <span
                      class="subtitle-1 text-decoration-underline font-weight-bold darkBlue--text">{{
                        selectedPackageType.package_name
                      }}</span>
                      package
                    </v-col>
                    <v-col cols="12">
                      Registration Fee: <span
                      class="font-weight-bold">{{ (selectedPackageType.non_refundable_registration_charge) }}</span>
                    </v-col>
                    <v-col cols="12">
                      Base investment: <span class="font-weight-bold">{{ (selectedPackageType.base_investment) }}</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-alert>
        </v-col>
        <v-col cols="8" v-if="loadingPageState">
          <v-card outlined class="pb-3">
            <v-row no-gutters>
              <v-col cols="12" class="category_title font-weight-medium py-2">
                Welcome to Store Registration
              </v-col>

              <v-col cols="12" class="text-center mt-5 pb-1">
                <v-row no-gutters>
                  <v-col cols="12">
                    Already have a store?
                  </v-col>

                  <v-col cols="12" class="mt-4">
                    <v-btn
                      tile
                      small
                      color="primary"
                      @click="changeView(1)"
                    >
                      Yes, I have
                    </v-btn>

                    <v-btn
                      tile
                      small
                      color="success"
                      class="ml-3"
                      @click="changeView(2)"
                    >
                      No, I don't
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="8" v-else>
          <v-row no-gutters>
            <AlreadyHaveStore :selectedPackage="selectedPackage" v-if="alreadyHaveStoreState"/>
            <CreateNewStore :selectedPackage="selectedPackage" v-else/>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import storeRegistration from "@/store/store/registration";
import dataFormatter from "@/helpers/shared/dataFormatter";

export default {

  name: "StoreRegistration",
  components: {
    CreateNewStore: () => import('@/components/store/registration/CreateNewStore'),
    AlreadyHaveStore: () => import('@/components/store/registration/AlreadyHaveStore')
  },
  data() {

    return {
      loadingPageState: true,
      alreadyHaveStoreState: false,
      selectedPackage: null,
    }

  },

  created() {

    this.$store.registerModule("registration", storeRegistration);

    this.selectedPackage = {

      store_type_code: this.$route.params['id'],

      store_type_package_history_code: this.$route.params['type']

    }

  },

  beforeRouteLeave(to, from, next) {

    this.$store.unregisterModule('registration');

    next();

  },

  computed: {

    selectedPackageType() {

      return this.$store.getters["registration/GET_SELECTED_PACKAGE_TYPE"]

    }

  },

  methods: {

    changeView(type) {

      this.alreadyHaveStoreState = type === 1;

      console.log(this.alreadyHaveStoreState, 'already have store?');

      this.loadingPageState = false;

    },

    formatCurrency(amount) {

      return dataFormatter.formatCurrency(amount);

    },

  }

}
</script>

<style scoped>

</style>
