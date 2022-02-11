import {Api} from "@/services/Api";



function getTheResponseFromTheIPSConnect(payload) {
  const url = '/connect-ips/load-balance/save/payment'
  return Api.post(url, payload);
}
function checkForTheSuccessTransaction(payload) {
  const url = '/connect-ips/validate-payment/' + payload.TXNID
  return Api.get(url);
}






export default {
  getTheResponseFromTheIPSConnect,
  checkForTheSuccessTransaction,


}
