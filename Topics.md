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

- REST vs gRPC vs GraphQL: Deep dive into protocols, versioning, and idempotency

  - Why: The protocol defines the contract, performance, and coupling between services. Choosing the wrong one can lead to chatty interfaces or rigid contracts.
  - How:
    - **REST (Representational State Transfer)**: Resource-oriented (Nouns over Verbs). Uses standard HTTP methods (GET, POST, PUT, DELETE).
      - _Versioning_: URI Path (`/v1/users`), Query Param (`?v=1`), or Header (`Accept: application/vnd.v1+json`). Path is most cache-friendly; Header is most "RESTful".
      - _Idempotency_: Critical for payments/retries. Use `Idempotency-Key` header. Server stores result of the first successful request and returns it for subsequent retries with the same key.
      - _Pagination_: Offset-based (simple, slow on large data) vs Cursor-based (fast, stable, no random access).
    - **GraphQL**: Client-driven queries. Solves over-fetching (getting too much data) and under-fetching (N+1 requests).
      - _Schema_: Strongly typed contract.
      - _Complexity_: Moves complexity to the server (resolvers). Caching is harder than REST (POST requests).
    - **gRPC**: High-performance RPC based on Protocol Buffers (binary).
      - _Performance_: Uses HTTP/2 (multiplexing, header compression). 7-10x faster serialization than JSON.
      - _Streaming_: Native support for Unary, Server Streaming, Client Streaming, and Bidirectional Streaming.
  - When: REST for public APIs (universally understood). GraphQL for complex frontends/mobile (bandwidth efficiency). gRPC for internal microservices (low latency).
  - Trade-offs: REST is chatty. GraphQL is complex to secure (depth limits). gRPC requires generated client code and proxies for web.

- API Gateway Patterns: The "Front Door" for Microservices

  - Why: Decouples clients from internal service architecture. Handles cross-cutting concerns centrally.
  - How:
    - **Routing**: L7 routing based on path/headers.
    - **Backend for Frontend (BFF)**: Specific gateways for Mobile vs Web to optimize payload size and auth methods.
    - **Rate Limiting Algorithms**:
      - _Token Bucket_: Allows bursts. Tokens refill at fixed rate.
      - _Leaky Bucket_: Smooths traffic. Requests processed at constant rate.
      - _Fixed Window_: Simple, but suffers from edge-case spikes.
      - _Sliding Window_: Most accurate, higher memory cost.
  - When: Always in distributed systems. Don't expose microservices directly.
  - Trade-offs: Single point of failure (needs high availability). Added latency hop.

- Asynchronous Messaging & Event-Driven Architecture

  - Why: Synchronous (HTTP) chains availability (System A down = System B fails). Async decouples uptime and levels load.
  - How:
    - **Message Queues (SQS, RabbitMQ)**: Point-to-Point. One consumer gets the message. Good for work distribution.
    - **Pub/Sub (SNS, Kafka)**: Fan-out. All subscribers get the message. Good for side-effects (email, audit log).
    - **Resilience Patterns**:
      - _Dead Letter Queues (DLQ)_: "Parking lot" for messages that fail processing repeatedly. Prevents poison pills from blocking the queue.
      - _Backpressure_: Consumers signal producers to slow down when overwhelmed.
      - _Exponential Backoff with Jitter_: When retrying, wait `2^n` seconds + `random_noise`. Prevents "Thundering Herd" where all clients retry at the exact same second, crushing the recovering server.
  - When: Long-running tasks (video processing), decoupling critical path (checkout -> send email), and load leveling.
  - Trade-offs: Eventual consistency. Debugging is harder (tracing across queues). Message ordering is expensive (FIFO queues often have lower throughput).

- Real-time Communication: Beyond Request/Response

  - Why: Users expect instant updates (chat, stock prices, notifications) without refreshing.
  - How:
    - **WebSockets**: Persistent, bidirectional TCP connection. Low latency. Stateful (hard to load balance).
    - **Server-Sent Events (SSE)**: Unidirectional (Server -> Client) over HTTP. Great for news feeds. Auto-reconnects.
    - **Long Polling**: Client opens request, server holds it until data is available. Legacy fallback.
    - **Webhooks**: "Reverse API". Server calls a URL you provide when an event happens. Standard for B2B integration (Stripe, GitHub).
  - When: Chat/Gaming (WebSockets), Feeds (SSE), 3rd Party Sync (Webhooks).
  - Trade-offs: WebSockets require stateful connections (harder to scale LBs). SSE is text-only. Webhooks require public endpoints and security verification.

### Visuals & Interactive Demos

- Interactive: API Gateway Simulator (visualize rate limiting, routing, and auth failures).
- Interactive: Protocol Trade-off Comparator (REST vs GraphQL vs gRPC latency/payload size).
- Diagram: Sync vs Async flow (Request/Response vs Event-Driven).

## 6) Reliability & Resilience

- SLO-driven design, error budgets, chaos/load testing

  - Why: Without clear reliability targets, teams optimize for the wrong metrics. SLOs align engineering effort with business outcomes.
  - How: Define SLIs (Service Level Indicators) like latency p99, error rate, availability. Set SLOs (targets like 99.9% uptime). Error budgets = 100% - SLO. Use error budgets to decide when to prioritize reliability vs features. Chaos engineering: intentionally inject failures (kill pods, network partitions) to test resilience. Load testing: simulate production traffic patterns.
  - When: Establish SLOs during initial design. Run chaos tests in staging before major releases. Load test before traffic spikes (Black Friday, launches).
  - Trade-offs: Strict SLOs (99.99%) require more redundancy and cost. Error budgets that are too loose don't drive reliability improvements. Chaos testing can cause real outages if not properly isolated.

- Graceful degradation, brownouts, hedged requests, tail-latency mitigation

  - Why: Not all failures are catastrophic. Systems should degrade functionality rather than fail completely.
  - How: Graceful degradation: disable non-critical features (recommendations, analytics) when under load. Brownouts: reduce quality (lower video resolution, simplified UI) instead of rejecting requests. Hedged requests: send duplicate requests to multiple servers, use first response, cancel others (reduces tail latency). Circuit breakers: stop calling failing services after threshold failures, auto-recover after timeout.
  - When: Design degradation paths for all non-critical features. Use hedged requests for high-priority, latency-sensitive operations. Implement circuit breakers for all external dependencies.
  - Trade-offs: Degradation logic adds complexity. Hedged requests increase load (2x requests). Circuit breakers can cause cascading failures if misconfigured.

- Rate limiting and throttling (token/sliding window); circuit breaking and bulkheads

  - Why: Protect systems from traffic spikes, abuse, and cascading failures. Rate limiting prevents one user/service from overwhelming the system.
  - How:
    - **Token Bucket**: Tokens added at fixed rate, requests consume tokens. Allows bursts up to bucket size.
    - **Sliding Window**: Track requests in time windows, most accurate but higher memory cost.
    - **Fixed Window**: Simple counters per time period, but suffers from edge-case spikes at window boundaries.
    - **Circuit Breaker**: Open circuit after failure threshold, half-open to test recovery, close when healthy.
    - **Bulkheads**: Isolate resources (thread pools, connections) so one failing component doesn't starve others.
  - When: Rate limit all public APIs and user-facing endpoints. Use circuit breakers for external dependencies. Apply bulkheads to critical resource pools.
  - Trade-offs: Rate limiting can reject legitimate traffic during spikes. Circuit breakers add latency and can cause false positives. Bulkheads require careful resource allocation.

- DR/backup/restore, RTO/RPO planning; active-active vs active-passive

  - Why: Disasters happen (data center fires, region outages, ransomware). Recovery planning determines business continuity.
  - How:
    - **RTO (Recovery Time Objective)**: Maximum acceptable downtime (e.g., 4 hours). Drives backup frequency and failover automation.
    - **RPO (Recovery Point Objective)**: Maximum acceptable data loss (e.g., 1 hour). Drives backup frequency.
    - **Active-Passive**: Primary region serves traffic, secondary region is standby (lower cost, higher RTO).
    - **Active-Active**: Both regions serve traffic simultaneously (lower RTO, higher cost and complexity).
    - **Backup Strategies**: Full backups (complete snapshot), incremental (changes since last backup), continuous (streaming replication).
  - When: Define RTO/RPO during initial architecture. Test DR procedures quarterly. Active-active for critical systems with <1 hour RTO.
  - Trade-offs: Active-active doubles infrastructure cost. Frequent backups increase storage and network costs. Testing DR is expensive and risky.

- Distributed consensus and leader election (Raft, Paxos basics)

  - Why: Distributed systems need agreement on state, leader selection, and configuration changes. Consensus algorithms ensure consistency across nodes.
  - How:
    - **Raft**: Leader-based consensus. Leader handles all writes, replicates to followers. Leader election via majority vote. Simpler to understand than Paxos.
    - **Paxos**: Classic consensus algorithm, more complex but proven. Multi-round voting process.
    - **Leader Election**: Used in distributed locks, master selection, configuration management. Implement via etcd, Consul, or ZooKeeper.
  - When: Use when you need strong consistency across distributed nodes (distributed databases, configuration stores, coordination services).
  - Trade-offs: Consensus adds latency (network round trips). Leader election can cause brief unavailability during leader changes. Requires majority of nodes to be healthy.

### Visuals & Interactive Demos

- Interactive: SLO/Error Budget Calculator (input SLO, see downtime budget, track burn rate)
- Interactive: Rate Limiter Simulator (token bucket vs sliding window, visualize request handling)
- Interactive: Circuit Breaker State Machine (open/half-open/closed transitions with failure thresholds)
- Interactive: DR Scenario Planner (RTO/RPO calculator, backup frequency recommendations)
- Diagram: Active-Active vs Active-Passive architecture comparison
- Interactive: Raft Leader Election Visualizer (show leader election process, log replication)

## 7) Security, Governance & Compliance

- AuthN/AuthZ (OAuth2/OIDC, JWT), mTLS, key management and rotation

  - Why: Authentication (who you are) and authorization (what you can do) are foundational security controls. Weak auth leads to data breaches.
  - How:
    - **OAuth2**: Delegated authorization framework. Flow: User → Authorization Server → Access Token → Resource Server. Scopes define permissions.
    - **OIDC (OpenID Connect)**: Identity layer on OAuth2. Adds ID tokens (user identity) to access tokens (permissions).
    - **JWT (JSON Web Tokens)**: Self-contained tokens with claims (user ID, roles, expiration). Stateless, but can't revoke before expiry.
    - **mTLS (Mutual TLS)**: Both client and server authenticate with certificates. Used for service-to-service communication in zero-trust networks.
    - **Key Management**: Use managed services (AWS KMS, GCP KMS, Azure Key Vault). Rotate keys regularly (90 days for high-risk, 365 for low-risk). Use key versioning for zero-downtime rotation.
  - When: OAuth2/OIDC for user authentication. JWT for stateless API auth. mTLS for microservices in untrusted networks. Key rotation: automated for all production keys.
  - Trade-offs: JWT can't be revoked (use short expiry + refresh tokens). mTLS adds certificate management overhead. Key rotation requires careful coordination to avoid downtime.

- Network posture: VPC segmentation, WAF/DDoS protection, least-privilege IAM

  - Why: Defense in depth. Network segmentation limits blast radius. WAF/DDoS protection prevents common attacks. Least-privilege IAM reduces insider threat.
  - How:
    - **VPC Segmentation**: Separate subnets for public (load balancers), private (app servers), and data (databases). Use security groups/firewall rules to restrict traffic.
    - **WAF (Web Application Firewall)**: Filter HTTP traffic for SQL injection, XSS, rate limiting. Deploy at edge (CloudFront, Cloudflare) or application layer.
    - **DDoS Protection**: Use managed services (AWS Shield, Cloudflare, GCP Armor). Rate limiting, IP filtering, and traffic analysis to detect and mitigate attacks.
    - **Least-Privilege IAM**: Grant minimum permissions needed. Use roles (not users) for services. Regular access reviews. Principle of least privilege.
  - When: Design network segmentation from day one. Enable WAF for all public-facing APIs. Use DDoS protection for production. Review IAM permissions quarterly.
  - Trade-offs: Over-segmentation increases operational complexity. WAF can block legitimate traffic (false positives). Strict IAM can slow development velocity.

- Secrets management, audit logging/tamper evidence, data residency controls

  - Why: Secrets (API keys, passwords, certificates) must be protected. Audit logs enable compliance and incident investigation. Data residency ensures legal compliance.
  - How:
    - **Secrets Management**: Use managed services (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager). Never commit secrets to code. Rotate secrets automatically. Use environment variables or secret injection at runtime.
    - **Audit Logging**: Log all authentication, authorization, data access, and configuration changes. Use immutable storage (S3 with versioning, Cloud Logging). Tamper-evident: cryptographic signatures, write-once storage.
    - **Data Residency**: Store data in specific regions/countries per legal requirements (GDPR, data localization laws). Use regional databases, object storage, and compute. Encrypt data in transit and at rest.
  - When: Use secrets management for all credentials. Enable audit logging for all production systems. Implement data residency during initial design (retrofitting is expensive).
  - Trade-offs: Secrets management adds latency and operational overhead. Audit logs increase storage costs significantly. Data residency can increase latency for global users.

- Zero-trust architecture and service mesh security

  - Why: Traditional perimeter security (trust internal network) fails in cloud/microservices. Zero-trust: verify every request, regardless of network location.
  - How:
    - **Zero-Trust Principles**: Never trust, always verify. Verify identity, device, and context for every request. Least-privilege access. Assume breach (monitor and log everything).
    - **Service Mesh**: Infrastructure layer for service-to-service communication (Istio, Linkerd). Provides mTLS, traffic policies, observability. Sidecar proxy pattern.
    - **Implementation**: mTLS between all services. Identity-based access control (not IP-based). Continuous verification. Encrypted traffic everywhere.
  - When: Implement zero-trust for new microservices architectures. Use service mesh when you have 10+ services and need consistent security policies.
  - Trade-offs: Zero-trust adds latency (verification overhead). Service mesh increases resource usage (sidecar proxies). Operational complexity is high.

### Visuals & Interactive Demos

- Interactive: OAuth2 Flow Visualizer (authorization code flow, token exchange)
- Interactive: JWT Token Decoder (decode and inspect JWT claims)
- Interactive: IAM Policy Builder (visual policy creation with least-privilege recommendations)
- Interactive: Network Segmentation Designer (VPC/subnet/security group visualizer)
- Diagram: Zero-Trust Architecture (mTLS, identity verification, encrypted traffic)
- Interactive: Secrets Rotation Simulator (key rotation timeline, zero-downtime strategies)

## 8) Observability & Operations

- Metrics/logs/traces with sampling; OpenTelemetry and structured logging

  - Why: You can't fix what you can't see. Observability (metrics, logs, traces) is essential for debugging, performance optimization, and incident response.
  - How:
    - **Metrics**: Numerical measurements over time (CPU, memory, request rate, error rate). Use time-series databases (Prometheus, CloudWatch, Datadog). Key metrics: RED (Rate, Errors, Duration) and USE (Utilization, Saturation, Errors).
    - **Logs**: Event records with timestamps. Use structured logging (JSON) for machine parsing. Centralize with log aggregation (ELK, Splunk, Cloud Logging). Set retention policies (30-90 days for production).
    - **Traces**: Request flow across services. Distributed tracing (OpenTelemetry, Jaeger, Zipkin) shows latency breakdown per service. Use sampling (1-10% of requests) to reduce overhead.
    - **OpenTelemetry**: Vendor-neutral standard for observability. Unified SDK for metrics, logs, traces. Auto-instrumentation for common frameworks.
  - When: Instrument all services from day one. Use sampling for high-traffic services. Enable distributed tracing for microservices. Review and optimize observability costs quarterly.
  - Trade-offs: Full observability is expensive (storage, ingestion costs). Sampling can miss rare errors. Too many metrics create noise. Log retention costs grow linearly.

- Dashboards and alert design (multi-window burn rates), SLI/SLO tracking

  - Why: Dashboards provide visibility. Alerts notify on-call engineers of issues. Poor alerting causes alert fatigue and missed incidents.
  - How:
    - **Dashboard Design**: One dashboard per service. Show RED metrics (rate, errors, duration) prominently. Include SLO/SLI status. Use color coding (green/yellow/red). Keep dashboards simple (5-10 key metrics).
    - **Alert Design**: Alert on symptoms (user impact), not causes. Use multi-window burn rates: alert when error budget burns faster than time (e.g., 2x burn rate). Avoid alerting on every error (use thresholds). Alert on SLO violations.
    - **SLI/SLO Tracking**: SLI = measured metric (p99 latency, error rate). SLO = target (p99 < 200ms, error rate < 0.1%). Track error budget burn rate. Display on dashboards.
  - When: Create dashboards during initial service development. Set up alerts before production launch. Review alert effectiveness monthly (reduce false positives).
  - Trade-offs: Too many dashboards create confusion. Over-alerting causes fatigue. Under-alerting misses incidents. SLO tracking requires discipline.

- Incident response playbooks, on-call hygiene, runbooks, game days

  - Why: Incidents are inevitable. Prepared teams resolve incidents faster and learn more effectively.
  - How:
    - **Incident Response Playbooks**: Step-by-step procedures for common incidents (database down, API errors, DDoS). Include escalation paths, rollback procedures, communication templates.
    - **On-Call Hygiene**: Rotate on-call schedules fairly. Limit on-call to 1 week/month. Provide on-call compensation. Use escalation chains (L1 → L2 → L3). Post-incident: blameless postmortems.
    - **Runbooks**: Operational procedures for common tasks (deployments, scaling, troubleshooting). Keep runbooks updated. Test runbooks during game days.
    - **Game Days**: Scheduled chaos exercises. Simulate incidents (kill services, inject latency, data corruption). Practice incident response. Improve playbooks based on learnings.
  - When: Create playbooks for all critical services. Run game days quarterly. Update runbooks after every incident. Review on-call load monthly.
  - Trade-offs: Playbooks can become stale. Game days require time investment. On-call can cause burnout if not managed well.

- Cost optimization and resource rightsizing

  - Why: Cloud costs can spiral out of control. Rightsizing reduces waste without impacting performance.
  - How:
    - **Resource Rightsizing**: Analyze actual usage (CPU, memory, network). Downsize over-provisioned resources. Use autoscaling to match demand. Reserved instances for predictable workloads (save 30-70%).
    - **Cost Monitoring**: Tag all resources (team, service, environment). Set up cost alerts. Review cost reports monthly. Use cost allocation tags.
    - **Optimization Strategies**: Use spot instances for fault-tolerant workloads. Delete unused resources. Optimize data transfer (use CDN, compress data). Choose appropriate instance types.
  - When: Rightsize resources quarterly. Review costs monthly. Set up cost alerts immediately. Optimize continuously.
  - Trade-offs: Aggressive rightsizing can cause performance issues. Reserved instances lock you into commitments. Cost optimization requires ongoing effort.

### Visuals & Interactive Demos

- Interactive: Observability Stack Builder (choose metrics/logs/traces, see cost estimates)
- Interactive: Alert Tuning Simulator (adjust thresholds, see alert frequency)
- Interactive: SLO Dashboard (track error budget, burn rate visualization)
- Interactive: Cost Optimization Calculator (rightsizing recommendations, savings estimates)
- Diagram: Distributed Tracing Flow (request across services, latency breakdown)
- Interactive: Incident Response Playbook Builder (create and test playbooks)

## 9) Cloud Service Comparisons (managed-first bias)

- Data: Cloud SQL vs RDS vs Azure SQL; Spanner vs DynamoDB/Cosmos DB; Bigtable vs Cassandra; BigQuery vs Redshift/Synapse
- Messaging/streaming: Pub/Sub vs SNS/SQS/EventBridge vs Event Hub/Service Bus; Dataflow/Beam vs Kinesis vs Data Factory/Synapse pipelines
- Compute: Cloud Run vs App Runner vs Azure Container Apps; GKE vs EKS vs AKS; Functions vs Lambda vs Azure Functions
- Storage and cache: Cloud Storage vs S3 vs Blob; Memorystore (Redis) vs ElastiCache vs Azure Cache for Redis
- Networking: Cloud Load Balancing vs ALB/NLB vs Azure Front Door/App Gateway; Cloud CDN vs CloudFront vs Azure CDN

## 10) Real-World Case Studies

- **Netflix: The Microservices Pioneer**

  - **Challenge**: Transitioning from a monolithic DVD-by-mail service to a global streaming platform with zero downtime.
  - **Solution**: Adopted a "Cloud Native" microservices architecture on AWS.
  - **Key Innovations**:
    - **Chaos Engineering**: Intentionally breaking things in production (Chaos Monkey) to ensure resilience.
    - **Service Discovery**: Eureka for dynamic service registration.
    - **API Gateway**: Zuul for routing and cross-cutting concerns.
  - **Lesson**: Design for failure; if a component can fail, it will.

- **Uber: Geospatial Scaling at Speed**

  - **Challenge**: Matching millions of riders and drivers in real-time with sub-second latency.
  - **Solution**: Hexagonal hierarchical geospatial indexing (H3).
  - **Key Innovations**:
    - **H3 Indexing**: Dividing the world into hexagonal cells for efficient spatial lookups and smoothing.
    - **Ringpop**: A gossip-protocol-based library for building cooperative distributed systems.
    - **Schemaless**: A fault-tolerant, scalable datastore built on top of MySQL.
  - **Lesson**: Specialized data structures (like H3) are often required for domain-specific scaling challenges.

- **Discord: Scaling Real-time Messaging**

  - **Challenge**: Storing trillions of messages and handling massive concurrent voice/text spikes.
  - **Solution**: Evolution from MongoDB to Cassandra, and finally to ScyllaDB.
  - **Key Innovations**:
    - **Read-Path Optimization**: Using Rust to rewrite performance-critical services (moving away from Go's GC pauses).
    - **Data Locality**: Sharding messages by `channel_id` to ensure all messages for a conversation are co-located.
  - **Lesson**: Don't be afraid to switch technologies (Go -> Rust, Cassandra -> ScyllaDB) when you hit the limits of your current stack.

- **WhatsApp: The Efficiency King**

  - **Challenge**: Supporting 1 billion+ users with a tiny engineering team (approx. 50 people).
  - **Solution**: Extreme vertical scaling and the Erlang/OTP runtime.
  - **Key Innovations**:
    - **Erlang/OTP**: Leveraging lightweight processes for millions of concurrent connections per server.
    - **BEAM VM**: Tuning the virtual machine and FreeBSD kernel to handle 2 million+ connections per node.
  - **Lesson**: A small, focused team using the right high-concurrency primitives can outperform massive organizations.

- **Twitter (X): The Fan-out Problem**
  - **Challenge**: Delivering tweets to millions of followers instantly (The "Justin Bieber" problem).
  - **Solution**: A hybrid "Push" and "Pull" model for timeline generation.
  - **Key Innovations**:
    - **Fan-out Service**: Pushing tweets to the Redis-based timelines of active followers.
    - **Pull Model**: For celebrities with millions of followers, tweets are merged into the follower's timeline at read-time to avoid massive write-amplification.
    - **Snowflake**: Distributed unique ID generation at scale.
  - **Lesson**: One-size-fits-all architectures often fail at the extremes; hybrid models solve edge cases.

### Visuals & Interactive Demos

- Interactive: Timeline Fan-out Simulator (Push vs Pull vs Hybrid latency/storage)
- Interactive: Geospatial Indexing Visualizer (H3 hexagons vs Quadtrees)
- Interactive: Chaos Engineering Sandbox (Kill "services" and see how traffic reroutes)
- Interactive: Message Sharding Lab (Visualize data distribution across nodes)

## Suggested Interactive Elements

### Topic 1: Core Principles

- Capacity/QPS planner (DAU → QPS → bandwidth)
- Availability calculator (downtime math, nines calculator)
- CAP theorem interactive visualizer
- Vertical vs horizontal scaling comparison tool

### Topic 2: Networking & Edge

- DNS resolution flow visualizer (Client → Root → TLD → NS)
- CDN cache hit/miss simulator with latency comparison
- OSI 7-layer model interactive diagram
- Load balancer algorithm simulator (round-robin, least connections, IP hash)

### Topic 3: Data Architecture

- Database selector tool (access patterns → recommended DB)
- Caching strategy simulator (cache-aside vs write-through)
- Sharding calculator (visualize data distribution, hot shard detection)
- Consistent hashing visualizer (add/remove nodes, key redistribution)
- Replication topology builder (leader-follower, multi-leader, quorum)

### Topic 4: Compute & Runtime

- Deployment strategy simulator (rolling/blue-green/canary with traffic shifting)
- Kubernetes rollout visualizer (Deployment + HPA + readiness)
- Runtime decision tree (Function vs container serverless vs K8s vs VM)
- Autoscaling simulator (HPA, VPA, cluster autoscaling)

### Topic 5: APIs & Integration

- API Gateway Simulator (rate limiting, routing, auth failures)
- Protocol Trade-off Comparator (REST vs GraphQL vs gRPC latency/payload)
- Rate Limiter Sandbox (token bucket, sliding window, leaky bucket)
- Message Queue Simulator (pub/sub, queue patterns, DLQ handling)
- WebSocket vs SSE vs Long Polling comparison tool

### Topic 6: Reliability & Resilience

- SLO/Error Budget Calculator (input SLO, see downtime budget, burn rate)
- Circuit Breaker State Machine (open/half-open/closed transitions)
- DR Scenario Planner (RTO/RPO calculator, backup frequency)
- Raft Leader Election Visualizer (leader election, log replication)
- Chaos Engineering Simulator (inject failures, see system response)

### Topic 7: Security & Compliance

- OAuth2 Flow Visualizer (authorization code flow, token exchange)
- JWT Token Decoder (decode and inspect claims)
- IAM Policy Builder (visual policy creation, least-privilege recommendations)
- Network Segmentation Designer (VPC/subnet/security group visualizer)
- Zero-Trust Architecture Diagram (mTLS, identity verification)
- Secrets Rotation Simulator (key rotation timeline, zero-downtime)

### Topic 8: Observability & Operations

- Observability Stack Builder (choose metrics/logs/traces, cost estimates)
- Alert Tuning Simulator (adjust thresholds, see alert frequency)
- SLO Dashboard (error budget tracking, burn rate visualization)
- Cost Optimization Calculator (rightsizing recommendations, savings)
- Distributed Tracing Flow (request across services, latency breakdown)
- Incident Response Playbook Builder (create and test playbooks)

### Topic 9: Cloud Service Comparisons

- Managed Service Decision Tree (PaaS vs IaaS)
- Cloud Cost Estimator (Multi-cloud comparison)
- Service Comparison Matrix (AWS vs GCP vs Azure)

### Topic 10: Real-World Case Studies

- Timeline Fan-out Simulator (Push vs Pull vs Hybrid)
- Geospatial Indexing Visualizer (H3 hexagons)
- Chaos Engineering Sandbox (Resilience testing)
- Message Sharding Lab (Data distribution)

## Keep It Current

- Revisit cloud release notes quarterly (GCP/AWS/Azure) for managed service limits and pricing changes.
- Map each topic to at least one managed service to reinforce managed-first design.

## Assessment

- Short scenario prompts per topic with expected trade-offs
- Capstone: multi-tier service with SLOs, dashboards, CI/CD, and rollout strategy
