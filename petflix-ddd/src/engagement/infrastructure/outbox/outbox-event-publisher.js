const { EventPublisher } = require('../../../shared/kernel/event-publisher.port');

// Adaptador de EventPublisher: grava o evento na outbox (no MySQL, na MESMA transação do caso de uso).
class OutboxEventPublisher extends EventPublisher {
  constructor(outbox) { super(); this.outbox = outbox; }
  async publish(event) { await this.outbox.append(event); }
}
module.exports = { OutboxEventPublisher };
