import {Api} from "@/services/Api";

function getStoreStats() {

  const url = '/store/dashboard/stats';

  return Api.get(url);
}

export default {

  getStoreStats

}
