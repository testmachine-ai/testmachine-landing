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
  let pdAzTime: HTMLDivElement | undefined = $state();
  let pdAzSignal: HTMLDivElement | undefined = $state();

  function teScoreColor(score: number): string {
    if (score <= -60) return '#ef4444';
    if (score <= -20) return '#f97316';
    if (score <= 0) return '#eab308';
    if (score <= 59) return 'oklch(0.55 0 0)';
    return '#22c55e';
  }

  function teFactorCls(level: string): string {
    return 'pd-te-factor-' + level;
  }

  // teRender builds the detail panel HTML from the hardcoded teTokens array.
  // All data is static/trusted (no user input), so innerHTML is safe here.
  function teRender(idx: number) {
    if (!teDetail) return;
    const t = teTokens[idx];
    const sc = teScoreColor(t.score);
    const marker = ((t.score + 100) / 200) * 100;
    const scorePrefix = t.score > 0 ? '+' : '';

    let h = '<div class="pd-te-detail-head">';
    h += '<div class="pd-te-detail-name"><strong>' + t.name + '</strong> ' + t.sub;
    if (t.contract) h += ' &middot; <span class="pd-te-dim">' + t.contract + '</span>';
    h += '</div>';
    h += '<div class="pd-te-detail-meta">' + t.chain;
    if (t.block) h += ' &middot; Block ' + t.block;
    if (t.verified) h += ' &middot; <span class="pd-te-verified">&#10003; Verified</span>';
    else h += ' &middot; <span style="color:#f97316">Unverified</span>';
    h += '</div></div>';

    h += '<div class="pd-te-detail-grid">';
    h += '<div class="pd-te-risk-panel">';
    h += '<div class="pd-te-risk-big" style="color:' + sc + '">' + scorePrefix + t.score + '</div>';
    h += '<div class="pd-te-risk-label" style="color:' + sc + '">' + t.riskLabel + '</div>';
    h += '<div class="pd-te-risk-bar"><div class="pd-te-risk-track"><div class="pd-te-risk-marker" style="left:' + marker + '%;background:' + sc + '"></div></div>';
    h += '<div class="pd-te-risk-labels"><span>-100</span><span>0</span><span>+100</span></div></div>';
    h += '</div>';

    h += '<div class="pd-te-factors">';
    t.factors.forEach(function(f) {
      const prefix = (f[0] as number) > 0 ? '+' : '';
      h += '<div class="pd-te-factor"><span class="pd-te-factor-score ' + teFactorCls(f[1] as string) + '">' + prefix + f[0] + '</span>';
      h += '<div class="pd-te-factor-info-wrap"><strong>' + f[2] + '</strong><span>' + f[3] + '</span></div></div>';
    });
    h += '</div></div>';

    h += '<div class="pd-te-behaviors"><div class="pd-te-behaviors-title">Detected Behaviors</div>';
    if (t.behaviors.length === 0) {
      h += '<div class="pd-te-no-behaviors">&#10003; No risky behaviors detected</div>';
    } else {
      t.behaviors.forEach(function(b) {
        h += '<div class="pd-te-behav-item"><div class="pd-te-behav-dot pd-te-dot-' + b[0] + '"></div>';
        h += '<div class="pd-te-behav-info"><div class="pd-te-behav-cat">' + b[1] + '</div>';
        h += '<div class="pd-te-behav-fn">' + b[2] + '</div>';
        if (b[3]) h += '<div class="pd-te-behav-auth">Authority: ' + b[3] + '</div>';
        h += '</div></div>';
      });
    }
    h += '</div>';

    teDetail.innerHTML = h;
  }

  function teSelect(idx: number) {
    teCurrentIdx = idx;
    if (teDetail) {
      teDetail.classList.add('pd-te-fading');
      setTimeout(function() {
        teRender(idx);
        teDetail?.classList.remove('pd-te-fading');
      }, 200);
    }
  }

  function teStartAuto() {
    clearInterval(teAutoTimer);
    teAutoTimer = setInterval(function() {
      teCurrentIdx = (teCurrentIdx + 1) % teTokens.length;
      teSelect(teCurrentIdx);
    }, 5000);
  }

  function handleRowClick(idx: number) {
    clearInterval(teAutoTimer);
    teSelect(idx);
    teStartAuto();
  }

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
  <title>Token Custody — TestMachine</title>
  <meta name="description" content="Token Custody - Token Explorer for 9M+ tokens with real-time risk scoring and security analysis. Zero false positives." />
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
     TOKEN EXPLORER MOCK
     ================================ */
  .pd-te-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    border-bottom: 1px solid oklch(0.22 0 0);
  }
  .pd-te-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: oklch(0.9 0 0);
  }
  :global([data-theme="light"]) .pd-te-title { color: oklch(0.15 0 0); }
  .pd-te-live {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.6875rem;
    color: oklch(0.5 0 0);
  }
  .pd-te-live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    animation: pd-pulse 2s ease infinite;
  }
  @keyframes pd-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .pd-te-stats {
    display: flex;
    gap: 32px;
    padding: 14px 20px;
    border-bottom: 1px solid oklch(0.22 0 0);
  }
  .pd-te-stat-num {
    font-size: 1.125rem;
    font-weight: 700;
    color: oklch(0.9 0 0);
    font-variant-numeric: tabular-nums;
  }
  :global([data-theme="light"]) .pd-te-stat-num { color: oklch(0.15 0 0); }
  .pd-te-stat-label {
    font-size: 0.6875rem;
    color: oklch(0.45 0 0);
    display: block;
    margin-top: 2px;
  }

  /* Token Table */
  .pd-te-table {
    width: 100%;
    border-collapse: collapse;
  }
  .pd-te-table thead th {
    font-size: 0.625rem;
    color: oklch(0.4 0 0);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 8px 20px;
    text-align: left;
    border-bottom: 1px solid oklch(0.22 0 0);
    font-weight: 500;
  }
  .pd-te-table thead th:last-child {
    text-align: right;
  }
  .pd-te-row {
    border-bottom: 1px solid oklch(0.18 0 0);
    transition: background 0.15s;
    cursor: pointer;
  }
  .pd-te-row:hover {
    background: oklch(0.18 0 0);
  }
  .pd-te-row:active {
    transform: scale(0.995);
  }
  :global([data-theme="light"]) .pd-te-row:hover {
    background: oklch(0.93 0 0);
  }
  .pd-te-row.pd-te-selected {
    background: oklch(0.17 0.01 192);
    border-left: 3px solid var(--accent);
  }
  :global([data-theme="light"]) .pd-te-row.pd-te-selected {
    background: oklch(0.95 0.01 192);
  }
  .pd-te-row td {
    padding: 10px 20px;
    color: oklch(0.75 0 0);
    font-size: 0.8125rem;
    vertical-align: middle;
  }
  :global([data-theme="light"]) .pd-te-row td { color: oklch(0.35 0 0); }
  .pd-te-row td:last-child {
    text-align: right;
  }
  .pd-te-tok-name {
    font-weight: 600;
    color: oklch(0.9 0 0);
  }
  :global([data-theme="light"]) .pd-te-tok-name { color: oklch(0.15 0 0); }
  .pd-te-tok-sub {
    color: oklch(0.4 0 0);
    font-size: 0.6875rem;
    margin-left: 6px;
  }

  /* Chain badges */
  .pd-chain {
    font-size: 0.625rem;
    font-weight: 500;
    padding: 2px 8px;
    display: inline-block;
  }
  .pd-chain-base { background: oklch(0.22 0 0); color: oklch(0.7 0 0); }
  .pd-chain-eth { background: oklch(0.2 0.02 260); color: oklch(0.7 0.04 260); }
  .pd-chain-arb { background: oklch(0.2 0.02 220); color: oklch(0.7 0.04 220); }
  .pd-chain-polygon { background: oklch(0.2 0.02 300); color: oklch(0.7 0.04 300); }
  .pd-chain-op { background: oklch(0.2 0.02 25); color: oklch(0.7 0.04 25); }
  :global([data-theme="light"]) .pd-chain-base { background: oklch(0.9 0 0); color: oklch(0.4 0 0); }
  :global([data-theme="light"]) .pd-chain-eth { background: oklch(0.92 0.02 260); color: oklch(0.4 0.04 260); }
  :global([data-theme="light"]) .pd-chain-arb { background: oklch(0.92 0.02 220); color: oklch(0.4 0.04 220); }

  /* Behavior badges */
  .pd-badge {
    font-size: 0.625rem;
    font-weight: 500;
    padding: 2px 7px;
    white-space: nowrap;
    display: inline-block;
  }
  .pd-badge-red { background: rgba(239,68,68,0.15); color: #fca5a5; }
  .pd-badge-green { background: rgba(34,197,94,0.15); color: #86efac; }
  .pd-badge-yellow { background: rgba(245,158,11,0.15); color: #fcd34d; }
  .pd-badge-blue { background: rgba(59,130,246,0.15); color: #93c5fd; }
  .pd-badge-purple { background: rgba(168,85,247,0.15); color: #d8b4fe; }
  .pd-badge-none { background: oklch(0.22 0 0); color: oklch(0.5 0 0); }
  :global([data-theme="light"]) .pd-badge-red { background: rgba(239,68,68,0.1); color: #dc2626; }
  :global([data-theme="light"]) .pd-badge-green { background: rgba(34,197,94,0.1); color: #16a34a; }
  :global([data-theme="light"]) .pd-badge-yellow { background: rgba(245,158,11,0.1); color: #d97706; }
  :global([data-theme="light"]) .pd-badge-blue { background: rgba(59,130,246,0.1); color: #2563eb; }
  :global([data-theme="light"]) .pd-badge-none { background: oklch(0.9 0 0); color: oklch(0.5 0 0); }

  .pd-te-behavs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }
  .pd-te-dim { color: oklch(0.4 0 0); font-size: 0.6875rem; }

  /* Risk score colors */
  .pd-risk-crit { color: #ef4444; font-weight: 700; }
  .pd-risk-high { color: #f97316; font-weight: 600; }
  .pd-risk-med { color: #eab308; font-weight: 600; }
  .pd-risk-low { color: oklch(0.55 0 0); font-weight: 500; }
  .pd-risk-safe { color: #22c55e; font-weight: 600; }

  /* Token Detail Panel */
  .pd-te-detail {
    border-top: 1px solid oklch(0.25 0 0);
    padding: 20px;
    transition: opacity 0.25s ease, transform 0.25s ease;
    min-height: 280px;
  }
  :global(.pd-te-detail.pd-te-fading) {
    opacity: 0;
    transform: translateY(8px);
  }
  .pd-te-detail :global(.pd-te-detail-head) {
    margin-bottom: 16px;
  }
  .pd-te-detail :global(.pd-te-detail-name) {
    font-size: 0.875rem;
    color: oklch(0.85 0 0);
    margin-bottom: 4px;
  }
  :global([data-theme="light"]) .pd-te-detail :global(.pd-te-detail-name) { color: oklch(0.2 0 0); }
  .pd-te-detail :global(.pd-te-detail-name strong) {
    font-weight: 700;
    color: oklch(0.95 0 0);
  }
  :global([data-theme="light"]) .pd-te-detail :global(.pd-te-detail-name strong) { color: oklch(0.1 0 0); }
  .pd-te-detail :global(.pd-te-detail-meta) {
    font-size: 0.6875rem;
    color: oklch(0.4 0 0);
  }
  .pd-te-detail :global(.pd-te-verified) { color: #22c55e; }

  .pd-te-detail :global(.pd-te-detail-grid) {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 20px;
  }

  /* Risk Score Panel */
  .pd-te-detail :global(.pd-te-risk-panel) {
    text-align: center;
    padding: 16px 0;
  }
  .pd-te-detail :global(.pd-te-risk-big) {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 4px;
    font-variant-numeric: tabular-nums;
  }
  .pd-te-detail :global(.pd-te-risk-label) {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
  }
  .pd-te-detail :global(.pd-te-risk-bar) {
    margin: 0 auto;
    max-width: 200px;
  }
  .pd-te-detail :global(.pd-te-risk-track) {
    height: 6px;
    background: linear-gradient(to right, #ef4444, #f59e0b, #22c55e);
    position: relative;
    margin-bottom: 6px;
  }
  .pd-te-detail :global(.pd-te-risk-marker) {
    position: absolute;
    top: -4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid oklch(0.13 0 0);
    transform: translateX(-50%);
    transition: left 0.5s ease, background 0.3s;
  }
  :global([data-theme="light"]) .pd-te-detail :global(.pd-te-risk-marker) {
    border-color: oklch(0.97 0 0);
  }
  .pd-te-detail :global(.pd-te-risk-labels) {
    display: flex;
    justify-content: space-between;
    font-size: 0.5625rem;
    color: oklch(0.4 0 0);
  }

  /* Score Factors */
  .pd-te-detail :global(.pd-te-factors) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pd-te-detail :global(.pd-te-factor) {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .pd-te-detail :global(.pd-te-factor-score) {
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 36px;
    text-align: right;
    flex-shrink: 0;
  }
  .pd-te-detail :global(.pd-te-factor-crit) { color: #ef4444; }
  .pd-te-detail :global(.pd-te-factor-warn) { color: #f97316; }
  .pd-te-detail :global(.pd-te-factor-med) { color: #eab308; }
  .pd-te-detail :global(.pd-te-factor-info) { color: oklch(0.5 0 0); }
  .pd-te-detail :global(.pd-te-factor-safe) { color: #22c55e; }
  .pd-te-detail :global(.pd-te-factor-info-wrap) {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .pd-te-detail :global(.pd-te-factor-info-wrap strong) {
    font-size: 0.75rem;
    font-weight: 600;
    color: oklch(0.85 0 0);
  }
  :global([data-theme="light"]) .pd-te-detail :global(.pd-te-factor-info-wrap strong) { color: oklch(0.2 0 0); }
  .pd-te-detail :global(.pd-te-factor-info-wrap span) {
    font-size: 0.6875rem;
    color: oklch(0.45 0 0);
  }

  /* Detected Behaviors */
  .pd-te-detail :global(.pd-te-behaviors) {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid oklch(0.22 0 0);
  }
  .pd-te-detail :global(.pd-te-behaviors-title) {
    font-size: 0.6875rem;
    font-weight: 600;
    color: oklch(0.6 0 0);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
  }
  .pd-te-detail :global(.pd-te-no-behaviors) {
    font-size: 0.75rem;
    color: #22c55e;
    padding: 12px 0;
  }
  .pd-te-detail :global(.pd-te-behav-item) {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid oklch(0.18 0 0);
    font-size: 0.75rem;
  }
  .pd-te-detail :global(.pd-te-behav-item:last-child) { border-bottom: none; }
  .pd-te-detail :global(.pd-te-behav-dot) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .pd-te-detail :global(.pd-te-dot-red) { background: #ef4444; }
  .pd-te-detail :global(.pd-te-dot-yellow) { background: #eab308; }
  .pd-te-detail :global(.pd-te-dot-green) { background: #22c55e; }
  .pd-te-detail :global(.pd-te-dot-blue) { background: #3b82f6; }
  .pd-te-detail :global(.pd-te-dot-purple) { background: #a855f7; }
  .pd-te-detail :global(.pd-te-behav-info) { flex: 1; }
  .pd-te-detail :global(.pd-te-behav-cat) {
    font-weight: 600;
    color: oklch(0.8 0 0);
  }
  :global([data-theme="light"]) .pd-te-detail :global(.pd-te-behav-cat) { color: oklch(0.2 0 0); }
  .pd-te-detail :global(.pd-te-behav-fn) {
    color: var(--accent);
    font-size: 0.6875rem;
  }
  .pd-te-detail :global(.pd-te-behav-auth) {
    font-size: 0.625rem;
    color: oklch(0.4 0 0);
  }
  .pd-te-detail :global(.pd-te-dim) {
    color: oklch(0.4 0 0);
    font-size: 0.6875rem;
  }

  /* ================================
     AZIMUTH REPORT MOCK
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
  .pd-code .kw { color: #c084fc; }
  .pd-code .fn { color: #60a5fa; }
  .pd-code .str { color: #86efac; }
  .pd-code .cm { color: oklch(0.4 0 0); }
  .pd-code .num { color: #fcd34d; }
  .pd-code .type { color: #22d3ee; }

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

  /* -- Responsive -- */
  @media (max-width: 900px) {
    .pd-chains-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .pd-scale-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-te-detail :global(.pd-te-detail-grid) {
      grid-template-columns: 1fr;
    }
    .pd-te-table thead th:nth-child(3),
    .pd-te-row td:nth-child(3) {
      display: none;
    }
    .pd-az-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-chains-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 480px) {
    .pd-scale-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .pd-te-stats {
      gap: 16px;
      flex-wrap: wrap;
    }
    .pd-chains-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-section-features {
      gap: 6px;
    }
  }
</style>
