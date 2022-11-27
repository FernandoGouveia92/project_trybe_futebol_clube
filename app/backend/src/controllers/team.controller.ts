import { Request, Response } from 'express';
import TeamsService from '../services/team.service';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAllTeams = async (req: Request, res: Response) => {
    const allTeams = await this.teamsService.getAll();
    return res.status(200).json(allTeams);
  };

  public getTeamsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const OneTeam = await this.teamsService.getById(id);
    return res.status(200).json(OneTeam);
  };
}
