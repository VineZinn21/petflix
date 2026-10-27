const { UnitOfWork } = require('../kernel/unit-of-work.port');

class InMemoryUnitOfWork extends UnitOfWork {
  async run(work) { return work(); }
}
module.exports = { InMemoryUnitOfWork };
