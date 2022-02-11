import {Api} from "@/services/Api";

function getCompanyFAQs() {
    return Api.get('/faqs')
}

export default {
    getCompanyFAQs
}