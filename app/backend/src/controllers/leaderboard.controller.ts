import { Request, Response } from 'express';
import HomeLeaderboard from '../services/homeLeaderboards';
import AwayLeaderboard from '../services/awayLeaderboards';
import FullLeaderboard from '../services/fullLeaderboards';

export default class LeaderboardController {
  constructor(
    private homeLeaderboardService = new HomeLeaderboard(),
    private awayLeaderboardService = new AwayLeaderboard(),
    private fullBoards = new FullLeaderboard(),
  ) { }

  public HomeLeaderboardData = async (req: Request, res: Response) => {
    const gamesAtHome = await this.homeLeaderboardService.filteredGamesHome();
    return res.status(200).json(gamesAtHome);
  };

  public AwayLeaderboardData = async (req: Request, res: Response) => {
    const gamesAway = await this.awayLeaderboardService.filteredGamesAway();
    return res.status(200).json(gamesAway);
  };

  public fullLeaderboard = async (req: Request, res: Response) => {
    const fullBoard = await this.fullBoards.filteredAllTeams();
    return res.status(200).json(fullBoard);
  };
}
// olhar store manager para ver testes de controller - unitários
