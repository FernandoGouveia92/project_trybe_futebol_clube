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
}
