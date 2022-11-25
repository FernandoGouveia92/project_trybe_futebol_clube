import { Router } from 'express';
import LoginController from '../controllers/login.controller';
// import authMiddleware from '../middlewares/auth.middleware';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', loginController.login);

export default loginRouter;
