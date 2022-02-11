import {Api} from "@/services/Api";

function getStoreTypeForRegistration() {

  const url = '/store-types';

  return Api.get(url);

}

function getStorePackageTypes(storePackageCode) {

  const url = `/store-type-packages/get-packages/${storePackageCode}`;

  return Api.get(url);
}

function registerStore(data) {

  const url = '/store-registration';

  return Api.post(url, data);
}


export default {

  getStoreTypeForRegistration,
  getStorePackageTypes,
  registerStore

}
