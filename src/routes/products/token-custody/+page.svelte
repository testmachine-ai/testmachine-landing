<script lang="ts">
  import { onMount } from 'svelte';
  import RiskWidget from '$lib/components/sections/RiskWidget.svelte';

  onMount(() => {
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
  });
</script>

<svelte:head>
  <title>Token Custody — TestMachine</title>
  <meta name="description" content="Risk scoring for 9M+ tokens across every EVM chain. Autonomous AI agents classify behaviors and produce risk scores. Zero false positives." />
  <meta name="keywords" content="Web3 security, token risk scoring, smart contract audit, blockchain security, AI security, DeFi security, token explorer" />
</svelte:head>


<!-- =========================================================
     HERO
     ========================================================= -->
<section class="pd-hero">
  <div class="container">
    <span class="pd-hero-tag">Token Custody</span>
    <h1 class="pd-hero-title">Know Every Token</h1>
    <p class="pd-hero-sub">Risk scoring for <strong>9M+ tokens</strong> across every EVM chain. Autonomous AI agents probe every function of every contract &mdash; classifying behaviors and producing risk scores in real time.</p>
  </div>
</section>


<!-- =========================================================
     SCALE STATS
     ========================================================= -->
<section class="pd-scale" id="scale">
  <div class="container">
    <div class="pd-scale-grid" data-animate>
      <div class="pd-scale-card">
        <div class="pd-scale-num stats-number" data-value="9" data-suffix="M+">0M+</div>
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
     TOKEN EXPLORER
     ========================================================= -->
<section class="pd-section" id="token-explorer">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">How It Works</span>
      <h2 class="pd-section-title">Token Custody</h2>
      <p class="pd-section-desc">Autonomous AI agents probe every function of every contract, classifying behaviors and producing risk scores from 0 (safe) to 100 (critical danger). Continuously re-tested as contracts change.</p>
      <div class="pd-section-features">
        <span class="pd-feature">9M+ tokens</span>
        <span class="pd-feature">7 EVM chains</span>
        <span class="pd-feature">Real-time scores</span>
        <span class="pd-feature">Behavior classification</span>
        <span class="pd-feature">Continuous re-testing</span>
      </div>
    </div>

    <div class="pd-screenshot-frame" data-animate>
      <img 
        src="/assets/token-explorer-screenshot.webp" 
        alt="Token Custody — Recently analyzed tokens with behavior classifications and risk scores"
        class="pd-screenshot-img"
        loading="lazy"
      />
    </div>

    <div class="pd-section-action" data-animate>
      <a href="https://app.testmachine.ai/token-explorer" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">Explore Tokens &rarr;</a>
    </div>
  </div>
</section>


<!-- =========================================================
     RISK INTELLIGENCE
     ========================================================= -->
<section class="pd-section" id="risk-intelligence">
  <div class="container">
    <div class="pd-section-header" data-animate>
      <span class="section-label">Risk Intelligence</span>
      <h2 class="pd-section-title">Every token gets a risk score</h2>
    </div>
    <div class="risk-intel-layout" data-animate>
      <div class="risk-intel-text">
        <p class="risk-intel-body">
          Token Custody analyzes every token on-chain and produces a risk probability from 0 (safe) to 100 (critical), incorporating key factors like LP burned status, deployer token holdings, pool age, pause capabilities, minting permissions, and more.
        </p>
        <p class="risk-intel-body">
          The score aggregates these signals into a single number that exchanges and protocols can act on &mdash; automatically flagging dangerous tokens before they reach your users.
        </p>
        <div class="risk-intel-factors">
          <span class="risk-factor-tag">LP Burned Status</span>
          <span class="risk-factor-tag">Deployer Holdings</span>
          <span class="risk-factor-tag">Pool Age</span>
          <span class="risk-factor-tag">Pause Capabilities</span>
          <span class="risk-factor-tag">Minting Permissions</span>
          <span class="risk-factor-tag">Proxy Patterns</span>
        </div>
      </div>
      <div class="risk-intel-image">
        <img src="/assets/risk-score-panel.webp" alt="Risk score panel showing a 27.4% probability gauge, key risk factors bar chart, and risk score by pool age curve" loading="lazy" />
      </div>
    </div>
  </div>
</section>


<!-- =========================================================
     RUG PULL DETECTION WIDGET (native component)
     ========================================================= -->
<RiskWidget />


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
    <h2 class="pd-cta-title">Start securing your portfolio</h2>
    <p class="pd-cta-sub">Explore 9M+ tokens with real-time risk scoring across every EVM chain. Zero false positives.</p>
    <a href="https://app.testmachine.ai/token-explorer" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Launch Token Custody</a>
  </div>
</section>


<style>
  /* ========== Token Custody Page Styles ========== */

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

  /* ================================
     TOKEN EXPLORER SCREENSHOT
     ================================ */
  .pd-screenshot-frame {
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .pd-screenshot-img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* ================================
     EVM CHAINS
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
     RISK INTELLIGENCE
     ================================ */
  .risk-intel-layout {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
    align-items: center;
  }
  .risk-intel-body {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: var(--fg-muted);
    line-height: 1.75;
    margin-bottom: 1rem;
  }
  .risk-intel-body:last-of-type {
    margin-bottom: 1.5rem;
  }
  .risk-intel-factors {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .risk-factor-tag {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    padding: 4px 12px;
    background: oklch(0.22 0.005 260);
    border: 1px solid var(--border-subtle);
    color: var(--fg-muted);
  }
  :global([data-theme="light"]) .risk-factor-tag {
    background: oklch(0.92 0.003 260);
  }
  .risk-intel-image {
    position: relative;
    border: 1px solid var(--border-subtle);
    overflow: hidden;
    background: oklch(0.13 0.005 260);
  }
  :global([data-theme="light"]) .risk-intel-image {
    background: oklch(0.97 0 0);
  }
  .risk-intel-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* (Rug pull widget styles moved to RiskWidget.svelte component) */

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
    .pd-chains-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .risk-intel-layout {
      grid-template-columns: 1fr;
      gap: 32px;
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
    .pd-section-features {
      gap: 6px;
    }
    .pd-chains-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
