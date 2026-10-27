const { VideoLiked } = require('../domain/events/video-liked');
const { VideoUnliked } = require('../domain/events/video-unliked');
const { Like } = require('../domain/like');

// Caso de uso: depende só de portas injetadas (DIP). Não conhece Sequelize, fs nem models de outros módulos.
class ToggleLike {
  constructor({ likes, videoCatalog, events, unitOfWork }) {
    Object.assign(this, { likes, videoCatalog, events, unitOfWork });
  }

  async execute({ userId, videoId }) {
    return this.unitOfWork.run(async () => {
      // Contrato único de busca: devolve o vídeo ou lança NotFoundError (correção da violação 6).
      const video = await this.videoCatalog.getSummary(videoId);
      const existing = await this.likes.find(userId, videoId);

      if (existing) {
        await this.likes.remove(existing);
        await this.events.publish(new VideoUnliked({ videoId, userId, authorId: video.authorId }));
        return { liked: false };
      }
      await this.likes.add(new Like({ userId, videoId }));
      await this.events.publish(new VideoLiked({ videoId, userId, authorId: video.authorId }));
      return { liked: true };
    });
  }
}
module.exports = { ToggleLike };
