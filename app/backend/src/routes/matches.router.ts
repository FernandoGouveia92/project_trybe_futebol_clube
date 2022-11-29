import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/match.controller';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.post('/', authMiddleware.validToken, matchesController.addMatch);
matchesRouter.patch('/:id/finish', matchesController.updateMatch);
matchesRouter.patch('/:id', matchesController.alterMatch);

export default matchesRouter;
