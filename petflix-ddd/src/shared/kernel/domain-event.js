const { randomUUID } = require('crypto');

class DomainEvent {
  constructor(type, data, version = 1) {
    this.id = randomUUID();
    this.type = type;
    this.version = version;
    this.occurredAt = new Date().toISOString();
    this.data = data;
  }
}

module.exports = { DomainEvent };
