import {Api} from "@/services/Api";

const state = {

  snackBarState: false,
  simpleDialogState: false,
  deleteDialogState: false,

  props: {
    message: 'Action completed successfully.',
    color: 'success',
    btnColor: 'white',
    width: 450,
    title: 'Info',
    data: null,
    alertType: 'info',
    alertColor: 'success',
    show_validation_errors: false,
    validation_errors: [],
  },

}

const mutations = {

  COMMIT_SNACKBAR(state, payload) {

    for (let [key, value] of Object.entries(payload)) {

      if (key in state.props) {

        state.props[key] = value;

      }

    }

    state.snackBarState = true;
  },

  RESET_SNACKBAR(state) {

    state.snackBarState = false;

    state.props.message = 'Action completed successfully.';

    state.props.color = "success";

  },

  COMMIT_DELETE_DIALOG(state, payload) {

    for (let [key, value] of Object.entries(payload)) {

      if (key in state.props) {

        state.props[key] = value;

      }

    }

    state.deleteDialogState = true;
  },

  SET_DELETE_DIALOG_STATE(state, payload) {

    state.deleteDialogState = payload;

  },

  SHOW_DELETE_DIALOG(state, payload) {

    state.props.title = payload['title'];

    state.props.message = payload['message'];

    state.props.data = payload['data'];

    state.deleteDialogState = true;

  },

  RESET_DELETE_DIALOG(state) {

    state.deleteDialogState = false;

    state.props.title = '';

    state.props.message = '';

    state.props.data = {};

  },

  COMMIT_DIALOG(state, payload) {

    for (let [key, value] of Object.entries(payload)) {

      if (key in state.props) {

        state.props[key] = value;

      }

    }

    state.simpleDialogState = true;
  },

  RESET_SIMPLE_DIALOG(state) {

    state.simpleDialogState = false;

    state.props.width = 450;

    state.props.title = "Info";

    state.props.message = 'Action completed successfully.';

    state.props.alertType = 'info';

    state.props.alertColor = 'success';

    state.props.show_validation_errors = false;

    state.props.validation_errors = [];

  },

  COMMIT_RESPONSE() {
  },

}

const getters = {

  GET_SNACKBAR_STATE(state) {

    return state.snackBarState;

  },

  GET_SNACKBAR_PROPS(state) {

    return state.props;
  },

  GET_SIMPLE_DIALOG_PROPS(state) {

    return state.props;

  },

  GET_SIMPLE_DIALOG_STATE(state) {

    return state.simpleDialogState;

  },

  GET_DELETE_DIALOG_STATE(state) {

    return state.deleteDialogState;

  },

  GET_DELETE_DIALOG_PROPS(state) {

    return state.props;

  }

}

const actions = {

  delete({commit}, payload) {

    let params = {};

    if ('params' in payload && Object.keys(payload['params']).length !== 0) {

      params = payload['params'];

    }

    commit('COMMIT_RESPONSE');

    return Api.delete(payload['delete_url'], params);

  }

}


export default {

  namespaced: true,

  state,

  mutations,

  getters,

  actions

}
