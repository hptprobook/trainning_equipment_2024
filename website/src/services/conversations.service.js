import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const ConversationsService = {
  add: (data) => handleRequest('post', 'conversations/add', data),
  archive: (data) => handleRequest('patch', 'conversations/updateArchive', data),
  update: (data) => handleRequest('put', 'conversations/converUpdateTitle', data),
  delete: (id) => handleRequest('delete', `conversations/${id}`),
  deleteAll: () => handleRequest('delete', 'conversations/delAll'),
  getArchive: () => handleRequest('get', 'conversations/getAllIsArchive'),
  getAll: () => handleRequest('get', 'conversations/getAll'),
};

export default ConversationsService;
