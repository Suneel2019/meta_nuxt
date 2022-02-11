import CartService from "@/services/store/cart";

const state = {

  cart_count: 0,
  cart: [],
  cart_items: [],
  checkoutList: [],
  placeOrderSuccessfulMessage: null,

}

const mutations = {

  COMMIT_MESSAGE() {
  },

  PRODUCT_CART_COUNT(state, payload) {

    state.cart_count = payload.total_carts;

  },

  SET_CART_PRODUCTS(state, payload) {

    state.cart = payload;

  },

  ADD_CART_ITEMS(state, payload) {

    state.cart_items = payload;

  },

  SET_CHECKOUT_LIST(state, payload) {

    state.checkoutList = payload;

  },

  PLACE_ORDER_SUCCESSFUL_MESSAGE(state, payload) {

    state.placeOrderSuccessfulMessage = payload;

  },

}

const getters = {

  GET_CARTS_COUNT: state => {

    return state.cart_count;

  },

  GET_CART_PRODUCT: state => {

    return state.cart;

  },

  GET_CART_ITEMS_FOR_ORDER: state => {

    return state.cart_items;

  },

  GET_PLACE_ORDER_PRODUCTS: state => {

    return state.checkoutList;

  },

  GET_ORDER_PLACE_SUCCESSFUL_MESSAGE: state => {

    return state.placeOrderSuccessfulMessage;

  },

}

const actions = {

  addProductToCart({commit}, payload) {

    return new Promise((resolve, reject) => {

      return CartService.addProductToStoreCart(payload).then(response => {

        console.log(response.data, 'response');

        response.data.product_packaging_types.map(data => {

          if (data.package_code === response.data.package_code) {

            data.color = '#FF5C00';

          } else {

            data.color = '#c3c3c3';

          }

        })

        resolve(response);

        commit("COMMIT_MESSAGE");

      }).catch(error => {

        reject(error);

      });

    });

  },

  loadAllCartProductsCount({commit, payload}) {

    return new Promise((resolve, reject) => {

      CartService.getAllCartsProductsCount(payload).then(response => {

        commit("PRODUCT_CART_COUNT", response.data);

        resolve(response);

      }).catch(error => {

        reject(error);

      });

    });

  },

  loadAllCartProducts({commit}) {

    return new Promise((resolve, reject) => {

      return CartService.loadAllCartProduct().then(response => {

        response.data.map(data => {

          data.increaseLoadingButton = false;

          data.decreaseLoadingButton = false;

          data.is_checked = false;

          if (data['stock'] === 0) {

            if (data['quantity'] === 1) {

              data.disableDecreaseButton = true;

              data.disableIncreaseButton = true;

            } else if (data['quantity'] > 1) {

              data.disableIncreaseButton = true;

              data.disableDecreaseButton = false;

            }

          } else if (data['stock'] !== 0) {

            if (data['quantity'] === 1) {

              data.disableDecreaseButton = true;

              data.disableIncreaseButton = false;

            } else if (data['quantity'] > 1) {

              data.disableDecreaseButton = false;

              data.disableIncreaseButton = false;

            }
          }

        });

        commit("COMMIT_MESSAGE");

        resolve(response);

      }).catch(error => {

        reject(error);

      });

    });

  },

  updateQuantityForProduct({commit}, payload) {

    return new Promise((resolve, reject) => {

      return CartService.updateProductQuantity(payload).then(response => {

        commit("COMMIT_MESSAGE");

        resolve(response);

      }).catch(error => {

        reject(error);

      });

    });

  },

  placeOrder({commit}, payload) {

    return new Promise((resolve, reject) => {

      return CartService.placeStoreOrder(payload).then(response => {

        commit("COMMIT_MESSAGE");

        resolve(response);

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
