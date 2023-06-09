import Teams from '../database/models/Teams';
import Match from '../database/models/Match';
import { AlterMatch, NewMatch } from '../interfaces';

export default class MatchesService {
  private matchModel: Match;
  constructor() {
    this.matchModel = new Match();
  }

  getAll = async () => {
    const matches = await Match.findAll({ include: [
      { model: Teams,
        as: 'teamHome',
        attributes: {
          exclude: ['id'],
        } },
      { model: Teams,
        as: 'teamAway',
        attributes: {
          exclude: ['id'],
        } },
    ],
    });
    return matches;
  };

  getAllInProgress = async (params: boolean) => {
    const matchInProgress = await Match.findAll({ where: { inProgress: params },
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: {
            exclude: ['id'],
          } },
        { model: Teams,
          as: 'teamAway',
          attributes: {
            exclude: ['id'],
          } },
      ],
    });
    return matchInProgress;
  };

  newMatch = async (match: NewMatch) => {
    const aMatch = match;
    aMatch.inProgress = true;
    const matchAdded = await Match.create({ ...aMatch });
    return matchAdded;
  };

  updateMatch = async (id: number) => {
    await Match.update({
      inProgress: false,
    }, { where: { id } });
  };

  updateMatchWithId = async (id: number, body: AlterMatch) => {
    await Match.update(
      { homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals },
      { where: { id } },
    );
  };

  checkingId = async (team: number) => {
    const teamsExists = await Teams.findByPk(team);
    return teamsExists;
  };
}
