import demoResume from '../src/data/demoState.json';
import emptyResume from '../src/data/initialState.json';

const resumesDictionary = {};
let useDemoResume = false;

const __init = () => {
  resumesDictionary['demore'] = demoResume;
  resumesDictionary['mtre01'] = emptyResume;

  for (var key in resumesDictionary) {
    const resume = resumesDictionary[key];

    resume.id = key;

    let date = new Date('December 15, 2020 11:20:25');
    resume.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    resume.createdAt = date.valueOf();
  }
};

const __getResume = () => {
  return useDemoResume
    ? resumesDictionary['demore']
    : resumesDictionary['mtre01'];
};

const __useDemoResume = (value) => {
  useDemoResume = value;
};

const __getResumeId = () => {
  return __getResume().id;
};

export default {
  database: jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnValue({
      once: jest.fn().mockResolvedValue({
        val: jest.fn().mockReturnValue(__getResume()),
      }),
    }),
  }),
  auth: jest.fn().mockReturnValue({
    onAuthStateChanged: jest.fn(),
  }),
};

export { __init, __useDemoResume, __getResumeId };
