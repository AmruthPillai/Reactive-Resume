import { Resume } from '@reactive-resume/schema';
import debounce from 'lodash/debounce';
import { select, takeLatest } from 'redux-saga/effects';

import { updateResume } from '@/services/resume';

import {
  addItem,
  addSection,
  deleteItem,
  deleteSection,
  duplicateItem,
  editItem,
  setResumeState,
} from '../resume/resumeSlice';

const DEBOUNCE_WAIT = 2500;

const debouncedSync = debounce((resume: Resume) => updateResume(resume), DEBOUNCE_WAIT);

function* handleSync() {
  const resume: Resume = yield select((state) => state.resume);

  debouncedSync(resume);
}

function* syncSaga() {
  yield takeLatest(
    [setResumeState, addItem, editItem, duplicateItem, deleteItem, addSection, deleteSection],
    handleSync
  );
}

export default syncSaga;
