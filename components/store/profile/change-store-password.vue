<template>

  <v-form ref="editPasswordForm">
    <ErrorHandling422 v-if="isError422"></ErrorHandling422>
    <v-row no-gutters class="edit-box pa-4">
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="3" class="font-weight-bold mt-2">Current Password</v-col>

          <v-col cols="4" offset="1">
            <v-text-field
                solo
                flat
                dense
                type="password"
                class="simple_text_field"
                placeholder="Current Password"
                v-model="currentPassword"
                :rules="currentPasswordRule">
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="3" class="font-weight-bold mt-2">New Password</v-col>

          <v-col cols="4" offset="1">
            <v-text-field
                solo
                flat
                dense
                type="password"
                class="simple_text_field"
                placeholder="New Password"
                v-model="newPassword"
                :rules="newPasswordRules">
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="3" class="font-weight-bold mt-2">Confirm New Password</v-col>

          <v-col cols="4" offset="1">
            <v-text-field
                solo
                flat
                dense
                type="password"
                class="simple_text_field"
                placeholder="Confirm New Password"
                v-model="confirmNewPassword"
                :rules="confirmNewPasswordRules">
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <v-alert
            text
            width="400"
            class="body-2"
        >
          <ul>
            <li>Password must be greater than six characters.</li>
            <li>Make sure your password contains a number, a special character, an uppercase and lowercase character,
              etc.
            </li>
          </ul>
        </v-alert>
      </v-col>

      <v-col cols="12" class="text-center mt-2">
        <v-btn
            small
            depressed
            color="primary"
            :loading="btnLoadingState"
            @click="changePassword"
        >
          Save
        </v-btn>

        <v-btn
            dark
            small
            depressed
            class="ml-3"
            color="gray"
            @click="cancelEditBox"
        >
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>

import errorHandler from "@/helpers/shared/errorHandler";

export default {
  name: "ChangeStorePassword",
  components: {
    ErrorHandling422: () => import("@/components/shared/ErrorHandling422")
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      currentPasswordRule: [
        v => !!v || 'Password is required.',
      ],
      newPasswordRules: [
        v => !!v || 'Password is required.',
        v => (v && v.length >= 6) || 'Must be greater than six characters.'
      ],
      confirmNewPasswordRules: [
        v => !!v || 'Password is required.',
        v => v === this.newPassword || "Password do not match."
      ],
      btnLoadingState: false,
    }
  },

  computed: {
    isError422() {

      return this.$store.getters['error/IS422Error'];

    }
  },

  methods: {
    cancelEditBox() {
      $nuxt.$emit("close-store-edit-box");
    },

    changePassword() {
      if (this.$refs.editPasswordForm.validate()) {
        this.btnLoadingState = true;

        const data = new FormData();
        data.append('old_password', this.currentPassword);
        data.append('password', this.newPassword);
        data.append('password_confirmation', this.confirmNewPassword);

        this.$store.dispatch('storeProfile/changeStorePassword', data).then(res => {
          this.btnLoadingState = false;
          this.$store.commit("error/SET_422_ERROR", false);

          this.$store.commit("error/SET_422_ERROR_MESSAGE", null);

          this.$store.commit('notification/COMMIT_SNACKBAR', {
            message: res.message,
            color: 'success',
          });

          this.cancelEditBox();
        }).catch(e => {
          errorHandler(e, this);
          this.btnLoadingState = false;
        });
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.edit-box {
  background-color: #F2F2F2;
}
</style>

