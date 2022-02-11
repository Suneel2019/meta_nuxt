<template>
  <div>
    <v-carousel
      height="300"
      show-arrows
      cycle
      show-arrows-on-hover
      progress
      interval="4000"
      progress-color="primary"
      hide-delimiter-background
    >
      <v-carousel-item>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
      </v-carousel-item>
      <v-carousel-item>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"></v-img>
      </v-carousel-item>
      <v-carousel-item>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/road.jpg"></v-img>
      </v-carousel-item>
      <!--      <v-carousel-item v-for="(image, i) in images" :key="i">-->
      <!--        <v-img :src="image.image"></v-img>-->
      <!--      </v-carousel-item>-->
    </v-carousel>
<!--    <div class="mt-2">-->
<!--      <img width="100%" height="60" src="~/assets/img/shared/banner_image.jpg">-->
<!--    </div>-->
  </div>
</template>

<script>
import HomePageService from "@/services/shared/home-page";

export default {

  name: "banner-slider",

  data() {

    return {

      images: [],

    }

  },

  fetch() {

    HomePageService.getImageSlider().then(response => {

      this.images = response.data;

    }).catch(() => {

    });

  }

}
</script>

<style scoped>

</style>
