import axios from '@/api/axios';

const getTags = () => {
  return axios.get('/tags');
};

export default {
  getTags,
};
