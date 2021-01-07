const anonymousUser1 = {
  displayName: 'Anonymous User 1',
  email: 'anonymous1@noemail.com',
  isAnonymous: true,
  name: 'Anonymous 1',
  uid: 'anonym123',
};

const anonymousUser2 = {
  displayName: 'Anonymous User 2',
  email: 'anonymous2@noemail.com',
  isAnonymous: true,
  name: 'Anonymous 2',
  uid: 'anonym456',
};

class Auth {
  static get anonymousUser1() {
    return anonymousUser1;
  }

  static get anonymousUser2() {
    return anonymousUser2;
  }
}

export default Auth;
