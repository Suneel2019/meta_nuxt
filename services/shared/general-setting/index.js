import {Api} from "@/services/Api";

function generalInfo() {

  return Api.get('/site/general-settings')

}

export default {

  generalInfo

}
