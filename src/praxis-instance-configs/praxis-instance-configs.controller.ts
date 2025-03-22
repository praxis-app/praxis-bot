import { Request, Response } from 'express';
import * as praxisInstanceConfigsService from './praxis-instance-configs.service';

export const createPraxisInstanceConfig = async (
  req: Request,
  res: Response,
) => {
  const botApiKey =
    await praxisInstanceConfigsService.createPraxisInstanceConfig(req.body);

  res.json({ botApiKey });
};
