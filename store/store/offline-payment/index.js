import WalletService from "@/services/store/offline-payment";

const state = {}

const mutations = {

  COMMIT_MESSAGE() {
  },
  SAVE_PAYMENT(){}

}

const getters = {}

const actions = {

  savePayment({commit}, payload) {
    return new Promise((resolve, reject) => {
      return WalletService.savePaymentForStore(payload).then(response => {
        resolve(response);
        commit("SAVE_PAYMENT");
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
