import React, { useState, useRef, useEffect } from 'react';
import './AddProduct.scss';
import { Card } from 'components/Common';
import Label from 'components/Common/Label';
import productActions from 'modules/product/actions';
import categoryActions from 'modules/category/actions';
import { useDispatch, useSelector } from 'react-redux';
import defaultLogo from '../../assets/images/hero-image.png';
import { Select, Form, Input, Button, InputNumber, Image, Modal, Table, Typography } from 'antd';
import { USERS_BASE_URL } from 'constants/config/config.dev';
import { createUser } from '../../components/commonActions/FirebaseActions';

export const AddProduct = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { products, product } = useSelector(state => state.productReducer);
  const [proddata, setproddata] = useState([]);
  const [fileEdit, setFileEdit] = useState('');
  const ProductId = localStorage.getItem('ProductId');

  const [updatedData, setUpdatedData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.getCategory.request());
    createUser('admin@gmail.com');
  }, []);
  let SelectedProduct = proddata.filter(obj => obj._id === ProductId)[0];

  useEffect(() => {
    setUpdatedData(SelectedProduct);
  }, [SelectedProduct]);
  useEffect(() => {
    setproddata([...products]);
  }, [products]);
  const categoryData = useSelector(state => state.categoryReducer.category);

  const initialvalues = {
    name: '',
    desc: '',
    price: 0,
    phone: '',
    productPicture: '',
  };
  const refValue = useRef(null);
  const [productdata, setProductData] = useState(initialvalues);
  const [file, setFile] = useState('');
  const { Option } = Select;
  console.log(updatedData);
  const handleChange = event => {
    const { name, value } = event.target;
    setProductData({ ...productdata, [name]: value });
  };
  const handleCategoryChange = value => {
    setProductData({ ...productdata, category: value });
  };
  const handleChangeHourlyRate = event => {
    setProductData({ ...productdata, price: event });
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
        productPicture: event.target.files[0],
        productPictureName: event.target.files[0].name,
      });
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productdata.name);
    formData.append('desc', productdata.desc);
    formData.append('price', productdata.price);
    formData.append('category', productdata.category);
    formData.append('productPicture', productdata.productPicture);

    dispatch(productActions.addProduct.request(formData));
  };
  /////////////////// Edit Functionality ////////////////////
  const handleChangeEdit = event => {
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  const handleCategoryChangeEdit = value => {
    setUpdatedData({ ...updatedData, category: value });
  };
  const handleChangeHourlyRateEdit = event => {
    setUpdatedData({ ...updatedData, price: event });
  };

  const handleChangePhotoEdit = event => {
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
      setUpdatedData({
        ...updatedData,
        productPicture: event.target.files[0],
        productPictureName: event.target.files[0].name,
      });
      setFileEdit(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleDelete = Id => {
    console.log(Id);
    dispatch(productActions.deleteProduct.request(Id));
  };

  const editFunction = id => {
    localStorage.setItem('ProductId', id);
    showEditModal();
  };
  const columns = [
    {
      title: 'products',
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
                src={record?.productPicture[0]?.img}
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
              <span onClick={() => editFunction(record._id)}>Edit</span>
            </a>
            <a style={{ color: 'red' }} onClick={() => handleDelete(record._id)}>
              {' '}
              Delete
            </a>
          </div>
        );
      },
    },
  ];

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };
  const handleEditOk = () => {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('desc', updatedData.desc);
    const fileCheck = typeof updatedData?.productPicture.name === 'string';
    if (fileCheck === true) {
      formData.append('productPicture', updatedData.productPicture);
    }
    formData.append('category', updatedData.category);

    setIsEditModalVisible(false);

    const objdata = {
      data: formData,
      id: ProductId,
    };
    dispatch(productActions.updateProduct.request(objdata));
    setUpdatedData([]);
  };
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    // setUpdatedData([]);
    // SelectedProduct = ''
  };

  useEffect(() => {
    dispatch(productActions.fetchProduct.request('page=1'));
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setproddata(products);
    }
  }, [products]);

  const EditableFile = `${USERS_BASE_URL}/uploads/${SelectedProduct?.productPicture[0]?.img}`;
  return (
    <div className="profile-main">
      <div className="header_profile">
        <Typography className="header_text">Add New Product</Typography>
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
                <Label title="Name" required={true}></Label>
                <Input
                  name="name"
                  maxLength="20"
                  value={productdata.name}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />

                <Label title="Category" required={true}></Label>
                <Select
                  name="category"
                  onChange={event => handleCategoryChange(event)}
                  style={{ width: '50%' }}
                >
                  {categoryData?.map((option, key) => {
                    return (
                      <Option key={key} value={option.name}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
                <Label title="Description" required={true}></Label>
                <Input
                  name="desc"
                  maxLength="50"
                  value={productdata.desc}
                  required
                  ref={refValue}
                  onChange={event => handleChange(event)}
                />

                <Label title="Price"></Label>
                <InputNumber
                  style={{ width: '100%' }}
                  //   min={1}
                  //   initialValues={productdata.price}
                  name="price"
                  value={productdata.price}
                  required
                  //   ref={refValue}
                  onChange={event => handleChangeHourlyRate(event)}
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
              <Label title="Product Image"></Label>
              <input
                type="file"
                id="img"
                filename="productPicture"
                placeholder="Select Files"
                onChange={event => handleChangePhoto(event, 'productPicture')}
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
              <span>{productdata.productPictureName}</span>
            </Form>
            <Button
              style={{
                backgroundColor: '#764abc',
                color: 'white',
                float: 'right',
                marginTop: '20px',
              }}
              onClick={e => handleSubmit(e)}
            >
              Add Product
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
            <Table columns={columns} dataSource={proddata}></Table>
            <Modal
              title="Edit Product"
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
                        <Label title="Name" required={true}></Label>
                        <Input
                          name="name"
                          maxLength="20"
                          value={updatedData?.name}
                          required
                          ref={refValue}
                          onChange={event => handleChangeEdit(event)}
                        />
                        <Label title="Category" required={true}></Label>
                        <Select
                          name="category"
                          onChange={event => handleCategoryChangeEdit(event)}
                          style={{ width: '50%' }}
                          value={updatedData?.category}
                        >
                          {categoryData?.map((option, key) => {
                            return (
                              <Option key={key} value={option.name}>
                                {option.name}
                              </Option>
                            );
                          })}
                        </Select>
                        <Label title="Description" required={true}></Label>
                        <Input
                          name="desc"
                          maxLength="50"
                          value={updatedData?.desc}
                          required
                          ref={refValue}
                          onChange={event => handleChangeEdit(event)}
                        />

                        <Label title="Price"></Label>
                        <InputNumber
                          style={{ width: '100%' }}
                          //   min={1}
                          //   initialValues={updatedData?.price}
                          name="price"
                          value={updatedData?.price}
                          required
                          //   ref={refValue}
                          onChange={event => handleChangeHourlyRateEdit(event)}
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
                      <Label title="Product Image"></Label>
                      <input
                        type="file"
                        id="img2"
                        filename="productPicture"
                        placeholder="Select Files"
                        onChange={event => handleChangePhotoEdit(event, 'productPicture')}
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
                      <span>{updatedData?.productPictureName}</span>
                    </Form>
                  </>
                }
              ></Card>
            </Modal>
          </>
        }
      ></Card>
    </div>
  );
};
export default AddProduct;
