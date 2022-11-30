import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { badRequest, unauthorized } from '../helpers/http';
import JwtUtils from '../utils/jwt.utils';
import { ReqLog } from '../interfaces';
import User from '../database/models/Users';

export default class LoginService {
  private userModel: User;
  private jsonWebToken: JwtUtils;

  constructor() {
    this.userModel = new User();
    this.jsonWebToken = new JwtUtils();
  }

  login = async (params: ReqLog) => {
    // resolver tipo de params com interface
    const { email, password } = params;
    const userData = await User.findOne({ where: { email } });
    // console.log('Eu to na service de login', userData);
    if (!userData) {
      return unauthorized('Incorrect email or password');
    }

    const decrypt = await bcrypt.compare(password, userData?.password);
    if (!decrypt) {
      return badRequest('Incorrect email or password');
    }

    const token = await JwtUtils.token(userData.dataValues);
    // console.log('Eu to na service, de novo, para fazer loggin', userData.dataValues);
    return ({ type: 200, message: token });
  };

  alreadyLoggedIn = async (token: string) => {
    const someUser = await JwtUtils.decodeToken(token);
    const data = someUser as JwtPayload;
    // data retorna todo o objeto com payload e outros dados. Dizer que vem 'as' poayload não é o suficiente, é preciso acessar na próxima camada também
    // console.log('Eu to no service do login', data);
    return data;
  };
}
