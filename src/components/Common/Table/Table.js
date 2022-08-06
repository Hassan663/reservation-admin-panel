import { Table } from 'antd';

import './Table.scss';

const IMSTable = ({ columns, data, pagination, loading, handleTableChange, variant, ...rest }) => (
  <div className={`table-container ${variant}`}>
    <Table
      columns={columns}
      rowKey={record => record.key}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      {...rest}
      style={{ fontSize: '12px', width: '100%' }}
    />
  </div>
);

export default IMSTable;
