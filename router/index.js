import authRoutes from "./auth";
import storeRoutes from "./store";
import sharedRoutes from "./shared";

let extendedAllRoutes = [...authRoutes, ...storeRoutes, ...sharedRoutes];

export default extendedAllRoutes;
