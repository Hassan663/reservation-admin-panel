import { Card, Table } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Space, Select, Menu, Dropdown, Input } from 'antd';
import { Button, Search } from 'components/Common';
import { SyncOutlined } from '@ant-design/icons';
import './AddTable.scss';
export const AddTable = props => {
  const { Option } = Select;
  const { Search } = Input;
  const { content, columns, data, handleSearch, handleOnChange, ...rest } = props;
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
  return (
    <Card
      shape="square"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
      {...rest}
    >
      {content}
      <div className="body">
        <div
          className="items"
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-Between' }}
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
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button className="btn_export">Export</Button>
              </Dropdown>
            </Space>

            <SyncOutlined style={{ fontWeight: 'bold', paddingLeft: '10px' }} />
          </div>
          <Search
            onChange={handleOnChange}
            onPressEnter={handleSearch}
            placeholder="Search..."
            style={{ width: 200 }}
          />
        </div>
        <Table columns={columns} dataSource={data} style={{ backgroundColor: 'white' }} />
      </div>
    </Card>
  );
};
AddTable.PropTypes = {
  content: PropTypes.node,
  extra: PropTypes.node,
};
export default AddTable;
