import express from 'express';
import { createPraxisInstanceConfig } from './praxis-instance-configs.controller';
import { validatePraxisInstanceConfig } from './middleware/validate-praxis-instance-config.middleware';

export const praxisInstanceConfigsRouter = express.Router();

praxisInstanceConfigsRouter.post(
  '/',
  validatePraxisInstanceConfig,
  createPraxisInstanceConfig,
);
