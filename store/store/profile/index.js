import Service from '../../../services/store/profile/index';

const state = {

    profileInfo: null,

}

const getters = {

    GET_PROFILE_INFO(state){
        
        return state.profileInfo;
    }
}

const mutations = {
    COMMIT_MESSAGE() {

    },
    SET_PROFILE_INFO(state, payload) {
        state.profileInfo = payload;
    },
    SET_LANDMARK(state, payload) {
        state.profileInfo['location_details']['landmark'] = payload;
    }
}


const actions = {
    getStoreInfo({commit}) {
        return new Promise((resolve, reject) => {
            return Service.getStoreInfo().then(response => {
                commit("COMMIT_MESSAGE");
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })

    },

    changeStorePassword({commit}, payload) {
        return new Promise((resolve, reject) => {
            return Service.changeStorePassword(payload).then(response => {
                commit("COMMIT_MESSAGE");
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    updateStoreLandmark(_, payload) {
        return Service.updateStoreLandmark(payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
