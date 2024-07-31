import { Request, Response } from 'express';

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json({ ok: true });
  };

  loginUser = (req: Request, res: Response) => {
    res.json({ ok: true });
  };
}
