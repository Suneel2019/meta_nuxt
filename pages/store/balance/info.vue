<template>
  <v-container fluid class="pt-5">
    <v-row no-gutters>
      <v-col cols="12">
        <LoadBalance v-if="paymentType === 'load-balance'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoadBalance from "~/pages/store/balance/load-balance/LoadBalance";
export default {
name: "StoreBalance",
  components: {LoadBalance},
  layout: 'store-dashboard',
  data() {
    return {
      currentTabIndex: 0,
      Items: [
        'load-balance',
        'statement',
        'list-of-payment',
        'withdraw'
      ],
      type:'load-balance'
    }
  },
  computed:{
    paymentType(){
      return this.type
    }
  },
}
</script>

<style scoped>

</style>
