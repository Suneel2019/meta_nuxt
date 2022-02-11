<template>
  <v-container pt-2 px-md-8 pb-lg-16 py-10 pb-md-16 class="contact-us">
    <v-row no-gutters justify="center" justify-md="space-around">
      <v-col cols="12" md="6">
        <ErrorHandling422 v-if="isError422"></ErrorHandling422>
        <v-form ref="contactUsForm">
          <v-row no-gutters justify="space-between">
            <v-col cols="12" class="display-1">Contact Us</v-col>
            <v-col cols="12" class="mt-3">
              Name:<sup class="red--text">*</sup>
              <v-text-field
                dense
                outlined
                class="form-field mt-2"
                placeholder="Enter your name"
                v-model="name"
                :rules="nameRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="mt-3">
              Email:<sup class="red--text">*</sup>
              <v-text-field
                dense
                outlined
                class="form-field mt-2"
                placeholder="Enter your email address"
                v-model="email"
                :rules="emailRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="mt-3">
              Phone Number:<sup class="red--text">*</sup>
              <v-text-field
                dense
                outlined
                class="form-field mt-2"
                placeholder="Enter your phone number"
                v-model="phoneNumber"
                :rules="phoneNumberRules"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="mt-3">
              Your Message:<sup class="red--text">*</sup>
              <v-textarea
                dense
                outlined
                rows="3"
                no-resize
                counter="100"
                class="form-field mt-2"
                placeholder="Enter your message"
                v-model="message"
                :rules="messageRules"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12" class="mt-5 text-center text-sm-left">
              <v-btn
                dark
                large
                color="#003574"
                :loading="loading"
                @click="checkValidation"
                >Send Message</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="11" md="4" class="mt-16 mt-md-0">
        <v-row no-gutters justify="center">
          <!-- <v-col cols="6" sm="5" md="9" lg="7">
            <v-img :src="companyLogo"></v-img>
          </v-col>
          <v-col cols="12" class="text-center mt-1">Connect with us:</v-col>
          <v-col cols="12" class="text-center mt-3">
            <a :href="companyFacebookLink" target="_blank" class="social_media">
              <v-icon size="28" color="blue" class="mr-4">mdi-facebook</v-icon>
            </a>
            <a
              :href="companyInstagramLink"
              target="_blank"
              class="social_media"
            >
              <v-icon size="28" color="red" class="mr-4">mdi-instagram</v-icon>
            </a>
            <a :href="companyTwitterLink" target="_blank" class="social_media">
              <v-icon size="28" color="blue" class="ml-1">mdi-twitter</v-icon>
            </a>
          </v-col>
          <v-col cols="12" class="text-justify mt-5">{{
            companyDescription
          }}</v-col>
          <v-col cols="12" class="mt-4">
            <v-icon color="#003574">mdi-map-marker</v-icon>
            <span class="ml-2">{{ companyAddress }}</span>
          </v-col>
          <v-col cols="12" class="mt-3">
            <v-icon color="#003574">mdi-phone</v-icon>
            <span class="ml-2"
              >{{ companyPrimaryContact }}, {{ companySecondaryContact }}</span
            >
          </v-col>
          <v-col cols="12" class="mt-3">
            <v-icon color="#003574">mdi-email</v-icon>
            <span class="ml-2">{{ companyEmail }}</span>
          </v-col> -->
          <v-col cols="12" class="mt-10">
            <v-btn
              color="btn-color"
              href="https://forms.gle/dyvTEcNu2A6QEA6fA"
              target="_blank"
            >
              Take Appointment
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ContactUsApi from "@/services/shared/contact-us/index";
import errorHandler from "@/helpers/shared/errorHandler";
import { mapGetters } from "vuex";

export default {
  components: {
    ErrorHandling422: () => import("@/components/shared/ErrorHandling422"),
  },
  data: () => ({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    loading: false,

    // Validation
    nameRules: [(v) => !!v || "Please Enter Name"],
    emailRules: [(v) => !!v || "Please Enter Email"],
    phoneNumberRules: [(v) => !!v || "Please Enter Phone Number"],
    messageRules: [(v) => !!v || "Please Enter Message"],
  }),
  computed: {
    ...mapGetters("generalSiteSettings", {
      companyLogo: "getCompanyLogo",
      companyAddress: "getCompanyAddress",
      companyPrimaryContact: "getCompanyPrimaryContact",
      companySecondaryContact: "getCompanySecondaryContact",
      companyEmail: "getCompanyEmail",
      companyDescription: "getCompanyDescription",
      companyFacebookLink: "getCompanyFacebookLink",
      companyInstagramLink: "getCompanyInstagramLink",
      companyTwitterLink: "getCompanyTwitterLink",
      seoMetaTitle: "getSEOMetaTitle",
      seoMetaDescription: "getSEOMetaDescription",
      seoKeywords: "getSEOKeywords",
      seoAuthor: "getSEOAuthor",
    }),

    isError422() {
      return this.$store.getters["error/IS422Error"];
    },
  },
  head() {

    return {

      title: 'contact us page ho hai'

    }

  },
  methods: {
    checkValidation() {
      if (this.$refs.contactUsForm.validate()) {
        this.sendContactUs();
      }
    },
    sendContactUs() {
      this.loading = true;

      const formData = new FormData();

      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("phone", this.phoneNumber);
      formData.append("message", this.message);

      ContactUsApi.postContactUs(formData)
        .then((res) => {
          this.loading = false;

          this.$store.commit("notification/COMMIT_SNACKBAR", {
            message: res.message,
            color: "green",
          });
          this.$store.commit("error/SET_422_ERROR", false);

          this.$store.commit("error/SET_422_ERROR_MESSAGE", null);
          this.resetFormFields();
        })
        .catch((e) => {
          errorHandler(e, this);
          this.loading = false;
        });
    },

    resetFormFields() {
      this.name = "";
      this.email = "";
      this.phoneNumber = "";
      this.message = "";
      this.serverResponse.errors = {};
      this.$refs.contactUsForm.reset();
    },
  },

  metaInfo() {
    return {
      title: "Allpasal | Contact Us",
      meta: [
        { title: this.seoMetaTitle ?? "sd" },
        { description: this.seoMetaDescription ?? "sd" },
        { keywords: this.seoKeywords ?? "sd" },
        { keywords: this.seoAuthor ?? "sd" },
      ],
    };
  },
};
</script>
