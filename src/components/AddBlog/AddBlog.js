import React, { useState, useRef } from 'react';
import './AddBlog.scss';
import { Card } from 'components/Common';
import { useDispatch } from 'react-redux';
import Label from 'components/Common/Label';
import blogActions from 'modules/blog/actions';
import { Form, Input, Button, message, Image } from 'antd';
import defaultLogo from '../../assets/images/hero-image.png';

export const AddBlog = () => {
  const initialvalues = {
    name: '',
    desc: '',
    blogPicture: '',
  };

  const refValue = useRef(null);

  const dispatch = useDispatch();

  const [productdata, setProductData] = useState(initialvalues);
  const [file, setFile] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    setProductData({ ...productdata, [name]: value });
  };

  const handleChangePhoto = event => {
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
        blogPicture: event.target.files[0],
      });
      setFile(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    console.log('form data here---', productdata);
    formData.append('name', productdata.name);
    formData.append('desc', productdata.desc);
    formData.append('blogPicture', productdata.blogPicture);
    if (productdata.name && productdata.desc) {
      dispatch(blogActions.addBlog.request(formData));
      setProductData({
        ...productdata,
        name: '',
        desc: '',
        blogPicture: '',
      });
    } else {
      message.error('kindly fill the form');
    }
  };
  return (
    <>
      <div>
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
                    name="name"
                    maxLength="20"
                    value={productdata.name}
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
                </div>
                <Image
                  style={{
                    height: '160px',
                    width: '160px',
                    border: 'solid 1px white',
                    borderRadius: '50%',
                    marginTop: '20px',
                  }}
                  src={file}
                  fallback={defaultLogo}
                  preview={false}
                />
                <Label title="Blog Image"></Label>
                <input
                  type="file"
                  id="img"
                  filename="blogPicture"
                  placeholder="Select Files"
                  onChange={event => handleChangePhoto(event, 'blogPicture')}
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
                <span>{productdata.blogPictureName}</span>
              </Form>
              <Button className="category-btn" onClick={e => handleSubmit(e)}>
                Add Blog
              </Button>
            </>
          }
        ></Card>
      </div>
    </>
  );
};
export default AddBlog;
