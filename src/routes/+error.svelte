<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} — TestMachine</title>
</svelte:head>

<section class="error-section">
  <div class="container">
    <span class="section-label">{$page.status}</span>
    <h1 class="error-title">
      {#if $page.status === 404}
        Page not found
      {:else}
        Something went wrong
      {/if}
    </h1>
    <p class="error-desc">
      {#if $page.status === 404}
        The page you're looking for doesn't exist.
      {:else}
        {$page.error?.message ?? 'An unexpected error occurred.'}
      {/if}
    </p>
    <a href="/" class="btn btn--primary">Back to home</a>
  </div>
</section>

<style>
  .error-section {
    min-height: calc(100vh - var(--nav-h));
    display: flex;
    align-items: center;
    padding: var(--section-py) 0;
  }

  .error-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--fg);
    margin: 0.5rem 0 1rem;
    line-height: 1.15;
  }

  .error-desc {
    color: var(--fg-muted);
    margin-bottom: 2rem;
    max-width: 40ch;
  }
</style>
