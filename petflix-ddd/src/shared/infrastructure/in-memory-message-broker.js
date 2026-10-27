const { MessageBroker } = require('../kernel/message-broker.port');

// Simula um exchange "topic": padrões como "video.*" ou "video.liked".
class InMemoryMessageBroker extends MessageBroker {
  constructor() { super(); this.subscriptions = []; }

  subscribe(pattern, handler) { this.subscriptions.push({ pattern, handler }); }

  async publish(event) {
    for (const { pattern, handler } of this.subscriptions) {
      if (InMemoryMessageBroker.matches(pattern, event.type)) await handler(event);
    }
  }

  static matches(pattern, type) {
    if (pattern === '#' || pattern === type) return true;
    const re = new RegExp('^' + pattern.split('.').map((p) => (p === '*' ? '[^.]+' : p)).join('\\.') + '$');
    return re.test(type);
  }
}
module.exports = { InMemoryMessageBroker };
