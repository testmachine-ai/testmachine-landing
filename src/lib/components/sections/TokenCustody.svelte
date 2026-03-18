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
<section class="token-custody" id="solutions">
  <div class="container">
    <div class="token-custody-grid">
      <div class="token-custody-text" data-animate>
        <span class="section-label">Our Technology</span>
        <h2 class="section-title">Token Custody</h2>
        <p class="token-custody-desc">Token Custody secures tokens at scale for Coinbase, exchanges, and DeFi protocols. Every token listed on-chain is analyzed for dangerous behaviors — confiscation, hidden minting, proxy manipulation — in real time. Over 9 million tokens analyzed. Zero false positives.</p>
      </div>
      <div class="token-custody-screenshot" data-animate>
        <img
          src="/assets/token-custody-detail.jpg"
          alt="Token Custody — MORPHO token analysis showing contract data, detected behaviors, and risk classification"
          class="token-custody-screenshot-img"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>
