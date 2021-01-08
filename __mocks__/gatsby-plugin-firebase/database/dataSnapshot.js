class DataSnapshot {
  constructor(eventType, getDataCallback, value = undefined) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    this.eventTypeField = eventType;

    if (!getDataCallback) {
      throw new Error('getDataCallback must be provided.');
    } else if (typeof getDataCallback !== 'function') {
      throw new Error('getDataCallback should be a function.');
    }

    this.getDataCallbackField = getDataCallback;

    this.valueField = value;
  }

  get eventType() {
    return this.eventTypeField;
  }

  get value() {
    return this.valueField;
  }

  val() {
    if (this.eventType === 'value') {
      return typeof this.value !== 'undefined'
        ? this.value
        : this.getDataCallbackField();
    }

    return undefined;
  }
}

export default DataSnapshot;
