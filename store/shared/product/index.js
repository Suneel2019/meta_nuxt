import {getField, updateField} from "vuex-map-fields";
import ProductService from "@/services/shared/product";

const productModule = {

  namespaced: true,

  state: {},

  getters: {

    getField,


  },

  mutations: {

    updateField,

    COMMIT_RESPONSE() {
    }

  },


  actions: {

    getProductDetails({commit}, slug) {

      return new Promise((resolve, reject) => {

        return ProductService.getProductDetail(slug).then(response => {

          commit("COMMIT_RESPONSE");

          resolve(response);

        }).catch(error => {

          reject(error);

        });

      });

    },

    getTheSingleProductsListViewDetails({commit}, payload) {

      return new Promise((resolve, reject) => {

        return ProductService.getSingleProductListViewDetails(payload).then(response => {

          console.log(response, 'response');

          response.data.map(data => {

            data['packaging_information'].map(variant => {

              variant.quantity = 1

            })

          })

          commit("COMMIT_RESPONSE");

          resolve(response.data);

        }).catch(error => {

          console.log(error, 'response');

          reject(error);

        });

      });

    },

    getNormalOrderVariantInfoForPackagingDetail({commit}, payload) {

      return new Promise((resolve, reject) => {

        ProductService.getNormalOrderVariantCombinationInfo(payload).then(response => {

          console.log(response.data, 'response');

          if (response.data.product_packaging_types.length > 0) {

            response.data.product_packaging_types.map(data => {

              data.color = '#c3c3c3';

            });

          }

          commit("COMMIT_RESPONSE");

          resolve(response);

        }).catch(error => {

          reject(error);

        });

      });

    },

    getNextLevelNormalOrderVariantInfo({commit}, payload) {

      return new Promise((resolve, reject) => {

        return ProductService.getNextLevelVariantForNormalOrder(payload).then(response => {

          console.log(response.data, 'response');

          if (response.data.length > 0) {

            response.data.map(data => data.color = '#c3c3c3');

          }

          commit("COMMIT_RESPONSE");

          resolve(response.data);

        }).catch(error => {

          reject(error);

        });

      });

    },

    loadAllRelatedProducts({commit}, slug) {

      return new Promise((resolve, reject) => {

        return ProductService.relatedProducts(slug).then(response => {

          console.log(response.data, 'response');

          resolve(response.data);

          commit("COMMIT_RESPONSE");

        }).catch(error => {

          reject(error);

        });

      });

    },

  },

};

export default productModule;
