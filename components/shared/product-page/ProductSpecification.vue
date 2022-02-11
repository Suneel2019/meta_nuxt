<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="5">
          <div class="selected_variant">Sensitivity</div>
        </v-col>
        <v-col class="specification_value mb-2" cols="7">
          <span>{{ product_detail['sensitivity']['sensitivity_name'] }}</span>
        </v-col>
        <v-col cols="5">
          <div class="selected_variant">Warranty</div>
        </v-col>
        <v-col class="specification_value mb-2" cols="7">
          <span>{{ product_detail['warranty']['warranty_name'] }}</span>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row no-gutters>
        <div class="highlight_title">About this item</div>
        <v-col
          cols="12"
          class="mt-1"
          v-for="(highlight, index) in product_detail['highlights']" :key="index"
        >
          <v-row no-gutters>
            <v-col cols="1">
              <v-icon size="15" color="black" dark>mdi-circle-medium</v-icon>
            </v-col>
            <v-col cols="11">
               <span class="highlights_design">
                    {{ highlight }}
                  </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {

  name: "ProductSpecification",

  props: ['product_detail']

}
</script>

<style scoped>

</style>
