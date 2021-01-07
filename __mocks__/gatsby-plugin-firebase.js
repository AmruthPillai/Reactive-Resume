import Auth from './gatsby-plugin-firebase/auth/auth';
import Database from './gatsby-plugin-firebase/database/database';
import {
  AuthConstants,
  DatabaseConstants,
} from './gatsby-plugin-firebase/constants';

class FirebaseStub {
  static auth() {
    return new Auth();
  }

  static database() {
    return new Database();
  }
}

FirebaseStub.database.ServerValue = {};
Object.defineProperty(FirebaseStub.database.ServerValue, 'TIMESTAMP', {
  get() {
    return new Date().getTime();
  },
});

export default FirebaseStub;
export { AuthConstants, DatabaseConstants };
