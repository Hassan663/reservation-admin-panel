import React from 'react';
import './AddCategory.scss';
import { useDispatch } from 'react-redux';
import { Card } from 'components/Common';
import categoryActions from 'modules/category/actions';
import { Form, Input, Button } from 'antd';

export const AddCategory = () => {
  const dispatch = useDispatch();

  const onFinish = categories => {
    const { name } = categories;
    dispatch(categoryActions.addCategory.request({ name }));
  };
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
                  <Button htmlType="submit" className="product-btn">
                    Add Category
                  </Button>
                </Form.Item>
              </Form>
            </>
          }
        ></Card>
      </div>
    </>
  );
};
export default AddCategory;
