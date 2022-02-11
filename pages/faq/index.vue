<template>
  <v-container pt-2 px-md-8 pb-lg-16 py-10 pb-md-16 pt-10 pb-16>
    <v-row no-gutters justify="center">
      <v-col cols="12">
        <v-row no-gutters justify="center">
          <v-col cols="12" sm="5" lg="4" xl="3">
            <img src="~assets/img/store/login-image.png" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="11" sm="9" md="7" class="mt-10">
        <v-autocomplete
          solo
          clearable
          cache-items
          hide-no-data
          return-object
          item-text="question"
          label="Describe your problem"
          prepend-inner-icon="mdi-magnify"
          :items="items"
          :loading="loading"
          v-model="selectedFAQ"
          :search-input.sync="search"
          @input="showFAQ"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="11" sm="9" md="7" v-if="!isFAQSelected">
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, index) in faqList.data" :key="index">
            <v-expansion-panel-header class="subtitle-1 font-weight-bold">
              {{ item.question }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              {{ item.answer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="8" v-else>
        <v-card>
          <v-card-title>{{ selectedFAQ.question }}</v-card-title>
          <v-card-text class="subtitle-1">{{ selectedFAQ.answer }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters class="py-16" v-if="noFAQFound.status">
      <v-col cols="12" class="text-center">
        <div class="font-weight-bold">{{ noFAQFound.message }}</div>
        <div>
          Error code:
          <span class="font-weight-bold">{{ noFAQFound.code }}</span>
        </div>
        <div class="mt-3">
          Try going <router-link to="/">Home</router-link>.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FAQApi from "@/services/shared/faq/index";

export default {
  data: () => ({
    faqList: [],
    items: [],
    selectedFAQ: null,
    search: null,
    isFAQSelected: false,
    loading: false,
    noFAQFound: {
      status: false,
      code: "",
      message: "",
    },
  }),

  async fetch() {
    this.faqList = await FAQApi.getCompanyFAQs();
  },

  watch: {
    search(val) {
      val && val !== this.selectedFAQ && this.querySelections(val);
    },
  },

  methods: {
    showFAQ() {
      this.isFAQSelected = !!this.selectedFAQ;
    },

    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = this.faqList.data.filter((e) => {
          return (
            (e.question || "").toLowerCase().indexOf((v || "").toLowerCase()) >
            -1
          );
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>
