<script lang="ts">
  // Blog page
</script>

<svelte:head>
  <title>Blog — TestMachine</title>
  <meta name="description" content="TestMachine blog - insights on Web3 security." />
</svelte:head>

<!-- Hero -->
<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">Blog</h1>
    <p class="page-hero-subtitle">Insights, research, and updates on Web3 security.</p>
  </div>
</section>

<!-- Content placeholder -->
<div class="container">
  <p>Blog page content will be ported from blog.html...</p>
</div>

<style>
  .page-hero {
    padding: calc(var(--nav-h) + 100px) 0 80px;
    text-align: center;
  }
  .page-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 7vw, 4.5rem);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.035em;
    color: var(--fg);
    margin-bottom: 1.5rem;
  }
  .page-hero-subtitle {
    font-size: 1.25rem;
    color: var(--fg-muted);
  }
</style>