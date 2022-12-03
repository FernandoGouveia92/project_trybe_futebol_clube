import Match from '../database/models/Match';
import Teams from '../database/models/Teams';
import { leaderboard } from '../interfaces';

export default class AwayLeaderboardService {
  private matchModel: Match;
  private teamsModel: Teams;
  private result: leaderboard[];
  constructor() {
    this.matchModel = new Match();
    this.teamsModel = new Teams();
    this.result = [];
  }

  filteredGamesAway = async (): Promise<leaderboard[]> => {
    const result = await this.findGamesAway();
    const filter = result.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) {
        return 1;
      } if (a.totalPoints > b.totalPoints) {
        return -1;
      }
      return this.firstFilter(a, b);
    });
    return filter;
  };

  firstFilter = (a:leaderboard, b: leaderboard) => {
    if (a.totalVictories < b.totalVictories) {
      return 1;
    } if (a.totalVictories > b.totalVictories) {
      return -1;
    }
    return this.secondFilter(a, b);
  };

  secondFilter = (a: leaderboard, b: leaderboard) => {
    if (a.goalsBalance < b.goalsBalance) {
      return 1;
    } if (a.goalsBalance > b.goalsBalance) {
      return -1;
    }
    return this.thirdFilter(a, b);
  };

  thirdFilter = (a: leaderboard, b: leaderboard) => {
    if (a.goalsFavor < b.goalsFavor) {
      return 1;
    } if (a.goalsFavor > b.goalsFavor) {
      return -1;
    }
    return this.finalFilter(a, b);
  };

  finalFilter = (a: leaderboard, b: leaderboard) => {
    if (a.goalsOwn < b.goalsOwn) {
      return 1;
    } if (a.goalsOwn > b.goalsOwn) {
      return -1;
    }
    return 0;
  };

  findGamesAway = async () => {
    const finishedOnes = await Match.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    teams.forEach((team) => {
      const awayGames = finishedOnes.filter((match) => match.awayTeam === team.id);
      const data = this.totalPoints(awayGames);
      const obj: leaderboard = { name: team.teamName, ...data };
      this.result.push(obj);
    });
    const finalResult = this.result;
    this.result = [];
    return finalResult;
  };

  totalPoints = (awayGames: Match[]): leaderboard => {
    const { goalsFavor, goalsOwn, goalsBalance } = this.goalsManager(awayGames);
    const { totalVictories, totalDraws, totalLosses } = this.matchesOutcomeManager(awayGames);
    const totalGames = awayGames.length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return {
      totalPoints,
      efficiency,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  };

  goalsManager = (homeGames: Match[]) => {
    let goalsFavor = 0;
    let goalsOwn = 0;

    homeGames.forEach((game) => {
      goalsFavor += game.awayTeamGoals;
      goalsOwn += game.homeTeamGoals;
    });
    const goalsBalance = goalsFavor - goalsOwn;
    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  };

  matchesOutcomeManager = (awayGames: Match[]) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    awayGames.forEach((game) => {
      if (game.awayTeamGoals > game.homeTeamGoals) {
        totalVictories += 1;
      } else if (game.homeTeamGoals > game.awayTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
      }
    });

    return {
      totalVictories,
      totalDraws,
      totalLosses,
    };
  };
}
