import PropTypes from 'prop-types';
import { MainMenu, ProfileMenu, SideBar, Navbar } from './components';
const { Content } = Layout;
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Badge, Avatar, List, Typography, Card, Dropdown } from 'antd';
import { SideBarData, subSidebarData } from '../Main/components/SideBar/SideBarData';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LeftOutlined,
  PoweroffOutlined,
  SettingOutlined,
  PhoneOutlined,
  ExportOutlined,
  CloseSquareFilled,
  DownOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/nestAdmin360.png';
import HeaderIcons from './components/SideBar/HeaderIcons/HeaderIcons';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Main.scss';

import { ORIGIN } from 'constants/config/config.dev';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationContainer, NotificationManager } from 'react-notifications';

const Main = props => {
  let user = localStorage.getItem('userloggedin');
  const currentURL = window.location.href;
  const word = currentURL.split('/');
  const location = useLocation();
  const { children, CompToRender, allowedRoles, type, ...rest } = props;
  const { SubMenu } = Menu;
  const { Header, Sider, Content } = Layout;
  const refValue = useRef(null);
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ID = location.state;
  const id = localStorage.getItem('customer');

  useEffect(() => {
    if (id) {
      dispatch(customerActions.getCustomer.request(id));
    }
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem(`${ORIGIN}_user`)) {
      localStorage.setItem(
        'userloggedin',
        JSON.parse(localStorage.getItem(`${ORIGIN}_user`)).user.email
      );
    }
    if (localStorage.getItem('userloggedin')) {
      createUser(localStorage.getItem('userloggedin'));
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Typography>
          <ExportOutlined></ExportOutlined> Login as client
        </Typography>
      </Menu.Item>
      <Menu.Item key="1">
        <Typography style={{ color: 'red' }}>
          <CloseSquareFilled style={{ color: 'red' }}></CloseSquareFilled> Delete
        </Typography>
      </Menu.Item>
    </Menu>
  );

  const handleOpenChange = () => {
    setOpen(true);
  };
  const handleCloseChange = () => {
    setOpen(false);
  };
  const handleSideClick = () => {
    setSide(false);
  };
  const handleSideArrow = () => {
    setSide(true);
  };
  const handleClick = () => {
    navigate('/dashboard/departments');
  };
  const handleClickInvoice = () => {
    navigate('/dashboard/invoices');
  };
  const handleClickPayments = () => {
    navigate('/dashboard/payments');
  };
  const handleClickCreditNotes = () => {
    navigate('/dashboard/credit_notes');
  };
  const handleClickCustomer = () => {
    navigate('/dashboard/customers');
  };
  const handleStaffClick = () => {
    navigate('/dashboard/staff');
  };
  const collapseHandle = () => {
    setSide(true);
    setOpen(false);
    return side;
  };
  const userPermission = [];

  let updatedSideBarDataN = SideBarData.filter(
    obj => obj.name !== 'Customers' && obj.name !== 'Contracts' && obj.name !== 'Knowledge Base'
  );

  const newUpdatedSideBarData = [...updatedSideBarDataN];

  return (
    <div className="main-header-wrapper">
      <Layout>
        {side ? (
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
                Welcome Bilal
                <PoweroffOutlined style={{ marginLeft: '80px' }}></PoweroffOutlined>
              </Menu.Item>
              {newUpdatedSideBarData?.map(obj => (
                <Menu.Item key={obj.key} icon={obj.icon}>
                  <Link to={obj.path}>
                    <span>{obj.name}</span>
                  </Link>
                </Menu.Item>
              ))}

              <Menu.Item
                key={22}
                onClick={handleSideClick}
                icon={<SettingOutlined></SettingOutlined>}
              >
                <span>Setup</span>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          <Sider
            theme="light"
            width={'268px'}
            collapsible
            className="sider"
            collapsed={open}
            onCollapse={collapseHandle}
            collapsedWidth={'0px'}
            trigger={null}
          >
            <div className="leftArrow">
              <Badge size={'small'}>
                <Avatar
                  shape="circle"
                  onClick={handleSideArrow}
                  style={{ backgroundColor: '#764abc ' }}
                  icon={<LeftOutlined style={{ color: 'white' }} className="headerBtn" />}
                  size="small"
                ></Avatar>
              </Badge>
            </div>

            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" onClick={handleStaffClick}>
                Staff
              </Menu.Item>
              <SubMenu key="sub1" title="Support">
                <Menu.Item key="2" onClick={handleClick}>
                  Departments
                </Menu.Item>
              </SubMenu>
              {subSidebarData.map(obj => (
                <Menu.Item key={obj.key} icon={obj.icon}>
                  <Link to={obj.path}>
                    <span>{obj.name}</span>
                  </Link>
                </Menu.Item>
              ))}
              <SubMenu key="sub2" title="Clipper Setup">
                {ClipperSideBarData.map(obj => (
                  <Menu.Item key={obj.key} icon={obj.icon}>
                    <Link to={obj.path}>
                      <span>{obj.name}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
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
                  <img
                    style={{ height: '45px', width: '70px', marginLeft: '30px' }}
                    src={logo}
                  ></img>
                </div>
                <div className="headerRight">
                  <HeaderIcons></HeaderIcons>
                </div>
              </div>
            </Header>
            <div className="content-wrapper">
              {type === 'parent' ? (
                <Content>{children}</Content>
              ) : type === 'child' ? (
                <Content>
                  <>
                    <div className="main_div">
                      <div>
                        <Card
                          shape="square"
                          style={{
                            width: '243px',
                            display: 'flex',
                            alignItems: 'center',
                            height: '65px',
                            boxShadow: '0px 0px 5px  #e3e3e3',
                            backgroundColor: 'white',
                          }}
                        >
                          <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                            <Typography>
                              {customer?.company}
                              <DownOutlined></DownOutlined>
                            </Typography>
                          </Dropdown>
                        </Card>
                        <div className="leftBar">
                          <Menu style={{ color: '#764abc' }} mode="inline">
                            {ClientSideBarData.map(obj => (
                              <Menu.Item className="menu_item" key={obj.key} icon={obj.icon}>
                                <span
                                  onClick={() => {
                                    navigate(`${obj.path}`, { state: ID });
                                  }}
                                >
                                  <span>{obj.name}</span>
                                </span>
                              </Menu.Item>
                            ))}
                          </Menu>
                        </div>
                      </div>
                      <div className="content">{children}</div>
                    </div>
                  </>
                </Content>
              ) : type === 'subChild' ? (
                <Content>
                  <div className="main_div">
                    <div className="leftBar">
                      <Menu style={{ color: '#764abc' }} mode="inline">
                        {SettingSideBarData.map(obj => (
                          <Menu.Item className="menu_item" key={obj.key} icon={obj.icon}>
                            <Link to={obj.path}>
                              <span>{obj.name}</span>
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu>
                    </div>

                    <div className="content">{children}</div>
                  </div>
                </Content>
              ) : (
                'null'
              )}
            </div>
          </div>
        </Layout>
      </Layout>
      <NotificationContainer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
