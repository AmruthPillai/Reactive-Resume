/* eslint-disable no-underscore-dangle */
class AuthProvider {
  /**
   * Creates a new auth provider.
   *
   * @param {string} providerId Provider ID.
   */
  constructor(providerId) {
    if (!providerId) {
      throw new Error('providerId must be provided.');
    } else if (typeof providerId !== 'string') {
      throw new Error('providerId should be a string.');
    } else {
      this._providerId = providerId;
    }
  }

  get providerId() {
    return this._providerId;
  }
}

export default AuthProvider;
