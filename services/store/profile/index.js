import {Api} from "@/services/Api";

import store from "@/store";

function getStoreInfo() {
    const url = '/store/detail';
    return Api.get(url);
}

function changeStorePassword(data) {
    const url = '/user/change-password';
    return Api.post(url, data);
}

function updateStoreLandmark(data) {
    const url = '/store-map-location/update';
    return Api.post(url, data);
}

export default {
    getStoreInfo,
    changeStorePassword,
    updateStoreLandmark
}
