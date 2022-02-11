import productRoutes from "./product";
import categoryRoutes from "./category";

let sharedRoutes = [...productRoutes,...categoryRoutes];

export default sharedRoutes;
