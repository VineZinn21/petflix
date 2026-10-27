class DomainError extends Error {}
class NotFoundError extends DomainError { constructor(what) { super(`${what} não encontrado.`); this.status = 404; } }
class ForbiddenError extends DomainError { constructor() { super('Você não tem permissão para esta ação.'); this.status = 403; } }
module.exports = { DomainError, NotFoundError, ForbiddenError };
