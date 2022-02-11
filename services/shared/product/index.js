import {Api} from "@/services/Api";

function getProductDetail(slug) {

  let url = '/products/' + slug;

  return Api.get(url);
}

function getSingleProductListViewDetails(payload) {

  const url = '/products/' + payload + '/stocks/package/list-view'

  return Api.get(url);

}

function getNormalOrderVariantCombinationInfo(payload) {

  const url = '/products/' + payload.product_slug + '/' + payload.variant_name;

  return Api.get(url);

}

function getNextLevelVariantForNormalOrder(payload) {

  const url = '/normal-orders/variant-associations/product-code/' + payload.product_code + '/variant-value-code/' + payload.variant_value_code + '/variant-depth/' + payload.variant_depth + '/' + payload.ancestor_code;

  return Api.get(url);

}

function relatedProducts(payload) {

  const url = '/related-products/product/' + payload.slug;

  return Api.get(url);

}


export default {

  getProductDetail,
  getSingleProductListViewDetails,
  getNormalOrderVariantCombinationInfo,
  getNextLevelVariantForNormalOrder,
  relatedProducts

}
