import axios from 'axios';
import { API_ROOT } from '../utils/constants';

export const runOnlineCompiler = async (data) => {
  const response = await axios.post(`${API_ROOT}/compiler/run`, { ...data, contentType: 'application/json' });
  return response.data;
};
