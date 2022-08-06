import React from 'react';
import { Avatar, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Search.scss';

const Search = () => {
  const { Search } = Input;
  return (
    <div className="search">
      <Input
        bordered={false}
        placeholder="Search..."
        style={{
          marginRight: '30px',
          width: 300,
          backgroundColor: 'rgb(245 243 243)',
          color: 'black',
        }}
      />
      <Avatar
        style={{ backgroundColor: 'rgb(245 243 243)', marginRight: '10px' }}
        color={'grey'}
        icon={<SearchOutlined style={{ color: '#764abc' }} />}
        size="large"
      ></Avatar>
    </div>
  );
};

export default Search;
