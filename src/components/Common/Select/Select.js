import PropTypes from 'prop-types';
import { Select } from 'antd';
import { ArrowDownIcon } from 'assets/icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Select.scss';

const { Option } = Select;
let clear = false;
const IMSSelect = ({ onChange, onSearch, placeholder, options, value, ...rest }) => (
  <Select
    suffixIcon={<ArrowDownIcon />}
    value={value}
    showSearch
    showArrow={rest?.maxTagCount == 1 ? false : true}
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    allowClear={value ? true : false}
    filterOption={(input, option) => {
      return (
        option.children.props.children[0].props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }}
    {...rest}
  >
    {options
      .sort(function (a, b) {
        if (a.title === 'All') console.log('All');
        let x = a?.title?.toLowerCase();
        let y = b?.title?.toLowerCase();
        if (a.title === 'All') return 1;
        if (b.title === 'All') return 1;
        if (a.title === 'Top 5') return 1;
        if (b.title === 'Top 5') return 1;
        if (a.title === 'Top 10') return 1;
        if (b.title === 'Top 10') return 1;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
      .map((option, key) => {
        let display = option.display ? option.display : 'none';
        return (
          <Option key={key} value={option.value}>
            <div className="title-wrapper">
              <span className="title">{option.title}</span>
              <span className="title-icon" style={{ display: display }}>
                <FontAwesomeIcon icon={faCheck} size="sm" />
              </span>
            </div>
          </Option>
        );
      })}
  </Select>
);

const numberOrString = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

IMSSelect.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: numberOrString,
      title: numberOrString,
    })
  ),
};

IMSSelect.defaultProps = {
  options: [],
  onSearch: () => {},
};

export default IMSSelect;
