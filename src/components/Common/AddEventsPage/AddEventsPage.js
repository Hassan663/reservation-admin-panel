import React, { useState } from 'react';
import { Divider, Space, Select, Menu, Dropdown, Input } from 'antd';
import { Card, Button, Table, PageNavigation } from 'components/Common';
const { Search } = Input;

import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { SyncOutlined, FormOutlined, CloseOutlined } from '@ant-design/icons';
import './AddEventsPage.scss';
import PropTypes from 'prop-types';
import e from 'cors';
const AddEventsPage = props => {
  const { content, btnText, btnFunction, columns, data, handleSearch, handleOnChange, ...rest } =
    props;

  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a>Pdf</a>
      </Menu.Item>
      <Menu.Item>
        <a>Excel</a>
      </Menu.Item>
      <Menu.Item>
        <a>Csv</a>
      </Menu.Item>
    </Menu>
  );
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
  };

  return (
    <div className="main_addEvent">
      <Card
        shape="square"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}
        content={
          <div className="body">
            {content}
            <Button onClick={btnFunction}>{btnText}</Button>
            <div
              className="items"
              // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-Between' }}
            >
              <div className="menu-button">
                <Select
                  labelInValue
                  defaultValue={{ key: '5' }}
                  getPopupContainer={trigger => trigger.parentNode}
                  onChange={handleChange}
                >
                  <Option value="5">5</Option>
                  <Option value="10">10</Option>
                  <Option value="25">25</Option>
                  <Option value="50">50</Option>
                  <Option value="100">100</Option>
                  <Option value="All">All</Option>
                </Select>

                <Space direction="vertical">
                  <Space>
                    <Dropdown overlay={menu} placement="bottomLeft">
                      <Button
                        style={{
                          backgroundColor: 'white',
                          border: 'none',
                          boxShadow: 'none',
                          fontWeight: 'normal',
                          paddingLeft: '30px',
                          width: '20px',
                          color: '#848484',
                        }}
                      >
                        Export
                      </Button>
                    </Dropdown>
                  </Space>
                </Space>

                <SyncOutlined style={{ fontWeight: 'bold', paddingLeft: '10px', margin:'5px' }} />
              </div>
              <Search
                onChange={handleOnChange}
                onPressEnter={handleSearch}
                placeholder="Search..."
                style={{ width: 200 }}
              />
            </div>

            <Table
              columns={columns}
              dataSource={data}
              style={{ backgroundColor: 'white' }}
            />
          </div>
        }
      ></Card>
    </div>
  );
};

export default AddEventsPage;
AddEventsPage.propTypes = {
  content: PropTypes.node,
};
