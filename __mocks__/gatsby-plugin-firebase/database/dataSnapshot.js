import Reference from './reference';

class DataSnapshot {
  #eventType = '';
  #reference = null;
  #value = undefined;

  constructor(eventType, reference, value = undefined) {
    if (!eventType) {
      throw new Error('eventType must be provided.');
    } else if (typeof eventType !== 'string') {
      throw new Error('eventType should be a string.');
    }

    this.#eventType = eventType;

    if (!reference) {
      throw new Error('reference must be provided.');
    } else if (!(reference instanceof Reference)) {
      throw new Error('reference must be an instance of the Reference class.');
    }

    this.#reference = reference;

    this.#value = value;
  }

  get eventType() {
    return this.#eventType;
  }

  get value() {
    return this.#value;
  }

  val() {
    if (this.eventType === 'value') {
      return typeof this.value !== 'undefined'
        ? this.value
        : this.#reference.getData();
    }

    return undefined;
  }
}

export default DataSnapshot;
