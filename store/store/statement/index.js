import Service from "@/services/store/statement";

const state = {
  list_of_statement:[]
}

const getters = {

}

const mutations = {
  COMMIT_MESSAGE() {

  },
}

const actions = {
  getBalanceStatements(_, payload) {
    return Service.getBalanceStatement(payload);
  },
  getTransactionTypes(_, payload) {
    return Service.getTransactionType(payload);
  },
  getStoreCurrentBalance({commit}) {
    return new Promise((resolve, reject) => {
      return Service.getStoreCurrentBalance().then(res => {
        resolve(res.data);
        commit('COMMIT_MESSAGE')
      }).catch(err => {
        reject(err);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
