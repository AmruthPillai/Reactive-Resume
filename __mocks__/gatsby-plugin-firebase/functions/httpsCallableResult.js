/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

class HttpsCallableResult {
  constructor(data) {
    this._uuid = uuidv4();
    this._data = data;
  }

  get data() {
    return this._data;
  }

  get uuid() {
    return this._uuid;
  }
}

export default HttpsCallableResult;
