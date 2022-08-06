import React from 'react';
import PropTypes from 'prop-types';
import './RightBar.scss';
import { Card, Typography } from 'antd';

const RightBar = props => {
  const { content, header_txt, ...rest } = props;
  return (
    <div className="main_wrapper">
      <Card shape="square" className="card_div">
        <div className="cst_wrapper">
          <div className="header_profile">
            <Typography className="header_text">{header_txt}</Typography>
          </div>
        </div>
        {content}
      </Card>
    </div>
  );
};
RightBar.propTypes = {
  content: PropTypes.node,
  header_txt: PropTypes.string,
  extra: PropTypes.node,
};
export default RightBar;
