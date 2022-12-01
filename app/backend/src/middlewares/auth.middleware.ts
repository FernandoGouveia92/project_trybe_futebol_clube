// import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt.utils';
import MatchesService from '../services/matches.service';

const teamService = new MatchesService();

const validation = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: 'All fields must be filled' });
  next();
};

const validToken = async (req: Request, res: Response, next: NextFunction) => {
  // console.log('eu to no validToken, antes do authorization');
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  // console.log('eu estou depois do authorization e antes de fazer o decode token');
  const user = await jwtUtils.decodeToken(authorization);
  console.log('Olha o que volta do decodeToken', user);
  if (!user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

const equalMatches = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.awayTeam === req.body.homeTeam) {
    return res
      .status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const { homeTeam, awayTeam } = req.body;
  const checkId = await teamService.checkingId(Number(homeTeam) || Number(awayTeam));
  if (!checkId) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default {
  validToken,
  validation,
  equalMatches,
};
