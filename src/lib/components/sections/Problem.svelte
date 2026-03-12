<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="problem" id="problem">
  <div class="container">
    <div class="problem-inner" class:visible={mounted}>
      <h2 class="section-title">The Problem</h2>
      <p class="problem-text">
        $2.2 billion stolen in 2024. $1.5 billion in a single hack in 2025. 
        Over $13 billion lost since 2015 — and 100% of major exploits hit 
        audited projects. Static audits can't keep pace with contracts that 
        upgrade, markets that shift, and attackers that adapt.
      </p>
    </div>
  </div>
</section>

<style>
  .problem {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
  }
  
  .problem-inner {
    max-width: 780px;
    padding-left: 28px;
    border-left: 3px solid var(--accent);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .problem-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
  }
  
  .problem-text {
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 400;
    line-height: 1.65;
    color: var(--fg-muted);
  }
</style>
