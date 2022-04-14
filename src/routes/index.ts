import { Express } from "express";
import { authRoutes } from "./auth";
import { realEstateRoutes } from "./RealEstate.routes";
import { userRoutes } from "./User.routes";
import { brokerRoutes } from "./Broker.routes";

export default (app: Express) => {
  app.get("/", (req, res) => {
    res.json({ status: "Success!" });
  });

  authRoutes(app);
  realEstateRoutes(app);
  userRoutes(app);
  brokerRoutes(app);
};
