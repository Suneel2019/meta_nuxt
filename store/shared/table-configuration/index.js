import {getField, updateField} from "vuex-map-fields";

const tableConfigModule = {
  namespaced: true,
  state: {
    config: {
      records_per_page: '',
      search: '',
      has_price: '',
      product_name: '',
      category_name: '',
      brand_name: '',
      package_type: '',
      is_taxable: '',
      store_order_code: '',
      delivery_status: '',
      payment_status: '',
      order_date_from: '',
      order_date_to: '',
      price_condition: '',
      total_price: '',
      is_active: '',
      misc_payment_code: '',
      verification_status: '',
      payment_type: '',
      payment_date_from: '',
      payment_date_to: '',
      amount_condition: '',
      amount: '',
      payable_price_to: '',
      payable_price_from: '',
      page: '',
    },
    previousDeliveryStatus: [],
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,

    CLEAR_TABLE_CONFIG(state) {
      state.config.records_per_page = '';
      state.config.search = '';
      state.config.has_price = '';
      state.config.product_name = '';
      state.config.category_name = '';
      state.config.brand_name = '';
      state.config.package_type = '';
      state.config.page = '';
      state.config.store_order_code = '';
      state.config.delivery_status = '';
      state.config.payment_status = '';
      state.config.order_date_from = '';
      state.config.order_date_to = '';
      state.config.price_condition = '';
      state.config.total_price = '';
      state.config.misc_payment_code = '';
      state.config.amount = '';
      state.config.is_active = '';
      state.config.amount_condition = '';
      state.config.payment_date_from = '';
      state.config.payment_date_to = '';
      state.config.payment_type = '';
      state.config.verification_status = '';
      state.config.is_taxable = '';
      state.config.payable_price_to = '';
      state.config.payable_price_from = '';
    },

    SET_PER_PAGE(state, payload) {
      state.config.records_per_page = payload;
    },

    SET_PREVIOUS_DELIVERY_STATUS(state, payload) {
      state.previousDeliveryStatus = payload;
    },

    SET_ACTIVE_PRODUCT(state, payload) {
      state.config.is_active = payload;
    },

    SET_PAYABLE_PRICE_TO(state, payload) {
      state.config.payable_price_to = payload;
    },
    SET_PAYABLE_PRICE_FROM(state, payload) {
      state.config.payable_price_from = payload;
    },

    SET_HAS_PRICE(state, payload) {
      state.config.has_price = payload;
    },

    SET_HAS_TAX(state, payload) {

      state.config.is_taxable = payload;
    },

    SET_MISC_PAYMENT_CODE(state, payload) {
      state.config.misc_payment_code = payload;
    },

    SET_MISC_VERIFICATION_STATUS(state, payload) {
      state.config.verification_status = payload;
    },

    SET_MISC_PAYMENT_TYPE(state, payload) {
      state.config.payment_type = payload;
    },

    SET_MISC_PAYMENT_DATE_FROM(state, payload) {
      state.config.payment_date_from = payload;
    },

    SET_MISC_PAYMENT_DATE_TO(state, payload) {
      state.config.payment_date_to = payload;
    },

    SET_MISC_AMOUNT_CONDITION(state, payload) {
      state.config.amount_condition = payload;
    },

    SET_MISC_AMOUNT(state, payload) {
      state.config.amount = payload;
    },

    SET_STORE_CODE(state, payload) {
      state.config.store_order_code = payload;
    },

    SET_DELIVERY_STATUS(state, payload) {
      state.config.delivery_status = payload;
    },

    SET_PAYMENT_STATUS(state, payload) {
      state.config.payment_status = payload;
    },

    SET_ORDER_DATE_FROM(state, payload) {
      state.config.order_date_from = payload;
    },

    SET_ORDER_DATE_TO(state, payload) {
      state.config.order_date_to = payload;
    },

    SET_PRICE_CONDITION(state, payload) {
      state.config.price_condition = payload;
    },

    SET_TOTAL_PRICE(state, payload) {
      state.config.total_price = payload;
    },

    SET_SEARCH(state, payload) {
      state.config.search = payload;
    },
    SET_PAGE_NUMBER(state, payload) {
      state.config.page = payload;
    },
    SET_PRODUCT_NAME(state, payload) {
      state.config.product_name = payload;
    },
    SET_BRAND_NAME(state, payload) {
      state.config.brand_name = payload;
    },
    SET_CATEGORY_NAME(state, payload) {
      state.config.category_name = payload;
    },
    SET_PACKAGE_NAME(state, payload) {
      state.config.package_type = payload;
    },

  },
  actions: {},


};
export default tableConfigModule;
