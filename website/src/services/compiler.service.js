/* eslint-disable no-console */

import request from '../utils/request';

async function handleRequest(method, url, data) {
  try {
    console.log('Service: ', method, url, data);
    const res = await request[method](url, data);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const CompilerServices = {
  codeSaved: () => handleRequest('get', 'compiler/codesSaved'),
  saveCode: (data) => handleRequest('post', 'compiler/save', data),
  run: (data) => handleRequest('post', 'compiler/run', data),
  getDetails: (id, data) => handleRequest('get', `compiler/${id}`, data),
  share: (id) => handleRequest('get', `compiler/share/${id}`),
  publicCode: (id) => handleRequest('get', `compiler/share/public/${id}`),
};

export default CompilerServices;
