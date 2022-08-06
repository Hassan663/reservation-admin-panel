import React from 'react';
import './CustomerDetails.scss';
import { Link, Outlet } from 'react-router-dom';
import { Form, Input, Select, Typography } from 'antd';
import { Card } from 'components/Common';
export const CustomerDetails = () => {
  const { TextArea } = Input;
  return (
    <>
      <Form
        className="form_box"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 100 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div className="form_box_left">
          <Form.Item
            label="Company"
            name="company"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Vat Number" name="vat number">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="Phone">
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="Website">
            <Input />
          </Form.Item>
          <Typography className="text_label_select">Groups</Typography>
          <Select className="select_field" getPopupContainer={trigger => trigger.parentNode} placeholder="Non Selected">
            <Option value="default">Systems Default</Option>
            <Option value="china">LTR</Option>
            <Option value="usa">RTL</Option>
          </Select>
          <Typography className="text_label_select">Currency</Typography>
          <Select className="select_field" getPopupContainer={trigger => trigger.parentNode} placeholder="System Default">
            <Option value="default">Systems Default</Option>
            <Option value="china">LTR</Option>
            <Option value="usa">RTL</Option>
          </Select>
        </div>
        <div className="form_box_right">
          <Form.Item label="Address" name="Address">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="City" name="City">
            <Input />
          </Form.Item>
          <Form.Item label="State" name="State">
            <Input />
          </Form.Item>
          <Form.Item label="Zip Code" name="Zip Code">
            <Input />
          </Form.Item>
          <Typography className="text_label_select">Country</Typography>
          <Select className="select_field" getPopupContainer={trigger => trigger.parentNode} placeholder="Selecr Country">
            <Option value="default">Systems Default</Option>
            <Option value="china">LTR</Option>
            <Option value="usa">RTL</Option>
          </Select>
        </div>
      </Form>
    </>
  );
};
export default CustomerDetails;
