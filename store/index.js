import Vue from 'vue';
import Vuex from "vuex";
import guestVuex from "@/store/guest";
import storeVuex from "@/store/store";
import sharedVuex from "@/store/shared";
import localeVuex from "@/store/locale";
import errorVuex from "@/store/error";

Vue.use(Vuex);

const allVuexStores = Object.assign({},
  guestVuex.guestVuexState,
  storeVuex.storeVuexState,
  sharedVuex.sharedVuexState,
  localeVuex,
  errorVuex
);


const createStore = () => {
  return new Vuex.Store({
    modules: allVuexStores
  })
}

export default createStore




