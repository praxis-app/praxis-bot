import { Request, Response } from 'express';
import * as praxisInstanceConfigsService from './praxis-instances.service';

export const registerPraxisInstance = async (req: Request, res: Response) => {
  const botApiKey = await praxisInstanceConfigsService.registerPraxisInstance(
    req.body,
  );
  res.json({ botApiKey });
};

export const removePraxisInstance = async (req: Request, res: Response) => {
  await praxisInstanceConfigsService.removePraxisInstance(req.body.botApiKey);
  res.json({
    message: `Praxis instance with API key ${req.body.botApiKey} removed`,
  });
};
