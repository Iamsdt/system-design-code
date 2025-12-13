# System Design & Cloud Engineering Essentials

Purpose: concise, grouped topics for system design and cloud fundamentals. Emphasis on picking the right data/compute patterns and comparing managed cloud options without over- or under-grouping.

## 1) Core Principles & Sizing

- Interview flow, use-case mapping, functional vs non-functional requirements

  - Why: A disciplined interview flow ensures you design solutions that match real user needs and constraints, not hypothetical ideal architectures.
  - How: Start with clarifying questions, map user journeys, define what 'done' means, and separate functional from non-functional requirements.
  - When: Always at the start of a design or when mapping legacy systems for migration.
  - Trade-offs: Time spent on elicitation reduces time for detailed design — set expectations with stakeholders.

- Performance vs scalability; latency vs throughput; CAP vs BASE trade-offs

  - Why: Conflating performance (single request speed) and scalability (growth handling) leads to poor architecture choices.
  - How: Measure p50/p95/p99 latencies, profile hotspots, and model increased load to derive req/sec and bandwidth needs.
  - When: During SLA/SLO planning, capacity planning, and selecting database/compute approaches.
  - Trade-offs: Caching reduces latency but increases complexity and operational burden; large VMs provide performance but limit horizontal scaling.

- Back-of-envelope estimates: traffic/QPS, storage/bandwidth, SLIs/SLOs/SLAs and availability math

  - Why: Quick numeric estimates help you choose realistic infrastructure, databases, and caches during interviews and early architecture design.
  - How: Use DAU × requests/user to get daily requests; divide by 86,400 for average QPS; multiply by request size to estimate bandwidth.
  - When: Use during design interviews, early architecture and cost planning; verify with load tests later.
  - Trade-offs: Estimates are approximate. Err on the side of multiplying by a safety factor (2–10x) to account for spikes, growth, and hot keys.

- Vertical vs horizontal scaling basics
  - Why: Picking the wrong scaling strategy can cause unnecessary cost and downtime during growth.
  - How: Start with vertical scaling for small monoliths and stateful systems; migrate to horizontal scaling (stateless services, sharding) as you grow.
  - When: Early-stage startups should conserve cost with vertical scaling; scale horizontally when traffic and availability requirements increase.
  - Trade-offs: Vertical is operationally simpler but limited in capacity; horizontal requires partitioning and coordination but offers fault tolerance.

### Visuals & Interactive Demos

- Image: simple CAP theorem Venn (public domain-like styled SVG) or example diagrams from Wikimedia Commons or Unsplash to illustrate trade-offs.
- Interactive: Capacity planner calculator (DAU → QPS → bandwidth) and availability calculator for downtime math (easily implemented as a small web demo for the lecture).

## 2) Networking & Edge Delivery

- IP/DNS basics, TTL, geo/latency-aware routing

  - Why: Every request starts with finding the server. Performance depends on routing users to the closest healthy node.
  - How: DNS records (A, CNAME, NS), Anycast IP for geo-routing, and TTL for caching.
  - When: Designing global systems or debugging connectivity/latency issues.
  - Trade-offs: Low TTL = fresher data but higher DNS load/latency; High TTL = better caching but risk of stale endpoints during failover.

- HTTP/2/3 and TCP vs UDP trade-offs; TLS termination and connection pooling

  - Why: Protocols dictate performance. TCP is reliable but slow; UDP is fast but unreliable. HTTP/2+3 fix head-of-line blocking.
  - How: Use HTTP/2 for multiplexing; HTTP/3 (QUIC) for lossy networks. Offload TLS at the load balancer to save app server CPU.
  - When: High-traffic web apps, streaming (UDP), or mobile apps (HTTP/3).
  - Trade-offs: UDP requires custom reliability logic (or QUIC); TLS termination simplifies app logic but requires a secure internal network.

- Reverse proxy vs load balancer (L4/L7 algorithms, health checks)

  - Why: Scale beyond one server and secure the internal network.
  - How: L4 LB (IP+Port) for raw speed; L7 LB (HTTP headers/path) for smart routing. Reverse proxy hides server identity.
  - When: Always, for production systems requiring availability and scale.
  - Trade-offs: L7 offers smarter routing (e.g., by user ID) but is more CPU-intensive than L4.

- CDN push vs pull, cache hierarchies, invalidation strategies

  - Why: Serve static content from the edge (close to user) to reduce latency and origin load.
  - How: Pull (fetch on miss) for automation; Push (upload) for control. Invalidate via TTL or explicit purge.
  - When: Serving images, CSS, JS, or video to a distributed audience.
  - Trade-offs: Pull is easier but has "cold start" latency; Push ensures availability but adds deployment complexity.

### Visuals & Interactive Demos

- Interactive: DNS resolution flow visualizer (Client -> Root -> TLD -> NS).
- Interactive: CDN cache hit/miss simulator with latency comparison.
- Diagram: OSI 7-layer model highlighting L4 vs L7 load balancing.

## 3) Data Architecture & Storage Choices

- How to choose a database: SQL vs NoSQL, ACID vs BASE, schema needs, access patterns, consistency and latency budgets

  - Why: Choosing the wrong database can lead to performance bottlenecks, scaling issues, and excessive costs. Different data models optimize for different use cases.
  - How: Analyze your access patterns (read-heavy vs write-heavy, queries by key vs complex joins), consistency requirements (strong vs eventual), schema flexibility needs, and scale projections. SQL excels at complex queries and transactions; NoSQL shines at horizontal scaling and flexible schemas.
  - When: During initial architecture design, when migrating legacy systems, or when current database performance becomes a bottleneck.
  - Trade-offs: SQL provides strong consistency and ACID guarantees but can be harder to scale horizontally. NoSQL (BASE) offers better availability and partition tolerance but often with eventual consistency. The CAP theorem forces you to choose between consistency, availability, and partition tolerance—you can only have two.

- Storage models and when to pick them: key-value, document, wide-column, graph; blob/object storage for media/large files

  - Why: Each storage model is optimized for specific data structures and access patterns. Using the right model reduces complexity and improves performance.
  - How: Key-value (Redis, DynamoDB) for simple lookups, caching, session stores. Document (MongoDB, DocumentDB) for semi-structured data with nested objects, catalogs, user profiles. Wide-column (Cassandra, Bigtable) for time-series data, high write throughput. Graph (Neo4j, Neptune) for highly connected data, social networks, recommendation engines. Blob/object storage (S3, Cloud Storage) for media files, backups, data lakes.
  - When: Key-value for sub-millisecond reads; document when schema evolves frequently; wide-column for IoT sensor data or analytics; graph for fraud detection or social features; object storage for static assets and archives.
  - Trade-offs: Key-value is fast but limited in querying. Documents offer flexibility but can have performance issues with complex aggregations. Wide-column handles massive write throughput but has limited query flexibility. Graph excels at relationships but doesn't scale as well for non-relationship queries. Object storage is cheap and durable but has higher latency than databases.

- Operational patterns: replication (leader/follower, quorum), partitioning/sharding keys, federation, indexing and query tuning

  - Why: Single-server databases become bottlenecks. Replication provides redundancy and read scaling. Partitioning enables horizontal scaling beyond single-machine limits.
  - How: Leader-follower replication: writes go to leader, replicated to followers for read scaling. Multi-leader: accept writes at multiple nodes (conflict resolution needed). Quorum: require W writes + R reads where W+R > N for consistency. Sharding: partition data by key (user ID, geography, hash) across multiple servers. Choose shard keys carefully to avoid hot spots. Index frequently queried fields; avoid over-indexing (slows writes).
  - When: Implement read replicas when read load exceeds single server capacity. Add sharding when write load or data size exceeds vertical scaling limits. Use quorum for distributed systems requiring tunable consistency.
  - Trade-offs: Replication adds operational complexity and eventual consistency lag. Wrong shard key leads to uneven load distribution and difficult migrations. Too many indexes slow down writes and consume storage. Federation (splitting by function/service) provides autonomy but complicates cross-database queries.

- Caching patterns: cache-aside, write-through/back, refresh-ahead; consistent hashing to avoid hot shards

  - Why: Database queries are expensive. Caching reduces latency from hundreds of milliseconds to microseconds and decreases database load.
  - How: Cache-aside (lazy loading): app checks cache first, on miss reads DB and populates cache. Write-through: write to cache and DB synchronously (strong consistency). Write-back: write to cache first, async flush to DB (better performance, risk of data loss). Refresh-ahead: preemptively update cache before expiration. Consistent hashing: distribute cache keys across nodes so adding/removing nodes only redistributes 1/N keys, not all keys.
  - When: Cache-aside for read-heavy workloads. Write-through for strong consistency requirements. Write-back for write-heavy workloads where temporary data loss is acceptable. Refresh-ahead for predictable access patterns. Consistent hashing for distributed caches.
  - Trade-offs: Cache-aside risks stale data and cache stampede (many requests for same missing key). Write-through adds write latency. Write-back risks data loss on crash. Refresh-ahead wastes resources if predictions are wrong. All caching increases complexity and requires invalidation strategies.

- Compliance hooks: data lifecycle, GDPR/PII handling, encryption at rest/in transit

  - Why: Regulatory requirements (GDPR, HIPAA, SOC2) mandate specific data handling. Non-compliance results in fines and legal liability.
  - How: Classify data by sensitivity. Encrypt sensitive data at rest (AES-256) and in transit (TLS 1.3). Implement data retention policies and automated deletion. For PII, support right-to-access (export user data) and right-to-erasure (delete user data). Use data residency controls to keep data in specific regions. Maintain audit logs for access and modifications.
  - When: Design data architecture with compliance from day one. Retrofitting is expensive and risky. Review requirements when entering new markets or handling new data types.
  - Trade-offs: Encryption adds CPU overhead and complexity. Data deletion conflicts with backup/disaster recovery (may require encrypted backups with key destruction). Audit logging increases storage costs and write latency. Strict data residency can increase latency for global users.

### Visuals & Interactive Demos

- Interactive: Database selector tool (input: access patterns, consistency needs, scale → output: recommended DB type with reasoning)
- Interactive: Caching strategy simulator (demonstrate cache-aside vs write-through with hit/miss visualization)
- Interactive: Sharding calculator (choose shard key, visualize data distribution, show hot shard risks)
- Interactive: CAP theorem visualizer (adjust network partition, see effects on consistency/availability)
- Diagram: Replication topologies (leader-follower, multi-leader, leaderless/quorum)
- Interactive: Consistent hashing visualizer (add/remove nodes, see key redistribution)

## 4) Compute & Runtime Models

- Compute choices: process vs container vs function vs job; what is the unit of scaling?

  - Why: Compute is where latency, cost, and operational complexity usually concentrate. Picking the wrong runtime (VM, container, serverless, job) can force a rewrite later.
  - How: Start from workload shape (HTTP request/response vs event-driven vs batch) + state needs (stateless vs stateful) + scaling unit (instance/pod/function invocation) + operational model (self-managed vs managed).
  - When: Early architecture design, platform standardization, and whenever latency/cost/operability constraints change.
  - Trade-offs: More control (VMs/Kubernetes) usually means more operational overhead; more managed/serverless usually means tighter platform constraints and potential vendor coupling.

- Monolith vs modular monolith vs microservices; service discovery and API composition

  - Why: Service boundaries determine team velocity, reliability blast radius, and how hard it is to scale independent hotspots.
  - How:
    - Monolith: a single deployable; optimize via clear module boundaries, profiling, and caching.
    - Modular monolith: one deployable with strong boundaries (packages/modules), clear interfaces, and migration path to services.
    - Microservices: independently deployable services with explicit contracts; requires strong ops (CI/CD, observability) and data ownership discipline.
    - API composition: pick between API gateway, BFF (backend-for-frontend), GraphQL federation, or direct service calls based on client needs and latency budgets.
  - When: Monolith/modular monolith for early-stage and tight teams; microservices when independent scaling/deployments and fault isolation are worth the overhead.
  - Trade-offs: Microservices improve independent deployments but add distributed-systems costs (network latency, versioning, debugging, consistency).

- Containers and orchestration: image hygiene, Kubernetes primitives, autoscaling, and disruptions

  - Why: Containers standardize packaging and environments; orchestration standardizes rollout, healing, and scaling.
  - How:
    - Container hygiene: minimal base images, pinned dependencies, non-root user, explicit health checks, immutable builds.
    - Kubernetes primitives: Deployments/ReplicaSets for stateless apps, StatefulSets for stateful workloads, Services/Ingress for routing, ConfigMaps/Secrets for config.
    - Autoscaling: HPA for horizontal scaling (CPU/memory/custom metrics), VPA for rightsizing requests/limits, and cluster/node autoscaling for capacity.
    - Disruptions: use PodDisruptionBudgets (PDBs) to limit voluntary evictions during node drains/upgrades; tune so you don’t block maintenance.
  - When: Containers for most production workloads; Kubernetes when you need multi-service orchestration, portable deployments, and fine-grained control.
  - Trade-offs: Kubernetes is powerful but operationally heavy; autoscaling is only as good as your metrics, requests/limits, and readiness probes.

- Serverless and managed runtimes: functions vs containers vs managed K8s

  - Why: Managed runtimes can remove large chunks of undifferentiated ops work (patching, node management, autoscaling).
  - How:
    - Functions (FaaS): best for event-driven, small units of work; watch cold starts, execution limits, and state/external connections.
    - Container serverless (e.g., Cloud Run/App Runner/Container Apps): best for HTTP APIs, gRPC services, and “bring-your-own-runtime” containers with simpler ops.
    - Managed Kubernetes: best when you need deeper networking controls, daemonsets, sidecars, custom schedulers, or heterogeneous workloads.
  - When: Prefer managed/serverless for typical web backends and event handling; choose K8s/VMs when platform constraints block you.
  - Trade-offs: Serverless often has cold starts and constraints around networking, filesystem, and long-running workloads; K8s/VMs have more toil.

- Deployment strategies: rolling, blue/green, canary, feature flags; supply-chain security and SBOMs

  - Why: Rollout strategy determines user impact during releases and how quickly you can detect/rollback failures.
  - How:
    - Rolling: gradually replace instances; tune max unavailable/surge and use strong readiness/liveness probes.
    - Blue/green: keep two environments; switch traffic in one step; keep the previous version for fast rollback.
    - Canary: shift a small % of traffic, observe, then increase; requires good metrics, alerting, and automated rollback triggers.
    - Feature flags: separate deploy from release; reduce risk by enabling features per cohort, region, or percentage.
    - Supply-chain security: signed artifacts, provenance, dependency scanning, and SBOMs to reduce compromise risk.
  - When: Rolling for low-risk incremental changes; blue/green for low-downtime cutovers; canary for high-risk changes with strong observability.
  - Trade-offs: Blue/green costs extra capacity; canary needs robust telemetry and traffic control; feature flags add complexity and cleanup debt.

### Visuals & Interactive Demos

- Interactive: Deployment strategy simulator (rolling vs blue/green vs canary) with traffic shifting and rollback thinking
- Diagram: Kubernetes rollout and autoscaling loop (Deployment + HPA + readiness)
- Visual: Runtime decision tree (Function vs container serverless vs Kubernetes vs VM)

## 5) APIs, Integration & Data Movement

- REST vs gRPC vs GraphQL: when to choose, versioning, idempotency, pagination
- API gateway patterns: routing, auth, rate limiting, payload transforms
- Sync vs async: queues and pub/sub (ordering, DLQs, at-least/exactly-once), backpressure, retries with jitter
- Real-time paths: WebSockets/SSE/long-polling, webhooks for server-to-server notifications

## 6) Reliability & Resilience

- SLO-driven design, error budgets, chaos/load testing
- Graceful degradation, brownouts, hedged requests, tail-latency mitigation
- Rate limiting and throttling (token/sliding window); circuit breaking and bulkheads
- DR/backup/restore, RTO/RPO planning; active-active vs active-passive

## 7) Security, Governance & Compliance

- AuthN/AuthZ (OAuth2/OIDC, JWT), mTLS, key management and rotation
- Network posture: VPC segmentation, WAF/DDoS protection, least-privilege IAM
- Secrets management, audit logging/tamper evidence, data residency controls

## 8) Observability & Operations

- Metrics/logs/traces with sampling; OpenTelemetry and structured logging
- Dashboards and alert design (multi-window burn rates), SLI/SLO tracking
- Incident response playbooks, on-call hygiene, runbooks, game days

## 9) Cloud Service Comparisons (managed-first bias)

- Data: Cloud SQL vs RDS vs Azure SQL; Spanner vs DynamoDB/Cosmos DB; Bigtable vs Cassandra; BigQuery vs Redshift/Synapse
- Messaging/streaming: Pub/Sub vs SNS/SQS/EventBridge vs Event Hub/Service Bus; Dataflow/Beam vs Kinesis vs Data Factory/Synapse pipelines
- Compute: Cloud Run vs App Runner vs Azure Container Apps; GKE vs EKS vs AKS; Functions vs Lambda vs Azure Functions
- Storage and cache: Cloud Storage vs S3 vs Blob; Memorystore (Redis) vs ElastiCache vs Azure Cache for Redis
- Networking: Cloud Load Balancing vs ALB/NLB vs Azure Front Door/App Gateway; Cloud CDN vs CloudFront vs Azure CDN

## 10) Practice & Labs

- Back-of-envelope drills per topic (traffic, storage, availability math)
- Hands-on labs: Terraform + CI/CD + Cloud Run/GKE + Pub/Sub + cache/DB choice
- Classic designs: URL shortener, rate limiter, news feed, chat/notifications, file storage, media streaming

## Suggested Interactive Elements

- Capacity/QPS planner and availability calculator (Topic 1)
- Load balancer and CDN path visualizer (Topic 2)
- Database and cache selector with workload inputs (Topic 3)
- Deployment strategy simulator (rolling/blue-green/canary) (Topic 4)
- API gateway/rate-limit sandbox (Topic 5)
- Chaos and retry/jitter simulator (Topic 6)
- IAM policy builder and network segmentation sandbox (Topic 7)
- SLO dashboard with alert tuning (Topic 8)

## Keep It Current

- Revisit cloud release notes quarterly (GCP/AWS/Azure) for managed service limits and pricing changes.
- Map each topic to at least one managed service to reinforce managed-first design.

## Assessment

- Short scenario prompts per topic with expected trade-offs
- Capstone: multi-tier service with SLOs, dashboards, CI/CD, and rollout strategy
