/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

import DatabaseConstants from '../constants/database';
import DataSnapshot from './dataSnapshot';
import { delay } from '../../../src/utils/index';

const parsePath = (path) => {
  if (!path) {
    throw new Error('path must be provided.');
  } else if (typeof path !== 'string') {
    throw new Error('path should be a string.');
  } else {
    let parsedPath = path.trim();

    if (parsedPath[0] === '/') {
      parsedPath = parsedPath.substring(1);
    }

    return parsedPath;
  }
};

class Reference {
  constructor(path, getDatabaseData, setDatabaseData, getReference) {
    this._path = parsePath(path);

    this._uuid = uuidv4();

    if (this.path === DatabaseConstants.connectedPath) {
      this._dataSnapshot = new DataSnapshot(() => {}, true);
    } else {
      this._dataSnapshot = new DataSnapshot(() => this._getData());
    }

    if (!getDatabaseData) {
      throw new Error('getDatabaseData must be provided.');
    } else if (typeof getDatabaseData !== 'function') {
      throw new Error('getDatabaseData should be a function.');
    }

    this._getDatabaseData = getDatabaseData;

    if (!setDatabaseData) {
      throw new Error('setDatabaseData must be provided.');
    } else if (typeof getDatabaseData !== 'function') {
      throw new Error('setDatabaseData should be a function.');
    }

    this._setDatabaseData = setDatabaseData;

    if (!getReference) {
      throw new Error('getReference must be provided.');
    } else if (typeof getDatabaseData !== 'function') {
      throw new Error('getReference should be a function.');
    }

    this._getReference = getReference;

    this._eventCallbacks = {};

    this.initializeQueryParameters();
  }

  get path() {
    return this._path;
  }

  get uuid() {
    return this._uuid;
  }

  get eventCallbacks() {
    return this._eventCallbacks;
  }

  get orderByChildPath() {
    return this._orderByChildPath;
  }

  get equalToValue() {
    return this._equalToValue;
  }

  _getData() {
    const databaseData = this._getDatabaseData(this.path);

    if (!databaseData) {
      return null;
    }

    if (this.orderByChildPath && this.equalToValue) {
      return Object.fromEntries(
        Object.entries(databaseData).filter(
          ([, value]) => value[this.orderByChildPath] === this.equalToValue,
        ),
      );
    }

    return databaseData;
  }

  _getParent() {
    const pathElements = this.path.split('/');

    let parent = null;
    if (pathElements.length === 2) {
      parent = this._getReference(pathElements[0]);
    }

    return parent;
  }

  _handleDataUpdate(value) {
    if (typeof value === 'undefined') {
      throw new Error('value must be provided.');
    }

    const currentData = this._getData();
    const parentReference = this._getParent();

    this._setDatabaseData(this.path, value);

    if (value === null) {
      if (parentReference) {
        parentReference.triggerEventCallback(
          DatabaseConstants.childRemovedEventType,
          currentData,
        );
      }
    } else {
      this.triggerEventCallback(DatabaseConstants.valueEventType);
    }

    if (parentReference) {
      parentReference.triggerEventCallback(DatabaseConstants.valueEventType);
    }
  }

  triggerEventCallback(eventType, snapshotValue = undefined) {
    if (!(eventType in this.eventCallbacks)) {
      return;
    }

    const snapshot =
      this.path === DatabaseConstants.connectedPath
        ? this._dataSnapshot
        : new DataSnapshot(() => this._getData(), snapshotValue);

    this.eventCallbacks[eventType](snapshot);
  }

  equalTo(value) {
    this._equalToValue = value;
    return this;
  }

  initializeQueryParameters() {
    this._orderByChildPath = '';
    this._equalToValue = '';
  }

  off() {
    this._eventCallbacks = {};
  }

  on(eventType, callback) {
    this.eventCallbacks[eventType] = callback;

    if (eventType === DatabaseConstants.valueEventType) {
      setTimeout(() => {
        this.triggerEventCallback(eventType);
      }, DatabaseConstants.defaultDelayInMilliseconds);
    }

    return callback;
  }

  async once(eventType) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    await delay(DatabaseConstants.defaultDelayInMilliseconds);

    return this._dataSnapshot;
  }

  orderByChild(path) {
    this._orderByChildPath = path;
    return this;
  }

  async update(value) {
    await delay(DatabaseConstants.defaultDelayInMilliseconds);

    this._handleDataUpdate(value);
  }

  async remove() {
    await delay(DatabaseConstants.defaultDelayInMilliseconds);

    this._handleDataUpdate(null);
  }

  async set(value) {
    await delay(DatabaseConstants.defaultDelayInMilliseconds);

    this._handleDataUpdate(value);
  }
}

export default Reference;
