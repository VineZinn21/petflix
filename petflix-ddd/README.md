# Petflix — Arquitetura DDD / Hexagonal

Reorganização do projeto Petflix (plataforma de vídeos educativos sobre pets) em **Domain-Driven Design** com **Arquitetura Hexagonal** e comunicação por **eventos** (RabbitMQ).

## Bounded contexts
| Contexto | Agregados | Origem no projeto atual |
|---|---|---|
| `identity` | User | modules/user, auth, jwt |
| `catalog` | Video, Category | modules/video, videoMulter |
| `engagement` | Like, Comment, Follow | modules/like, modules/comment |
| `discovery` | Feed, Busca (read models) | modules/search, getFeed |

## Camadas (dependência sempre para dentro)
`interfaces/http → application → domain ← infrastructure`

- **domain**: entidades, objetos de valor, eventos de domínio e **portas** (interfaces).
- **application**: casos de uso; dependem só das portas.
- **infrastructure**: adaptadores (Sequelize/MySQL, disco, bcrypt, JWT, AMQP).
- **interfaces/http**: controllers, rotas, validators e presenters.
- **main**: raiz de composição (injeção de dependências).

## Documentação
- `docs/c4/` — diagramas C4 (contexto, contêineres, componentes) e mapa de contextos.
- `docs/adr/` — decisões arquiteturais (DDD, RabbitMQ, Outbox).

## Como rodar (Node.js 18+, sem dependências)
```bash
npm test       # 5 testes (node --test)
npm run demo   # fluxo: curtir -> outbox -> relay -> broker -> consumidores
```

## O que está implementado e o que é proposta
| Implementado (roda) | Proposto (documentado em `docs/`) |
|---|---|
| Caso de uso `ToggleLike` (Engajamento) com portas e injeção de dependências | Demais casos de uso e contextos (identity, catalog, discovery) |
| Eventos de domínio `VideoLiked` / `VideoUnliked` | Persistência real em MySQL/Sequelize |
| Outbox + relay + broker **em memória** (mesma porta do RabbitMQ) | Adaptador RabbitMQ real (`amqplib`) e filas com DLQ |
| Consumidores idempotentes (métricas e notificações) | Workers como processos separados |
| Contrato único de busca (`NotFoundError`) — corrige a violação 6 | Refatoração do código original do Petflix |
