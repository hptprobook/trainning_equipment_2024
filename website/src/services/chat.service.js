import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const ChatService = {
  create: (code) => handleRequest('get', `/account/getTokenUser?code=${code}`),
};

export default ChatService;
