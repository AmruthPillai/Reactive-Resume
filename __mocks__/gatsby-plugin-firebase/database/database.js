import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { AuthConstants, DatabaseConstants } from '../constants';
import Reference from './reference';

class Database {
  static #instance = undefined;
  #uuid = '';
  #data = {};
  #references = {};
  #anonymousUser1 = undefined;
  #anonymousUser2 = undefined;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    Database.#instance = this;

    this.#uuid = uuidv4();
    this.#anonymousUser1 = {
      uid: AuthConstants.anonymousUser1.uid,
      isAnonymous: AuthConstants.anonymousUser1.isAnonymous,
    };
    this.#anonymousUser2 = {
      uid: AuthConstants.anonymousUser2.uid,
      isAnonymous: AuthConstants.anonymousUser2.isAnonymous,
    };
  }

  get anonymousUser1() {
    return this.#anonymousUser1;
  }

  get anonymousUser2() {
    return this.#anonymousUser2;
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

    const demoStateResume1 = Database.readFile(
      '../../../src/data/demoState.json',
    );
    let date = new Date('December 15, 2020 11:20:25');
    demoStateResume1.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    demoStateResume1.createdAt = date.valueOf();
    demoStateResume1.user = this.anonymousUser1.uid;
    resumes[DatabaseConstants.demoStateResume1Id] = demoStateResume1;

    const demoStateResume2 = JSON.parse(JSON.stringify(demoStateResume1));
    demoStateResume2.user = this.anonymousUser2.uid;
    resumes[DatabaseConstants.demoStateResume2Id] = demoStateResume2;

    const initialStateResume = Database.readFile(
      '../../../src/data/initialState.json',
    );
    initialStateResume.updatedAt = date.valueOf();
    initialStateResume.createdAt = date.valueOf();
    initialStateResume.user = this.anonymousUser1.uid;
    resumes[DatabaseConstants.initialStateResumeId] = initialStateResume;

    for (var key in resumes) {
      const resume = resumes[key];

      resume.id = key;
      resume.name = `Test Resume ${key}`;
    }

    this.#data[DatabaseConstants.resumesPath] = resumes;

    const users = {};
    users[this.anonymousUser1.uid] = this.anonymousUser1;
    users[this.anonymousUser2.uid] = this.anonymousUser2;
    this.#data[DatabaseConstants.usersPath] = users;
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

export default Database;
