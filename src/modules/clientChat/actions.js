import adminChat from './types';
const actions = {
  getClientChats: {
    request: data => {
      return { type: adminChat.getClientChats.request, payload: data };
    },
    success: data => {
      return { type: adminChat.getClientChats.success, payload: data };
    },
    failure: error => {
      return { type: adminChat.getClientChats.failure, payload: error };
    },
  },

  setReceiverInfo: {
    request: data => {
      return { type: adminChat.setReceiverInfo.request, payload: data };
    },
    success: data => {
      return { type: adminChat.setReceiverInfo.success, payload: data };
    },
    failure: error => {
      return { type: adminChat.setReceiverInfo.failure, payload: error };
    },
  },
  setReceiverEmail: {
    request: data => {
      return { type: adminChat.setReceiverEmail.request, payload: data };
    },
    success: data => {
      return { type: adminChat.setReceiverEmail.success, payload: data };
    },
    failure: error => {
      return { type: adminChat.setReceiverEmail.failure, payload: error };
    },
  },
};
export default actions;
