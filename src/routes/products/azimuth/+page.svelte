<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // ========================================
  // AZIMUTH DATA & STATE
  // ========================================
  let azFrame: HTMLDivElement | undefined = $state();
  let azObserver: IntersectionObserver | undefined;

  // Azimuth stat elements
  let pdAzInvest: HTMLDivElement | undefined = $state();
  let pdAzConfirm: HTMLDivElement | undefined = $state();
  let pdAzFP: HTMLDivElement | undefined = $state();
  let pdAzTime: HTMLDivElement | undefined = $state();
  let pdAzSignal: HTMLDivElement | undefined = $state();

  // Azimuth counter animation
  function azCounter(el: HTMLElement, target: number, dur: number = 600) {
    const t0 = performance.now();
    (function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    })(t0);
  }

  onMount(() => {
    // Azimuth stats animation
    let azAnimated = false;
    if (azFrame) {
      azObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting && !azAnimated) {
          azAnimated = true;

          setTimeout(function() {
            if (pdAzInvest) azCounter(pdAzInvest, 2);
          }, 300);
          setTimeout(function() {
            if (pdAzConfirm) azCounter(pdAzConfirm, 2);
          }, 500);
          setTimeout(function() {
            if (pdAzFP) pdAzFP.textContent = '0';
          }, 700);
          setTimeout(function() {
            if (pdAzTime) pdAzTime.innerHTML = '12.6<span style="font-size:0.75rem;color:oklch(0.5 0 0)">m</span>';
          }, 900);
          setTimeout(function() {
            if (pdAzSignal) pdAzSignal.style.opacity = '1';
          }, 1100);
        }
      }, { threshold: 0.15 });
      azObserver.observe(azFrame);
    }
  });

  onDestroy(() => {
    azObserver?.disconnect();
  });
</script>

<svelte:head>
  <title>Azimuth — TestMachine</title>
  <meta name="description" content="Azimuth deploys AI agents that actively attack your smart contracts. Running against forked mainnet with real transaction execution. Zero false positives — results in minutes, not weeks." />
  <meta name="keywords" content="Web3 security, smart contract audit, blockchain security, AI security, DeFi security, protocol analysis, penetration testing, azimuth" />
</svelte:head>


<!-- =========================================================
     HERO
     ========================================================= -->
<section class="pd-hero">
  <div class="container">
    <span class="pd-hero-tag">Automated Security Analysis</span>
    <h1 class="pd-hero-title">AI Agents That Actively Attack Your Smart Contracts</h1>
    <p class="pd-hero-sub">Running against forked mainnet environments with real transaction execution, Azimuth probes every function, chains multi-step attacks, and proves exploits end-to-end. If Azimuth reports a vulnerability, it was <strong>actually exploited</strong> — not just theoretically possible.</p>
  </div>
</section>


<!-- =========================================================
     AZIMUTH DEMO
     ========================================================= -->
<section class="pd-section" id="azimuth-product">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">How It Works</span>
      <h2 class="pd-section-title">Azimuth &mdash; Automated Security Analysis</h2>
      <p class="pd-section-desc">Azimuth deploys AI agents — powered by Lodestar, our reinforcement learning engine — that actively attack your smart contracts. Running against forked mainnet environments with real transaction execution, Azimuth probes every function, chains multi-step attacks, and proves exploits end-to-end. If Azimuth reports a vulnerability, it was actually exploited — not just theoretically possible.</p>
      <div class="pd-section-features">
        <span class="pd-feature">AI agents</span>
        <span class="pd-feature">Zero false positives</span>
        <span class="pd-feature">Working PoC for every finding</span>
        <span class="pd-feature">CI/CD integration</span>
      </div>
    </div>

    <div class="pd-frame" data-animate bind:this={azFrame}>
      <!-- Titlebar -->
      <div class="pd-titlebar">
        <div class="pd-titlebar-left">
          <div class="pd-titlebar-dots">
            <span style="background:#ef4444"></span>
            <span style="background:#f59e0b"></span>
            <span style="background:#22c55e"></span>
          </div>
          <div class="pd-titlebar-url"><span class="pd-domain">app.testmachine.ai</span>/azimuth/report/primevault</div>
        </div>
      </div>

      <!-- Report Header -->
      <div class="pd-az-header">
        <div class="pd-az-title">Security Analysis &mdash; testmachine-ai/PrimeVault</div>
        <div class="pd-az-badge pd-az-badge-done">&#10003; Completed</div>
      </div>

      <!-- Stats -->
      <div class="pd-az-stats">
        <div class="pd-az-stat">
          <div class="pd-az-stat-label">Investigated</div>
          <div class="pd-az-stat-val" bind:this={pdAzInvest}>0</div>
        </div>
        <div class="pd-az-stat">
          <div class="pd-az-stat-label">Confirmed</div>
          <div class="pd-az-stat-val pd-az-val-green" bind:this={pdAzConfirm}>0</div>
        </div>
        <div class="pd-az-stat">
          <div class="pd-az-stat-label">False Positives</div>
          <div class="pd-az-stat-val pd-az-val-emerald" bind:this={pdAzFP}>0</div>
        </div>
        <div class="pd-az-stat">
          <div class="pd-az-stat-label">Analysis Time</div>
          <div class="pd-az-stat-val" bind:this={pdAzTime}><span style="font-size:0.75rem;color:oklch(0.5 0 0)">&mdash;</span></div>
        </div>
      </div>

      <!-- Signal Row -->
      <div class="pd-az-signal" bind:this={pdAzSignal} style="opacity:0; transition: opacity 0.4s;">
        <div class="pd-az-signal-badge"><span class="pd-az-signal-dot"></span> 100% signal &middot; 0 false positives</div>
        <div class="pd-az-cost">4.8M tokens &middot; <span class="pd-az-cost-val">$0.05</span> total cost</div>
      </div>

      <!-- Findings -->
      <div class="pd-az-findings">
        <div class="pd-az-findings-head" data-animate>
          Findings
          <span class="pd-sev pd-sev-critical">Critical 1</span>
          <span class="pd-sev pd-sev-low">Low 1</span>
        </div>

        <!-- Finding 1: Critical -->
        <div class="pd-az-finding" data-animate style="transition-delay: 0.15s">
          <div class="pd-az-finding-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="pd-sev pd-sev-critical">Critical</span>
              <span class="pd-az-finding-title">Reentrancy in withdraw() enables fund drainage</span>
            </div>
            <span class="pd-az-confirmed">&#10003; Confirmed</span>
          </div>
          <div class="pd-az-finding-desc">The <code style="color:var(--accent)">withdraw()</code> function sends ETH to the caller before updating internal accounting state. An attacker can deploy a malicious contract that re-enters <code style="color:var(--accent)">withdraw()</code> during the ETH transfer, draining the vault in a single transaction.</div>

          <div class="pd-az-steps-title">Attack Sequence</div>
          <div class="pd-az-step" data-animate style="transition-delay: 0.3s"><span class="pd-az-step-num">1</span> Attacker deposits minimum stake into PrimeVault</div>
          <div class="pd-az-step" data-animate style="transition-delay: 0.4s"><span class="pd-az-step-num">2</span> Attacker calls withdraw() from malicious contract</div>
          <div class="pd-az-step" data-animate style="transition-delay: 0.5s"><span class="pd-az-step-num">3</span> PrimeVault sends ETH via call&#123;value:&#125;</div>
          <div class="pd-az-step" data-animate style="transition-delay: 0.6s"><span class="pd-az-step-num">4</span> Attacker's receive() re-enters withdraw()</div>
          <div class="pd-az-step" data-animate style="transition-delay: 0.7s"><span class="pd-az-step-num">5</span> State not yet updated &mdash; full balance available again</div>
          <div class="pd-az-step" data-animate style="transition-delay: 0.8s"><span class="pd-az-step-num">6</span> Loop repeats until vault is drained</div>

          <div class="pd-code-label" data-animate style="transition-delay: 0.9s">Proof of Concept</div>
          <div class="pd-code" data-animate style="transition-delay: 1.0s">
<code><span class="cm">// SPDX-License-Identifier: MIT</span>
<span class="kw">pragma solidity</span> <span class="str">^0.8.19</span>;

<span class="kw">import</span> <span class="str">"./PrimeVault.sol"</span>;

<span class="kw">contract</span> <span class="type">ReentrancyExploit</span> &#123;
    <span class="type">PrimeVault</span> <span class="kw">public</span> vault;
    <span class="type">uint256</span> <span class="kw">public</span> attackCount;

    <span class="kw">constructor</span>(<span class="type">address</span> _vault) &#123;
        vault = <span class="type">PrimeVault</span>(_vault);
    &#125;

    <span class="kw">function</span> <span class="fn">attack</span>() <span class="kw">external payable</span> &#123;
        vault.deposit&#123;<span class="kw">value</span>: msg.value&#125;();
        vault.withdraw();
    &#125;

    <span class="kw">receive</span>() <span class="kw">external payable</span> &#123;
        <span class="kw">if</span> (attackCount &lt; <span class="num">10</span>) &#123;
            attackCount++;
            vault.withdraw();
        &#125;
    &#125;
&#125;</code>
          </div>
        </div>

        <!-- Finding 2: Low -->
        <div class="pd-az-finding" data-animate style="transition-delay: 0.2s">
          <div class="pd-az-finding-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="pd-sev pd-sev-low">Low</span>
              <span class="pd-az-finding-title">Arithmetic overflow in pendingReward calculation</span>
            </div>
            <span class="pd-az-confirmed">&#10003; Confirmed</span>
          </div>
          <div class="pd-az-finding-desc">The <code style="color:var(--accent)">pendingReward()</code> function can overflow when computing accumulated rewards for accounts with very large staking durations combined with high reward rates. Results in denial of service for affected accounts &mdash; rewards become unclaimable.</div>
        </div>
      </div>
    </div>

    <div class="pd-section-action" data-animate>
      <a href="https://app.testmachine.ai/" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Run Azimuth Analysis &rarr;</a>
    </div>
  </div>
</section>


<!-- =========================================================
     HOW AZIMUTH WORKS (3-step process)
     ========================================================= -->
<section class="pd-section" id="how-azimuth-works">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Process</span>
      <h2 class="pd-section-title">Submit. Fork. Attack. Report.</h2>
    </div>
    <div class="pd-process-grid" data-animate>
      <div class="pd-process-step">
        <div class="pd-process-num">01</div>
        <h3 class="pd-process-name">Submit</h3>
        <p class="pd-process-desc">Point Azimuth at any contract address or GitHub repo. Works with deployed contracts or pre-deployment code.</p>
      </div>
      <div class="pd-process-connector" aria-hidden="true">
        <svg width="40" height="2" viewBox="0 0 40 2"><line x1="0" y1="1" x2="40" y2="1" stroke="var(--border-subtle)" stroke-width="2"/></svg>
      </div>
      <div class="pd-process-step">
        <div class="pd-process-num">02</div>
        <h3 class="pd-process-name">Fork &amp; Attack</h3>
        <p class="pd-process-desc">Azimuth forks live mainnet state and deploys RL agents powered by Lodestar. Agents chain multi-step attacks, probing every function and state transition.</p>
      </div>
      <div class="pd-process-connector" aria-hidden="true">
        <svg width="40" height="2" viewBox="0 0 40 2"><line x1="0" y1="1" x2="40" y2="1" stroke="var(--border-subtle)" stroke-width="2"/></svg>
      </div>
      <div class="pd-process-step">
        <div class="pd-process-num">03</div>
        <h3 class="pd-process-name">Report</h3>
        <p class="pd-process-desc">Every finding includes a working proof-of-concept exploit. Zero false positives &mdash; if Azimuth reports it, it was actually exploited.</p>
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     WHAT AZIMUTH CATCHES (vulnerability classes)
     ========================================================= -->
<section class="pd-section" id="what-azimuth-catches">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Vulnerability Coverage</span>
      <h2 class="pd-section-title">Behavioral vulnerabilities that static analysis misses</h2>
      <p class="pd-section-desc">Azimuth discovers exploit paths through execution, not pattern matching. These vulnerability classes require understanding contract state across sequences of transactions &mdash; exactly what LLMs and static analyzers cannot do.</p>
    </div>
    <div class="pd-vuln-grid" data-animate>
      <div class="pd-vuln-card">
        <div class="pd-vuln-icon">&circlearrowright;</div>
        <h3 class="pd-vuln-name">Reentrancy</h3>
        <p class="pd-vuln-desc">Detects recursive call exploits across single and cross-function patterns, including read-only reentrancy.</p>
      </div>
      <div class="pd-vuln-card">
        <div class="pd-vuln-icon">&zigrarr;</div>
        <h3 class="pd-vuln-name">Flash Loan Attacks</h3>
        <p class="pd-vuln-desc">Discovers multi-step flash loan sequences that manipulate prices, drain pools, or exploit composability gaps.</p>
      </div>
      <div class="pd-vuln-card">
        <div class="pd-vuln-icon">&oplus;</div>
        <h3 class="pd-vuln-name">Access Control</h3>
        <p class="pd-vuln-desc">Finds privilege escalation paths, unprotected admin functions, and misconfigured role hierarchies.</p>
      </div>
      <div class="pd-vuln-card">
        <div class="pd-vuln-icon">&target;</div>
        <h3 class="pd-vuln-name">Oracle Manipulation</h3>
        <p class="pd-vuln-desc">Identifies price feed exploits, TWAP manipulation windows, and stale oracle dependencies.</p>
      </div>
      <div class="pd-vuln-card">
        <div class="pd-vuln-icon">&Delta;</div>
        <h3 class="pd-vuln-name">Economic Logic Flaws</h3>
        <p class="pd-vuln-desc">Uncovers broken incentive structures, sandwich attack vectors, and arbitrage-exploitable pricing curves.</p>
      </div>
      <div class="pd-vuln-card">
        <div class="pd-vuln-icon">&sext;</div>
        <h3 class="pd-vuln-name">Governance Attacks</h3>
        <p class="pd-vuln-desc">Tests voting manipulation, quorum exploitation, timelock bypasses, and proposal hijacking scenarios.</p>
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     AZIMUTH VS TRADITIONAL AUDITS (comparison)
     ========================================================= -->
<section class="pd-section" id="comparison">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Comparison</span>
      <h2 class="pd-section-title">Minutes, not months</h2>
      <p class="pd-section-desc">Azimuth is not a replacement for human auditors &mdash; it is a continuous security layer that catches what point-in-time audits cannot.</p>
    </div>
    <div class="pd-compare-grid" data-animate>
      <div class="pd-compare-header pd-compare-label"></div>
      <div class="pd-compare-header pd-compare-trad">Traditional Audit</div>
      <div class="pd-compare-header pd-compare-az">Azimuth</div>

      <div class="pd-compare-label">Time to results</div>
      <div class="pd-compare-cell pd-compare-trad">4&ndash;8 weeks</div>
      <div class="pd-compare-cell pd-compare-az pd-compare-highlight">Minutes</div>

      <div class="pd-compare-label">Cost</div>
      <div class="pd-compare-cell pd-compare-trad">$50K&ndash;$500K</div>
      <div class="pd-compare-cell pd-compare-az pd-compare-highlight">Fraction of traditional audit cost</div>

      <div class="pd-compare-label">False positives</div>
      <div class="pd-compare-cell pd-compare-trad">Common &mdash; findings require manual triage</div>
      <div class="pd-compare-cell pd-compare-az pd-compare-highlight">Zero &mdash; every finding is a proven exploit</div>

      <div class="pd-compare-label">Output</div>
      <div class="pd-compare-cell pd-compare-trad">PDF report with recommendations</div>
      <div class="pd-compare-cell pd-compare-az pd-compare-highlight">Working PoC exploit code for every finding</div>

      <div class="pd-compare-label">Coverage</div>
      <div class="pd-compare-cell pd-compare-trad">Point-in-time snapshot</div>
      <div class="pd-compare-cell pd-compare-az pd-compare-highlight">Continuous re-analysis as contracts change</div>

      <div class="pd-compare-label">Scalability</div>
      <div class="pd-compare-cell pd-compare-trad">One contract per engagement</div>
      <div class="pd-compare-cell pd-compare-az pd-compare-highlight">Thousands of contracts per day</div>
    </div>
  </div>
</section>


<!-- =========================================================
     WHERE AZIMUTH FITS (integration/workflow)
     ========================================================= -->
<section class="pd-section" id="integration">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Integration</span>
      <h2 class="pd-section-title">Security at every stage</h2>
      <p class="pd-section-desc">From first commit to production monitoring, Azimuth fits into your existing workflow.</p>
    </div>
    <div class="pd-integration-grid" data-animate>
      <div class="pd-vuln-card">
        <span class="pd-integration-tag">Pre-Deployment</span>
        <p class="pd-vuln-desc">Run Azimuth before deploying to mainnet. Catch exploitable vulnerabilities while fixes are still cheap.</p>
      </div>
      <div class="pd-vuln-card">
        <span class="pd-integration-tag">CI/CD Pipeline</span>
        <p class="pd-vuln-desc">Integrate via GitHub Actions or CLI. Every pull request automatically tested for security regressions.</p>
      </div>
      <div class="pd-vuln-card">
        <span class="pd-integration-tag">Continuous Monitoring</span>
        <p class="pd-vuln-desc">Post-deployment, Azimuth continuously re-analyzes as proxy contracts upgrade and external dependencies change.</p>
      </div>
      <div class="pd-vuln-card">
        <span class="pd-integration-tag">Due Diligence</span>
        <p class="pd-vuln-desc">Exchanges, VCs, and protocols use Azimuth to evaluate token and protocol risk before listing or investing.</p>
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     POWERED BY LODESTAR
     ========================================================= -->
<section class="pd-section" id="lodestar">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">The Engine</span>
      <h2 class="pd-section-title">Powered by Lodestar</h2>
    </div>
    <div class="pd-lodestar-layout" data-animate>
      <div class="pd-lodestar-body">
        <p class="pd-lodestar-copy">Lodestar is TestMachine's proprietary reinforcement learning engine. Unlike LLMs that pattern-match against known vulnerability templates, Lodestar agents learn by doing &mdash; interacting with smart contracts through thousands of transaction sequences, receiving reward signals when exploits succeed, and adapting their strategies to each contract's unique logic.</p>
      </div>
      <div class="pd-lodestar-points">
        <div class="pd-lodestar-point">
          <span class="pd-lodestar-marker"></span>
          <span>Learns from every interaction &mdash; agents improve as they explore more contracts</span>
        </div>
        <div class="pd-lodestar-point">
          <span class="pd-lodestar-marker"></span>
          <span>State-aware &mdash; tracks the full contract state across multi-step attack sequences</span>
        </div>
        <div class="pd-lodestar-point">
          <span class="pd-lodestar-marker"></span>
          <span>Novel vulnerability discovery &mdash; finds exploits that have never been documented</span>
        </div>
        <div class="pd-lodestar-point">
          <span class="pd-lodestar-marker"></span>
          <span>Adversarial by design &mdash; attacks contracts the way a real attacker would</span>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     CHAINS
     ========================================================= -->
<section class="pd-section" id="chains">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Coverage</span>
      <h2 class="pd-section-title">Every major EVM chain</h2>
      <p class="pd-section-desc">One engine. Full coverage. Every chain analyzed with the same depth and rigor.</p>
    </div>
    <div class="pd-chains-grid" data-animate>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg"><path fill="#627EEA" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#627EEA" opacity=".6" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#627EEA" d="M127.961 312.187l-1.575 1.92V414.2l1.575 4.6L256 236.587z"/><path fill="#627EEA" opacity=".6" d="M127.962 418.8v-106.61L0 236.585z"/></svg></div>
        <div class="pd-chain-name">Ethereum</div>
      </div>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 111 111" xmlns="http://www.w3.org/2000/svg"><circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF"/><path d="M55.5 22C37 22 22 37 22 55.5S37 89 55.5 89c15.2 0 28-10.1 32.2-24H72.8c-3.5 8-11.4 13.5-17.3 13.5C45.2 78.5 36 69.3 36 55.5S45.2 32.5 55.5 32.5c5.9 0 13.8 5.5 17.3 13.5h14.9C83.5 32.1 70.7 22 55.5 22z" fill="#fff"/></svg></div>
        <div class="pd-chain-name">Base</div>
      </div>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M151.818 141.296L128.065 177.888 104.193 141.296 128.065 0z" fill="#28A0F0"/><path d="M128.065 189.888L104.193 153.296 128.065 256 151.818 153.296z" fill="#28A0F0"/><path d="M128.065 0L40 141.296 128.065 189.888 216.13 141.296z" fill="#28A0F0" opacity=".6"/></svg></div>
        <div class="pd-chain-name">Arbitrum</div>
      </div>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="128" fill="#FF0420"/><path d="M81.4 170.4c-4.8 0-7.6-3.2-6.4-8l22-94.4c1.6-6 7.6-10 13.6-10h38.8c20 0 33.2 12.4 30 30-2 10.8-8.4 19.6-16.8 25.2 6 4 9.2 11.2 7.6 20.4-2.8 16.4-16.8 28.8-34 28.8H81.4zm43.6-14c8.4 0 14.4-6 15.6-13.2 1.2-7.2-3.2-12.8-11.6-12.8h-18l-5.6 26h19.6zm4.8-42c7.6 0 13.2-5.2 14.4-12 1.2-6.4-2.8-11.6-10.4-11.6h-16.4l-5.2 23.6h17.6z" fill="#fff"/></svg></div>
        <div class="pd-chain-name">Optimism</div>
      </div>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M128 0L233.6 60.8v121.6L128 256 22.4 182.4V60.8z" fill="#8247E5"/><path d="M170.4 101.6c-3.2-1.6-7.2-1.6-10.4 0l-24 14.4-16.4 9.2-24 14.4c-3.2 1.6-7.2 1.6-10.4 0l-18.8-11.2c-3.2-1.6-5.2-5.2-5.2-8.8v-21.6c0-3.6 2-7.2 5.2-8.8l18.8-10.8c3.2-1.6 7.2-1.6 10.4 0l18.8 10.8c3.2 1.6 5.2 5.2 5.2 8.8v14.4l16.4-9.6v-14.4c0-3.6-2-7.2-5.2-8.8l-35.2-20.4c-3.2-1.6-7.2-1.6-10.4 0l-36 20.8c-3.2 1.6-5.2 5.2-5.2 8.8v41.2c0 3.6 2 7.2 5.2 8.8l35.6 20.4c3.2 1.6 7.2 1.6 10.4 0l24-13.6 16.4-9.6 24-13.6c3.2-1.6 7.2-1.6 10.4 0l18.8 10.8c3.2 1.6 5.2 5.2 5.2 8.8v21.6c0 3.6-2 7.2-5.2 8.8l-18.4 11.2c-3.2 1.6-7.2 1.6-10.4 0l-18.8-10.8c-3.2-1.6-5.2-5.2-5.2-8.8v-14.4l-16.4 9.6v14.4c0 3.6 2 7.2 5.2 8.8l35.6 20.4c3.2 1.6 7.2 1.6 10.4 0l35.6-20.4c3.2-1.6 5.2-5.2 5.2-8.8v-41.2c0-3.6-2-7.2-5.2-8.8z" fill="#fff"/></svg></div>
        <div class="pd-chain-name">Polygon</div>
      </div>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="128" fill="#E84142"/><path d="M171.8 130.8c4.4-2.4 4.4-8.4 0-10.8L135.6 98c-4.4-2.4-9.6.8-9.6 5.6v43.6c0 4.8 5.2 8 9.6 5.6l36.2-22zm-52.4 30.4c4.4 2.4 9.6-.8 9.6-5.6V112c0-4.8-5.2-8-9.6-5.6l-36.2 22c-4.4 2.4-4.4 8.4 0 10.8l36.2 22z" fill="#fff"/></svg></div>
        <div class="pd-chain-name">Avalanche</div>
      </div>
      <div class="pd-chain-card">
        <div class="pd-chain-icon"><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="128" fill="#F3BA2F"/><path d="M128 60l30 30-30 30-30-30zm50 50l30 30-30 30-30-30zm-100 0l30 30-30 30-30-30zm50 50l30 30-30 30-30-30z" fill="#fff"/></svg></div>
        <div class="pd-chain-name">BNB Chain</div>
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     CTA
     ========================================================= -->
<section class="pd-cta" id="cta">
  <div class="container" data-animate>
    <h2 class="pd-cta-title">Secure your protocol today</h2>
    <p class="pd-cta-sub">RL-powered security analysis with zero false positives. Every finding includes a working proof-of-concept exploit.</p>
    <a href="https://app.testmachine.ai/" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Run Azimuth Analysis</a>
  </div>
</section>


<style>
  /* ========== Azimuth Page Styles ========== */

  /* -- Hero -- */
  .pd-hero {
    padding: calc(var(--nav-h) + 100px) 0 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .pd-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.25 0.04 192 / 0.35) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 75% 40%, oklch(0.22 0.02 220 / 0.2) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 25% 60%, oklch(0.20 0.02 280 / 0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  @keyframes heroFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .pd-hero-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 1.5rem;
    animation: heroFadeIn 0.8s ease 0.2s both;
  }
  .pd-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.035em;
    margin-bottom: 1.5rem;
    color: var(--fg);
    animation: heroFadeIn 0.8s ease 0.4s both;
  }
  .pd-hero-sub {
    font-size: clamp(0.9375rem, 2vw, 1.125rem);
    color: var(--fg-muted);
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.7;
    animation: heroFadeIn 0.8s ease 0.6s both;
  }
  .pd-hero-sub strong {
    color: var(--accent);
    font-weight: 600;
  }

  /* -- Section Shared -- */
  .pd-section {
    padding: var(--section-py) 0;
    border-top: 1px solid var(--border-subtle);
  }
  .pd-section-header {
    margin-bottom: 2.5rem;
  }
  .pd-section-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 0.75rem;
    color: var(--fg);
  }
  .pd-section-desc {
    font-family: var(--font-body);
    color: var(--fg-muted);
    max-width: 640px;
    font-size: 0.9375rem;
    line-height: 1.7;
  }
  .pd-section-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1.25rem;
  }
  .pd-feature {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    padding: 4px 12px;
    background: oklch(0.22 0.005 260);
    border: 1px solid var(--border-subtle);
    color: var(--fg-muted);
  }
  :global([data-theme="light"]) .pd-feature {
    background: oklch(0.92 0.003 260);
  }
  .pd-section-action {
    margin-top: 2rem;
  }

  /* -- Mock Frame Shared -- */
  .pd-frame {
    background: oklch(0.13 0.005 260);
    border: 1px solid oklch(0.25 0.005 260);
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    line-height: 1.5;
  }
  :global([data-theme="light"]) .pd-frame {
    background: oklch(0.97 0 0);
    border-color: oklch(0.85 0 0);
  }
  .pd-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: oklch(0.16 0.005 260);
    border-bottom: 1px solid oklch(0.22 0 0);
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }
  :global([data-theme="light"]) .pd-titlebar {
    background: oklch(0.94 0 0);
    border-color: oklch(0.85 0 0);
  }
  .pd-titlebar-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pd-titlebar-dots {
    display: flex;
    gap: 6px;
  }
  .pd-titlebar-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .pd-titlebar-url {
    font-size: 0.6875rem;
    color: oklch(0.45 0 0);
  }
  .pd-titlebar-url .pd-domain {
    color: oklch(0.65 0 0);
  }

  /* ================================
     AZIMUTH MOCK
     ================================ */
  .pd-az-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid oklch(0.22 0 0);
  }
  .pd-az-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: oklch(0.9 0 0);
  }
  :global([data-theme="light"]) .pd-az-title { color: oklch(0.15 0 0); }
  .pd-az-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.6875rem;
    font-weight: 500;
    padding: 3px 10px;
  }
  .pd-az-badge-done {
    color: #22c55e;
    background: rgba(34,197,94,0.1);
  }

  .pd-az-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: oklch(0.22 0 0);
    border-bottom: 1px solid oklch(0.22 0 0);
  }
  .pd-az-stat {
    background: oklch(0.15 0 0);
    padding: 16px 20px;
    text-align: center;
  }
  :global([data-theme="light"]) .pd-az-stat { background: oklch(0.96 0 0); }
  .pd-az-stat-label {
    font-size: 0.625rem;
    color: oklch(0.45 0 0);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .pd-az-stat-val {
    font-size: 1.5rem;
    font-weight: 700;
    color: oklch(0.9 0 0);
    font-variant-numeric: tabular-nums;
  }
  :global([data-theme="light"]) .pd-az-stat-val { color: oklch(0.15 0 0); }
  .pd-az-val-green { color: #22c55e; }
  .pd-az-val-emerald { color: #10b981; }

  .pd-az-signal {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid oklch(0.22 0 0);
    font-size: 0.6875rem;
  }
  .pd-az-signal-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #22c55e;
    font-weight: 500;
  }
  .pd-az-signal-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
  }
  .pd-az-cost {
    color: oklch(0.45 0 0);
  }
  .pd-az-cost-val { color: var(--accent); }

  /* Findings */
  .pd-az-findings {
    padding: 20px;
  }
  .pd-az-findings-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: oklch(0.85 0 0);
  }
  :global([data-theme="light"]) .pd-az-findings-head { color: oklch(0.2 0 0); }
  .pd-sev {
    font-size: 0.5625rem;
    font-weight: 600;
    padding: 2px 8px;
    letter-spacing: 0.02em;
  }
  .pd-sev-critical { background: #7f1d1d; color: #fca5a5; }
  .pd-sev-high { background: #7c2d12; color: #fdba74; }
  .pd-sev-medium { background: #78350f; color: #fcd34d; }
  .pd-sev-low { background: #14532d; color: #bbf7d0; }
  :global([data-theme="light"]) .pd-sev-critical { background: #fef2f2; color: #dc2626; }
  :global([data-theme="light"]) .pd-sev-high { background: #fff7ed; color: #ea580c; }
  :global([data-theme="light"]) .pd-sev-low { background: #f0fdf4; color: #16a34a; }

  .pd-az-finding {
    padding: 16px;
    background: oklch(0.15 0.005 260);
    border: 1px solid oklch(0.22 0 0);
    margin-bottom: 12px;
  }
  :global([data-theme="light"]) .pd-az-finding {
    background: oklch(0.96 0 0);
    border-color: oklch(0.88 0 0);
  }
  .pd-az-finding-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .pd-az-finding-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: oklch(0.9 0 0);
  }
  :global([data-theme="light"]) .pd-az-finding-title { color: oklch(0.15 0 0); }
  .pd-az-confirmed {
    color: #22c55e;
    font-weight: 500;
    font-size: 0.6875rem;
  }
  .pd-az-finding-desc {
    font-size: 0.75rem;
    color: oklch(0.6 0 0);
    line-height: 1.6;
    margin-bottom: 12px;
  }
  :global([data-theme="light"]) .pd-az-finding-desc { color: oklch(0.4 0 0); }

  /* Attack Steps */
  .pd-az-steps-title {
    font-size: 0.6875rem;
    font-weight: 600;
    color: oklch(0.55 0 0);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
  }
  .pd-az-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 6px 0;
    font-size: 0.75rem;
    color: oklch(0.65 0 0);
    line-height: 1.5;
  }
  :global([data-theme="light"]) .pd-az-step { color: oklch(0.4 0 0); }
  .pd-az-step-num {
    font-weight: 700;
    color: var(--accent);
    min-width: 16px;
    flex-shrink: 0;
  }

  /* PoC Code Block */
  .pd-code-label {
    font-size: 0.625rem;
    font-weight: 600;
    color: oklch(0.5 0 0);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 16px 0 8px;
  }
  .pd-code {
    background: oklch(0.1 0.005 260);
    border: 1px solid oklch(0.22 0 0);
    padding: 16px 20px;
    overflow-x: auto;
    font-size: 0.6875rem;
    line-height: 1.7;
  }
  :global([data-theme="light"]) .pd-code {
    background: oklch(0.95 0 0);
    border-color: oklch(0.85 0 0);
  }
  .pd-code code {
    font-family: var(--font-mono);
    color: oklch(0.7 0 0);
  }
  .pd-code :global(.kw) { color: #c084fc; }
  .pd-code :global(.fn) { color: #60a5fa; }
  .pd-code :global(.str) { color: #86efac; }
  .pd-code :global(.cm) { color: oklch(0.4 0 0); }
  .pd-code :global(.num) { color: #fcd34d; }
  .pd-code :global(.type) { color: #22d3ee; }

  /* ================================
     EVM CHAINS SECTION
     ================================ */
  .pd-chains-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--gap);
  }
  .pd-chain-card {
    padding: 24px 16px;
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    text-align: center;
    transition: border-color var(--transition), transform var(--transition);
  }
  .pd-chain-card:hover {
    border-color: var(--border);
    transform: translateY(-2px);
  }
  .pd-chain-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pd-chain-icon svg {
    width: 36px;
    height: 36px;
  }
  .pd-chain-name {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--fg);
  }

  /* ================================
     CTA
     ================================ */
  .pd-cta {
    padding: var(--section-py) 0;
    border-top: 2px solid var(--accent);
    text-align: center;
    position: relative;
  }
  .pd-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, oklch(0.72 0.12 192 / 0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .pd-cta-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
    color: var(--fg);
  }
  .pd-cta-sub {
    color: var(--fg-muted);
    font-size: 0.9375rem;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  /* ================================
     HOW AZIMUTH WORKS (3-step process)
     ================================ */
  .pd-process-grid {
    display: flex;
    align-items: flex-start;
    gap: 0;
    justify-content: center;
  }
  .pd-process-step {
    flex: 1;
    max-width: 320px;
    padding: 28px 24px;
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
  }
  .pd-process-step:hover {
    border-color: var(--border);
  }
  .pd-process-num {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }
  .pd-process-name {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 0.5rem;
  }
  .pd-process-desc {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.65;
  }
  .pd-process-connector {
    display: flex;
    align-items: center;
    padding: 0 8px;
    flex-shrink: 0;
    align-self: center;
  }

  /* ================================
     WHAT AZIMUTH CATCHES (vulnerability grid)
     ================================ */
  .pd-vuln-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
  }
  .pd-vuln-card {
    padding: 28px 24px;
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    transition: border-color var(--transition);
  }
  .pd-vuln-card:hover {
    border-color: var(--border);
  }
  .pd-vuln-icon {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 0.75rem;
    line-height: 1;
  }
  .pd-vuln-name {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 0.5rem;
  }
  .pd-vuln-desc {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    color: var(--fg-muted);
    line-height: 1.65;
  }

  /* ================================
     COMPARISON GRID
     ================================ */
  .pd-compare-grid {
    display: grid;
    grid-template-columns: 160px 1fr 1fr;
    gap: 1px;
    background: var(--border-subtle);
    border: 1px solid var(--border-subtle);
  }
  .pd-compare-header {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 14px 20px;
    background: oklch(0.16 0.005 260);
    color: var(--fg-muted);
  }
  :global([data-theme="light"]) .pd-compare-header {
    background: oklch(0.94 0 0);
  }
  .pd-compare-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 16px 20px;
    background: oklch(0.14 0.005 260);
    color: var(--fg);
    display: flex;
    align-items: center;
  }
  :global([data-theme="light"]) .pd-compare-label {
    background: oklch(0.96 0 0);
  }
  .pd-compare-cell {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    padding: 16px 20px;
    color: var(--fg-muted);
    line-height: 1.5;
    display: flex;
    align-items: center;
  }
  .pd-compare-cell.pd-compare-trad {
    background: oklch(0.14 0.005 260);
  }
  :global([data-theme="light"]) .pd-compare-cell.pd-compare-trad {
    background: oklch(0.97 0 0);
  }
  .pd-compare-cell.pd-compare-az {
    background: oklch(0.15 0.005 260);
  }
  :global([data-theme="light"]) .pd-compare-cell.pd-compare-az {
    background: oklch(0.96 0 0);
  }
  .pd-compare-highlight {
    color: var(--fg);
    border-top: 2px solid var(--accent);
  }
  .pd-compare-header.pd-compare-az {
    color: var(--accent);
    border-top: 2px solid var(--accent);
  }

  /* ================================
     INTEGRATION GRID
     ================================ */
  .pd-integration-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap);
  }
  .pd-integration-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }

  /* ================================
     POWERED BY LODESTAR
     ================================ */
  .pd-lodestar-layout {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 48px;
    align-items: start;
  }
  .pd-lodestar-copy {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: var(--fg-muted);
    line-height: 1.75;
  }
  .pd-lodestar-points {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .pd-lodestar-point {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.6;
  }
  .pd-lodestar-marker {
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    margin-top: 7px;
    background: var(--accent);
  }

  /* -- Responsive -- */
  @media (max-width: 900px) {
    .pd-chains-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .pd-vuln-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-compare-grid {
      grid-template-columns: 120px 1fr 1fr;
    }
    .pd-lodestar-layout {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
  @media (max-width: 768px) {
    .pd-az-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-chains-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .pd-process-grid {
      flex-direction: column;
      align-items: stretch;
    }
    .pd-process-step {
      max-width: none;
    }
    .pd-process-connector {
      display: none;
    }
    .pd-integration-grid {
      grid-template-columns: 1fr;
    }
    .pd-compare-grid {
      grid-template-columns: 100px 1fr 1fr;
      font-size: 0.75rem;
    }
  }
  @media (max-width: 480px) {
    .pd-chains-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-section-features {
      gap: 6px;
    }
    .pd-vuln-grid {
      grid-template-columns: 1fr;
    }
    .pd-compare-grid {
      grid-template-columns: 80px 1fr 1fr;
    }
    .pd-compare-label,
    .pd-compare-cell {
      padding: 12px 10px;
      font-size: 0.6875rem;
    }
  }
</style>
