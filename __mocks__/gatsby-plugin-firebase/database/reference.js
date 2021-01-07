import { v4 as uuidv4 } from 'uuid';

import { DatabaseConstants } from '../constants';
import DataSnapshot from './dataSnapshot';

class Reference {
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
      this.#path === DatabaseConstants.resumesPath ||
      this.#path === DatabaseConstants.usersPath
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
      this.#path.startsWith(`${DatabaseConstants.resumesPath}/`) ||
      this.#path.startsWith(`${DatabaseConstants.usersPath}/`)
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

    if (this.#path === DatabaseConstants.connectedPath) {
      snapshot = new DataSnapshot(eventType, this, true);
    } else if (this.#path === DatabaseConstants.resumesPath) {
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

export default Reference;
