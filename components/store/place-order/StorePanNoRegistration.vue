<template>
  <v-card tile elevation="2" class="pt-0 lightbackground">
    <v-row no-gutters>
      <v-col cols="12" class="text-center bg-dark-blue">
        <h3 class="white--text pa-2">
          Please Enter following information for place order.
        </h3>
      </v-col>
    </v-row>
    <ErrorHandling422 v-if="is422Error"></ErrorHandling422>
    <v-row no-gutters>
      <v-col cols="12">
        <v-form ref="formSubmit">
          <v-col cols="6" class="pa-2">
            <v-row no-gutters>
              <v-col cols="3" class="font-weight-bold">Store Name:</v-col>
              <v-col cols="9">
                <v-text-field solo dense class="simple_text_field" placeholder="Enter Store Name" v-model="storeName"
                              :rules="storeNameRule"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" class="pa-2">
            <v-row no-gutters>
              <v-col cols="3" class="font-weight-bold">
                PAN/VAT Type:
              </v-col>
              <v-col cols="9">
                <v-autocomplete
                  solo
                  flat
                  dense
                  return-object
                  item-text="type"
                  placeholder="PAN/VAT Type"
                  class="auto_complete_with_append_inner_icon"
                  :items="panOrVATTypeList"
                  v-model="selectedPANOrVATType">
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" class="pa-2">
            <v-row no-gutters>
              <v-col cols="3" class="font-weight-bold">PAN/VAT No:</v-col>
              <v-col cols="9">
                <v-text-field solo dense class="simple_text_field" placeholder="Enter Pan/Vat No" v-model="panOrVatNo"
                              :rules="panOrVatNoRule"></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="text-center">
            <v-btn @click="submitStoreDetails()" :loading="loading" tile color="darkOrange" class="white--text">Submit
            </v-btn>
            <v-btn @click="closeDialog" tile color="darkBlue" class="white--text ml-2">Close</v-btn>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: 'StorePanNoRegistration',

  components: {

    ErrorHandling422: () => import("@/components/shared/ErrorHandling422")

  },

  data() {

    return {

      // declare for submit loading state
      loading: false,

      // selected pan or vat type store
      selectedPANOrVATType: '',

      // show list on input select
      panOrVATTypeList: ['PAN', 'VAT'],

      // Entered Store Name store
      storeName: '',

      // storeName field validation
      storeNameRule: [
        v => !!v || 'Store name is required.'
      ],

      // Entered pan or vat number store
      panOrVatNo: '',

      // Pan or vat number field validation
      panOrVatNoRule: [
        v => !!v || 'PAN/VAT No is required.'
      ],
      errorMessage: [],
    }

  },

  computed: {

    is422Error() {

      return this.$store.getters['error/IS422Error'];

    }

  },

  methods: {

    closeDialog() {

      this.$refs.formSubmit.reset()

      this.$emit('closeDialog', false);

    },

    submitStoreDetails() {

      if (this.$refs.formSubmit.validate()) {

        this.loading = true;

        let formData = {

          store_name: this.storeName,

          pan_vat_type: this.selectedPANOrVATType,

          pan_vat_no: this.panOrVatNo

        }

        this.$store.dispatch('userStore/updateStoreDetailsFromPlaceOrder', formData).then(res => {

          this.loading = false;

          this.closeDialog();

          this.errorMessage = [];

          this.$store.commit('login/SET_IS_BILLABLE', 1);

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: res.data.message,

            color: 'success'

          })

        }).catch(e => {

          errorHandler(e, this);

          this.loading = false;

        });

      }

    },

  }

}
</script>

<style scoped lang="scss">
.lightbackground {
  background-color: #E1E5E7;
}

.bg-dark-blue {
  background-color: #003574;
}
</style>
