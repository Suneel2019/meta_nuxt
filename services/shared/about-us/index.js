import {Api} from "@/services/Api";

function getCompanyAboutUs() {
    return Api.get('/about-us')
}

export default {
    getCompanyAboutUs
}