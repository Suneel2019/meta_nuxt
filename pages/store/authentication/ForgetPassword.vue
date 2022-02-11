<template>
  <v-container fluid pt-5 pt-sm-10 pb-10 style="background: #e9f2fcba;">
    <v-row no-gutters justify="center">
      <v-col cols="11" sm="9" md="7" lg="5" xl="4">
        <v-card>
          <v-card-title class="grey lighten-5 pb-0">
            {{$t('store')}} {{$t('forget_password')}}
          </v-card-title>
          <v-card-text class="pt-4 grey lighten-5">
            <v-row no-gutters>
              <v-col cols="12">{{$t('forget_password_message')}}</v-col>
              <v-col cols="12" class="mt-3">
                <v-text-field
                  outlined
                  single-line
                  class="form-field"
                  :rules="emailRules"
                  v-model="email_address"
                  :placeholder="`${$t('enter_email_address')}`"
                  @input="enableSendResetButton"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  tile
                  block
                  retain-focus-on-click
                  class="btn-color"
                  :loading="loading"
                  :disabled="disableResetPasswordButton"
                  :dark="!disableResetPasswordButton"
                  @click="sendResetPasswordLink"
                >
                 {{$t('send_reset_link')}}
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center mt-8">
                <v-btn text class="body-2 font-weight-bold login_text_color text-uppercase" @click="goBackToLoginPage">
                 {{$t('back_to_login')}}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "store-authentication-forget-password",
  middleware: ['shared/noVisitIfAuthenticated'],
  data() {
    return {
      goToLogin: false,
      email_address: '',
      disableResetPasswordButton: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid"
      ],
      success: false,
      loading: false,
    }
  },

  methods: {

    goBackToLoginPage() {

      this.$router.push({name: 'store-login'});

    },

    enableSendResetButton() {

      if (this.email_address !== '') {

        this.disableResetPasswordButton = false;

      } else {

        this.disableResetPasswordButton = true;

      }

    },

    sendResetPasswordLink() {

      this.loading = true;

      this.$store.dispatch("login/sendResetPasswordLink", {

        login_email: this.email_address

      }).then(response => {

        this.loading = false;

        this.$store.commit('notification/COMMIT_SNACKBAR', {

          message: response.message,

          color: 'green'

        })

      }).catch((e) => {

        this.loading = false;

        this.$store.commit('notification/COMMIT_SNACKBAR', {

          message: e.response.data.message,

          color: 'red'

        })

      });

    }

  }

}
</script>

<style scoped>

</style>
