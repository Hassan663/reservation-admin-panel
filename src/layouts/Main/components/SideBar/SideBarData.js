import {
  HomeFilled,
  ShopFilled,
  NotificationFilled,
  CopyFilled,
  SlidersFilled,
  CheckSquareFilled,
  ClockCircleFilled,
  WechatFilled,
} from '@ant-design/icons';
export const SideBarData = [
  {
    path: '/addProduct',
    cName: 'list-text',
    name: 'Add Product',
    key: '2',
    icon: <ShopFilled />,
  },
  {
    path: '/addEvent',
    cName: 'list-text',
    name: 'Add Event',
    key: '2',
    icon: <NotificationFilled />,
  },
  { path: '/addBlog', cName: 'list-text', name: 'Add Blog', key: '2', icon: <CopyFilled /> },
  {
    path: '/addCategory',
    cName: 'list-text',
    name: 'Add Category',
    key: '2',
    icon: <SlidersFilled />,
  },
  {
    path: '/bookings',
    cName: 'list-text',
    name: 'Bookings',
    key: '2',
    icon: <CheckSquareFilled />,
  },
  {
    path: '/bookingSlots',
    cName: 'list-text',
    name: 'Booking Slots',
    key: '2',
    icon: <ClockCircleFilled />,
  },
  { path: '/adminChat', cName: 'list-text', name: 'Chat', key: '2', icon: <WechatFilled /> },
];
export const subSidebarData = [
  { path: '/dashboard/roles', cName: 'list-text', name: 'Roles', key: '8' },
  { path: '/dashboard/settings/general', cName: 'list-text', name: 'Setting', key: '9' },
];
