import React from 'react';
import { Image } from 'antd';
const ImsImage = ({ preview, width, src }) => {
  return <Image preview={preview} width={width} src={src} />;
};
export default ImsImage;
