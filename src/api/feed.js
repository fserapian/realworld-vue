import axios from '@/api/axios';

const getFeed = () => {
  return axios.get('/articles');
};

export default {
  getFeed,
};
