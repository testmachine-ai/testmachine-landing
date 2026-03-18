<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let canvasEl: HTMLCanvasElement;
  let modalEl: HTMLDivElement;
  let modalCloseEl: HTMLButtonElement;
  let cleanup: (() => void) | null = null;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !visible) {
            visible = true;
            startWidget();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (canvasEl) {
      observer.observe(canvasEl);
    }

    return () => observer.disconnect();
  });

  async function startWidget() {
    const { initRugPullWidget } = await import('./rug-pull-engine.js');
    cleanup = initRugPullWidget(canvasEl, modalEl, modalCloseEl);
  }

  onDestroy(() => {
    if (cleanup) cleanup();
  });
</script>

<section class="risk-widget" id="risk-demo">
  <div class="container">
    <div class="widget-header-text" data-animate>
      <span class="section-label">Live Demo</span>
      <h2 class="section-title">See it in action</h2>
      <p class="widget-desc">Watch Token Custody analyze a real token in real time — from smart contract analysis through creator history to final verdict.</p>
    </div>
    <div class="widget-wrap" data-animate>
      <div class="widget-frame">
        <div class="widget-titlebar">
          <div class="widget-dot dot-red"></div>
          <div class="widget-dot dot-yellow"></div>
          <div class="widget-dot dot-green"></div>
          <span class="widget-url">Token Risk Analysis</span>
        </div>
        <canvas bind:this={canvasEl} class="widget-canvas"></canvas>
      </div>
    </div>
  </div>
</section>

<!-- Stats modal (required by widget engine) -->
<div bind:this={modalEl} class="stats-modal" style="display:none;">
  <div class="modal-content">
    <button bind:this={modalCloseEl} class="modal-close">&times;</button>
    <h2 class="modal-title">Understanding Our Metrics</h2>
    <div class="modal-stat">
      <h3>Accuracy: 96.2%</h3>
      <p>Of all tokens we classify, 96.2% are classified correctly — whether safe or rug pull.</p>
    </div>
    <div class="modal-stat">
      <h3>Model Confidence: 0.970</h3>
      <p>Our model's ability to distinguish safe tokens from rug pulls, measured across all thresholds. 1.0 is perfect — ours is 0.970.</p>
    </div>
    <div class="modal-stat">
      <h3>Flag Accuracy: 94%</h3>
      <p>When we flag a token as a rug pull, we're right 94% of the time.</p>
    </div>
    <div class="modal-stat">
      <h3>Detection Rate: 96.5%</h3>
      <p>We catch 96.5% of actual rug pulls.</p>
    </div>
  </div>
</div>

<style>
  .risk-widget {
    padding: var(--section-py) 0;
    border-top: 1px solid var(--border);
  }

  .widget-header-text {
    text-align: center;
    margin-bottom: clamp(32px, 5vw, 48px);
  }


  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
  }

  .widget-desc {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: var(--fg-muted);
    line-height: 1.75;
    max-width: 640px;
    margin: 0 auto;
    text-align: left;
  }

  .widget-wrap {
    max-width: 1120px;
    margin: 0 auto;
  }

  .widget-frame {
    border: 1px solid var(--border);
    overflow: hidden;
    background: oklch(0.13 0.005 260);
  }

  .widget-titlebar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    background: oklch(0.11 0.005 260);
  }

  .widget-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .dot-red { background: oklch(0.55 0.15 25); }
  .dot-yellow { background: oklch(0.70 0.12 85); }
  .dot-green { background: oklch(0.60 0.15 145); }

  .widget-url {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--fg-muted);
    margin-left: 8px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .widget-canvas {
    display: block;
    width: 100%;
    aspect-ratio: 2 / 1;
  }

  @media (max-width: 768px) {
    .widget-canvas {
      aspect-ratio: 3 / 4;
    }
  }

  /* Stats Modal */
  .stats-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: oklch(0.16 0.005 260);
    border: 1px solid oklch(0.30 0.005 260);
    border-radius: 0;
    max-width: 560px;
    width: 90%;
    padding: 32px;
    position: relative;
    font-family: var(--font-display);
    color: var(--fg);
  }

  .modal-close {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    color: var(--fg-muted);
    font-size: 24px;
    cursor: pointer;
  }

  .modal-title {
    font-size: 1.375rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--accent);
  }

  .modal-stat {
    margin-bottom: 18px;
  }

  .modal-stat h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .modal-stat p {
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.6;
  }
</style>
