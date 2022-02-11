<template>
  <v-row dense>
    <v-col cols="4">
      <div class="caption font-weight-medium mt-1">View</div>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn dark :color="gridLayoutIcon?'#ff5c00':'grey'" @click="showGridLayout" icon small>
        <v-icon>mdi-view-grid-outline</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" class="text-right">
      <v-btn dark :color="viewListLayoutIcon?'#ff5c00':'grey'" @click="showListViewLayout" icon small>
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {

  name: "ChangeLayout",

  computed: {

    listViewLayout() {

      return this.$store.getters['category/LIST_VIEW_LAYOUT'];

    },

    gridLayoutIcon() {

      return this.$store.getters['category/GRID_LAYOUT_ICON'];

    },

    viewListLayoutIcon() {

      return this.$store.getters['category/VIEW_LIST_LAYOUT_ICON'];

    },

    gridLayout() {

      return this.$store.getters['category/GRID_LAYOUT'];

    },

  },

  methods: {

    showListViewLayout() {

      this.$store.commit('category/SET_GRID_LAYOUT', false);

      this.$store.commit('category/SET_GRID_LAYOUT_ICON', false);

      this.$store.commit('category/SET_VIEW_LIST_LAYOUT_ICON', true);

      this.$store.commit('category/SET_LIST_VIEW_LAYOUT', true);

    },

    showGridLayout() {

      this.$store.commit('category/SET_LIST_VIEW_LAYOUT', false);

      this.$store.commit('category/SET_VIEW_LIST_LAYOUT_ICON', false);

      this.$store.commit('category/SET_GRID_LAYOUT', true);

      this.$store.commit('category/SET_GRID_LAYOUT_ICON', true);

    },

  }

}
</script>

<style scoped>

</style>
