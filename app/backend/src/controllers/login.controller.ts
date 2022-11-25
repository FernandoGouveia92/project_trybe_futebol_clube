import { Request, Response } from 'express';
// import { ResLog } from '../helpers/http';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { message } = await this.loginService.login(req.body);
    res.status(200).json({ token: message });
  };
}
