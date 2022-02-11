import {Api} from "@/services/Api";


function getBalanceStatement(queryParams) {
  return Api.get('/store/balance-management/transaction', queryParams);
}


function getTransactionType() {
  return Api.get('/store/transaction-filter/data');
}

export default {
  getBalanceStatement,
  getTransactionType
}
