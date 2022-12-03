import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', leaderboardController.HomeLeaderboardData);
leaderboardRouter.get('/away', leaderboardController.AwayLeaderboardData);

export default leaderboardRouter;
