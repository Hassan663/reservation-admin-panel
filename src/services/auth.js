import axios from 'axios';
import { USERS_BASE_URL } from 'constants/config/config.dev';
const host = window.location.origin;
export const signup = payload => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/user/register`, payload, {
        headers: {
          'Content-Type': 'application/json',
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

export const signin = async ({ email, password, forced, isChecked, userType }) =>
  axios.post(`${USERS_BASE_URL}/auth/${userType}/login`, {
    email,
    password,
    forced,
    isChecked,
    userType,
  });

export const changePassword = payload => {
  console.log(payload);
  const { email, currentPassword, newPassword, confirmPassword } = payload;
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/admin/contact/resetPasswordByEmail`, {
        email,
        currentPassword,
        newPassword,
        confirmPassword,
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// export const forgotPassword = async ({ email }) =>
//   axios.post(`${USERS_BASE_URL}/auth/forgot-password`, { email });

export const forgotPassword = payload => {
  const { email } = payload;

  return new Promise((resolve, reject) => {
    // Receving Error : Reason Internal Error
    axios
      .post(`${USERS_BASE_URL}/contact/login/forgotPassword`, { email })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const signout = latest => {
  const refreshToken = localStorage.getItem(`${host}_tokens`);
  const token = JSON.parse(refreshToken).refresh.token;
  return new Promise((resolve, reject) => {
    axios
      .post(`${USERS_BASE_URL}/auth/logout`, { refreshToken: token, latest: latest })
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};
