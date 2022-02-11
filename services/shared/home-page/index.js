import {Api} from "@/services/Api";

function getImageSlider() {

  const url = '/sliders';

  return Api.get(url);

}

function getMostPopularAllProducts(payload) {

  const url = `/most-popular/all-products`

  return Api.get(url, payload);
}


export default {

  getImageSlider,
  getMostPopularAllProducts

}
