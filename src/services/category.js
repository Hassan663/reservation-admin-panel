import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config/config.dev';
import { getTokens } from 'modules/common/utils';

export const categoryApi = category => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/category`, category, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const getCategoryApi = category => {
  const token = getTokens();
  console.log('new Api', category);
  return new Promise((resolve, reject) => {
    axios
      .get(`${USERS_BASE_URL}/getAllCategory`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        console.log('API Successfully Fetched', data);
        resolve(data);
      })
      .catch(error => {
        console.log('API Error', error);
        reject(error);
      });
  });
};
