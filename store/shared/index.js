import notification from './notification';
import category from './category';
import product from './product';
import tableConfig from "./table-configuration";
import settings from "./settings";

let sharedVuexState = {

  notification,
  category,
  product,
  tableConfig,
  settings

}

export default {

  sharedVuexState

}
