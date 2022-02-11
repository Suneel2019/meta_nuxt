<template>
  <v-container fluid class="contact-us">
    <v-row no-gutters class="py-8 px-8">
      <v-col cols="12" class="display-2 black--text">Privacy Policy</v-col>
      <v-col cols="12" class="subtitle-1 text-justify mt-8">
        <div class="privacy_policy" v-html="content.data.content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PrivacyPolicyApi from "@/services/shared/privacy-policy/index";

export default {
    async asyncData() {
    let content = await PrivacyPolicyApi.getCompanyPrivacyPolicy();
    return { content };
  },
}
</script>
