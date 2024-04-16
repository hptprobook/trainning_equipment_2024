/* eslint-disable no-console */

import request from '../utils/request';

async function handleRequest(method, url, data) {
  try {
    const res = await request[method](url, data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

const CompilerServices = {
  codesSaved: () => handleRequest('get', 'compiler/codesSaved'),
  saveCode: (data) => handleRequest('post', 'compiler/save', data),
  run: (data) => handleRequest('post', 'compiler/run', data),
  nextStep: (data) => handleRequest('post', 'compiler/nextStep', data),
  getDetails: (id) => handleRequest('get', `compiler/${id}`),
  share: (id) => handleRequest('get', `compiler/share/${id}`),
  publicCode: (id) => handleRequest('get', `compiler/share/public/${id}`),
  updateCode: (id, data) => handleRequest('put', `compiler/${id}`, data),
  deleteCode: (id) => handleRequest('delete', `compiler/${id}`),
};

export default CompilerServices;
