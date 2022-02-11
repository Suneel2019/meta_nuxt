<template>
  <v-container fluid>
    <v-col cols="12" class="body-2">
      <ErrorHandling422 v-if="isError422"></ErrorHandling422>
      <v-stepper v-model="stepper">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="stepper > 1">Store Details</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="stepper > 2">Location Details</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="stepper > 3">Personal Details</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form ref="store_details_form">
              <v-card flat>
                <v-row no-gutters justify="space-between">
                  <v-col cols="12" class="mb-2">
                    Fields with (<span class="red--text">*</span>) is a required field.
                  </v-col>

                  <v-col cols="5">
                    Store Name: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      placeholder="Store Name"
                      class="simple_text_field mt-1"
                      v-model="storeName"
                      :rules="storeNameRule"
                      :error-messages="serverValidationErrors['store_name']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Store Owner: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      placeholder="Store Owner"
                      class="simple_text_field mt-1"
                      v-model="storeOwner"
                      :rules="storeOwnerRule"
                      :error-messages="serverValidationErrors['store_owner']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Store Logo:
                    <v-file-input
                      solo
                      flat
                      dense
                      small-chips
                      prepend-icon=""
                      truncate-length="15"
                      accept=".jpg,.jpeg,.png"
                      class="file_input mt-1"
                      placeholder="Store Logo"
                      prepend-inner-icon="mdi-cloud-upload"
                      v-model="selectedStoreLogo"
                      :error-messages="serverValidationErrors['store_logo']">
                    </v-file-input>
                  </v-col>

                  <v-col cols="5">
                    PAN/VAT Type:
                    <v-autocomplete
                      solo
                      flat
                      dense
                      return-object
                      item-text="type"
                      placeholder="PAN/VAT Type"
                      class="auto_complete_with_append_inner_icon mt-1"
                      :items="panOrVATTypeList"
                      v-model="selectedPANOrVATType"
                      :error-messages="serverValidationErrors['pan_vat_type']">
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="5">
                    PAN/VAT No:
                    <v-text-field
                      solo
                      flat
                      dense
                      placeholder="PAN/VAT No."
                      class="simple_text_field mt-1"
                      v-model="panOrVATNo"
                      :error-messages="serverValidationErrors['pan_vat_no']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-3 text-end">
                    <v-btn
                      tile
                      small
                      color="primary"
                      @click="goToStepTwo"
                    >
                      Continue
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>

        <v-stepper-items>
          <v-stepper-content step="2">
            <v-card>
              <v-form ref="location_details_form">
                <v-row no-gutters justify="space-between">
                  <v-col cols="12" class="mb-3">
                    <v-alert type="info" text dense color="error" class="caption">
                      Fill this section based on your current store location or where you want to open your new store.
                    </v-alert>

                    <div>
                      Fields with (<span class="red--text">*</span>) is a required field.
                    </div>
                  </v-col>

                  <v-col cols="5">
                    Province: <span class="red--text">*</span>
                    <v-select
                      solo
                      flat
                      dense
                      return-object
                      placeholder="Province"
                      item-text="location_name"
                      class="auto_complete_with_append_inner_icon mt-1"
                      :items="provinceList"
                      v-model="selectedProvince"
                      :rules="provinceRule"
                      @input="showDistrictsOfSelectedProvince">
                    </v-select>
                  </v-col>

                  <v-col cols="5">
                    District: <span class="red--text">*</span>
                    <v-select
                      solo
                      flat
                      dense
                      return-object
                      placeholder="District"
                      item-text="location_name"
                      class="auto_complete_with_append_inner_icon mt-1"
                      :items="districtList"
                      v-model="selectedDistrict"
                      :rules="districtRule"
                      @input="showMunicipalitiesOfSelectedDistrict">
                    </v-select>
                  </v-col>

                  <v-col cols="5">
                    Municipality: <span class="red--text">*</span>
                    <v-autocomplete
                      solo
                      flat
                      dense
                      return-object
                      item-text="location_name"
                      placeholder="Municipality"
                      class="auto_complete_with_append_inner_icon mt-1"
                      :items="municipalityList"
                      v-model="selectedMunicipality"
                      :rules="municipalityRule"
                      @input="showWardsOfSelectedMunicipality">
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="5">
                    Ward: <span class="red--text">*</span>
                    <v-autocomplete
                      solo
                      dense
                      return-object
                      placeholder="Ward"
                      item-text="location_name"
                      class="auto_complete_with_append_inner_icon mt-1"
                      :items="wardList"
                      :rules="wardRule"
                      v-model="selectedWard"
                      :error-messages="serverValidationErrors['store_location_code']">
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="12" class="mt-2 text-end">
                    <v-btn
                      tile
                      small
                      color="success"
                      @click="goBackStepOne"
                    >
                      Back
                    </v-btn>
                    <v-btn
                      tile
                      small
                      class="ml-2"
                      color="primary"
                      @click="goToStepThree"
                    >
                      Continue
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>

        <v-stepper-items>
          <v-stepper-content step="3">
            <v-card>
              <v-form ref="personal_details_form">
                <v-row no-gutters justify="space-between">
                  <v-col cols="12" class="mb-2">
                    Fields with (<span class="red--text">*</span>) is a required field.
                  </v-col>

                  <v-col cols="5">
                    Name: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      placeholder="Name"
                      class="simple_text_field mt-1"
                      v-model="personalDetails.name"
                      :rules="nameRule"
                      :error-messages="serverValidationErrors['name']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Email: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      placeholder="Email"
                      class="simple_text_field mt-1"
                      v-model="personalDetails.login_email"
                      :rules="emailRules"
                      :error-messages="serverValidationErrors['login_email']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Phone Number: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      class="simple_text_field mt-1"
                      placeholder="Phone Number"
                      v-model="personalDetails.login_phone"
                      :rules="mobileRules"
                      :error-messages="serverValidationErrors['login_phone']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Contact Landline:
                    <v-text-field
                      solo
                      flat
                      dense
                      class="simple_text_field mt-1"
                      placeholder="Contact Landline"
                      v-model="personalDetails.landline_number"
                      :error-messages="serverValidationErrors['store_contact_phone']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Password: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      type="password"
                      placeholder="Password"
                      class="simple_text_field mt-1"
                      v-model="personalDetails.password"
                      :rules="passwordRule"
                      :error-messages="serverValidationErrors['password']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Confirm Password: <span class="red--text">*</span>
                    <v-text-field
                      solo
                      flat
                      dense
                      type="password"
                      class="simple_text_field mt-1"
                      placeholder="Confirm Password"
                      v-model="personalDetails.c_password"
                      :rules="confirmedPasswordRule"
                      :error-messages="serverValidationErrors['c_password']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="5">
                    Referral Code:

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          dark
                          small
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-help-circle
                        </v-icon>
                      </template>
                      <span>Use Referral Code of your Manager</span>
                    </v-tooltip>

                    <v-text-field
                      solo
                      flat
                      dense
                      placeholder="Referral Code"
                      class="simple_text_field mt-1"
                      v-model="referralCode"
                      :error-messages="serverValidationErrors['referred_by']">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-3 text-end">
                    <v-btn
                      tile
                      small
                      color="success"
                      @click="goBackStepTwo"
                    >
                      Back
                    </v-btn>
                    <v-btn
                      tile
                      small
                      class="ml-2"
                      color="primary"
                      :loading="submitFormLoading"
                      @click="submitForm"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-container>
</template>

<script>
import LocationService from "@/services/shared/location";
import errorHandler from "@/helpers/shared/errorHandler";
import ErrorHandling422 from "@/components/shared/ErrorHandling422";

export default {

  name: "AlreadyHaveStore",
  components: {ErrorHandling422},
  props: ['selectedPackage'],

  data() {

    return {
      stepper: 1,
      storeName: '',
      storeNameRule: [
        v => !!v || 'Store name is required.'
      ],
      storeOwner: '',
      storeOwnerRule: [
        v => !!v || 'Store owner is required.'
      ],
      selectedStoreLogo: [],
      panOrVATTypeList: [
        {
          id: 'pan',
          type: 'PAN'
        },
        {
          id: 'vat',
          type: 'VAT'
        }
      ],
      selectedPANOrVATType: '',
      panOrVATNo: '',
      provinceList: [],
      selectedProvince: '',
      provinceRule: [
        v => !!v || 'Province is required.'
      ],
      districtList: [],
      selectedDistrict: '',
      districtRule: [
        v => !!v || 'District is required.'
      ],
      municipalityList: [],
      selectedMunicipality: '',
      municipalityRule: [
        v => !!v || 'Municipality is required.'
      ],
      wardList: [],
      selectedWard: '',
      wardRule: [
        v => !!v || 'Ward is required.'
      ],
      personalDetails: {
        name: '',
        login_email: '',
        mobile_number: '',
        landline_number: '',
        login_phone: '',
        password: '',
        c_password: '',
      },
      referralCode: '',
      nameRule: [
        v => !!v || 'Name is required.',
      ],
      emailRules: [
        v => !!v || 'Email address is required.',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "Email must be valid address."
      ],
      mobileRules: [
        v => !!v || 'Phone number is required.',
        v => /^\d+$/.test(v) || 'Must be a number only.',
      ],
      passwordRule: [
        v => !!v || 'Password is required.',
        v => (v && v.length > 5) || 'Password must greater than six characters.'
      ],
      confirmedPasswordRule: [
        v => !!v || 'Password is required.',
        v => v === this.personalDetails.password || "Password do not match."
      ],
      submitFormLoading: false,
      serverValidationErrors: {},
    }

  },

  created() {

    LocationService.getAllProvince().then(response => {

      console.log(response, 'response');

      this.provinceList = response.data;

    });

  },

  computed: {

    isError422() {

      return this.$store.getters['error/IS422Error'];

    }

  },

  methods: {

    showDistrictsOfSelectedProvince() {

      LocationService.getLowerLocation(this.selectedProvince['location_code']).then(response => {

        this.districtList = [];

        this.municipalityList = [];

        this.wardList = [];

        this.selectedDistrict = '';

        this.selectedMunicipality = '';

        this.selectedWard = '';

        this.districtList = response.data;

      });

    },

    showMunicipalitiesOfSelectedDistrict() {

      LocationService.getLowerLocation(this.selectedDistrict['location_code']).then(response => {

        this.municipalityList = [];

        this.wardList = [];

        this.selectedMunicipality = '';

        this.selectedWard = '';

        this.municipalityList = response.data;

      });

    },

    showWardsOfSelectedMunicipality() {

      LocationService.getLowerLocation(this.selectedMunicipality['location_code']).then(response => {

        this.wardList = [];

        this.selectedWard = '';

        this.wardList = response.data;

      });

    },

    goToStepTwo() {

      if (this.$refs.store_details_form.validate()) {

        this.stepper = 2;

      }

    },

    goToStepThree() {

      if (this.$refs.location_details_form.validate()) {

        this.stepper = 3;

      }

    },

    goBackStepOne() {

      this.stepper = 1;

    },

    goBackStepTwo() {

      this.stepper = 2;

    },

    submitForm() {

      if (this.$refs.personal_details_form.validate()) {

        this.submitFormLoading = true;

        this.serverValidationErrors = {};

        const formData = new FormData();

        formData.append("has_store", '1');

        formData.append("store_type_code", this.selectedPackage['store_type_code']);

        formData.append("store_type_package_history_code", this.selectedPackage['store_type_package_history_code']);

        formData.append('store_name', this.storeName);

        formData.append('store_owner', this.storeOwner);

        formData.append('store_logo', this.selectedStoreLogo);

        formData.append('pan_vat_type', this.selectedPANOrVATType['id'] ?? '');

        formData.append('pan_vat_no', this.panOrVATNo);

        formData.append("store_location_code", this.selectedWard['location_code']);

        formData.append("name", this.personalDetails.name);

        formData.append("login_email", this.personalDetails.login_email);

        formData.append("login_phone", this.personalDetails.login_phone);

        formData.append("store_contact_phone", this.personalDetails.landline_number);

        formData.append("password", this.personalDetails.password);

        formData.append("c_password", this.personalDetails.c_password);

        formData.append("referred_by", this.referralCode);

        this.$store.dispatch('registration/registerStore', formData).then(response => {

          this.$store.commit("error/SET_422_ERROR", false);

          this.$store.commit("error/SET_422_ERROR_MESSAGE", null);

          this.$store.commit('notification/COMMIT_DIALOG', {

            title: 'Account Created',

            message: response.message,

          });

          this.resetFormFields();

          this.$router.push({

            name: 'store-login'

          });

        }).catch(e => {

          errorHandler(e, this);

        }).finally(() => {

          this.submitFormLoading = false;

        });

      }

    },

    resetFormFields() {
      this.storeName = '';
      this.storeOwner = '';
      this.selectedStoreLogo = [];
      this.selectedPANOrVATType = '';
      this.panOrVATNo = '';

      this.selectedProvince = '';
      this.selectedDistrict = '';
      this.selectedMunicipality = '';
      this.selectedWard = '';

      this.personalDetails.name = '';
      this.personalDetails.login_email = '';
      this.personalDetails.login_phone = '';
      this.personalDetails.landline_number = '';
      this.personalDetails.password = '';
      this.personalDetails.c_password = '';
      this.referralCode = '';

      this.$refs.store_details_form.resetValidation();
      this.$refs.location_details_form.resetValidation();
      this.$refs.personal_details_form.resetValidation();

      this.stepper = 1;
    },

    checkInputFile() {
      if (this.selectedStoreLogo === undefined || this.selectedStoreLogo.length === 0) {
        this.selectedStoreLogo = [];
        return ['Please upload an image.'];
      } else if (this.selectedStoreLogo['size'] > (1024 * 1024 * 5)) {
        this.selectedStoreLogo = [];
        return ['Image file size should be less than 5 MB.'];
      }
    }

  }

}
</script>

<style scoped>

</style>
