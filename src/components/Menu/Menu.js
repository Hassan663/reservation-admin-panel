import { Form, Input, Button, Divider, InputNumber, message, Image, Select } from 'antd';
const { Option, OptGroup } = Select;
import defaultLogo from '../../assets/images/hero-image.png';
import { Card } from 'components/Common';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.scss';
import Label from 'components/Common/Label';
import { useDispatch, useSelector } from 'react-redux';
import MenuActions from 'modules/menu/actions';
import { MainMenu } from 'layouts/Main/components';

export const AddMenu = () => {
  const dispatch = useDispatch();
  const initialvalues = {
    name: '',
    title: '',
    description: '',
    price: 0,
    phone: '',
    photoPath: '',
    photoPathName: '',
    category: '',
  };
  const refValue = useRef(null);
  const [menuItem, setMenuItem] = useState(initialvalues);
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const handleChange = event => {

    const { name, value } = event.target;
    setMenuItem({ ...menuItem, [name]: value });
  };
  const handleChangeHourlyRate = event => {
    setMenuItem({ ...menuItem, price: event });
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
      setMenuItem({
        ...menuItem,
        photoPath: event.target.files[0],
        photoPathName: event.target.files[0].name,
      });
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', menuItem.name);
    formData.append('title', menuItem.title);
    formData.append('description', menuItem.description);
    formData.append('price', menuItem.price);
    formData.append('category', menuItem.category);
    formData.append('file', menuItem.photoPath);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    if (
      menuItem.name &&
      menuItem.title &&
      menuItem.description &&
      menuItem.price &&
      menuItem.category
    ) {
      dispatch(MenuActions.addMenu.request(formData));
      //   dispatch(staffActions.addStaff.request(formData));
      //   navigate('/dashboard/staff');
    } else {
      message.error('kindly fill the form');
    }
  };

  console.log('menuItem', menuItem);

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
                  value={menuItem.name}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />
                <Label title="Title" required={true}></Label>
                <Input
                  name="title"
                  maxLength="20"
                  value={menuItem.title}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />
                <Label title="Description" required={true}></Label>
                <Input
                  name="description"
                  maxLength="50"
                  value={menuItem.description}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />

                <Label title="Price"></Label>
                <InputNumber
                  style={{ width: '100%' }}
                  //   min={1}
                  //   initialValues={menuItem.price}
                  name="price"
                  value={menuItem.price}
                  required
                  //   ref={refValue}
                  onChange={event => handleChangeHourlyRate(event)}
                />
                <Label title="Category"></Label>
              <Select
                // defaultValue="lucy"
                name="category"
                value={menuItem.category}
                style={{
                  width: '100%',
                }}
                // value={menuItem.category}
                onChange={value =>{
                  setMenuItem({
                    ...menuItem,
                    category:value
                  })
                } }
              >
                  <Option value="jack">Jack</Option>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="jack">Jack</Option>
                  <Option value="jack">Jack</Option>
              </Select>
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
              <Label title="Item Image"></Label>
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
              <span>{menuItem.photoPathName}</span>
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
              Add Menu Item
            </Button>
          </>
        }
      ></Card>
    </div>
  );
};
export default AddMenu;
