import express from 'express';
import { validatePraxisInstance } from './middleware/validate-praxis-instance.middleware';
import { registerPraxisInstance } from './praxis-instances.controller';

export const praxisInstancesRouter = express.Router();

praxisInstancesRouter.post('/', validatePraxisInstance, registerPraxisInstance);
