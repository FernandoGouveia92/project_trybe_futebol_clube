import * as jwt from 'jsonwebtoken';

require('dotenv/config');

export default class jwtUtils {
  // constructor() {}
  static async token(email: string) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '15d',
      algorithm: 'HS256',
    });
    return token;
  }

  static async decodeToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET as string);
      return { type: null, data };
    } catch (_err) {
      return { type: 401, message: 'Expired or invalid token' };
    }
  }
}
