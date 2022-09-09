import React, { useEffect, useState } from 'react';
import './BookingSlots.scss';
import moment from 'moment';
import { Card } from 'components/Common';
import { Form, TimePicker, Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BookingSlotsActions from 'modules/bookingSlots/actions';

export const BookingSlots = () => {
  const dispatch = useDispatch();
  const { bookingSlots } = useSelector(state => state.bookingSlotsReducer);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    dispatch(BookingSlotsActions.getBookingSlot.request());
  }, []);

  useEffect(() => {
    setTimeSlots([...bookingSlots]);
  }, [bookingSlots]);

  const handleDeleteSlot = id => {
    dispatch(BookingSlotsActions.deleteBookingSlot.request(id));
  };

  const onFinish = ({ timeSlot }) => {
    const startTime = moment(timeSlot[0], ['HH:mm']).format('HH:mm');
    const endTime = moment(timeSlot[1], ['HH:mm']).format('HH:mm');
    const timeWiseSlots = { startTime, endTime };
    dispatch(BookingSlotsActions.addBookingSlot.request(timeWiseSlots));
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
          </>
        }
      ></Card>
    </div>
  );
};
export default BookingSlots;
