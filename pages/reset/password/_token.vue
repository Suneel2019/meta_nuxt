<template>
  <v-container class="pa-12 pt-5 background_image" fluid>
    <client-only>
      <v-row justify="center" class="pb-0" align="center">
        <v-col cols="2">
          <img
            src="~assets/img/shared/logo.png"
            height="100"
            class="ml-4"
          >
        </v-col>
      </v-row>

      <v-row justify="center" class="pb-1" align="center">
        <v-col cols="3" class="py-0">
          <span v-if="$store.state.locale.locale==='en'" class="ml-12" style="font-size: 20px;color:#797979">{{$t('change_password_for')}}  <span class=" ml-12" style="font-size: 20px;color:#797979">{{ userEmail }}</span></span>
          <span v-else class="ml-12" style="font-size: 20px;color:#797979"><span class=" ml-12" style="font-size: 20px;color:#797979">{{ userEmail }}</span> {{$t('change_password_for')}}</span>
        </v-col>
      </v-row>

      <v-card tile class="mx-auto" max-width="400" raised>
        <ErrorHandling422 v-if="isError422"></ErrorHandling422>
        <v-card-title style="color:#535766;" class="login_title grey lighten-5">
          <v-row dense align="center" class="mb-3" justify="center">
            <v-col cols="5" class="pt-0">
              <img
                src="~assets/img/shared/logo.png"
                height="60"
              >
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="pb-8 pt-0 grey lighten-5">
          <v-form ref="changePasswordForFirstLogin">
            <span class="mx-5 placeholder">{{$t('enter_new_password')}} :</span>
            <v-row dense>
              <v-col cols="12">
                <v-row align="center" justify="center" dense>
                  <v-col cols="11">
                    <v-text-field
                      dense
                      height="40"
                      type="password"
                      ref="password"
                      color="darkBlue"
                      single-line
                      class="text_field_with_prepend_inner_icon mt-2"
                      solo
                      prepend-inner-icon="vpn_key"
                      :placeholder="`${$t('enter_new_password')}`"
                      name="password"
                      v-model="password"
                      :rules="passwordRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <span class="mx-5 placeholder">{{$t('confirm_new_password')}}</span>
            <v-row dense>
              <v-col cols="12">
                <v-row align="center" justify="center" dense>
                  <v-col cols="11">
                    <v-text-field
                      dense
                      height="40"
                      type="password"
                      ref="passworConfirm"
                      color="darkBlue"
                      single-line
                      class="text_field_with_prepend_inner_icon mt-2"
                      solo
                      prepend-inner-icon="vpn_key"
                      :placeholder="`${$t('confirm_new_password')}`"
                      name="passwordConfirm"
                      v-model="passwordConfirm"
                      validate-on-keyup
                      :rules="[rules.passwordConfirm]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row dense align="center" justify="center">
              <v-col cols="11">
                <v-btn
                  tile
                  block
                  height="40"
                  dark
                  color="darkBlue"
                  retain-focus-on-click
                  @click.prevent="onRegister()"
                  :loading="loadingRegister"
                >{{$t('change_password')}}
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <nuxt-link :to="{name:'store-login'}">{{$t('back_to_login')}}</nuxt-link>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
import ErrorHandler from "@/helpers/shared/errorHandler";
import ErrorHandling422 from "@/components/shared/ErrorHandling422";

export default {

  name: "reset-password-token",
  components: {ErrorHandling422},
  data() {
    return {
      password: '',
      passwordConfirm: '',
      userEmail: '',
      loadingRegister: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be at least of 8 charatcers"
      ],
      passwordChangeSuccess: false,
      resetPasswordToken: null,
    }
  },

  asyncData({params, query}) {

    return {

      userEmail: query.login_email,

      resetPasswordToken: params.token

    }

  },

  computed: {

    rules() {

      return {

        passwordConfirm: () => {

          return (this.password === this.passwordConfirm || "Password must match!");

        }

      };

    },

    isError422() {

      return this.$store.getters['error/IS422Error'];

    }

  },


  methods: {

    onRegister() {

      if (this.$refs.changePasswordForFirstLogin.validate()) {

        this.loadingRegister = true;

        this.$store.dispatch("login/resetUserPassword", {

          login_email: this.userEmail,

          password: this.password,

          password_confirmation: this.passwordConfirm,

          token: this.resetPasswordToken

        }).then(response => {

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: response['message'],

            color: 'success'

          })

          this.$store.commit("login/SET_422_ERROR", false);

          this.$store.commit("login/SET_422_ERROR_MESSAGE", null);

          this.loadingRegister = false;

        }).catch((e) => {

          ErrorHandler(e, this);

        }).finally(() => {

          this.loadingRegister = false

        })

      }

    }

  }

}
</script>

<style scoped>

</style>
