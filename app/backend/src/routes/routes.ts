import { Router } from 'express';
import loginRouter from './login.router';
import teamsRouter from './teams.router';

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);

export default routers;
