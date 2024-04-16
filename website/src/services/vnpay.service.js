import request from '../utils/request';

async function handleRequest(method, url, data) {
  try {
    const res = await request[method](url, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const VnpayService = {
  getLink: (data) => handleRequest('post', 'vnpay/create_payment_url', data),
  return: (sreach) => handleRequest('get', `vnpay/vnpay_return${sreach}`),
};

export default VnpayService;
