import type { ProductStory } from "@/lib/product-story";

const STORIES: Record<string, ProductStory> = {
  "sql-copilot": {
    style: "technical",
    subject: "SQL",
    tagline: "Correct SQL first, fast SQL second.",
    intro:
      "A dialect-aware SQL assistant with focused workflows for writing, debugging, translating, testing, and tuning queries. It works from the schema, errors, and plans you share, and checks grain, joins, and NULLs before performance.",
    about: [
      "SQL Copilot turns plain-language requirements into SQL and explains, debugs, and translates existing queries between dialects. It reviews risky writes and schema migrations, designs BI, CDC, and reconciliation logic, and writes test fixtures with expected results.",
      "It’s built for analysts, BI teams, data engineers, platform teams, and application developers. It suits people who work across more than one database engine and can’t afford syntax from the wrong dialect.",
      "Before writing anything, it settles what one output row represents, how each join can multiply rows, and how NULLs and time boundaries behave. It won’t hide duplicates with DISTINCT, optimize a query that is still wrong, or call SQL tested without real output.",
    ],
    workflow: {
      title: "A duplicate-contact cleanup needs a DELETE",
      problem:
        "A team wants to remove duplicate customer contacts in PostgreSQL and already has a DELETE written. Nobody has checked how many rows it touches or which row survives.",
      input: {
        label: "Proposed cleanup",
        language: "sql",
        content: `DELETE FROM customer_contacts c
USING customer_contacts d
WHERE c.email = d.email
  AND c.contact_id < d.contact_id;`,
      },
      steps: [
        "Classifies the statement as high risk and states exactly which rows it can remove and whether the change can be reversed.",
        "Tests the duplicate key against case and whitespace in email, NULL emails, and whether the lowest contact_id is really the row to drop. Then it defines a winner and a deterministic tie-breaker.",
        "Writes a read-only preview that uses the same predicates, with affected-row counts, distinct-key counts, and checks for rows matched more than once.",
        "Puts the DELETE in a separate block under an explicit warning, to run only after the preview is validated. It wraps the statement in a transaction and adds backup or restore guidance that fits PostgreSQL.",
      ],
      result:
        "You get a preview query, validation checks, and a guarded DELETE, with its assumptions stated. You run each step and judge the results yourself.",
    },
    expertise: [
      {
        title: "Dialect translation",
        description:
          "Translates between engines, including PostgreSQL, SQL Server, Oracle, Snowflake, BigQuery, Redshift, and Databricks SQL. Flags features without equivalents and silent changes like Oracle empty strings or integer division.",
      },
      {
        title: "Plan-based tuning",
        description:
          "Reads execution plans and query profiles for pruning, spill, shuffles, and scans. It doesn’t promise gains from CTEs, indexes, clustering, or bigger compute without evidence.",
      },
      {
        title: "Schema migration review",
        description:
          "Plans expand, migrate, and contract steps for breaking changes and checks locks, table rewrites, and backfill cost. It won’t call DDL transactional everywhere or zero-downtime without evidence.",
      },
      {
        title: "SQL security and access",
        description:
          "Parameterizes user input, allowlists dynamic identifiers, and reviews least privilege, row and column policies, masking, and GRANT or REVOKE changes. It never bypasses access controls.",
      },
    ],
    working: {
      provide: [
        "The target platform and version, plus the source platform for translations",
        "Table definitions, keys, and a few sample rows",
        "The query, the error message, or a plain-language requirement",
        "Execution plans or query profiles for slow queries",
        "The intended scope of any data or schema change",
      ],
      expect: [
        "One copyable query with only the assumptions that matter",
        "A short explanation of joins, filters, NULL handling, and output grain",
        "Validation queries and test fixtures with expected results",
        "Preview-first scripts for UPDATE, DELETE, MERGE, and schema changes",
      ],
      limits:
        "It doesn’t connect to databases or run SQL on its own. It works from the schema, rows, and plans you share, and won’t call a query tested or tuned without real output.",
    },
  },
  "production-data-engineering-copilot": {
    style: "technical",
    subject: "Data Engineering",
    tagline: "Fix production pipelines without losing or duplicating data.",
    intro:
      "A production-minded assistant for Spark, Databricks, Delta Lake, CDC, streaming, Airflow, dbt, and Microsoft Fabric. It works from your logs, plans, and code to a leading hypothesis, one decisive check, and a safe next step.",
    about: [
      "Data Engineering Copilot helps you design, build, debug, recover, and tune data pipelines. It covers batch, CDC, streaming, lakehouse, and warehouse systems, plus dbt models, backfills, data quality, observability, governance, and platform migrations.",
      "It’s written for data engineers and platform owners who run pipelines with SLAs, downstream consumers, and real recovery costs. Simple syntax or concept questions get a direct answer.",
      "For incidents, it states a leading hypothesis with a confidence level and the observation that would disprove it, and keeps facts, assumptions, and unknowns apart. Correctness and recoverability come before performance and cost. It doesn’t reach for bigger clusters by default.",
    ],
    workflow: {
      title: "Silver rows double after an Airflow retry",
      problem:
        "An hourly load task failed partway through and Airflow retried it. Downstream counts for that interval are now roughly twice what the source shows.",
      input: {
        label: "Load task",
        language: "python",
        content: `# load_orders: retries=2, schedule='@hourly'
df = (spark.read.table('bronze.orders_cdc')
      .where(col('ingest_hour') == run_hour))

df.write.mode('append').saveAsTable('silver.orders')`,
      },
      steps: [
        "Names the most likely cause, a non-idempotent append rerun on the same interval. It gives a confidence level, the facts behind it, and what would disprove it.",
        "Gives the decisive read-only check: a duplicate-key count on silver.orders, matched against the retry and run history.",
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
          "Treats checkpoints as production state. Covers watermarks, state growth, backlog, and sink semantics, and separates engine fault tolerance from end-to-end exactly-once for external writes.",
      },
      {
        title: "Spark performance",
        description:
          "Diagnoses from stage metrics and physical plans: skew, shuffle, spill, file layout, and memory pressure. No arbitrary partition counts, forced broadcasts, blind scaling, or untargeted table maintenance.",
      },
      {
        title: "Microsoft Fabric and OneLake",
        description:
          "Lakehouse versus Warehouse choices, shortcuts versus physical copies, and medallion layers with explicit grain. Plans deployments knowing Lakehouse definitions don’t copy table data by default.",
      },
      {
        title: "dbt and warehouse models",
        description:
          "Incremental models with a unique key, late-arrival window, strategy, and full-refresh conditions. Adds grain, relationship, freshness, and reconciliation tests, without assuming unique_key enforces uniqueness.",
      },
    ],
    working: {
      provide: [
        "Error messages, driver or task logs, and Airflow task history",
        "Spark UI metrics or physical plans",
        "Pipeline code, SQL, dbt models, MERGE logic, and configs",
        "Runtime, platform, and version details, such as Databricks, Fabric, or Airflow",
        "A timeline of what changed before the failure",
      ],
      expect: [
        "A most likely cause, a decisive check, and containment kept apart from the permanent fix",
        "Production-oriented SQL, PySpark, dbt, or Airflow code",
        "Replay and backfill plans with validation and rollback",
        "Data quality test matrices with thresholds, owners, and actions",
      ],
      limits:
        "It doesn’t reach clusters, run jobs or queries, trigger Airflow, change checkpoints, or run backfills on its own. It works from the evidence you share and won’t call a fix verified without results.",
    },
  },
  "production-rag-genai-copilot": {
    style: "technical",
    subject: "RAG & GenAI",
    tagline: "Find the first layer where your RAG breaks.",
    intro:
      "A production assistant for retrieval-augmented generation. It traces failures across ingestion, retrieval, reranking, context, and citations, and it prefers measured, reversible fixes to prompt tweaks.",
    about: [
      "RAG & GenAI Copilot helps you design, build, debug, evaluate, and secure retrieval-augmented systems. It also covers citation audits, production incidents, observability, latency, cost, legacy migrations, and choices between retrievers, rerankers, models, and vector stores.",
      "It’s meant for engineers who own a RAG system in production and need to explain why an answer was wrong, stale, unsupported, or shown to the wrong user.",
      "It checks whether the right evidence reached the model before blaming the model, and treats retrieved content as untrusted data, never as instructions. It won’t add rerankers, query rewriting, agents, or graph layers without proving their value.",
    ],
    workflow: {
      title: "Answers cite an archived refund policy",
      problem:
        "A support assistant keeps quoting the old refund window. The current policy is in the index, but answers still cite the archived version.",
      input: {
        label: "Retrieval trace",
        language: "yaml",
        content: `query: refund window for annual plans
filters: tenant_id=t_042
retrieved:
  - refund-policy-v3#12  score=0.81  status=archived
  - refund-policy-v4#4   score=0.77  status=current
  - billing-faq#2        score=0.64
context_ids: [v3#12, v3#13, faq#2]
citation: v3#12`,
      },
      steps: [
        "Walks the trace one boundary at a time: filters, retrieval, reranking, context packing, generation, and citation mapping.",
        "Finds the first failure. The current policy was retrieved but dropped during context construction, so this is not a generation problem.",
        "Recommends an explicit source precedence and version policy based on status and effective version, instead of a prompt instruction.",
        "Adds conflicting-source and stale-source cases to the eval set and checks citation correctness before rollout.",
      ],
      result:
        "A diagnosis with a confidence level, the smallest test that confirms it, and a reversible fix. It also includes eval cases that guard against regression.",
    },
    expertise: [
      {
        title: "Ingestion and retrieval",
        description:
          "Covers parsing, chunking, stable IDs, and idempotent reindexing, plus lexical, vector, and hybrid search with metadata filters. Measures candidate recall before adding a reranker.",
      },
      {
        title: "Evaluation design",
        description:
          "Evals that start from the product decision. Retrieval, context, generation, citations, and abstention are scored separately, by slice. Automated judges are paired with targeted human review.",
      },
      {
        title: "Security and authorization",
        description:
          "Prompt injection, poisoned documents, cross-tenant leakage, and exfiltration through citations or URLs. Authorization is enforced before content reaches the model. Prompts and answer redaction are not access control.",
      },
      {
        title: "Production incident response",
        description:
          "Reversible, low-blast-radius containment such as reverting the last config or restricting a scope, with traces and index versions preserved. No destructive index rebuilds without a recovery plan.",
      },
    ],
    working: {
      provide: [
        "Retrieval traces with chunk IDs, scores, and filters",
        "The prompt and the final context sent to the model",
        "Example queries with expected and actual answers",
        "Eval results, corpus details, and model or provider details",
        "Architecture and ingestion details, or the repository for code changes",
      ],
      expect: [
        "The dominant failing layer, with a confidence level",
        "The smallest test that confirms or rules out the leading hypothesis",
        "Eval plans with datasets, metrics, and regression gates",
        "Architecture and stack recommendations with trade-offs and a reversible pilot",
      ],
      limits:
        "It can’t query your vector store, run retrieval or eval jobs, or change production systems on its own. It reasons from the traces, configs, and results you share, and labels unrun checks as unrun.",
    },
  },
  "cloud-platform-engineering-copilot": {
    style: "technical",
    subject: "Platform Engineering",
    tagline: "Platform changes with a known blast radius.",
    intro:
      "A cloud and platform engineering assistant for Kubernetes, Terraform and OpenTofu, CI/CD, GitOps, IAM, networking, observability, and SRE. It reviews the manifests, plans, and logs you share and proposes the smallest reversible change.",
    about: [
      "Platform Engineering Copilot helps you design, review, troubleshoot, and operate cloud platforms. It covers architecture, Kubernetes, infrastructure as code, delivery, identity and networking, supply-chain security, reliability, cost and capacity, migrations, and internal developer platforms.",
      "It’s aimed at platform, infrastructure, and SRE engineers, and at teams working out how much platform they actually need.",
      "It starts from the simplest architecture that meets the requirement. It won’t add Kubernetes, a service mesh, or multi-cloud without a concrete reason. Every high-risk change gets a confirmed target, a preview where possible, an approval boundary, and a rollback or forward-fix path.",
    ],
    workflow: {
      title: "Pods restart in a loop during a database slowdown",
      problem:
        "Latency on a shared database rose and the API deployment started restarting. The restarts made the outage worse.",
      input: {
        label: "Probe config and pod events",
        language: "yaml",
        content: `livenessProbe:
  httpGet: { path: /healthz/deps, port: 8080 }
  periodSeconds: 5
  failureThreshold: 2

Events:
  Warning  Unhealthy  Liveness probe failed: HTTP probe failed with statuscode: 503
  Normal   Killing    Container api failed liveness probe, will be restarted
  Warning  BackOff    Back-off restarting failed container api`,
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
        title: "Terraform and OpenTofu",
        description:
          "Reviews plans by create, update, replace, and destroy, plus backend, version constraints, and drift. Never bypasses state locks or calls an apply safe without plan evidence.",
      },
      {
        title: "Delivery and supply chain",
        description:
          "Traces commit to build, artifact digest, promotion, and controller sync. Covers signatures, provenance, and SBOMs, and confirms live state after a rollback instead of assuming it.",
      },
      {
        title: "SLOs and observability",
        description:
          "SLIs drawn from user-visible behavior, error budgets, and alerts with owners and runbooks. OpenTelemetry-based traces, metrics, and logs without high-cardinality or secret-bearing labels.",
      },
      {
        title: "Identity and least privilege",
        description:
          "Maps principal, resource, and action, credential lifetime, and workload identity federation. Reviews Kubernetes RBAC and pod privileges, and requires scope and approval for IAM or network changes.",
      },
    ],
    working: {
      provide: [
        "Kubernetes manifests, events, and describe output",
        "Terraform or OpenTofu code and plan output",
        "CI/CD or GitOps pipeline definitions",
        "Incident timeline, logs, and dashboards",
        "SLOs, constraints, and cloud provider details",
      ],
      expect: [
        "Most likely cause, decisive check, containment, fix, and validation",
        "Architecture recommendations with trade-offs and a validation plan",
        "Focused Terraform or OpenTofu, Kubernetes YAML, or pipeline config",
        "Change plans with rollback triggers and post-change monitoring",
      ],
      limits:
        "It can’t inspect cloud accounts, run kubectl or Terraform, change IAM or networking, or deploy workloads on its own. It reviews what you share and won’t invent resource IDs or test results.",
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
      "Share a PR, test output, screenshots, or a deployment plan. It identifies what’s broken, how severe it is, what evidence supports it, and whether the release should ship.",
    about: [
      "Web App QA & Release Copilot is a release-readiness specialist for web applications. Its workflows cover critical journeys, regression scope, bug and flaky-test triage, Playwright tests, visual and responsive checks, accessibility, performance, API and data integrity, security, CI, rollout, and post-release checks.",
      "It’s for QA engineers, developers, and release owners deciding whether a build can ship. It reviews the PR, screenshots, test output, traces, and logs you share, and it doesn’t change app code unless you ask.",
      "Findings are labeled observed, automated, source-supported, inferred, or unverified, with P0 to P3 severity. Every gate is marked pass, fail, unknown, or not applicable. Missing mandatory evidence means Not ready; the other verdicts are Ready and Ready with known limitations.",
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
        "Classifies the evidence. The WebKit failure is automated evidence. Any cookie or storage explanation stays inferred until a decisive reproduction confirms it.",
        "Triages the bug with expected and observed behavior, the smallest reproduction, P1 severity for an auth failure in a supported browser, auth/session as the likely layer, and the next decisive check.",
        "Scopes regression: login, logout, session expiry, and protected routes must be retested. Adjacent flows get targeted regression. Unrelated areas are marked out of scope.",
        "Marks each release gate pass, fail, or unknown, then issues a verdict listing blockers, evidence still missing, rollback readiness, and what to monitor after deploy.",
      ],
      result:
        "A release report with a Not ready or Ready verdict, a reproducible bug report, and a focused regression and smoke-test plan.",
    },
    expertise: [
      {
        title: "Playwright and flaky tests",
        description:
          "User-visible locators and web-first assertions instead of sleeps. Flaky failures are traced to shared state, timing, or locators, and retries or weaker assertions aren’t accepted as fixes.",
      },
      {
        title: "Accessibility review",
        description:
          "Covers semantics, keyboard and focus, forms, live announcements, contrast, reflow, and reduced motion. Automated scan results stay separate from the assistive-technology checks that still need a person.",
      },
      {
        title: "Performance evidence",
        description:
          "Reads Lighthouse and Core Web Vitals data, keeps lab and field evidence apart, and traces poor LCP, INP, or CLS to likely causes.",
      },
      {
        title: "Rollout and post-release",
        description:
          "Checks migrations that can’t simply roll back, feature flags, staged rollout with abort thresholds, and post-deploy smoke flows. A successful deploy isn’t treated as proof of application health.",
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
        "Security and privacy findings that separate observed vulnerabilities from missing verification",
      ],
      limits:
        "It’s skills-only, with no browser, scanner, or deploy access of its own. It runs Playwright or browser checks only when your host provides those tools. Otherwise gaps are reported as unverified, never assumed to pass.",
    },
  },
  "llm-agent-builder-copilot": {
    style: "technical",
    subject: "LLM agents",
    tagline: "The simplest AI system that reliably does the job.",
    intro:
      "Describe the AI feature you want to build or the agent that’s misbehaving. It picks the least complex architecture that works, then defines the tools, state, guardrails, approvals, evals, and release gates.",
    about: [
      "LLM & Agent Builder Copilot is a systems-design assistant for LLM applications, tool-using workflows, MCP integrations, and agents. It designs architectures, tool contracts, state, and evals, debugs failing runs from traces, plans SDK migrations, and writes code when asked.",
      "It’s for engineers and product teams building AI features that have to hold up in production, with bounded permissions, recoverable state, and traceable execution.",
      "It starts by asking whether you need an agent at all. Each use case is placed on a scale from deterministic code through single model calls, bounded tools, and workflows to multi-agent, and complexity increases only when it adds measurable value.",
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
        title: "MCP integration design",
        description:
          "Decides what belongs in a tool, a resource, or a prompt, then covers authorization, schemas, optional UI and task extensions, and which spec version to verify against.",
      },
      {
        title: "Agent security",
        description:
          "Treats retrieved content and tool output as untrusted, and reviews prompt injection, data exfiltration, confused-deputy behavior, cross-tenant leakage, and excessive permissions.",
      },
      {
        title: "Debugging agent runs",
        description:
          "Classifies failures by step, such as context, planning, tool schema, auth, parser, state, or approval, and checks for duplicated writes, lost handoff context, and stale state.",
      },
      {
        title: "Release gates",
        description:
          "Marks tests, evals, access controls, approval behavior, budgets, redaction, and rollback as passed, failed, not run, or not applicable, and fails closed when critical proof is missing.",
      },
    ],
    working: {
      provide: [
        "The user goal and what success looks like",
        "Existing code, SDK and framework versions, and any traces or eval results",
        "The APIs and data sources the system can reach",
        "Which actions are consequential, such as sending, paying, deleting, or deploying",
        "Security, tenant, latency, or cost constraints",
      ],
      expect: [
        "A recommended system shape, with the reason it’s the simplest one that works",
        "Tool definitions with schemas, side effects, retries, and approval rules",
        "State and memory plans with clear ownership, retention, and reset behavior",
        "Eval plans, trace fields, and a go/no-go release gate report",
      ],
      limits:
        "It’s skills-only, with no MCP server, agent runtime, or hosted backend. It doesn’t run agents, evals, or deployments unless your host provides authorized tools. Confirm version-sensitive SDK and MCP details against current official docs.",
    },
  },
  "software-data-ai-copilot": {
    style: "technical",
    subject: "Code & data",
    tagline: "Small, correct changes that respect your codebase.",
    intro:
      "Share code, errors, or a change request. It follows your repository’s conventions to explain, debug, review, implement, or migrate code, and marks every check as tested or not tested.",
    about: [
      "Software & AI Copilot is an engineering assistant that starts from your repository. It explains, debugs, implements, reviews, refactors, tests, and migrates code, with focused workflows for security, performance, incidents, releases, data pipelines, ML, notebooks, and LLM integrations.",
      "It’s for engineers working in an existing codebase who want changes that fit. It reads the repository’s instruction files, the nearby code, manifests, and tests, and it follows the patterns it finds.",
      "Its rule is the smallest coherent change. Public APIs, schemas, and data contracts stay the same unless you ask to change them. It never silently adds dependencies, services, migrations, or credentials, or restructures the architecture.",
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
        "A review verdict naming the blocking issue, a minimal patch that keeps the model’s output contract, and a regression test. Tests stay marked not tested until real output shows they pass.",
    },
    expertise: [
      {
        title: "Safe migrations",
        description:
          "Picks expand-contract, a compatibility shim, staged dual reads and writes, or stop-and-migrate, with backfills that can run twice and no rollback promise once data is irreversibly changed.",
      },
      {
        title: "Notebook to production",
        description:
          "Moves notebook logic into tested modules with config, entry points, pinned dependencies, and logging, removes hidden state and embedded secrets, and checks parity against known-good outputs.",
      },
      {
        title: "LLM integration hardening",
        description:
          "Treats model output and tool results as untrusted, adds typed outputs, bounded retries, and redaction, and tests malformed outputs, rate limits, cancellation, and unauthorized side effects.",
      },
      {
        title: "Application security",
        description:
          "Checks authentication plus object and tenant authorization at each access boundary, input validation, and secret handling. Findings are concrete exploitable paths with negative tests, not generic lists.",
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
        "A focused patch, with each check marked tested or not tested",
        "Tests matched to the change, including a regression test for each fixed bug",
        "Review verdicts that separate blocking issues, important issues, and suggestions",
      ],
      limits:
        "It’s skills-only, with no connector, build service, or database access. It works from what you share or from coding tools your host provides, and it never reports tests as passing without real output.",
    },
  },
  "power-bi-report-builder-copilot": {
    style: "technical",
    subject: "Power BI",
    tagline: "Find where the report goes wrong, then fix it.",
    intro:
      "Power BI Report Copilot builds and debugs paginated reports, DAX, Power Query, semantic models, and Fabric designs from the files, code, screenshots, and errors you share. It returns copy-ready fixes with steps to validate them.",
    about: [
      "It acts as a hands-on Power BI specialist for report developers, BI engineers, and analysts. It covers Report Builder and RDL, exports and scheduled delivery, semantic models, DAX and Power Query, refresh, and Microsoft Fabric reporting architecture.",
      "Bring it a specific broken thing: a parameter that won’t cascade, a total that doesn’t add up, a PDF with blank pages, a failed refresh, a slow model. It routes each to a focused workflow, defaulting to Report Builder for RDL work.",
      "It checks correctness before speed. It finds the earliest layer where results go wrong, such as grain, filter context, or parameter mapping, and offers the smallest reversible fix. Security comes first, and an untested check is reported as not run, never as a pass.",
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
        "Defines the expected result at row, group, and total level, then reconstructs the filter context from slicers, relationships, and the iterator before touching the code.",
        "Names the cause: the iterator adds up per-row ratios, so the total sums percentages instead of dividing aggregates.",
        "Returns minimally revised, copy-ready DAX built on small base measures for revenue and cost, then explains only the filter-context change needed to defend it.",
        "Ends with a small synthetic test table and a validation checklist, such as reconciling the total against source sums and testing it under slicers.",
      ],
      result:
        "A corrected, copy-ready measure with a brief explanation and a checklist to confirm the numbers before the report goes back out.",
    },
    expertise: [
      {
        title: "Paginated reports and exports",
        description:
          "Parameters and cascading filters, tablix grouping and VB expression scope, page geometry behind blank PDF pages, and how PDF, Excel, and CSV renderers differ.",
      },
      {
        title: "Semantic models and Power Query",
        description:
          "Star schemas, grain, relationships and cardinality, date tables, and foldable Power Query that keeps identifiers with leading zeros and source types intact.",
      },
      {
        title: "Fabric, refresh, and performance",
        description:
          "Weighs Import, DirectQuery, and Direct Lake, plans incremental refresh boundaries, diagnoses failed refreshes, and locates the slow layer with evidence before suggesting any optimization.",
      },
      {
        title: "Security and release checks",
        description:
          "Treats source security or RLS as the real boundary, never a hidden visual. Plans recipient access for delivery and marks release gates passed only with observed evidence.",
      },
    ],
    working: {
      provide: [
        "RDL files or screenshots of the report design",
        "DAX, M, or SQL code",
        "Exact error messages or refresh history",
        "Model details such as tables, grain, and relationships",
        "The target output, such as PDF or Excel",
      ],
      expect: [
        "Exact Report Builder steps and settings",
        "Copy-ready SQL, DAX, M, or VB expressions",
        "Architecture recommendations with trade-offs",
        "Reconciliation and release checklists",
      ],
      limits:
        "It doesn’t connect to Power BI, run reports, refresh models, or publish. It works from what you paste or upload, and runs checks only with tools your host provides. Share redacted examples, never credentials.",
    },
  },
  "technical-interview-copilot": {
    style: "planning",
    subject: "Interview prep",
    tagline: "Practice for the interview you actually have.",
    intro:
      "Technical Interview Copilot reads your job description and resume, works out what you’re likely to be tested on, then runs realistic practice one question at a time and gives honest, evidence-based feedback.",
    about: [
      "It’s an interview preparation partner for software, data, cloud, AI/ML, platform, mobile, QA, security, and architecture roles. It suits candidates at any level, from early career to staff, who have a specific role in front of them.",
      "Use it to map a new role, plan prep around the time you have, cram before a call, rehearse full rounds, interpret take-home instructions, or debrief after an interview. It infers role family and seniority from your materials.",
      "It won’t invent projects, metrics, or leadership beyond your resume. It separates interview details you’ve confirmed from published guidance and assumptions, and treats any score as coaching, not a prediction of a hiring decision.",
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
        "Maps the role: likely focus areas, top-priority topics, the resume claims an interviewer will probe, and a realistic order for the week, flagging any topic inferred rather than listed in the posting.",
        "Plays the interviewer one question at a time. SQL covers grain, joins, NULLs, and date boundaries. Pipeline design follows up on late data, replay, and partial failures.",
        "Pressure-tests your real projects with questions on ownership, trade-offs, and what failed, without strengthening any claim beyond your resume.",
        "After each section, gives what was correct, what was missing or wrong, what wasn’t assessed, the top correction with a stronger answer, and up to three targeted drills.",
      ],
      result:
        "A prioritized prep plan sized to your time, mock feedback with topics to review, and spoken answers in short and standard lengths built from your own experience.",
    },
    expertise: [
      {
        title: "Coding rounds",
        description:
          "Simulates clarify, approach, code, tests, and complexity. Checks edge cases and communication, shows the smallest correction, and won’t reveal a full answer before you attempt it.",
      },
      {
        title: "Debugging and incident rounds",
        description:
          "Starts from a symptom with partial evidence and reveals logs or metrics only when you ask, probing containment, rollback, root cause, and prevention.",
      },
      {
        title: "AI/ML and design rounds",
        description:
          "Probes leakage, evaluation, and drift for ML, and grounding, prompt injection, cost, and fallbacks for LLM systems. Design problems adapt to frontend, mobile, and platform roles.",
      },
      {
        title: "Company and assessment rules",
        description:
          "Favors your recruiter’s instructions and official employer guidance over anecdotal reports, labeling uncertainty. Reads take-home rules first, and won’t produce a hidden submission if AI help is prohibited.",
      },
    ],
    working: {
      provide: [
        "The job description or recruiter message",
        "Your resume or a project summary",
        "Interview stage, format, and any assessment instructions",
        "How much time you have before the interview",
        "Practice answers, code, or notes from a past interview",
      ],
      expect: [
        "A prioritized interview map and prep order",
        "One-question-at-a-time mocks with realistic follow-ups",
        "Feedback with stronger answers and targeted drills",
        "Rapid-review notes and post-interview learning logs",
      ],
      limits:
        "It works from what you share; web research or code runs happen only if your host provides those tools. Company details it can’t confirm are marked as assumptions, and it won’t write experience you don’t have.",
    },
  },
  "product-app-architect": {
    style: "planning",
    subject: "Product planning",
    tagline: "From rough idea to a buildable plan.",
    intro:
      "Product & App Architect turns ideas, existing apps, and feature requests into focused product decisions, UX flows, specs, architecture choices, and phased build plans. It recommends what to build first and what to leave out.",
    about: [
      "It’s for anyone deciding what to build, how it should work, or how to structure it. It reads what you share and routes to the right kind of help, from discovery and audits to metrics, data contracts, and an engineering handoff, without a long interview.",
      "It reasons product first. Problem, target user, alternatives, core value, and validation risk come before UX and architecture. It challenges scope by default, so accounts, AI, billing, or microservices appear only when a real requirement calls for them.",
      "It makes a recommendation instead of handing back an unranked list. It separates evidence from assumptions, asks a question only when a decision can’t proceed without it, and states what would change its advice.",
    ],
    workflow: {
      title: "Turning an app idea into an MVP plan",
      problem:
        "A two-person team has an idea for a shared chores app and a long feature wish list. They need to know what to build first and how to structure it.",
      input: {
        label: "Product brief",
        language: "text",
        content: `Idea: an app for roommates to split chores fairly.
Wish list: accounts, reminders, chat, leaderboard, AI chore suggestions.
Users so far: us and a few friends who share flats.
Constraints: two developers, web first, small budget.
Open question: do we need a mobile app at launch?`,
      },
      steps: [
        "Frames the problem, target user, and current workaround. It separates what the team stated from what is researched or assumed, and ranks each assumption by risk.",
        "Defines the smallest complete loop, then sorts the wish list into must-have, later, and explicitly not building.",
        "Proposes a cheap test for the riskiest assumption, with the expected signal, a failure condition, and the decision each outcome leads to.",
        "Recommends the simplest architecture that fits, plus one credible alternative and when to revisit it. It then lays out milestones from a first vertical slice to launch, each with acceptance tests.",
      ],
      result:
        "A concise product plan: recommended direction, MVP scope with a not-now list, validation plan, architecture with trade-offs, and a phased build plan ready to hand to an engineer or coding agent.",
    },
    expertise: [
      {
        title: "Existing product audits",
        description:
          "Declares which surfaces it actually observed, walks the core user outcome, and ranks the three highest-leverage fixes. Prefers evolution over rewrites and keeps observation separate from inference.",
      },
      {
        title: "Specs and API contracts",
        description:
          "Feature delta specs and PRDs with stable requirement IDs mapped to acceptance tests, plus data ownership, permissions, idempotency, versioning, and error semantics for APIs.",
      },
      {
        title: "AI feature planning",
        description:
          "Compares a deterministic workflow before adding a model, then defines narrow AI responsibilities, validation, fallback, human review, evaluation sets, and latency and cost budgets.",
      },
      {
        title: "Launch readiness review",
        description:
          "Checks core loop, recovery states, data safety, accessibility, observability, and rollback. Verdicts are ready, ready with limitations, not ready, or not assessed, which never counts as a pass.",
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
        "UX flows with state tables, PRDs, and feature specs with acceptance criteria",
        "Architecture decisions and data and API contracts with trade-offs",
        "Measurement plans, phased build plans, and engineering handoff briefs",
      ],
      limits:
        "It plans rather than builds: it doesn’t generate app code, deploy, or run a hosted service, and has no connectors of its own. Inspecting links or repositories and checking current competitors depend on the tools in your chat.",
    },
  },
  "job-outreach-copilot": {
    style: "planning",
    subject: "Job outreach",
    tagline: "Find the right roles and pursue them honestly.",
    intro:
      "Job Outreach Copilot supports a job search from finding roles and verified recruiters to fit checks, outreach, applications, tracking, and interview prep. It never adds experience, numbers, or status you haven’t given it.",
    about: [
      "It’s for job seekers, and for people supporting several candidates, who want effort spent on the right roles. Each candidate’s profile, resume versions, messages, and tracker stay separate, so no one’s history or authorization leaks into another’s.",
      "Its defining rule is accuracy. Candidate facts, job facts, and conversation facts stay separate. Exposure never becomes ownership, a personal project never becomes employer experience, and compensation or work authorization is stated only as you supplied it.",
      "It treats drafts and actions as different things. A drafted note isn’t a sent message, and a prepared application isn’t a submitted one. Status changes only with your confirmation or a real receipt, and recruiter threads pick up where they left off.",
    ],
    workflow: {
      title: "Qualifying a recruiter’s role and drafting the reply",
      problem:
        "A recruiter has messaged about a contract role. The candidate wants to know if it’s worth pursuing and how to reply without overstating their experience.",
      input: {
        label: "Recruiter message and candidate notes",
        language: "text",
        content: `Recruiter: I came across your profile for a Senior Data Engineer contract role.
Must have: 5+ years of Python, Airflow, and Snowflake in production.
Nice to have: Kafka, dbt. Hybrid, 3 days on-site. W2 only.
Are you open to it, and what’s your expected rate?

My notes: Python and Airflow at my current job. Snowflake only in a personal project. No rate decided yet.`,
      },
      steps: [
        "Separates what the job requires, what the profile supports, and what the recruiter asked. Each must-have is mapped as supported, adjacent, unknown, or contradicted. Snowflake from a personal project stays adjacent.",
        "Qualifies the terms. W2 only, three on-site days, and the rate are marked confirmed, advertised, or unknown against the candidate’s stated constraints. Where a constraint is missing, it asks at most one decisive question.",
        "Classifies fit as strong, partial, unsuitable, or unknown and picks one action, proceed, qualify first, or skip, with the decisive reason. Missing nice-to-haves alone never rule the role out.",
        "Drafts a reply in the same thread that answers the recruiter’s question first, describes Snowflake accurately, and leaves the rate open. The outreach is logged as drafted, not sent.",
      ],
      result:
        "A short fit and qualification summary with the main gap and next action, a copy-ready recruiter reply, and a tracker entry that stays drafted until you confirm it was sent.",
    },
    expertise: [
      {
        title: "Role and recruiter research",
        description:
          "With web access, finds open roles on employer and ATS pages and recruiters tied to the role, each with source and confidence. It never guesses email patterns.",
      },
      {
        title: "Truthful resume tailoring",
        description:
          "Reorders and rewords to match the job without adding skills, metrics, or ownership. Keeps exact titles and dates, and returns a change log and a gap list.",
      },
      {
        title: "Channel-aware outreach",
        description:
          "Defaults to a short LinkedIn invitation note for new contacts, drafts DMs only on request or in a live thread, and emails only verified contacts. Follow-ups stay shorter.",
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
        "Target roles, locations, and work arrangements if you want a search",
        "The job post, recruiter message, or a screenshot of the thread",
        "Your constraints: employment type, compensation, and work authorization",
        "Earlier messages and any existing tracker, so settled details aren’t repeated",
      ],
      expect: [
        "A strong, partial, unsuitable, or unknown fit call with one next action",
        "Source-linked role and recruiter leads, each with a confidence level",
        "Copy-ready notes, emails, replies, and tailored resume text with a change log",
        "Tracker entries and interview practice based only on confirmed events",
      ],
      limits:
        "It has no built-in connectors. Searching for roles and recruiters needs web access in your chat. It sends, invites, or applies only with your explicit approval and a host tool that can, and gives no immigration legal advice.",
    },
  },
  "research-technical-writing-copilot": {
    style: "planning",
    subject: "Research & writing",
    tagline: "Research you can trace, writing ready to publish.",
    intro:
      "Research & Writing Copilot turns sources, papers, notes, and drafts into technical articles, documentation, reports, and literature reviews whose key claims trace back to evidence. It shows uncertainty instead of hiding it, and never invents citations.",
    about: [
      "It’s for people who write technical and knowledge-heavy content that needs to hold up to scrutiny. It works out the task, whether deep research, a literature review, a fact-check, a refresh of an older piece, a comparison, or a full article.",
      "Fluent prose isn’t the goal. Every important claim is labeled as verified, source-reported, inference, opinion, contradicted, stale, or unverified. Conflicting sources are compared by date, version, and scope rather than averaged into one number.",
      "Research and presentation stay separate. One researched core can become a Medium story, a LinkedIn article or post, a developer blog, or a documentation page, and a final check confirms shorter versions don’t overstate the facts.",
    ],
    workflow: {
      title: "Turning several sources into a grounded article",
      problem:
        "An engineer has notes from product docs, a vendor benchmark, and a forum thread, and wants a practitioner article comparing two caching approaches. The sources don’t fully agree.",
      input: {
        label: "Source notes",
        language: "text",
        content: `Topic: write-through vs write-behind caching for a read-heavy API
Audience: backend engineers, practitioner level
Source A: official docs for the cache product (version 7)
Source B: vendor blog benchmark claiming 3x faster writes with write-behind
Source C: forum thread reporting data loss on node failure
Target: company blog, then a LinkedIn post`,
      },
      steps: [
        "Defines the questions the article must answer and the claims that need verification before any drafting starts.",
        "Builds a claim ledger tying each claim to its source, source type, version, and status. The vendor benchmark stays a source-reported claim, not a verified fact.",
        "Drafts for the stated audience: problem, mechanism, example, trade-offs and failure modes, then a decision rule, with citations next to the claims they support.",
        "Runs a pre-publication review of sources, examples, and clarity, with findings marked blocking, important, or optional. Then it adapts the core article into a LinkedIn post without changing the facts.",
      ],
      result:
        "A publish-ready technical article with inline sources and visible caveats, plus a LinkedIn version built from the same researched core.",
    },
    expertise: [
      {
        title: "Fact-checks and refreshes",
        description:
          "Marks claims in a draft or older piece as stale, conflicting, or unsupported, patches only those spans, and keeps the author’s voice. Untested code is labeled as such.",
      },
      {
        title: "Literature reviews",
        description:
          "Verifies titles, authors, DOIs, and publication status, extracts design and limitations into an evidence matrix, and separates peer review from preprints and vendor reports. No invented results.",
      },
      {
        title: "Decision reports",
        description:
          "Compares products or technologies on criteria that matter to your decision, normalized by version and tier. Recommends only when evidence supports it, and says what would change it.",
      },
      {
        title: "Documentation and how-tos",
        description:
          "Picks the right document type, from concept and tutorial to reference, migration guide, or runbook, and writes procedures with prerequisites, ordered steps, expected checks, and rollback.",
      },
    ],
    working: {
      provide: [
        "The topic, the question to answer, and the intended reader",
        "Your source notes, links, papers, files, or an existing draft",
        "The target format or publication, such as a company blog, Medium, or LinkedIn",
        "Any real experience or results you want included, since it won’t invent them",
      ],
      expect: [
        "Research briefings with each claim labeled by evidence status",
        "Technical articles, explainers, documentation pages, and research reports",
        "Comparison reports and literature reviews with evidence matrices",
        "Fact-check change logs, publication reviews, and platform versions of one article",
      ],
      limits:
        "No built-in connectors, and it doesn’t publish. Checking current sources, reading papers, and testing code depend on tools in your chat. Without them, it works from what you provide and marks unverifiable claims.",
    },
  },
  "seo-website-growth-copilot": {
    style: "planning",
    subject: "SEO & growth",
    tagline: "Find where organic search actually breaks down.",
    intro:
      "SEO & Growth Copilot diagnoses technical SEO, indexing, migration, and organic traffic problems from the site evidence you share. It finds the first failing layer, labels each finding by evidence type, and never promises rankings.",
    about: [
      "It’s a technical SEO and organic-growth specialist for people responsible for a website’s search performance. It covers crawling, JavaScript rendering, indexing, Search Console analysis, site migrations, international sites, search appearance, content strategy, and growth measurement.",
      "It doesn’t treat every traffic drop as a content problem. It walks the chain from discovery, crawl, render, index, and canonical choice through ranking, impressions, clicks, and conversion, and starts with the first layer that fails.",
      "Findings are labeled as observed, direct platform evidence, official documentation, inferred, missing verification, or proposed experiment. It doesn’t invent keyword volume or Search Console data, claim causality from correlation, or treat special markup as a route into AI search results.",
    ],
    workflow: {
      title: "Investigating declining organic search traffic",
      problem:
        "A site’s organic clicks dropped after a template redesign. The team has Search Console exports and a short page inventory, but no clear cause.",
      input: {
        label: "Search Console audit notes",
        language: "text",
        content: `Last 3 months vs previous 3 months (web, all countries)
Clicks: down 34%. Impressions: down 6%. Avg position: roughly stable.
Biggest losses: /guides/* pages, mostly on mobile.
Redesign shipped mid-period: new guide template, new title format.
Sitemap: about 900 URLs, including some redirected guide URLs.`,
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
        title: "Indexing and rendering",
        description:
          "Works through canonicals, robots and noindex, JavaScript rendering, internal discovery, and sitemap status to find where indexing fails, using URL Inspection only when real access exists.",
      },
      {
        title: "Migrations and release gates",
        description:
          "Maps old URLs one to one, keeps canonicals, hreflang, and sitemaps intact, and marks each release check pass, fail, not run, or blocked. Missing checks never pass.",
      },
      {
        title: "Content and site architecture",
        description:
          "Finds content gaps from real queries and site inventory, sorts pages into improve, consolidate, new, or no action, and gates programmatic page families with pilots and index rules.",
      },
      {
        title: "AI search visibility",
        description:
          "Reviews crawl access, answerable content, and entity clarity for Google’s AI features and Bing grounding. Treats them as built on standard search foundations, with no guaranteed placement.",
      },
    ],
    working: {
      provide: [
        "Search Console exports or screenshots, with date ranges and filters",
        "URLs, rendered HTML, or the site repository",
        "Crawl exports, sitemap, and robots.txt",
        "Planned or past migrations, releases, and template changes",
        "Conversion or analytics data, if you want results tied to outcomes",
      ],
      expect: [
        "Technical SEO audits ordered by impact and confidence",
        "Search Console analyses that separate evidence from inference",
        "Structured data, metadata, and internal-linking plans",
        "Migration plans, go or no-go release checklists, and measurement plans",
      ],
      limits:
        "It has no connectors to Search Console, analytics, your CMS, or a crawler. It works from data you share, plus whatever web, browser, or code tools your chat provides, and can’t guarantee rankings or rich results.",
    },
  },
  imago: {
    style: "creative",
    subject: "Visual design",
    tagline: "From brief to finished visual, without prompt writing.",
    intro:
      "Imago turns briefs, reference images, screenshots, documents, and data into posters, product visuals, icons, infographics, UI concepts, and edits, using the image generation and editing built into ChatGPT.",
    about: [
      "Imago is a visual-first creative and information-design copilot. It suits marketers, designers, founders, and anyone who needs a finished visual rather than advice about one.",
      "It handles new visuals, edits to supplied images, reference-driven work, storyboards, and information design from documents or data. Imago runs no image service of its own. The images come from ChatGPT’s image tools, and Imago supplies the method around them.",
      "Where a chat might return a prompt, Imago produces the image and writes prompts only on request. It infers routine choices like aspect ratio, changes only what you name during edits, and reviews the output when it can see it.",
    ],
    workflow: {
      title: "Developing a poster for an open studio event",
      problem:
        "A small ceramics co-op needs a poster for an open studio weekend. They have a headline, a mood in mind, and a photo of their wheel room, but no designer.",
      input: {
        label: "Creative brief",
        language: "text",
        content: `Poster for our open studio weekend.
Headline, exactly: ‘Open Studio Weekend’
Subline: ‘Clay & Kiln Co-op’
Mood: warm, handmade, earthy palette.
Use the attached wheel-room photo for composition only.`,
      },
      steps: [
        "Classifies the job as a new visual and treats the attached photo as a composition reference, not as content to copy.",
        "Locks the hard constraints: the exact headline and subline, a portrait format suited to a poster, and the earthy palette, without adding dates or claims you didn’t ask for.",
        "Generates the poster with ChatGPT’s image tool, reserving text-safe zones and making routine layout and type choices without a questionnaire.",
        "Checks the rendered spelling and hierarchy, then refines through feedback. The accepted version becomes the baseline, and each round changes only what you name, such as a warmer background.",
      ],
      result:
        "A finished poster image in the conversation, then revised versions as you give feedback. Your exact wording is treated as a hard requirement throughout.",
    },
    expertise: [
      {
        title: "Faithful image edits",
        description:
          "Changes the requested element and preserves identity, product geometry, composition, lighting, and text. Each reference keeps a distinct role: subject, style, composition, or layout.",
      },
      {
        title: "Product and brand visuals",
        description:
          "Mockups and packaging concepts that keep supplied shapes and labels, plus icon concepts built for small sizes. A rendered PNG is never presented as editable vector art.",
      },
      {
        title: "UI concepts and storyboards",
        description:
          "Redesigns supplied screenshots as static concepts that keep the real content, and renders storyboard frames with consistent characters, props, and palette across the sequence.",
      },
      {
        title: "Data-true visuals",
        description:
          "Builds charts and infographics from your values or verified sources, keeping an evidence ledger for current facts. It never invents statistics, dates, or quotes.",
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
        "Imago depends on ChatGPT’s image generation and editing; if those aren’t available, it says so rather than faking a result. Output is a rendered image, not an editable design file, and it can’t inspect files you haven’t shared.",
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
        content: `Mid-range stoneware, electric kiln, fired to cone 6.
Commercial satin glaze, dipped, two coats.
Small pinholes on the outside of three mugs.
Mugs from the top shelf came out clean.
No witness cones in this firing.`,
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
  "build-mcp-apps-agents": {
    style: "technical",
    subject: "MCP",
    tagline: "Build MCP tools and interactive apps for AI hosts.",
    intro:
      "A skills-only plugin for designing, building and testing Model Context Protocol servers, tool contracts and MCP App interfaces. It starts from an idea, API documentation or an existing MCP repository.",
    about: [
      "Build MCP Apps & Agents helps design, implement and test Model Context Protocol servers, tool contracts and host-aware interfaces. It works from a new idea, API documentation or an MCP repository you already have.",
      "It’s for developers and teams who extend AI assistants with interoperable tools. One of its first decisions is whether a tool-only server is enough or whether the workflow benefits from a rendered MCP App interface.",
      "Its workflows cover architecture, typed tools, resources, security, client compatibility, UI quality, debugging and release preparation. It writes and tests code only when the host provides real coding tools. Otherwise it gives you a plan you can act on.",
    ],
    workflow: {
      title: "Turning a task-management API into an interactive MCP App",
      problem:
        "A team has a task-management REST API and wants people to browse and update tasks from inside an AI assistant. They haven’t decided which endpoints should become tools, or whether a UI is worth building.",
      input: {
        label: "API description",
        language: "yaml",
        content: `# Tasks API (excerpt)
GET   /projects/{id}/tasks   ?status=&assignee=
POST  /projects/{id}/tasks   { title, due, assignee }
PATCH /tasks/{id}            { status: open | done }
auth:  OAuth, scopes tasks.read and tasks.write
users: team leads triaging work in chat
hosts: ChatGPT`,
      },
      steps: [
        "Turns the API into a small set of focused tools, such as listing tasks and updating a task’s status. Each tool gets a typed schema, a permission scope and a readable response.",
        "Designs the server and decides whether a ui:// interface helps with browsing tasks, or whether tool-only responses are enough.",
        "Implements the interface and a tool-only fallback with current supported SDK patterns.",
        "Validates protocol behavior, security boundaries around write actions and client compatibility, where the host provides test tools.",
      ],
      result:
        "A structured MCP project with an optional interactive UI, plus integration or testing guidance based on evidence. Tests are reported as passed only when they actually ran.",
    },
    expertise: [
      {
        title: "MCP server design",
        description:
          "Chooses tools, resources, transports, schemas and response contracts, and keeps each tool focused, with a response people can read.",
      },
      {
        title: "Interactive MCP Apps",
        description:
          "Designs interfaces that work inside the host’s sandbox, with useful loading, error and empty states, plus a tool-only fallback when a rendered UI doesn’t help.",
      },
      {
        title: "Security and authentication",
        description:
          "Reviews authorization, permission scopes, external calls and sensitive tool actions.",
      },
      {
        title: "Debugging and compatibility",
        description: "Investigates server failures, differences between hosts and SDK upgrades.",
      },
    ],
    working: {
      provide: [
        "An idea, or a description of what the tools should do",
        "API documentation or an existing MCP repository",
        "The intended users and the actions they need",
        "Supported hosts and any authentication requirements",
      ],
      expect: [
        "Tool names, schemas and permission scopes",
        "A server design with an optional ui:// interface",
        "Implementation files and test results when the host supplies coding tools",
        "A clear, actionable plan when it doesn’t",
      ],
      limits:
        "It’s a skills-only plugin. It has no hosted MCP service, no built-in code runner, no independent agents and no guaranteed deployment. Writing, running and testing code depend on the tools your host provides.",
    },
  },
  "web-mobile-app-builder": {
    style: "technical",
    subject: "App development",
    tagline: "Web and mobile apps with a considered design.",
    intro:
      "A skills-only plugin for creating or improving websites, full-stack apps, PWAs and native or cross-platform mobile apps. It pairs architecture suited to each platform with a clear visual system, realistic states and testing.",
    about: [
      "Web & Mobile App Builder combines product discovery, visual direction, application architecture and implementation guidance. It handles the different constraints of websites, installable web apps, SwiftUI apps for iOS and macOS, Android apps and cross-platform projects.",
      "It’s for founders, designers and developers who are starting a new application or improving an existing one. You can begin from an idea, a screenshot, a Figma reference, a product brief or a repository.",
      "Its focus is design quality grounded in reference research. That means a deliberate visual system, usable states, accessible interactions and independent verification, not one generic template applied to every app.",
    ],
    workflow: {
      title: "An inspection app that has to work without signal",
      problem:
        "A team needs a field-work app for inspectors who often lose signal on site. Records entered offline have to survive and sync later, and the app has to stay usable on a phone outdoors.",
      input: {
        label: "Feature brief",
        language: "text",
        content: `App:        site inspection log (installable web app)
Users:      field inspectors, office reviewers
Devices:    mid-range Android phones, used outdoors
Core tasks: start an inspection, add notes and photos, submit
Offline:    full form entry with no signal, sync when back online
Edge case:  an office edit to a record that is still pending sync
Brand:      existing logo and a navy palette`,
      },
      steps: [
        "Chooses a PWA approach for this brief and maps the essential journeys: starting an inspection, adding notes and photos, and submitting.",
        "Sets the visual direction, typography, layout tokens and responsive interaction states, sized for phone use in the field.",
        "Implements the core data entry and offline behavior with the project tools available in the host.",
        "Reviews accessibility, the sync and recovery states, and evidence from real browser tests before handoff.",
      ],
      result:
        "A project structure and implementation, a visual system and realistic interface states. QA results are documented where execution was available.",
    },
    expertise: [
      {
        title: "Progressive web apps",
        description:
          "Plans installability, offline caching and sync, including what users see while offline and when a sync needs recovering.",
      },
      {
        title: "Visual direction",
        description:
          "Sets typography, layout tokens and responsive interaction states based on reference research, so each app gets its own visual system instead of a generic template.",
      },
      {
        title: "Native and cross-platform",
        description:
          "Uses SwiftUI for iOS and macOS, or Kotlin and Compose for Android. It uses Expo or React Native when a shared stack is justified.",
      },
      {
        title: "Visual and technical QA",
        description:
          "Reviews design fidelity, accessibility, security, performance and regression evidence before handoff.",
      },
    ],
    working: {
      provide: [
        "An idea, a product brief or an existing repository",
        "Screenshots or Figma references",
        "User roles, core tasks and device constraints",
        "Offline needs and any existing brand or UI references",
      ],
      expect: [
        "A build plan for the right platform",
        "Working code where the host’s tools permit",
        "A visual system with realistic interface states",
        "Explicit visual and functional checks",
      ],
      limits:
        "It doesn’t include a hosted app-building backend. Builds, simulators, browser tests and deployment depend on the execution tools and permissions your host provides.",
    },
  },
  "design-game-studio": {
    style: "creative",
    subject: "Game development",
    tagline: "Turn a game idea into a playable slice.",
    intro:
      "A game-development plugin that turns an idea into a small project you can play. It picks a suitable engine, designs the core loop and art direction, and checks controls, collisions and restart with the tools your host provides.",
    about: [
      "Design Game Studio helps plan, build, improve and test 2D, 3D, browser, narrative and mobile games. It covers engine choice, game design, art direction, levels, gameplay systems, audio, debugging, playtesting and release handoffs.",
      "It’s for game creators, indie developers and teams who want a working game, not just a design document. When you ask for a build, it hands the work to an engine-specific workflow instead of stopping at a plan.",
      "It starts with the smallest playable loop: a goal, a challenge, feedback, a win or loss, and a restart. Large maps, shops and progression wait until that loop works. It never calls a game tested without recorded evidence.",
    ],
    workflow: {
      title: "A rooftop platformer from a short brief",
      problem:
        "Someone has an idea for a small browser platformer. They want something they can play on a laptop or a phone, not a long design document.",
      input: {
        label: "Game brief",
        language: "text",
        content:
          "A paper lantern hops across night rooftops to relight the town. It should play in desktop and phone browsers, with flat 2D shapes and a warm glow against a dark blue sky. Light all five lamps and reach the chimney before the wind puts you out.",
      },
      steps: [
        "Fills in a playable brief: the player’s action, the challenge, feedback, win and lose conditions, and restart. Then it records why Phaser, its default for 2D browser games, fits.",
        "Scopes the first vertical slice: one level with movement, jumping, lamps, wind gusts, win and lose, restart, pause and a sound toggle. Extra levels and progression wait.",
        "Sets the art direction around a few visual pillars, a palette and readable silhouettes for hazards. It uses simple placeholders until licensed assets are ready, and records where each asset came from.",
        "Where tools exist, it builds with the project’s scripts and runs a browser smoke test with real key and touch input. It checks console errors, jump gaps, restart, focus loss and resizing.",
      ],
      result:
        "An editable Phaser project with source, setup steps, controls, an asset and license list, and an evidence report of passed, failed and not-run checks. Without execution tools, you get source files and run instructions marked as unverified.",
    },
    expertise: [
      {
        title: "Engine selection",
        description:
          "Phaser for 2D browser games, PlayCanvas for code-first web 3D, Godot for standalone indie projects and Ren’Py for visual novels. Existing Unity or Unreal projects stay where they are.",
      },
      {
        title: "Core loop design",
        description:
          "Defines player actions, game states and difficulty using parameters you can observe, such as speed and spawn counts. Whether the game is fun is left to human playtesters.",
      },
      {
        title: "Art and asset rights",
        description:
          "Visual pillars, palette and readable silhouettes, with an asset register that records each file’s origin and license. It won’t copy protected characters, levels or soundtracks.",
      },
      {
        title: "Evidence-based playtesting",
        description:
          "Separates designed, implemented, run and actually played. A passing build isn’t treated as proof of playability, and fixes go through a bounded fix-and-retest loop.",
      },
    ],
    working: {
      provide: [
        "A short game idea or premise",
        "The target platform and input method",
        "A preferred art style or reference images",
        "Your own assets, with usage rights",
        "An existing project, for changes or bug fixes",
      ],
      expect: [
        "A scoped first playable slice and an engine decision",
        "Editable source, setup steps and controls",
        "An asset list with the origin and license for each file",
        "An evidence report of passed, failed and not-run checks",
      ],
      limits:
        "It’s a skills-only plugin, with no cloud game engine, hosted previews or asset generation service. Building, running and testing depend on the coding, browser and engine tools your host provides. Only human players can judge fun.",
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
