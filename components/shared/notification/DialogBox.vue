<template>
  <v-dialog
    persistent
    :width="props['width']"
    v-model="state"
  >
    <v-card>
      <v-alert
        tile
        class="py-3"
        :type="props['alertType']"
        :color="props['alertColor']"
      >
        {{ props['title'] }}
      </v-alert>

      <div class="caption px-4" v-if="props['show_validation_errors']">
        The form data could not submitted.

        <v-alert
          text
          dense
          color="error"
          class="caption mt-1"
        >
          <ul>
            <li
              v-for="(item, index) in props['validation_errors']"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </v-alert>
      </div>

      <div class="caption pb-2 px-4" v-else>
        <span v-html="props['message']"></span>
      </div>

      <v-divider class="mt-2"></v-divider>

      <div class="dialog_actions">
        <v-btn text small @click="closeDialog">
          Close
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  name: "DialogBox",

  computed: {

    state: {

      get() {

        return this.$store.getters["notification/GET_SIMPLE_DIALOG_STATE"];

      },

      set() {

        return this.$store.commit("notification/RESET_SIMPLE_DIALOG")

      }

    },

    props() {

      return this.$store.getters["notification/GET_SIMPLE_DIALOG_PROPS"];

    },

  },

  methods: {

    closeDialog() {

      this.$store.commit('notification/RESET_SIMPLE_DIALOG');

    }

  }

}
</script>
