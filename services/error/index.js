import {Api} from "@/services/Api";

function maintenanceMode() {

  const url = '/site/maintenance-mode';

  return Api.get(url);

}


export default {

  maintenanceMode,

}
