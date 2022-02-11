import {Api} from "@/services/Api";

function login(payload) {

  const url = '/store-login';

  return Api.post(url, payload);

}

function sendResetPasswordLinkToEmail(payload) {

  const url = '/user/send-reset-email';

  return Api.post(url, payload);
}

function logout() {

  const url = '/user/logout';

  return Api.post(url, {});

}

function resetPassword(payload) {

  const url = '/user/password/reset'

  return Api.post(url, payload);

}

function maintenanceMode() {

  const url = '/site/maintenance-mode';

  return Api.get(url);

}


export default {

  login,
  sendResetPasswordLinkToEmail,
  resetPassword,
  maintenanceMode,
  logout

}
