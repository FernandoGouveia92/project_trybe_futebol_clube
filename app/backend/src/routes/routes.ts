import { Router } from 'express';
import loginRouter from './login.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);

export default routers;
