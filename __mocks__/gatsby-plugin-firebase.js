import path from 'path';
import fs from 'fs';

const demoResumeId = 'demore';
const emptyResumeId = 'mtre01';
let resumesDictionary = {};
let useDemoResume = false;

const __init = () => {
  resumesDictionary = {};
  useDemoResume = false;

  const demoResume = __readFile('../src/data/demoState.json');
  resumesDictionary[demoResumeId] = demoResume;
  const emptyResume = __readFile('../src/data/initialState.json');
  resumesDictionary[emptyResumeId] = emptyResume;

  for (var key in resumesDictionary) {
    const resume = resumesDictionary[key];

    resume.id = key;

    let date = new Date('December 15, 2020 11:20:25');
    resume.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    resume.createdAt = date.valueOf();
  }
};

const __readFile = (fileRelativePath) => {
  const fileAbsolutePath = path.resolve(__dirname, fileRelativePath);
  const fileBuffer = fs.readFileSync(fileAbsolutePath);
  const fileData = JSON.parse(fileBuffer);
  return fileData;
};

const __getResume = () => {
  return useDemoResume
    ? resumesDictionary[demoResumeId]
    : resumesDictionary[emptyResumeId];
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
        val: jest.fn().mockImplementation(() => {
          return __getResume();
        }),
      }),
    }),
  }),
  auth: jest.fn().mockReturnValue({
    onAuthStateChanged: jest.fn().mockReturnValue(jest.fn()),
  }),
};

export { __init, __useDemoResume, __getResumeId };
