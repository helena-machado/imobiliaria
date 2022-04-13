import {Express} from 'express';
import {RealEstateController} from '../controllers/RealEstate.controller';
import {UserController} from '../controllers/User.controller';
import authMiddleware from '../middlewares/auth';

const auth = authMiddleware();

export const authRoutes = (app: Express) => {
  // app.post('/login', UserController.login);
};
