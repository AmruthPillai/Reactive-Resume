import path from 'path';
import fs from 'fs';

const __testUser = {
  email: 'test.user@noemail.com',
  name: 'Test User',
  uid: 'testuser123',
};
let __onAuthStateChangedObservers = [];
let __resumesDictionary = {};
let __databaseRefUpdateCalls = [];

const auth = () => {
  const __init = () => {
    __onAuthStateChangedObservers = [];
  };

  const onAuthStateChanged = (observer) => {
    __onAuthStateChangedObservers.push(observer);

    return () => {
      __onAuthStateChangedObservers = __onAuthStateChangedObservers.filter(
        (observer) => observer !== observer,
      );
    };
  };

  const signInAnonymously = async () => {
    __onAuthStateChangedObservers.forEach((observer) => observer(__testUser));

    var result = await Promise.resolve(__testUser);
    return result;
  };

  return {
    __init,
    onAuthStateChanged,
    signInAnonymously,
  };
};

const database = () => {
  const __demoResumeId = 'demore';
  const __emptyResumeId = 'mtre01';

  const __init = () => {
    __resumesDictionary = {};
    __databaseRefUpdateCalls = [];

    const demoResume = __readFile('../src/data/demoState.json');
    __resumesDictionary[__demoResumeId] = demoResume;
    const emptyResume = __readFile('../src/data/initialState.json');
    __resumesDictionary[__emptyResumeId] = emptyResume;

    for (var key in __resumesDictionary) {
      const resume = __resumesDictionary[key];

      resume.id = key;
      resume.name = `Test Resume ${key}`;
      resume.user = __testUser.uid;

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

  const ref = (path) => {
    if (!path) {
      throw new Error('Not implemented.');
    }

    const resumesPath = path.startsWith('resumes/');
    const usersPath = path.startsWith('users/');
    if (!resumesPath && !usersPath) {
      throw new Error('Unknown Reference path.');
    }

    const databaseLocationId = path.substring(path.indexOf('/') + 1);
    if (!databaseLocationId) {
      throw new Error('Unknown database location id.');
    }

    const once = async (eventType) => {
      if (!eventType) {
        throw new Error('Event type must be provided.');
      }

      if (eventType !== 'value') {
        throw new Error('Unknown event type.');
      }

      const val = () => {
        if (resumesPath) {
          return __resumesDictionary[databaseLocationId]
            ? __resumesDictionary[databaseLocationId]
            : null;
        }

        if (usersPath) {
          return __testUser;
        }

        return null;
      };

      return Promise.resolve({ val });
    };

    const set = (value) => {
      if (resumesPath) {
        if (value === null) {
          delete __resumesDictionary[databaseLocationId];
        } else {
          __resumesDictionary[databaseLocationId] = value;
        }
      }

      return Promise.resolve();
    };

    const update = async (value) => {
      if (resumesPath) {
        if (value === null) {
          delete __resumesDictionary[databaseLocationId];
        } else {
          __resumesDictionary[databaseLocationId] = value;
        }
      }

      __databaseRefUpdateCalls.push(value);

      return Promise.resolve();
    };

    return {
      once,
      set,
      update,
      __updateCalls: __databaseRefUpdateCalls,
    };
  };

  const ServerValue = {
    TIMESTAMP: Date.now(),
  };

  return {
    __demoResumeId,
    __emptyResumeId,
    __init,
    ref,
    ServerValue,
  };
};

export default {
  auth,
  database,
};
