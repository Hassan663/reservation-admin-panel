import React, { useState, useEffect } from 'react';
import './Booking.scss';
import moment from 'moment';
import { Table } from 'antd';
import { Card } from 'components/Common';
import { useDispatch, useSelector } from 'react-redux';
import bookingsAction from 'modules/bookings/actions';

export const Bookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookingsAction.getBookings.request());
  }, []);

  const reservations = useSelector(state => state.bookingsReducer.bookings);

  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    setBookingsData(reservations);
  }, [reservations]);

  const columns = [
    {
      title: 'Name',
      align: 'left',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
    },
    {
      title: 'E-mail',
      align: 'left',
      dataIndex: 'email',
      key: 'email',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Reservation Date',
      align: 'left',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      render: text => {
        return <div>{moment(text).format('DD/MM/YYYY')}</div>;
      },
    },
    {
      title: 'Reservation Time',
      align: 'left',
      dataIndex: 'startTime',
      key: 'startTime',
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return (
          <div>{`${moment(text, ['hh:mm:ss a']).format('hh:mm a')} to ${moment(record.endTime, [
            'hh:mm:ss a',
          ]).format('hh:mm a')}`}</div>
        );
      },
    },
    {
      title: 'Phone Number',
      align: 'left',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
      defaultSortOrder: 'descend',
    },
    {
      title: 'Total Persons',
      align: 'center',
      dataIndex: 'persons',
      key: 'persons',
      defaultSortOrder: 'descend',
    },
  ];
  return (
    <>
      <Card
        style={{ width: '100%', marginTop: '5%' }}
        content={
          <>
            <Table columns={columns} dataSource={bookingsData} />
          </>
        }
      ></Card>
    </>
  );
};
export default Bookings;
