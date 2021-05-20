/* eslint-disable no-underscore-dangle */
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

    this._uuid = uuidv4();
    this._data = {};
    this._references = {};
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Database(singletonEnforcer);
    }

    return this[singleton];
  }

  get uuid() {
    return this._uuid;
  }

  _getData(dataPath) {
    if (!dataPath) {
      throw new Error('dataPath must be provided.');
    }

    const dataPathElements = dataPath.split('/');
    if (!(dataPathElements[0] in this._data)) {
      return null;
    }

    if (dataPathElements.length === 1) {
      return this._data[dataPathElements[0]];
    }

    if (dataPathElements.length === 2) {
      if (!(dataPathElements[1] in this._data[dataPathElements[0]])) {
        return null;
      }

      return this._data[dataPathElements[0]][dataPathElements[1]];
    }

    return null;
  }

  _getReference(referencePath) {
    return referencePath in this._references
      ? this._references[referencePath]
      : null;
  }

  _setData(dataPath, value) {
    if (!dataPath) {
      throw new Error('dataPath must be provided.');
    }

    if (typeof value === 'undefined') {
      throw new Error('value is undefined.');
    }

    const dataPathElements = dataPath.split('/');
    if (dataPathElements.length !== 2) {
      return;
    }

    if (!(dataPathElements[0] in this._data)) {
      return;
    }

    if (!dataPathElements[1]) {
      return;
    }

    if (value === null) {
      delete this._data[dataPathElements[0]][dataPathElements[1]];
    } else {
      this._data[dataPathElements[0]][dataPathElements[1]] = value;
    }
  }

  initializeData() {
    const resumes = {};
    const date = new Date('December 15, 2020 11:20:25');

    const demoStateResume1 = readFile('../../../src/data/demoState.json');
    demoStateResume1.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    demoStateResume1.createdAt = date.valueOf();
    demoStateResume1.user = DatabaseConstants.user1.uid;
    resumes[DatabaseConstants.demoStateResume1Id] = demoStateResume1;

    const demoStateResume2 = JSON.parse(JSON.stringify(demoStateResume1));
    demoStateResume2.user = DatabaseConstants.user2.uid;
    resumes[DatabaseConstants.demoStateResume2Id] = demoStateResume2;

    const initialStateResume1 = readFile('../../../src/data/initialState.json');
    initialStateResume1.updatedAt = date.valueOf();
    initialStateResume1.createdAt = date.valueOf();
    initialStateResume1.user = DatabaseConstants.user1.uid;
    resumes[DatabaseConstants.initialStateResume1Id] = initialStateResume1;

    const demoStateResume3 = readFile('../../../src/data/demoState.json');
    demoStateResume3.updatedAt = date.valueOf();
    date.setMonth(date.getMonth() - 2);
    demoStateResume3.createdAt = date.valueOf();
    demoStateResume3.user = DatabaseConstants.user3.uid;
    resumes[DatabaseConstants.demoStateResume3Id] = demoStateResume3;

    const initialStateResume2 = readFile('../../../src/data/initialState.json');
    initialStateResume2.updatedAt = date.valueOf();
    initialStateResume2.createdAt = date.valueOf();
    initialStateResume2.user = DatabaseConstants.user3.uid;
    resumes[DatabaseConstants.initialStateResume2Id] = initialStateResume2;

    Object.keys(resumes).forEach((key) => {
      const resume = resumes[key];
      resume.id = key;
      resume.name = `Test Resume ${key}`;
    });

    this._data[DatabaseConstants.resumesPath] = resumes;

    const users = {};
    users[DatabaseConstants.user1.uid] = DatabaseConstants.user1;
    users[DatabaseConstants.user2.uid] = DatabaseConstants.user2;
    users[DatabaseConstants.user3.uid] = DatabaseConstants.user3;
    this._data[DatabaseConstants.usersPath] = users;
  }

  ref(referencePath) {
    const newRef = new Reference(
      referencePath,
      (dataPath) => this._getData(dataPath),
      (dataPath, value) => this._setData(dataPath, value),
      (refPath) => this._getReference(refPath),
    );

    const existingRef = this._getReference(newRef.path);
    if (existingRef) {
      existingRef.initializeQueryParameters();
      return existingRef;
    }

    this._references[newRef.path] = newRef;
    return newRef;
  }
}

export default Database;
