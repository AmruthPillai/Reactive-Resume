const resumesPath = 'resumes';
const usersPath = 'users';
const connectedPath = '/.info/connected';
const demoStateResume1Id = 'demo_1';
const demoStateResume2Id = 'demo_2';
const initialStateResumeId = 'initst';

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
}

export default Database;
