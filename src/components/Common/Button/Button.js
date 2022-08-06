import PropTypes from 'prop-types';
import { Button } from 'antd';

import './Button.scss';

const IMSButton = ({ children, variant, type, icon: Icon, onClick, ...rest }) => {
  return (
    <div className="ims-button-wrapper">
      <Button
        className={`action-btn ${variant}-btn ${type}-btn`}
        {...(Icon ? { icon: <Icon /> } : {})}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
};

IMSButton.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['medium', 'big', 'small']),
  children: PropTypes.node,
  icon: PropTypes.any,
};

IMSButton.defaultProps = {
  variant: 'primary',
  type: 'medium',
};

export default IMSButton;
