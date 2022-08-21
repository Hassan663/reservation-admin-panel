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
