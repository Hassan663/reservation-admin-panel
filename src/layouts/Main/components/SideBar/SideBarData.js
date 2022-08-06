import { ORIGIN } from 'constants/config';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LeftOutlined,
  PoweroffOutlined,
  SettingOutlined,
  HomeFilled,
  UserOutlined,
  FileFilled,
  CalendarOutlined,
  UserAddOutlined,
  FolderOutlined,
  AreaChartOutlined,
  ContactsFilled,
  ReloadOutlined,
  PhoneOutlined,
  TagsFilled,
  MenuOutlined,
  MessageOutlined,
  DatabaseFilled,
  AppleFilled,
  TagFilled,
} from '@ant-design/icons';

const userPermission = JSON.parse(localStorage.getItem(`${ORIGIN}_user`))?.user?.permissions;
// console.log('userPermission');
export const SideBarData = [
  { path: '', cName: 'list-text', name: 'Dashboard', key: '1', icon: <HomeFilled /> },
  {
    path: '/dashboard/chat',
    cName: 'list-text',
    name: 'Chat',
    key: '2',
    icon: <MessageOutlined />,
  },
  {
    path: '/dashboard/customers',
    cName: 'list-text',
    name: 'Customers',
    key: '3',
    icon: <UserOutlined />,
  },

  {
    path: '/dashboard/contracts',
    cName: 'list-text',
    name: 'Contracts',
    key: '6',
    icon: <FileFilled />,
  },
  {
    path: '/dashboard/announcements',
    cName: 'list-text',
    name: 'Announcements',
    key: '19',
    icon: <FolderOutlined />,
  },
  {
    path: '/dashboard/knowledgebase',
    cName: 'list-text',
    name: 'Knowledge Base',
    key: '20',
    icon: <SettingOutlined />,
  },
  {
    path: '/dashboard/activity_logs',
    cName: 'list-text',
    name: 'Activity Logs',
    key: '21',
    icon: <AreaChartOutlined />,
  },
  {
    path: '/dashboard/email_templates',
    cName: 'list-text',
    name: 'Email templates',
    key: '23',
    icon: <AreaChartOutlined />,
  },
  {
    path: '/dashboard/support',
    cName: 'list-text',
    name: 'Support',
    key: '28',
    icon: <TagFilled />,
  },
];
export const subSidebarData = [
  { path: '/dashboard/roles', cName: 'list-text', name: 'Roles', key: '8' },
  { path: '/dashboard/settings/general', cName: 'list-text', name: 'Setting', key: '9' },
];
