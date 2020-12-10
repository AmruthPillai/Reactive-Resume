import demoResume from '../src/data/demoState.json';

module.exports = {
  database: jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnValue({
      once: jest.fn().mockResolvedValue({
        val: jest.fn().mockReturnValue(demoResume),
      }),
    }),
  }),
  auth: jest.fn().mockReturnValue({
    onAuthStateChanged: jest.fn(),
  }),
};
