/* global window */
import { PRIORITY_COLORS, STATUS_COLORS } from 'constants/options';
import { ACTUS_WEBHOST } from 'constants/index';
import moment from 'moment';
import _ from 'lodash';
import { colors } from 'constants/colors';
const host = window.location.origin;
var url = String(window.location.pathname);
export const getUserId = () => window.localStorage[`${host}_uid`] ?? '';
export const getTokens = () => JSON.parse(window.localStorage?.[`${host}_token`] ?? '{}');
export const getUser = () => JSON.parse(window.localStorage?.[`${host}_user`] ?? '{}');

export const setSessionCookies = user => {
  console.log(user);
  window.localStorage['loggedInUserId'] = user.user._id;
  window.localStorage[`${host}_user`] = JSON.stringify(user);
  window.localStorage[`${host}_uid`] = JSON.stringify(user.user._id);
  window.localStorage[`${host}_token`] = JSON.stringify(user.token);
};

export const unSetSessionCookies = () => {
  window.localStorage.removeItem(`userloggedin`);
  window.localStorage.removeItem(`currentUserFirebaseId`);
  window.localStorage.removeItem(`${host}_user`);
  window.localStorage.removeItem(`${host}_uid`);
  window.localStorage.removeItem(`${host}_token`);
  window.localStorage.removeItem('tokenid');
};
export const setTokens = tokens => {
  window.localStorage[`${host}_tokens`] = JSON.stringify(tokens);
};

export const getLastPath = url => {
  const parts = url.split('/');
  if (parts[parts.length - 1].length === 0) {
    return parts[parts.length - 2];
  }
  return parts[parts.length - 1];
};

export const getQueryParam = (name, query) => {
  const regx = new RegExp(`${name}=([^&]*)`);
  const tokens = query.match(regx);
  return tokens ? tokens[1] : undefined;
};

export const transformFormValues = (data, fields, defaultValue = null) => {
  return fields.reduce((prev, field) => {
    if (field && typeof field === 'object') {
      let value = data[field.name];
      if (value && typeof value === 'string') {
        value = value.trim() || field.defaultValue || defaultValue;
      }
      prev[field] = value;
    }
    if (typeof field === 'string') {
      let value = data[field];
      if (value && typeof value === 'string') {
        value = value.trim() || defaultValue;
      }
      prev[field] = value;
    }

    return prev;
  }, {});
};

export const getDurationParams = (key, range) => {
  const params = { period: key };
  const format = 'YYYY-MM-DDTHH:mm:ss';
  if (key === 'custom') {
    if (range.length === 2) {
      // const dateFormat = 'YYYY-MM-DD';
      let [fromDate, toDate] = range;
      if (fromDate.format(format) === toDate.format(format)) {
        fromDate = fromDate.subtract(1, 'days');
      }
      fromDate = fromDate.utc().format(format);
      toDate = toDate.utc().format(format);
      params.fromDate = fromDate;
      params.toDate = toDate;
      return params;
    }
    return null;
  }
  params.toDate = moment.utc().format(format);
  if (key === 'day') {
    params.fromDate = moment.utc().subtract(1, 'days').format(format);
  } else if (key === 'week') {
    params.fromDate = moment.utc().subtract(7, 'days').format(format);
  } else if (key === 'month') {
    params.fromDate = moment.utc().subtract(1, 'months').format(format);
  } else if (key === 'quarter') {
    params.fromDate = moment.utc().subtract(3, 'months').format(format);
  }
  return params;
};

const returnMiliSeconds = () => {
  const now = moment().format('MMMM D, YYYY HH:mm:ss Z');
  const then = ' Jan 1, 1970 10:10:00 GMT+0500';

  const ms = moment(now, 'MMMM D, YYYY HH:mm:ss Z').diff(moment(then, 'MMMM D, YYYY HH:mm:ss Z'));
  const d = moment.duration(ms);
  return Math.floor(d.asMilliseconds());
};
export const formateTime = time => {
  const [startTime, endTime] = time?.split(' to ') ?? [];
  let ST = moment(startTime, ['hh:mm:ss A']);
  let ET = moment(endTime, ['hh:mm:ss A']);
  var t = ST.format('HH:mm:ss') + ' to ' + ET.format('HH:mm:ss');
  return t;
};
export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const createThumbnail = (channel, time) =>
  `${ACTUS_WEBHOST}/api/channels/${channel}/thumbnail?time=${formatDate(
    time,
    'YYYY_MM_DD_HH_mm_ss'
  )}`;

export const modifySeg = (obj, guest) => {
  const summary = guest.map(gue => {
    return { statement: '', participant: gue.name, pillar: '', sentiment: '' };
  });
  obj.segmentAnalysis.summary = [...summary];
  return { ...obj };
};

export const modifyAllSeg = (arr, guests) => {
  let newArr = arr.map(segment => {
    let summary = guests.map((gue, i) => {
      return { statement: '', participant: '', pillar: '', sentiment: '' };
    });
    segment.segmentAnalysis.summary = [...summary];
    return segment;
  });

  return [...newArr];
};

export const calcSegmentTime = (totalTime, segmentEndTime, prevSegEndTime, i) => {
  let [startTime, endTime] = totalTime?.split(' to ') ?? [];
  let ST = moment(startTime, ['hh:mm:ss A']);
  let ET = moment(endTime, ['hh:mm:ss A']);
  let et = ET.format('HH:mm:ss');
  let st = ST.format('HH:mm:ss');
  ST = moment(st, ['HH:mm:ss']).add(segmentEndTime, 'second');
  let segEndTime = ST.format('HH:mm:ss');
  let segStartTime;
  if (!prevSegEndTime) {
    segStartTime = st;
  } else {
    ST = moment(st, ['HH:mm:ss']).add(prevSegEndTime, 'second');
    segStartTime = ST.format('HH:mm:ss');
  }
  return segStartTime + ' to ' + segEndTime;
};

export const pascalCase = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getStatusColor = text => STATUS_COLORS[text];
export const getPriorityColor = text => PRIORITY_COLORS[text];

export const createParts = (segments, startTime, from) => {
  return segments.map((segment, index) => {
    const prevSeg = segments[index - 1];
    const _from = prevSeg?.time ?? from;
    const _to = segment.time;
    const segmentDuration = _to - _from;
    return createSegmentBoundry(startTime, _from, _to, segment.active, segmentDuration);
  });
};

export const createSegmentBoundry = (dateTime, from, to, active, segmentDuration) => ({
  from: addTimeToDate(dateTime, from),
  to: addTimeToDate(dateTime, to),
  active,
  segmentDuration,
});
const addTimeToDate = (date, seconds, format = 'YYYY-MM-DD HH:mm:ss') => {
  const _date = moment(date);
  return _date.add(seconds, 'seconds').format(format);
};

export const makeTextFrom = (arr, currentTime, type = 'text') => {
  let uniqueTags = [];
  arr?.map(j => {
    if (uniqueTags.indexOf(j.speaker) === -1) {
      uniqueTags.push(j.speaker);
    }
  });
  if (!arr?.length) return '';
  let res = arr.reduce((acc, c, index) => {
    // const [start, end] = c.duration.split('-');
    const start = c.duration.split('-')[0];
    let end;
    if (index < arr.length - 1) {
      end = arr[index + 1]?.duration.split('-')[0];
    } else {
      end = arr[index]?.duration.split('-')[1];
    }

    var colors = [
      'FF4D4F',
      'FF7A45',
      'FA8C16',
      'A0D911',
      'FFD666',
      'FADB14',
      'EB2F96',
      'a2db',
      'FF616D',
      'BF1363',
      'BB371A', //
      'FF4D4F',
      'FF7A45',
      'FA8C16',
      'A0D911',
      'FFD666', //
      'EB2F96',
      'a2db',
      'FF616D',
      'BF1363',
      'BB371A',
      'CD113B',
      'D83A56',
      'F54748',
      'BB371A',
      'FFC947',
      'F55C47',
      'F21170',
      'FF8303',
      'FED049',
    ];
    let selected;
    uniqueTags.map((uni, index) => {
      if (uni === c.speaker) {
        selected = +start <= currentTime && +end > currentTime && 'bg-selected';
        acc += `<span  id='${selected + type}' class="editable-${type} ${selected} ${
          colors[index]
        } nowrap" data-time='${c.duration}' speaker="${c.speaker.trim()}" tagattr="${
          c.speaker.trim() + type
        }">${c.line}</span>`;
      }
    });

    return acc;
  }, '');
  return res;
};

export const rowCOl = (arr, currentTime, type = 'text') => {
  let uniqueTags = [];
  arr?.map(j => {
    if (uniqueTags.indexOf(j.speaker) === -1) {
      uniqueTags.push(j.speaker);
    }
  });
  let tempArray = [];
  if (arr && arr.length > 0) {
    let currSpeaker = arr[0].speaker;
    let currlines = [];
    arr.map((obj, index) => {
      if (obj.speaker == currSpeaker) {
        currlines.push(obj);
        if (index === arr.length - 1) {
          tempArray.push({ speaker: currSpeaker, lines: currlines });
        }
      } else {
        tempArray.push({ speaker: currSpeaker, lines: currlines });
        currlines = [];
        currSpeaker = obj.speaker;
        currlines.push(obj);
        if (index === arr.length - 1) {
          tempArray.push({ speaker: currSpeaker, lines: currlines });
        }
      }
    });
    let finalarray = [];
    tempArray.map(obj => {
      let res = makeTextFrom(obj.lines, currentTime, type);
      finalarray.push({ speaker: obj.speaker, spans: res });
    });
    let string = '';
    finalarray.map(obj => {
      string += `<div class="abc" > <div id="speaker${type}" class="speaker ${
        colors[uniqueTags.indexOf(obj.speaker)]
      }" speakerTag="true"  contentEditable=${false}>${obj.speaker}</div> <div  class="tag">${
        obj.spans
      }</div></div>`;
    });

    if (string !== undefined) {
      return string;
    } else {
      return '';
    }
  }
};
export const calculateWidth = ({ currentTime, duration }) => {
  if (!currentTime || !duration) return 0;

  return (currentTime / duration) * 100;
};

export const setSegmentTime = (segments, payload) => {
  segments[segments.length - 1].time = payload;
  let _segments = [...segments];
  return _segments;
};

export const deleteAllSegments = segments => {
  let _segments = segments.filter((_, index) => index === segments.length - 1);
  return _segments;
};

export const updateSegmentTime = (i, segments, time) => {
  segments[i].time = time;
  return [...segments];
};

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const createSegmentThumbnail = (segments, currentSegmentTime, startTime, channel) => {
  segments.reverse();
  const prevSegTime = segments.find(segment => segment.time < currentSegmentTime)?.time ?? 0;
  let thumbnailTime = prevSegTime
    ? moment(startTime).add(prevSegTime, 'seconds')
    : moment(startTime);
  const thumbnail = createThumbnail(channel, thumbnailTime);
  return thumbnail;
};
