import React, { useEffect, useState } from 'react';
import './BookingSlots.scss';
import moment from 'moment';
import { Card } from 'components/Common';
import { Form, TimePicker, Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BookingSlotsActions from 'modules/bookingSlots/actions';

export const BookingSlots = () => {
  const dispatch = useDispatch();

  const onFinish = ({ timeSlot }) => {
    const startTime = moment(timeSlot[0], ['HH:mm']).format('HH:mm');
    const endTime = moment(timeSlot[1], ['HH:mm']).format('HH:mm');
    const timeSlots = { startTime, endTime };
    console.log('okay?: ', timeSlots);
    dispatch(BookingSlotsActions.addBookingSlot.request(timeSlots));
  };

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
    </div>
  );
};
export default BookingSlots;
