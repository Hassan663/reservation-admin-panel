import React, { useState } from 'react';
import './model.scss';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const model = props => {
  const { content, button, width, bodyStyle, visible, ...rest } = props;

  const [isModalVisible, setIsModalVisible] = useState(visible);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = x => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div onClick={showModal}>{button}</div>
      <div>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
          footer={false}
          width={width}
          bodyStyle={bodyStyle}
          className="newStyle"
        >
          {content}
        </Modal>
      </div>
    </>
  );
};

model.propTypes = {
  content: PropTypes.node,
  button: PropTypes.node,
  bodyStyle: PropTypes.node,
};

export default model;
