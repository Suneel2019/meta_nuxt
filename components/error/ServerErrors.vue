<template>
  <v-alert
      text
      dense
      type="error"
      color="error"
      class="caption"
  >
    The form could not be submitted.

    <ul>
      <li v-for="(error, idx) in errors" :key="idx">
        {{ error }}
      </li>
    </ul>
  </v-alert>
</template>

<script>
export default {
  name: "ServerErrors",
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
}
</script>
