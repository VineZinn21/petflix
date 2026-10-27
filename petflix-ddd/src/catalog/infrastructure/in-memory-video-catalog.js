const { NotFoundError } = require('../../shared/kernel/errors');

// Adaptador da porta VideoCatalog (leitura resumida do contexto Catálogo).
// Contrato único: devolve { id, authorId, title } ou lança NotFoundError.
class InMemoryVideoCatalog {
  constructor(videos = []) { this.videos = new Map(videos.map((v) => [v.id, v])); }
  async getSummary(videoId) {
    const video = this.videos.get(videoId);
    if (!video) throw new NotFoundError('Vídeo');
    return video;
  }
}
module.exports = { InMemoryVideoCatalog };
