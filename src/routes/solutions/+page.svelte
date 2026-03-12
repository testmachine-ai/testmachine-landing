<script lang="ts">
  // Solutions page - How It Works
</script>

<svelte:head>
  <title>How It Works — TestMachine</title>
  <meta name="description" content="How TestMachine works: dynamic code execution + reinforcement learning = zero false positives. Deep technical breakdown of the pipeline." />
</svelte:head>

<!-- Hero -->
<section class="eng-hero">
  <div class="container">
    <span class="eng-hero-tag">How It Works</span>
    <h1 class="eng-hero-title">Zero False Positives.<br>Here's How.</h1>
    <p class="eng-hero-subtitle">Dynamic code execution + reinforcement learning agents = the only security platform that actually works at scale.</p>
  </div>
</section>

<!-- Placeholder content - will be filled from original -->
<div class="container">
  <p>Solutions page content will be ported from original...</p>
</div>

<style>
  .eng-hero {
    padding: calc(var(--nav-h) + 100px) 0 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .eng-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.25 0.04 192 / 0.35) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 40%, oklch(0.22 0.02 220 / 0.2) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 20% 60%, oklch(0.20 0.02 280 / 0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  .eng-hero-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 1.5rem;
  }
  .eng-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.035em;
    color: var(--fg);
    margin-bottom: 1.5rem;
  }
  .eng-hero-subtitle {
    font-size: 1.25rem;
    color: var(--fg-muted);
    max-width: 60ch;
    margin: 0 auto;
  }
</style>