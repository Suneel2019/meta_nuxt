<template>
  <v-snackbar
    v-model="state"
    :color="props['color']"
    bottom
    right
    class="snackbar_bottom"
  >
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="closeSnackbar"
      >
        OK
      </v-btn>
    </template>

    {{ props["message"] }}
  </v-snackbar>
</template>

<script>

export default {

  name: 'SnackBar',

  computed: {

    state: {

      get() {

        return this.$store.getters["notification/GET_SNACKBAR_STATE"];

      },

      set() {

        this.$store.commit('notification/RESET_SNACKBAR');

      }

    },

    props() {
      return this.$store.getters["notification/GET_SNACKBAR_PROPS"];
    },

  },

  methods: {

    closeSnackbar() {

      this.$store.commit("notification/RESET_SNACKBAR");

    },

  },

};

</script>

