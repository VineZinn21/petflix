# ADR 0001 — DDD com Arquitetura Hexagonal
**Status:** proposta · **Contexto:** services acessam models Sequelize de outros módulos e `fs` diretamente (violações de SRP/DIP).
**Decisão:** separar em bounded contexts com camadas domain/application/infrastructure/interfaces; dependências via portas.
**Consequências:** mais arquivos, porém regras testáveis sem banco/disco e contextos desacoplados.
