export default function errorHandler(error, context) {
  console.log(error.response,'code')
  switch (error.response.data.code) {
    case 422:
      handle422Error()
      break;
    case 503:
      handle503Error()
      break;
    case 401:
      handleOtherError()
      break;
  }
  function handle422Error() {
    context.$store.commit("error/SET_422_ERROR", true);
    context.$store.commit("error/SET_422_ERROR_MESSAGE", error.response.data.data);
  }
  function handleOtherError() {
    console.log('other errors');
    context.$store.commit("error/SET_422_ERROR", false);
    context.$store.commit("error/SET_422_ERROR_MESSAGE", null);
    context.$store.commit('notification/COMMIT_SNACKBAR', {
      message: error.response.data.message,
      color: 'red'
    });
  }
  function handle503Error() {
    context.$store.commit("error/SET_422_ERROR", false);
    context.$store.commit("error/SET_422_ERROR", false);
    context.$store.commit("error/SET_MAINTENANCE_CODE", true);
  }
}
