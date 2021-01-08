import AuthConstants from './auth';

const resumesPath = 'resumes';
const usersPath = 'users';
const connectedPath = '/.info/connected';

const demoStateResume1Id = 'demo_1';
const demoStateResume2Id = 'demo_2';
const initialStateResumeId = 'initst';

const user1 = {
  uid: AuthConstants.anonymousUser1.uid,
  isAnonymous: AuthConstants.anonymousUser1.isAnonymous,
};
const user2 = {
  uid: AuthConstants.anonymousUser2.uid,
  isAnonymous: AuthConstants.anonymousUser2.isAnonymous,
};

class Database {
  static get resumesPath() {
    return resumesPath;
  }

  static get usersPath() {
    return usersPath;
  }

  static get connectedPath() {
    return connectedPath;
  }

  static get demoStateResume1Id() {
    return demoStateResume1Id;
  }

  static get demoStateResume2Id() {
    return demoStateResume2Id;
  }

  static get initialStateResumeId() {
    return initialStateResumeId;
  }

  static get user1() {
    return user1;
  }

  static get user2() {
    return user2;
  }
}

export default Database;
