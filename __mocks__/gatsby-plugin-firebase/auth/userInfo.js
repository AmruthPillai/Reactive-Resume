/* eslint-disable no-underscore-dangle */
class UserInfo {
  /**
   * Creates a new user profile information.
   *
   * @param {string|null} displayName Display name.
   * @param {string|null} email Email.
   * @param {string} providerId Auth provider ID.
   * @param {string} uid The user's unique ID.
   */
  constructor(displayName, email, providerId, uid) {
    if (!uid) {
      throw new Error('uid must be provided.');
    } else if (typeof uid !== 'string') {
      throw new Error('uid should be a string.');
    } else {
      this._uid = uid;
    }

    if (typeof providerId !== 'string') {
      throw new Error('providerId should be a string.');
    } else {
      this._providerId = providerId;
    }

    this._displayName = displayName;
    this._email = email;
  }

  get displayName() {
    return this._displayName;
  }

  get email() {
    return this._email;
  }

  get providerId() {
    return this._providerId;
  }

  get uid() {
    return this._uid;
  }
}

export default UserInfo;
