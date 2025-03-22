import { Request, Response } from 'express';
import * as praxisInstanceConfigsService from './praxis-instances.service';

export const registerPraxisInstance = async (req: Request, res: Response) => {
  const botApiKey = await praxisInstanceConfigsService.registerPraxisInstance(
    req.body,
  );

  res.json({ botApiKey });
};
