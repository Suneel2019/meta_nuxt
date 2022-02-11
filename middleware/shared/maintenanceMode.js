import LocalStorage from "@/helpers/shared/localStorage";

export default function (context) {

  if (process.server) {

    let localStorageData = LocalStorage(context);

    if (localStorageData) {

      if (localStorageData['login']['maintenanceMode']) {

        return context.redirect('/error');

      }

    }

  } else {

    if (context.store.state.error.maintenanceMode) {

      return context.redirect('/error');

    }

  }

}
