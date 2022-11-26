// import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt.utils';

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
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const user = await jwtUtils.decodeToken(authorization);
  if (user.type) {
    return res.status(401).json({ message: user.message });
  }
  req.body.user = user;
  next();
};

export default {
  validToken,
  validation,
};
