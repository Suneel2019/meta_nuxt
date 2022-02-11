<template>
  <v-container fluid class="pt-5">
    <v-row >
      <v-col cols="12" style="background-color: #003574">
        <v-btn v-for="(item, index) in Items" :key="index" tile @click="gotoPage(item)">
          {{item}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "index",
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
  methods:{
    gotoPage(page){
      if(page==='load-balance'){
        this.type = "load-balance"
        this.$router.push({
          name:'store-balance-load-balance-LoadBalance',
          query:{
            type:'load-balance'
          }
        })
      }else if(page==='statement'){
        this.type = 'statement'
        this.$router.push({
          name:'store-balance-statement-list',
          query:{
            type:'load-balance'
          }
        })
      }else if(page==='list-of-payment'){
        this.type = 'list-of-payment'
        this.$router.push({
          name:'store-balance-payment-list',
          query:{
            type:'load-balance'
          }
        })
      }else{
        this.type = 'withdraw'
        this.$router.push({
          name:'store-balance-withdraw-list',
          query:{
            type:'load-balance'
          }
        })
      }

    },
    // gotoLoadBalance(){
    //   this.$router.push({
    //       name:'store-balance-StoreBalance',
    //       query:{
    //         type:'load-balance'
    //       }
    //   })
    // },
    // gotoStatement(){
    //   this.$router.push({
    //     name:'store-balance-StoreBalance',
    //     query:{
    //       type:'statement'
    //     }
    //   })
    // },
    // gotoListOfPayment(){
    //   this.$router.push({
    //     name:'store-balance-StoreBalance',
    //     query:{
    //       type:'list-of-payment'
    //     }
    //   })
    // },
    // gotoWithdraw(){
    //   this.$router.push({
    //     name:'store-balance-StoreBalance',
    //     query:{
    //       type:'withdraw'
    //     }
    //   })
    // }
  },
  // watch: {
  //   '$route': {
  //     handler(to) {
  //       let isRouteQueryValid = this.tabItems.some(val => val === to.query['type']);
  //
  //       if (isRouteQueryValid) {
  //         this.currentTabIndex = this.tabItems.findIndex(val => val === to.query['type']);
  //       } else {
  //         this.$router.push({
  //           name: 'store-balance-StoreBalance',
  //           query: {
  //             type: 'load-balance'
  //           }
  //         });
  //       }
  //     },
  //     immediate: true
  //   }
  // },
}
</script>

<style scoped>

</style>
