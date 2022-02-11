import {Api} from "@/services/Api";

function getCompanyPrivacyPolicy() {
    return Api.get('/privacy-policy')
}

export default {
    getCompanyPrivacyPolicy
}