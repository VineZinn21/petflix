// Porta de saída: o domínio/aplicação só conhece esta abstração.
// Adaptadores: OutboxEventPublisher (MySQL) e RabbitMqPublisher (AMQP).
class EventPublisher {
  /** @param {import('./domain-event').DomainEvent} event */
  async publish(event) { throw new Error('not implemented'); }
}
module.exports = { EventPublisher };
