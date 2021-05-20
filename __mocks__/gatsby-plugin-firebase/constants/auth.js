const googleAuthProviderId = 'google.com';

const anonymousUser1 = {
  displayName: 'Anonymous User 1',
  email: 'anonymous1@noemail.com',
  isAnonymous: true,
  providerId: '',
  uid: 'anonym1',
};

const anonymousUser2 = {
  displayName: 'Anonymous User 2',
  email: 'anonymous2@noemail.com',
  isAnonymous: true,
  providerId: '',
  uid: 'anonym2',
};

const googleUser3 = {
  displayName: 'Google User 3',
  email: 'google3@noemail.com',
  isAnonymous: false,
  providerId: googleAuthProviderId,
  uid: 'google3',
};

const defaultDelayInMilliseconds = 100;

class Auth {
  static get googleAuthProviderId() {
    return googleAuthProviderId;
  }

  static get anonymousUser1() {
    return anonymousUser1;
  }

  static get anonymousUser2() {
    return anonymousUser2;
  }

  static get googleUser3() {
    return googleUser3;
  }

  static get defaultDelayInMilliseconds() {
    return defaultDelayInMilliseconds;
  }
}

export default Auth;
