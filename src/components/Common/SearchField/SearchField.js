import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './SearchField.scss';

const SearchField = ({ searchText, handleOnChange, handleSearch, ...rest }) => (
  <div className="main-search-fields-container">
    <div className="search-field">
      <Input
        size="large"
        value={searchText}
        onChange={handleOnChange}
        placeholder="Search Job"
        prefix={<SearchOutlined />}
        onPressEnter={handleSearch}
        {...rest}
      />
      <div className="bottom-border"></div>
    </div>
  </div>
);

export default SearchField;
