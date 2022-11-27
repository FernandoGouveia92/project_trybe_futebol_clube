import * as bcrypt from 'bcryptjs';
import { badRequest, unauthorized } from '../helpers/http';
import jwtUtils from '../utils/jwt.utils';
import { ReqLog } from '../interfaces';
import User from '../database/models/Users';

export default class LoginService {
  private userModel: User;

  constructor() {
    this.userModel = new User();
  }

  login = async (params: ReqLog) => {
    // resolver tipo de params com interface
    const { email, password } = params;
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      return unauthorized('Incorrect email or password');
    }
    const decrypt = await bcrypt.compare(password, userData?.dataValues.password);
    if (!decrypt) {
      return badRequest('Incorrect email or password');
    }
    const token = await jwtUtils.token(userData.email);
    return ({ type: 200, message: token });
  };
}
