import { Resume } from '@reactive-resume/schema';
import debounce from 'lodash/debounce';
import { select, takeLatest } from 'redux-saga/effects';

import { updateResume } from '@/services/resume';
import { RootState } from '@/store/index';

import {
  addItem,
  addSection,
  deleteItem,
  deleteSection,
  duplicateItem,
  editItem,
  setResumeState,
} from '../resume/resumeSlice';

const DEBOUNCE_WAIT = 1000;

const debouncedSync = debounce((resume: Resume) => updateResume(resume), DEBOUNCE_WAIT);

function* handleSync() {
  const resume: Resume = yield select((state: RootState) => state.resume.present);

  debouncedSync(resume);
}

function* syncSaga() {
  yield takeLatest(
    [setResumeState, addItem, editItem, duplicateItem, deleteItem, addSection, deleteSection],
    handleSync
  );
}

export default syncSaga;
