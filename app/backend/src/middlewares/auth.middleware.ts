// import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
// import User from 'src/database/models/Users';
// import Users from '../interfaces/user.interface';

// const createToken = async (login: User) => {
//   console.log('olha eu no auth midle');
//   const token = jwt
//     .sign({ login }, process.env.JWT_SECRET as string);
//   return token;
// };

const validation = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export default {
  // createToken,
  validation,
};
