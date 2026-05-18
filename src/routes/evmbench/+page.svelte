<script lang="ts">
  import { onMount } from 'svelte';

  type Entry = {
    name: string;
    org: string;
    type: 'agent' | 'base';
    recall: number;       // percent shown on x-axis
    found: number;
    total: number;
    sourceLabel: string;
    sourceUrl: string;
    note?: string;
    self?: boolean;
    pending?: boolean;
  };

  /* Entries pulled directly from public results:
     – Nethermind AuditAgent: 80/120 (67%) – Nethermind X post 2025
     – Guardix: 70/117 (59.8% recall) – Guardix blog post
     – Base-model bars (Claude / GPT-5 family): values from the Nethermind
       EVMBench/03 results chart (image included in original tweet thread). */
  const entries: Entry[] = [
    {
      name: 'AuditAgent',
      org: 'Nethermind Security',
      type: 'agent',
      recall: 67,
      found: 80,
      total: 120,
      sourceLabel: '@NethermindSec on X',
      sourceUrl: 'https://x.com/NethermindSec/status/2032407080498242025'
    },
    {
      name: 'Guardix',
      org: 'Guardix',
      type: 'agent',
      recall: 59.8,
      found: 70,
      total: 117,
      sourceLabel: 'guardix.dev/blog',
      sourceUrl: 'https://guardix.dev/blog/evmbench-benchmark-results/',
      note: 'Scored on 117 high-severity findings (Guardix methodology).'
    },
    {
      name: 'Azimuth',
      org: 'TestMachine',
      type: 'agent',
      recall: 0,
      found: 0,
      total: 120,
      sourceLabel: 'Run in progress',
      sourceUrl: '/products/azimuth',
      self: true,
      pending: true
    },
    {
      name: 'Claude Opus 4.6',
      org: 'Anthropic (base model)',
      type: 'base',
      recall: 47,
      found: 56,
      total: 120,
      sourceLabel: 'Nethermind benchmark chart',
      sourceUrl: 'https://x.com/NethermindSec/status/2032407080498242025'
    },
    {
      name: 'GPT-5.2',
      org: 'OpenAI (base model)',
      type: 'base',
      recall: 38,
      found: 45,
      total: 120,
      sourceLabel: 'Nethermind benchmark chart',
      sourceUrl: 'https://x.com/NethermindSec/status/2032407080498242025'
    },
    {
      name: 'GPT-5.3 Codex',
      org: 'OpenAI (base model)',
      type: 'base',
      recall: 36,
      found: 43,
      total: 120,
      sourceLabel: 'Nethermind benchmark chart',
      sourceUrl: 'https://x.com/NethermindSec/status/2032407080498242025'
    },
    {
      name: 'GPT-5.2 Codex',
      org: 'OpenAI (base model)',
      type: 'base',
      recall: 33,
      found: 39,
      total: 120,
      sourceLabel: 'Nethermind benchmark chart',
      sourceUrl: 'https://x.com/NethermindSec/status/2032407080498242025'
    },
    {
      name: 'GPT-5',
      org: 'OpenAI (base model)',
      type: 'base',
      recall: 21,
      found: 25,
      total: 120,
      sourceLabel: 'Nethermind benchmark chart',
      sourceUrl: 'https://x.com/NethermindSec/status/2032407080498242025'
    }
  ].sort((a, b) => {
    // Pin our own entry to the top regardless of score
    if (a.self && !b.self) return -1;
    if (b.self && !a.self) return 1;
    return b.recall - a.recall;
  });

  // Defer bar animation until visible
  let board: HTMLElement | undefined = $state();
  let animated = $state(false);
  onMount(() => {
    if (!board) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          animated = true;
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(board);
    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>EVMBench Leaderboard — AI Smart Contract Auditors</title>
  <meta
    name="description"
    content="Public leaderboard of AI smart-contract security tools on EVMBench — the OpenAI benchmark of 120 ground-truth vulnerabilities across 40 Code4rena audits. AuditAgent, Guardix, Claude, GPT-5 and more."
  />
  <meta name="keywords" content="EVMBench, AI security benchmark, smart contract audit, Nethermind AuditAgent, Guardix, Code4rena, leaderboard" />
  <meta property="og:title" content="EVMBench Leaderboard — AI Smart Contract Auditors" />
  <meta property="og:description" content="120 vulnerabilities. 40 Code4rena audits. One scoreboard." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://testmachine.ai/evmbench" />
</svelte:head>

<!-- ==================== HERO ==================== -->
<section class="lb-hero">
  <div class="container">
    <span class="lb-tag">Open Benchmark · AI Security</span>
    <h1 class="lb-title">The EVMBench Leaderboard</h1>
    <p class="lb-sub">
      <strong>EVMBench</strong> is a standardized benchmark built by OpenAI for AI vulnerability detection on EVM
      smart contracts: <strong>120 ground-truth vulnerabilities</strong> across <strong>40 Code4rena audits</strong>.
      Vendors keep publishing one-off numbers. No one has put them on a single board — so we did.
    </p>
    <div class="lb-meta">
      <div class="lb-meta-item">
        <span class="lb-meta-n">40</span>
        <span class="lb-meta-l">Repositories</span>
      </div>
      <div class="lb-meta-item">
        <span class="lb-meta-n">120</span>
        <span class="lb-meta-l">Vulnerabilities</span>
      </div>
      <div class="lb-meta-item">
        <span class="lb-meta-n">{entries.filter(e => !e.pending).length}</span>
        <span class="lb-meta-l">Published results</span>
      </div>
    </div>
  </div>
</section>

<!-- ==================== LEADERBOARD ==================== -->
<section class="lb-board-wrap">
  <div class="container">
    <div class="lb-header">
      <span class="lb-col-rank">#</span>
      <span class="lb-col-name">Model / Agent</span>
      <span class="lb-col-bar">Detection Recall</span>
      <span class="lb-col-found">Found</span>
    </div>

    <div bind:this={board} class="lb-rows">
      {#each entries as e, i (e.name)}
        <div class="lb-row" class:lb-row--agent={e.type === 'agent'} class:lb-row--self={e.self}>
          <span class="lb-rank">{i + 1}</span>

          <div class="lb-name">
            <div class="lb-name-main">
              {e.name}
              {#if e.self}<span class="lb-self-tag">Our entry</span>{/if}
              {#if e.type === 'agent' && !e.self}<span class="lb-type-tag">Agent</span>{/if}
              {#if e.type === 'base'}<span class="lb-type-tag lb-type-tag--base">Base model</span>{/if}
            </div>
            <div class="lb-name-org">{e.org}</div>
            {#if e.note}<div class="lb-name-note">{e.note}</div>{/if}
          </div>

          <div class="lb-bar-cell">
            {#if e.pending}
              <div class="lb-bar lb-bar--pending">
                <span class="lb-bar-label">Pending</span>
              </div>
            {:else}
              <div class="lb-bar" class:lb-bar--agent={e.type === 'agent'}>
                <div
                  class="lb-bar-fill"
                  style="width: {animated ? e.recall : 0}%"
                ></div>
                <span class="lb-bar-label">{e.recall}%</span>
              </div>
            {/if}
          </div>

          <div class="lb-found">
            {#if e.pending}
              <span class="lb-found-dim">—</span>
            {:else}
              <span class="lb-found-main">{e.found}<span class="lb-found-slash">/</span>{e.total}</span>
            {/if}
            <a class="lb-source" href={e.sourceUrl} target="_blank" rel="noopener noreferrer">
              {e.sourceLabel} ↗
            </a>
          </div>
        </div>
      {/each}
    </div>

    <p class="lb-disclaimer">
      Results are self-reported by each vendor. We have not independently re-run other vendors' pipelines.
      Bars are shown to a common 100% scale; denominators differ where noted (e.g. Guardix scores against
      117 high-severity findings rather than the full 120).
    </p>
  </div>
</section>

<!-- ==================== METHODOLOGY ==================== -->
<section class="lb-section lb-section--alt">
  <div class="container lb-two-col">
    <div>
      <span class="section-label">What EVMBench measures</span>
      <h2 class="lb-h2">Real audits. Real bugs. No leakage.</h2>
      <p class="lb-p">
        EVMBench was assembled by OpenAI from <strong>40 historical Code4rena audit contests</strong>.
        Each repo ships with its ground-truth list of confirmed vulnerabilities. A tool runs against the
        unmodified source and emits findings; recall is the fraction of ground-truth bugs the tool surfaced.
      </p>
      <p class="lb-p">
        Unlike synthetic CTF challenges, every bug here was found by a human auditor against money already
        live on-chain. That makes EVMBench the closest thing the industry has to a fair, public scoreboard.
      </p>
    </div>
    <div>
      <span class="section-label">How to read the board</span>
      <ul class="lb-list">
        <li><strong>Agent</strong> — multi-step system with tools, retrieval, and pipeline logic.</li>
        <li><strong>Base model</strong> — an LLM prompted directly, no tooling or orchestration.</li>
        <li><strong>Recall</strong> — % of ground-truth vulns the system detected before any manual review.</li>
        <li><strong>Found</strong> — raw count / denominator the vendor scored against.</li>
      </ul>
    </div>
  </div>
</section>

<!-- ==================== SUBMIT YOUR RESULT ==================== -->
<section class="lb-section">
  <div class="container lb-cta">
    <span class="section-label">Submit a result</span>
    <h2 class="lb-h2">Run EVMBench? We'll add you.</h2>
    <p class="lb-p">
      Publish your full results — repo-by-repo recall, false-positive count, and the script you ran —
      and we'll list your entry. We're tracking AuditAgent, Guardix, and the base models above.
      Olympix, Cyfrin, Cantina, Spearbit, ChainPatrol, ConsenSys Diligence — if you have numbers, send them.
    </p>
    <div class="lb-cta-actions">
      <a class="btn btn--primary" href="/#contact">Submit your run</a>
      <a class="btn btn--ghost" href="/products/azimuth">See how Azimuth works →</a>
    </div>
  </div>
</section>

<!-- ==================== SOURCES ==================== -->
<section class="lb-section lb-section--alt">
  <div class="container">
    <span class="section-label">Sources</span>
    <h2 class="lb-h2">Where these numbers come from</h2>
    <div class="lb-sources">
      <a class="lb-source-card" href="https://x.com/NethermindSec/status/2032407080498242025" target="_blank" rel="noopener noreferrer">
        <div class="lb-source-card-org">Nethermind Security</div>
        <div class="lb-source-card-title">AuditAgent: 80/120 (67%) on EVMBench</div>
        <div class="lb-source-card-meta">x.com/NethermindSec ↗</div>
      </a>
      <a class="lb-source-card" href="https://guardix.dev/blog/evmbench-benchmark-results/" target="_blank" rel="noopener noreferrer">
        <div class="lb-source-card-org">Guardix</div>
        <div class="lb-source-card-title">59.8% recall across 117 high-severity vulnerabilities</div>
        <div class="lb-source-card-meta">guardix.dev/blog ↗</div>
      </a>
      <a class="lb-source-card" href="https://x.com/NethermindSec/status/2032407080498242025" target="_blank" rel="noopener noreferrer">
        <div class="lb-source-card-org">Nethermind (chart)</div>
        <div class="lb-source-card-title">Claude Opus 4.6 / GPT-5 family base-model recall</div>
        <div class="lb-source-card-meta">EVMBench // 03 slide ↗</div>
      </a>
    </div>
  </div>
</section>

<style>
  /* ---------- shared ---------- */
  .section-label {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg-muted);
    margin-bottom: 0.75rem;
  }

  .container {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 40px);
  }

  .lb-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.625rem, 3.2vw, 2.25rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0 0 1rem;
  }

  .lb-p {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--fg-muted);
    line-height: 1.7;
    margin: 0 0 1rem;
  }

  /* ---------- hero ---------- */
  .lb-hero {
    padding: calc(var(--nav-h) + 64px) 0 56px;
    border-bottom: 1px solid var(--border-subtle);
    background:
      radial-gradient(ellipse at top, var(--accent-glow), transparent 60%),
      var(--bg);
  }

  .lb-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    border: 1px solid var(--border);
    padding: 6px 12px;
    margin-bottom: 1.25rem;
  }

  .lb-title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin: 0 0 1.25rem;
  }

  .lb-sub {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    color: var(--fg-muted);
    line-height: 1.65;
    max-width: 780px;
    margin: 0 0 2rem;
  }

  .lb-meta {
    display: flex;
    gap: clamp(24px, 5vw, 56px);
    flex-wrap: wrap;
  }

  .lb-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lb-meta-n {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
  }

  .lb-meta-l {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--fg-muted);
  }

  /* ---------- board ---------- */
  .lb-board-wrap {
    padding: 56px 0 80px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .lb-header,
  .lb-row {
    display: grid;
    grid-template-columns: 40px minmax(180px, 1.2fr) minmax(220px, 2fr) minmax(140px, 0.9fr);
    gap: 16px;
    align-items: center;
  }

  .lb-header {
    padding: 0 16px 12px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--fg-muted);
    border-bottom: 1px solid var(--border);
  }

  .lb-rows {
    display: flex;
    flex-direction: column;
  }

  .lb-row {
    padding: 20px 16px;
    border-bottom: 1px solid var(--border-subtle);
    transition: background var(--transition);
  }

  .lb-row:hover {
    background: var(--bg-raised);
  }

  .lb-row--self {
    background: var(--accent-glow);
  }

  .lb-rank {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--fg-muted);
    font-weight: 600;
  }

  .lb-name-main {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.0625rem;
    color: var(--fg);
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lb-row--agent .lb-name-main { color: var(--fg); }

  .lb-name-org {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
    margin-top: 2px;
  }

  .lb-name-note {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--fg-dim);
    margin-top: 6px;
    line-height: 1.4;
  }

  .lb-type-tag,
  .lb-self-tag {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 2px 6px;
    border: 1px solid var(--border);
    color: var(--fg-muted);
  }

  .lb-type-tag--base {
    color: var(--fg-dim);
  }

  .lb-self-tag {
    color: var(--accent);
    border-color: var(--accent);
  }

  /* bars */
  .lb-bar-cell { width: 100%; }

  .lb-bar {
    position: relative;
    width: 100%;
    height: 28px;
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    overflow: hidden;
  }

  .lb-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-hover));
    transition: width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .lb-row:not(.lb-row--agent) .lb-bar-fill {
    background: linear-gradient(90deg, var(--fg-dim), var(--fg-muted));
    opacity: 0.55;
  }

  .lb-bar--pending {
    background: repeating-linear-gradient(
      45deg,
      var(--bg-raised),
      var(--bg-raised) 6px,
      var(--bg) 6px,
      var(--bg) 12px
    );
  }

  .lb-bar-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--fg);
    mix-blend-mode: difference;
    color: oklch(0.95 0 0);
  }

  .lb-found {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .lb-found-main {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--fg);
    font-size: 1rem;
  }

  .lb-found-slash {
    color: var(--fg-dim);
    margin: 0 1px;
  }

  .lb-found-dim {
    color: var(--fg-dim);
    font-family: var(--font-mono);
  }

  .lb-source {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--fg-muted);
    text-decoration: none;
    transition: color var(--transition);
  }

  .lb-source:hover { color: var(--accent); }

  .lb-disclaimer {
    margin: 32px 16px 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-dim);
    line-height: 1.6;
    max-width: 820px;
  }

  /* ---------- sections ---------- */
  .lb-section {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .lb-section--alt {
    background: var(--bg-raised);
  }

  .lb-two-col {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 56px;
    align-items: start;
  }

  .lb-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--fg-muted);
    line-height: 1.6;
  }

  .lb-list li {
    padding-left: 16px;
    border-left: 2px solid var(--border);
  }

  .lb-list strong { color: var(--fg); }

  .lb-cta {
    max-width: 760px;
  }

  .lb-cta-actions {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    flex-wrap: wrap;
  }

  /* ---------- sources ---------- */
  .lb-sources {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 12px;
  }

  .lb-source-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 24px;
    background: var(--bg);
    border: 1px solid var(--border-subtle);
    text-decoration: none;
    transition: border-color var(--transition), transform var(--transition);
  }

  .lb-source-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .lb-source-card-org {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
  }

  .lb-source-card-title {
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--fg);
    font-size: 1rem;
    line-height: 1.35;
  }

  .lb-source-card-meta {
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
  }

  /* ---------- responsive ---------- */
  @media (max-width: 860px) {
    .lb-header { display: none; }

    .lb-row {
      grid-template-columns: 32px 1fr;
      grid-template-areas:
        "rank name"
        ".    bar"
        ".    found";
      row-gap: 10px;
    }

    .lb-rank { grid-area: rank; }
    .lb-name { grid-area: name; }
    .lb-bar-cell { grid-area: bar; }
    .lb-found {
      grid-area: found;
      flex-direction: row;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }

    .lb-two-col { grid-template-columns: 1fr; gap: 32px; }
    .lb-sources { grid-template-columns: 1fr; }
  }
</style>
