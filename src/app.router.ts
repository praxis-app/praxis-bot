import express from 'express';
import { healthRouter } from './health/health.router';
import { praxisInstanceConfigsRouter } from './praxis-instance-configs/praxis-instance-configs.router';

export const appRouter = express.Router();

appRouter.get('/', (_req, res) => {
  res.send('Welcome to the Praxis Bot!');
});
appRouter.use('/health', healthRouter);
appRouter.use('/praxis-instance-configs', praxisInstanceConfigsRouter);
