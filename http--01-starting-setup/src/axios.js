import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(request => {
  console.log('[AXIOS-REQUEST]', request);
  return request;
}, error => {
  console.log('[AXIOS-REQUEST-ERROR]', error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  console.log('[AXIOS-RESPONSE]', response);
  return response;
}, error => {
  console.log('[AXIOS-RESPONSE-ERROR]', error);
  return Promise.reject(error);
});

export default instance;