import {setAxios} from "@/utils/Api";

export default function ({store, redirect, $axios}) {

  setAxios($axios);

  $axios.onRequest(() => {

    if (store.state.login['isLoggedIn']) {

      $axios.setHeader('Authorization', `Bearer ${store.state.login['user_credential']['tokens']['access_token']}`);

    }


  })

  $axios.onError(error => {

    console.log(error.response, 'error');

    if (error.response) {

      if (error.response.status === 503) {

        console.log('error 503')

        store.commit("error/SET_MAINTENANCE_CODE", true);

        redirect('/error');

      } else {

        store.commit("error/SET_MAINTENANCE_CODE", false);

      }

    }

  })

}
