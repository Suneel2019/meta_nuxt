import WalletService from "@/services/store/wallet";

const state = {}

const mutations = {

  COMMIT_MESSAGE() {
  }

}

const getters = {}

const actions = {

  getCurrentUserWalletDetail({commit}) {

    return new Promise((resolve, reject) => {

      return WalletService.getCurrentUserWalletDetail().then(res => {

          resolve(res.data);

          commit('COMMIT_MESSAGE')

        }
      ).catch(err => {

        reject(err);

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
