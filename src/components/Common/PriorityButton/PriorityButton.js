import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './PriorityButton.scss';

const PriorityButton = ({ index, name, state, setClickPriority, priority, setState, ...rest }) => {
  const [checkedButton, setcheckedButton] = useState(false);
  const [ticketPriorityColor, setTicketPriorityColor] = useState(null);
  return (
    <div className="prioritybutton_wrapper">
      <Button
        key={index}
        className={
          index == 0
            ? state == index
              ? 'filter_active1'
              : 'priority_btn1'
            : index == 1
            ? state == index
              ? 'filter_active2'
              : 'priority_btn2'
            : index == 2
            ? state == index
              ? 'filter_active3'
              : 'priority_btn3'
            : index == 3
        }
        onClick={e => {
          setState(index);
          setClickPriority();
        }}
        {...rest}
      >
        {name}
      </Button>
    </div>
  );
};

PriorityButton.propTypes = {};

PriorityButton.defaultProps = {};

export default PriorityButton;
