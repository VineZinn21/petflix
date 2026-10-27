const test = require('node:test');
const assert = require('node:assert');
const { buildContainer } = require('../src/main/container');
const { NotFoundError } = require('../src/shared/kernel/errors');
const { InMemoryMessageBroker } = require('../src/shared/infrastructure/in-memory-message-broker');

const videos = [{ id: 'v1', authorId: 'autor', title: 'Teste' }];

test('curtir grava evento na outbox e o relay o entrega aos consumidores', async () => {
  const c = buildContainer({ videos });
  assert.deepStrictEqual(await c.toggleLike.execute({ userId: 'u1', videoId: 'v1' }), { liked: true });
  assert.strictEqual((await c.outbox.pending()).length, 1);
  assert.strictEqual(await c.relay.flush(), 1);
  assert.strictEqual((await c.outbox.pending()).length, 0);
  assert.strictEqual(c.metrics.countFor('v1'), 1);
  assert.strictEqual(c.notifications.sent[0].to, 'autor');
});

test('curtir de novo descurta e o contador volta a zero', async () => {
  const c = buildContainer({ videos });
  await c.toggleLike.execute({ userId: 'u1', videoId: 'v1' });
  assert.deepStrictEqual(await c.toggleLike.execute({ userId: 'u1', videoId: 'v1' }), { liked: false });
  await c.relay.flush();
  assert.strictEqual(c.metrics.countFor('v1'), 0);
});

test('vídeo inexistente lança NotFoundError (contrato único de busca)', async () => {
  const c = buildContainer({ videos });
  await assert.rejects(() => c.toggleLike.execute({ userId: 'u1', videoId: 'x' }), NotFoundError);
});

test('consumidor é idempotente: reentrega do mesmo evento não duplica', async () => {
  const c = buildContainer({ videos });
  await c.toggleLike.execute({ userId: 'u1', videoId: 'v1' });
  const [row] = await c.outbox.pending();
  await c.metrics.handle(row.event);
  await c.metrics.handle(row.event);
  assert.strictEqual(c.metrics.countFor('v1'), 1);
});

test('broker casa padrões de tópico como o exchange topic do RabbitMQ', () => {
  assert.ok(InMemoryMessageBroker.matches('video.*', 'video.liked'));
  assert.ok(InMemoryMessageBroker.matches('video.liked', 'video.liked'));
  assert.ok(!InMemoryMessageBroker.matches('comment.*', 'video.liked'));
});
