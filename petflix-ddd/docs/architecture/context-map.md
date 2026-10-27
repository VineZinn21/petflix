# Mapa de contextos
Contextos se referenciam **por ID** (userId, videoId), nunca por modelo/objeto de outro contexto.
Integração entre contextos: **eventos de domínio** publicados no exchange `petflix.events`.

| Evento | Produtor | Consumidores |
|---|---|---|
| `video.uploaded` | catalog | discovery |
| `video.deleted` | catalog | engagement, identity |
| `video.liked` | engagement | notificações, métricas |
| `comment.posted` | engagement | notificações, métricas |
| `video.viewed` | catalog | métricas |
