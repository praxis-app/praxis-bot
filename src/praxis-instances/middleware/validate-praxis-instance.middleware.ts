import { NextFunction, Request, Response } from 'express';

export const validatePraxisInstance = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { apiUrl, apiKey, serverConfigId } = req.body;

  if (!apiUrl || !apiKey || !serverConfigId) {
    res.status(400).json({
      error:
        'Missing required fields: apiUrl, apiKey, and serverConfigId are required',
    });
    return;
  }

  if (
    typeof apiUrl !== 'string' ||
    typeof apiKey !== 'string' ||
    typeof serverConfigId !== 'string'
  ) {
    res.status(400).json({
      error:
        'Invalid data types: apiUrl, apiKey, and serverConfigId must be strings',
    });
    return;
  }

  next();
};
