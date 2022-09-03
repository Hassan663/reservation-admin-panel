import {
  Form,
  Input,
  Button,
  Divider,
  InputNumber,
  message,
  Image,
  Modal,
  Table,
  Typography,
} from 'antd';
import defaultLogo from '../../assets/images/hero-image.png';
import { Card } from 'components/Common';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddEvent.scss';
import Label from 'components/Common/Label';
import { useDispatch, useSelector } from 'react-redux';
import EventActions from 'modules/event/actions';
import { USERS_BASE_URL } from 'constants/config/config.dev';
export const AddProduct = () => {
  const dispatch = useDispatch();
  const initialvalues = {
    name: '',
    desc: '',
    phone: '',
    eventPicture: '',
  };
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const refValue = useRef(null);
  const { events, event } = useSelector(state => state.eventReducer);
  const [productdata, setProductData] = useState(initialvalues);
  const [eventdata, setEventData] = useState([]);
  const [file, setFile] = useState('');
  const [fileEdit, setFileEdit] = useState('');
  const EventId = localStorage.getItem('EventId');
  let SelectedEvent = eventdata.filter(obj => obj.id === EventId)[0];
  const [updatedData, setUpdatedData] = useState();

  useEffect(() => {
    setUpdatedData(SelectedEvent);
  }, [SelectedEvent]);
  useEffect(() => {
    setEventData([...events]);
  }, [events]);
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
        eventPicture: event.target.files[0],
      });
      setFile(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };
  const handleChange = event => {
    const { name, value } = event.target;
    setProductData({ ...productdata, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('name', productdata.name);
    formData.append('name', productdata.name);
    formData.append('desc', productdata.desc);
    formData.append('eventPicture', productdata.eventPicture);
    // formData.append('price', productdata.price);

    if (productdata.name && productdata.desc) {
      dispatch(EventActions.addEvent.request(formData));
      setProductData({
        ...productdata,

        name: '',
        desc: '',
        eventPicture: '',
      });
      //   dispatch(staffActions.addStaff.request(formData));
      //   navigate('/dashboard/staff');
    } else {
      message.error('kindly fill the form');
    }
  };

  /////////////////// Edit Functionality ////////////////////

  const handleDelete = Id => {
    console.log(Id);
    dispatch(EventActions.deleteEvent.request(Id));
  };
  const columns = [
    {
      title: 'Event',
      align: 'left',
      dataIndex: 'name',
      key: 'name',
      sort: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
      render: (text, record) => {
        return (
          <div className="name_contacts">
            <div>
              <img
                style={{ height: '32px', width: '32px', borderRadius: '50px' }}
                src={`${USERS_BASE_URL}/uploads/${record.eventPicture[0]?.img}`}
                fallback={defaultLogo}
                preview={false}
              />
            </div>
            <div className="detail_wrap">
              <div className="name">
                <a>{record.name}</a>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Description',
      align: 'left',
      dataIndex: 'desc',
      key: 'desc',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.desc - b.desc,
    },
    {
      title: 'Options',
      align: 'left',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => {
        return (
          <div id="a" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <a style={{ color: '#746abc' }}>
              <span onClick={() => (localStorage.setItem('EventId', record.id), showEditModal())}>
                Edit
              </span>
            </a>
            <a style={{ color: 'red' }} onClick={() => handleDelete(record.id)}>
              {' '}
              Delete
            </a>
          </div>
        );
      },
    },
  ];
  const handleChangePhotoEdit = event => {
    console.log(event, 'file');
    const EditedFile = event.target.files[0];
    var errSize = 'Max File Limit is 3MB';
    var errType = 'Invalid File Type';

    if (EditedFile.size > 3072 * 1000) {
      window.alert(errSize);
    } else if (
      EditedFile.type !== 'image/jpg' &&
      EditedFile.type !== 'image/jpeg' &&
      EditedFile.type !== 'image/png'
    ) {
      window.alert(errType);
    } else {
      setUpdatedData({
        ...updatedData,
        eventPicture: event.target.files[0],
      });
      setFileEdit(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };
  // const editFunction = id => {
  //   localStorage.setItem('EventId', id);
  //   showEditModal();
  // };
  const handleChangeEdit = event => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('desc', updatedData.desc);

    const fileCheck = typeof updatedData?.eventPicture.name === 'string';
    console.log(fileCheck);
    if (fileCheck === true) {
      formData.append('eventPicture', updatedData.eventPicture);
    }
    setIsEditModalVisible(false);

    const objdata = {
      data: formData,
      id: EventId,
    };
    dispatch(EventActions.updateEvent.request(objdata));
    setUpdatedData([]);
  };
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    dispatch(EventActions.fetchEvent.request('page=1'));
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      setEventData(events);
    }
  }, [events]);

  const EditableFile = `${USERS_BASE_URL}/uploads/${SelectedEvent?.eventPicture[0]?.img}`;

  return (
    <div className="profile-main">
      <div className="header_profile">
        <Typography className="header_text">Add New Event</Typography>
      </div>
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
              <Label title="Event Image"></Label>
              <input
                type="file"
                id="img"
                filename="eventPicture"
                placeholder="Select Files"
                onChange={event => handleChangePhoto(event, 'eventPicture')}
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
              <span>{productdata.eventPictureName}</span>
            </Form>
            <Button
              style={{
                backgroundColor: '#764abc',
                color: 'white',
                float: 'right',
                marginTop: '20px',
              }}
              onClick={e => handleSubmit(e)}
            >
              Add Event
            </Button>
          </>
        }
      ></Card>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Card
        style={{ width: '100%' }}
        content={
          <>
            <Table columns={columns} dataSource={eventdata}></Table>
            <Modal
              title="Edit Event"
              okText="SAVE"
              width={600}
              cancelText="CLOSE"
              visible={isEditModalVisible}
              onOk={handleEditOk}
              onCancel={handleEditCancel}
            >
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
                          value={updatedData?.name}
                          required
                          ref={refValue}
                          onChange={event => handleChangeEdit(event)}
                        />
                        <Label title="Description" required={true}></Label>
                        <Input
                          name="desc"
                          maxLength="50"
                          value={updatedData?.desc}
                          required
                          ref={refValue}
                          onChange={event => handleChangeEdit(event)}
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
                        src={fileEdit || EditableFile}
                        fallback={defaultLogo}
                        preview={false}
                      />
                      <Label title="Event Image"></Label>
                      <input
                        type="file"
                        id="img2"
                        filename="eventPicture"
                        placeholder="Select Files"
                        onChange={event2 => handleChangePhotoEdit(event2)}
                        style={{ display: 'none' }}
                      ></input>
                      <label
                        for="img2"
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
                      <span>{updatedData?.eventPictureName}</span>
                    </Form>
                  </>
                }
              ></Card>
            </Modal>
          </>
        }
      ></Card>
    </div>
  );
};
export default AddProduct;
