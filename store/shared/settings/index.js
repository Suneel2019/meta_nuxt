const state = {
  logo: '',
  fav_icon: '',
  company_address: '',
  primary_contact: '',
  secondary_contact: '',
  company_email: '',
  company_brief: '',
  social_media_links: {
    facebook: '',
    instagram: '',
    twitter: ''
  },
  seo: {
    meta_title: '',
    meta_description: '',
    keywords: '',
    author: '',
  }
}

const mutations = {
  commitCompanyLogo(state, data) {
    state.logo = data
  },
  commitCompanyFavIcon(state, data) {
    state.fav_icon = data
  },
  commitCompanyAddress(state, data) {
    state.company_address = data
  },
  commitCompanyPrimaryContact(state, data) {
    state.primary_contact = data
  },
  commitCompanySecondaryContact(state, data) {
    state.secondary_contact = data
  },
  commitCompanyEmail(state, data) {
    state.company_email = data
  },
  commitCompanyDescription(state, data) {
    state.company_brief = data
  },
  commitCompanyFacebookLink(state, data) {
    state.social_media_links.facebook = data
  },
  commitCompanyInstagramLink(state, data) {
    state.social_media_links.instagram = data
  },
  commitCompanyTwitterLink(state, data) {
    state.social_media_links.twitter = data
  },
  commitSEOMetaTitle(state, data) {
    state.seo.meta_title = data
  },
  commitSEOMetaDescription(state, data) {
    state.seo.meta_description = data
  },
  commitSEOKeywords(state, data) {
    state.seo.keywords = data
  },
  commitSEOAuthor(state, data) {
    state.seo.author = data
  }
}

const getters = {
  getCompanyLogo(state) {
    return state.logo
  },
  getCompanyFavIcon(state) {
    return state.fav_icon
  },
  getCompanyAddress(state) {
    return state.company_address
  },
  getCompanyPrimaryContact(state) {
    return state.primary_contact
  },
  getCompanySecondaryContact(state) {
    return state.secondary_contact
  },
  getCompanyEmail(state) {
    return state.company_email
  },
  getCompanyDescription(state) {
    return state.company_brief
  },
  getCompanyFacebookLink(state) {
    return state.social_media_links.facebook
  },
  getCompanyInstagramLink(state) {
    return state.social_media_links.instagram
  },
  getCompanyTwitterLink(state) {
    return state.social_media_links.twitter
  },
  getSEOMetaTitle(state) {
    return state.seo.meta_title
  },
  getSEOMetaDescription(state) {
    return state.seo.meta_description
  },
  getSEOKeywords(state) {
    return state.seo.keywords
  },
  getSEOAuthor(state) {
    return state.seo.author
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
