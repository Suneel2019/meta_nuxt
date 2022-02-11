import {Api} from "@/services/Api";

function getCurrentUserWalletDetail() {

  const url = '/wallet/current-balance';

  return Api.get(url);
}

export default {

  getCurrentUserWalletDetail

}
