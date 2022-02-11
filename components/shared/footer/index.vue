<template>
  <v-footer>
    <v-container fluid class="contact-us pa-0">
      <v-container class="pa-0">
        <v-row no-gutters justify="space-between" class="pt-5 pb-8">
          <v-col cols="3">
            <v-row no-gutters justify="center">
              <v-col cols="12">
                <img :src="companyLogo" width="185" height="61" alt="Logo">
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-icon>mdi-map-marker</v-icon>
                {{ companyAddress }}
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-icon>mdi-email</v-icon>
                {{ companyEmail }}
              </v-col>
              <v-col cols="12" class="mt-3">
                <v-icon>mdi-phone</v-icon>
                Contact No: {{ companyPrimaryContact }}, {{ companySecondaryContact }}
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="3">
            <div>
              <span
                class="font-weight-bold text-uppercase pb-2"
                style="border-bottom: 1px solid #003574; color: #003574;">
                Information
              </span>
            </div>

            <div class="mt-4">
              <a
                class="footer-links"
                target="_blank"
                href="https://forms.gle/pj7LTu4AWegrxYAJ9"
              >
                Careers
              </a>
            </div>

            <div class="mt-2">
              <router-link
                to="/about-us"
                class="footer-links"
              >
                About Us
              </router-link>
            </div>

            <div class="mt-2">
              <router-link
                to="/contact-us"
                class="footer-links"
              >
                Contact Us
              </router-link>
            </div>

            <div class="mt-2">
              <router-link
                to="/privacy-policy"
                class="footer-links"
              >
                Privacy Policy
              </router-link>
            </div>

            <div class="mt-2">
              <router-link
                to="/terms-and-condition"
                class="footer-links"
              >
                Terms and Conditions
              </router-link>
            </div>

            <div class="mt-2">
              <router-link
                to="/faq"
                class="footer-links"
              >
                FAQ
              </router-link>
            </div>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row no-gutters justify="center" class="text-center pt-7">
          <v-col cols="11" class="text-center pb-3">
            {{ companyDescription }}
          </v-col>
        </v-row>
      </v-container>

      <v-row no-gutters style="background-color: #003574;">
        <v-col cols="12" class="text-center white--text pt-3 pb-2">
          Alpasal © {{ currentYear }} Online Store. All Rights Reserved. Designed by
          <span class="text-decoration-underline ml-1" style="color: #FF6914;">Heaven Maker Group.</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import {mapGetters} from 'vuex'
import dataFormatter from "@/helpers/shared/dataFormatter";

export default {
  name: "Footer",
  data: () => ({
    subscribeNewsLetter: '',
    subscribeNewsLetterServerResponse: {
      status: false,
      message: '',
    },
    alertType: '',
    currentYear: new Date().toISOString().substring(0, 4)
  }),
  computed: {
    ...mapGetters('settings', {
      companyLogo: 'getCompanyLogo',
      companyAddress: 'getCompanyAddress',
      companyPrimaryContact: 'getCompanyPrimaryContact',
      companySecondaryContact: 'getCompanySecondaryContact',
      companyEmail: 'getCompanyEmail',
      companyDescription: 'getCompanyDescription',
    }),
  },
}
</script>

<style lang="scss" scoped>
.footer-links {
  color: grey;
  text-decoration: none;
}
</style>
