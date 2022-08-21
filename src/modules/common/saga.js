import { put, takeLatest, call } from 'redux-saga/effects';

import actions, {
  FETCH_THEMES,
  FETCH_HOSTS,
  FETCH_GUESTS,
  FETCH_PROGRAM_NAMES,
  FETCH_PROGRAM_TYPES,
  FETCH_TOPICS,
} from './actions';
import API from 'services/common';

export function* handleFetchThemes() {
  try {
    const { data } = yield call(API.fetchThemes);
    yield put(actions.fetchThemes.success({ themes: data.results ?? [] }));
  } catch (error) {
    yield put(actions.fetchThemes.failure(error));
  }
}

export function* handleFetchTopics() {
  try {
    const { data } = yield call(API.fetchTopics);
    yield put(actions.fetchTopics.success({ topics: data.results ?? [] }));
  } catch (error) {
    yield put(actions.fetchTopics.failure(error));
  }
}

export function* handleFetchHosts() {
  try {
    const { data } = yield call(API.fetchHosts);
    yield put(actions.fetchHosts.success({ hosts: data.results }));
  } catch (error) {
    yield put(actions.fetchHosts.failure(error));
  }
}

export function* handleFetchGuess() {
  try {
    const { data } = yield call(API.fetchGuests);
    yield put(actions.fetchGuests.success({ guests: data.results }));
  } catch (error) {
    yield put(actions.fetchGuests.failure(error));
  }
}

export function* handleFetchProgramNames() {
  try {
    const { data } = yield call(API.fetchProgramNames);
    yield put(actions.fetchProgramNames.success({ programNames: data.results }));
  } catch (error) {
    yield put(actions.fetchProgramNames.failure(error));
  }
}

export function* handleFetchProgramTypes() {
  try {
    const { data } = yield call(API.fetchProgramTypes);
    yield put(actions.fetchProgramTypes.success({ programTypes: data.results }));
  } catch (error) {
    yield put(actions.fetchProgramTypes.failure(error));
  }
}

export function* fetchHosts() {
  yield takeLatest(FETCH_HOSTS.REQUEST, handleFetchHosts);
}

export function* fetchThemes() {
  yield takeLatest(FETCH_THEMES.REQUEST, handleFetchThemes);
}

export function* fetchTopics() {
  yield takeLatest(FETCH_TOPICS.REQUEST, handleFetchTopics);
}

export function* fetchGuests() {
  yield takeLatest(FETCH_GUESTS.REQUEST, handleFetchGuess);
}

export function* fetchProgramNames() {
  yield takeLatest(FETCH_PROGRAM_NAMES.REQUEST, handleFetchProgramNames);
}

export function* fetchProgramTypes() {
  yield takeLatest(FETCH_PROGRAM_TYPES.REQUEST, handleFetchProgramTypes);
}
