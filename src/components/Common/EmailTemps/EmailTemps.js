import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import './EmailTemps.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Checkbox, Divider, Form, Input, List, Space, Typography } from 'antd';
import { Button } from '..';
import { EmailTemplatesArr as Arr } from 'components/Dashboard/EmailTemplates/EmailTemplatesArr';
import Editor2 from '../Tinymce/Editor';
const EmailTemps = props => {
  const location = useLocation();
  const [editorState, setEditorState] = useState();
  console.log(editorState);


  useEffect(() => {
    setEditorState(location.state.preText)
  }, [props])
  
  const { TextArea } = Input;
  // const [state, setState] = useState([getItems(10), getItems(5, 10)]);
  const { title, content, extra, ...rest } = props;
  const navigate = useNavigate();
  const handleSave = () => {
    navigate('/dashboard/email_templates');
  };
  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }
  /*
   Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  return (
    <>
      <div className="mainEmailWrapper">
        <DragDropContext onDragEnd={onDragEnd}></DragDropContext>
        <div className="leftEmailWrap">
          <Typography style={{ fontSize: '16px', alignItems: 'center', paddingTop: '20px' }}>
            {location.state.title}
          </Typography>
          <Divider></Divider>

          <Form layout="vertical">
            <Form.Item label={'Template Title'} name={'title'} rules={[{ required: true }]}>
              <Typography
                className="text_template_title"
                style={{ backgroundColor: '#eef1f6', color: '#8babcc', padding: '5px' }}
              >
                {location.state.title}
              </Typography>
            </Form.Item>
            <Form.Item label={'Subject'}>
              <Input></Input>
            </Form.Item>
            <Form.Item label={'From Name'} name={'name'} rules={[{ required: true }]}>
              <Input defaultValue={'{companyName} | CRM'}></Input>
            </Form.Item>
            <Space direction="vertical">
              <Checkbox>Send as Plaintext</Checkbox>
              <Checkbox>Disabled</Checkbox>
            </Space>
            <Divider></Divider>
            <Typography>English</Typography>
            <Typography style={{ color: 'gray', fontSize: '11px' }}>Email message</Typography>
            {/* <Form.Item> */}
            <Editor2 setTextFile={setEditorState} setEditorStateData={editorState}/>
            {/* </Form.Item> */}
          </Form>
        </div>
        <div className="rightEmailWrap">
          <Typography>Available Merge Fields</Typography>
          <Divider></Divider>
          <Typography className="top_text">
            If ticket is imported with email piping and the contact does not exists in the CRM the
            fields won't be replaced.
          </Typography>
          <div className="inner_wrap">
            <div className="inner_wrap_left">
              <Typography>{location.state.leftheading}</Typography>
              <div className="tags">
                <div className="left_tags">
                  <List>
                    {location.state.leftFieldArr.map(obj => (
                      <List.Item className="list_items">{obj.name}</List.Item>
                    ))}
                  </List>
                </div>
                <div className="right_tags">
                  <List>
                    {location.state.dragleftfield.map(obj => (
                      <List.Item className="list_drag_items">{obj.name}</List.Item>
                    ))}
                  </List>
                </div>
              </div>
            </div>
            <div className="inner_wrap_right">
              <Typography>{location.state.rightheading}</Typography>
              <div className="tags">
                <div className="left_tags">
                  <List>
                    {location.state.rightFieldArr.map(obj => (
                      <List.Item className="list_items">{obj.name}</List.Item>
                    ))}
                  </List>
                </div>
                <div className="right_tags">
                  <List>
                    {location.state.dragrightfield.map(obj => (
                      <List.Item className="list_drag_items">{obj.name}</List.Item>
                    ))}
                  </List>
                </div>
              </div>
            </div>
          </div>
          {/* <Divider></Divider> */}
          <Button style={{ float: 'right' }} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
EmailTemps.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  extra: PropTypes.node,
};
EmailTemps.defaultProps = {
  title: PropTypes.string,
  content: PropTypes.node,
};
export default EmailTemps;
// <div className="inner_wrap">
//   <div className="inner_wrap_left">
//     <Typography>Client</Typography>
//     <div className="tags">
//       <div className="left_tags">
//         <List>
//           <List.Item className="list_items">Contact Firstname</List.Item>
//           <List.Item className="list_items">Contact Lastname</List.Item>
//           <List.Item className="list_items">Contact Phone Number</List.Item>
//           <List.Item className="list_items">Contact Title</List.Item>
//           <List.Item className="list_items">Contact Email</List.Item>
//           <List.Item className="list_items">Client Company</List.Item>
//           <List.Item className="list_items">Client Phone Number</List.Item>
//           <List.Item className="list_items">Client Country</List.Item>
//           <List.Item className="list_items">Client City</List.Item>
//           <List.Item className="list_items">Client Zip</List.Item>
//           <List.Item className="list_items">Client State</List.Item>
//           <List.Item className="list_items">Client Address</List.Item>
//           <List.Item className="list_items">Client Vat Number</List.Item>
//           <List.Item className="list_items">Client ID</List.Item>
//         </List>
//       </div>
//       <div className="right_tags">
//         <List>
//           <List.Item className="list_drag_items">{'{contact_firstname}'}</List.Item>
//           <List.Item className="list_drag_items">{'{contact_lastname}'}</List.Item>
//           <List.Item className="list_drag_items">{'{contact_phonenumber}'}</List.Item>
//           <List.Item className="list_drag_items">{'{contact_title}'}</List.Item>
//           <List.Item className="list_drag_items">{'{contact_email}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_company}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_phonenumber}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_country}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_city}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_zip}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_state}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_address}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_vat_number}'}</List.Item>
//           <List.Item className="list_drag_items">{'{client_id}'}</List.Item>
//         </List>
//       </div>
//     </div>
//   </div>
//   <div className="inner_wrap_right">
//     <Typography>Ticket</Typography>
//     <div className="tags">
//       <div className="left_tags">
//         <List>
//           <List.Item className="list_items">Ticket ID</List.Item>
//           <List.Item className="list_items">Ticket URL</List.Item>
//           <List.Item className="list_items">Ticket Public URL</List.Item>
//           <List.Item className="list_items">Department</List.Item>
//           <List.Item className="list_items">Department Email</List.Item>
//           <List.Item className="list_items">Date Opened</List.Item>
//           <List.Item className="list_items">Ticket Subject</List.Item>
//           <List.Item className="list_items">Ticket Message</List.Item>
//           <List.Item className="list_items">Ticket Status</List.Item>
//           <List.Item className="list_items">Ticket Priority</List.Item>
//           <List.Item className="list_items">Ticket Service</List.Item>
//           <List.Item className="list_items">Project name</List.Item>
//           <List.Item className="list_items">Other</List.Item>
//           <List.Item className="list_items">Logo URL</List.Item>
//           <List.Item className="list_items">Logo image with URL</List.Item>
//           <List.Item className="list_items">Dark logo image with URL</List.Item>
//           <List.Item className="list_items">CRM URL</List.Item>
//           <List.Item className="list_items">Admin URL</List.Item>
//           <List.Item className="list_items">Main Domain</List.Item>
//           <List.Item className="list_items">Company Name</List.Item>
//           <List.Item className="list_items">Email Signature</List.Item>
//           <List.Item className="list_items">(GDPR) Terms & Conditions URL</List.Item>
//           <List.Item className="list_items">(GDPR) Privacy Policy URL</List.Item>
//         </List>
//       </div>
//       <div className="right_tags">
//         <List>
//           <List.Item className="list_drag_items">{'{ticket_id}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_url}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_public_url}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_department}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_department_email}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_date}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_subject}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_message}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_status}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_priority}'}</List.Item>
//           <List.Item className="list_drag_items">{'{ticket_service}'}</List.Item>
//           <List.Item className="list_drag_items">{'{project_name}'}</List.Item>
//           <List.Item className="list_drag_items"> {` `}</List.Item>
//           <List.Item className="list_drag_items"> {` `}</List.Item>
//           <List.Item className="list_drag_items">{'{logo_url}'}</List.Item>
//           <List.Item className="list_drag_items">{'{logo_image_with_url}'}</List.Item>
//           <List.Item className="list_drag_items">{'{dark_logo_image_with_url'}</List.Item>
//           <List.Item className="list_drag_items">{'{crm_url}'}</List.Item>
//           <List.Item className="list_drag_items">{'{admin_url}'}</List.Item>
//           <List.Item className="list_drag_items">{'{main_domain}'}</List.Item>
//           <List.Item className="list_drag_items">{'{companyname'}</List.Item>
//           <List.Item className="list_drag_items">{'{email_signature}'}</List.Item>
//           <List.Item className="list_drag_items">
//             {'{terms_and_conditions_url}'}
//           </List.Item>
//           <List.Item className="list_drag_items">{'{privacy_policy_url}'}</List.Item>
//         </List>
//       </div>
//     </div>
//   </div>
// </div>;
