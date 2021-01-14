/* eslint-disable no-underscore-dangle */
class DataSnapshot {
  constructor(getData, value = undefined) {
    if (!getData) {
      throw new Error('getData must be provided.');
    } else if (typeof getData !== 'function') {
      throw new Error('getData should be a function.');
    }

    this._getData = getData;

    this._value = value;
  }

  get value() {
    return this._value;
  }

  val() {
    return typeof this.value !== 'undefined' ? this.value : this._getData();
  }
}

export default DataSnapshot;
