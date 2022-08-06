import PropTypes, { node } from 'prop-types';
import { jobActions } from 'modules/jobs/actions';
import { useRef, useState, useEffect } from 'react';
import { Card } from 'components/Common';
import { DownloadIcon, EditIcon, CopyIcon } from 'assets/icons';
import { message as antMessage, Tooltip, Row, Col, Select } from 'antd';
import {
  SaveOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseCircleTwoTone,
  RedoOutlined,
} from '@ant-design/icons';
import './Statement.scss';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { edit_Translation, edit_Transcription, save_uneditable, Save_DB } from 'constants/hotkeys';
import { useHotkeys } from 'react-hotkeys-hook';
import { TOOLTIP_COLORS } from 'constants/options';
import contentExportActions from 'modules/contentExport/action';
import { colors } from 'constants/colors';
import guestsActions from 'modules/guests/actions';
import { useSelector, useDispatch } from 'react-redux';
import hostsActions from 'modules/hosts/actions';
import Button from 'components/Common/Button';

const getSelection = () => {
  if (window.getSelection) return window.getSelection().toString();
};
const Statement = ({
  Ttype,
  saveIcon,
  content,
  title,
  height,
  handleOnchange,
  searchText,
  setDisable,
  programInfo,
  language,
  PlayCheck,
  isQC,
  user,
}) => {
  const inputEl = useRef(null);
  const contentBox = useRef(null);
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [downloadText, setDownloadText] = useState('');
  const [editedText, seteditedText] = useState('');
  const [fontsizeStr, setfontsizeStr] = useState('1.5rem');
  const [fontsize, setfontsize] = useState(1.5);
  const [bgColor, setBgColor] = useState('grey');
  const [newSpeaker, setnewSpeaker] = useState('');
  const [items, setitems] = useState([]);
  const [nodesArray, setnodesArray] = useState([]);
  const [speakerArray, setSpeakerArray] = useState([]);
  const { guests } = useSelector(state => state.guestsReducer);
  const { hosts } = useSelector(state => state.hostsReducer);

  useEffect(() => {
    isEditing && contentBox.current.focus();
  }, [isEditing]);
  useEffect(() => {
    setDownloadText(contentBox.current.innerText);
  }, [content]);
  let exactDuration;
  useEffect(() => {
    const allSpans = document.querySelectorAll(`.editable-${Ttype}`);
    allSpans.forEach(span => {
      span.addEventListener('dblclick', function () {
        if (isEditing == true) {
          handleOnBlur();
        }
        exactDuration = this.getAttribute('data-time');
        exactDuration = Number(exactDuration.split('-')[0]);
        dispatch({ type: 'VIDEO_DURATION', payload: exactDuration });
        handleEdit();
      });
    });
  });

  useEffect(() => {
    let guestNames = [];
    guests.map(guest => {
      guestNames.push(guest.name);
    });
    let hostsNames = [];
    hosts.map(host => {
      hostsNames.push(host.name);
    });
    guestNames = guestNames.concat(hostsNames);
    const uniqueData = [...new Set(guestNames.map(item => item))];
    setitems(uniqueData);
  }, [guests, hosts]);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([contentBox.current.innerText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${
      programInfo.channel +
        '_' +
        programInfo.programName +
        '_' +
        programInfo.programDate +
        '_' +
        programInfo.programTime +
        '_' +
        title ?? 'statement'
    }.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const handleCopy = async () => {
    await setDownloadText(contentBox.current.innerText);
    await inputEl.current.select();
    await document.execCommand('copy');
    await antMessage.success('Copied', 1);
  };
  const handleEdit = () => {
    setBgColor('white');
    contentBox.current.focus();
    setIsEditing(true);
  };
  const makeJsonFrom = selector => {
    return [...document.querySelectorAll(selector)].map(item => ({
      duration: item.getAttribute('data-time'),
      speaker: item.getAttribute('speaker'),
      line: item.innerText,
    }));
  };
  const handleSave = () => {
    if (saveIcon !== undefined) {
      if (Ttype === 'Transcription') {
        const json = makeJsonFrom(`.editable-${Ttype}`);
        if (user.role === 'QC') {
          dispatch(
            jobActions.updateJob.request({
              id: saveIcon,
              data: { transcription: json },
              loading: false,
            })
          );
        } else if (user.role === 'Clipper') {
          dispatch(
            contentExportActions.updateExportJob.request({
              id: saveIcon,
              data: { transcription: json },
              loading: false,
            })
          );
        }
      } else if (Ttype === 'Translation') {
        const json = makeJsonFrom(`.editable-${Ttype}`);
        if (user.role === 'QC') {
          dispatch(
            jobActions.updateJob.request({
              id: saveIcon,
              data: { translation: json },
              loading: false,
            })
          );
        } else if (user.role === 'Clipper') {
          dispatch(
            contentExportActions.updateExportJob.request({
              id: saveIcon,
              data: { translation: json },
              loading: false,
            })
          );
        }
      }
    }
  };
  const handleOnBlur = () => {
    setIsEditing(false);
    setBgColor('grey');
    const json = makeJsonFrom(`.editable-${Ttype}`);
    handleOnchange(json);
    if (isQC) {
      setDisable(false);
    }
  };
  useEffect(() => {
    if (setDisable !== undefined) {
      if (isEditing) {
        if (isQC) {
          setDisable(false);
        }
      }
    }
  }, [isEditing]);
  const handlefont = s => {
    if (fontsize + s < 2.5 && fontsize + s > 1.5) {
      setfontsize(fontsize + s);
      setfontsizeStr(`${fontsize}rem`);
    }
  };
  const extra = (
    <div className="statement-icons-wrapper">
      <div style={{ marginLeft: '10px' }}>
        <FontAwesomeIcon
          icon={faSearchPlus}
          size="lg"
          style={{ color: 'white', fontSize: 'x-large', marginLeft: '1rem' }}
          onClick={() => handlefont(+0.1)}
        />
        <FontAwesomeIcon
          icon={faSearchMinus}
          size="lg"
          style={{ color: 'white', fontSize: 'x-large', marginLeft: '0.5rem' }}
          onClick={() => handlefont(-0.1)}
        />
      </div>
      <div style={{ marginRight: '1.5rem' }}>
        {saveIcon === undefined ? null : (
          <Tooltip
            placement="top"
            color={TOOLTIP_COLORS[0]}
            title={Ttype === 'Translation' ? 'Save (Alt + Q)' : 'Save (Alt + W)'}
          >
            <SaveOutlined
              style={{ fontSize: '1.7rem', color: 'white' }}
              onClick={() => handleSave()}
            />
          </Tooltip>
        )}
        <DownloadIcon
          onClick={handleDownload}
          style={{ fontSize: '1.7rem', color: 'white', marginLeft: '10px' }}
        />
        <CopyIcon
          onClick={handleCopy}
          style={{ fontSize: '1.7rem', color: 'white', marginLeft: '10px' }}
        />
        <Tooltip
          placement="top"
          color={TOOLTIP_COLORS[0]}
          title={Ttype === 'Translation' ? 'Edit (Alt + Z)' : 'Edit (Alt + X)'}
        >
          <EditIcon
            onClick={handleEdit}
            style={{ fontSize: '1.7rem', color: 'white', marginLeft: '10px' }}
          />
        </Tooltip>
      </div>
    </div>
  );

  useEffect(() => {
    if (searchText !== undefined) {
      console.log(typeof searchText);
      let t = searchText.text.split(' ');

      t = t.filter(item => item !== '');
      console.log(t);
      const data = document.querySelectorAll(`.editable-${searchText.T}`);
      data.forEach(d => {
        if (new RegExp(t.join('|')).test(d.innerText.trim()) && searchText.text !== '') {
          d.style.backgroundColor = 'orange';
        } else {
          d.style.backgroundColor = 'inherit';
        }
      });
    }
  }, [searchText, Ttype]);

  const onKeyDown = e => {
    if (e.ctrlKey) e.preventDefault();
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useHotkeys(
    edit_Transcription,
    e => {
      e.preventDefault();
      let tag = document.getElementsByClassName(`editable-main-Transcription`);
      tag[0].focus();
      tag[0].contentEditable = 'true';
      tag[0].style.backgroundColor = 'white';
      tag[0].onblur = function () {
        tag[0].contentEditable = 'false';
        tag[0].style.backgroundColor = 'inherit';
      };
    },
    []
  );
  useHotkeys(
    edit_Translation,
    e => {
      e.preventDefault();
      let tag = document.getElementsByClassName(`editable-main-Translation`);
      tag[0].focus();
      tag[0].contentEditable = 'true';
      tag[0].style.backgroundColor = 'white';
      tag[0].onblur = function () {
        tag[0].contentEditable = 'false';
        tag[0].style.backgroundColor = 'inherit';
      };
    },
    []
  );
  const saveInReducer = e => {
    if (e.altKey && e.keyCode == 81) {
      e.preventDefault();
      if (Ttype === 'Translation') {
        const translation = makeJsonFrom(`.editable-Translation`);
        if (translation.length !== 0) {
          if (translation.length !== 0) {
            if (user.role === 'QC') {
              dispatch(
                jobActions.updateJob.request({
                  id: saveIcon,
                  data: { translation: translation },
                  loading: false,
                })
              );
            } else if (user.role === 'Clipper') {
              dispatch(
                contentExportActions.updateExportJob.request({
                  id: saveIcon,
                  data: { translation: translation },
                  loading: false,
                })
              );
            }
          }
        }
      }
    } else if (e.altKey && e.keyCode == 87) {
      e.preventDefault();

      if (Ttype === 'Transcription') {
        const transcription = makeJsonFrom(`.editable-Transcription`);
        if (transcription.length !== 0) {
          if (transcription.length !== 0) {
            if (user.role === 'QC') {
              dispatch(
                jobActions.updateJob.request({
                  id: saveIcon,
                  data: { transcription: transcription },
                  loading: false,
                })
              );
            } else if (user.role === 'Clipper') {
              dispatch(
                contentExportActions.updateExportJob.request({
                  id: saveIcon,
                  data: { transcription: transcription },
                  loading: false,
                })
              );
            }
          }
        }
      }
    } else if (e.altKey) {
      e.preventDefault();
      const json = makeJsonFrom(`.editable-${Ttype}`);
      handleOnchange(json);
      if (isQC) {
        setDisable(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', saveInReducer);
    return () => {
      window.removeEventListener('keydown', saveInReducer);
    };
  }, [saveIcon]);

  const sliderscroll = e => {
    scrollTRSANSCRIPTION();
    scrollTRSANSLATION();
  };

  useEffect(() => {
    const slider = document.querySelector('#ims-slider');
    slider?.addEventListener('click', sliderscroll, false);
    return () => {
      slider?.removeEventListener('click', sliderscroll, false);
    };
  }, []);

  useEffect(() => {
    if (Ttype === 'Transcription') {
      if (PlayCheck == false) {
        var t1 = setInterval(scrollTRSANSCRIPTION, 1000);
      }
      return () => {
        clearInterval(t1);
      };
    }
  }, [PlayCheck, Ttype]);

  const scrollTRSANSCRIPTION = e => {
    let tag = document.getElementById('bg-selectedTranscription');

    if (tag !== undefined && tag !== null) {
      tag.parentNode.scrollTop = tag.offsetTop - 50;
    }
  };
  useEffect(() => {
    if (Ttype === 'Translation') {
      if (PlayCheck == false) {
        var t2 = setInterval(scrollTRSANSLATION, 2000);
      }
      return () => {
        clearInterval(t2);
      };
    }
  }, [PlayCheck, Ttype, isQC]);
  const scrollTRSANSLATION = e => {
    let tag2 = document.getElementById('bg-selectedTranslation');

    if (tag2 !== undefined && tag2 !== null) {
      tag2.parentNode.scrollTop = tag2.offsetTop - 50;
    }
  };
  const renderAddSpeaker = () => {
    const addSpeakerDive = document.getElementById('addSpeakerCard');
    if (addSpeakerDive !== 'undefined' && addSpeakerDive !== null) {
      addSpeakerDive.style.display = 'block';
      var posy = 0;
      var posx = 0;
      if (!e) var e = window.event;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX;
        posy = e.clientY;
      }
      addSpeakerDive.style.right = '10px';
      addSpeakerDive.style.top = posy - 135 + 'px';
    }
  };
  const removeAddSpeaker = () => {
    const speakerDiv = document.getElementById('addSpeakerCard');
    if (typeof speakerDiv !== 'undefined' && speakerDiv !== null) {
      speakerDiv.style.display = 'none';
    }
  };
  const handleSpeakerChange = value => {
    setnewSpeaker(value);
  };

  const handleSelection = e => {
    let check = window.getSelection().focusNode.parentElement;
    if (check.hasAttribute('speakerTag')) return;
    let tempNodeArray = [];
    let start = window.getSelection().focusNode.parentElement;
    let end = window.getSelection().anchorNode.parentElement;
    let timeA = start.getAttribute('data-time');
    let timeB = end.getAttribute('data-time');
    let tempVra;
    if (timeA?.split('-')[0] > timeB?.split('-')[0]) {
      tempVra = start;
      start = end;
      end = tempVra;
    }
    const data = document.querySelectorAll(`.editable-Transcription`);
    let flag = false;
    data.forEach(d => {
      if (d === start) {
        flag = true;
      }
      if (flag === true) {
        tempNodeArray.push(d);
      }
      if (d === end) {
        flag = false;
      }
    });

    setnodesArray(tempNodeArray);
    renderAddSpeaker();
  };
  const handleAddSpeaker = () => {
    console.log(nodesArray);
    nodesArray?.forEach(node => {
      node.setAttribute('speaker', newSpeaker);
    });
    const json = makeJsonFrom(`.editable-${Ttype}`);
    handleOnchange(json);
    removeAddSpeaker();
  };
  const selectSpeakerNodes = text => {
    let speakerNodes = document.querySelectorAll(`#speaker${Ttype}`);
    let tempArray = [];
    speakerNodes.forEach(node => {
      if (node.innerHTML === text) {
        tempArray.push(node);
      }
    });
    setSpeakerArray(tempArray);
    let nodes = document.querySelectorAll(`[tagattr="${text.trim()}Transcription"]`);
    setnodesArray(nodes);
    renderAddSpeaker();
  };
  useEffect(() => {
    let speakerNodes = document.querySelectorAll(`#speaker${Ttype}`);
    if (speakerNodes === null || speakerNodes === undefined) return;
    speakerNodes.forEach(node => {
      node.addEventListener('contextmenu', () => selectSpeakerNodes(node.innerHTML));
    });
    return () => {
      let speakerNodes = document.querySelectorAll(`#speaker${Ttype}`);

      speakerNodes.forEach(node => {
        node.removeEventListener('contextmenu', () => selectSpeakerNodes(node.innerHTML));
      });
    };
  }, [content]);
  return (
    <div className="segment-statement-wrapper">
      <input
        type="text"
        style={{ opacity: 0, position: 'absolute' }}
        value={downloadText}
        ref={inputEl}
        onClick={handleCopy}
      />
      {Ttype === 'Transcription' ? (
        <Card
          id="addSpeakerCard"
          shape="round"
          content={
            <>
              <CloseCircleTwoTone
                style={{
                  float: 'right',
                  fontSize: '28px',
                  padding: '0.6rem',
                }}
                twoToneColor="#f26a32"
                fill="black"
                onClick={removeAddSpeaker}
              />{' '}
              <h2 style={{ fontWeight: 'bold', marginTop: '30px' }}>Edit Speaker</h2>
              <div style={{ marginLeft: '50px' }}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'white',
                    marginBottom: '3px',
                    fontSize: fontsizeStr,
                  }}
                >
                  Speaker
                </div>
                <Select
                  showSearch
                  placeholder="Add Speaker"
                  style={{
                    width: '15rem',
                  }}
                  onChange={handleSpeakerChange}
                >
                  {items.map(item => (
                    <Option style={{ color: 'red' }} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <RedoOutlined
                  style={{ color: 'white', marginLeft: '15px', fontSize: '20px' }}
                  onClick={() => {
                    dispatch(guestsActions.getGuests.request());
                    dispatch(hostsActions.getHosts.request());
                  }}
                />
                <br />
                <Button
                  variant="secondary"
                  type="medium"
                  style={{ width: '150px', height: '50px', marginTop: '20px', marginLeft: '45px' }}
                  onClick={() => {
                    handleAddSpeaker();
                  }}
                >
                  Apply
                </Button>
              </div>
            </>
          }
        ></Card>
      ) : null}

      <Card
        title={title}
        bg="light"
        shape="round"
        content={
          <div className="segment-statement-content-wrapper">
            <Card
              variant="secondary"
              bg={bgColor}
              shape="round"
              content={
                <div
                  onKeyDown={onKeyDown}
                  onKeyPress={onKeyDown}
                  onKeyUp={onKeyDown}
                  onPaste={false}
                  onCopy={false}
                  onCut={false}
                  dangerouslySetInnerHTML={{ __html: content }}
                  id="editable-content"
                  className={`editable-main-${Ttype} ${language}`}
                  style={{
                    height,
                    overflow: 'auto',
                    outline: '0px solid transparent',
                    fontSize: fontsizeStr,
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                  contentEditable={isEditing}
                  onBlur={handleOnBlur}
                  onContextMenu={e => {
                    e.preventDefault();
                    handleSelection();
                  }}
                  onClick={e => {
                    if (e.detail > 1) {
                      e.preventDefault();
                    }
                  }}
                  ref={contentBox}
                ></div>
              }
            />
          </div>
        }
        extra={extra}
      />
    </div>
  );
};
Statement.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  height: PropTypes.string,
};
export default Statement;
