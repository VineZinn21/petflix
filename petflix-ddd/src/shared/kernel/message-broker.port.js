// Porta do broker. Adaptador real proposto: RabbitMQ (exchange topic "petflix.events").
// Adaptador desta fatia: InMemoryMessageBroker.
class MessageBroker {
  async publish(event) { throw new Error('not implemented'); }
  subscribe(pattern, handler) { throw new Error('not implemented'); }
}
module.exports = { MessageBroker };
