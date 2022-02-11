<template>
  <div class="mt-2">
    <div class="font-weight-bold title my-2">Collection</div>
    <v-row no-gutters>
      <v-col cols="3" v-for="(collection,index) in productCollection" :key="index">
        <v-hover>
          <v-card :to="{name:'collection-collection_name-view-all-products',params:{collection_name:collection['product_collection_slug']}}"
                  class="pointer-on-hover" slot-scope="{ hover }" tile height="150" elevation="1">
            <v-img style="position: absolute;" width="100%" height="150"
                   src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;opacity:0.5"
                >
                  <div style="position:relative;top:40px;left:30px;">
                    <v-row no-gutters>
                      <v-col class="title font-weight-medium text-center" cols="12">
                        {{ collection['product_collection_title'] }}
                      </v-col>
                      <v-col class="subtitle-2 font-weight-thin text-center" cols="12">
                        {{ collection['product_collection_subtitle'] }}
                      </v-col>
                      <v-col class="subtitle-2 font-weight-thin text-center" cols="12">{{
                          collection['products_count']
                        }} Products
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductCollection from "@/services/shared/product-collection";

export default {

  name: "product-collections",

  data() {

    return {

      productCollection: [],

    }

  },

  fetch() {

    ProductCollection.getProductCollectionLists().then(response => {

      console.log(response.data, 'response');

      this.productCollection = response.data;

    }).catch(e => {

      console.log(e, 'error');

    })

  }

}
</script>

<style scoped>

</style>
