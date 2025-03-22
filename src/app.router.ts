import express from 'express';
import { healthRouter } from './health/health.router';

export const appRouter = express.Router();

appRouter.get('/', (_req, res) => {
  res.send('Welcome to the Praxis Bot!');
});
appRouter.use('/health', healthRouter);
