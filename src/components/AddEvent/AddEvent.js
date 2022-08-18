import { Form, Input, Button, Divider, InputNumber, message, Image } from 'antd';
import defaultLogo from '../../assets/images/hero-image.png';
import { Card } from 'components/Common';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddEvent.scss';
import Label from 'components/Common/Label';
import { useDispatch, useSelector } from 'react-redux';
import EventActions from 'modules/event/actions';
export const AddProduct = () => {
  const dispatch = useDispatch();
  const initialvalues = {
    title: '',
    description: '',

    phone: '',
    photoPath: '',
    photoPathName: '',
  };
  const refValue = useRef(null);
  const [productdata, setProductData] = useState(initialvalues);
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const handleChange = event => {
    const { name, value } = event.target;
    setProductData({ ...productdata, [name]: value });
  };
  const handleChangeHourlyRate = event => {
    setProductData({ ...productdata, price: event });
  };

  const handleChangePhoto = event => {
    console.log('eventFile', event.target.files[0]);
    const file = event.target.files[0];
    var errSize = 'Max File Limit is 3MB';
    var errType = 'Invalid File Type';

    if (file.size > 3072 * 1000) {
      window.alert(errSize);
    } else if (
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png'
    ) {
      window.alert(errType);
    } else {
      setProductData({
        ...productdata,
        photoPath: event.target.files[0],
        photoPathName: event.target.files[0].name,
      });
      setFile(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };
  const handleSubmit = () => {
    const formData = new FormData();
    // formData.append('name', productdata.name);
    formData.append('title', productdata.title);
    formData.append('description', productdata.description);
    formData.append('fileName', productdata.photoPathName);
    formData.append('file', productdata.photoPath);
    // formData.append('price', productdata.price);

    for (var pair of formData.entries()) {
      console.log('Form Data.......... ', pair);
      // console.log(pair[0] + ': ' + pair[1]);
    }
    if (
      productdata.title &&
      productdata.description &&
      productdata.photoPathName &&
      productdata.photoPath
    ) {
      dispatch(EventActions.addEvent.request(formData));
      setProductData({
        ...productdata,

        title: '',
        description: '',
        photoPathName: '',
        photoPath: '',
      });
      //   dispatch(staffActions.addStaff.request(formData));
      //   navigate('/dashboard/staff');
    } else {
      message.error('kindly fill the form');
    }
  };

  console.log('productdata', productdata);

  return (
    <div className="profile-main">
      <Card
        style={{ width: '100%' }}
        content={
          <>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 100 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="form-main">
                <Label title="Title" required={true}></Label>
                <Input
                  name="title"
                  maxLength="20"
                  value={productdata.title}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />
                <Label title="Description" required={true}></Label>
                <Input
                  name="description"
                  maxLength="50"
                  value={productdata.description}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />
              </div>
              <Image
                style={{
                  height: '160px',
                  width: '160px',
                  border: 'solid 1px white',
                  borderRadius: '50%',
                }}
                src={file}
                fallback={defaultLogo}
                preview={false}
              />
              <Label title="Event Image"></Label>
              <input
                type="file"
                id="img"
                filename="photoPath"
                placeholder="Select Files"
                onChange={event => handleChangePhoto(event, 'photoPath')}
                style={{ display: 'none' }}
              ></input>
              <label
                for="img"
                style={{
                  width: '110px',
                  height: '30px',
                  backgroundColor: '#764ABC',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Upload Image
              </label>
              <span>{productdata.photoPathName}</span>
            </Form>
            <Button
              style={{
                backgroundColor: '#764abc',
                color: 'white',
                float: 'right',
                marginTop: '20px',
              }}
              onClick={handleSubmit}
            >
              Add Event
            </Button>
          </>
        }
      ></Card>
    </div>
  );
};
export default AddProduct;
