import {getField, updateField} from "vuex-map-fields";
import service from "@/services/store/list-of-payment";
// import {getTime} from "vuetify/src/components/VCalendar/util/timestamp";
// import helperFunctions from "@shared~helpers/TableConfig";



  const state = {
    paymentList: [],
    loading: false,
  }
  const getters = {
    getField,
    LOAD_ALL_PAYMENTS:(state)=>{
      return state.paymentList
    }
  }
  const mutations = {
    updateField,
    SAVE_PAYMENT() {
    },
    LOAD_ALL_PAYMENTS(state, payload) {
      state.paymentList = payload;
    }
  }
  const actions = {

    paginatedLists({commit}, payload) {
      return new Promise((resolve, reject) => {
        return service.loadNextPageMiscellaneousPayment(payload).then(response => {
          // helperFunctions.dataTableSerialNumberGenerator(response.data.data);
          commit("LOAD_ALL_PAYMENTS", response.data)
          resolve(response.data);
        }).catch(error => {
          reject(error);
        });
      });
    },

    savePayment({commit}, payload) {
      return new Promise((resolve, reject) => {
        return service.savePaymentForStore(payload).then(response => {
          resolve(response.data);
          commit("SAVE_PAYMENT");
        }).catch(error => {
          reject(error);
        });
      });
    },

    LoadPaymentList({commit}, payload) {
      return new Promise((resolve, reject) => {
        return service.loadAllPayments(payload).then(response => {
          // helperFunctions.dataTableSerialNumberGenerator(response.data.data);
          commit("LOAD_ALL_PAYMENTS", response.data);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions

}
