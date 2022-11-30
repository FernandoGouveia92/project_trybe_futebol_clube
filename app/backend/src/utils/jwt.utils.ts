import * as jwt from 'jsonwebtoken';
import User from '../database/models/Users';

require('dotenv/config');

export default class JwtUtils {
  // constructor() {}
  static async token(data: User) {
    // console.log('Eu estou na função de criação do token', data);
    const token = jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: '15d',
      algorithm: 'HS256',
    });
    return token;
  }

  static async decodeToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET as string);
      // console.log('Eu to no Utils do JWT', data);
      return data;
    } catch (_err) {
      return { type: 401, message: 'Expired or invalid token' };
    }
  }
}
