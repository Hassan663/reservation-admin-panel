import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config/config.dev';
import { getTokens } from 'modules/common/utils';

export const addSlotApi = slott => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/slot`, slott, {
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

export const getSlotApi = () => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .get(`${USERS_BASE_URL}/slot`, {
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

export const deleteSlotApi = slotId => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .delete(`${USERS_BASE_URL}/slot/${slotId}`, {
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

export const updateSlotApi = slotId => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .patch(`${USERS_BASE_URL}/slot/${slotId}`, {
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
