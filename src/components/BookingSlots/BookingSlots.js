import React, { useEffect, useState } from 'react';
import './BookingSlots.scss';
import moment from 'moment';
import { Card } from 'components/Common';
import Label from 'components/Common/Label';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, TimePicker, Button, Table, Modal } from 'antd';
import BookingSlotsActions from 'modules/bookingSlots/actions';

export const BookingSlots = () => {
  const dispatch = useDispatch();
  const { bookingSlots } = useSelector(state => state.bookingSlotsReducer);
  const [timeSlots, setTimeSlots] = useState([]);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(BookingSlotsActions.getBookingSlot.request());
  }, []);

  useEffect(() => {
    setTimeSlots([...bookingSlots]);
  }, [bookingSlots]);

  const handleEditSlot = id => {
    localStorage.setItem('ProductId', id);
    setEditModal(true);
  };

  const handleDeleteSlot = id => {
    dispatch(BookingSlotsActions.deleteBookingSlot.request(id));
  };

  const onFinish = ({ timeSlot }) => {
    const startTime = moment(timeSlot[0], ['HH:mm']).format('HH:mm');
    const endTime = moment(timeSlot[1], ['HH:mm']).format('HH:mm');
    const timeWiseSlots = { startTime, endTime };
    dispatch(BookingSlotsActions.addBookingSlot.request(timeWiseSlots));
  };

  const handEditOKAY = () => {
    setEditModal(false);
  };

  const handleEditCancel = () => {
    setEditModal(false);
  };
  const columns = [
    {
      title: 'Time Slots',
      align: 'left',
      dataIndex: 'name',
      key: 'name',
      sort: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
      render: (text, record) => {
        return (
          <div className="name_contacts">{`${record.startTime.hour}:${record.startTime.minutes} to ${record.endTime.hour}:${record.endTime.minutes}`}</div>
        );
      },
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
              <span onClick={() => handleEditSlot(record._id)}>Edit</span>
            </a>
            <a style={{ color: 'red' }} onClick={() => handleDeleteSlot(record.id)}>
              {' '}
              Delete
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className="slot-container">
      <Card
        style={{ width: '100%' }}
        content={
          <>
            <Form
              name="time-slot-form"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 100 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <p className="form-title">Booking Time Slots</p>
              <Form.Item name="timeSlot" style={{ marginBottom: '10px' }}>
                <TimePicker.RangePicker />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="time-slot-btn">
                  Add Time Slot
                </Button>
              </Form.Item>
            </Form>
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
            <Table columns={columns} dataSource={timeSlots}></Table>
            <Modal
              title="Edit Time Slot"
              okText="SAVE"
              width={600}
              cancelText="CLOSE"
              visible={editModal}
              onOk={handEditOKAY}
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
                          // value={updatedData?.name}
                          // required
                          // ref={refValue}
                          // onChange={event => handleChangeEdit(event)}
                        />
                        <Label title="Description" required={true}></Label>
                        <Input
                          name="desc"
                          maxLength="50"
                          // value={updatedData?.desc}
                          // required
                          // ref={refValue}
                          // onChange={event => handleChangeEdit(event)}
                        />
                      </div>
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
export default BookingSlots;
