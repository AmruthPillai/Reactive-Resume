/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

import FunctionsConstants from '../constants/functions';
import HttpsCallableResult from './httpsCallableResult';
import { delay } from '../../../src/utils/index';

const singleton = Symbol('');
const singletonEnforcer = Symbol('');

const deleteUser = async () => {
  await delay(FunctionsConstants.defaultDelayInMilliseconds);

  return new HttpsCallableResult(true);
};

class Functions {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this._uuid = uuidv4();

    this._httpsCallables = {};
    this._httpsCallables[
      FunctionsConstants.deleteUserFunctionName
    ] = deleteUser;
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Functions(singletonEnforcer);
    }

    return this[singleton];
  }

  get uuid() {
    return this._uuid;
  }

  httpsCallable(name) {
    if (!name) {
      throw new Error('name must be provided.');
    } else if (typeof name !== 'string') {
      throw new Error('name should be a string.');
    }

    return this._httpsCallables[name];
  }
}

export default Functions;
