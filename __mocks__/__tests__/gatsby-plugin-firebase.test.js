import { waitFor } from '@testing-library/react';
import FirebaseStub, {
  AuthConstants,
  DatabaseConstants,
} from '../gatsby-plugin-firebase';

describe('FirebaseStub', () => {
  describe('auth', () => {
    afterEach(() => {
      FirebaseStub.auth().dispose();
    });

    it('reuses existing Auth instance', () => {
      const auth1 = FirebaseStub.auth();
      const auth2 = FirebaseStub.auth();

      expect(auth1.uuid).toBeTruthy();
      expect(auth2.uuid).toBeTruthy();
      expect(auth1.uuid).toEqual(auth2.uuid);
    });

    it('returns anonymous user 1 when signing in anonymously', async () => {
      const user = await FirebaseStub.auth().signInAnonymously();

      expect(user).toBeTruthy();
      expect(user).toEqual(AuthConstants.anonymousUser1);
    });

    it('calls onAuthStateChanged observer with anonymous user 1 when signing in anonymously', async () => {
      let user = null;
      let error = null;
      FirebaseStub.auth().onAuthStateChanged(
        (_user) => {
          user = _user;
        },
        (_error) => {
          error = _error;
        },
      );

      await FirebaseStub.auth().signInAnonymously();

      expect(user).toBeTruthy();
      expect(user).toEqual(AuthConstants.anonymousUser1);
      expect(error).toBeNull();
    });

    it('onAuthStateChanged unsubscribe removes observer', () => {
      const observer = () => {};
      const unsubscribe = FirebaseStub.auth().onAuthStateChanged(observer);
      expect(unsubscribe).toBeTruthy();
      expect(FirebaseStub.auth().onAuthStateChangedObservers).toHaveLength(1);
      expect(FirebaseStub.auth().onAuthStateChangedObservers[0]).toEqual(
        observer,
      );

      unsubscribe();

      expect(FirebaseStub.auth().onAuthStateChangedObservers).toHaveLength(0);
    });
  });

  describe('database', () => {
    beforeEach(() => {
      FirebaseStub.database().initializeData();
    });

    it('reuses existing Database instance', () => {
      const database1 = FirebaseStub.database();
      const database2 = FirebaseStub.database();

      expect(database1.uuid).toBeTruthy();
      expect(database2.uuid).toBeTruthy();
      expect(database1.uuid).toEqual(database2.uuid);
    });

    it('reuses existing Reference instance', () => {
      const ref1 = FirebaseStub.database().ref(
        `${DatabaseConstants.resumesPath}/123`,
      );
      const ref2 = FirebaseStub.database().ref(
        `${DatabaseConstants.resumesPath}/123`,
      );

      expect(ref1.uuid).toBeTruthy();
      expect(ref2.uuid).toBeTruthy();
      expect(ref1.uuid).toEqual(ref2.uuid);
    });

    it('ServerValue.TIMESTAMP returns current time in milliseconds', () => {
      const now = new Date().getTime();
      const timestamp = FirebaseStub.database.ServerValue.TIMESTAMP;

      expect(timestamp).toBeTruthy();
      expect(timestamp).toBeGreaterThanOrEqual(now);
    });

    it("can spy on Reference 'update' function", async () => {
      const referencePath = `${DatabaseConstants.resumesPath}/123456`;
      const functionSpy = jest.spyOn(
        FirebaseStub.database().ref(referencePath),
        'update',
      );
      const updateArgument = 'test value 123';

      await FirebaseStub.database().ref(referencePath).update(updateArgument);

      expect(functionSpy).toHaveBeenCalledTimes(1);
      const functionCallArgument = functionSpy.mock.calls[0][0];
      expect(functionCallArgument).toBeTruthy();
      expect(functionCallArgument).toEqual(updateArgument);
    });

    it('initializing data sets up resumes and users', async () => {
      const resumesRef = FirebaseStub.database().ref(
        DatabaseConstants.resumesPath,
      );
      const resumesDataSnapshot = await resumesRef.once('value');
      const resumes = resumesDataSnapshot.val();
      expect(resumes).toBeTruthy();
      expect(Object.keys(resumes)).toHaveLength(3);
      const demoStateResume1 = resumes[DatabaseConstants.demoStateResume1Id];
      expect(demoStateResume1).toBeTruthy();
      expect(demoStateResume1.id).toEqual(DatabaseConstants.demoStateResume1Id);
      expect(demoStateResume1.user).toEqual(DatabaseConstants.user1.uid);
      const demoStateResume2 = resumes[DatabaseConstants.demoStateResume2Id];
      expect(demoStateResume2).toBeTruthy();
      expect(demoStateResume2.id).toEqual(DatabaseConstants.demoStateResume2Id);
      expect(demoStateResume2.user).toEqual(DatabaseConstants.user2.uid);
      const initialStateResume =
        resumes[DatabaseConstants.initialStateResumeId];
      expect(initialStateResume).toBeTruthy();
      expect(initialStateResume.id).toEqual(
        DatabaseConstants.initialStateResumeId,
      );
      expect(initialStateResume.user).toEqual(DatabaseConstants.user1.uid);

      const usersRef = FirebaseStub.database().ref(DatabaseConstants.usersPath);
      const usersDataSnapshot = await usersRef.once('value');
      const users = usersDataSnapshot.val();
      expect(users).toBeTruthy();
      expect(Object.keys(users)).toHaveLength(2);
      const anonymousUser1 = users[DatabaseConstants.user1.uid];
      expect(anonymousUser1).toBeTruthy();
      expect(anonymousUser1).toEqual(DatabaseConstants.user1);
      const anonymousUser2 = users[DatabaseConstants.user2.uid];
      expect(anonymousUser2).toBeTruthy();
      expect(anonymousUser2).toEqual(DatabaseConstants.user2);
    });

    it('retrieves resume if it exists', async () => {
      const resume = (
        await FirebaseStub.database()
          .ref(
            `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
          )
          .once('value')
      ).val();

      expect(resume).toBeTruthy();
      expect(resume.id).toEqual(DatabaseConstants.demoStateResume1Id);
    });

    it('retrieves null if resume does not exist', async () => {
      const resumeId = 'invalidResumeId';

      const resume = (
        await FirebaseStub.database()
          .ref(`${DatabaseConstants.resumesPath}/${resumeId}`)
          .once('value')
      ).val();

      expect(resume).toBeNull();
    });

    it('retrieves user if it exists', async () => {
      const user = (
        await FirebaseStub.database()
          .ref(`${DatabaseConstants.usersPath}/${DatabaseConstants.user1.uid}`)
          .once('value')
      ).val();

      expect(user).toBeTruthy();
      expect(user).toEqual(DatabaseConstants.user1);
    });

    it('retrieves null if user does not exist', async () => {
      const userId = 'invalidUserId';

      const user = (
        await FirebaseStub.database()
          .ref(`${DatabaseConstants.usersPath}/${userId}`)
          .once('value')
      ).val();

      expect(user).toBeNull();
    });

    it('triggers callback with true when listening for data changes on the connected reference path', async () => {
      let snapshotValue = null;

      FirebaseStub.database()
        .ref(DatabaseConstants.connectedPath)
        .on('value', (snapshot) => {
          snapshotValue = snapshot.val();
        });

      await waitFor(() =>
        snapshotValue ? Promise.resolve(true) : Promise.reject(),
      );

      expect(snapshotValue).not.toBeNull();
      expect(snapshotValue).toBe(true);
    });

    it('triggers callback with resumes when listening for data changes on the resumes reference path', async () => {
      const resumesDataSnapshot = await FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .once('value');
      const resumes = resumesDataSnapshot.val();
      let snapshotValue = null;

      FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .on('value', (snapshot) => {
          snapshotValue = snapshot.val();
        });

      await waitFor(() =>
        snapshotValue ? Promise.resolve(true) : Promise.reject(),
      );

      expect(snapshotValue).not.toBeNull();
      expect(snapshotValue).toEqual(resumes);
    });

    it('can filter resumes by user', async () => {
      let snapshotValue = null;

      FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(DatabaseConstants.user1.uid)
        .on('value', (snapshot) => {
          snapshotValue = snapshot.val();
        });

      await waitFor(() =>
        snapshotValue ? Promise.resolve(true) : Promise.reject(),
      );

      expect(snapshotValue).not.toBeNull();
      expect(Object.keys(snapshotValue)).toHaveLength(2);
      Object.values(snapshotValue).forEach((resume) =>
        expect(resume.user).toEqual(DatabaseConstants.user1.uid),
      );
    });

    it('previously set query parameters are not kept when retrieving reference again', async () => {
      let reference = null;

      reference = FirebaseStub.database().ref(DatabaseConstants.resumesPath);
      expect(reference).toBeTruthy();
      const { uuid } = reference;
      expect(reference.orderByChildPath).toHaveLength(0);
      expect(reference.equalToValue).toHaveLength(0);

      reference = FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo('testuser1');
      expect(reference).toBeTruthy();
      expect(reference.uuid).toBe(uuid);
      expect(reference.orderByChildPath).toBe('user');
      expect(reference.equalToValue).toBe('testuser1');

      reference = FirebaseStub.database().ref(DatabaseConstants.resumesPath);
      expect(reference).toBeTruthy();
      expect(reference.uuid).toBe(uuid);
      expect(reference.orderByChildPath).toHaveLength(0);
      expect(reference.equalToValue).toHaveLength(0);
    });

    it('triggers callback with resumes when creating a new one', async () => {
      const userUid = DatabaseConstants.user1.uid;

      let snapshotValue = null;
      const callback = jest.fn((snapshot) => {
        snapshotValue = snapshot.val();
      });

      FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(userUid)
        .on('value', callback);

      await waitFor(() => callback.mock.calls[0][0]);

      expect(callback.mock.calls).toHaveLength(1);
      callback.mockClear();
      expect(snapshotValue).not.toBeNull();
      expect(Object.keys(snapshotValue)).toHaveLength(2);
      Object.values(snapshotValue).forEach((resume) =>
        expect(resume.user).toEqual(userUid),
      );
      snapshotValue = null;

      const existingResume = (
        await FirebaseStub.database()
          .ref(
            `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
          )
          .once('value')
      ).val();
      expect(existingResume).toBeTruthy();
      expect(existingResume.user).toEqual(userUid);

      const newResume = JSON.parse(JSON.stringify(existingResume));
      newResume.id = 'newre1';
      newResume.name = `Test Resume ${newResume.id}`;

      await FirebaseStub.database()
        .ref(`${DatabaseConstants.resumesPath}/${newResume.id}`)
        .set(newResume);

      await waitFor(() => callback.mock.calls[0][0]);

      expect(callback.mock.calls).toHaveLength(1);
      callback.mockClear();
      expect(snapshotValue).not.toBeNull();
      expect(Object.keys(snapshotValue)).toHaveLength(3);
      expect(snapshotValue[newResume.id]).toBeTruthy();
      expect(snapshotValue[newResume.id].id).toBe(newResume.id);
    });

    it('triggers callback with resumes when updating an existing one', async () => {
      const userUid = DatabaseConstants.user1.uid;

      let snapshotValue = null;
      const callback = jest.fn((snapshot) => {
        snapshotValue = snapshot.val();
      });

      FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(userUid)
        .on('value', callback);

      await waitFor(() => callback.mock.calls[0][0]);

      expect(callback.mock.calls).toHaveLength(1);
      callback.mockClear();
      expect(snapshotValue).not.toBeNull();
      expect(Object.keys(snapshotValue)).toHaveLength(2);
      Object.values(snapshotValue).forEach((resume) =>
        expect(resume.user).toEqual(userUid),
      );
      snapshotValue = null;

      const existingResume = (
        await FirebaseStub.database()
          .ref(
            `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
          )
          .once('value')
      ).val();
      expect(existingResume).toBeTruthy();
      expect(existingResume.user).toEqual(userUid);

      existingResume.name = 'Test Resume renamed';

      await FirebaseStub.database()
        .ref(`${DatabaseConstants.resumesPath}/${existingResume.id}`)
        .update(existingResume);

      await waitFor(() => callback.mock.calls[0][0]);

      expect(callback.mock.calls).toHaveLength(1);
      callback.mockClear();
      expect(snapshotValue).not.toBeNull();
      expect(Object.keys(snapshotValue)).toHaveLength(2);
      expect(snapshotValue[existingResume.id]).toBeTruthy();
      expect(snapshotValue[existingResume.id].name).toBe(existingResume.name);
    });

    it('triggers callback with removed resume when removing an existing one', async () => {
      const userUid = DatabaseConstants.user1.uid;

      let valueCallbackSnapshotValue = null;
      const valueCallback = jest.fn((snapshot) => {
        valueCallbackSnapshotValue = snapshot.val();
      });
      FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(userUid)
        .on('value', valueCallback);
      await waitFor(() => valueCallback.mock.calls[0][0]);
      expect(valueCallback.mock.calls).toHaveLength(1);
      valueCallback.mockClear();
      expect(valueCallbackSnapshotValue).not.toBeNull();
      expect(Object.keys(valueCallbackSnapshotValue)).toHaveLength(2);
      Object.values(valueCallbackSnapshotValue).forEach((resume) =>
        expect(resume.user).toEqual(userUid),
      );
      valueCallbackSnapshotValue = null;

      let childRemovedCallbackSnapshotValue = null;
      const childRemovedCallback = jest.fn((snapshot) => {
        childRemovedCallbackSnapshotValue = snapshot.val();
      });
      FirebaseStub.database()
        .ref(DatabaseConstants.resumesPath)
        .orderByChild('user')
        .equalTo(userUid)
        .on('child_removed', childRemovedCallback);

      const removedResume = (
        await FirebaseStub.database()
          .ref(
            `${DatabaseConstants.resumesPath}/${DatabaseConstants.demoStateResume1Id}`,
          )
          .once('value')
      ).val();
      expect(removedResume).toBeTruthy();
      expect(removedResume.user).toEqual(userUid);
      await FirebaseStub.database()
        .ref(`${DatabaseConstants.resumesPath}/${removedResume.id}`)
        .remove();

      await waitFor(() => childRemovedCallback.mock.calls[0][0]);
      expect(childRemovedCallback.mock.calls).toHaveLength(1);
      childRemovedCallback.mockClear();
      expect(childRemovedCallbackSnapshotValue).toBeTruthy();
      expect(childRemovedCallbackSnapshotValue.id).toBe(removedResume.id);

      await waitFor(() => valueCallback.mock.calls[0][0]);
      expect(valueCallback.mock.calls).toHaveLength(1);
      valueCallback.mockClear();
      expect(valueCallbackSnapshotValue).toBeTruthy();
      expect(removedResume.id in valueCallbackSnapshotValue).toBe(false);
    });
  });
});
