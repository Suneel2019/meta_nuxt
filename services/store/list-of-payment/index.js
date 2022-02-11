import {Api} from "@/services/Api";

function savePaymentForStore(payload) {
  let url = '/wallet/load-balance/offline/save';
  return Api.post(url, payload);
}

function loadAllPayments(payload) {
  const url = "/store/payments/all-lists";
  return Api.get(url, payload);
}

function showSinglePaymentAllDetails(payload) {
  const url = `/store/payment/${payload.status}/${payload.code}/show`;
  return Api.get(url);
}

function loadNextPageMiscellaneousPayment(query){
  const url = '/store/payments/all-lists';
  return Api.get(url,query);

}

export default {
  savePaymentForStore,
  loadAllPayments,
  showSinglePaymentAllDetails,
  loadNextPageMiscellaneousPayment
}
