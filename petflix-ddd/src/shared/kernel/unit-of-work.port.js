// Porta: executa um caso de uso de forma atômica (no MySQL seria uma transação Sequelize).
class UnitOfWork {
  async run(work) { throw new Error('not implemented'); }
}
module.exports = { UnitOfWork };
