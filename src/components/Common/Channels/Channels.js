import React, { useState } from 'react';
import './Channels.scss';
import PropTypes from 'prop-types';
import { InfoCircleOutlined } from '@ant-design/icons';
// import '../../ClientDashboard/ClientDashboard.scss';
import ReactPlayer from 'react-player';
import defaultLogo from '../../../assets/images/channel_placeholder.png';
import { USERS_BASE_URL } from 'constants/config/config.dev';
import { Image } from 'antd';
import ReactHLS from 'react-hls';
import defaultsatelliteLogo from '../../../assets/images/satellite_placeholder.png';
const Channels = props => {
  const {
    title,
    channelLink,
    frequency,
    symbolRate,
    videoQuality,
    audioCodec,
    FEC,
    channelLogo,
    satelliteLogo,
    bitrate,
    ...rest
  } = props;

  const [showicontooltip, setShowicontooltip] = useState(false);

  const handleicontooltip = () => {
    setShowicontooltip(!showicontooltip);
  };
  console.log('Working.........');
  return (
    <div className="vedio_col">
      <div className="cover_div" style={{ position: 'relative' }}>
        {/* <ReactPlayer
          playing={false}
          controls={true}
          muted
          className="video_player"
          url={channelLink}
          width="100%"
          height="472px"
          {...rest}
        /> */}
        <ReactHLS
          controls={true}
          muted
          className="video_player"
          url={channelLink}
          width="100%"
          height="472px"
          {...rest}
        />
        <div className="row">
          <div className="left-row">
            {/* <img style={{ width: '42px', height: '29px', borderRadius: '3px' }} src={channelLogo} /> */}
            <Image
              style={{ width: '42px', height: '29px', borderRadius: '3px' }}
              src={`${USERS_BASE_URL}/uploads/${channelLogo}`}
              fallback={defaultLogo}
            />
            <p className="channel-name">{title}</p>
          </div>
          <div className="right-row">
            <span>Bitrate {bitrate} kbps</span>
            <div className="tooltip_button">
              <InfoCircleOutlined className="icon" onClick={handleicontooltip} />
            </div>
          </div>
        </div>
        {showicontooltip ? (
          <div className="icontooltip_option" onClick={() => setShowicontooltip(true)}>
            <div className="left_col">
              <div className="left_desc" style={{ marginBottom: '23px' }}>
                Satellite
              </div>
              <div className="left_desc">Frequency</div>
              <div className="left_desc">Symbol Rate</div>
              <div className="left_desc">FEC</div>
              <div className="left_desc">Video Quality</div>
              <div className="left_desc">Audio Codec</div>
            </div>
            <div className="right_col">
              <div className="right_desc" style={{ marginBottom: '20px' }}>
                <Image
                  className="apstar_img"
                  src={`${USERS_BASE_URL}/uploads/${satelliteLogo}`}
                  style={{ width: '42px', height: '29px', borderRadius: '3px' }}
                  fallback={defaultsatelliteLogo}
                  preview={false}
                ></Image>
              </div>
              <div className="right_desc">{frequency}</div>
              <div className="right_desc">{symbolRate}</div>
              <div className="right_desc">{FEC}</div>
              <div className="right_desc">{videoQuality}</div>
              <div className="right_desc">{audioCodec}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Channels;
// Channels.propTypes = {
//   title: PropTypes.string,
//   channelLink: PropTypes.string,
//   frequency: PropTypes.string,
//   symbolRate: PropTypes.string,
//   videoQuality: PropTypes.string,
//   audioCode: PropTypes.string,
//   FEC: PropTypes.string,
//   channelLogo: PropTypes.string,
//   sateliteLogo: PropTypes.string,
// };

Channels.defaultProps = {
  channelLink: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
};
