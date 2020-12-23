import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class DataSnapshot {
  #eventType = '';
  #reference = null;

  constructor(eventType, reference) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    this.#eventType = eventType;

    if (!reference) {
      throw new Error('reference must be provided.');
    } else if (!(reference instanceof Reference)) {
      throw new Error('reference must be an instance of the Reference class.');
    }

    this.#reference = reference;
  }

  get eventType() {
    return this.#eventType;
  }

  val() {
    if (this.eventType === 'value') {
      return this.#reference.getData();
    }

    return undefined;
  }
}

class Reference {
  #rootPath = '.';
  #path = '';
  #uuid = '';
  #dataSnapshots = {};
  #getDatabaseData = () => null;

  constructor(path, getDatabaseData) {
    if (typeof path === 'undefined' || path === null) {
      this.#path = this.#rootPath;
    } else if (typeof path !== 'string') {
      throw new Error('path should be a string.');
    }

    if (!getDatabaseData) {
      throw new Error('getDatabaseData must be provided.');
    } else if (typeof getDatabaseData !== 'function') {
      throw new Error('getDatabaseData should be a function.');
    }

    this.#path = path;
    this.#uuid = uuidv4();
    this.#getDatabaseData = getDatabaseData;
  }

  get path() {
    return this.#path;
  }

  get uuid() {
    return this.#uuid;
  }

  getData() {
    const databaseData = this.#getDatabaseData();

    if (!databaseData) {
      return null;
    }

    if (this.#path === this.#rootPath) {
      return databaseData;
    }

    if (
      this.#path === Database.resumesPath ||
      this.#path === Database.usersPath
    ) {
      return this.#path in databaseData ? databaseData[this.#path] : null;
    }

    if (
      this.#path.startsWith(`${Database.resumesPath}/`) ||
      this.#path.startsWith(`${Database.usersPath}/`)
    ) {
      const databaseLocationId = this.#path.substring(
        this.#path.indexOf('/') + 1,
      );
      if (!databaseLocationId) {
        throw new Error('Unknown database location id.');
      }

      const pathWithoutId = this.#path.substring(0, this.#path.indexOf('/'));
      if (pathWithoutId in databaseData) {
        return databaseLocationId in databaseData[pathWithoutId]
          ? databaseData[pathWithoutId][databaseLocationId]
          : null;
      }
    }

    return null;
  }

  async once(eventType) {
    const newDataSnapshot = new DataSnapshot(eventType, this);
    const existingDataSnapshot = this.#dataSnapshots[newDataSnapshot.eventType];
    if (existingDataSnapshot) {
      return Promise.resolve(existingDataSnapshot);
    }

    this.#dataSnapshots[newDataSnapshot.eventType] = newDataSnapshot;
    return Promise.resolve(newDataSnapshot);
  }

  async update(value) {
    return Promise.resolve(true);
  }
}

class Database {
  static resumesPath = 'resumes';
  static usersPath = 'users';
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

  get testUser() {
    return {
      email: 'test.user@noemail.com',
      name: 'Test User',
      uid: 'testuser123',
    };
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

  static readFile(fileRelativePath) {
    const fileAbsolutePath = path.resolve(__dirname, fileRelativePath);
    const fileBuffer = fs.readFileSync(fileAbsolutePath);
    const fileData = JSON.parse(fileBuffer);
    return fileData;
  }

  initializeData() {
    const resumes = {};
    const demoResume = Database.readFile('../src/data/demoState.json');
    resumes[this.demoResumeId] = demoResume;
    const emptyResume = Database.readFile('../src/data/initialState.json');
    resumes[this.emptyResumeId] = emptyResume;

    for (var key in resumes) {
      const resume = resumes[key];

      resume.id = key;
      resume.name = `Test Resume ${key}`;
      resume.user = this.testUser.uid;

      let date = new Date('December 15, 2020 11:20:25');
      resume.updatedAt = date.valueOf();
      date.setMonth(date.getMonth() - 2);
      resume.createdAt = date.valueOf();
    }

    this.#data[Database.resumesPath] = resumes;

    const users = {};
    users[this.testUser.uid] = this.testUser;
    this.#data[Database.usersPath] = users;
  }

  ref(path) {
    const newRef = new Reference(path, () => this.#data);
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

      return Promise.resolve(true);
    };

    return {
      once,
      set,
      update,
    };
  };

  return {
    __demoResumeId,
    __emptyResumeId,
    __init,
    ref,
  };
};
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
