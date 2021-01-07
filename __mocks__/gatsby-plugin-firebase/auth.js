import { v4 as uuidv4 } from 'uuid';

import { AuthConstants } from './constants';

class Auth {
  static #instance = undefined;
  #uuid = '';
  #onAuthStateChangedObservers = [];

  constructor() {
    if (Auth.#instance) {
      return Auth.#instance;
    }

    Auth.#instance = this;

    this.#uuid = uuidv4();
  }

  get uuid() {
    return this.#uuid;
  }

  get onAuthStateChangedObservers() {
    return this.#onAuthStateChangedObservers;
  }

  dispose() {
    this.#onAuthStateChangedObservers = [];
  }

  onAuthStateChanged(observer) {
    this.#onAuthStateChangedObservers.push(observer);

    return () => {
      this.#onAuthStateChangedObservers = this.#onAuthStateChangedObservers.filter(
        (observer) => observer !== observer,
      );
    };
  }

  async signInAnonymously() {
    const user = AuthConstants.anonymousUser1;

    this.#onAuthStateChangedObservers.forEach((observer) => observer(user));

    return Promise.resolve(user);
  }
}

export default Auth;
