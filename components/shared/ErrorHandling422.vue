<template>
  <div>
    <client-only>
      <v-alert v-if="errorMessage.length>0" dense tile border="left" type="error">
        <v-row v-for="(error,index) in errorMessage" :key="index" no-gutters>
          <div class="subtitle-2 font-weight-medium">
            <v-icon small dark>mdi-circle-medium</v-icon>
            {{ error.message }}
          </div>
        </v-row>
      </v-alert>
    </client-only>
  </div>
</template>

<script>
export default {

  name: "ErrorHandling422",

  data() {

    return {

      errorMessage: [],

    }

  },

  watch: {

    get422ErrorMessage: {

      handler() {

        this.errorMessage = [];

        for (let [key, value] of Object.entries(this.get422ErrorMessage)) {

          this.errorMessage.push({
            value: true,
            message: value[0]
          });

        }

      },

      immediate: true

    }

  },

  computed: {

    get422ErrorMessage() {

      return this.$store.getters['error/GET422ERROR'];

    }

  }

}
</script>

<style scoped>

</style>
