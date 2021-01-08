import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import DatabaseConstants from '../constants/database';
import Reference from './reference';

const singleton = Symbol('');
const singletonEnforcer = Symbol('');

const readFile = (fileRelativePath) => {
  const fileAbsolutePath = path.resolve(__dirname, fileRelativePath);
  const fileBuffer = fs.readFileSync(fileAbsolutePath);
  const fileData = JSON.parse(fileBuffer);
  return fileData;
};

class Database {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.uuidField = uuidv4();
    this.dataField = {};
    this.referencesField = {};
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Database(singletonEnforcer);
    }

    return this[singleton];
  }

  get uuid() {
    return this.uuidField;
  }

  initializeData() {
    const resumes = {};

    const demoStateResume1 = readFile('../../../src/data/demoState.json');
    const date = new Date('December 15, 2020 11:20:25');
    demoStateResume1.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    demoStateResume1.createdAt = date.valueOf();
    demoStateResume1.user = DatabaseConstants.user1.uid;
    resumes[DatabaseConstants.demoStateResume1Id] = demoStateResume1;

    const demoStateResume2 = JSON.parse(JSON.stringify(demoStateResume1));
    demoStateResume2.user = DatabaseConstants.user2.uid;
    resumes[DatabaseConstants.demoStateResume2Id] = demoStateResume2;

    const initialStateResume = readFile('../../../src/data/initialState.json');
    initialStateResume.updatedAt = date.valueOf();
    initialStateResume.createdAt = date.valueOf();
    initialStateResume.user = DatabaseConstants.user1.uid;
    resumes[DatabaseConstants.initialStateResumeId] = initialStateResume;

    Object.keys(resumes).forEach((key) => {
      const resume = resumes[key];
      resume.id = key;
      resume.name = `Test Resume ${key}`;
    });

    this.dataField[DatabaseConstants.resumesPath] = resumes;

    const users = {};
    users[DatabaseConstants.user1.uid] = DatabaseConstants.user1;
    users[DatabaseConstants.user2.uid] = DatabaseConstants.user2;
    this.dataField[DatabaseConstants.usersPath] = users;
  }

  ref(referencePath) {
    const newRef = new Reference(referencePath, () => this.dataField);
    const existingRef = this.referencesField[newRef.path];
    if (existingRef) {
      return existingRef;
    }

    this.referencesField[newRef.path] = newRef;
    return newRef;
  }
}

export default Database;
