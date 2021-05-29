import Auth from './gatsby-plugin-firebase/auth/auth';
import AuthConstants from './gatsby-plugin-firebase/constants/auth';
import Database from './gatsby-plugin-firebase/database/database';
import DatabaseConstants from './gatsby-plugin-firebase/constants/database';

class FirebaseStub {
  static auth() {
    return Auth.instance;
  }

  static database() {
    return Database.instance;
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
