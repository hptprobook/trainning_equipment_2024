import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const MessagesService = {
  getByID: (id) => handleRequest('get', `messages/getByIdConver/${id}`),
};

export default MessagesService;
