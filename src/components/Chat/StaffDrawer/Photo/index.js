import React from 'react';
import { USERS_BASE_URL } from '../../../../constants/config/config.dev';
const Photo = ({ pictures }) => {
  return (
    <>
      {pictures?.map((element, index) => {
        return (
          <div key={index}>
            <img
              src={`${USERS_BASE_URL}/chat/${element?.file?.src}`}
              alt={'no Image'}
              width="100px"
              height="100px"
            />
          </div>
        );
      })}
    </>
  );
};

export default Photo;
