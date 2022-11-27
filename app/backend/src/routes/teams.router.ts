import { Router } from 'express';
import TeamsController from '../controllers/team.controller';

const teamsRouter = Router();
const teamController = new TeamsController();

teamsRouter.get('/', teamController.getAllTeams);
teamsRouter.get('/:id', teamController.getTeamsById);

export default teamsRouter;
