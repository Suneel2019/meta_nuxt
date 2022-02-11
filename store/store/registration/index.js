import registrationService from "@/services/store/registration";

const state = {

  package_type: []

}

const getters = {

  GET_SELECTED_PACKAGE_TYPE(state) {

    return state.package_type
  }

}

const mutations = {

  COMMIT_MESSAGE() {
  },

  PACKAGE_TYPE_SELECTION(state, payload) {

    state.package_type = payload

  }

}

const actions = {

  getStoreType({commit}) {

    return new Promise((resolve, reject) => {

      return registrationService.getStoreTypeForRegistration().then(res => {

          resolve(res.data);

          commit('COMMIT_MESSAGE')

        }
      ).catch(err => {

        reject(err);

      });

    });

  },

  getStorePackageTypes({commit}, payload) {

    return new Promise((resolve, reject) => {

      return registrationService.getStorePackageTypes(payload).then(response => {

        resolve(response.data);

        commit("COMMIT_MESSAGE");

      }).catch(error => {

        reject(error);

      });

    });

  },

  registerStore({commit}, payload) {

    return new Promise((resolve, reject) => {

      return registrationService.registerStore(payload).then(response => {

        resolve(response);

        commit("COMMIT_MESSAGE");

      }).catch(error => {

        reject(error);

      });

    });

  },

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
