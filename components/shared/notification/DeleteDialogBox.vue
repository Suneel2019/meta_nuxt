<template>
  <v-dialog
    persistent
    width="450"
    v-model="state"
  >
    <v-card>
      <v-alert
        tile
        type="error"
        class="py-3"
      >
        {{ props['title'] }}
      </v-alert>
      <div class="caption pb-2 px-4">
        <span v-html="props['message']"></span>
      </div>
      <v-divider class="mt-2"></v-divider>
      <div class="dialog_actions">
        <v-btn
          text
          small
          color="error"
          :loading="btnLoadingState"
          @click="deleteAction"
        >
          Delete Anyway
        </v-btn>
        <v-btn
          text
          small
          @click="closeDialog"
        >
          Cancel
        </v-btn>
      </div>
    </v-card>
  </v-dialog>

</template>
<script>

export default {

  name: "DeleteDialog",

  data: () => ({

    btnLoadingState: false

  }),

  computed: {

    state: {

      get() {

        return this.$store.getters["notification/GET_DELETE_DIALOG_STATE"];

      },

      set(value) {

        this.$store.commit('notification/SET_DELETE_DIALOG_STATE', value);

      },

    },

    dialogBoxState() {

      return this.$store.getters["notification/GET_DELETE_DIALOG_STATE"]

    },

    props() {

      return this.$store.getters["notification/GET_DELETE_DIALOG_PROPS"];

    }

  },

  methods: {

    deleteAction() {

      this.btnLoadingState = true;

      const data = this.$store.getters["notification/GET_DELETE_DIALOG_PROPS"]['data'];

      this.$store.dispatch('notification/delete', data).then(response => {

        console.log(response, 'success');

        this.$nuxt.$emit('delete_success_event', {

          response: response,

          success: true

        });

      }).catch(e => {

        console.log(e.response.data, 'error');

        this.$nuxt.$emit('delete_success_event', {

          response: e.response,

          success: false

        });

      }).finally(() => {

        this.btnLoadingState = false;

        this.$store.commit('notification/RESET_DELETE_DIALOG');

      })

    },

    closeDialog() {

      this.$store.commit('notification/RESET_DELETE_DIALOG');

    },

  }

}
</script>

<style>
.dialog_actions {
  text-align: end;
  padding-top: 12px;
  padding-right: 8px;
  padding-bottom: 8px;
  background-color: #EEEEEE;
}
</style>
