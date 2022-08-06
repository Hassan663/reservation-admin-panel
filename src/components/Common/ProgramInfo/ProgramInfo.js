import PropTypes from 'prop-types';
import { Typography, Row } from 'antd';
import { Card } from 'components/Common';
import './ProgramInfo.scss';
import { formatDate, formateTime } from 'modules/common/utils';
const { Text } = Typography;
const ProgramInfo = ({
  programInfo: { programName, programDate, programTime, clippedBy, channelLogoPath },
}) => (
  <>
    <div className="qc-wrapper">
      <div>
        <img src={channelLogoPath} width="33" height="38" />
      </div>
      <div className="program-info-label-wrapper">
        <div className="prgram-info-data">
          <div className="label">
            <Text className="text-primary small-font-size">{'Progarm Name: ' + programName}</Text>
          </div>
          <div className="label">
            <Text className="text-secondary small-font-size">{'Clipped By: ' + clippedBy}</Text>
          </div>
        </div>
        {/* <div className="prgram-info-data">
          <div className="label">
            <Text className="text-primary small-font-size">
              {formatDate(programDate, 'DD/MM/YYYY')}
            </Text>
          </div>
          <div className="label">
            <Text className="text-primary small-font-size">{formateTime(programTime)}</Text>
          </div>
        </div> */}
      </div>
    </div>
  </>
);
ProgramInfo.prototype = {
  programInfo: PropTypes.object,
};
export default ProgramInfo;
