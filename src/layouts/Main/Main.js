import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Typography, Drawer } from 'antd';
import { SideBarData, subSidebarData } from '../Main/components/SideBar/SideBarData';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  ExportOutlined,
  CloseSquareFilled,
} from '@ant-design/icons';
import logo from '../../assets/images/nestAdmin360.png';
import HeaderIcons from './components/SideBar/HeaderIcons/HeaderIcons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Main.scss';
import { ORIGIN } from 'constants/config/config.dev';
import { NotificationContainer } from 'react-notifications';
import ClientChat from 'components/ClientChat';
const Main = props => {
  const currentURL = window.location.href;
  const word = currentURL.split('/');
  const location = useLocation();
  const { children, CompToRender, allowedRoles, type, ...rest } = props;
  const { SubMenu } = Menu;
  const { Header, Sider, Content } = Layout;
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState(true);
  const [showChat, setShowChat] = useState(true);
  useEffect(() => {
    if (localStorage.getItem(`${ORIGIN}_user`)) {
      localStorage.setItem(
        'userloggedin',
        JSON.parse(localStorage.getItem(`${ORIGIN}_user`)).user.email
      );
    }
    if (localStorage.getItem('userloggedin')) {
      // createUser(localStorage.getItem('userloggedin'));
    }
  }, []);

  const handleOpenChange = () => {
    setOpen(true);
  };
  const handleCloseChange = () => {
    setOpen(false);
  };

  let updatedSideBarDataN = SideBarData.filter(
    obj => obj.name !== 'Customers' && obj.name !== 'Contracts' && obj.name !== 'Knowledge Base'
  );

  const newUpdatedSideBarData = [...updatedSideBarDataN];

  return (
    <div className="main-header-wrapper">
      <Layout>
        {side && (
          <Sider
            className="sider"
            trigger={null}
            width={'268px'}
            theme="light"
            collapsible
            collapsed={open}
            collapsedWidth={'0px'}
          >
            <Menu style={{ color: '#764abc' }} mode="inline">
              <Menu.Item key="24">
                Admin Panel
                {/* <PoweroffOutlined style={{ marginLeft: '80px' }}></PoweroffOutlined> */}
              </Menu.Item>
              {newUpdatedSideBarData?.map(obj => (
                <Menu.Item key={obj.key} icon={obj.icon}>
                  <Link to={obj.path}>
                    <span>{obj.name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
        )}

        <Layout>
          <div className="Wrapper">
            <Header style={{ backgroundColor: 'white', alignItems: 'flex-start' }}>
              <div className="header">
                <div className="headerLeft">
                  {open ? (
                    <MenuUnfoldOutlined onClick={handleCloseChange} />
                  ) : (
                    <MenuFoldOutlined onClick={handleOpenChange} />
                  )}
                  {/* <img
                    style={{ height: '45px', width: '70px', marginLeft: '30px' }}
                    src={logo}
                  ></img> */}
                </div>
                <div className="headerRight">
                  <HeaderIcons showChat={showChat} setShowChat={setShowChat}></HeaderIcons>
                </div>
              </div>
            </Header>
            <div className="content-wrapper">
              <Content>{children}</Content>
            </div>
          </div>
        </Layout>
      </Layout>
      <div style={{ marginTop: '100px' }}>
        <Drawer
          placement={'right'}
          width={500}
          visible={showChat}
          height="200"
          closable={false}
          style={{ marginTop: '100px', height: '590px', padding: 'none' }}
        >
          <ClientChat showChat={showChat} setShowChat={setShowChat} />
        </Drawer>
      </div>
      <NotificationContainer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
