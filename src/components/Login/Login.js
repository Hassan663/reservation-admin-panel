import React from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              // src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              src="https://w0.peakpx.com/wallpaper/1019/191/HD-wallpaper-restaurant-and-bar-with-gorgeous-view-city-restaurant-view-bar.jpg"
              alt="Login"
            />
          </div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p>Login to the Restaurant Reservation Admin Panel</p>
            <Form.Item
              name="username"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="login-form-button">
                LOGIN
              </Button>
            </Form.Item>
            <span>
              Don't have an account?{' '}
              <span className="signUp-span" onClick={() => navigate('/SignUp')}>
                Sign up
              </span>
            </span>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
