
import { Express } from "express";
import { cityRoutes } from "./city.routes";



const routesVersion1 = (app: Express): void => {
    const version = "/api/v1/duongits";
    app.use(version + "/", cityRoutes);
}
export default routesVersion1