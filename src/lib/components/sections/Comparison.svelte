<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let sectionElement: HTMLElement;
  let headerElement: HTMLElement;
  let gridElement: HTMLElement;
  
  onMount(() => {
    mounted = true;
    
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    [headerElement, gridElement].forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  });

  const staticSteps = [
    'Parse source code into AST',
    'Match patterns against known vulnerability database', 
    'Report all matches as potential vulnerabilities',
    'Team manually triages hundreds of alerts'
  ];

  const dynamicSteps = [
    'Fork chain state with full economic context',
    'Deploy RL agents with extraction reward function',
    'Agents execute real transactions, explore state space', 
    'Generate PoC for each confirmed exploit path'
  ];
</script>

<section class="eng-section" id="comparison" bind:this={sectionElement}>
  <div class="container">
    <div 
      class="eng-section-header" 
      class:visible={mounted} 
      bind:this={headerElement}
    >
      <span class="section-label">The Difference</span>
      <h2 class="section-title">Static analysis vs dynamic execution</h2>
    </div>

    <div 
      class="eng-compare-grid" 
      class:visible={mounted}
      bind:this={gridElement}
    >
      <div class="eng-compare-col eng-compare-static">
        <div class="eng-compare-header">
          <span class="eng-compare-header-dot" aria-hidden="true"></span> 
          Static Analysis
        </div>
        <div class="eng-compare-title">Read code. Guess at bugs.</div>
        <div class="eng-compare-desc">
          Scans source code for patterns that match known vulnerability signatures. 
          Reports anything that looks suspicious.
        </div>
        <div class="eng-compare-steps">
          {#each staticSteps as step, index}
            <div class="eng-compare-step">
              <span class="eng-compare-step-num">{index + 1}</span>
              <span>{step}</span>
            </div>
          {/each}
        </div>
        <div class="eng-compare-result">
          Output: 200+ alerts, 95% false positives, weeks of triage
        </div>
      </div>

      <div class="eng-compare-col eng-compare-dynamic">
        <div class="eng-compare-header">
          <span class="eng-compare-header-dot" aria-hidden="true"></span> 
          TestMachine Dynamic Execution
        </div>
        <div class="eng-compare-title">Run code. Prove exploits.</div>
        <div class="eng-compare-desc">
          Forks the blockchain, deploys RL agents, and actually executes attack scenarios. 
          Only reports what was demonstrably exploited.
        </div>
        <div class="eng-compare-steps">
          {#each dynamicSteps as step, index}
            <div class="eng-compare-step">
              <span class="eng-compare-step-num">{index + 1}</span>
              <span>{step}</span>
            </div>
          {/each}
        </div>
        <div class="eng-compare-result">
          Output: 2–5 confirmed findings, 0 false positives, PoC for each
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .eng-section {
    padding: var(--section-py) 0;
    background: var(--bg-base);
    position: relative;
  }
  
  .eng-section-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .eng-section-header.visible,
  .eng-section-header:global(.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-label {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accent-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--fg-primary);
    font-family: var(--font-sans);
    margin: 0;
  }
  
  .eng-compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease-out 0.2s;
  }
  
  .eng-compare-grid.visible,
  .eng-compare-grid:global(.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  .eng-compare-col {
    background: var(--bg-raised);
    border: 1px solid var(--border-muted);
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  
  .eng-compare-col::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--accent-gradient);
  }
  
  .eng-compare-static::before {
    background: linear-gradient(90deg, #ef4444, #f97316);
  }
  
  .eng-compare-dynamic::before {
    background: var(--accent-gradient);
  }
  
  .eng-compare-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
  }
  
  .eng-compare-header-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.6;
  }
  
  .eng-compare-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--fg-primary);
    font-family: var(--font-sans);
    margin-bottom: 1rem;
    line-height: 1.3;
  }
  
  .eng-compare-desc {
    font-size: 1rem;
    color: var(--fg-muted);
    line-height: 1.6;
    margin-bottom: 2rem;
    font-family: var(--font-serif);
  }
  
  .eng-compare-steps {
    margin-bottom: 2rem;
  }
  
  .eng-compare-step {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  .eng-compare-step:last-child {
    margin-bottom: 0;
  }
  
  .eng-compare-step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--accent-primary);
    color: var(--bg-base);
    border-radius: 50%;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
  
  .eng-compare-static .eng-compare-step-num {
    background: #ef4444;
  }
  
  .eng-compare-result {
    padding: 1.25rem;
    background: var(--bg-deeper);
    border: 1px solid var(--border-muted);
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--fg-secondary);
    font-weight: 500;
  }
  
  .eng-compare-static .eng-compare-result {
    border-left: 4px solid #ef4444;
  }
  
  .eng-compare-dynamic .eng-compare-result {
    border-left: 4px solid var(--accent-primary);
  }
  
  /* Mobile adjustments */
  @media (max-width: 1024px) {
    .eng-compare-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .eng-section-header {
      margin-bottom: 3rem;
    }
  }
  
  @media (max-width: 768px) {
    .eng-section {
      padding: calc(var(--section-py) * 0.75) 0;
    }
    
    .eng-compare-col {
      padding: 1.5rem;
    }
    
    .eng-compare-title {
      font-size: 1.25rem;
    }
    
    .eng-compare-desc {
      font-size: 0.9375rem;
    }
  }
  
  /* Enhanced visual hierarchy */
  .eng-compare-dynamic {
    position: relative;
  }
  
  .eng-compare-dynamic::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--accent-gradient);
    border-radius: 18px;
    z-index: -1;
    opacity: 0.1;
  }
  
  /* Hover effects */
  .eng-compare-col {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .eng-compare-col:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="dark"]) .eng-compare-col:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
</style>