import {Api} from "@/services/Api";

function getAllProvince() {

  const url = '/location-hierarchies/by-type?location_type=province';

  return Api.get(url);

}

function getLowerLocation(location_code) {

  const url = '/location-hierarchies/' + location_code + '/lower-locations';

  return Api.get(url);

}


export default {

  getAllProvince,
  getLowerLocation

}
