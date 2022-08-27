import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bookingsAction from 'modules/bookings/actions';
import './Booking.scss';

export const Bookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookingsAction.getBookings.request());
  }, []);

  return (
    <>
      <h1>All Bookings Detail</h1>
    </>
  );
};
export default Bookings;
