import { Upload, Modal, message, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./AdminUpload.scss";
import React, { useState } from "react";
import { USERS_BASE_URL } from 'constants/config/config.dev';
import defaultAdmin from '../../../assets/images/profile_placeholder.png';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const PicturesWall = ({
  handleImageChange,
  fileList,
  customClass,
  defaultImage,
  ...props
}) => {
  const [previewVisible, setPreviewVisibile] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setpreviewTitle] = useState("");
  console.log("defaultImage :", defaultImage);
  const uploadButton = (
    <div style={{borderRadius:"7px"}}>
      <Image  className="profile_uploader" src={`${USERS_BASE_URL}/uploads/${defaultImage}`} fallback={defaultAdmin} preview={false}/>
    </div>
  );
  const handleCancel = () => {
    setPreviewImage("");
    setPreviewVisibile(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisibile(true);
  };
  const uploadImage = async (options) => {
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess("Ok");
    }, 0);
  };
  return (
    <>
      <div className={`upload ${customClass}`}>
        <span className="upload-text">Upload Image</span>
        <Upload
          customRequest={uploadImage}
          className="upload-box"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleImageChange}
        >
          {fileList?.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt={previewTitle} style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default PicturesWall;