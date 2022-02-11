<template>
  <v-app dark>
      <component :is="`Error${errorLayout}`"></component>
  </v-app>
</template>

<script>
export default {

  name: 'EmptyLayout',

  layout: 'empty',

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  data() {

    return {

      pageNotFound: '404 Not Found',

      otherError: 'An error occurred',

    }

  },

  head() {

    if (this.$store.getters['login/MAINTENANCE_CODE']) {

      console.log('503 error aayo yo page ma');

      return {

        title: 'Maintenance Mode'

      }

    } else {

      console.log('404 error aayo yo page ma');

      if (this.error.statusCode === 404) {

        return {

          title: '404 Not Found'

        }

      } else {

        return {

          title: 'Unexpected Error'

        }

      }

    }

  },

  computed: {

    errorLayout() {

      if (this.$store.getters['login/MAINTENANCE_CODE']) {

        return 503;

      } else {

        return this.error.statusCode;

      }

    }

  }

}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
