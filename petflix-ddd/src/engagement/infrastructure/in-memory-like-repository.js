const { LikeRepository } = require('../domain/like-repository.port');

class InMemoryLikeRepository extends LikeRepository {
  constructor() { super(); this.items = []; }
  async find(userId, videoId) { return this.items.find((l) => l.userId === userId && l.videoId === videoId) || null; }
  async add(like) { this.items.push(like); }
  async remove(like) { this.items = this.items.filter((l) => l !== like); }
  async countByVideo(videoId) { return this.items.filter((l) => l.videoId === videoId).length; }
}
module.exports = { InMemoryLikeRepository };
