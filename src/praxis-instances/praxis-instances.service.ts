import crypto from 'crypto';
import { dataSource } from '../database/data-source';
import { PraxisInstance } from './models/praxis-instance.entity';
import { RegisterPraxisInstanceReq } from './praxis-instances.types';

const praxisInstanceRepository = dataSource.getRepository(PraxisInstance);

export const registerPraxisInstance = async ({
  apiUrl,
  apiKey,
  serverConfigId,
}: RegisterPraxisInstanceReq) => {
  const botApiKey = crypto.randomBytes(32).toString('hex');
  const savedConfig = await praxisInstanceRepository.save({
    apiUrl,
    apiKey,
    serverConfigId,
    botApiKey,
  });
  return savedConfig.botApiKey;
};
