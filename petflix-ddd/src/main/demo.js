const { buildContainer } = require('./container');

(async () => {
  const c = buildContainer({ videos: [{ id: 'v1', authorId: 'u-autor', title: 'Como banhar um gato' }] });

  console.log('1) curtir  ->', await c.toggleLike.execute({ userId: 'u1', videoId: 'v1' }));
  console.log('   eventos pendentes na outbox:', (await c.outbox.pending()).length);
  console.log('   relay publicou:', await c.relay.flush(), 'evento(s)');
  console.log('   likesCount (consumidor de métricas):', c.metrics.countFor('v1'));
  console.log('   notificações:', c.notifications.sent);

  console.log('2) descurtir ->', await c.toggleLike.execute({ userId: 'u1', videoId: 'v1' }));
  await c.relay.flush();
  console.log('   likesCount:', c.metrics.countFor('v1'));

  try { await c.toggleLike.execute({ userId: 'u1', videoId: 'inexistente' }); }
  catch (e) { console.log('3) vídeo inexistente ->', e.constructor.name, e.status, e.message); }
})();
