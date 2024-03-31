import request from '../utils/request';

async function handleRequest(method, url, data) {
  return request[method](url, data).then(res => res.data);
}

const ChatService = {
  gemini: (data) => handleRequest('post', '/gemini/chat', data),
  gpt: (data) => handleRequest('post', '/gpt/chat', data),
};

export default ChatService;
