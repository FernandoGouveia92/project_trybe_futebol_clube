import { Request, Response } from 'express';
import HomeLeaderboard from '../services/homeLeaderboards';
import AwayLeaderboard from '../services/awayLeaderboards';

export default class LeaderboardController {
  constructor(
    private homeLeaderboardService = new HomeLeaderboard(),
    private awayLeaderboardService = new AwayLeaderboard(),
  ) { }

  public HomeLeaderboardData = async (req: Request, res: Response) => {
    const gamesAtHome = await this.homeLeaderboardService.filteredGamesHome();
    return res.status(200).json(gamesAtHome);
  };

  public AwayLeaderboardData = async (req: Request, res: Response) => {
    const gamesAway = await this.awayLeaderboardService.filteredGamesAway();
    return res.status(200).json(gamesAway);
  };
}
// olhar store manager para ver testes de controller - unitários
