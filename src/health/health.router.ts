import express from 'express';
import { authenticate } from '../auth/authenticate.middleware';
import { getHealth } from './health.controller';

export const healthRouter = express.Router();

healthRouter.get('/', authenticate, getHealth);
