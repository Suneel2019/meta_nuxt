import dashboardService from "@/services/store/dashboard";

const state = {

  dashboard_info: null,

}

const mutations = {

  SET_DASHBOARD_INFO(state, payload) {

    state.dashboard_info = payload;

  }

}

const getters = {

  GET_DASHBOARD_INFO: state => {

    return state.dashboard_info;

  }

}

const actions = {

  getStoreDashboardInfo({commit}) {

    return new Promise((resolve, reject) => {

      return dashboardService.getStoreStats().then(response => {

          resolve(response.data);

          commit('SET_DASHBOARD_INFO', response)

        }
      ).catch(err => {

        reject(err);

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
