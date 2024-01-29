import {Router } from "express";
import * as controller from "../controllers/city.controller";

const router : Router = Router();
router.get("/",controller.index)
router.get("/city",controller.getCity)
router.get("/district/:code",controller.getDistrict)
router.get("/ward/:code",controller.getWards)
export const cityRoutes : Router  = router