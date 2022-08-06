import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Checkbox,
  Upload,
  Divider,
  Dropdown,
  Select,
  Breadcrumb,
  Table,
  Card,
} from 'antd';

import { Label } from 'reactstrap';
import './PermissionForm.scss';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '..';
export const PermissionForm = props => {
  const onChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  const { content,handleSave, ...rest } = props;

  return (
    <div className="profile-main">
      <Card style={{ width: '100%' }} {...rest}>
        {content}

        <Button style={{ float: 'right',marginTop:'10px' }} onClick={handleSave} type="submit">
          Save
        </Button>
      </Card>
    </div>
  );
};
PermissionForm.propTypes = {
  content: PropTypes.node,
  extra: PropTypes.node,
};

export default PermissionForm;
