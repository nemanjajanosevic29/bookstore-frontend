import AxiosConfig from '../../core/services/axiosConfig.js';

const RESOURCE = '/Publishers';

export async function getAllPublishers() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}