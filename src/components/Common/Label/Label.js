import React from 'react';
import PropTypes from 'prop-types';
import './Label.scss';
const Label = props => {
  const { title, required } = props;
  return (
    <>
      <div className="Wrapper_label">
        {required && <span style={{ color: 'red' }}>*</span>}
        <span style={{ color: '#000000D9', fontSize: '12px' }}>{title}</span>
      </div>
    </>
  );
};
Label.propTypes = {
  title: PropTypes.string,
  extra: PropTypes.node,
};

export default Label;
