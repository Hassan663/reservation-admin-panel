import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MainMenuRoutes } from 'constants/routes';
import AclService from 'services/acl';
import { Dropdown } from 'antd';
import menu from './SettingMenu';
import './Mainmenu.scss';

import {
  SearchOutlined,
  UnorderedListOutlined,
  BarChartOutlined,
  CopyOutlined,
  GlobalOutlined,
  SettingOutlined,
  ScissorOutlined,
  MessageOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Dashboard } from 'assets/icons';
const icons = [
  <GlobalOutlined />,
  <GlobalOutlined />,
  <ScissorOutlined />,
  <BarChartOutlined />,
  <UnorderedListOutlined />,
  <SearchOutlined />,
  <CopyOutlined />,
  <Dashboard width="14" height="14" style={{ marginRight: '10px' }} />,
  <SettingOutlined />,
  <MessageOutlined />,
  <BookOutlined />,
];

const MainMenu = ({ match }) => {
  const [current, setCurrent] = useState('');
  // const user = useSelector(state => state.authReducer.user);

  const aclService = new AclService('admin');
  console.log({ match });
  return (
    <Menu
      onClick={e => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      className="ims-main-menu"
      style={{ minWidth: '75%' }}
    >
      {MainMenuRoutes.map((route, i) => {
        const classes = [];
        const isActive = route.route == '/dashboard';

        !aclService.hasPermission() && classes.push('disable');
        isActive && classes.push('active');

        return (
          <Menu.Item key={i} className={classes.join(' ')}>
            {route.label === 'Settings' ? (
              <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" arrow>
                <Link to={route.route}>
                  {icons[i]} {route.label}
                </Link>
              </Dropdown>
            ) : (
              <Link to={route.route}>
                {' '}
                {icons[i]} {route.label}{' '}
              </Link>
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default MainMenu;
