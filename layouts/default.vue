<template>
  <v-app>
    <v-main>
        <Navigation v-if="!isMaintenanceMode"></Navigation>
        <v-container class="pa-0" fluid>
          <category-section></category-section>
          <v-divider></v-divider>
          <Nuxt keep-alive></Nuxt>
          <SnackBar v-if="snackbar"></SnackBar>
          <DialogBox v-if="dialogBox"></DialogBox>
          <DeleteDialog v-if="deleteDialogBox"></DeleteDialog>
          <Footer></Footer>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GeneralSetting from "@/services/shared/general-setting";

export default {

  components: {

    CategorySection: () => import("@/components/shared/home-page/category-section"),

    DeleteDialog: () => import("@/components/shared/notification/DeleteDialogBox"),

    DialogBox: () => import("@/components/shared/notification/DialogBox"),

    Footer: () => import("@/components/shared/footer"),

    Navigation: () => import("@/components/shared/home-page/Navigation"),

    SnackBar: () => import("@/components/shared/notification/SnackBar"),

    CategoryTab: () => import("@/components/shared/home-page/CategoryTab")

  },

  async fetch() {

    await this.generalSettingInfo();

  },

  computed: {

    snackbar() {

      return this.$store.getters["notification/GET_SNACKBAR_STATE"];

    },

    dialogBox() {

      return this.$store.getters["notification/GET_SIMPLE_DIALOG_STATE"];

    },

    deleteDialogBox() {

      return this.$store.getters["notification/GET_DELETE_DIALOG_STATE"];

    },

    isMaintenanceMode() {

      return this.$store.getters['login/MAINTENANCE_CODE'];

    }

  },

  methods: {

    generalSettingInfo() {

      try {

        GeneralSetting.generalInfo().then(response => {

          console.log(response.data, 'general site settings');

          this.storeGeneralInformation(response.data);

        })

      } catch (e) {

        console.log(e, 'response');

      }

    },

    storeGeneralInformation(data) {

      this.$store.commit('settings/commitCompanyLogo', data.logo)
      this.$store.commit('settings/commitCompanyFavIcon', data.fav_icon)
      this.$store.commit('settings/commitCompanyAddress', data.company_address)
      this.$store.commit('settings/commitCompanyPrimaryContact', data.primary_contact)
      this.$store.commit('settings/commitCompanySecondaryContact', data.secondary_contact)
      this.$store.commit('settings/commitCompanyEmail', data.company_email)
      this.$store.commit('settings/commitCompanyDescription', data.company_brief)
      this.$store.commit('settings/commitCompanyFacebookLink', data.social_media_links.facebook)
      this.$store.commit('settings/commitCompanyInstagramLink', data.social_media_links.instagram)
      this.$store.commit('settings/commitCompanyTwitterLink', data.social_media_links.twitter)
      this.$store.commit('settings/commitSEOMetaTitle', data.seo.meta_title)
      this.$store.commit('settings/commitSEOMetaDescription', data.seo.meta_description)
      this.$store.commit('settings/commitSEOKeywords', data.seo.keywords)
      this.$store.commit('settings/commitSEOAuthor', data.seo.author)


    }

  }

}
</script>
