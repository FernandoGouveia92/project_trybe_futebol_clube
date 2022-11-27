import Team from '../database/models/Teams';

export default class TeamsService {
  private teamModel: Team;
  constructor() {
    this.teamModel = new Team();
  }

  getAll = async () => {
    const teams = await Team.findAll();
    return (teams);
  };

  getById = async (id: string) => {
    const ATeam = await Team.findOne({ where: { id } });
    return (ATeam);
  };
}
