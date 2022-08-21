import AdminChat from './types';

const Actions = {
  setEndUserEmailId: {
    request: data => {
      return { type: AdminChat.setEndUserEmailId.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.setEndUserEmailId.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.setEndUserEmailId.failure, payload: error };
    },
  },
  sendNotification: {
    request: data => {
      return { type: AdminChat.sendNotification.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.sendNotification.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.sendNotification.success, payload: error };
    },
  },
  getcurrentGroupUsersIds: {
    request: data => {
      return { type: AdminChat.getcurrentGroupUsersIds.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getcurrentGroupUsersIds.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getcurrentGroupUsersIds.failure, payload: error };
    },
  },
  addToken: {
    request: data => {
      return { type: AdminChat.addToken.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.addToken.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.addToken.failure, payload: error };
    },
  },
  getSingleUserToken: {
    request: data => {
      return { type: AdminChat.getSingleUserToken.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getSingleUserToken.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getSingleUserToken.failure, payload: error };
    },
  },
  getMultiUserToken: {
    request: data => {
      return { type: AdminChat.getMultiUserToken.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getMultiUserToken.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getMultiUserToken.failure, payload: error };
    },
  },
  deleteToken: {
    request: data => {
      return { type: AdminChat.deleteToken.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.deleteToken.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.deleteToken.request, payload: error };
    },
  },

  updateGroup: {
    request: data => {
      return { type: AdminChat.updateGroup.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.updateGroup.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.updateGroup.failure, payload: error };
    },
  },
  addMembers: {
    request: data => {
      return { type: AdminChat.addMembers.request, payload: data };
    },
    sucess: data => {
      return { type: AdminChat.addMembers.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.addMembers.failure, payload: error };
    },
  },
  deleteGroup: {
    request: data => {
      return { type: AdminChat.deleteGroup.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.deleteGroup.success, payload: data };
    },

    failure: error => {
      return { type: AdminChat.deleteGroup.failure, payload: error };
    },
  },

  getGroupWithId: {
    request: data => {
      return { type: AdminChat.getGroupWithId.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getGroupWithId.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getGroupWithId.failure, payload: error };
    },
  },
  getAdminChats: {
    request: data => {
      return { type: AdminChat.getAdminChats.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getAdminChats.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getAdminChats.failure, payload: error };
    },
  },
  setReceiverInfo: {
    request: data => {
      return { type: AdminChat.setReceiverInfo.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.setReceiverInfo.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.setReceiverInfo.failure, payload: error };
    },
  },
  setReceiverEmail: {
    request: data => {
      return { type: AdminChat.setReceiverEmail.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.setReceiverEmail.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.setReceiverEmail.failure, payload: error };
    },
  },
  getOnlineMembers: {
    request: data => {
      return { type: AdminChat.getOnlineUsers.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getOnlineUsers.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getOnlineUsers.failure, payload: error };
    },
  },
  getAllGroups: {
    request: data => {
      return { type: AdminChat.getAllGroups.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.getAllGroups.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.getAllGroups.failure, payload: data };
    },
  },
  createGroup: {
    request: data => {
      return { type: AdminChat.createGroup.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.createGroup.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.createGroup.failure, payload: data };
    },
  },
  createOnetoOneConnection: {
    request: data => {
      return { type: AdminChat.createOnetoOneConnection.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.createOnetoOneConnection.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.checkUserConnection.failure, payload: data };
    },
  },
  checkUserConnection: {
    request: data => {
      return { type: AdminChat.checkUserConnection.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.checkUserConnection.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.checkUserConnection.failure, payload: data };
    },
  },
  setconnectionId: {
    request: data => {
      return { type: AdminChat.setconnectionId.request, payload: data };
    },
    success: data => {
      return { type: AdminChat.setconnectionId.success, payload: data };
    },
    failure: error => {
      return { type: AdminChat.setconnectionId.failure, payload: data };
    },
  },
};
export default Actions;
