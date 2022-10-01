import React, { useState, useRef, useEffect } from 'react';
import './AddBlog.scss';
import { Card } from 'components/Common';
import { useDispatch, useSelector } from 'react-redux';
import Label from 'components/Common/Label';
import blogActions from 'modules/blog/actions';
import { Form, Input, Button, message, Image, Modal, Table, Typography ,Spin} from 'antd';
import defaultLogo from '../../assets/images/hero-image.png';
import { USERS_BASE_URL } from 'constants/config/config.dev';

export const AddBlog = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { blogs, blog, totalBlogs,loading } = useSelector(state => state.blogReducer);
  const [blogdata, setBlogData] = useState([]);
  const [fileEdit, setFileEdit] = useState('');
  const BlogId = localStorage.getItem('BlogId');
  let SelectedBlog = blogdata.filter(obj => obj.id === BlogId)[0];
  const [updatedData, setUpdatedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const initialvalues = {
    name: '',
    desc: '',
    blogPicture: '',
  };

  useEffect(() => {
    dispatch(blogActions.fetchBlog.request(currentPage));
  }, []);

  const handlePageChange = page => {
    setCurrentPage(page);
    dispatch(blogActions.fetchBlog.request(page));
  };
  console.log(totalBlogs)
  const tableProps = {
    pagination: {
      total: totalBlogs,
      pageSize: 8,
      current: currentPage,
      onChange: handlePageChange,
    },
  };

  const refValue = useRef(null);

  useEffect(() => {
    setUpdatedData(SelectedBlog);
  }, [SelectedBlog]);
  useEffect(() => {
    setBlogData([...blogs]);
  }, [blogs]);
  const dispatch = useDispatch();

  const [productdata, setProductData] = useState(initialvalues);
  const [file, setFile] = useState('');

  // useEffect(() => {
  //   setUpdatedData(SelectedBlog);
  // }, [SelectedBlog]);
  // console.log(SelectedBlog);
  const handleChange = event => {
    const { name, value } = event.target;
    setProductData({ ...productdata, [name]: value });
  };

  const handleChangePhoto = event => {
    const file = event.target.files[0];
    var errSize = 'Max File Limit is 3MB';
    var errType = 'Invalid File Type';

    if (file.size > 3072 * 1000) {
      window.alert(errSize);
    } else if (
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png'
    ) {
      window.alert(errType);
    } else {
      setProductData({
        ...productdata,
        blogPicture: event.target.files[0],
      });
      setFile(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    console.log('form data here---', productdata);
    formData.append('name', productdata.name);
    formData.append('desc', productdata.desc);
    formData.append('blogPicture', productdata.blogPicture);
    if (productdata.name && productdata.desc) {
      dispatch(blogActions.addBlog.request(formData));
      setProductData({
        ...productdata,
        name: '',
        desc: '',
        blogPicture: '',
      });
    } else {
      message.error('kindly fill the form');
    }
  };

  /////////////////// Edit Functionality ////////////////////

  const handleDelete = Id => {
    console.log(Id);
    dispatch(blogActions.deleteBlog.request(Id));
  };
  const columns = [
    {
      title: 'Blogs',
      align: 'left',
      dataIndex: 'name',
      key: 'name',
      sort: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name - b.name,
      render: (text, record) => {
        return (
          <div className="name_contacts">
            <div>
              <img
                style={{ height: '32px', width: '32px', borderRadius: '50px' }}
                src={record.blogPicture[0]?.img}
                fallback={defaultLogo}
                preview={false}
              />
            </div>
            <div className="detail_wrap">
              <div className="name">
                <a>{record.name}</a>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Description',
      align: 'left',
      dataIndex: 'desc',
      key: 'desc',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.desc - b.desc,
    },
    {
      title: 'Options',
      align: 'left',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => {
        return (
          <div id="a" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <a style={{ color: '#746abc' }}>
              <span onClick={() => (localStorage.setItem('BlogId', record.id), showEditModal())}>
                Edit
              </span>
            </a>
            <a style={{ color: 'red' }} onClick={() => handleDelete(record.id)}>
              {' '}
              Delete
            </a>
          </div>
        );
      },
    },
  ];
  const handleChangePhotoEdit = event => {
    console.log(event, 'file');
    const EditedFile = event.target.files[0];
    var errSize = 'Max File Limit is 3MB';
    var errType = 'Invalid File Type';

    if (EditedFile.size > 3072 * 1000) {
      window.alert(errSize);
    } else if (
      EditedFile.type !== 'image/jpg' &&
      EditedFile.type !== 'image/jpeg' &&
      EditedFile.type !== 'image/png'
    ) {
      window.alert(errType);
    } else {
      setUpdatedData({
        ...updatedData,
        blogPicture: event.target.files[0],
      });
      setFileEdit(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };
  const handleChangeEdit = event => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };
  // const editFunction = id => {
  //   localStorage.setItem('BlogId', id);
  //   setUpdatedData(SelectedBlog);
  //   showEditModal();
  // };
  const handleEditOk = () => {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('desc', updatedData.desc);
    const fileCheck = typeof updatedData?.blogPicture.name === 'string';
    console.log(fileCheck);
    if (fileCheck === true) {
      formData.append('blogPicture', updatedData.blogPicture);
    }
    setIsEditModalVisible(false);

    const objdata = {
      data: formData,
      id: BlogId,
    };
    dispatch(blogActions.updateBlog.request(objdata));
  };
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    if (blogs.length > 0) {
      setBlogData(blogs);
    }
  }, [blogs]);

  const EditableFile = SelectedBlog?.blogPicture[0]?.img;

  return (
    <>
      <div className="profile-main">
        <div className="header_profile">
          <Typography className="header_text">Add New Blog</Typography>
        </div>
        <Card
          style={{ width: '100%' }}
          content={
            <>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 100 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <div className="form-main">
                  <Label title="Title" required={true}></Label>
                  <Input
                    name="name"
                    maxLength="20"
                    value={productdata.name}
                    required
                    ref={refValue}
                    onChange={event => handleChange(event)}
                  />
                  <Label title="Description" required={true}></Label>
                  <Input
                    name="desc"
                    maxLength="50"
                    value={productdata.desc}
                    required
                    ref={refValue}
                    onChange={event => handleChange(event)}
                  />
                </div>
                <Image
                  style={{
                    height: '160px',
                    width: '160px',
                    border: 'solid 1px white',
                    borderRadius: '50%',
                    marginTop: '20px',
                  }}
                  src={file}
                  fallback={defaultLogo}
                  preview={false}
                />
                <Label title="Blog Image"></Label>
                <input
                  type="file"
                  id="img"
                  filename="blogPicture"
                  placeholder="Select Files"
                  onChange={event => handleChangePhoto(event, 'blogPicture')}
                  style={{ display: 'none' }}
                ></input>
                <label
                  for="img"
                  style={{
                    width: '110px',
                    height: '30px',
                    backgroundColor: '#764ABC',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Upload Image
                </label>
                <span>{productdata.blogPictureName}</span>
              </Form>
              <Button className="category-btn" onClick={e => handleSubmit(e)} loading={loading}>
                Add Blog
              </Button>
            </>
          }
        ></Card>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Card
          style={{ width: '100%' }}
          content={
            <>
             {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                {/* <h1>loading</h1> */}
                <Spin size="large" />
              </div>
            ) : (
              <Table columns={columns} dataSource={blogdata} {...tableProps}></Table>
            )}
              <Modal
                title="Edit Blog"
                okText="SAVE"
                width={600}
                cancelText="CLOSE"
                visible={isEditModalVisible}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
              >
                <Card
                  style={{ width: '100%' }}
                  content={
                    <>
                      <Form
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 100 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                      >
                        <div className="form-main">
                          <Label title="Title" required={true}></Label>
                          <Input
                            name="name"
                            maxLength="20"
                            value={updatedData?.name}
                            required
                            ref={refValue}
                            onChange={event => handleChangeEdit(event)}
                          />
                          <Label title="Description" required={true}></Label>
                          <Input
                            name="desc"
                            maxLength="50"
                            value={updatedData?.desc}
                            required
                            ref={refValue}
                            onChange={event => handleChangeEdit(event)}
                          />
                        </div>
                        <Image
                          style={{
                            height: '160px',
                            width: '160px',
                            border: 'solid 1px white',
                            borderRadius: '50%',
                            marginTop: '20px',
                          }}
                          src={fileEdit || EditableFile}
                          fallback={defaultLogo}
                          preview={false}
                        />
                        <Label title="Blog Image"></Label>
                        <input
                          type="file"
                          id="img2"
                          filename="blogPicture"
                          placeholder="Select Files"
                          onChange={event => handleChangePhotoEdit(event, 'blogPicture')}
                          style={{ display: 'none' }}
                        ></input>
                        <label
                          for="img2"
                          style={{
                            width: '110px',
                            height: '30px',
                            backgroundColor: '#764ABC',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          Upload Image
                        </label>
                        <span>{updatedData?.blogPictureName}</span>
                      </Form>
                    </>
                  }
                ></Card>
              </Modal>
            </>
          }
        ></Card>
      </div>
    </>
  );
};
export default AddBlog;
