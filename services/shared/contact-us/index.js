import {Api} from "@/services/Api";

function postContactUs(data) {
    return Api.post('/contact-messages/store', data);
}

export default {
    postContactUs
}