const initialState = {
  receiverinfo: {
    name: '',
    role: '',
    email: '',
    type: '',
  },
  chatOnlineUsers: [],
  groups: [],
  chats: [],
  userConnectionId: '',
  loading: false,
  error: false,
  currentGroup: {},
  endUserid: '',
  endUserEmail: '',
  myTokenId: '',
  endUserToken: [],
  multiEndUsersToken: [],
  currentGroupUsersIds: [],
};
import { getIds } from './utils';
import AdminChats from './types';
import { getOnlineUsersUsingRedux } from '../../components/commonActions/FirebaseActions';
function adminChat(state = initialState, action) {
  switch (action.type) {
    case AdminChats.getAdminChats.request:
    case AdminChats.getOnlineUsers.request:
    case AdminChats.getAllGroups.request:
    case AdminChats.createGroup.request:
    case AdminChats.createOnetoOneConnection.request:
    case AdminChats.checkUserConnection.request:
    case AdminChats.deleteGroup.request:
    case AdminChats.addMembers.request:
    case AdminChats.updateGroup.request:
    case AdminChats.addToken.request:
    // case AdminChats.getSingleUserToken.request:
    case AdminChats.getMultiUserToken.request:
      return { ...state, loading: true };
    case AdminChats.setEndUserEmailId.request:
      return {
        ...state,
        endUserid: action.payload.id,
        endUserEmail: action.payload.email,
        loading: false,
        error: false,
      };
    case AdminChats.getcurrentGroupUsersIds.request:
      return {
        ...state,
        currentGroupUsersIds: getIds(
          state.groups.filter(obj => obj._id === action.payload)?.[0]?.members
        ),

        loading: false,
        error: false,
      };
    case AdminChats.setconnectionId.request:
      return { ...state, userConnectionId: action.payload, loading: false, error: false };
    //

    case AdminChats.addToken.success:
      return { ...state, myTokenId: action.payload, loading: false, error: false };
    case AdminChats.getSingleUserToken.request:
      return {
        ...state,
        endUserid: action.payload,
        // endUserToken: action.payload.endUserToken,
        loading: false,
        error: false,
      };
    case AdminChats.getMultiUserToken.success:
      return {
        ...state,
        multiEndUsersToken: action.payload.multiEndUsersToken,
        loading: false,
        error: false,
      };
    case AdminChats.updateGroup.success:
    case AdminChats.addMembers.success:
      return {
        ...state,
        groups: [
          ...state.groups.map(group => {
            if (group._id === action.payload._id) {
              return action.payload;
            } else return group;
          }),
        ],
        loading: false,
        error: false,
      };
    case AdminChats.deleteGroup.success:
      return {
        ...state,
        groups: state.groups.filter(obj => obj._id !== action.payload),
        loading: false,
        error: false,
      };
    case AdminChats.getGroupWithId.request:
      return {
        ...state,
        currentGroup: state.groups.filter(obj => obj._id === action.payload)?.[0], // to get element with id
        loading: false,
        error: false,
      };
    case AdminChats.getAdminChats.success:
      return { ...state, chats: [...action.payload], loading: false, error: false };
    // case AdminChats.setReceiverInfo.success:
    //   return { ...state, receiverinfo: action.payload, loading: false, error: false };
    case AdminChats.setReceiverInfo.request:
      return { ...state, receiverinfo: { ...action.payload }, loading: false, error: false };
    // case AdminChats.setReceiverEmail.success:
    //   return { ...state, loading: false, error: false };

    case AdminChats.getOnlineUsers.success:
      return { ...state, onlineUsers: [...action.payload], loading: false, error: false };

    case AdminChats.getAllGroups.success:
      return { ...state, groups: [...action.payload], loading: false, error: false };

    case AdminChats.createGroup.success:
      return { ...state, groups: [...state.groups, action.payload], loading: false, error: false };
    case AdminChats.addToken.failure: {
      return { ...state, loading: false, error: false };
    }
    // case AdminChats.createOnetoOneConnection.success:
    //   return { ...state, userConnectionId: action.payload, loading: false, error: false };

    case AdminChats.checkUserConnection.success:
      return { ...state, userConnectionId: action.payload, loading: false, error: false };
    case AdminChats.getAdminChats.failure:
    case AdminChats.setReceiverInfo.failure:
    case AdminChats.setReceiverEmail.failure:
    case AdminChats.getOnlineUsers.failure:
    case AdminChats.createGroup.failure:
    case AdminChats.getAllGroups.failure:
    case AdminChats.createOnetoOneConnection.failure:
    case AdminChats.checkUserConnection.failure:
    case AdminChats.deleteGroup.failure:
    case AdminChats.addToken.failure:
    case AdminChats.getSingleUserToken.failure:
    case AdminChats.getMultiUserToken.failure:
      return { ...state, loading: false, error: action.payload };
    case '':
      return state;
    case '':
      return state;
    case '':
      return state;
    case '':
      return state;
    case '':
      return state;
    case '':
      return state;
    case '':
      return state;
    case '':
      return state;
    default:
      return state;
  }
}
export default adminChat;
