const host = window.location.origin;
export const USERS_BASE_URL = 'http://144.126.210.239:8000';
export const ORIGIN = host;
const socket_URL = host.replace(':3000', '');
export const SOCKET_URL = `${socket_URL}:8000`;
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
