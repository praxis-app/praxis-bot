import crypto from 'crypto';
import { dataSource } from '../database/data-source';
import { PraxisInstance } from './models/PraxisInstance';

interface RegisterPraxisInstanceReq {
  apiUrl: string;
  apiKey: string;
  serverConfigId: string;
}

const praxisInstanceRepository = dataSource.getRepository(PraxisInstance);

export const registerPraxisInstance = async (
  req: RegisterPraxisInstanceReq,
) => {
  const { apiUrl, apiKey, serverConfigId } = req;
  const botApiKey = crypto.randomBytes(32).toString('hex');

  const savedConfig = await praxisInstanceRepository.save({
    apiUrl,
    apiKey,
    serverConfigId,
    botApiKey,
  });

  return savedConfig.botApiKey;
};
