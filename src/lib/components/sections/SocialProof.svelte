<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let track: HTMLDivElement | undefined = $state();
  let current = $state(0);
  let autoTimer: ReturnType<typeof setInterval> | undefined;
  const total = 3;

  function goTo(i: number) {
    current = ((i % total) + total) % total;
    if (track) {
      track.style.transform = `translateX(-${current * 100}%)`;
    }
  }

  function next() { goTo(current + 1); }

  function resetAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }

  function handleDot(i: number) {
    goTo(i);
    resetAuto();
  }

  onMount(() => {
    resetAuto();
  });

  onDestroy(() => {
    if (autoTimer) clearInterval(autoTimer);
  });
</script>

<section class="social-proof" id="social-proof">
  <div class="container">
    <div class="sp-header" data-animate>
      <span class="section-label">What People Are Saying</span>
    </div>
    <div class="sp-carousel" data-animate>
      <div class="sp-track" bind:this={track}>
        <div class="sp-slide">
          <blockquote class="sp-quote">
            &ldquo;[TestMachine] stood out because it achieved 100% accuracy on all tokens, with no false positives or negatives, even catching human errors in our own reviews.&rdquo;
          </blockquote>
          <div class="sp-attribution">
            <strong class="sp-name">Coinbase Blockchain Security Team</strong>
            <span class="sp-role">during evaluation of TestMachine for DEX token safety</span>
          </div>
        </div>
        <div class="sp-slide">
          <blockquote class="sp-quote">
            &ldquo;Overall, I&rsquo;m really impressed by the tool, mainly because it provides very high signal. As an auditor, I hate spending 15 minutes reading an AI finding only to realize it hallucinated a line of code and I&rsquo;ve wasted time. I can definitely see myself using this tool during audits to at least get baseline coverage across the project, knowing I don&rsquo;t have to spend time validating its output. I can also see myself recommending this tool to clients who do not have enough budget for a manual review.&rdquo;
          </blockquote>
          <div class="sp-attribution">
            <a href="https://x.com/LuxLode" target="_blank" rel="noopener noreferrer" class="sp-name sp-name-link">@LuxLode</a>
            <span class="sp-role">Independent Security Auditor</span>
          </div>
        </div>
        <div class="sp-slide">
          <blockquote class="sp-quote">
            &ldquo;Checking the results took least amount of time, as it includes roughly half of items (due to no FP present) and the findings are well-written.&rdquo;
          </blockquote>
          <div class="sp-attribution">
            <a href="https://x.com/pessimistic_io" target="_blank" rel="noopener noreferrer" class="sp-name sp-name-link">@pessimistic_io</a>
            <span class="sp-role">Pessimistic Security</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sp-dots" data-animate>
      {#each Array(total) as _, i}
        <button
          class="sp-dot"
          class:sp-dot-active={current === i}
          onclick={() => handleDot(i)}
          aria-label="Go to testimonial {i + 1}"
        ></button>
      {/each}
    </div>
  </div>
</section>

<style>
  .social-proof {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg);
  }

  .sp-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .sp-carousel {
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
  }

  .sp-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .sp-slide {
    min-width: 100%;
    text-align: center;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .sp-quote {
    font-family: var(--font-display);
    font-size: clamp(1.0625rem, 2.5vw, 1.5rem);
    font-weight: 400;
    line-height: 1.65;
    color: var(--fg);
    font-style: italic;
    margin-bottom: 32px;
    position: relative;
    padding: 0;
  }

  .sp-quote::before {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    background: var(--accent);
    margin: 0 auto 32px;
  }

  .sp-attribution {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .sp-name {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
  }

  .sp-name-link {
    color: var(--accent);
    text-decoration: none;
  }
  .sp-name-link:hover {
    text-decoration: underline;
  }

  .sp-role {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--fg-muted);
  }

  .sp-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 2rem;
  }

  .sp-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid var(--border-subtle);
    background: transparent;
    cursor: pointer;
    padding: 0;
    transition: background 0.3s, border-color 0.3s;
  }
  .sp-dot:hover {
    border-color: var(--fg-muted);
  }
  .sp-dot-active {
    background: var(--accent);
    border-color: var(--accent);
  }

  @media (max-width: 768px) {
    .sp-quote {
      font-size: clamp(1rem, 2vw, 1.25rem);
    }
    .sp-slide {
      padding: 0;
    }
  }
</style>
