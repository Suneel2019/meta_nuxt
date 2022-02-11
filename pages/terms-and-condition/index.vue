<template>
  <v-container fluid class="contact-us">
    <v-row no-gutters class="py-8">
      <v-col cols="12" class="display-2 black--text">
        Terms and Conditions
      </v-col>
      <v-col cols="12" class="subtitle-1 text-justify mt-2">
        <div class="privacy_policy" v-html="content.data.content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TermsAndCondition from "@/services/shared/terms-and-condition/index";

export default {
  async asyncData() {
    let content = await TermsAndCondition.getCompanyTermsAndConditions();
    return { content };
  },
};
</script>
