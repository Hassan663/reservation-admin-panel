import { Button, Form, Input, Typography } from 'antd';
import { SocketContext } from 'constants/context/socket';
import customerSupportActions from 'modules/customerSupport/actions';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Label from '../Label';
import './btnSupport.scss';
const btnSupport = ({ identification, headingBtn, data }) => {
  const stateRef = useRef(null);
  stateRef.current = 1;
  const customerId = localStorage.getItem('customer');
  const refValue = useRef();
  const [Color1, setColor1] = useState({ color1: '' });
  const socket = useContext(SocketContext);

  const [state, setState] = useState({
    btn1_status: {
      index: 2,
      color: 'white-btn',
    },
    btn2_status: { index: 2, color: 'white-btn' },
    btn3_status: { index: 2, color: 'white-btn' },
  });

  useEffect(() => {
    setState({
      btn1_status: {
        index: data?.btn1_status,
        color: data?.btn1_color,
      },
      btn2_status: { index: data?.btn2_status, color: data?.btn2_color },
      btn3_status: { index: data?.btn3_status, color: data?.btn3_color },
    });
  }, [data]);

  const ColorArr = ['green-btn', 'red-btn', 'white-btn', 'green-stoke-btn'];
  useEffect(() => {
    setBtnsColorData();
  }, [data]);

  const manageUpdate = value => {
    const val = state[value].index;
    if (val == 3) return 0;
    return val + 1;
  };

  const handleChangeColor = (val, e) => {
    setState(prev => ({
      ...prev,
      [val]: {
        index: manageUpdate(val),
        color: ColorArr[manageUpdate(val)],
      },
    }));

    // let key = e;
    // data = {
    //   btn1_label: Data?.btn1_label,
    //   btn1_status: state.btn1_status.index,
    //   btn1_color: state.btn1_status.color,
    //   btn2_label: Data?.btn2_label,
    //   btn2_status: state.btn2_status.index,
    //   btn2_color: state.btn2_status.color,
    //   btn3_label: Data?.btn3_label,
    //   btn3_status: state.btn3_status.index,
    //   btn3_color: state.btn3_status.color,
    //   heading: Data?.heading,
    // };

    // let newData = { [key]: data };

    // const Result = {
    //   id: customerId,
    //   data: newData,
    // };
    // console.log(e, 'save btn');
    // dispatch(customerSupportActions.updateCustomerSupport.request(Result));
    // socket.emit('SupportButtons');
  };
  const setBtnsColorData = () => {
    if (data?.btn1_status == 0) {
      setColor1({ ...Color1, color1: 'green-btn' });
    } else if (data?.btn1_status == 1) {
      setColor1({ ...Color1, color1: 'red-btn' });
    } else if (data?.btn1_status == 2) {
      setColor1({ ...Color1, color1: 'white-btn' });
    } else if (data?.btn1_status == 3) {
      setColor1({ ...Color1, color1: 'green-stoke-btn' });
    }
    if (data?.btn2_status === 0) {
      setColor1({ ...Color1, color1: 'green-btn' });
    } else if (data?.btn2_status === 1) {
      setColor1({ ...Color1, color1: 'red-btn' });
    } else if (data?.btn2_status === 2) {
      setColor1({ ...Color1, color1: 'white-btn' });
    } else if (data?.btn1_status == 3) {
      setColor1({ ...Color1, color1: 'green-stoke-btn' });
    }
    if (data?.btn3_status === 0) {
      setColor1({ ...Color1, color1: 'green-btn' });
    } else if (data?.btn3_status === 1) {
      setColor1({ ...Color1, color1: 'red-btn' });
    } else if (data?.btn3_status === 2) {
      setColor1({ ...Color1, color1: 'white-btn' });
    } else if (data?.btn1_status == 3) {
      setColor1({ ...Color1, color1: 'green-stoke-btn' });
    }
  };
  const dispatch = useDispatch();

  const [Data, setData] = useState({
    heading: '',
    btn1_label: '',
    btn2_label: '',
    btn3_label: '',
    btn1_color: '',
    btn2_color: '',
    btn3_color: '',
  });

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setData({ ...Data, [name]: value });
  };

  function handleSave(e) {
    let key = e;
    data = {
      btn1_label: Data?.btn1_label,
      btn1_status: state.btn1_status.index,
      btn1_color: state.btn1_status.color,
      btn2_label: Data?.btn2_label,
      btn2_status: state.btn2_status.index,
      btn2_color: state.btn2_status.color,
      btn3_label: Data?.btn3_label,
      btn3_status: state.btn3_status.index,
      btn3_color: state.btn3_status.color,
      heading: Data?.heading,
    };

    let newData = { [key]: data };

    const Result = {
      id: customerId,
      data: newData,
    };
    console.log(e, 'save btn');
    dispatch(customerSupportActions.updateCustomerSupport.request(Result));
    socket.emit('SupportButtons');
  }
  return (
    <>
      <div className="demo-nav">
        <Typography className="main_title">{Data?.heading}</Typography>
      </div>
      <Form
        className="form_box"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 100 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div className="form_box_left">
          <Label title="Heading"></Label>
          <Input
            name="heading"
            maxLength="10"
            value={Data?.heading}
            required
            ref={refValue}
            onChange={event => handleChange(event)}
          />
          <Label title="Button 2 Label"></Label>
          <Input
            name="btn2_label"
            maxLength="10"
            value={Data?.btn2_label}
            required
            ref={refValue}
            onChange={event => handleChange(event)}
          />
        </div>
        <div className="form_box_right">
          <Label title="Button 1 Label"></Label>
          <Input
            name="btn1_label"
            maxLength="10"
            value={Data?.btn1_label}
            required
            ref={refValue}
            onChange={event => handleChange(event)}
          />
          <Label title="Button 3 Label"></Label>
          <Input
            placeholder="Connected"
            name="btn3_label"
            maxLength="10"
            value={Data?.btn3_label}
            required
            ref={refValue}
            onChange={event => handleChange(event)}
          />
        </div>
      </Form>
      {/* <Button className="btn-save" type="primary" onClick={e => handleSave(identification)}>
        SAVE
      </Button> */}
      <div className="button-group">
        <Button
          size="large"
          className={state.btn1_status.color}
          onClick={e => handleChangeColor('btn1_status', identification)}
        >
          {data?.btn1_label}
        </Button>
        <Button
          size="large"
          className={state.btn2_status.color}
          onClick={e => handleChangeColor('btn2_status', identification)}
        >
          {data?.btn2_label}
        </Button>
        <Button
          size="large"
          className={state.btn3_status.color}
          onClick={e => handleChangeColor('btn3_status', identification)}
        >
          {data?.btn3_label}
        </Button>
      </div>
      <Button className="btn-save" type="primary" onClick={e => handleSave(identification)}>
        SAVE
      </Button>
    </>
  );
};

export default btnSupport;
// if (btnColor === 'white-btn') {
//   setBtnColor('green-btn');
// } else if (btnColor === 'green-btn') {
//   setBtnColor('red-btn');
// } else if (btnColor === 'red-btn') {
//   setBtnColor('white-btn');
// } else {
//   console.log('error');
// }
