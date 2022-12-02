import { Request, Response } from 'express';
import LeaderboardService from '../leaderboards/leaderboards';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public leaderboardData = async (req: Request, res: Response) {
    const gamesAtHome = await this.leaderboardService.finishedGames();
    return res.status(200).json(gamesAtHome);
  }
}
