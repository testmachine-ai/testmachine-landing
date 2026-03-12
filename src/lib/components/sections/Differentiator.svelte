<script lang="ts">
  // Differentiator: "Why TestMachine / Not Another Audit Tool"
</script>

<section class="differentiator" id="differentiator">
  <div class="container">
    <div class="diff-header" data-animate>
      <span class="section-label">Why TestMachine</span>
      <h2 class="section-title">Not Another Audit Tool</h2>
    </div>
    <div class="diff-split" data-animate>
      <div class="diff-side diff-side--old">
        <div class="diff-side-label">Traditional Audit</div>
        <div class="diff-side-content">
          <div class="diff-item diff-item--old">
            <span class="diff-item-icon">&times;</span>
            <div class="diff-item-text">
              <strong>One-time review</strong>
              <span>A snapshot of your code on a single day. Tomorrow it's already stale.</span>
            </div>
          </div>
          <div class="diff-item diff-item--old">
            <span class="diff-item-icon">&times;</span>
            <div class="diff-item-text">
              <strong>Weeks of waiting</strong>
              <span>Manual line-by-line analysis. Ship dates slip. Threats don't wait.</span>
            </div>
          </div>
          <div class="diff-item diff-item--old">
            <span class="diff-item-icon">&times;</span>
            <div class="diff-item-text">
              <strong>Blind to runtime</strong>
              <span>Reading code in isolation. Can't see how contracts actually behave on-chain.</span>
            </div>
          </div>
          <div class="diff-item diff-item--old">
            <span class="diff-item-icon">&times;</span>
            <div class="diff-item-text">
              <strong>False confidence</strong>
              <span>100% of major 2024 hacks hit audited projects. The badge didn't help.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="diff-divider">
        <div class="diff-divider-line"></div>
        <div class="diff-divider-label">vs</div>
        <div class="diff-divider-line"></div>
      </div>
      <div class="diff-side diff-side--new">
        <div class="diff-side-label">TestMachine Predator</div>
        <div class="diff-side-content">
          <div class="diff-item diff-item--new">
            <span class="diff-item-icon">&check;</span>
            <div class="diff-item-text">
              <strong>Continuous adversarial testing</strong>
              <span>AI agents that probe your contracts around the clock, catching upgrades and state changes.</span>
            </div>
          </div>
          <div class="diff-item diff-item--new">
            <span class="diff-item-icon">&check;</span>
            <div class="diff-item-text">
              <strong>Seconds, not weeks</strong>
              <span>Automated scans at machine speed. Results before your next standup.</span>
            </div>
          </div>
          <div class="diff-item diff-item--new">
            <span class="diff-item-icon">&check;</span>
            <div class="diff-item-text">
              <strong>Full EVM simulation</strong>
              <span>Attacks run inside a high-fidelity replica of mainnet. Real behavior, real exploits.</span>
            </div>
          </div>
          <div class="diff-item diff-item--new">
            <span class="diff-item-icon">&check;</span>
            <div class="diff-item-text">
              <strong>Zero false positives</strong>
              <span>Predator either drains tokens or it doesn't. No noise. No guesswork.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="diff-cta" data-animate>
      <a href="/products" class="btn btn--secondary">Explore Products &rarr;</a>
    </div>
  </div>
</section>

<style>
  .differentiator {
    padding: var(--section-py) 0;
    border-top: 1px solid var(--border-subtle);
  }

  .diff-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .diff-split {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0;
    max-width: 960px;
    margin: 0 auto;
  }

  .diff-side {
    padding: 40px;
  }

  .diff-side--old {
    background: linear-gradient(135deg, rgba(220, 80, 60, 0.06) 0%, rgba(220, 80, 60, 0.02) 100%);
    border: 1px solid oklch(0.40 0.10 20);
    position: relative;
  }

  .diff-side--old::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(220, 80, 60, 0.015) 10px,
      rgba(220, 80, 60, 0.015) 20px
    );
    pointer-events: none;
  }

  .diff-side--old :global(.diff-item + .diff-item) {
    border-top-color: rgba(220, 80, 60, 0.08);
  }

  .diff-side--new {
    border: 1px solid var(--accent);
    background: linear-gradient(135deg, rgba(94, 234, 212, 0.04) 0%, rgba(94, 234, 212, 0.01) 100%);
    position: relative;
  }

  .diff-side--new::before {
    content: "";
    position: absolute;
    inset: -1px;
    border: 1px solid var(--accent);
    opacity: 0.3;
    filter: blur(8px);
    pointer-events: none;
  }

  .diff-side-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg-dim);
    margin-bottom: 32px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .diff-side--old .diff-side-label {
    color: oklch(0.65 0.12 20);
    border-bottom-color: rgba(220, 80, 60, 0.2);
  }

  .diff-side--new .diff-side-label {
    color: var(--accent);
    border-bottom-color: rgba(94, 234, 212, 0.2);
  }

  .diff-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
  }

  .diff-item + .diff-item {
    border-top: 1px solid rgba(255,255,255,0.04);
  }

  .diff-side--new .diff-item + .diff-item {
    border-top-color: rgba(94, 234, 212, 0.08);
  }

  .diff-item-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    margin-top: 2px;
  }

  .diff-item--old .diff-item-icon {
    color: oklch(0.55 0.12 20);
    border: 1px solid oklch(0.35 0.08 20);
  }

  .diff-item--new .diff-item-icon {
    color: var(--accent);
    border: 1px solid rgba(94, 234, 212, 0.3);
  }

  .diff-item-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .diff-item-text strong {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--fg);
  }

  .diff-side--old .diff-item-text strong {
    color: var(--fg);
  }

  .diff-item-text span {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    line-height: 1.6;
    color: var(--fg-muted);
  }

  /* Divider */
  .diff-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px;
  }

  .diff-divider-line {
    flex: 1;
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--fg-dim), transparent);
  }

  .diff-divider-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg-dim);
    padding: 16px 0;
  }

  .diff-cta {
    text-align: center;
    margin-top: 48px;
  }

  @media (max-width: 768px) {
    .diff-split {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .diff-divider {
      flex-direction: row;
      padding: 16px 0;
    }
    .diff-divider-line {
      width: auto;
      height: 1px;
      flex: 1;
      background: linear-gradient(to right, transparent, var(--fg-dim), transparent);
    }
    .diff-divider-label {
      padding: 0 16px;
    }
    .diff-side {
      padding: 28px;
    }
  }
</style>
