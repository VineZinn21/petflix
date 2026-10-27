const { DomainEvent } = require('../../../shared/kernel/domain-event');

class VideoLiked extends DomainEvent {
  constructor({ videoId, userId, authorId }) { super('video.liked', { videoId, userId, authorId }); }
}

module.exports = { VideoLiked };
