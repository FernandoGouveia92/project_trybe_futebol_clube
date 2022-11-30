import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { type, message } = await this.loginService.login(req.body);
    if (type !== 200) {
      return res.status(type).json({ message });
    }
    res.status(type).json({ token: message });
  };

  public validatedLogin = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const data = await this.loginService.alreadyLoggedIn(authorization as string);
    const result = data as JwtPayload;
    // É necessário afirmar a tipagem de DATA com sendo Payload, para poder acessar os dados de DATA -> role.
    // console.log('Olha eu no controller', result.role);
    return res.status(200).json({ role: result.role });
  };
}
