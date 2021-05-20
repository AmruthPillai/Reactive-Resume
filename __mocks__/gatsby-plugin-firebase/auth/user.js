/* eslint-disable no-underscore-dangle */
import Constants from '../constants/auth';
// eslint-disable-next-line no-unused-vars
import AuthProvider from './authProvider';
import UserInfo from './userInfo';
import { delay } from '../../../src/utils/index';

class User extends UserInfo {
  /**
   * Creates a new user.
   *
   * @param {string|null} displayName Display name.
   * @param {string|null} email Email.
   * @param {string} providerId Auth provider ID.
   * @param {string} uid The user's unique ID.
   * @param {boolean} isAnonymous Is anonymous.
   * @param {function():Promise<void>} deleteUser Delete user callback.
   */
  constructor(displayName, email, providerId, uid, isAnonymous, deleteUser) {
    super(displayName, email, providerId, uid);

    if (!deleteUser) {
      throw new Error('deleteUser must be provided.');
    } else if (typeof deleteUser !== 'function') {
      throw new Error('deleteUser should be a function.');
    } else {
      this._deleteUser = deleteUser;
    }

    this._isAnonymous = isAnonymous;

    this._providerData = [];
    if (!isAnonymous) {
      this._providerData.push(
        new UserInfo(displayName, email, providerId, uid),
      );
    }
  }

  get isAnonymous() {
    return this._isAnonymous;
  }

  get providerData() {
    return this._providerData;
  }

  async delete() {
    await delay(Constants.defaultDelayInMilliseconds);

    await this._deleteUser();
  }

  /**
   * Reauthenticates the user with popup.
   *
   * @param {AuthProvider} provider The provider to authenticate.
   */
  // eslint-disable-next-line no-unused-vars
  async reauthenticateWithPopup(provider) {
    await delay(Constants.defaultDelayInMilliseconds);

    return this;
  }
}

export default User;
