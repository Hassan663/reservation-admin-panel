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

export const deleteCategory = categoryId => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .delete(`${USERS_BASE_URL}/category/${categoryId}`, {
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

export const getCategoryApi = () => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .get(`${USERS_BASE_URL}/category`, {
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
