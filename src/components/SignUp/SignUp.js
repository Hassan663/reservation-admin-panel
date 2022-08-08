import React from 'react';
import './SignUp.scss';
import { Form, Input, Checkbox, Button } from 'antd';

const SignUp = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signUp-wrapper">
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              src="https://media.istockphoto.com/photos/fine-dining-table-for-two-restaurant-dinner-salmon-fish-seafood-picture-id157337370?k=20&m=157337370&s=612x612&w=0&h=PNOA6LC-kgX6W5KWTN2DNkPGiCjW7MAuK9acEsFR2CI="
              alt="SignUp"
            />
          </div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Sign Up</p>
            <p> Restaurant Reservation Admin Panel</p>
            <Form.Item
              name="username"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your username or email!' }]}
            >
              <Input placeholder="Username / E-mail" />
            </Form.Item>
            <Form.Item
              name="fullname"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please enter your full name!' }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item
              name="mobileNo"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please enter your Phone Number!' }]}
            >
              <Input placeholder="Mobile Phone No." type="number" />
            </Form.Item>
            <Form.Item
              name="password"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="retypepassword"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your password again!' }]}
            >
              <Input.Password placeholder="Re Enter Password" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="login-form-button">
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
