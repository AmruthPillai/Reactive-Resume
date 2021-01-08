import { v4 as uuidv4 } from 'uuid';

import DatabaseConstants from '../constants/database';
import DataSnapshot from './dataSnapshot';

const rootPath = '.';

class Reference {
  constructor(path, getDatabaseDataCallback) {
    if (typeof path === 'undefined' || path === null) {
      this.pathField = rootPath;
    } else if (typeof path !== 'string') {
      throw new Error('path should be a string.');
    } else {
      this.pathField = path;
    }

    this.uuidField = uuidv4();

    this.dataSnapshotsField = {};

    if (!getDatabaseDataCallback) {
      throw new Error('getDatabaseDataCallback must be provided.');
    } else if (typeof getDatabaseDataCallback !== 'function') {
      throw new Error('getDatabaseDataCallback should be a function.');
    }

    this.getDatabaseDataCallbackField = getDatabaseDataCallback;

    this.orderByChildPathField = '';
    this.equalToValueField = '';
  }

  get path() {
    return this.pathField;
  }

  get uuid() {
    return this.uuidField;
  }

  getData() {
    const databaseData = this.getDatabaseDataCallbackField();

    if (!databaseData) {
      return null;
    }

    if (this.path === rootPath) {
      return databaseData;
    }

    let data = null;
    if (
      this.path === DatabaseConstants.resumesPath ||
      this.path === DatabaseConstants.usersPath
    ) {
      data = this.path in databaseData ? databaseData[this.path] : null;

      if (data && this.orderByChildPathField && this.equalToValueField) {
        return Object.fromEntries(
          Object.entries(data).filter(
            ([, value]) =>
              value[this.orderByChildPathField] === this.equalToValueField,
          ),
        );
      }

      return data;
    }

    if (
      this.path.startsWith(`${DatabaseConstants.resumesPath}/`) ||
      this.path.startsWith(`${DatabaseConstants.usersPath}/`)
    ) {
      const databaseLocationId = this.path.substring(
        this.path.indexOf('/') + 1,
      );
      if (!databaseLocationId) {
        throw new Error('Unknown database location id.');
      }

      const pathWithoutId = this.path.substring(0, this.path.indexOf('/'));
      if (pathWithoutId in databaseData) {
        return databaseLocationId in databaseData[pathWithoutId]
          ? databaseData[pathWithoutId][databaseLocationId]
          : null;
      }
    }

    return null;
  }

  off() {
    return this !== null;
  }

  on(eventType, callback) {
    if (eventType !== 'value') {
      return;
    }

    let snapshot = new DataSnapshot(eventType, () => this.getData(), null);

    if (this.path === DatabaseConstants.connectedPath) {
      snapshot = new DataSnapshot(eventType, () => this.getData(), true);
    } else if (this.path === DatabaseConstants.resumesPath) {
      snapshot = new DataSnapshot(eventType, () => this.getData());
    }

    callback(snapshot);
  }

  async once(eventType) {
    const newDataSnapshot = new DataSnapshot(eventType, () => this.getData());
    const existingDataSnapshot = this.dataSnapshotsField[
      newDataSnapshot.eventType
    ];
    if (existingDataSnapshot) {
      return Promise.resolve(existingDataSnapshot);
    }

    this.dataSnapshotsField[newDataSnapshot.eventType] = newDataSnapshot;
    return Promise.resolve(newDataSnapshot);
  }

  orderByChild(path) {
    this.orderByChildPathField = path;
    return this;
  }

  equalTo(value) {
    this.equalToValueField = value;
    return this;
  }

  async update(value) {
    if (typeof value === 'undefined') {
      throw new Error('value must be provided.');
    }

    const result = this !== null;
    return Promise.resolve(result);
  }

  async set(value) {
    if (typeof value === 'undefined') {
      throw new Error('value must be provided.');
    }

    const result = this !== null;
    return Promise.resolve(result);
  }
}

export default Reference;
