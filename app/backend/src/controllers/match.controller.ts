import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let matchProgress;
    if (inProgress === undefined) {
      matchProgress = await this.matchesService.getAll();
      return res.status(200).json(matchProgress);
    }
    if (inProgress === 'true') {
      matchProgress = await this.matchesService.getAllInProgress(true);
    } else {
      matchProgress = await this.matchesService.getAllInProgress(false);
    }
    return res.status(200).json(matchProgress);
  };

  public addMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const checkId = await this.matchesService.checkingId(Number(id));
    if (!checkId) {
      return res.status(404).json({ message: 'There is no team with such id' });
    }
    if (req.body.awayTeam === req.body.homeTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const newMatch = await this.matchesService.newMatch(req.body);
    return res.status(201).json(newMatch);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await this.matchesService.updateMatch(Number(id));
    return res.status(200).json(update);
  };

  public alterMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.updateMatchWithId(Number(id), req.body);
    return res.status(200).json({ message: 'Match altered successfully' });
  };
}
