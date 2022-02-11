import {getField, updateField} from "vuex-map-fields";
import service from "@/services/store/store-order";
import helperFunctions from "@/helpers/shared/generatePageNumber";

const storeDashboardOrderModule = {

  namespaced: true,

  state: {
    ordersList: null,
    loading: false,
    default_status: '',
    default_payment_status: '',
  },

  getters: {
    getField,

    DEFAULT_FILTER_STATUS: state => {
      return state.default_status;
    },
    DEFAULT_PAYMENT_STATUS: state => {
      return state.default_payment_status;
    },
  },

  mutations: {
    updateField,

    SET_LOADER_FOR_TABLE(state, payload) {
      state.loading = payload;
    },

    SET_SELECTED_STATUS_FOR_DEFAULT_FILTERING(state, payload) {
      state.default_status = payload;
    },

    SET_PENDING_STATUS_FOR_DEFAULT_FILTERING(state, payload) {

      state.default_payment_status = payload;
    },

    VIEW_STORE_ORDER(state, payload) {
      state.ordersList = payload;
    },

    SET_CURRENT_PAGE(state, payload) {
      state.ordersList.meta.current_page = payload;
    }
  },

  actions: {

    paginatedLists({commit}, payload) {

      return new Promise((resolve, reject) => {

        return service.loadNextPageOrders(payload).then(response => {

          helperFunctions.dataTableSerialNumberGenerator(response.data);

          console.log(response.data, 'response from store for store list');

          commit("VIEW_STORE_ORDER", response)

          resolve(response.data);

        }).catch(error => {

          reject(error);

        });

      });

    },

    getAllStoreOrders({commit}) {

      return new Promise((resolve, reject) => {

        return service.getAllStoreOrders().then(response => {

          helperFunctions.dataTableSerialNumberGenerator(response.data);

          console.log(response.data, 'response from store for store list');

          commit("VIEW_STORE_ORDER", response);

          resolve(response.data);

        }).catch(error => {

          reject(error);

        });

      });

    }

  }

};
export default storeDashboardOrderModule;
