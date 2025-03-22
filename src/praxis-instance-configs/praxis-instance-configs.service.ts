import crypto from 'crypto';
import { dataSource } from '../database/data-source';
import { PraxisInstanceConfig } from '../database/entities/PraxisInstanceConfig';

interface CreatePraxisInstanceConfigReq {
  apiUrl: string;
  apiKey: string;
  serverConfigId: string;
}

const praxisInstanceConfigRepository =
  dataSource.getRepository(PraxisInstanceConfig);

export const createPraxisInstanceConfig = async (
  req: CreatePraxisInstanceConfigReq,
) => {
  const { apiUrl, apiKey, serverConfigId } = req;

  const botApiKey = crypto.randomBytes(32).toString('hex');

  const savedConfig = await praxisInstanceConfigRepository.save({
    apiUrl,
    apiKey,
    serverConfigId,
    botApiKey,
  });

  return savedConfig.botApiKey;
};
