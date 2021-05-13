import { delay } from '../../src/utils/index';

const ReachRouter = jest.requireActual('@reach/router');

const defaultDelayInMilliseconds = 100;

// eslint-disable-next-line no-unused-vars
const navigate = async (to, options) => {
  await delay(defaultDelayInMilliseconds);

  return Promise.resolve();
};

module.exports = {
  ...ReachRouter,
  navigate: jest.fn(navigate),
};
