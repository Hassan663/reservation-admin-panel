import { Form, Input, Button, Divider, InputNumber, message, Image } from 'antd';
import defaultLogo from '../../assets/images/hero-image.png';
import { Card } from 'components/Common';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddProduct.scss';
import Label from 'components/Common/Label';
import productActions from 'modules/product/actions';
import { useDispatch, useSelector } from 'react-redux';

export const AddProduct = () => {
  const dispatch = useDispatch();
  const initialvalues = {
    name: '',
    desc: '',
    price: 0,
    phone: '',
    productPicture: '',
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
        productPicture: event.target.files[0],
        productPictureName: event.target.files[0].name,
      });
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', productdata.name);
    formData.append('desc', productdata.desc);
    formData.append('price', productdata.price);
    formData.append('productPicture', productdata.productPicture);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    // if (productdata.name && productdata.title && productdata.desc && productdata.productPicture) {
      console.log('inside')
      dispatch(productActions.addProduct.request(formData));
      //   navigate('/dashboard/staff');
    // } else {
    //   message.error('kindly fill the form');
    // }
    console.log('chalingggg');
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
                <Label title="Name" required={true}></Label>
                <Input
                  name="name"
                  maxLength="20"
                  value={productdata.name}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />
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
                  name="desc"
                  maxLength="50"
                  value={productdata.desc}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />

                <Label title="Price"></Label>
                <InputNumber
                  style={{ width: '100%' }}
                  //   min={1}
                  //   initialValues={productdata.price}
                  name="price"
                  value={productdata.price}
                  required
                  //   ref={refValue}
                  onChange={event => handleChangeHourlyRate(event)}
                />
              </div>
              <Image
                style={{
                  height: '160px',
                  width: '160px',
                  border: 'solid 1px white',
                  borderRadius: '50%',
                  marginTop:'20px'

                }}
                src={file}
                fallback={defaultLogo}
                preview={false}
              />
              <Label title="Product Image"></Label>
              <input
                type="file"
                id="img"
                filename="productPicture"
                placeholder="Select Files"
                onChange={event => handleChangePhoto(event, 'productPicture')}
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
              <span>{productdata.productPictureName}</span>
            </Form>
            <Button
              style={{
                backgroundColor: '#764abc',
                color: 'white',
                float: 'right',
                marginTop: '20px',
              }}
              onClick={(e)=>handleSubmit(e)}
            >
              Add Product
            </Button>
          </>
        }
      ></Card>
    </div>
  );
};
export default AddProduct;
