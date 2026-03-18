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

    const el = document.getElementById('products-overview');
    if (el) {
      el.querySelectorAll('[data-animate]').forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  });
</script>

<section class="products-overview" id="products-overview">
  <div class="container">
    <div class="products-header" data-animate>
      <span class="section-label">What We Build</span>
      <h2 class="section-title">Two products. One mission.</h2>
    </div>
    <div class="products-grid" data-animate>
      <a href="/products/token-custody" class="product-card">
        <span class="product-label">Product 01</span>
        <h3 class="product-title">Token Custody</h3>
        <p class="product-desc">
          Real-time risk scoring for 9M+ tokens across every EVM chain. 
          Dangerous behaviors — confiscation, hidden minting, proxy manipulation — 
          detected and classified automatically.
        </p>
        <span class="product-stats">9M+ tokens · 7 chains · Zero false positives</span>
        <span class="product-link">Explore Token Custody &rarr;</span>
      </a>
      <a href="/products/azimuth" class="product-card">
        <span class="product-label">Product 02</span>
        <h3 class="product-title">Azimuth</h3>
        <p class="product-desc">
          AI agents that actively attack your smart contracts in forked mainnet
          environments with real transaction execution. If Azimuth reports it,
          it was actually exploited — not just theoretically possible.
        </p>
        <span class="product-stats">Zero false positives · Minutes, not weeks · Full PoC generation</span>
        <span class="product-link">Explore Azimuth &rarr;</span>
      </a>
    </div>
  </div>
</section>

<style>
  .products-overview {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .products-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: var(--border-subtle);
  }

  .product-card {
    background: var(--bg);
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-decoration: none;
    color: inherit;
    transition: background var(--transition), transform var(--transition);
    position: relative;
  }

  .product-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    transition: border-color var(--transition);
    pointer-events: none;
  }

  .product-card:hover {
    background: var(--bg-raised);
  }

  .product-card:hover::after {
    border-color: var(--accent);
  }

  .product-card:hover .product-link {
    color: var(--accent);
  }

  .product-label {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
  }

  .product-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--fg);
  }

  .product-desc {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--fg-muted);
    flex: 1;
  }

  .product-stats {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--fg-dim);
    padding-top: 16px;
    border-top: 1px solid var(--border-subtle);
  }

  .product-link {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--fg-muted);
    transition: color var(--transition);
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
    }

    .product-card {
      padding: 36px 28px;
    }
  }
</style>
