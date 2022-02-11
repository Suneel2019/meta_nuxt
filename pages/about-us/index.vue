<template>
  <v-container fluid class="py-8">
    <v-row no-gutters class="px-4">
      <v-col cols="12" class="display-2 black--text">About Us</v-col>
      <v-col cols="12" class="mt-8">
        <div class="privacy_policy" v-html="content.data.content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AboutUsApi from "@/services/shared/about-us/index";

export default {
  async asyncData() {
    let content = await AboutUsApi.getCompanyAboutUs();
    return { content };
  },
};
</script>
