// import * as jwt from 'jsonwebtoken';
// import Model from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { badRequest, okRequest, unauthorized } from '../helpers/http';
import jwtUtils from '../utils/jwt.utils';
import { ReqLog } from '../interfaces';
import User from '../database/models/Users';

export default class loginService {
  private userModel: User;

  constructor() {
    this.userModel = new User();
  }

  login = async (params: ReqLog) => {
    // resolver tipo de params com interface
    const { email, password } = params;
    console.log(email, password);
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      return unauthorized('Incorrect email or password');
    }
    const decrypt = bcrypt.compare(password, userData.password);
    if (!decrypt) {
      return badRequest('invalid password');
    }
    const token = await jwtUtils.token(userData.email);
    return okRequest({ token });
  };
}
