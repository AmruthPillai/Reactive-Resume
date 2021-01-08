import { v4 as uuidv4 } from 'uuid';

import Constants from '../constants/auth';

const singleton = Symbol('');
const singletonEnforcer = Symbol('');

class Auth {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.uuidField = uuidv4();
    this.onAuthStateChangedObserversField = [];
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Auth(singletonEnforcer);
    }

    return this[singleton];
  }

  get uuid() {
    return this.uuidField;
  }

  get onAuthStateChangedObservers() {
    return this.onAuthStateChangedObserversField;
  }

  dispose() {
    this.onAuthStateChangedObserversField = [];
  }

  onAuthStateChanged(observer) {
    this.onAuthStateChangedObservers.push(observer);

    return () => {
      this.onAuthStateChangedObserversField = this.onAuthStateChangedObservers.filter(
        (obs) => obs !== observer,
      );
    };
  }

  async signInAnonymously() {
    const user = Constants.anonymousUser1;

    this.onAuthStateChangedObservers.forEach((observer) => observer(user));

    return Promise.resolve(user);
  }
}

export default Auth;
