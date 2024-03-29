import request from '../utils/request';

async function handleRequest(method, url, data) {
  console.log('handleRequest', data);
  return request[method](url, data).then(res => res.data);
}

const ConversationsService = {
  add: (data) => handleRequest('post', 'conversations/add', data),
  archive: (data) => handleRequest('put', 'conversations/updateArchive', data),
  update: (data) => handleRequest('put', 'conversations/converUpdateTitle', data),
  delete: (id) => handleRequest('delete', `conversations/${id}`),
  deleteAll: () => handleRequest('delete', 'conversations/deleteAll'),
  getArchive: () => handleRequest('get', 'conversations/getAllIsArchive'),
  getAll: () => handleRequest('get', 'conversations/getAll'),
};

export default ConversationsService;
