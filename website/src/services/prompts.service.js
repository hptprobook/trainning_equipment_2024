import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const PromptsService = {
  getAll: (data) => handleRequest('get', '/prompt', data),
};

export default PromptsService;
