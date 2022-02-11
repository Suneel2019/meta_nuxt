<template>
  <div class="mt-3">
    <div class="title font-weight-bold mb-3">Featured Brands</div>
    <swiper style="height: 220px;" ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(brand,index) in brands" :key="index">
        <v-card class="pointer-on-hover" elevation="4">
          <v-img style="position: absolute;" width="100%" height="200"
                 :src="brand['brand_image']">
            <div
              class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;opacity:0.5"
            >
              <div style="position:relative;top:75px;left:20px;">
                <v-row no-gutters>
                  <v-col class="font-weight-medium" cols="12" style="font-size: 30px;">
                    {{ brand['brand_name'] }}
                  </v-col>
                  <v-col class="title font-weight-medium" cols="12">
                    {{ brand['products_count'] }} Products
                  </v-col>
                  <v-col
                    class="caption text-uppercase text-decoration-underline orange--text font-weight-medium"
                    cols="12">
                    Shop Now
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-img>
        </v-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {

  name: "brand-slider",

  data() {

    return {

      brands: [

        {
          brand_name: 'Samsung',
          brand_image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          products_count: 490
        },
        {
          brand_name: 'Motorola',
          brand_image: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          products_count: 500
        },
        {
          brand_name: 'Iphone',
          brand_image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          products_count: 1024
        },
        {
          brand_name: 'Huwawe',
          brand_image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          products_count: 3090
        },
        {
          brand_name: 'Sony',
          brand_image: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          products_count: 590
        },

      ],

      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },

    };

  },

};
</script>

<style scoped>

</style>
