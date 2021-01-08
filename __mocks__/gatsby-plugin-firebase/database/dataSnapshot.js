import Reference from './reference';

class DataSnapshot {
  constructor(eventType, reference, value = undefined) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    this.eventTypeField = eventType;

    if (!reference) {
      throw new Error('reference must be provided.');
    } else if (!(reference instanceof Reference)) {
      throw new Error('reference must be an instance of the Reference class.');
    }

    this.referenceField = reference;

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
        : this.referenceField.getData();
    }

    return undefined;
  }
}

export default DataSnapshot;
