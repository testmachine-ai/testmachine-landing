<script lang="ts">
  import { onMount } from 'svelte';

  interface ProblemStat {
    value: number;
    prefix?: string;
    suffix?: string;
    headline: string;
    detail: string;
    delay: number;
  }

  const problems: ProblemStat[] = [
    { 
      value: 2.2, prefix: '$', suffix: 'B',
      headline: 'Stolen in 2024',
      detail: 'Smart contract exploits, bridge hacks, and rug pulls drained billions from protocols that passed traditional audits.',
      delay: 0
    },
    { 
      value: 1.5, prefix: '$', suffix: 'B',
      headline: 'Single hack in 2025',
      detail: 'The Bybit hack — one exploit, one day. The largest single loss in crypto history. The project had been audited.',
      delay: 150
    },
    { 
      value: 13, prefix: '$', suffix: 'B+',
      headline: 'Lost since 2015',
      detail: 'A decade of losses — and 100% of major exploits hit audited projects. The audit badge didn\'t help.',
      delay: 300
    },
    {
      value: 100, prefix: '', suffix: '%',
      headline: 'Of major hacks hit audited projects',
      detail: 'Static audits can\'t keep pace with contracts that upgrade, markets that shift, and attackers that adapt.',
      delay: 450
    }
  ];

  let containerElement: HTMLElement;
  let hasAnimated = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateStats();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (containerElement) {
      observer.observe(containerElement);
    }
    
    return () => observer.disconnect();
  });

  function animateStats() {
    problems.forEach((stat, index) => {
      const element = containerElement.querySelector(`[data-problem="${index}"]`) as HTMLElement;
      if (element) {
        setTimeout(() => {
          animateCountUp(element, stat);
        }, stat.delay);
      }
    });
  }

  function animateCountUp(element: HTMLElement, stat: ProblemStat) {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const easedProgress = easeOutQuart(progress);
      const currentValue = stat.value * easedProgress;
      const displayValue = stat.value % 1 === 0 
        ? Math.floor(currentValue) 
        : currentValue.toFixed(1);
      
      element.textContent = `${stat.prefix || ''}${displayValue}${stat.suffix || ''}`;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
</script>

<section class="problem" id="problem">
  <div class="container">
    <div class="problem-header" data-animate>
      <span class="section-label">The Problem</span>
      <h2 class="section-title">Audits aren't working</h2>
    </div>
    <div bind:this={containerElement} class="problem-grid">
      {#each problems as problem, index}
        <div class="problem-card" style="--i:{index}">
          <span 
            class="problem-number" 
            data-problem={index}
          >
            {problem.prefix || ''}0{problem.suffix}
          </span>
          <span class="problem-headline">{problem.headline}</span>
          <p class="problem-detail">{problem.detail}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .problem {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
  }

  .problem-header {
    text-align: center;
    margin-bottom: clamp(32px, 5vw, 56px);
  }

  .section-label {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg-muted);
    margin-bottom: 0.75rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .problem-card {
    background: var(--bg);
    padding: 36px 28px;
    display: flex;
    flex-direction: column;
    transition: background var(--transition);
  }

  .problem-card:hover {
    background: var(--bg-raised);
  }

  .problem-number {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 8px;
    color: oklch(0.65 0.2 25);
  }

  :global([data-theme="light"]) .problem-number {
    color: oklch(0.5 0.2 25);
  }

  .problem-headline {
    display: block;
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--fg);
    margin-bottom: 12px;
  }

  .problem-detail {
    font-family: var(--font-body);
    font-size: 0.8125rem;
    color: var(--fg-muted);
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    .problem-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .problem-grid {
      grid-template-columns: 1fr;
    }

    .problem-card {
      padding: 28px 20px;
    }

    .problem-number {
      font-size: 2rem;
    }
  }
</style>
