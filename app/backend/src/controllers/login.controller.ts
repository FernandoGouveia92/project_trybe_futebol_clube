import { Request, Response } from 'express';
// import { ResLog } from '../helpers/http';
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
}
