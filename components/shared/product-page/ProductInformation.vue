<template>
  <v-card tile elevation="0" class="pa-3 pt-1 pb-2">
    <div class="product_description_title mb-4">Product description of
      {{ product_detail['product_name'] }}
    </div>
    <span v-html="product_detail['description']"></span>
  </v-card>
</template>

<script>
export default {
  name: "ProductInformation",
  props:['product_detail'],
}
</script>
