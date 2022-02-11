import {getField, updateField} from "vuex-map-fields";
import CategoryService from "@/services/shared/category";

const categoryModule = {

  namespaced: true,

  state: {

    selectedCategoryForFilter: [],
    isMultiple: false,
    isCategoryFromCheckBox: false,
    parentCategory: [],
    listViewLayout: false,
    viewListLayoutIcon: false,
    gridLayout: true,
    gridLayoutIcon: true,
    categoryFilterationField: {
      cat_selected: '',
      page: '',
      min_price: '',
      max_price: '',
      is_taxable: '',
      product_name: ''
    },
    previousLevelCategories: [],
    allCategories: [],

  },

  getters: {

    getField,

    LIST_VIEW_LAYOUT: state => {

      return state.listViewLayout;

    },

    GET_PRODUCT_NAME_FOR_FILTER: state => {
      return state.categoryFilterationField.product_name;
    },

    GET_PREVIOUS_CATEGORY: state => {
      return state.previousLevelCategories;
    },

    VIEW_LIST_LAYOUT_ICON: state => {
      return state.viewListLayoutIcon;
    },

    GRID_LAYOUT: state => {
      return state.gridLayout;
    },

    GRID_LAYOUT_ICON: state => {
      return state.gridLayoutIcon;
    },

    SELECTED_CATEGORY_FOR_FILTER: state => {
      return state.selectedCategoryForFilter;
    },

    PARENT_CATEGORY: state => {
      return state.parentCategory;
    },

    MULTIPLE_CHECKBOX_SELECT: state => {
      return state.isMultiple;
    },

    CATEGORY_FROM_CHECKBOX: state => {
      return state.isCategoryFromCheckBox;
    },

    SELECTED_CAT: state => {
      return state.categoryFilterationField.cat_selected;
    },

    SELECTED_CAT_PAGE: state => {
      return state.categoryFilterationField.page;
    },

    SELECTED_CAT_MIN_PRICE: state => {
      return state.categoryFilterationField.min_price;
    },

    SELECTED_CAT_MAX_PRICE: state => {
      return state.categoryFilterationField.max_price;
    },

    SELECTED_CAT_IS_TAXABLE: state => {
      return state.categoryFilterationField.is_taxable;
    },

    CATEGORY_FILTERATION_FIELDS: state => {
      return state.categoryFilterationField;
    },

    GET_ALL_CATEGORIES: state => {
      return state.allCategories;
    },


  },

  mutations: {

    updateField,

    SET_PRODUCT_NAME_FOR_FILTER(state, payload) {
      state.categoryFilterationField.product_name = payload;
    },

    SET_ALL_CATEGORIES(state, payload) {
      state.allCategories = payload;
    },

    SET_RELATED_PRODUCTS(state, payload) {
      state.relatedProducts = payload;
    },

    SET_PREVIOUS_LEVEL_CATEGORY(state, payload) {
      state.previousLevelCategories = payload;
    },

    SET_CAT_SELECTED_FOR_FILTER(state, payload) {
      state.categoryFilterationField.cat_selected = payload;
    },

    SET_PAGE_FOR_FILTER(state, payload) {
      state.categoryFilterationField.page = payload;
    },

    SET_MIN_PRICE_FOR_FILTER(state, payload) {
      state.categoryFilterationField.min_price = payload;
    },

    SET_MAX_PRICE_FOR_FILTER(state, payload) {
      state.categoryFilterationField.max_price = payload;
    },

    SET_IS_TAXABLE_FOR_FILTER(state, payload) {
      state.categoryFilterationField.is_taxable = payload;
    },

    SET_LIST_VIEW_LAYOUT(state, payload) {
      state.listViewLayout = payload;
    },

    SET_VIEW_LIST_LAYOUT_ICON(state, payload) {
      state.viewListLayoutIcon = payload;
    },

    SET_GRID_LAYOUT(state, payload) {
      state.gridLayout = payload;
    },

    SET_GRID_LAYOUT_ICON(state, payload) {
      state.gridLayoutIcon = payload;
    },

    SET_SELECTED_CATEGORY_FOR_FILTER(state, payload) {
      state.selectedCategoryForFilter = payload;
    },

    CHECK_FOR_MULTIPLE_CHECKBOX(state, payload) {
      state.isMultiple = payload;
    },

    SET_CATEGORY_FROM_CHECKBOX(state, payload) {
      state.isCategoryFromCheckBox = payload;
    },

    SET_PARENT_CATEGORY(state, payload) {
      state.parentCategory = payload;
    },

    COMMIT_RESPONSE() {
    }

  },


  actions: {

    searchResultProduct({commit}, slug) {

      return new Promise((resolve, reject) => {

        return CategoryService.getSearchProducts(slug).then(response => {

          commit("COMMIT_RESPONSE");

          resolve(response);

        }).catch(error => {

          reject(error);

        });

      });

    },

    loadProductsAccordingToQueryString({commit}, payload) {

      return new Promise((resolve, reject) => {

        return CategoryService.loadSelectedCategoryProduct(payload).then(response => {

          resolve(response);

          commit("COMMIT_RESPONSE");

        }).catch(error => {

          reject(error);

        });

      });

    },

  },

};

export default categoryModule;
