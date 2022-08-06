import React from 'react';
import Rectangle from 'components/Common/Rectangle';
import './About.scss';
const AboutUs = () => {
  const Array = [];
  return (
    <>
      <Rectangle
        Array={Array}
        title="ABOUT US"
        content={
          <div className="about-us-wrapper">
            <div className="upper-container">
              <div className="upper-left-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc metus mauris, pretium
                in volutpat id, volutpat tempor ipsum. Vestibulum nec ultricies felis. Ut quis
                libero vitae ex lobortis fermentum at vitae metus. Phasellus lectus sapien, pulvinar
                id sollicitudin non, pellentesque quis dolor. Nulla lorem eros, vehicula blandit
                aliquam ac, accumsan nec massa. Integer luctus felis sit amet molestie dictum. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Fusce et mi gravida, mattis lorem
                sed, dignissim risus.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus dolor a turpis
                posuere, ac tincidunt orci dignissim. Aenean porta neque a consequat tempus. Quisque
                eu purus justo. Aliquam in felis quis turpis consequat facilisis. Donec non pulvinar
                urna. Aliquam pellentesque volutpat lacinia. Vestibulum nunc erat, tempus non massa
                ac, auctor dapibus est. Aenean rutrum finibus nibh in mollis.Suspendisse at velit
                lacinia, suscipit leo ut, tristique magna. Aliquam erat volutpat. Morbi rhoncus a
                nisl non varius. Etiam pharetra turpis libero, at scelerisque quam faucibus sit
                amet.
              </div>
              <div className="upper-card"></div>
            </div>
            <div className="lower-container">
              <div className="lower-card"></div>
              <div className="lower-right-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc metus mauris, pretium
                in volutpat id, volutpat tempor ipsum. Vestibulum nec ultricies felis. Ut quis
                libero vitae ex lobortis fermentum at vitae metus. Phasellus lectus sapien, pulvinar
                id sollicitudin non, pellentesque quis dolor. Nulla lorem eros, vehicula blandit
                aliquam ac, accumsan nec massa. Integer luctus felis sit amet molestie dictum. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Fusce et mi gravida, mattis lorem
                sed, dignissim risus.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus dolor a turpis
                posuere, ac tincidunt orci dignissim. Aenean porta neque a consequat tempus. Quisque
                eu purus justo. Aliquam in felis quis turpis consequat facilisis. Donec non pulvinar
                urna. Aliquam pellentesque volutpat lacinia. Vestibulum nunc erat, tempus non massa
                ac, auctor dapibus est. Aenean rutrum finibus nibh in mollis.Suspendisse at velit
                lacinia, suscipit leo ut, tristique magna. Aliquam erat volutpat. Morbi rhoncus a
                nisl non varius. Etiam pharetra turpis libero, at scelerisque quam faucibus sit
                amet.
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default AboutUs;
