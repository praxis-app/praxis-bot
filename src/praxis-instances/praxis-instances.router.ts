import express from 'express';
import { authenticate } from '../auth/authenticate.middleware';
import { validatePraxisInstance } from './middleware/validate-praxis-instance.middleware';
import {
  checkPraxisInstanceConnection,
  registerPraxisInstance,
  removePraxisInstance,
} from './praxis-instances.controller';

export const praxisInstancesRouter = express.Router();

praxisInstancesRouter
  .post('/', validatePraxisInstance, registerPraxisInstance)
  .get('/check-connection', authenticate, checkPraxisInstanceConnection)
  .delete('/', authenticate, removePraxisInstance);
