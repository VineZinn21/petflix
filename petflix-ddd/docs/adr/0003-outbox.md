# ADR 0003 — Transactional Outbox
**Decisão:** o evento é gravado na tabela `outbox` na mesma transação do caso de uso; um relay publica no broker.
**Garantia:** at-least-once; consumidores idempotentes pelo `event.id`.
