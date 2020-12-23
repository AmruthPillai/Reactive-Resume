import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class Reference {
  #path = '';
  #uuid = '';

  constructor(path) {
    if (typeof path === 'undefined' || path === null) {
      this.#path = '.';
    } else if (typeof path !== 'string') {
      throw new Error('path should be a string.');
    } else {
      this.#path = path;
    }

    this.#uuid = uuidv4();
  }

  get path() {
    return this.#path;
  }

  get uuid() {
    return this.#uuid;
  }

  async update(value) {
    return Promise.resolve(true);
  }
}

class Database {
  static testUser = {
    email: 'test.user@noemail.com',
    name: 'Test User',
    uid: 'testuser123',
  };
  static #instance = undefined;
  #uuid = '';
  #data = {};
  #references = {};

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    Database.#instance = this;

    this.#uuid = uuidv4();
  }

  get demoResumeId() {
    return 'demore';
  }
  get emptyResumeId() {
    return 'mtre01';
  }

  get uuid() {
    return this.#uuid;
  }

  initData() {
    const resumes = {};
    const demoResume = readFile('../src/data/demoState.json');
    resumes[this.demoResumeId] = demoResume;
    const emptyResume = readFile('../src/data/initialState.json');
    resumes[this.emptyResumeId] = emptyResume;

    for (var key in resumes) {
      const resume = resumes[key];

      resume.id = key;
      resume.name = `Test Resume ${key}`;
      resume.user = Database.testUser.uid;

      let date = new Date('December 15, 2020 11:20:25');
      resume.updatedAt = date.valueOf();
      date.setMonth(date.getMonth() - 2);
      resume.createdAt = date.valueOf();
    }

    this.#data['resumes'] = resumes;
  }

  readFile(fileRelativePath) {
    const fileAbsolutePath = path.resolve(__dirname, fileRelativePath);
    const fileBuffer = fs.readFileSync(fileAbsolutePath);
    const fileData = JSON.parse(fileBuffer);
    return fileData;
  }

  ref(path) {
    const newRef = new Reference(path);
    const existingRef = this.#references[newRef.path];
    if (existingRef) {
      return existingRef;
    }

    this.#references[newRef.path] = newRef;
    return newRef;
  }
}

/*
const database = () => {
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

      return Promise.resolve(true);
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

      return Promise.resolve(true);
    };

    return {
      once,
      set,
      update,
      __updateCalls: __databaseRefUpdateCalls,
    };
  };

  return {
    __demoResumeId,
    __emptyResumeId,
    __init,
    ref,
  };
};

database.ServerValue = {};
Object.defineProperty(database.ServerValue, 'TIMESTAMP', {
  get() {
    return new Date().getTime();
  },
});
*/

class FirebaseMock {
  static database() {
    return new Database();
  }
}

FirebaseMock.database.ServerValue = {};
Object.defineProperty(FirebaseMock.database.ServerValue, 'TIMESTAMP', {
  get() {
    return new Date().getTime();
  },
});

export default FirebaseMock;
