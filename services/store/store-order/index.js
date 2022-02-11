import {Api} from "@/services/Api";

function getAllStoreOrders() {

  const url = '/store/orders?' + 'filter_by=all';

  return Api.get(url);
}

function loadNextPageOrders(query) {

  const url = '/store/orders';

  return Api.get(url, query);

}

function getSingleOrderDetail(code) {

  const url = '/store/orders/' + code;

  return Api.get(url);
}

export default {
  getAllStoreOrders,
  loadNextPageOrders,
  getSingleOrderDetail
}
