import demoResume from '../src/data/demoState.json';
import emptyResume from '../src/data/initialState.json';

let resumesDictionary = {};
let useDemoResume = false;

const init = () => {
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

const getResume = () => {
  return useDemoResume ? demoResume : emptyResume;
};

const __useDemoResume = (value) => {
  useDemoResume = value;
};

const __getResumeId = () => {
  return getResume().id;
};

init();

module.exports = {
  __useDemoResume: __useDemoResume,
  __getResumeId: __getResumeId,
  database: jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnValue({
      once: jest.fn().mockResolvedValue({
        val: jest.fn().mockReturnValue(getResume()),
      }),
    }),
  }),
  auth: jest.fn().mockReturnValue({
    onAuthStateChanged: jest.fn(),
  }),
};
