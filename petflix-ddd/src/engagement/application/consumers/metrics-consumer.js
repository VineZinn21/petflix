// Consumidor idempotente: atualiza o contador de curtidas a partir de eventos
// (substitui o UPDATE feito dentro do likeService no código original).
class MetricsConsumer {
  constructor() { this.likesCount = new Map(); this.processed = new Set(); }

  async handle(event) {
    if (this.processed.has(event.id)) return;            // at-least-once => ignora reentrega
    const { videoId } = event.data;
    const current = this.likesCount.get(videoId) || 0;
    if (event.type === 'video.liked') this.likesCount.set(videoId, current + 1);
    if (event.type === 'video.unliked') this.likesCount.set(videoId, Math.max(0, current - 1));
    this.processed.add(event.id);
  }

  countFor(videoId) { return this.likesCount.get(videoId) || 0; }
}
module.exports = { MetricsConsumer };
