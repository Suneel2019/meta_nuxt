import Service from "@/services/store/withdraw";

const mutations = {
  COMMIT_MESSAGE() {

  },
}

const actions = {
  submitWithdraw({commit}, payload) {
    return new Promise((resolve, reject) => {
      return Service.submitWithdraw(payload).then(res => {
        resolve(res);
        commit('COMMIT_MESSAGE')
      }).catch(err => {
        reject(err);
      });
    });
  },
  getBanks({commit}, payload) {
    return new Promise((resolve, reject) => {
      return Service.getBanks(payload).then(res => {
        resolve(res.data);
        commit('COMMIT_MESSAGE')
      }).catch(err => {
        reject(err);
      });
    });
  },
  getListOfWithdrawRequests({commit}, payload) {
    return new Promise((resolve, reject) => {
      return Service.getListOfWithdrawRequests(payload).then(res => {
        resolve(res);
        commit('COMMIT_MESSAGE')
      }).catch(err => {
        reject(err);
      });
    });
  },
  getBalanceWithdrawRequestDetail({commit}, payload) {
    return new Promise((resolve, reject) => {
      return Service.getBalanceWithdrawRequestDetail(payload).then(res => {
        resolve(res.data);
        commit('COMMIT_MESSAGE')
      }).catch(err => {
        reject(err);
      });
    });
  },
  getBalanceWithdrawRequestVerificationDetails({commit}, payload) {
    return new Promise((resolve, reject) => {
      return Service.getBalanceWithdrawRequestVerificationDetails(payload).then(res => {
        resolve(res.data);
        commit('COMMIT_MESSAGE')
      }).catch(err => {
        reject(err);
      });
    });
  },
  cancelWithdrawRequest(_, payload) {
    return Service.cancelWithdrawRequest(payload);
  }
}

export default {
  namespaced: true,
  actions,
  mutations
};
