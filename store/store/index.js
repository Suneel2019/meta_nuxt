import login from './auth';
import cart from './cart';
import dashboard from './dashboard';
import storeOrder from './store-order';
import payment from './offline-payment';


let storeVuexState = {

  login,
  cart,
  payment,
  dashboard,
  storeOrder

}

export default {

  storeVuexState

}
