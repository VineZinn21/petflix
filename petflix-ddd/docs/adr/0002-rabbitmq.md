# ADR 0002 — RabbitMQ como message broker
**Decisão:** exchange `topic` `petflix.events`, filas duráveis por consumidor (`notifications.q`, `metrics.q`), DLQ e retry com backoff.
**Alternativas:** Kafka (excessivo para o porte), Redis Streams (menos recursos de roteamento).
