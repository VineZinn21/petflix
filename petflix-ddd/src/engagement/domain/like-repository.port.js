// Porta de saída do contexto Engajamento.
class LikeRepository {
  async find(userId, videoId) { throw new Error('not implemented'); }
  async add(like) { throw new Error('not implemented'); }
  async remove(like) { throw new Error('not implemented'); }
  async countByVideo(videoId) { throw new Error('not implemented'); }
}
module.exports = { LikeRepository };
