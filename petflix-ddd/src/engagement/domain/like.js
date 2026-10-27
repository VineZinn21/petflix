// Agregado Like: referencia User e Video apenas por ID.
class Like {
  constructor({ userId, videoId, createdAt = new Date() }) {
    if (!userId || !videoId) throw new Error('Like exige userId e videoId.');
    this.userId = userId;
    this.videoId = videoId;
    this.createdAt = createdAt;
  }
}
module.exports = { Like };
