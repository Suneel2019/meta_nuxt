<template>
  <v-menu
    tile
    offset-y
    max-width="300"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-on="on"
              v-bind="attrs" :size="iconSize" :color="iconColor">mdi-information
      </v-icon>
    </template>

    <v-card>
      <v-row no-gutters class="body-2">
        <v-col cols="12">
          <v-card tile class="pa-3" color="white">
            <v-icon size="20" class="mr-1">mdi-bank</v-icon>
            <span class="font-weight-bold">
              Total Balance: {{ convertCurrency(balanceInfo['total_balance']) }}
            </span>

            <v-divider class="mt-2 mb-2"></v-divider>

            <v-icon size="20" class="mr-1">mdi-pause-octagon</v-icon>
            <span class="font-weight-bold">
              Frozen Balance: {{ convertCurrency(balanceInfo['freeze_balance']['total_freeze_amount']) }}
            </span>

            <v-divider class="mt-2"></v-divider>

            <div class="mt-2 pl-2 caption">
              <v-icon size="20" class="mr-2">mdi-cash</v-icon>
              <span class="font-weight-bold">
                Withdraw: {{ convertCurrency(balanceInfo['freeze_balance']['total_withdraw_freeze']) }}
              </span>
            </div>

            <div class="mt-1 pl-2 caption">
              <v-icon size="20" class="mr-2">mdi-cart-arrow-down</v-icon>
              <span class="font-weight-bold">
                Preorder: {{ convertCurrency(balanceInfo['freeze_balance']['total_preorder_freeze']) }}
              </span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import dataFormatter from "@/helpers/shared/dataFormatter";
export default {

  name: "StoreBalanceInformation",

  props: {
    iconSize: {
      type: Number,
      default: 20
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    balanceInfo: {
      type: Object,
      default: function () {
        return []
      }
    }
  },

  methods: {

    convertCurrency(currency) {

      return dataFormatter.formatCurrency(currency);

    }

  }
}
</script>
