import { Router } from 'express';
import loginRouter from './login.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';
import leaderboardRouter from './leaderboard.routes';

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);
routers.use('/leaderboard', leaderboardRouter);

export default routers;
