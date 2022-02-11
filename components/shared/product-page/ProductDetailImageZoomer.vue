<template>
  <v-row no-gutters>
    <v-col cols="1">
      <div class="carousel-wrapper">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div v-for="(smallImage, index) in smaller_image" :key="index" class="img-wrapper swiper-slide">
              <img
                :src="smallImage.image"
                v-on:mouseover="$emit('change-zoomer-image',index)"
              />
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="11">
      <div class="pic-box ml-4">
        <pic-zoom
          :url="thumb_image.image"
          :big-url="large_image.image"
          :scale="2">
        </pic-zoom>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {

  name: "ProductDetailImageZoomer",

  props: ['thumb_image', 'large_image', 'smaller_image'],

  data() {

    return {

      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 1,
        direction: 'vertical',
        breakpoints: {
          575: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 3,
          },
          1199: {
            slidesPerView: 4,
          },
        },
      },

    }

  },

}
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  width: 100%;

  .swiper-slide {
    text-align: center;
    align-items: center;
    height: 65px !important;
  }

  .img-wrapper img {
    margin: auto;
    width: 50px;
    height: 50px;
    border: 1px solid #b3b3b3;
    border-radius: 2px;
    background-image: linear-gradient(gray 100%, transparent 0);
  }

  .img-wrapper img:hover {

    border: 1px solid orangered;
    cursor: pointer;

  }

}
</style>
