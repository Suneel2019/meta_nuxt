const localeModule = {

  namespaced: true,

  state: {

    locales: [
      {
        code: 'en',
        name: 'EN'
      },
      {
        code: 'np',
        name: 'NP'
      },
      {
        code: 'ind',
        name: 'IND'
      },
    ],

    locale: 'en'

  },

  mutations: {

    SET_LANG(state, locale) {

      if (state.locales.find(el => el.code === locale)) {

        state.locale = locale

      }

    }

  }

}

export default {

  locale: localeModule

}
