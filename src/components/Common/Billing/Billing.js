import React from 'react';
import { Divider, Form, Input, Select, Typography } from 'antd';
import './Billing.scss';
export const Billing = () => {
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
          <div className="billing_labels">
            <Typography style={{ fontSize: '18px' }}>Billing Address</Typography>
            <Typography style={{ color: '#656565', fontSize: '11px' }}>
              Same as Customer Info
            </Typography>
          </div>

          <Divider></Divider>
          <Form.Item label="Street" name="Street">
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
          <Select className="select_field" getPopupContainer={trigger => trigger.parentNode} placeholder="Select Country">
            <Option value="default">Systems Default</Option>
            <Option value="china">LTR</Option>
            <Option value="usa">RTL</Option>
          </Select>
        </div>
        <div className="form_box_right">
          <div className="billing_labels">
            <Typography style={{ fontSize: '18px' }}> Shipping Address</Typography>
            <Typography style={{ color: '#656565', fontSize: '11px' }}>
              Copy Billing Address
            </Typography>
          </div>
          <Divider></Divider>
          <Form.Item label="Street" name="Street">
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
export default Billing;
