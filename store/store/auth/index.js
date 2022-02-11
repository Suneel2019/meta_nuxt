import authService from '@/services/store/auth'
import * as Cookies from 'js-cookie'
import {getField, updateField} from "vuex-map-fields";

const authModule = {

  namespaced: true,

  state: {
    user_credential: null,
    isLoggedIn: false,
    storeCred: null,
  },

  getters: {

    getField,

    TOKENCRED: state => {
      if (state.user_credential) {
        return state.user_credential['tokens'];
      } else {
        return null;
      }
    },

    ISLOGINED: state => {
      return state.isLoggedIn;
    },

    ROLEID: state => {
      if (state.user_credential) {
        return state.user_credential['user']['user_type'];
      } else {
        return null;
      }
    },

    USERCRED: state => {
      if (state.user_credential) {
        return state.user_credential['user'];
      } else {
        return null;
      }
    },

    IS_BILLABLE: state => {
      if (state.user_credential) {
        return state.user_credential['store_details']['is_billable'];
      } else {
        return false;
      }
    },

    ACCOUNT_STATUS: state => {
      if (state.user_credential) {
        return state.user_credential['account_status'];
      } else {
        return null;
      }
    },

    STORE_WAREHOUSE: state => {
      if (state.user_credential) {
        return state.user_credential['connected_warehouses'];
      } else {
        return null;
      }
    },
    STORECRED: state => {
      return state.storeCred;
    },

  },

  mutations: {

    updateField,

    LOGIN_USER(state, payload) {

      state.user_credential = payload;

    },

    SET_ISLOGINED(state, payload) {

      state.isLoggedIn = payload;

    },

    LOGOUT(state) {
      localStorage.removeItem("vuex");
      localStorage.clear();
      state.user_credential = null;
      state.isLoggedIn = false;
    },

    COMMIT_REQUEST() {
    },
    SET_STORE_CRED(state, payload) {
      state.storeCred = payload;
    },

  },

  actions: {

    login({commit}, payload) {

      return new Promise((resolve, reject) => {

        authService.login(payload).then((response) => {

          commit("LOGIN_USER", response.data);

          resolve(response.data);

        }).catch(error => {

          reject(error);

        })

      });

    },

    sendResetPasswordLink({commit}, payload) {

      return new Promise((resolve, reject) => {

        authService.sendResetPasswordLinkToEmail(payload).then((response) => {

          commit("COMMIT_REQUEST");

          resolve(response);

        }).catch(error => {

          reject(error);

        });

      });

    },

    logout({commit}, context) {

      return new Promise((resolve, reject) => {

        authService.logout(context).then((response) => {

          commit("LOGOUT");

          Cookies.remove('login');

          resolve(response);

        }).catch(error => {

          reject(error);

        });

      });

    },

    resetUserPassword({commit}, payload) {

      return new Promise((resolve, reject) => {

        authService.resetPassword(payload).then((response) => {

          resolve(response);

          commit("COMMIT_REQUEST");

        }).catch(error => {

          reject(error);

        })

      });

    },

  },

}

export default authModule;
