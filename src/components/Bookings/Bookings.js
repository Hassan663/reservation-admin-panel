import React, { useState, useEffect } from 'react';
import './Booking.scss';
import moment from 'moment';
import { Table } from 'antd';
import { Card } from 'components/Common';
import bookingsAction from 'modules/bookings/actions';
import { useDispatch, useSelector } from 'react-redux';

export const Bookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookingsAction.getBookings.request());
  }, []);

  const { bookings } = useSelector(state => state.bookingsReducer);
  console.log('bookings', bookings);
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    setBookingsData(bookings);
  }, [bookings]);

  const columns = [
    {
      title: 'Name',
      align: 'left',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return <div>{record.user.firstName + ' ' + record.user.lastName}</div>;
      },
    },
    {
      title: 'E-mail',
      align: 'left',
      dataIndex: `email`,
      key: 'email',
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return <div>{record.user.email}</div>;
      },
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
      title: 'Cancelled',
      align: 'left',
      dataIndex: 'cancelled',
      key: 'cancelled',
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return <div>{!record.cancelled ? 'No' : 'Yes'}</div>;
      },
    },

    {
      title: 'Total Persons',
      align: 'center',
      dataIndex: 'reservedSeats',
      key: 'persons',
      defaultSortOrder: 'descend',
    },
    {
      title: 'reservedTables',
      align: 'left',
      dataIndex: 'reservedTables',
      key: 'reservedTables',
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return <div>{record.bookingSlot.reservedTables}</div>;
      },
    },
    {
      title: 'Un-reservedTables',
      align: 'left',
      dataIndex: 'unReservedTable',
      key: 'unReservedTable',
      defaultSortOrder: 'descend',
      render: (text, record) => {
        return <div>{record.bookingSlot.unReservedTable}</div>;
      },
    },
  ];
  return (
    <>
      <Card
        style={{ width: '100%' }}
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
