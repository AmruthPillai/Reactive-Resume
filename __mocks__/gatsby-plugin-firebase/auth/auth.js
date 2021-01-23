/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

import Constants from '../constants/auth';
import delay from '../../utils/index';

const singleton = Symbol('');
const singletonEnforcer = Symbol('');

class Auth {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this._uuid = uuidv4();
    this._onAuthStateChangedObservers = [];
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Auth(singletonEnforcer);
    }

    return this[singleton];
  }

  get uuid() {
    return this._uuid;
  }

  get onAuthStateChangedObservers() {
    return this._onAuthStateChangedObservers;
  }

  onAuthStateChanged(observer) {
    this.onAuthStateChangedObservers.push(observer);

    return () => {
      this._onAuthStateChangedObservers = this.onAuthStateChangedObservers.filter(
        (obs) => obs !== observer,
      );
    };
  }

  async signInAnonymously() {
    const user = Constants.anonymousUser1;

    await delay(Constants.defaultDelayInMilliseconds);

    this.onAuthStateChangedObservers.forEach((observer) => observer(user));

    return Promise.resolve(user);
  }
}

export default Auth;
