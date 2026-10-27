class InMemoryOutbox {
  constructor() { this.rows = []; }
  async append(event) { this.rows.push({ event, publishedAt: null }); }
  async pending() { return this.rows.filter((r) => !r.publishedAt); }
  async markPublished(row) { row.publishedAt = new Date(); }
}
module.exports = { InMemoryOutbox };
