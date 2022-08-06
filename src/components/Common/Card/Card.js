import PropTypes from 'prop-types';
import { Card } from 'antd';

import './Card.scss';

const ReservationCard = props => {
  const { title, content, shape, variant, bg, extra, ...rest } = props;
  return (
    <Card
      className={`card-container-${variant} ${bg} ${shape}`}
      title={title}
      extra={extra}
      bordered={false}
      {...rest}
    >
      {content}
    </Card>
  );
};

ReservationCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  shape: PropTypes.oneOf(['square', 'round']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
  bg: PropTypes.oneOf(['light', 'grey', 'medium', 'dark', 'lighter', 'mid-dark']),
  extra: PropTypes.node,
};

ReservationCard.defaultProps = {
  shape: 'square',
  variant: 'primary',
  bg: 'light',
};

export default ReservationCard;
