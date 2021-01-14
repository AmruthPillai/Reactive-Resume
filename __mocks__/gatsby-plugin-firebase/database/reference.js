/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

import DatabaseConstants from '../constants/database';
import DataSnapshot from './dataSnapshot';

class Reference {
  constructor(path, getDatabaseData, setDatabaseData, getReference) {
    if (!path) {
      throw new Error('path must be provided.');
    } else if (typeof path !== 'string') {
      throw new Error('path should be a string.');
    } else {
      this._path = path;
    }

    this._uuid = uuidv4();

    this._dataSnapshot = null;

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

  _setData(value) {
    if (typeof value === 'undefined') {
      throw new Error('value must be provided.');
    }

    const currentData = this._getData();

    const pathElements = this.path.split('/');
    let parentReference = null;
    if (pathElements.length === 2) {
      parentReference = this._getReference(pathElements[0]);
    }

    this._setDatabaseData(this.path, value);

    if (value === null) {
      if (parentReference) {
        parentReference.debounceEventCallback(
          DatabaseConstants.childRemovedEventType,
          currentData,
        );
        parentReference.debounceEventCallback(DatabaseConstants.valueEventType);
      }
    } else {
      const eventType = DatabaseConstants.valueEventType;
      this.debounceEventCallback(eventType);
      if (parentReference) {
        parentReference.debounceEventCallback(eventType);
      }
    }
  }

  debounceEventCallback(eventType, snapshotValue = undefined) {
    if (!(eventType in this.eventCallbacks)) {
      return;
    }

    const snapshot =
      this.path === DatabaseConstants.connectedPath
        ? new DataSnapshot(() => this._getData(), true)
        : new DataSnapshot(() => this._getData(), snapshotValue);

    const debouncedEventCallback = debounce(
      this.eventCallbacks[eventType],
      100,
    );
    debouncedEventCallback(snapshot);
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
      this.debounceEventCallback(eventType);
    }
  }

  async once(eventType) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    if (this._dataSnapshot) {
      return Promise.resolve(this._dataSnapshot);
    }

    const newDataSnapshot = new DataSnapshot(() => this._getData());
    this._dataSnapshot = newDataSnapshot;

    return Promise.resolve(newDataSnapshot);
  }

  orderByChild(path) {
    this._orderByChildPath = path;
    return this;
  }

  async update(value) {
    this._setData(value);

    return Promise.resolve(true);
  }

  async remove() {
    this._setData(null);

    return Promise.resolve(true);
  }

  async set(value) {
    this._setData(value);

    return Promise.resolve(true);
  }
}

export default Reference;
