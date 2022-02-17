<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col cols="5">
        <img src="~assets/img/store/login-image.png">
      </v-col>
      <v-col cols="4" offset="1">
        <v-card class="body-2 py-3 px-5">
          <v-form ref="loginForm">
            <v-row no-gutters>
              <v-col cols="12">
                <span class="subtitle-1 font-weight-bold text-uppercase">{{ $t('store') }} {{ $t('login') }}</span>
                <v-divider class="mt-1"></v-divider>
              </v-col>

              <v-col cols="12" class="mt-3" v-if="serverErrors.length !== 0">
                <v-alert
                  dark
                  dense
                  color="error"
                  class="caption mb-1"
                >
                  <div v-for="(error, idx) in serverErrors" :key="idx">
                    {{ error }}
                  </div>
                </v-alert>
              </v-col>

              <v-col cols="12" class="mt-4">
                <v-text-field
                  dense
                  outlined
                  type="email"
                  :label="`${$t('store')} ${$t('login')}`"
                  class="text_field_design"
                  prepend-inner-icon="mdi-account"
                  v-model="userCredential.username"
                  :rules="emailRule">
                </v-text-field>
              </v-col>

              <v-col cols="12" class="mt-1">
                <v-text-field
                  dense
                  outlined
                  type="password"
                  :label="`${$t('password')}`"
                  class="text_field_design"
                  prepend-inner-icon="mdi-key"
                  v-model="userCredential.password"
                  :rules="passwordRule"
                  @keypress.enter="loginUser">
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn
                  block
                  depressed
                  color="primary"
                  :loading="loading"
                  @click="loginUser"
                >
                  {{ $t('login') }}
                </v-btn>
              </v-col>

              <v-col cols="12" class="text-center mt-8">
                <nuxt-link
                  :to="{
                      name: 'store-authentication-forget-password',
                    }"
                >
                  {{ $t('forget_password') }}
                </nuxt-link>
              </v-col>

            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "store-authentication-login",

  middleware: ['shared/noVisitIfAuthenticated'],

  data() {
    return {
      userCredential: {
        username: 'karankhanalpersonal@allpasal.test',
        password: 'admin123',
      },
      emailRule: [
        v => !!v || 'Email is required.'
      ],
      passwordRule: [
        v => !!v || 'Password is required.',
      ],
      serverErrors: [],
      showPassword: false,
      loading: false,
    }
  },

  methods: {

    loginUser() {

      if (!this.$refs.loginForm.validate()) {
        return;
      }

      this.loading = true;

      this.$store.dispatch("login/login", this.userCredential).then(response => {

        this.loading = false;

        this.$store.commit('error/SET_422_ERROR', false);

        this.$store.commit('error/SET_422_ERROR_MESSAGE', null);

        this.$store.commit("login/SET_ISLOGINED", true);
        this.$store.commit("login/SET_STORE_CRED", response["store_details"]);

        this.$router.push({name: 'index'});

      }).catch((e) => {

        console.log(e, 'error');

        this.loading = false;

        errorHandler(e, this);

      });

    }

  }

}
</script>

<style scoped>

</style>
