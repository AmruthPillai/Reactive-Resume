/* eslint-disable no-underscore-dangle */
import Constants from '../constants/auth';
import { delay } from '../../../src/utils/index';

class User {
  /**
   * Creates a new user.
   *
   * @param {string|null} displayName Display name.
   * @param {string|null} email Email.
   * @param {boolean} isAnonymous Is anonymous.
   * @param {string} uid The user's unique ID.
   * @param {function():Promise<void>} deleteUser Delete user callback.
   */
  constructor(displayName, email, isAnonymous, uid, deleteUser) {
    if (!uid) {
      throw new Error('uid must be provided.');
    } else if (typeof uid !== 'string') {
      throw new Error('uid should be a string.');
    } else {
      this._uid = uid;
    }

    if (!deleteUser) {
      throw new Error('deleteUser must be provided.');
    } else if (typeof deleteUser !== 'function') {
      throw new Error('deleteUser should be a function.');
    } else {
      this._deleteUser = deleteUser;
    }

    this._displayName = displayName;
    this._email = email;
    this._isAnonymous = isAnonymous;
  }

  get displayName() {
    return this._displayName;
  }

  get email() {
    return this._email;
  }

  get isAnonymous() {
    return this._isAnonymous;
  }

  get uid() {
    return this._uid;
  }

  async delete() {
    await delay(Constants.defaultDelayInMilliseconds);

    await this._deleteUser();
  }
}

export default User;
