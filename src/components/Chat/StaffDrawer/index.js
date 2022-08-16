import React, { useEffect, useState, useRef } from 'react';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { AiOutlineFileImage, AiOutlineFile } from 'react-icons/ai';
import { Col, Row } from 'antd';
import { filterMessages } from '../../commonActions/FirebaseActions';
import File from './File';
import Photo from './Photo';
import './StaffDrawer.scss';
const StaffDrawer = ({ setOpenStaffModel, mychats }) => {
  const [show, setShow] = useState(true);
  const [pic, setPic] = useState([]);
  const [file, setFile] = useState([]);
  useEffect(async () => {
    const { picArray, fileArray } = await filterMessages(mychats);

    setPic([...picArray]);
    setFile([...fileArray]);
  }, []);
  return (
    <div>
      <div>
        <div className="file_headings">
          <div style={{ display: 'flex', justifyContent: 'left' }}>
            <div className={show ? 'item btm-border' : 'item'} onClick={() => setShow(true)}>
              <AiOutlineFileImage size={17} />
              <div style={{ marginLeft: '3px', fontWeight: 'bold', fontSize: '17px' }}>Photos</div>
            </div>
            <div className={!show ? 'item btm-border' : 'item'} onClick={() => setShow(false)}>
              <AiOutlineFile size={17} />
              <div style={{ marginLeft: '3px', fontWeight: 'bold', fontSize: '17px' }}>Files</div>
            </div>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => setOpenStaffModel(false)}>
            <ImCross size={20} />
          </div>
        </div>
        <br />
        <div>
          <div className="title">{show && 'Shared Images'}</div>
          <div className="title">{!show && 'Shared Files'}</div>

          {show && (
            <div className="photo_folder">
              <Photo pictures={pic} />
            </div>
          )}
          {!show && (
            <div className="file_folder">
              <File files={file} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDrawer;
