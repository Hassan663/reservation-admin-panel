import React, { useState } from 'react';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';
// import '../../../theme/base.scss';
import SingleClient from '../SingleClient';
import { useDispatch, useSelector } from 'react-redux';
import './SingleCompany.scss';
const SingleCompany = ({
  company,
  companyId,
  setShowChatModel,
  receiverinfo,
  setreceiverinfo,
  usersLogin,
}) => {
  const dispatch = useDispatch();
  const [compnayMessageCount, setCompanyMessageCount] = useState(0);
  const [showEmployess, setShowEmployess] = useState(false);
  const [customerContacts, setCustomerContacts] = useState([]);
  console.log('customerContacts', customerContacts);
  // const contacts = useSelector(state => state.contactsReducer.customerContacts);
  const getCompanyEmployess = async () => {
    const result = await contactServices.getCustomerContacts(companyId);
    setCustomerContacts(result?.data?.response?.data);
    console.log('Result....', result.data.response.data);
    // (companyId);
    // dispatch(contactActions.getCustomerContacts.request(companyId));
  };
  return (
    <>
      <div
        className="client_main_container"
        onClick={() => {
          setShowEmployess(!showEmployess);
          getCompanyEmployess();
        }}
      >
        {/* <div>{company + ' ' + companyId}</div> */}
        <div>{company.charAt(0).toUpperCase() + company.slice(1)}</div>
        {/* <div className="badge_div"> */}
        {/* <div className="company_message">{compnayMessageCount}</div> */}
        <div>{showEmployess ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}</div>
        {/* </div> */}
      </div>
      {showEmployess
        ? customerContacts.length > 0 &&
          customerContacts.map((contact, index) => (
            <SingleClient
              id={contact._id}
              name={contact.firstName + ' ' + contact.lastName}
              email={contact.email}
              key={index}
              image={contact.image}
              role={contact.role}
              setShowChatModel={setShowChatModel}
              receiverinfo={receiverinfo}
              setreceiverinfo={setreceiverinfo}
              Status={usersLogin.includes(contact.email)}
              compnayMessageCount={compnayMessageCount}
              setCompanyMessageCount={setCompanyMessageCount}
            />
          ))
        : ''}
    </>
  );
};

export default SingleCompany;
