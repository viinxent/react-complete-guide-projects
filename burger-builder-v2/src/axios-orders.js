import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-d494b.firebaseio.com/'
});

export default instance;