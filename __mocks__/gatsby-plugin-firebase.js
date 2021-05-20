import Auth from './gatsby-plugin-firebase/auth/auth';
import GoogleAuthProvider from './gatsby-plugin-firebase/auth/googleAuthProvider';
import Database from './gatsby-plugin-firebase/database/database';
import Functions from './gatsby-plugin-firebase/functions/functions';
import AuthConstants from './gatsby-plugin-firebase/constants/auth';
import DatabaseConstants from './gatsby-plugin-firebase/constants/database';
import FunctionsConstants from './gatsby-plugin-firebase/constants/functions';

class FirebaseStub {
  static auth() {
    return Auth.instance;
  }

  static database() {
    return Database.instance;
  }

  static functions() {
    return Functions.instance;
  }
}

FirebaseStub.auth.GoogleAuthProvider = GoogleAuthProvider;

FirebaseStub.database.ServerValue = {};
Object.defineProperty(FirebaseStub.database.ServerValue, 'TIMESTAMP', {
  get() {
    return new Date().getTime();
  },
});

export default FirebaseStub;
export { AuthConstants, DatabaseConstants, FunctionsConstants };
