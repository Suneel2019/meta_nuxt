import {Api} from "@/services/Api";

function getCompanyTermsAndConditions() {
    return Api.get('/terms-and-conditions')
}

export default {
    getCompanyTermsAndConditions
}