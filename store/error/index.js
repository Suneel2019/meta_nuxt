import authService from "@/services/error";

const errorModule = {

  namespaced: true,

  state: {

    maintenanceMode: false,
    is422Error: false,
    error422: null,

  },

  getters: {

    IS422Error: state => {
      return state.is422Error;
    },

    GET422ERROR: state => {

      return state.error422;

    },

    MAINTENANCE_CODE: state => {

      return state.maintenanceMode;

    },

  },

  mutations: {

    SET_MAINTENANCE_CODE(state, payload) {

      state.maintenanceMode = payload;

    },

    SET_422_ERROR(state, payload) {

      state.is422Error = payload;

    },

    SET_422_ERROR_MESSAGE(state, payload) {

      state.error422 = payload;

    },

    COMMIT_REQUEST() {
    },

  },

  actions: {

    checkMaintenanceMode({commit}) {

      return new Promise((resolve, reject) => {

        authService.maintenanceMode().then((response) => {

          commit("SET_MAINTENANCE_CODE", response.data.maintenance_mode);

          resolve(response.data);

        }).catch(error => {

          reject(error);

        });

      });

    },

  }

}

export default {

  error: errorModule

}
