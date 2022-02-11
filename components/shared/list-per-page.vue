<template>
  <v-row no-gutters>
    <v-col cols="12" xl="6" lg="6" class="mb-2 mb-xl-0 mb-lg-0">
      <span class="caption">Rows Per Page:</span>
    </v-col>
    <v-col cols="12" xl="6" lg="6">
      <v-autocomplete
        class="auto_complete_with_append_inner_icon"
        dense
        solo
        placeholder="10"
        v-model="selected_item_count"
        :items="itemsCount"
        item-text="value"
        item-value="value"
        @change="showListPerPage(selected_item_count)"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import stringHandler from "@/helpers/shared/dataFormatter";

export default {

  name: "list-per-page",

  props: ['store'],

  data() {

    return {

      itemsCount: [
        {
          id: 1,
          value: "3"
        },
        {
          id: 2,
          value: "25"
        },
        {
          id: 3,
          value: "50"
        }
      ],
      selected_item_count: '',

    }

  },
  methods: {

    showListPerPage(itemsPerPage) {

      this.$store.commit("tableConfig/SET_PER_PAGE", itemsPerPage);

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
