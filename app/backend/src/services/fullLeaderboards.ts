import Match from '../database/models/Match';
import Teams from '../database/models/Teams';
import HomeLeaderboard from './homeLeaderboards';
import AwayLeaderboard from './awayLeaderboards';
import { leaderboard } from '../interfaces';

export default class FullLeaderboard {
  private matchModel: Match;
  private teamsModel: Teams;
  private result: leaderboard[];
  private resultGoals: data[];
  private resultOutcome: data[];
  constructor(
    private homeService = new HomeLeaderboard(),
    private awayService = new AwayLeaderboard(),
  ) {
    this.matchModel = new Match();
    this.teamsModel = new Teams();
    this.result = [];
    this.resultGoals = [];
    this.resultOutcome = [];
  }

  filteredAllTeams = async (): Promise<leaderboard[]> => {
    const result = await this.findAllGames();
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

  findAllGames = async () => {
    const finishedOnes = await Match.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    teams.forEach((team) => {
      const home = finishedOnes.filter((match) => match.homeTeam === team.id);
      const away = finishedOnes.filter((match) => match.awayTeam === team.id);
      const goals = this.goalsCalcs(home, away);
      const outcomes = this.outcomeCalcs(home, away);
      const totalGames = home.length + away.length;
      const data = {
        name: team.teamName,
        ...goals,
        ...outcomes,
        efficiency: ((outcomes.totalPoints / (totalGames * 3)) * 100).toFixed(2),
        totalGames,
      };
      this.result.push(data);
    });
    const finalResult = this.result; this.result = []; return finalResult;
  };

  goalsCalcs = (home: Match[], away: Match[]) => {
    const absGoalsHome = this.homeService.goalsManager(home);
    const absGoalsAway = this.awayService.goalsManager(away);

    const absObj = {
      goalsFavor: Number(absGoalsHome.goalsFavor + absGoalsAway.goalsFavor),
      goalsOwn: Number(absGoalsHome.goalsOwn + absGoalsAway.goalsOwn),
      goalsBalance: Number(absGoalsHome.goalsBalance + absGoalsAway.goalsBalance),
    };
    return absObj;
  };

  outcomeCalcs = (home: Match[], away: Match[]) => {
    const absOutcomeHome = this.homeService.matchesOutcomeManager(home);
    const absOutcomeAway = this.awayService.matchesOutcomeManager(away);

    const absObj = {
      totalVictories: absOutcomeHome.totalVictories + absOutcomeAway.totalVictories,
      totalDraws: absOutcomeHome.totalDraws + absOutcomeAway.totalDraws,
      totalLosses: absOutcomeHome.totalLosses + absOutcomeAway.totalLosses,
    };
    const totalPoints = (absObj.totalVictories * 3) + absObj.totalDraws;
    return { totalPoints, ...absObj };
  };
}

type data = {
  goalsFavor?: number,
  goalsOwn?: number,
  goalsBalance?: number,
  totalVictories?: number,
  totalDraws?: number,
  totalLosses?: number,
};
