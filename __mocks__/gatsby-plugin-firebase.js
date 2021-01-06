import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class Auth {
  static #instance = undefined;
  static anonymousUser1 = {
    displayName: 'Anonymous User 1',
    email: 'anonymous1@noemail.com',
    isAnonymous: true,
    name: 'Anonymous 1',
    uid: 'anonym123',
  };
  static anonymousUser2 = {
    displayName: 'Anonymous User 2',
    email: 'anonymous2@noemail.com',
    isAnonymous: true,
    name: 'Anonymous 2',
    uid: 'anonym456',
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

  get anonymousUser1() {
    return Auth.anonymousUser1;
  }

  get anonymousUser2() {
    return Auth.anonymousUser2;
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
    const user = this.anonymousUser1;

    this.#onAuthStateChangedObservers.forEach((observer) => observer(user));

    return Promise.resolve(user);
  }
}

class Database {
  static #instance = undefined;
  #uuid = '';
  #data = {};
  #references = {};
  #anonymousUser1 = undefined;
  #anonymousUser2 = undefined;
  #demoStateResume1Id = 'demo_1';
  #demoStateResume2Id = 'demo_2';
  #initialStateResumeId = 'initst';

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    Database.#instance = this;

    this.#uuid = uuidv4();
    this.#anonymousUser1 = {
      uid: Auth.anonymousUser1.uid,
      isAnonymous: Auth.anonymousUser1.isAnonymous,
    };
    this.#anonymousUser2 = {
      uid: Auth.anonymousUser2.uid,
      isAnonymous: Auth.anonymousUser2.isAnonymous,
    };
  }

  get resumesPath() {
    return Reference.resumesPath;
  }

  get usersPath() {
    return Reference.usersPath;
  }

  get connectedPath() {
    return Reference.connectedPath;
  }

  get anonymousUser1() {
    return this.#anonymousUser1;
  }

  get anonymousUser2() {
    return this.#anonymousUser2;
  }

  get demoStateResume1Id() {
    return this.#demoStateResume1Id;
  }

  get demoStateResume2Id() {
    return this.#demoStateResume2Id;
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

    const demoStateResume1 = Database.readFile('../src/data/demoState.json');
    let date = new Date('December 15, 2020 11:20:25');
    demoStateResume1.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    demoStateResume1.createdAt = date.valueOf();
    demoStateResume1.user = this.anonymousUser1.uid;
    resumes[this.demoStateResume1Id] = demoStateResume1;

    const demoStateResume2 = JSON.parse(JSON.stringify(demoStateResume1));
    demoStateResume2.user = this.anonymousUser2.uid;
    resumes[this.demoStateResume2Id] = demoStateResume2;

    const initialStateResume = Database.readFile(
      '../src/data/initialState.json',
    );
    initialStateResume.updatedAt = date.valueOf();
    initialStateResume.createdAt = date.valueOf();
    initialStateResume.user = this.anonymousUser1.uid;
    resumes[this.initialStateResumeId] = initialStateResume;

    for (var key in resumes) {
      const resume = resumes[key];

      resume.id = key;
      resume.name = `Test Resume ${key}`;
    }

    this.#data[this.resumesPath] = resumes;

    const users = {};
    users[this.anonymousUser1.uid] = this.anonymousUser1;
    users[this.anonymousUser2.uid] = this.anonymousUser2;
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
  static connectedPath = '/.info/connected';
  #rootPath = '.';
  #path = '';
  #uuid = '';
  #dataSnapshots = {};
  #getDatabaseData = () => null;
  #orderByChildPath = '';
  #equalToValue = '';

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

    let data = null;
    if (
      this.#path === Reference.resumesPath ||
      this.#path === Reference.usersPath
    ) {
      data = this.#path in databaseData ? databaseData[this.#path] : null;

      if (data && this.#orderByChildPath && this.#equalToValue) {
        return Object.fromEntries(
          Object.entries(data).filter(
            ([key, value]) =>
              value[this.#orderByChildPath] === this.#equalToValue,
          ),
        );
      }

      return data;
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

  off() {}

  on(eventType, callback) {
    if (eventType !== 'value') {
      return;
    }

    let snapshot = new DataSnapshot(eventType, this, null);

    if (this.#path === Reference.connectedPath) {
      snapshot = new DataSnapshot(eventType, this, true);
    } else if (this.#path === Reference.resumesPath) {
      snapshot = new DataSnapshot(eventType, this);
    }

    callback(snapshot);
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

  orderByChild(path) {
    this.#orderByChildPath = path;
    return this;
  }

  equalTo(value) {
    this.#equalToValue = value;
    return this;
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
  #value = undefined;

  constructor(eventType, reference, value = undefined) {
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

    this.#value = value;
  }

  get eventType() {
    return this.#eventType;
  }

  get value() {
    return this.#value;
  }

  val() {
    if (this.eventType === 'value') {
      return typeof this.value !== 'undefined'
        ? this.value
        : this.#reference.getData();
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
