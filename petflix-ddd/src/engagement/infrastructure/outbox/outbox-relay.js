// Relay: lê eventos pendentes da outbox e publica no broker; só marca como publicado após o sucesso.
class OutboxRelay {
  constructor({ outbox, broker }) { this.outbox = outbox; this.broker = broker; }

  async flush() {
    let published = 0;
    for (const row of await this.outbox.pending()) {
      await this.broker.publish(row.event);
      await this.outbox.markPublished(row);
      published += 1;
    }
    return published;
  }
}
module.exports = { OutboxRelay };
