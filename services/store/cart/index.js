import {Api} from "@/services/Api";

function addProductToStoreCart(payload) {

  const url = '/user/carts';

  return Api.post(url, payload);

}

function getAllCartsProductsCount() {

  const url = '/user/cart/counts';

  return Api.get(url);
}

function loadAllCartProduct() {

  const url = '/user/carts';

  return Api.get(url);
}

function updateProductQuantity(payload) {

  const url = '/carts/update-quantity/' + payload.cart_code;

  return Api.post(url, payload.formData);
}

function placeStoreOrder(payload) {

  const url = '/store/orders';

  return Api.post(url, payload);
}


export default {

  addProductToStoreCart,
  getAllCartsProductsCount,
  loadAllCartProduct,
  updateProductQuantity,
  placeStoreOrder

}
