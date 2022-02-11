import registerRoutes from "./registration";
import cartRoutes from "./cart";

let storeRoutes = [...registerRoutes,...cartRoutes];

export default storeRoutes;
