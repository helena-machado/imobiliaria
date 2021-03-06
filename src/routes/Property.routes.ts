import { Express } from "express";
import { PropertyController } from "../controllers/Property.controller";

export const propertyRoutes = (app: Express) => {
  app.post("/property/register", PropertyController.create);
};
