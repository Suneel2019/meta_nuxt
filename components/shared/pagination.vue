<template>
  <v-pagination
    light
    :disabled="disable"
    color="darkBlue"
    :total-visible="8"
    v-model="currentPage"
    :length="lastPage"
    class="mt-3"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
  ></v-pagination>
</template>

<script>
export default {

  name: "pagination",

  props: ['store', 'collection', 'disable'],

  fetch() {

    this.$store.commit("tableConfig/SET_PAGE_NUMBER", this.$store.state[this.store][this.collection].meta.current_page);

  },

  watch: {

    currentPage(newVal) {

      this.$store.commit("tableConfig/SET_PAGE_NUMBER", newVal);

      this.paginatePage();

    }

  },

  computed: {

    currentPage: {

      get() {

        return this.$store.state[this.store][this.collection].meta.current_page;

      },

      set(currentValue) {

        this.$store.commit("tableConfig/SET_PAGE_NUMBER", currentValue);

        this.$store.commit(this.store + '/SET_CURRENT_PAGE', currentValue);

      }

    },

    lastPage: {

      get() {

        return this.$store.state[this.store][this.collection].meta.last_page;

      }

    }

  },

  methods: {

    paginatePage() {

      this.$store.commit(this.store + '/SET_LOADER_FOR_TABLE', true);

      let queryStringForFilter = this.$store.state.tableConfig.config;

      this.$store.dispatch(this.store + '/paginatedLists', queryStringForFilter).then(() => {

        this.$store.commit(this.store + '/SET_LOADER_FOR_TABLE', false);

      });

    }

  }
}
</script>

