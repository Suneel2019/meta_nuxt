import LocalStorage from "@/helpers/shared/localStorage";

export default function (context) {

  console.log('no visit authentication');

  if (process.server) {

    let localStorageData = LocalStorage(context);

    if (localStorageData['login']['isLoggedIn']) {

      return context.redirect('/')

    }

  } else {

    if (context.store.state.login.isLoggedIn) {

      return context.redirect('/');

    }

  }

}
