import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const ConversationsService = {
  add: (data) => handleRequest('post', 'conversations/add', data),
  getAll: () => handleRequest('get', 'conversations/getAll'),
};

export default ConversationsService;
