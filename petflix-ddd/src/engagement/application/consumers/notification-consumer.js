// Consumidor idempotente: notifica o autor do vídeo. Aqui só registra em memória;
// o adaptador real enviaria e-mail/push.
class NotificationConsumer {
  constructor() { this.sent = []; this.processed = new Set(); }

  async handle(event) {
    if (this.processed.has(event.id)) return;
    if (event.type === 'video.liked') {
      this.sent.push({ to: event.data.authorId, message: `Seu vídeo ${event.data.videoId} recebeu uma curtida.` });
    }
    this.processed.add(event.id);
  }
}
module.exports = { NotificationConsumer };
