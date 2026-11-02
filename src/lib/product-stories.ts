import type { ProductStory } from "@/lib/product-story";

const STORIES: Record<string, ProductStory> = {
  "sql-copilot": {
    style: "technical",
    subject: "SQL",
    tagline: "Correct SQL first, fast SQL second.",
    intro:
      "A dialect-aware SQL assistant that writes, reviews, and tunes queries from the schema, errors, and plans you share. It checks grain, joins, and NULLs before it touches performance.",
    about: [
      "SQL Copilot turns plain-language requirements into SQL. It also explains and debugs existing queries, reviews risky data changes, and suggests performance and modeling improvements backed by evidence.",
      "It’s built for analysts, BI teams, data engineers, platform teams, and application developers. It suits people who work across more than one database engine and can’t afford syntax from the wrong dialect.",
      "Before writing anything, it settles what one output row represents, how each join can multiply rows, and how NULLs and time boundaries behave. It won’t hide duplicates with DISTINCT, and it won’t optimize a query that is still wrong.",
    ],
    workflow: {
      title: "A duplicate-contact cleanup needs a DELETE",
      problem:
        "A team wants to remove duplicate customer contacts in PostgreSQL and already has a DELETE written. Nobody has checked how many rows it touches or which row survives.",
      input: {
        label: "Proposed cleanup",
        language: "sql",
        content:
          "DELETE FROM customer_contacts c\nUSING customer_contacts d\nWHERE c.email = d.email\n  AND c.contact_id < d.contact_id;",
      },
      steps: [
        "Classifies the statement as high risk and states exactly which rows it can remove.",
        "Tests the duplicate key against case and whitespace in email, NULL emails, and whether the lowest contact_id is really the row to drop. Then it defines a winner and a deterministic tie-breaker.",
        "Writes a read-only preview that uses the same predicates, with affected-row and distinct-key counts.",
        "Puts the DELETE in a separate block marked to run only after the preview is validated. The block sits inside a transaction and comes with backup or restore guidance.",
      ],
      result:
        "You get a preview query, validation checks, and a guarded DELETE, with its assumptions stated. You run each step and judge the results yourself.",
    },
    expertise: [
      {
        title: "Dialect fidelity",
        description:
          "Native syntax for PostgreSQL, MySQL, SQL Server, Oracle, Snowflake, BigQuery, Redshift, Synapse, and Databricks SQL. It labels the dialect and never mixes two in one query.",
      },
      {
        title: "Plan-based tuning",
        description:
          "Reads execution plans and query profiles for pruning, spill, shuffles, and scans. It doesn’t promise gains from CTEs, indexes, clustering, or bigger compute without evidence.",
      },
      {
        title: "BI and semantic models",
        description:
          "Explicit grain, stable keys, and relationship-safe outputs for dashboards and marts. Keeps leading zeros, never guesses date formats or time zones, and adds reconciliation checks.",
      },
      {
        title: "Incremental and CDC logic",
        description:
          "Defines watermarks, late-arriving rows, delete semantics, idempotency, and replay. Makes sure a MERGE source can’t ambiguously match the same target row.",
      },
    ],
    working: {
      provide: [
        "The target platform and version",
        "Table definitions, keys, and a few sample rows",
        "The query, the error message, or a plain-language requirement",
        "Execution plans or query profiles for slow queries",
        "The intended scope of any data change",
      ],
      expect: [
        "One copyable query with only the assumptions that matter",
        "A short explanation of joins, filters, NULL handling, and output grain",
        "Validation and reconciliation queries",
        "Preview-first scripts for UPDATE, DELETE, MERGE, and schema changes",
      ],
      limits:
        "It doesn’t connect to databases or run SQL. Row counts, results, and plans come from what you paste, and it won’t claim a query was tested unless you share the output.",
    },
  },
  "production-data-engineering-copilot": {
    style: "technical",
    subject: "Data Engineering",
    tagline: "Fix production pipelines without losing or duplicating data.",
    intro:
      "A production-minded assistant for Spark, Databricks, Delta Lake, CDC, Structured Streaming, and Airflow. It works from your logs, plans, and code to one most likely cause and a safe next step.",
    about: [
      "Data Engineering Copilot helps you design, debug, recover, and tune data pipelines. It covers batch, CDC, streaming, and lakehouse systems, along with backfills, data quality, and observability.",
      "It’s written for data engineers and platform owners who run pipelines with SLAs, downstream consumers, and real recovery costs. Simple syntax or concept questions get a direct answer.",
      "For incidents, it names one dominant hypothesis with a confidence level and keeps facts, assumptions, and unknowns apart. It ranks risk in this order: data loss, then correctness, recovery, SLA, and cost. It doesn’t reach for bigger clusters by default.",
    ],
    workflow: {
      title: "Silver rows double after an Airflow retry",
      problem:
        "An hourly load task failed partway through and Airflow retried it. Downstream counts for that interval are now roughly twice what the source shows.",
      input: {
        label: "Load task",
        language: "python",
        content:
          "# load_orders: retries=2, schedule='@hourly'\ndf = (spark.read.table('bronze.orders_cdc')\n      .where(col('ingest_hour') == run_hour))\n\ndf.write.mode('append').saveAsTable('silver.orders')",
      },
      steps: [
        "Names the most likely cause, a non-idempotent append rerun on the same interval. It gives a confidence level and the facts behind it.",
        "Gives the decisive check: a duplicate-key count on silver.orders, matched against the retry and run history.",
        "Proposes reversible containment. Pause exact-count consumers and quarantine the affected interval before any repair.",
        "Replaces the append with a deduplicated MERGE ordered by source sequence. It adds a replay plan, validation queries, and a rollback trigger.",
      ],
      result:
        "An incident write-up covering cause, verification, containment, permanent fix, and risk if wrong. It includes the SQL and PySpark needed to carry it out.",
    },
    expertise: [
      {
        title: "Streaming and checkpoints",
        description:
          "Treats checkpoints as production state. Covers watermarks, stateful operators, sink semantics, and backlog, and checks compatibility before stateful changes roll out.",
      },
      {
        title: "Spark performance",
        description:
          "Diagnoses from the Spark UI and physical plans: task skew, shuffle, spill, file layout, and OOM. No arbitrary repartition counts, forced broadcasts, or OPTIMIZE by habit.",
      },
      {
        title: "Backfill and replay",
        description:
          "Scoped, idempotent backfills with a defined source version, a concurrent-writer policy, validation before publish, and reconciliation after completion.",
      },
      {
        title: "Data quality gates",
        description:
          "Freshness, duplicate, null-key, and reconciliation checks. Each one has a threshold, an owner, and a block, quarantine, or warn action.",
      },
    ],
    working: {
      provide: [
        "Error messages, driver or task logs, and Airflow task history",
        "Spark UI metrics or physical plans",
        "Pipeline code, SQL, MERGE logic, and configs",
        "Runtime, cloud, and version details",
        "A timeline of what changed before the failure",
      ],
      expect: [
        "A most likely cause with confidence and the decisive check",
        "Reversible containment, kept separate from the permanent fix",
        "Production-oriented SQL, PySpark, Databricks, or Airflow code",
        "Replay and backfill plans with validation and rollback",
      ],
      limits:
        "It can’t reach clusters, run jobs or queries, trigger Airflow, modify checkpoints, or run backfills. It works from the evidence you share and won’t call a fix verified without results.",
    },
  },
  "production-rag-genai-copilot": {
    style: "technical",
    subject: "RAG & GenAI",
    tagline: "Find the first layer where your RAG breaks.",
    intro:
      "A production assistant for retrieval-augmented generation. It traces failures across ingestion, retrieval, reranking, context, and citations, and it prefers measured, reversible fixes to prompt tweaks.",
    about: [
      "RAG & GenAI Copilot helps you design, debug, evaluate, and secure retrieval-augmented systems. It also covers observability, latency, and cost, plus choices between retrievers, rerankers, models, and vector stores.",
      "It’s meant for engineers who own a RAG system in production and need to explain why an answer was wrong, stale, unsupported, or shown to the wrong user.",
      "It checks whether the right evidence reached the model before it blames the model. It won’t propose prompt-only fixes for corpus, chunking, indexing, or authorization problems. It won’t add agents or new vector databases without a measured need.",
    ],
    workflow: {
      title: "Answers cite an archived refund policy",
      problem:
        "A support assistant keeps quoting the old refund window. The current policy is in the index, but answers still cite the archived version.",
      input: {
        label: "Retrieval trace",
        language: "yaml",
        content:
          "query: refund window for annual plans\nfilters: tenant_id=t_042\nretrieved:\n  - refund-policy-v3#12  score=0.81  status=archived\n  - refund-policy-v4#4   score=0.77  status=current\n  - billing-faq#2        score=0.64\ncontext_ids: [v3#12, v3#13, faq#2]\ncitation: v3#12",
      },
      steps: [
        "Walks the trace one boundary at a time: rewrite, retrieval, reranking, context, generation, citation.",
        "Finds the first failure. The current policy was retrieved but dropped during context construction, so this is not a generation problem.",
        "Recommends source precedence by status and effective version, with per-source caps, instead of a prompt instruction.",
        "Adds conflicting-source and stale-source cases to the eval set and checks citation correctness before rollout.",
      ],
      result:
        "A diagnosis with a confidence level, the smallest test that confirms it, and a reversible fix. It also includes eval cases that guard against regression.",
    },
    expertise: [
      {
        title: "Retrieval and chunking",
        description:
          "Lexical, vector, and hybrid retrieval, query rewrite, metadata filters, chunk boundaries, parent-child retrieval, and reranking, which can only reorder what was retrieved.",
      },
      {
        title: "Evaluation design",
        description:
          "Evals that start from the product decision. Retrieval, context, and generation are scored separately, by slice, including no-answer cases. LLM-as-judge is one signal, not ground truth.",
      },
      {
        title: "Security and authorization",
        description:
          "Prompt injection, RAG poisoning, cross-tenant leakage, and exfiltration. Authorization is enforced at the retrieval boundary. Post-generation filtering is not a substitute.",
      },
      {
        title: "Latency and cost",
        description:
          "Per-stage tracing of retrieval, reranking, context size, tokens, and model calls. It optimizes the dominant stage without cutting top-k or context blindly.",
      },
    ],
    working: {
      provide: [
        "Retrieval traces with chunk IDs, scores, and filters",
        "The prompt and the final context sent to the model",
        "Example queries with expected and actual answers",
        "Eval results, corpus details, and model or provider details",
        "A description of the architecture and ingestion pipeline",
      ],
      expect: [
        "The dominant failing layer, with a confidence level",
        "Ranked tests that confirm or rule out each hypothesis",
        "Eval plans with datasets, metrics, and regression gates",
        "Architecture recommendations with trade-offs and what would invalidate them",
      ],
      limits:
        "It can’t query your vector store, run retrieval or eval jobs, or change production systems. It reasons from the traces, configs, and results you share.",
    },
  },
  "cloud-platform-engineering-copilot": {
    style: "technical",
    subject: "Platform Engineering",
    tagline: "Platform changes with a known blast radius.",
    intro:
      "A cloud and platform engineering assistant for Kubernetes, Terraform, CI/CD, GitOps, IAM, observability, and SRE. It reviews the manifests, plans, and logs you share and proposes the smallest reversible change.",
    about: [
      "Platform Engineering Copilot helps you design, review, troubleshoot, and operate cloud platforms. It covers workload architecture, container platforms, infrastructure as code, delivery pipelines, identity and networking, reliability, and internal developer platforms.",
      "It’s aimed at platform, infrastructure, and SRE engineers, and at teams working out how much platform they actually need.",
      "It starts from the simplest architecture that meets the requirement. It won’t add Kubernetes, a service mesh, or multi-cloud without a concrete reason. Every high-risk change gets a defined scope, a dry run, validation signals, and a rollback trigger.",
    ],
    workflow: {
      title: "Pods restart in a loop during a database slowdown",
      problem:
        "Latency on a shared database rose and the API deployment started restarting. The restarts made the outage worse.",
      input: {
        label: "Probe config and pod events",
        language: "yaml",
        content:
          "livenessProbe:\n  httpGet: { path: /healthz/deps, port: 8080 }\n  periodSeconds: 5\n  failureThreshold: 2\n\nEvents:\n  Warning  Unhealthy  Liveness probe failed: HTTP probe failed with statuscode: 503\n  Normal   Killing    Container api failed liveness probe, will be restarted\n  Warning  BackOff    Back-off restarting failed container api",
      },
      steps: [
        "Finds the first failing boundary. The liveness probe calls a dependency check, so a slow database triggers restarts.",
        "Asks only for the evidence that separates likely causes, such as previous container logs and termination reasons, and has you save it before anything else restarts.",
        "Suggests reversible containment, such as pausing or rolling back the rollout, instead of deleting pods or scaling blindly.",
        "Splits the startup, liveness, and readiness probes and moves the dependency check to readiness. It then defines validation signals and a rollback trigger.",
      ],
      result:
        "An incident write-up that runs from most likely cause to decisive check, containment, permanent fix, and validation. It includes corrected probe YAML.",
    },
    expertise: [
      {
        title: "Terraform change safety",
        description:
          "Reviews plans by create, update, replace, and destroy. Keeps state protected and locked, pins providers and modules, and never uses -lock=false or force-unlock casually.",
      },
      {
        title: "Delivery and GitOps",
        description:
          "Build once and promote the same immutable artifact. Short-lived CI credentials, observable reconciliation, progressive delivery, and rollback that is actually operable.",
      },
      {
        title: "SLOs and observability",
        description:
          "SLIs drawn from user-visible behavior, error budgets, and alerts with owners and runbooks. OpenTelemetry-based traces, metrics, and logs without high-cardinality or secret-bearing labels.",
      },
      {
        title: "Internal developer platforms",
        description:
          "Golden paths, self-service templates, and scorecards built around real developer journeys, with clear ownership and an escape hatch. A portal alone is not a platform.",
      },
    ],
    working: {
      provide: [
        "Kubernetes manifests, events, and describe output",
        "Terraform code and plan output",
        "CI/CD or GitOps pipeline definitions",
        "Incident timeline, logs, and dashboards",
        "SLOs, constraints, and cloud provider details",
      ],
      expect: [
        "Most likely cause, decisive check, containment, fix, and validation",
        "Architecture recommendations with trade-offs and a validation plan",
        "Focused Terraform, Kubernetes YAML, Helm, or pipeline config",
        "Change plans with rollback triggers and post-change monitoring",
      ],
      limits:
        "It can’t inspect cloud accounts, run kubectl or Terraform, change IAM or networking, or deploy workloads. It reviews what you share and won’t invent resource IDs or test results.",
    },
  },
  "unix-copilot": {
    style: "technical",
    subject: "Unix shell",
    tagline: "Shell commands you can read before you run.",
    intro:
      "Describe a task or paste a failing command. Unix Copilot returns correct, portable shell commands and scripts, with a preview step for anything that changes files, permissions, or system state.",
    about: [
      "Unix Copilot is a command-line assistant for Linux, macOS, Bash, zsh, and POSIX shell. It turns plain-language tasks into copy-ready commands, explains and debugs pasted commands and scripts, and suggests safer or more portable alternatives.",
      "It’s built for developers, analysts, and data engineers who work in a terminal and need commands that behave correctly on their actual platform, not on a generic Unix that doesn’t exist.",
      "Every request is sorted into low, medium, or high risk. Deletes, overwrites, permission changes, sudo, and service changes get a preview first, a separately marked destructive step, and recovery notes where feasible.",
    ],
    workflow: {
      title: "A cleanup script that breaks on macOS",
      problem:
        "A log cleanup script works on a Linux server but fails on a Mac when the folder name has a space. It also ends with a recursive delete you’re not sure about.",
      input: {
        label: "rotate-logs.sh and the error it prints",
        language: "bash",
        content: `#!/bin/sh
dir=$1
for f in $(ls $dir/*.log); do
  sed -i 's/DEBUG/INFO/' $f
done
rm -rf $dir/archive/*

$ ./rotate-logs.sh "$HOME/App Logs"
ls: /Users/dev/App: No such file or directory
ls: Logs/*.log: No such file or directory`,
      },
      steps: [
        "Confirms the intended effect and the shell. The #!/bin/sh shebang means no Bash-only features, so the fix stays POSIX.",
        "Traces the failure to parsing ls and unquoted expansions, which split the path at the space. It also flags that BSD sed -i needs a suffix argument where GNU sed doesn’t.",
        "Treats rm -rf on an unchecked variable as high risk. It provides a find preview to inspect the targets first, with the delete shown separately to run only after the preview checks out.",
        "Rewrites the script with an argument check, quoted paths, find -exec, a temporary output file that is validated before it replaces the original, and a safe test to run.",
      ],
      result:
        "A short diagnosis, a corrected script with the macOS and Linux differences labeled, and a validation check you can run yourself.",
    },
    expertise: [
      {
        title: "Portable commands",
        description:
          "Labels Bash, zsh, GNU, BSD/macOS, and Linux-specific behavior, and gives separate command blocks when sed -i, date, stat, find, or xargs differ by platform.",
      },
      {
        title: "Script hardening",
        description:
          "Deliberate shebang choice, argument and dependency checks, mktemp with trap cleanup, explicit error checks instead of blind reliance on set -e, and meaningful exit codes.",
      },
      {
        title: "Safe file traversal",
        description:
          "Uses find -exec and NUL-delimited pipelines instead of parsing ls, so names with spaces, newlines, or leading dashes don’t break bulk renames, moves, or deletes.",
      },
      {
        title: "CSV and encodings",
        description:
          "Says when awk or cut can’t parse quoted CSV, recommends CSV-aware tools, and keeps leading zeros, null values, and raw input intact during BI preparation.",
      },
    ],
    working: {
      provide: [
        "Your OS and shell, for example macOS with zsh or Ubuntu with Bash",
        "The command or script, plus the exact error text",
        "Output from bash -n, set -x traces, or exit codes",
        "The paths, sample rows, or file names involved",
        "Whether sudo is available and which targets are in scope",
      ],
      expect: [
        "Copy-ready commands, with the flags, pipes, and quoting that matter explained",
        "Preview commands kept apart from destructive ones",
        "Validation checks such as row counts, checksums, or sample diffs",
        "Install steps for the right package manager: apt, dnf, pacman, Homebrew, or pipx",
      ],
      limits:
        "It doesn’t run commands, inspect your machine, or verify results. It works from the details and output you paste, so validation happens when you run the checks yourself.",
    },
  },
  "web-app-qa-release-copilot": {
    style: "technical",
    subject: "Web QA",
    tagline: "Release decisions backed by evidence, not optimism.",
    intro:
      "Share a PR, test output, or screenshots. It identifies what’s broken, how severe it is, what evidence supports it, and whether the release should ship.",
    about: [
      "Web App QA & Release Copilot is a release-readiness specialist for web applications. It covers functional QA, regression scope, bug triage, browser and responsive behavior, accessibility, performance, security, privacy, and deployment checks.",
      "It’s for QA engineers, developers, and release owners deciding whether a build can ship. It reviews the PR, screenshots, test output, traces, and logs you share, and it doesn’t fix code unless you ask.",
      "Every important finding is labeled as observed, automated evidence, source-supported, inferred, or needs verification. Severity runs from P0 to P3, and the final call is Ready, Ready with known limitations, or Not ready, with the reasons stated.",
    ],
    workflow: {
      title: "Finding release blockers in a session change",
      problem:
        "A PR changes how login sessions are stored. CI shows one WebKit failure, and the team wants to ship this build.",
      input: {
        label: "Playwright CI output",
        language: "text",
        content: `Running 24 tests using 3 workers
  ✘ [webkit] › auth/login.spec.ts:18 › user stays signed in after reload
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('button', { name: 'Account' })
    Timeout 5000ms exceeded.
  ✓ [chromium] › auth/login.spec.ts:18 › user stays signed in after reload
  ✓ [firefox] › auth/login.spec.ts:18 › user stays signed in after reload
  1 failed, 23 passed`,
      },
      steps: [
        "Classifies the evidence. The WebKit failure is automated evidence. Any cookie or storage explanation stays inferred until confirmed.",
        "Triages the bug with expected and observed behavior, the smallest reproduction, P1 severity for an auth failure in a supported browser, auth/session as the likely layer, and the next decisive check.",
        "Scopes regression: login, logout, session expiry, and protected routes must be retested. Adjacent flows get targeted regression. Unrelated areas are marked out of scope.",
        "Issues a verdict tied to the evidence, listing blockers, evidence still missing, rollback readiness, and what to monitor after deploy.",
      ],
      result:
        "A release report with a Not ready or Ready verdict, a reproducible bug report, and a focused regression and smoke-test plan.",
    },
    expertise: [
      {
        title: "Targeted regression",
        description:
          "Sorts each change into must retest, targeted regression, smoke only, or out of scope, instead of defaulting to a full regression pass.",
      },
      {
        title: "Playwright test design",
        description:
          "Tests based on what users see, with role, label, and test ID locators, auto-retrying assertions instead of sleeps, failure traces, and extra browser projects only where required.",
      },
      {
        title: "Accessibility review",
        description:
          "Covers semantics, keyboard and focus, forms, live announcements, contrast, zoom, and motion. Automated scan results stay separate from the screen-reader checks that still need a person.",
      },
      {
        title: "Performance evidence",
        description:
          "Reads Lighthouse and Core Web Vitals data, keeps lab and field evidence apart, and traces poor LCP, INP, or CLS to likely causes.",
      },
    ],
    working: {
      provide: [
        "The PR diff or release notes describing what changed",
        "Playwright, CI, or Lighthouse output and traces",
        "Screenshots, console errors, or failing network requests",
        "Supported browsers and devices, plus the release target",
        "Deployment, rollback, and feature flag details",
      ],
      expect: [
        "Bug reports with reproduction, severity, likely layer, and a regression test",
        "Regression and smoke-test plans scoped to the change",
        "Playwright test code or review notes",
        "Security and privacy findings marked as block release, must verify, or follow-up",
      ],
      limits:
        "It doesn’t open browsers, run Playwright or Lighthouse, scan production, or deploy. Conclusions depend on the evidence you supply. Gaps are reported as needs verification, not assumed to pass.",
    },
  },
  "llm-agent-builder-copilot": {
    style: "technical",
    subject: "LLM agents",
    tagline: "The simplest AI system that reliably does the job.",
    intro:
      "Describe the AI feature you want to build. It picks the least complex architecture that works, then defines the tools, state, guardrails, approvals, and evals.",
    about: [
      "LLM & Agent Builder Copilot is a systems-design assistant for LLM applications, tool-using workflows, MCP integrations, and agents. It produces architectures, tool contracts, state designs, and eval plans, and writes implementation code when asked.",
      "It’s for engineers and product teams building AI features that have to hold up in production, with bounded permissions, recoverable state, and traceable execution.",
      "It starts by asking whether you need an agent at all. Each use case is placed on a scale from plain deterministic code to multi-agent, and complexity increases only when it adds measurable value.",
    ],
    workflow: {
      title: "Designing a support agent with refund approvals",
      problem:
        "You have a draft spec for a support assistant that answers order questions and issues refunds. It has vague tools, unlimited memory, and no stopping rule.",
      input: {
        label: "Draft agent spec",
        language: "yaml",
        content: `agent: support-assistant
goal: answer order questions and handle refunds
tools:
  - name: do_order_stuff
    input: { options: object }
  - name: refund
    input: { order_id: string, amount: number }
memory: store every conversation in a vector DB
autonomy: keep going until the customer is happy`,
      },
      steps: [
        "Classifies the required autonomy. Known steps point to an LLM with bounded tools or an explicit workflow, not a free-running or multi-agent loop.",
        "Replaces do_order_stuff with a read-only get_order_status tool. It defines refund as a consequential tool with authorization at the tool boundary, an idempotency key, retryable versus permanent errors, and human approval before the side effect.",
        "Swaps the vector-DB memory for session history and structured workflow state. Order status is read from the source system, and a max-turn budget plus clear stopping conditions replace ‘until happy’.",
        "Defines evals for tool selection, argument accuracy, approval compliance, and zero unauthorized refunds, along with the trace fields to capture.",
      ],
      result:
        "A recommendation with the reasoning behind it, a flow diagram, tool definitions, a state plan, approval points, an eval plan, and implementation steps.",
    },
    expertise: [
      {
        title: "Orchestration patterns",
        description:
          "Chooses among prompt chains, routers, parallel workers, orchestrator-worker, evaluator-optimizer, manager with specialists, and handoffs. Every loop gets a budget and a hard stop.",
      },
      {
        title: "MCP server design",
        description:
          "Decides what belongs in a tool, a resource, or a prompt, then covers auth, schemas, long-running tasks, errors, and which spec version to verify against.",
      },
      {
        title: "Agent security",
        description:
          "Treats retrieved content and tool output as untrusted, and reviews prompt injection, data exfiltration, confused-deputy behavior, cross-tenant leakage, and excessive permissions.",
      },
      {
        title: "Agent evaluation",
        description:
          "Ties each eval to a product decision and measures output, tool use, trajectory, and outcome. Deterministic graders come first, then calibrated LLM judges.",
      },
    ],
    working: {
      provide: [
        "The user goal and what success looks like",
        "Existing code, plus SDK and framework versions",
        "The APIs and data sources the system can reach",
        "Which actions are consequential, such as sending, paying, deleting, or deploying",
        "Security, tenant, latency, or cost constraints",
      ],
      expect: [
        "A recommended system shape, with the reason it’s the simplest one that works",
        "Tool definitions with schemas, side effects, retries, and approval rules",
        "State and memory plans with clear ownership, retention, and reset behavior",
        "Regression gates and a list of fields to trace for observability",
      ],
      limits:
        "It designs systems but doesn’t call external tools, deploy agents, or change external systems. Confirm version-sensitive SDK and MCP details against current official docs before you ship.",
    },
  },
  "software-data-ai-copilot": {
    style: "technical",
    subject: "Code & data",
    tagline: "Small, correct changes that respect your codebase.",
    intro:
      "Share code, errors, or a change request. It follows your repository’s conventions to explain, debug, review, or implement changes, and gives you a plan to validate them.",
    about: [
      "Software & AI Copilot is an engineering assistant that starts from your repository. It explains, debugs, implements, reviews, refactors, tests, and migrates code across applications, data pipelines, ML, and LLM integrations.",
      "It’s for engineers working in an existing codebase who want changes that fit. It reads instruction files such as AGENTS.md or CLAUDE.md, the nearby code, and the tests, and it follows the patterns it finds.",
      "Its rule is the smallest correct change. Public APIs, schemas, and data contracts stay the same unless you ask to change them. It never adds dependencies, migrations, or architecture changes without telling you.",
    ],
    workflow: {
      title: "Reviewing a fix for double-counted revenue",
      problem:
        "Revenue doubled on days with split payments after a payments join was added. A teammate’s PR changes the sum to SUM(DISTINCT), and you need to decide whether to merge it.",
      input: {
        label: "models/daily_revenue.sql",
        language: "sql",
        content: `SELECT o.order_date,
       SUM(o.amount) AS revenue
FROM orders o
JOIN payments p ON p.order_id = o.order_id
WHERE p.status = 'settled'
GROUP BY o.order_date;

-- PR change:
-- SUM(DISTINCT o.amount) AS revenue`,
      },
      steps: [
        "Reads the model, its tests, and the repository instructions before judging the PR, and says which files it hasn’t seen.",
        "Traces the grain. Orders has one row per order but payments can have several, so the join repeats o.amount once for each payment.",
        "Marks SUM(DISTINCT) as blocking because it would also merge different orders that happen to share an amount. It proposes an EXISTS filter on settled payments that keeps the output columns unchanged.",
        "Adds a regression test with a split-payment order and two orders of equal amount, plus a reconciliation check against order totals, and lists the commands to run.",
      ],
      result:
        "A review verdict naming the blocking issue, a minimal patch that keeps the model’s output contract, and a regression test. Tests are listed as steps to run, never reported as passed.",
    },
    expertise: [
      {
        title: "Code review",
        description:
          "Ranks correctness, security, contract breakage, concurrency, and tests ahead of style. Each issue comes with its location, consequence, and a concrete fix.",
      },
      {
        title: "Data pipeline code",
        description:
          "Checks SQL, Spark, and ETL changes for grain, join cardinality, NULL handling, late data, retries that can safely run twice, and safe replay or backfill.",
      },
      {
        title: "Safe migrations",
        description:
          "Plans additive schema changes, dual-format reads, feature flags, and staged rollouts, and decides between rollback and a forward fix before a risky deploy.",
      },
      {
        title: "Notebook to production",
        description:
          "Moves notebook logic into tested modules with configuration, entry points, input and output validation, and logging. Removes embedded secrets, hardcoded paths, and cell-order dependencies.",
      },
    ],
    working: {
      provide: [
        "The relevant files, plus the README, manifests, and instruction files",
        "Error messages, stack traces, and logs",
        "Existing tests and the commands used to run them",
        "Framework, runtime, and dependency versions",
        "What must not change, such as APIs, schemas, or output formats",
      ],
      expect: [
        "A short plan naming the affected files and contracts",
        "A focused patch or concrete edits",
        "Tests matched to the change, including a regression test for each fixed bug",
        "Review verdicts that separate blocking issues, important issues, and suggestions",
      ],
      limits:
        "On its own it can’t inspect your repository, run tests, or edit files. It works from what you share or what your environment gives it access to, and it never reports tests as passing without real output.",
    },
  },
  "power-bi-report-builder-copilot": {
    style: "technical",
    subject: "Power BI",
    tagline: "Find where the report goes wrong, then fix it.",
    intro:
      "Power BI Report Copilot debugs paginated reports, DAX, Power Query, and Fabric designs from the files, code, screenshots, and errors you share. It returns copy-ready fixes with steps to validate them.",
    about: [
      "It acts as a hands-on Power BI specialist for report developers, BI engineers, and analysts. It covers Report Builder and RDL, semantic models, DAX and Power Query, and Microsoft Fabric reporting architecture.",
      "Bring it a specific broken thing: a parameter that won’t cascade, a total that doesn’t add up, a PDF with blank pages, a slow model. It defaults to Report Builder work and shifts to modeling or architecture when needed.",
      "It checks correctness before speed. It finds the earliest layer where results go wrong, such as grain, filter context, or parameter mapping, instead of rewriting the report. Data visibility and security come ahead of layout and performance.",
    ],
    workflow: {
      title: "A margin percentage that breaks at the total",
      problem:
        "A gross margin % measure looks right on each product row, but the total row shows a number far above 100%. Finance has flagged the report.",
      input: {
        label: "Current DAX measure",
        language: "dax",
        content: `Gross Margin % =
SUMX (
    Sales,
    DIVIDE ( Sales[Revenue] - Sales[Cost], Sales[Revenue] )
)`,
      },
      steps: [
        "Confirms the grain of the Sales table and the filter context at row and total level before touching the code.",
        "Names the cause: the iterator adds up per-row ratios, so the total sums percentages instead of dividing aggregates.",
        "Returns the working DAX first, built on small base measures for revenue and cost, then explains only the reasoning needed to defend it.",
        "Ends with a short validation checklist, such as reconciling the total against source sums and testing it under slicers.",
      ],
      result:
        "A corrected, copy-ready measure with a brief explanation and a checklist to confirm the numbers before the report goes back out.",
    },
    expertise: [
      {
        title: "Paginated reports and RDL",
        description:
          "Parameters and cascading filters, dataset mappings, tablix grouping and scope, VB expressions, page breaks, and PDF, Excel, and CSV export behavior.",
      },
      {
        title: "Semantic models and DAX",
        description:
          "Star schemas, relationships and cardinality, date tables, measures versus calculated columns, filter context, and foldable Power Query that keeps identifiers and types intact.",
      },
      {
        title: "Fabric and performance",
        description:
          "Weighs Import, DirectQuery, Direct Lake, and composite models against your requirements. Locates the slow layer with evidence before suggesting any optimization.",
      },
      {
        title: "Reporting security",
        description:
          "Sets the real authorization boundary with source security or RLS, minimizes sensitive fields, and secures export routes. Hiding a visual is never treated as security.",
      },
    ],
    working: {
      provide: [
        "RDL files or screenshots of the report design",
        "DAX, M, or SQL code",
        "Exact error messages",
        "Model details such as tables, grain, and relationships",
        "The target output, such as PDF or Excel",
      ],
      expect: [
        "Exact Report Builder steps and settings",
        "Copy-ready SQL, DAX, M, or VB expressions",
        "Architecture recommendations with trade-offs",
        "Validation checklists",
      ],
      limits:
        "It doesn’t connect to Power BI, run reports, refresh models, or publish anything. It works from what you paste or upload, so share redacted examples and never credentials.",
    },
  },
  "technical-interview-copilot": {
    style: "planning",
    subject: "Interview prep",
    tagline: "Practice for the interview you actually have.",
    intro:
      "Technical Interview Copilot reads your job description and resume, works out what you’re likely to be tested on, then runs realistic practice and gives honest feedback.",
    about: [
      "It’s an interview preparation partner for software, data, cloud, AI/ML, platform, mobile, QA, security, and architecture roles. It suits candidates at any level, from early career to staff, who have a specific role in front of them.",
      "Use it to map a new role, study a topic at the right depth, cram before a call, or rehearse full rounds. It infers role family and seniority from your materials rather than asking you to pick a mode.",
      "Unlike a general chat, it treats your resume as the limit of what you can claim. It won’t invent projects, metrics, or leadership. In mocks it asks one question at a time and holds back the ideal answer until you’ve tried.",
    ],
    workflow: {
      title: "Preparing for a senior data engineering loop",
      problem:
        "You have SQL, system design, and behavioral rounds coming up for a senior data engineer role. You have about a week and aren’t sure where to focus.",
      input: {
        label: "Job description excerpt",
        language: "text",
        content: `Senior Data Engineer, Payments Platform
- Build batch and streaming pipelines with Spark and Kafka
- Own data quality, backfills, and late-arriving data
- Strong SQL and dimensional modeling
- Design reliable pipelines on a major cloud platform
Loop: recruiter screen, SQL, system design, behavioral`,
      },
      steps: [
        "Maps the role: likely focus areas, top-priority topics, the resume claims an interviewer will probe, and a day-by-day order for the week.",
        "Plays the interviewer one question at a time. SQL covers grain, joins, NULLs, and date boundaries. Pipeline design follows up on late data, replay, and partial failures.",
        "Pressure-tests your real projects with questions on ownership, trade-offs, and what failed, without strengthening any claim beyond your resume.",
        "After each section, gives what worked, what was weak, what an interviewer may infer, a stronger answer, and a readiness rating based on the mock.",
      ],
      result:
        "A prioritized prep plan sized to your time, mock feedback with topics to review, and spoken answers in short and standard lengths built from your own experience.",
    },
    expertise: [
      {
        title: "Role and level mapping",
        description:
          "Routes a job description to likely interview domains and adjusts depth by seniority, from fundamentals and debugging to system boundaries and cross-team trade-offs.",
      },
      {
        title: "Coding and SQL rounds",
        description:
          "Simulates clarify, approach, code, test, and complexity. Checks correctness, edge cases, and communication, and won’t solve the problem before you attempt it.",
      },
      {
        title: "Role-specific system design",
        description:
          "Adapts design problems to the role: pipelines and replay for data, retrieval and evaluation for AI, state and accessibility for frontend, failure recovery for platform.",
      },
      {
        title: "Behavioral answers",
        description:
          "Shapes natural spoken answers from real events, checking context, ownership, reasoning, result, and learning. Offers honest ways to address gaps you haven’t covered directly.",
      },
    ],
    working: {
      provide: [
        "The job description or recruiter message",
        "Your resume or a project summary",
        "Interview stage, format, and any assessment instructions",
        "How much time you have before the interview",
        "Your practice answers or code",
      ],
      expect: [
        "A prioritized interview map and prep order",
        "Mock interviews with realistic follow-up questions",
        "Scored feedback with stronger example answers",
        "Time-boxed plans and final rapid-review notes",
      ],
      limits:
        "It works from what you share. Company-specific interview formats it can’t confirm are marked as assumptions, and it won’t write experience you don’t have.",
    },
  },
  "product-app-architect": {
    style: "planning",
    subject: "Product planning",
    tagline: "From rough idea to a buildable plan.",
    intro:
      "Product & App Architect turns ideas, existing apps, and feature requests into focused product decisions, UX flows, architecture choices, and phased build plans. It recommends what to build first and what to leave out.",
    about: [
      "It’s for anyone deciding what to build, how it should work, or how to structure it. It reads what you share and works out which kind of help you need, from discovery to an engineering handoff, without a long interview first.",
      "It reasons product first. Problem, target user, alternatives, core value, and validation risk come before UX and architecture. It challenges scope by default, so accounts, AI, real-time systems, or microservices appear only when a real requirement calls for them.",
      "It makes a recommendation instead of handing back an unranked list. It separates evidence from assumptions, asks at most three blocking questions, and states what would change its advice.",
    ],
    workflow: {
      title: "Turning an app idea into an MVP plan",
      problem:
        "A two-person team has an idea for a shared chores app and a long feature wish list. They need to know what to build first and how to structure it.",
      input: {
        label: "Product brief",
        language: "text",
        content:
          "Idea: an app for roommates to split chores fairly.\nWish list: accounts, reminders, chat, leaderboard, AI chore suggestions.\nUsers so far: us and a few friends who share flats.\nConstraints: two developers, web first, small budget.\nOpen question: do we need a mobile app at launch?",
      },
      steps: [
        "Frames the problem, target user, and current workaround, and marks each assumption as known, likely, unknown, or high-risk.",
        "Defines the smallest complete loop, then sorts the wish list into must-have, later, and explicitly not building.",
        "Proposes a cheap test for the riskiest assumption, with success and failure signals and the decision each one leads to.",
        "Recommends the simplest architecture that fits, then lays out phases from setup to a first usable slice, hardening, and launch, each with acceptance criteria.",
      ],
      result:
        "A concise product plan: recommended direction, MVP scope with a not-now list, validation plan, architecture with trade-offs, and a phased build plan ready to hand to an engineer or coding agent.",
    },
    expertise: [
      {
        title: "Existing product audits",
        description:
          "Reviews what already exists, keeps strengths worth preserving, finds friction and missing states, and recommends evolution over rewrites. Observations stay separate from inference.",
      },
      {
        title: "Specs and feature deltas",
        description:
          "Writes lightweight briefs, full PRDs when alignment needs it, and feature delta specs for existing products, with observable acceptance criteria instead of vague goals like ‘fast’.",
      },
      {
        title: "UX flows and states",
        description:
          "Maps entry point, main action, feedback, and recovery for each key task. Covers empty, loading, error, permission, and offline states, with accessibility designed in from the start.",
      },
      {
        title: "Launch readiness review",
        description:
          "Checks security, privacy, accessibility, data, reliability, and platform requirements, then gives a ready, ready with known limitations, or not ready verdict.",
      },
    ],
    working: {
      provide: [
        "A product idea, problem statement, or feature request",
        "Screenshots, wireframes, or a link to the current app",
        "An existing repository or constraints such as stack, team size, and budget",
        "Competitor or reference products you’re weighing",
        "Decisions already made that should stay fixed",
      ],
      expect: [
        "A ranked product recommendation with MVP scope and a not-now list",
        "PRDs, feature specs, and user stories with acceptance criteria",
        "Architecture decisions with trade-offs and what would invalidate them",
        "Phased build plans and engineering handoff briefs",
      ],
      limits:
        "It focuses on decisions and plans, not detailed implementation, and it can’t deploy or run anything. Checking current competitors or platform rules depends on web access in your chat.",
    },
  },
  "job-outreach-copilot": {
    style: "planning",
    subject: "Job outreach",
    tagline: "Honest outreach for the roles worth pursuing.",
    intro:
      "Job Outreach Copilot checks a role against your actual experience, recommends one next step, and drafts a message you can send. It never adds experience, numbers, or status you haven’t given it.",
    about: [
      "It’s for job seekers who want to spend effort on the right roles and send messages they can stand behind. It covers the path from a first job post to recruiter replies, interviews, and closing notes.",
      "Its defining rule is accuracy. Candidate facts, job facts, and conversation facts stay separate. Exposure never becomes ownership, a personal project never becomes employer experience, and compensation or work authorization is stated only as you supplied it.",
      "In an ongoing recruiter thread, it keeps track of what’s already been asked and answered. Replies answer the recruiter’s question first and don’t repeat settled details or restart the analysis.",
    ],
    workflow: {
      title: "Evaluating a role and replying to a recruiter",
      problem:
        "A recruiter has messaged about a contract role. The candidate wants to know if it’s worth pursuing and how to reply without overstating their experience.",
      input: {
        label: "Recruiter message and candidate notes",
        language: "text",
        content:
          "Recruiter: I came across your profile for a Senior Data Engineer contract role.\nMust have: 5+ years of Python, Airflow, and Snowflake in production.\nNice to have: Kafka, dbt. Hybrid, 3 days on-site. W2 only.\nAre you open to it, and what’s your expected rate?\n\nMy notes: Python and Airflow at my current job. Snowflake only in a personal project. No rate decided yet.",
      },
      steps: [
        "Separates what the job requires, what the profile supports, and what the recruiter actually asked.",
        "Maps each must-have as supported, adjacent, unknown, or conflicting. Snowflake from a personal project stays adjacent, not production experience.",
        "Classifies fit as Strong, Partial, or Weak and picks one action: proceed, qualify first, or skip, with the decisive reason.",
        "Drafts a reply in the same thread that answers the recruiter’s question first, describes Snowflake accurately, and leaves the rate open instead of inventing a number.",
      ],
      result:
        "A short fit summary with the main gap and next action, plus a copy-ready recruiter reply. You review it and send it yourself.",
    },
    expertise: [
      {
        title: "Channel-aware drafting",
        description:
          "Matches the message to the route: in-thread reply, LinkedIn connection note or DM, email, or InMail when requested. Uses only contact details you or the source provided.",
      },
      {
        title: "Referrals and follow-ups",
        description:
          "Writes referral asks that are easy to decline, follow-ups shorter than the first message, and post-application notes that add signal instead of just saying you applied.",
      },
      {
        title: "Interview-stage messages",
        description:
          "Handles scheduling replies, confirmations, thank-you notes, status checks, and closing replies. Each stays short, and it never invents interviewers, formats, or discussion topics.",
      },
      {
        title: "Scam and privacy checks",
        description:
          "Flags concrete warning signs such as fee requests or early demands for banking or identity data, suggests how to verify, and keeps unneeded personal details out of messages.",
      },
    ],
    working: {
      provide: [
        "Your resume or profile, plus relevant experience it leaves out",
        "The job post, recruiter message, or a screenshot of the thread",
        "Your constraints: location, work arrangement, employment type, compensation, and work authorization",
        "Earlier messages in the conversation, so settled details aren’t repeated",
      ],
      expect: [
        "A Strong, Partial, or Weak fit call with the decisive evidence",
        "One recommended next action and the best channel",
        "Copy-ready messages for the current stage",
        "Short notes on real risks, such as a sponsorship conflict",
      ],
      limits:
        "It drafts but never sends messages, submits applications, or connects to LinkedIn or email accounts. It doesn’t give legal advice on contracts or immigration, and it won’t claim experience your profile doesn’t show.",
    },
  },
  "research-technical-writing-copilot": {
    style: "planning",
    subject: "Research & writing",
    tagline: "Research you can trace, writing ready to publish.",
    intro:
      "Research & Writing Copilot turns sources, notes, and drafts into technical articles, documentation, and reports whose key claims trace back to evidence. It shows uncertainty instead of hiding it, and never invents citations.",
    about: [
      "It’s for people who write technical and knowledge-heavy content that needs to hold up to scrutiny. It works out the task at hand, whether deep research, a fact-check, a comparison, an explainer, or a full article.",
      "Fluent prose isn’t the goal. Every important claim is labeled as verified fact, source-reported claim, inference, opinion, unknown, or stale. Conflicting sources are compared by date, version, and scope rather than averaged into one number.",
      "Research and presentation stay separate. One researched core can become a Medium story, a LinkedIn article or post, or a documentation page, while the facts underneath stay the same.",
    ],
    workflow: {
      title: "Turning several sources into a grounded article",
      problem:
        "An engineer has notes from product docs, a vendor benchmark, and a forum thread, and wants a practitioner article comparing two caching approaches. The sources don’t fully agree.",
      input: {
        label: "Source notes",
        language: "text",
        content:
          "Topic: write-through vs write-behind caching for a read-heavy API\nAudience: backend engineers, practitioner level\nSource A: official docs for the cache product (version 7)\nSource B: vendor blog benchmark claiming 3x faster writes with write-behind\nSource C: forum thread reporting data loss on node failure\nTarget: company blog, then a LinkedIn post",
      },
      steps: [
        "Defines the questions the article must answer and the claims that need verification before any drafting starts.",
        "Builds a claim ledger tying each claim to its source, source type, version, and confidence. The vendor benchmark stays a source-reported claim, not a verified fact.",
        "Drafts for the stated audience: problem, mechanism, example, trade-offs and failure modes, then a decision rule, with citations next to the claims they support.",
        "Runs an editing pass for accuracy, structure, and clarity, then adapts the core article into a LinkedIn post without changing the facts.",
      ],
      result:
        "A publish-ready technical article with inline sources and visible caveats, plus a LinkedIn version built from the same researched core.",
    },
    expertise: [
      {
        title: "Fact-checking drafts",
        description:
          "Marks claims in an existing draft as supported, weak, stale, conflicting, or unsupported, then patches only what needs fixing while keeping the author’s voice and argument.",
      },
      {
        title: "Decision reports",
        description:
          "Compares products or technologies on criteria that matter to your decision, normalized by version and tier. Recommends only when evidence supports it, and says what would change it.",
      },
      {
        title: "Documentation and how-tos",
        description:
          "Picks the right document type, from concept and tutorial to reference, troubleshooting, or migration guide, and writes procedures with prerequisites, steps, expected results, and validation.",
      },
      {
        title: "Reader-first explainers",
        description:
          "Explains complex technical subjects at the right depth for the reader, defines terms before using them, and recommends only visuals that teach, such as diagrams or comparison tables.",
      },
    ],
    working: {
      provide: [
        "The topic, the question to answer, and the intended reader",
        "Your source notes, links, files, or an existing draft",
        "The target format or publication, such as a company blog, Medium, or LinkedIn",
        "Any real experience or results you want included, since it won’t invent them",
      ],
      expect: [
        "Research briefings with fact, inference, and uncertainty labeled",
        "Technical articles, explainers, and documentation pages",
        "Comparison and decision reports",
        "Fact-checked revisions and platform-specific versions of one article",
      ],
      limits:
        "It doesn’t publish or submit anything. Checking current sources depends on web or file access in your chat. Without it, the work rests on what you provide, and unverifiable claims are marked as such.",
    },
  },
  "seo-website-growth-copilot": {
    style: "planning",
    subject: "SEO & growth",
    tagline: "Find where organic search actually breaks down.",
    intro:
      "SEO & Growth Copilot diagnoses technical SEO, indexing, and organic traffic problems from the site evidence you share. It finds the first failing layer, labels what’s confirmed versus inferred, and never promises rankings.",
    about: [
      "It’s a technical SEO and organic-growth specialist for people responsible for a website’s search performance. It covers crawling and indexing, Search Console analysis, site structure, search appearance, content strategy, and growth measurement.",
      "It doesn’t treat every traffic drop as a content problem. It walks the chain from crawl, render, and index through ranking, impressions, clicks, and conversion, and starts with the first layer that fails.",
      "Findings are labeled as observed, Search Console evidence, official guidance, inferred, needs verification, or experiment. It doesn’t invent keyword volume, claim causality from correlation, or recommend unsupported AI-search tricks.",
    ],
    workflow: {
      title: "Investigating declining organic search traffic",
      problem:
        "A site’s organic clicks dropped after a template redesign. The team has Search Console exports and a short page inventory, but no clear cause.",
      input: {
        label: "Search Console audit notes",
        language: "text",
        content:
          "Last 3 months vs previous 3 months (web, all countries)\nClicks: down 34%. Impressions: down 6%. Avg position: roughly stable.\nBiggest losses: /guides/* pages, mostly on mobile.\nRedesign shipped mid-period: new guide template, new title format.\nSitemap: about 900 URLs, including some redirected guide URLs.",
      },
      steps: [
        "Establishes the comparison context: date ranges, search type, filters, and whether totals come from the chart or from table rows.",
        "Reads the pattern. Clicks falling much faster than impressions, with position stable, points first to the click layer, such as titles, snippets, or search features, rather than indexing.",
        "Checks the redesigned template for technical side effects: canonicals, rendered content, redirected URLs in the sitemap, and mobile rendering.",
        "Separates what the data shows from what it can’t prove, and names the checks or controlled tests that would confirm the cause.",
      ],
      result:
        "A Search Console analysis covering what changed, the likely failing layer, the strongest evidence, what can’t be concluded yet, and a prioritized list of next checks and fixes.",
    },
    expertise: [
      {
        title: "Indexing diagnosis",
        description:
          "Works through canonicals, robots and noindex, rendering, internal discovery, and sitemap status to explain why a page isn’t indexed, instead of repeatedly requesting indexing.",
      },
      {
        title: "Structured data and metadata",
        description:
          "Designs schema markup that matches visible content and current search-feature support, and writes page-specific titles, descriptions, and Open Graph tags without promising how results will display.",
      },
      {
        title: "Content and internal linking",
        description:
          "Finds content gaps from real queries and site inventory, flags cannibalization, and plans hub, contextual, and breadcrumb links that help users and crawlers, not keyword-stuffed footers.",
      },
      {
        title: "Safer programmatic SEO",
        description:
          "Designs template page families with quality gates, index rules, canonical logic, and stop criteria, so only pages with distinct, useful data become indexable.",
      },
    ],
    working: {
      provide: [
        "Search Console exports or screenshots, with date ranges and filters",
        "URLs, rendered HTML, or the site repository",
        "Crawl exports, sitemap, and robots.txt",
        "Known releases, migrations, or template changes",
        "Conversion or analytics data, if you want results tied to outcomes",
      ],
      expect: [
        "Technical SEO audits ordered by impact and confidence",
        "Search Console analyses that separate evidence from inference",
        "Structured data, metadata, and internal-linking plans",
        "Measurement and experiment plans for organic growth",
      ],
      limits:
        "It doesn’t connect to Search Console, analytics, your CMS, or a crawler. It works from data you share, plus web access if your chat has it, and it can’t guarantee rankings or rich results.",
    },
  },
  imago: {
    style: "creative",
    subject: "Visual design",
    tagline: "From brief to finished visual, without prompt writing.",
    intro:
      "Imago turns briefs, reference images, screenshots, documents, and data into posters, infographics, UI concepts, and edits, using ChatGPT’s built-in image generation and editing.",
    about: [
      "Imago is a visual-first creative and information-design copilot. It suits marketers, designers, founders, and anyone who needs a finished visual rather than advice about one.",
      "It handles four kinds of work: new visuals, edits to supplied images, restyles of a source image, and information design from documents or data. The images come from ChatGPT’s image tools. Imago supplies the method around them.",
      "Where a normal chat might hand back a prompt, Imago produces the image. It infers routine choices like aspect ratio, asks only about truly blocking gaps, and changes only what you ask for during edits.",
    ],
    workflow: {
      title: "Developing a poster for an open studio event",
      problem:
        "A small ceramics co-op needs a poster for an open studio weekend. They have a headline, a mood in mind, and a photo of their wheel room, but no designer.",
      input: {
        label: "Creative brief",
        language: "text",
        content:
          "Poster for our open studio weekend.\nHeadline, exactly: ‘Open Studio Weekend’\nSubline: ‘Clay & Kiln Co-op’\nMood: warm, handmade, earthy palette.\nUse the attached wheel-room photo for composition only.",
      },
      steps: [
        "Classifies the job as a new visual and treats the attached photo as a composition reference, not as content to copy.",
        "Locks the hard constraints: the exact headline and subline, a portrait format suited to a poster, and the earthy palette.",
        "Generates the poster with ChatGPT’s image tool, making routine layout and type choices without a questionnaire.",
        "Refines through feedback. The accepted version becomes the baseline, and each round changes only what you name, such as a warmer background, while protecting the text.",
      ],
      result:
        "A finished poster image in the conversation, then revised versions as you give feedback. Your exact wording is treated as a hard requirement throughout.",
    },
    expertise: [
      {
        title: "Creating from briefs",
        description:
          "Posters, infographics, UI concepts, social graphics, slides, storyboards, and concept art, with aspect ratio inferred from the intended use when you don’t specify one.",
      },
      {
        title: "Faithful image edits",
        description:
          "Changes the requested element and preserves identity, product geometry, composition, lighting, and text. Each reference keeps a distinct role: subject, style, composition, or layout.",
      },
      {
        title: "Text and layout",
        description:
          "Uses your exact wording, capitalization, and numbers, keeps a clear hierarchy, and splits dense content across visuals when one canvas would be illegible.",
      },
      {
        title: "Data-true visuals",
        description:
          "Builds charts and infographics from your real values or verified sources. It never invents statistics, dates, or quotes, and doesn’t imply precision the data lacks.",
      },
    ],
    working: {
      provide: [
        "A short brief describing the deliverable",
        "Exact text that must appear",
        "Reference images, with what each one is for",
        "Source documents or data for factual visuals",
        "A required aspect ratio or brand colors",
      ],
      expect: [
        "New images generated in the conversation",
        "Targeted edits to images you supply",
        "Infographics and diagrams built from your data",
        "Revisions that keep the accepted direction",
      ],
      limits:
        "Imago depends on ChatGPT’s image generation and editing. If those aren’t available, it says so plainly rather than faking a result. It can’t inspect files or links you haven’t shared, and it won’t invent data.",
    },
  },
  "atelier-pottery-mentor": {
    style: "creative",
    subject: "Ceramics",
    tagline: "A studio mentor for clay, glaze, and kiln.",
    intro:
      "Atelier Pottery Mentor critiques your work, troubleshoots clay, glaze, and firing defects, and plans controlled tests, working from your photos, materials, and firing notes.",
    about: [
      "It’s a practical ceramics mentor for potters, sculptors, students, and studio makers. It teaches technique as cause and effect, not ritual, and its critique helps you decide what to keep and what to change.",
      "Bring it a cracked handle, a glaze that crawled, a question about firing schedules, or a form you can’t resolve. Answers stay grounded in the clay, glaze, cone, kiln, and process details you provide.",
      "It separates what is visible from what is inferred and what is still unknown. When several causes fit, it proposes the smallest test that tells them apart, changing one variable at a time.",
    ],
    workflow: {
      title: "Diagnosing pinholes on a batch of mugs",
      problem:
        "Several mugs came out of a glaze firing with small pinholes on the outside. Pieces from the top shelf look fine, and you want to know what to change before the next load.",
      input: {
        label: "What you describe",
        language: "text",
        content:
          "Mid-range stoneware, electric kiln, fired to cone 6.\nCommercial satin glaze, dipped, two coats.\nSmall pinholes on the outside of three mugs.\nMugs from the top shelf came out clean.\nNo witness cones in this firing.",
      },
      steps: [
        "Separates observation from inference. The pinholes are visible, but the heatwork on each shelf is unknown because no witness cones were used.",
        "Lists likely contributors, such as outgassing from the body, heavy application, or the firing cycle, and asks only for details that change the answer, like bisque cone and schedule.",
        "Designs the smallest useful test: tiles at one and two coats, cone packs at top, middle, and bottom, and the current glaze kept as a control.",
        "Adds a firing-log template and a safety note, and holds back any food-use claim for the affected mugs until the surface is properly evaluated.",
      ],
      result:
        "A ranked diagnosis with what to check next, a controlled test plan, and a log format for comparing the next firing.",
    },
    expertise: [
      {
        title: "Critique and technique",
        description:
          "Reads form, proportion, rim, foot, and handles from photos, separates craft issues from taste, and picks the highest-impact fix plus one practice drill.",
      },
      {
        title: "Glaze and firing defects",
        description:
          "Diagnoses crazing, crawling, pinholing, blistering, and more as interactions of clay, glaze, application, and firing. Treats cones as heatwork, not fixed temperatures.",
      },
      {
        title: "Visual previews",
        description:
          "Uses ChatGPT’s image tools for form studies, teaching diagrams, or an edited photo showing a handle or glaze change. Previews are labeled concepts, not predictions of fired results.",
      },
      {
        title: "Studio and functional safety",
        description:
          "Covers silica dust control, kiln clearance, manufacturer guidance, and cautious functional-ware advice. It never certifies a piece as food safe from a photo or recipe.",
      },
    ],
    working: {
      provide: [
        "Clear photos of the piece and the defect",
        "Clay body and glaze, by product name or recipe",
        "Target cone, firing schedule, and witness-cone results",
        "Kiln type and where the piece sat in the load",
        "Application method and glaze thickness",
      ],
      expect: [
        "Structured critique with a next-piece experiment",
        "A ranked defect diagnosis with checks to run",
        "Test-tile and firing-log plans",
        "Concept images and edited previews of your piece",
      ],
      limits:
        "It can’t see your kiln, handle your pots, or test your glazes. It works from your photos and notes, its previews are concepts rather than predictions, and it won’t guarantee firing outcomes or food safety.",
    },
  },
};

export function getProductStory(slug: string): ProductStory {
  const story = STORIES[slug];
  if (!story) throw new Error(`Product story not found: ${slug}`);
  return story;
}

export function hasProductStory(slug: string): boolean {
  return slug in STORIES;
}
