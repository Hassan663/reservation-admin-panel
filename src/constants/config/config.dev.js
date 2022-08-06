// Qasim Backend
// export const USERS_BASE_URL = 'http://192.168.100.202:8000';
const host = window.location.origin;
//Dev backend
// export const USERS_BASE_URL = 'http://192.168.0.239:8000';*
// Muneeb backend
export const USERS_BASE_URL = 'http://192.168.100.11:8000';

export const ORIGIN = host;
console.log(host);
const socket_URL = host.replace(':3033', '');
export const SOCKET_URL = `${socket_URL}:8000`;
// export const SOCKET_URL = `${socket_URL}:8080`;
// export const ORIGIN = 'http://localhost:3030';
// export const SOCKET_URL = 'http://localhost:8080';
// export const ORIGIN = 'http://192.168.100.220:3033';
// export const ORIGIN = 'http://192.168.100.141:3033';
// export const ORIGIN = 'http://localhost:3033';

export const ENV = 'dev';

export const NavRoutes = [
  {
    name: 'MENU',
    route: 'mainPage',
  },
  {
    name: 'LOG OUT',
    route: '/Login',
  },
];
