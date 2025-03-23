import { Request, Response } from 'express';
import * as praxisInstanceConfigsService from './praxis-instances.service';

export const registerPraxisInstance = async (req: Request, res: Response) => {
  const botApiKey = await praxisInstanceConfigsService.registerPraxisInstance(
    req.body,
  );
  res.json({ botApiKey });
};

export const removePraxisInstance = async (req: Request, res: Response) => {
  const apiKey = req.headers['x-api-key'] as string;
  await praxisInstanceConfigsService.removePraxisInstance(apiKey);

  res.json({
    message: `Removed Praxis instance with API key ${apiKey}`,
  });
};
