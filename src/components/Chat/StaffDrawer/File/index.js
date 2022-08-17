import React from 'react';
import { USERS_BASE_URL } from '../../../../constants/config/config.dev';

const File = ({ files }) => {
  console.log('Files....', files);
  return (
    <div>
      {files?.map((element, index) => {
        return (
          <div key={index}>
            <a href={`${USERS_BASE_URL}/chat/${element?.file?.src}`} target="__blank">
              <label style={{ cursor: 'pointer' }}>{element?.file?.name}</label>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default File;
