import React, { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Avatar, List } from 'antd';
import { SideBarData, subSidebarData } from './SideBarData';
import PropTypes from 'prop-types';
import './SideBar.scss';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LeftOutlined,
  PoweroffOutlined,
  SettingOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import logo from 'assets/images/nestAdmin360.png';
import HeaderIcons from './HeaderIcons/HeaderIcons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ORIGIN } from 'constants/config';
const SideBar = () => {
  const customerId = JSON.parse(localStorage.getItem(`${ORIGIN}_uid`));
  const dispatch = useDispatch();
  const { SubMenu } = Menu;
  const { Header, Sider, Content } = Layout;
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState(true);
  const navigate = useNavigate();
  const handleOpenChange = () => {
    setOpen(true);
  };
  const { staff } = useSelector(state => state.staffsReducer);
  useEffect(() => {
    dispatch(staffActions.getStaff.request(customerId));
  }, []);

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

  const host = window.location.origin;
  const unSetSessionCookies = () => {
    window.localStorage.removeItem(`${host}_user`);
    window.localStorage.removeItem(`${host}_uid`);
    window.localStorage.removeItem(`${host}_token`);
  };
  const handleLogout = () => {
    unSetSessionCookies();
    navigate('/admin/login');
  };
  return (
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
              Welcome {staff?.firstName}
              <PoweroffOutlined
                style={{ marginLeft: '80px' }}
                onClick={handleLogout}
              ></PoweroffOutlined>
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
          </Menu>
        </Sider>
      )}

      <Layout>
        <div className="Wrapper">
          <Header style={{ backgroundColor: 'white', alignItems: 'flex-start' }}>
            <div className="header">
              <div className="header_main_Left">
                {open ? (
                  <MenuUnfoldOutlined onClick={handleCloseChange} />
                ) : (
                  <MenuFoldOutlined onClick={handleOpenChange} />
                )}
                <img style={{ height: '45px', width: '70px', marginLeft: '30px' }} src={logo}></img>
              </div>
              <div className="header_main_Right">
                <HeaderIcons></HeaderIcons>
              </div>
            </div>
          </Header>
          <div style={{ padding: '0px' }} className="content-wrapper">
            <Content>
              <Outlet></Outlet>
            </Content>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};
export default SideBar;
