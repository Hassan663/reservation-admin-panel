import React from 'react';
import './Question.scss';
import google from './../../assets/images/google.png';
import facebook from './../../assets/images/facebook.png';
import insta from './../../assets/images/insta.png';
import twitter from './../../assets/images/twitter.png';

const Question = () => {
  return (
    // <Rectangle bg={hero} content={
    //   <>
    <div className="main_hero_div">
      <div className="sub_main_hero_div">
        <div>
          <button className="hero_div_btn">Sign up</button>
        </div>
        <div>
          <button className="hero_div_btn1">Log in</button>
        </div>
        <div>
          <p className="hero_div_p">or sign in with</p>
        </div>
        <div>
          <img className="hero_div_img" src={google} alt="google" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {' '}
            <img src={facebook} alt="facebook" />
          </div>
          <div>
            {' '}
            <img src={insta} alt="insta" style={{ margin: '20px' }} />
          </div>
          <div>
            {' '}
            <img src={twitter} alt="twitter" />
          </div>
        </div>
      </div>
    </div> // </>}></Rectangle>

    // </div>
  );
};

export default Question;
