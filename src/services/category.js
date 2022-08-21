import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config/config.dev';

export const categoryApi = category => {
  console.log('in Category API: ', category);
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/category`, category, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      })
      .then(data => {
        console.log('succ: ', data);
        resolve(data);
      })
      .catch(error => {
        console.log('err: ', error);
        reject(error);
      });
  });
};
