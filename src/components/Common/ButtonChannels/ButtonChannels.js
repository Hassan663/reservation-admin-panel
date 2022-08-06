import React, { useState, useRef, useEffect } from 'react';
import Label from 'components/Common/Label';
import { Form, Input, Typography, Button } from 'antd';
import './ButtonChannels.scss';
import '../../Dashboard/Customers/Client/Support/Support.scss';
import { useDispatch, useSelector } from 'react-redux';
import customerChannelsActions from 'modules/customerChannels/actions';
const ButtonChannels = ({ results, channelName, customerId, channel }) => {
  const refValue = useRef();
  const dispatch = useDispatch();
  const Id = localStorage.getItem('customer');
  console.log(Id);
  const [data, setData] = useState({
    channelTitle: '',
    channelLink: '',
    channelLogo: '',
    frequency: '',
    symbolRate: '',
    fec: '',
    videoQuality: '',
    audioCodec: '',
    satelliteLogo: '',
  });
  console.log(data);
  useEffect(() => {
    setData(results);
  }, [results]);

  function handleSave(name) {
    const formData = new FormData();
    formData.append('channelLogo', data.channelLogo);
    formData.append('satelliteLogo', data.satelliteLogo);
    formData.append('channelTitle', data.channelTitle);
    formData.append('channelLink', data.channelLink);
    formData.append('frequency', data.frequency);
    formData.append('symbolRate', data.symbolRate);
    formData.append('fec', data.fec);
    formData.append('videoQuality', data.videoQuality);
    formData.append('audioCodec', data.audioCodec);

    let key = name;
    let newData = { [key]: formData };
    // formData.append('newData', data.newData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    const Result = {
      id: Id,
      data: newData,
    };
    delete Result.data.__v;
    delete Result.data._id;
    console.log(Result);
    dispatch(customerChannelsActions.updateCustomerChannel.request(Result));
    alert('Channel Settings Saved');
  }
  const handleChangeChannelLogo = event => {
    setData({
      ...data,
      channelLogo: event.target.files[0],
    });
  };
  const handleChangeSateliteLogo = event => {
    setData({
      ...data,
      satelliteLogo: event.target.files[0],
    });
  };
  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  return (
    <>
      <div className="demo-nav">
        <Typography className="main_title">Downlink Stream Api for {channelName}</Typography>
      </div>
      <Form
        encType="multipart/form-data"
        className="form_box flex-col"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 100 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div className="flex-row">
          <div className="child-flex-row">
            <Label title="Title" name="Title"></Label>
            <Input
              name="channelTitle"
              maxLength="50"
              value={data?.channelTitle}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="child-flex-row">
            <Label title="Channel Link"></Label>
            <Input
              name="channelLink"
              maxLength="50"
              value={data?.channelLink}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="child-flex-row">
            <Label title="Select Image:"></Label>
            <Input
              filename="channelLogo"
              type="file"
              placeholder="Select File"
              onChange={handleChangeChannelLogo}
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="child-flex-row">
            <Label title="Frequency:"></Label>
            <Input
              name="frequency"
              maxLength="50"
              value={data?.frequency}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="child-flex-row">
            <Label title="Symbol Rate:"></Label>
            <Input
              name="symbolRate"
              maxLength="50"
              value={data?.symbolRate}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="child-flex-row">
            <Label title="FEC"></Label>
            <Input
              name="fec"
              maxLength="50"
              value={data?.fec}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="child-flex-row">
            <Label title="Video Quality"></Label>
            <Input
              name="videoQuality"
              maxLength="50"
              value={data?.videoQuality}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="child-flex-row">
            <Label title="Audio Codec"></Label>
            <Input
              name="audioCodec"
              maxLength="50"
              value={data?.audioCodec}
              required
              ref={refValue}
              onChange={event => handleChange(event)}
            />
          </div>
          <div className="child-flex-row">
            <Label title="Satellite Logo"></Label>
            <Input
              filename="satelliteLogo"
              type="file"
              placeholder="Select File"
              onChange={handleChangeSateliteLogo}
            />
          </div>
        </div>
      </Form>
      <Button
        className="btn-save"
        style={{ width: '63px' }}
        type="primary"
        onClick={() => handleSave(channel)}
      >
        SAVE
      </Button>
    </>
  );
};

export default ButtonChannels;
