import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config/config.dev';
import { getTokens } from 'modules/common/utils';

export const getBookingsApi = () => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .get(`${USERS_BASE_URL}/booking`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
