import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class Auth {
  static #instance = undefined;
  static anonymousUser = {
    displayName: 'Anonymous User 1',
    email: 'anonymous.user@noemail.com',
    isAnonymous: true,
    name: 'Anonymous 1',
    uid: 'anonym123',
  };
  #uuid = '';
  #onAuthStateChangedObservers = [];

  constructor() {
    if (Auth.#instance) {
      return Auth.#instance;
    }

    Auth.#instance = this;

    this.#uuid = uuidv4();
  }

  get uuid() {
    return this.#uuid;
  }

  get onAuthStateChangedObservers() {
    return this.#onAuthStateChangedObservers;
  }

  get anonymousUser() {
    return Auth.anonymousUser;
  }

  dispose() {
    this.#onAuthStateChangedObservers = [];
  }

  onAuthStateChanged(observer) {
    this.#onAuthStateChangedObservers.push(observer);

    return () => {
      this.#onAuthStateChangedObservers = this.#onAuthStateChangedObservers.filter(
        (observer) => observer !== observer,
      );
    };
  }

  async signInAnonymously() {
    this.#onAuthStateChangedObservers.forEach((observer) =>
      observer(this.anonymousUser),
    );

    return Promise.resolve(this.anonymousUser);
  }
}

class Database {
  static #instance = undefined;
  #uuid = '';
  #data = {};
  #references = {};
  #anonymousUser = undefined;
  #demoStateResumeId = 'demost';
  #initialStateResumeId = 'initst';

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    Database.#instance = this;

    this.#uuid = uuidv4();
    this.#anonymousUser = {
      uid: Auth.anonymousUser.uid,
      isAnonymous: Auth.anonymousUser.isAnonymous,
    };
  }

  get resumesPath() {
    return Reference.resumesPath;
  }

  get usersPath() {
    return Reference.usersPath;
  }

  get anonymousUser() {
    return this.#anonymousUser;
  }

  get demoStateResumeId() {
    return this.#demoStateResumeId;
  }

  get initialStateResumeId() {
    return this.#initialStateResumeId;
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
    const demoStateResume = Database.readFile('../src/data/demoState.json');
    resumes[this.demoStateResumeId] = demoStateResume;
    const initialStateResume = Database.readFile(
      '../src/data/initialState.json',
    );
    resumes[this.initialStateResumeId] = initialStateResume;

    for (var key in resumes) {
      const resume = resumes[key];

      resume.id = key;
      resume.name = `Test Resume ${key}`;
      resume.user = this.anonymousUser.uid;

      let date = new Date('December 15, 2020 11:20:25');
      resume.updatedAt = date.valueOf();
      date.setMonth(date.getMonth() - 2);
      resume.createdAt = date.valueOf();
    }

    this.#data[this.resumesPath] = resumes;

    const users = {};
    users[this.anonymousUser.uid] = this.anonymousUser;
    this.#data[this.usersPath] = users;
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

class Reference {
  static resumesPath = 'resumes';
  static usersPath = 'users';
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
      this.#path === Reference.resumesPath ||
      this.#path === Reference.usersPath
    ) {
      return this.#path in databaseData ? databaseData[this.#path] : null;
    }

    if (
      this.#path.startsWith(`${Reference.resumesPath}/`) ||
      this.#path.startsWith(`${Reference.usersPath}/`)
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

  async set(value) {
    return Promise.resolve(true);
  }
}

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

class FirebaseStub {
  static auth() {
    return new Auth();
  }

  static database() {
    return new Database();
  }
}

FirebaseStub.database.ServerValue = {};
Object.defineProperty(FirebaseStub.database.ServerValue, 'TIMESTAMP', {
  get() {
    return new Date().getTime();
  },
});

export default FirebaseStub;
