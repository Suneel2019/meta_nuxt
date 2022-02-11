<template>
  <v-row no-gutters>
    <v-col cols="12" xl="2" lg="2" class="mb-2 mb-xl-0 mb-lg-0">
      <span class="caption font-weight-medium">Search:</span>
    </v-col>
    <v-col cols="11" xl="9" lg="9">
      <v-text-field
        solo
        dense
        v-model="search"
        label="Search...."
        class="text_field_with_prepend_inner_icon"
        prepend-inner-icon="mdi-magnify"
        @input="showSearchResultItems(search)"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import stringHandler from "@/helpers/shared/dataFormatter";

export default {

  name: "table-search",

  props: ['store'],

  data() {

    return {

      search: '',

    }

  },

  methods: {

    showSearchResultItems(search) {

      this.$store.commit("tableConfig/SET_SEARCH", search);

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", 1);

      this.$store.commit(this.store + '/SET_LOADER_FOR_TABLE', true);

      let returnObj = stringHandler.filter(this.$store.state.tableConfig.config)

      this.$store.dispatch(this.store + '/paginatedLists', returnObj).then(() => {

        this.$store.commit(this.store + '/SET_LOADER_FOR_TABLE', false);

      });

    }

  }
}
</script>
