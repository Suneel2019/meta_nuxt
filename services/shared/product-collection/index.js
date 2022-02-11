import {Api} from "@/services/Api";

function getProductCollectionLists() {

  const url = '/product-collections';

  return Api.get(url);

}

function selectedProductCollectionAllProductsList(payload) {

  const url = `products/product-collection/${payload['slug']}?page=${payload['page']}`;

  return Api.get(url);

}


export default {

  getProductCollectionLists,
  selectedProductCollectionAllProductsList

}
