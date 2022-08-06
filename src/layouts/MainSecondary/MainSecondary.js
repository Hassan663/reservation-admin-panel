import PropTypes from 'prop-types';
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
import HeaderIcons from '../../layouts/Main/components/SideBar/HeaderIcons/HeaderIcons';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import '../Main/Main.scss';
import { findUser, createUser } from '../../components/commonActions/FirebaseActions/index';
import customerActions from 'modules/customers/actions';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ClientSideBarData } from 'components/Dashboard/Customers/Client/ClientLeftBarData';
import { Client } from 'components';
import { getUser } from 'modules/common/utils';
import { ClipperSideBarData } from 'components/Dashboard/ClipperSettings/ClipperSideBarData';
import { ORIGIN } from 'constants/config';
let user = localStorage.getItem('userloggedin');

const MainSecondary = props => {
  const currentURL = window.location.href;
  const word = currentURL.split('/');
  const PATHGET = word[word.length - 1];
  const { children, CompInner, allowedRoles, path } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const refValue = useRef(null);
  const navigate = useNavigate();
  const ID = location.state;
  const { customer } = useSelector(state => state.customersReducer);
  const id = localStorage.getItem('customer');

  useEffect(() => {
    dispatch(customerActions.getCustomer.request(id));
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
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

  const { SubMenu } = Menu;
  const { Header, Sider, Content } = Layout;
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('');
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
  return (
    <>
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
                {SideBarData.map(obj => (
                  <Menu.Item key={obj.key} icon={obj.icon}>
                    <Link to={obj.path}>
                      <span>{obj.name}</span>
                    </Link>
                  </Menu.Item>
                ))}
                <SubMenu key="sub2" icon={<PhoneOutlined></PhoneOutlined>} title="Sales">
                  <Menu.Item key="25" onClick={handleClickInvoice}>
                    Invoices
                  </Menu.Item>
                  <Menu.Item key="26" onClick={handleClickPayments}>
                    Payments
                  </Menu.Item>
                  <Menu.Item key="27" onClick={handleClickCreditNotes}>
                    Credit Notes
                  </Menu.Item>
                </SubMenu>
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
              </div>
            </div>
          </Layout>
        </Layout>
        {/* <SideBar></SideBar> */}
      </div>
    </>
  );
};

MainSecondary.propTypes = {
  children: PropTypes.element.isRequired,
};
export default MainSecondary;
