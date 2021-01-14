/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

import DatabaseConstants from '../constants/database';
import DataSnapshot from './dataSnapshot';

const rootPath = '.';

class Reference {
  constructor(path, getDatabaseData) {
    if (typeof path === 'undefined' || path === null) {
      this._path = rootPath;
    } else if (typeof path !== 'string') {
      throw new Error('path should be a string.');
    } else {
      this._path = path;
    }

    this._uuid = uuidv4();

    this._dataSnapshots = {};

    if (!getDatabaseData) {
      throw new Error('getDatabaseData must be provided.');
    } else if (typeof getDatabaseData !== 'function') {
      throw new Error('getDatabaseData should be a function.');
    }

    this._getDatabaseData = getDatabaseData;

    this.initializeQueryParameters();
  }

  get path() {
    return this._path;
  }

  get uuid() {
    return this._uuid;
  }

  get orderByChildPath() {
    return this._orderByChildPath;
  }

  get equalToValue() {
    return this._equalToValue;
  }

  getData() {
    const databaseData = this._getDatabaseData();

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

      if (data && this.orderByChildPath && this.equalToValue) {
        return Object.fromEntries(
          Object.entries(data).filter(
            ([, value]) => value[this.orderByChildPath] === this.equalToValue,
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

  initializeQueryParameters() {
    this._orderByChildPath = '';
    this._equalToValue = '';
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

    const debouncedCallback = debounce(callback, 100);
    debouncedCallback(snapshot);
  }

  async once(eventType) {
    const newDataSnapshot = new DataSnapshot(eventType, () => this.getData());
    const existingDataSnapshot = this._dataSnapshots[newDataSnapshot.eventType];
    if (existingDataSnapshot) {
      return Promise.resolve(existingDataSnapshot);
    }

    this._dataSnapshots[newDataSnapshot.eventType] = newDataSnapshot;
    return Promise.resolve(newDataSnapshot);
  }

  orderByChild(path) {
    this._orderByChildPath = path;
    return this;
  }

  equalTo(value) {
    this._equalToValue = value;
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
