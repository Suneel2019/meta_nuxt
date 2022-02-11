<template>
  <v-container fluid px-0 pt-6 pb-16>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="11" sm="5" md="4" xl="3">
        <img src="~/assets/img/shared/404_error.png">
      </v-col>
      <v-col cols="10" sm="5" md="5" lg="4" offset-sm="1" class="error_message mt-3">
        <v-row no-gutters justify="center">
          <v-col cols="12">
            The page your are looking for doesn't exist. <br>
            This happens when: <br>
            <div class="error_message_conditions">
              <v-icon small color="primary">mdi-information</v-icon>
              Link is broken. <br>
              <v-icon small color="primary">mdi-information</v-icon>
              Link has been removed. <br>
              <v-icon small color="primary">mdi-information</v-icon>
              Link is not available at the moment.
            </div>
            <div class="text-center text-sm-left mt-5">
              <v-btn
                tile
                small
                depressed
                color="primary"
                @click="goToHomePage"
              >
                Go to Home Page
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {

  name: "Error404",

  methods: {

    goToHomePage() {

      this.$router.push({

        name: 'index',

      });
    }
  }

}
</script>

<style scoped>

</style>
