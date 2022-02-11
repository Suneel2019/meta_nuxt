import {Api} from "@/services/Api";

function submitWithdraw(data) {


  return Api.post('/store/balance-management/withdrawRequest', data);
}

function getBanks({kycType, storeCode}) {

  const query = {
    kyc_type: kycType
  }

  return Api.get(`/kyc/store/${storeCode}/bank-details-added`, query);
}

function getListOfWithdrawRequests(query) {

  return Api.get('/store/balance-management/withdraw-request-lists', query);
}

function getBalanceWithdrawRequestDetail(code) {

  return Api.get(`/store/balance-management/withdraw-request-list/detail/${code}`);
}

function getBalanceWithdrawRequestVerificationDetails(params) {

  return Api.get(
    `/store/balance-management/withdraw-request-verification/detail/${params['code']}`,
    params['query'],
  );
}

function cancelWithdrawRequest(data) {
  return Api.post('/store/balance-management/withdraw-request-cancel', data);
}

export default {
  submitWithdraw,
  getBanks,
  getListOfWithdrawRequests,
  getBalanceWithdrawRequestDetail,
  getBalanceWithdrawRequestVerificationDetails,
  cancelWithdrawRequest
}
