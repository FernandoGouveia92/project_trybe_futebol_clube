import { Request, Response } from 'express';
import User from '../database/models/Users';
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

  public validatedLogind = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userRole = await User.findOne({ where: { email } });
    // console.log(userRole?.dataValues);
    return res.status(200).json(userRole?.dataValues.role);
  };
}
