import {getField, updateField} from "vuex-map-fields";
import service from "@/services/store/online-payment";
 const  state ={

  }
  const getters = {
    getField,

  }
  const mutations = {
    updateField,

    ADD_PRODUCT_TO_CART() {
    },

  }
  const actions = {

    getTheApiForTheIPSConnect({commit}, payload) {
      return new Promise((resolve, reject) => {
        return service.getTheResponseFromTheIPSConnect(payload).then(response => {
          commit("ADD_PRODUCT_TO_CART");
          resolve(response.data);
        }).catch(error => {
          reject(error);
        });
      });
    },
    checkForTheTransactionSuccess({commit}, payload) {
      return new Promise((resolve, reject) => {
        return service.checkForTheSuccessTransaction(payload).then(response => {
          commit("ADD_PRODUCT_TO_CART");
          resolve(response.data);
        }).catch(error => {
          reject(error);
        });
      });
    },

    checkForTheTransactionFailed({commit}, payload) {
      return new Promise((resolve, reject) => {
        return service.checkForTheSuccessTransaction(payload).then(response => {
          commit("ADD_PRODUCT_TO_CART");
          resolve(response.data);
        }).catch(error => {
          reject(error);
        });
      });
    },
  }

export default {
  namespaced: true,
  getters,
  mutations,
  state,
  actions
}
