<script lang="ts">
  const staticSteps = [
    'Parse source code into AST',
    'Match patterns against known vulnerability database', 
    'Report all matches as potential vulnerabilities',
    'Team manually triages hundreds of alerts'
  ];

  const dynamicSteps = [
    'Fork chain state with full economic context',
    'Deploy RL agents with extraction reward function',
    'Agents execute real transactions, explore state space', 
    'Generate PoC for each confirmed exploit path'
  ];
</script>

<section class="eng-section" id="comparison">
  <div class="container">
    <div class="eng-section-header">
      <span class="section-label">The Difference</span>
      <h2 class="section-title">Static analysis vs dynamic execution</h2>
    </div>

    <div class="eng-compare-grid">
      <div class="eng-compare-col eng-compare-static">
        <div class="eng-compare-header">
          <span class="eng-compare-header-dot" aria-hidden="true"></span> 
          Static Analysis
        </div>
        <div class="eng-compare-title">Read code. Guess at bugs.</div>
        <div class="eng-compare-desc">
          Scans source code for patterns that match known vulnerability signatures. 
          Reports anything that looks suspicious.
        </div>
        <div class="eng-compare-steps">
          {#each staticSteps as step, index}
            <div class="eng-compare-step">
              <span class="eng-compare-step-num">{index + 1}</span>
              <span>{step}</span>
            </div>
          {/each}
        </div>
        <div class="eng-compare-result">
          Output: 200+ alerts, 95% false positives, weeks of triage
        </div>
      </div>

      <div class="eng-compare-col eng-compare-dynamic">
        <div class="eng-compare-header">
          <span class="eng-compare-header-dot" aria-hidden="true"></span> 
          TestMachine Dynamic Execution
        </div>
        <div class="eng-compare-title">Run code. Prove exploits.</div>
        <div class="eng-compare-desc">
          Forks the blockchain, deploys RL agents, and actually executes attack scenarios. 
          Only reports what was demonstrably exploited.
        </div>
        <div class="eng-compare-steps">
          {#each dynamicSteps as step, index}
            <div class="eng-compare-step">
              <span class="eng-compare-step-num">{index + 1}</span>
              <span>{step}</span>
            </div>
          {/each}
        </div>
        <div class="eng-compare-result">
          Output: 2–5 confirmed findings, 0 false positives, PoC for each
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .eng-section {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
  }
  
  @keyframes sectionFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .eng-section-header {
    text-align: center;
    margin-bottom: 48px;
    animation: sectionFadeIn 0.6s ease both;
  }
  
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 1.5rem;
  }
  
  .eng-compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: var(--border-subtle);
    animation: sectionFadeIn 0.6s ease 0.15s both;
  }
  
  .eng-compare-col {
    background: var(--bg);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
  }
  
  .eng-compare-header {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .eng-compare-header-dot {
    width: 8px;
    height: 8px;
  }
  
  .eng-compare-static .eng-compare-header {
    color: #ef4444;
  }
  .eng-compare-static .eng-compare-header-dot {
    background: #ef4444;
  }
  .eng-compare-dynamic .eng-compare-header {
    color: #22c55e;
  }
  .eng-compare-dynamic .eng-compare-header-dot {
    background: #22c55e;
  }
  
  .eng-compare-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 12px;
  }
  
  .eng-compare-desc {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.7;
    margin-bottom: 20px;
  }
  
  .eng-compare-steps {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 24px;
  }
  
  .eng-compare-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }
  
  .eng-compare-step-num {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 700;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    margin-top: 2px;
  }
  
  .eng-compare-static .eng-compare-step-num {
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.3);
  }
  .eng-compare-dynamic .eng-compare-step-num {
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.3);
  }
  
  .eng-compare-result {
    margin-top: auto;
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .eng-compare-static .eng-compare-result {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }
  
  :global([data-theme="light"]) .eng-compare-static .eng-compare-result {
    color: #ef4444;
  }
  
  .eng-compare-dynamic .eng-compare-result {
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.2);
    color: #86efac;
  }
  
  :global([data-theme="light"]) .eng-compare-dynamic .eng-compare-result {
    color: #16a34a;
  }
  
  @media (max-width: 768px) {
    .eng-compare-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
