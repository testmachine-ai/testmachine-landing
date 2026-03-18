<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = document.getElementById('solutions');
    if (el) {
      el.querySelectorAll('[data-animate]').forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  });
</script>

<!-- Token Custody Technology -->
<section class="predator" id="solutions">
  <div class="container">
    <div class="predator-grid">
      <div class="predator-text" data-animate>
        <span class="section-label">Our Technology</span>
        <h2 class="section-title">Token Custody</h2>
        <p class="predator-desc">Token Custody secures tokens at scale for Coinbase, exchanges, and DeFi protocols. Every token listed on-chain is analyzed for dangerous behaviors — confiscation, hidden minting, proxy manipulation — in real time. Over 9 million tokens analyzed. Zero false positives.</p>
      </div>
      <div class="predator-terminal" data-animate>
        <div class="token-explorer-mock">
          <!-- Explorer header -->
          <div class="te-header">
            <div class="te-title">Token Explorer</div>
            <div class="te-live"><span class="te-live-dot"></span> Live</div>
          </div>
          <div class="te-stats">
            <div class="te-stat"><span class="te-stat-num">8,101,870</span><span class="te-stat-label">tokens analyzed</span></div>
            <div class="te-stat"><span class="te-stat-num">2,379,208</span><span class="te-stat-label">behaviors surfaced</span></div>
          </div>
          <!-- Compact token list -->
          <div class="te-table">
            <div class="te-row te-row-header">
              <span class="te-col-token">Token</span>
              <span class="te-col-net">Network</span>
              <span class="te-col-behav">Behaviors</span>
              <span class="te-col-time">Risk</span>
            </div>
            <div class="te-row te-row-selected">
              <span class="te-col-token"><strong>JUDEX</strong> <span class="te-dim">JudexAI</span></span>
              <span class="te-col-net"><span class="te-net-badge">Base</span></span>
              <span class="te-col-behav">
                <span class="te-behav te-behav-red">Confiscation</span>
                <span class="te-behav te-behav-yellow">Governance</span>
                <span class="te-dim">+3</span>
              </span>
              <span class="te-col-time"><span class="te-risk-crit">-100</span></span>
            </div>
            <div class="te-row">
              <span class="te-col-token"><strong>WILDE</strong> <span class="te-dim">Lobstar Wilde</span></span>
              <span class="te-col-net"><span class="te-net-badge">Base</span></span>
              <span class="te-col-behav">
                <span class="te-behav te-behav-red">Confiscation</span>
                <span class="te-behav te-behav-green">Minting</span>
              </span>
              <span class="te-col-time"><span class="te-risk-high">-80</span></span>
            </div>
            <div class="te-row">
              <span class="te-col-token"><strong>SELENIUM</strong> <span class="te-dim">seleniumhq</span></span>
              <span class="te-col-net"><span class="te-net-badge">Base</span></span>
              <span class="te-col-behav">
                <span class="te-behav te-behav-none">None detected</span>
              </span>
              <span class="te-col-time"><span class="te-risk-safe">0</span></span>
            </div>
          </div>
          <!-- Token detail preview -->
          <div class="te-detail">
            <div class="te-detail-header">
              <div class="te-detail-token"><strong>JUDEX</strong> JudexAI · <span class="te-dim">ClankerToken</span></div>
              <div class="te-detail-meta">Base · Block 42,333,363 · <span class="te-verified">&#10003; Verified</span></div>
            </div>
            <div class="te-detail-body">
              <div class="te-risk-panel">
                <div class="te-risk-score">-100</div>
                <div class="te-risk-label">CRITICAL RISK</div>
                <div class="te-risk-bar">
                  <div class="te-risk-bar-track">
                    <div class="te-risk-bar-fill" style="width: 0%"></div>
                    <div class="te-risk-bar-marker" style="left: 0%"></div>
                  </div>
                  <div class="te-risk-bar-labels">
                    <span>-100</span><span>0</span><span>+100</span>
                  </div>
                </div>
              </div>
              <div class="te-factors">
                <div class="te-factor">
                  <span class="te-factor-score te-factor-crit">-100</span>
                  <div class="te-factor-info">
                    <strong>Confiscation</strong>
                    <span class="te-dim">Can remove token balances from accounts</span>
                  </div>
                </div>
                <div class="te-factor">
                  <span class="te-factor-score te-factor-warn">-20</span>
                  <div class="te-factor-info">
                    <strong>Minting</strong>
                    <span class="te-dim">Can create new tokens, increasing supply</span>
                  </div>
                </div>
                <div class="te-factor">
                  <span class="te-factor-score te-factor-warn">-20</span>
                  <div class="te-factor-info">
                    <strong>Assembly</strong>
                    <span class="te-dim">Contains low-level assembly code</span>
                  </div>
                </div>
                <div class="te-factor">
                  <span class="te-factor-score te-factor-neutral">0</span>
                  <div class="te-factor-info">
                    <strong>Management</strong>
                    <span class="te-dim">Admin functions for role management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
