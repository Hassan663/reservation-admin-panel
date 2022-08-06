import moment from 'moment';
import {
  SET_ERROR,
  FETCH_HOSTS,
  FETCH_THEMES,
  FETCH_GUESTS,
  FETCH_PROGRAM_NAMES,
  SET_VIDEO_CURRENT_TIME,
  SET_VIDEO_DURATION,
  FETCH_PROGRAM_TYPES,
  SEARCH_SETTINGS,
  CHANNEL_NAME,
  ADD_SEGMENT,
  SET_SEGMENT_DURATION,
  UPDATE_SEGMENT_TIME,
  UPDATE_SEGMENT_COLOR,
  DELETE_SEGMENT,
  RESET_SEGMENT,
  DELETE_ALL_SEGMENTS,
  VIDEO_DURATION,
  SET_ALL_LIVE,
  SET_FROM_TIME,
  SET_TO_TIME,
  SET_DATE,
  SET_BROADCAST_TYPE,
  SET_SOURCE,
  ADD_TICKER,
  ADD_SHOT,
  ADD_TICKER_SOURCE,
  ADD_SHOT_SOURCE,
  SET_SELECTION_WORDS,
  SET_TEXT_AND_SPEAKER,
  SET_SPEAKER,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  FETCH_TOPICS,
} from './actions';
import { CLIPPER_SEGMENT_COLORS } from 'constants/options';
import { setSegmentTime, deleteAllSegments } from './utils';
let toTime = moment();
let fromTime = moment().subtract(1, 'h').subtract(moment().minutes(), 'm');
const initialState = {
  guests: [],
  hosts: [],
  themes: [],
  topics: [],
  programTypes: [],
  programNames: [],
  videoCurrentTime: undefined,
  videoDuration: 0,
  speaker: '',
  textPlusSpeakers: [],
  selectedText: '',
  searchText: '',
  channelName: '',
  show: false,
  text: '',
  segments: [
    {
      time: 0,
      color: CLIPPER_SEGMENT_COLORS[0],
      active: true,
      dragging: false,
    },
  ],
  count: 0,
  dateAll: moment(new Date()),
  toTimeAll: toTime,
  fromTimeAll: fromTime,
  broadcastAll: 'interval',
  jobIds: [],
  source: '',
  tickerArray: [],
  shotArray: [],
};

function commonReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'NAVS': {
      return {
        ...state,
        jobIds: payload,
      };
    }
    case SET_TO_TIME:
      return {
        ...state,
        toTimeAll: payload,
      };
    case SET_FROM_TIME:
      return {
        ...state,
        fromTimeAll: payload,
      };
    case SET_DATE:
      return {
        ...state,
        dateAll: payload,
      };
    case SET_BROADCAST_TYPE:
      return {
        ...state,
        broadcastAll: payload,
      };

    case SET_ALL_LIVE:
      return {
        ...state,
        count: payload,
      };

    case SET_SEGMENT_DURATION:
      return {
        ...state,
        segments: setSegmentTime(state.segments, payload),
      };
    case ADD_SEGMENT:
      return {
        ...state,
        segments: payload,
      };
    case UPDATE_SEGMENT_COLOR:
      return {
        ...state,
        segments: payload,
      };
    case UPDATE_SEGMENT_TIME:
      return {
        ...state,
        segments: payload,
      };
    case DELETE_SEGMENT:
      return {
        ...state,
        segments: payload,
      };
    case RESET_SEGMENT:
      return {
        ...state,
        segments: [
          {
            time: 0,
            color: CLIPPER_SEGMENT_COLORS[0],
            active: true,
            dragging: false,
          },
        ],
      };
    case DELETE_ALL_SEGMENTS:
      return {
        ...state,
        segments: deleteAllSegments(state.segments),
      };

    case CHANNEL_NAME:
      return {
        ...state,
        channelName: payload,
      };

    case SET_ERROR:
      return { ...state, error: payload };

    case FETCH_HOSTS.REQUEST:
    case FETCH_THEMES.REQUEST:
    case FETCH_TOPICS.REQUEST:
    case FETCH_GUESTS.REQUEST:
    case FETCH_PROGRAM_NAMES.REQUEST:
    case FETCH_PROGRAM_TYPES.REQUEST:
      return { ...state, loading: true };

    case FETCH_HOSTS.SUCCESS:
    case FETCH_THEMES.SUCCESS:
    case FETCH_TOPICS.SUCCESS:
    case FETCH_GUESTS.SUCCESS:
    case FETCH_PROGRAM_NAMES.SUCCESS:
    case FETCH_PROGRAM_TYPES.SUCCESS:
      return { ...state, loading: false, ...payload };

    case FETCH_HOSTS.FAILURE:
    case FETCH_THEMES.FAILURE:
    case FETCH_TOPICS.FAILURE:
    case FETCH_GUESTS.FAILURE:
    case FETCH_PROGRAM_NAMES.FAILURE:
    case FETCH_PROGRAM_TYPES.FAILURE:
      return { ...state, loading: false, error: payload.error };

    case SET_VIDEO_CURRENT_TIME:
      return { ...state, videoCurrentTime: payload };
    case SET_VIDEO_DURATION:
      return { ...state, videoDuration: payload };
    case SEARCH_SETTINGS:
      return {
        ...state,
        searchText: payload,
      };
    case VIDEO_DURATION: {
      return {
        ...state,
        exactVideoDuration: payload,
      };
    }
    case SET_SOURCE: {
      return {
        ...state,
        source: payload,
      };
    }

    case ADD_TICKER: {
      return {
        ...state,
        tickerArray: payload,
      };
    }
    case ADD_SHOT: {
      return {
        ...state,
        shotArray: payload,
      };
    }
    case ADD_TICKER_SOURCE: {
      const tempTickerArray = [...state.tickerArray];
      const tickerToUpdate = tempTickerArray.find(ticker => ticker.id === payload.id);
      tickerToUpdate.IMGsrc = [...payload.data];
      tickerToUpdate.tickerLength = tickerToUpdate.tickerLength + payload.sizeCtrl;
      const tickerArray = tempTickerArray.map(ticker =>
        ticker.id === payload.id ? tickerToUpdate : ticker
      );
      return { ...state, tickerArray };
    }
    case ADD_SHOT_SOURCE: {
      const tempShotArray = [...state.shotArray];
      const shotToUpdate = tempShotArray.find(shot => shot.id === payload.id);
      shotToUpdate.IMGsrc = [...payload.data];
      shotToUpdate.shotLength = shotToUpdate.shotLength + payload.sizeCtrl;
      const shotArray = tempShotArray.map(shot => (shot.id === payload.id ? shotToUpdate : shot));
      return { ...state, shotArray };
    }
    case SET_SPEAKER: {
      return {
        ...state,
        speaker: payload,
      };
    }
    case SET_SELECTION_WORDS:
      return {
        ...state,
        selectedText: payload,
      };
    case SET_TEXT_AND_SPEAKER:
      return {
        ...state,
        textPlusSpeakers: payload,
      };
    case SHOW_CONFIRM:
      return {
        ...state,
        show: true,
        text: payload.text,
      };
    case HIDE_CONFIRM:
      return {
        ...state,
        show: false,
        text: '',
      };
    default:
      return state;
  }
}

export default commonReducer;
