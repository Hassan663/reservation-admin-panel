import React, { useState } from 'react';
import './MenuList.scss';
import AryNews from '../../../assets/images/ary-news.png';
import { Descriptions } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import LeftArrow from '../../../assets/images/leftArrow.png';
import RightArrow from '../../../assets/images/rightArrow.png';

const MenuList = () => {
  const [currentbutton, setCurrentButton] = useState(0);
  const onButtonClick = i => {
    setCurrentButton(i);
  };
  const buttons = ['APPETIZERS', 'DRINKS', 'MAIN', 'SPECIALS', 'DESSERTS'];
  const MenuData = [
    {
      Name: 'APPETIZERS',
      dataArray: [
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
      ],
    },
    {
      Name: 'DRINKS',
      dataArray: [
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
      ],
    },
    {
      Name: 'MAIN',
      dataArray: [
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
      ],
    },
    {
      Name: 'SPECIALS',
      dataArray: [
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
      ],
    },
    {
      Name: 'DESSERTS',
      dataArray: [
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
        {
          Image: '',
          Label: 'Lorem Ipsum',
          info: 'Lorem Ipsum dolor est lorem ipsum dolor est',
          price: '$5.75',
        },
      ],
    },
  ];
  const increment = () => {
    if (currentbutton !== MenuData.length - 1) {
      setCurrentButton(currentbutton + 1);
    } else {
      setCurrentButton(0);
    }
  };

  const decrement = () => {
    if (currentbutton !== 0) {
      setCurrentButton(currentbutton - 1);
    } else {
      setCurrentButton(MenuData.length - 1);
    }
  };
  return (
    <div className="menuItems">
      <div className="button_container">
        {buttons.map((btn, index) => (
          <button
            className={currentbutton === index ? 'child bg' : 'child'}
            onClick={() => onButtonClick(index)}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="caerosal">
        <div>
          <button className="arrow-button" onClick={() => decrement()}>
            {/* <IoIosArrowBack /> */}
            <img src={LeftArrow} />
            <img src={LeftArrow} />
          </button>
        </div>
        <div className="caerosal_div">
          <Carousel
            axis="horizontal"
            showArrows={false} // to show Arrows
            selectedItem={currentbutton} // current selected Item
            showStatus={false} // this is the number of item selected from total
            showIndicators={false} // these are the dots shows under the Selected Item
            showThumbs={false} // these are all the items under of caresol
            stopOnHover={true} // used to stop the item on hover
            useKeyboardArrows={true} // use the keyboard keys to slide the slider
            // width={90} // width of caerosal
            // renderArrowPrev={}
            // renderArrowNext={}
            // infiniteLoop
            width="700px"
            height="400px"
          >
            {MenuData.map((menu, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: '#00090B',
                    flexWrap: 'wrap',
                    // paddingTop: '150px',
                  }}
                >
                  {menu?.dataArray.map((_, i) => {
                    return (
                      <div key={i} className="item">
                        <div
                          style={{
                            border: '2px solid grey',
                            width: '5rem',
                            height: '5rem',
                            margin: 'auto',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                          }}
                        ></div>
                        <div style={{ margin: 'auto', marginLeft: '-70px', width: '35%' }}>
                          <label
                            style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bolder' }}
                          >
                            {_.Label}
                          </label>
                          <br />
                          <label>{_.info}</label>
                          <br />
                          <label style={{ color: 'white', fontSize: '1rem' }}>{_.price}</label>
                          {/* <Descriptions title={_.Label}>
                            <Descriptions.Item>{_.info}</Descriptions.Item>
                            <Descriptions.Item>{_.price}</Descriptions.Item>
                          </Descriptions> */}
                        </div>
                        {/* <img src={AryNews} style={{ height: '20px', width: '30px' }} /> */}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div>
          <button className="arrow-button" onClick={() => increment()}>
            {/* <IoIosArrowForward /> */}
            <img src={RightArrow} />
            <img src={RightArrow} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
