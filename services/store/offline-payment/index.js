import {Api} from "@/services/Api";
function getAllBankList() {
  const url = '/banks';

  const headers = {
    'Accept': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  };

  return Api.get(url, headers);
}
function getAllWalletList() {
  const url = '/digital-wallets';

  const headers = {
    'Accept': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  };

  return Api.get(url, headers);
}

function getAllRemitsList() {
  const url = '/remits';

  const headers = {
    'Accept': 'application/json',
    'X-Requested-with': 'XMLHttpRequest',
  };

  return Api.get(url, headers);
}
function savePaymentForStore(payload) {
  // let fromInvestment = store.getters['sharedUser/GET_IS_FROM_BUSINESS_PLAN']
  // let url;
  // if(fromInvestment){
  //   url = '/investment-plan/offline-pay/subscribe'
  // }else{
  //   url = '/wallet/load-balance/offline/save';
  // }
  let url = '/wallet/load-balance/offline/save';
  // const headers = {
  //   'Accept': 'application/json',
  //   'X-Requested-with': 'XMLHttpRequest',
  //   'Authorization': 'Bearer ' + store.getters['login/TOKENCRED']['access_token'],
  // };
  return Api.post(url, payload);
}


export default {
  getAllBankList,
  getAllRemitsList,
  getAllWalletList,
  savePaymentForStore
}
