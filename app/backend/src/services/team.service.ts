import Teams from '../database/models/Teams';

export default class TeamsService {
  private teamModel: Teams;
  constructor() {
    this.teamModel = new Teams();
  }

  getAll = async () => {
    const teams = await Teams.findAll();
    return (teams);
  };

  getById = async (id: string) => {
    const ATeam = await Teams.findOne({ where: { id } });
    return (ATeam);
  };
}
