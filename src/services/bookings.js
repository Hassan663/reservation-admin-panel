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

export const cancelBookingsApi = (payload) => {
  const token = getTokens();
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/booking/user/cancel` ,{
        "bookingId": `${payload}`
    },{
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

export const approveBookingsApi = (payload) => {
  const token = getTokens();
  console.log(token,payload);
  return new Promise((resolve, reject) => {
    axios
      .patch(`${USERS_BASE_URL}/booking/approve/${payload}`,{},{
        headers: {
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