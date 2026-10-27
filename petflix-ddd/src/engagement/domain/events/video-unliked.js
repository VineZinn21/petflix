const { DomainEvent } = require('../../../shared/kernel/domain-event');

class VideoUnliked extends DomainEvent {
  constructor({ videoId, userId, authorId }) { super('video.unliked', { videoId, userId, authorId }); }
}
module.exports = { VideoUnliked };
