import React, { useEffect, useState } from 'react';
import './AddCategory.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'components/Common';
import categoryActions from 'modules/category/actions';
import { Form, Input, Button, Table } from 'antd';

export const AddCategory = () => {
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector(state => state.categoryReducer);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(categoryActions.getCategory.request());
  }, []);

  useEffect(() => {
    setCategories([...category]);
  }, [category]);

  const onFinish = categories => {
    const { name } = categories;
    dispatch(categoryActions.addCategory.request({ name }));
    name = '';
  };

  const handleDeleteCategory = id => {
    dispatch(categoryActions.deleteCategory.request(id));
  };

  const columns = [
    {
      title: 'Categories',
      align: 'left',
      dataIndex: 'name',
      key: 'name',
      sort: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
      render: (text, record) => {
        return <div className="name_contacts">{record.name}</div>;
      },
    },
    {
      title: 'Options',
      align: 'left',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => {
        return (
          <div id="a" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <a style={{ color: 'red' }} onClick={() => handleDeleteCategory(record.id)}>
              {' '}
              Delete
            </a>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <Card
          style={{ width: '100%' }}
          content={
            <>
              <Form
                name="category-form"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 100 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <p className="form-title">Product Category</p>
                <Form.Item name="name" style={{ marginBottom: '10px' }}>
                  <Input placeholder="category" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className="product-btn" loading={loading}>
                    Add Category
                  </Button>
                </Form.Item>
              </Form>
            </>
          }
        ></Card>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Card
          style={{ width: '100%' }}
          content={
            <>
              <Table columns={columns} dataSource={categories}></Table>
            </>
          }
        ></Card>
      </div>
    </>
  );
};
export default AddCategory;
