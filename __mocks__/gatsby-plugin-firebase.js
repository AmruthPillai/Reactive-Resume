import path from 'path';
import fs from 'fs';

const testUser = {
  email: 'test.user@noemail.com',
  name: 'Test User',
  uid: 'testuser123',
};
let onAuthStateChangedObservers = [];
let resumesDictionary = {};
let useDemoResume = false;

const auth = () => {
  const __init = () => {
    onAuthStateChangedObservers = [];
  };

  const onAuthStateChanged = (observer) => {
    onAuthStateChangedObservers.push(observer);

    return () => {
      onAuthStateChangedObservers = onAuthStateChangedObservers.filter(
        (observer) => observer !== observer,
      );
    };
  };

  const signInAnonymously = async () => {
    onAuthStateChangedObservers.forEach((observer) => observer(testUser));

    var result = await Promise.resolve(testUser);
    return result;
  };

  return {
    __init,
    onAuthStateChanged,
    signInAnonymously,
  };
};

const database = () => {
  const demoResumeId = 'demore';
  const emptyResumeId = 'mtre01';

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
      resume.name = `Test Resume ${key}`;
      resume.user = testUser.uid;

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

  return {
    __init,
    __getResume,
    __useDemoResume,
    ref: jest.fn().mockReturnValue({
      once: jest.fn().mockResolvedValue({
        val: jest.fn(__getResume),
      }),
    }),
  };
};

export default {
  auth,
  database,
};
