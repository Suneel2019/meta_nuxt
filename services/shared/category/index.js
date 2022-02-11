import {Api} from "@/services/Api";

function getSearchProducts(payload) {

  const url = '/search-product' + '?keyword=' + payload;

  return Api.get(url);

}

function getAllCategories() {

  const url = '/category-tree';

  return Api.get(url);

}

function loadSelectedCategoryProduct(payload) {

  let url = '/products/categories';

  return Api.get(url, payload)

}


export default {

  getSearchProducts,
  getAllCategories,
  loadSelectedCategoryProduct

}
