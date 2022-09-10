import React, { useEffect } from 'react';
import './SignUp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message as antMessage } from 'antd';
import { Form, Input, Button } from 'antd';
import authActions from 'modules/auth/actions';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signedUp = useSelector(state => state.authReducer.isSignedUp);

  useEffect(() => {
    if (signedUp) navigate('/login');
  }, [signedUp]);

    const onFinish = values => {
    const {confirmPassword, ...rest} = values;
    if(values.password !== confirmPassword)
    {
      antMessage.error("Password and Confirm Password are not the same");
    }
    else
    {
    dispatch(authActions.signup.request(rest));
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('User Registration Failed:', errorInfo);
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
            name="signup-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Sign Up</p>
            <p> Restaurant Reservation Admin Panel</p>
            <Form.Item
              name="firstName"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please enter your first name!' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>
            <Form.Item
              name="password"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              style={{ marginBottom: '10px' }}
              rules={[{ required: true, message: 'Please confirm your password again!' }]}
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
