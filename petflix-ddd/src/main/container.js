// Raiz de composição: único lugar que conhece os adaptadores concretos.
const { ToggleLike } = require('../engagement/application/toggle-like');
const { MetricsConsumer } = require('../engagement/application/consumers/metrics-consumer');
const { NotificationConsumer } = require('../engagement/application/consumers/notification-consumer');
const { InMemoryLikeRepository } = require('../engagement/infrastructure/in-memory-like-repository');
const { InMemoryOutbox } = require('../engagement/infrastructure/outbox/in-memory-outbox');
const { OutboxEventPublisher } = require('../engagement/infrastructure/outbox/outbox-event-publisher');
const { OutboxRelay } = require('../engagement/infrastructure/outbox/outbox-relay');
const { InMemoryVideoCatalog } = require('../catalog/infrastructure/in-memory-video-catalog');
const { InMemoryMessageBroker } = require('../shared/infrastructure/in-memory-message-broker');
const { InMemoryUnitOfWork } = require('../shared/infrastructure/in-memory-unit-of-work');

function buildContainer({ videos = [] } = {}) {
  const broker = new InMemoryMessageBroker();
  const outbox = new InMemoryOutbox();
  const metrics = new MetricsConsumer();
  const notifications = new NotificationConsumer();

  broker.subscribe('video.*', (e) => metrics.handle(e));
  broker.subscribe('video.liked', (e) => notifications.handle(e));

  const toggleLike = new ToggleLike({
    likes: new InMemoryLikeRepository(),
    videoCatalog: new InMemoryVideoCatalog(videos),
    events: new OutboxEventPublisher(outbox),
    unitOfWork: new InMemoryUnitOfWork(),
  });

  return { toggleLike, relay: new OutboxRelay({ outbox, broker }), outbox, broker, metrics, notifications };
}
module.exports = { buildContainer };
