import express from 'express';
import { authenticate } from '../auth/authenticate.middleware';
import { validatePraxisInstance } from './middleware/validate-praxis-instance.middleware';
import {
  registerPraxisInstance,
  removePraxisInstance,
} from './praxis-instances.controller';

export const praxisInstancesRouter = express.Router();

praxisInstancesRouter
  .post('/', validatePraxisInstance, registerPraxisInstance)
  .delete('/', authenticate, removePraxisInstance);
