/* eslint-disable no-underscore-dangle */
class DataSnapshot {
  constructor(eventType, getData, value = undefined) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    this._eventType = eventType;

    if (!getData) {
      throw new Error('getData must be provided.');
    } else if (typeof getData !== 'function') {
      throw new Error('getData should be a function.');
    }

    this._getData = getData;

    this._value = value;
  }

  get eventType() {
    return this._eventType;
  }

  get value() {
    return this._value;
  }

  val() {
    if (this.eventType === 'value') {
      return typeof this.value !== 'undefined' ? this.value : this._getData();
    }

    return undefined;
  }
}

export default DataSnapshot;
