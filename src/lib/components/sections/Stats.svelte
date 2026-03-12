<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Stat {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    delay: number;
  }
  
  const stats: Stat[] = [
    { value: 1, suffix: 'M+', label: 'Tokens analyzed', delay: 0 },
    { value: 100, suffix: '%', label: 'Rug pull detection accuracy', delay: 200 },
    { value: 120, prefix: '$', suffix: 'M+', label: 'In rug pulls identified from 11K token validation set', delay: 400 },
    { value: 0, suffix: '', label: 'False positives in Coinbase evaluation', delay: 600 }
  ];
  
  let containerElement: HTMLElement;
  let hasAnimated = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateStats();
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (containerElement) {
      observer.observe(containerElement);
    }
    
    return () => observer.disconnect();
  });
  
  function animateStats() {
    stats.forEach((stat, index) => {
      const element = containerElement.querySelector(`[data-stat="${index}"]`) as HTMLElement;
      if (element) {
        setTimeout(() => {
          animateCountUp(element, stat);
        }, stat.delay);
      }
    });
  }
  
  function animateCountUp(element: HTMLElement, stat: Stat) {
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

<section class="stats" id="stats">
  <div class="container">
    <span class="section-label" class:visible={mounted}>By the Numbers</span>
    <div bind:this={containerElement} class="stats-grid" class:visible={mounted}>
      {#each stats as stat, index}
        <div class="stats-card" style="--i:{index}">
          <span 
            class="stats-number" 
            data-stat={index}
          >
            {stat.prefix || ''}0{stat.suffix}
          </span>
          <span class="stats-label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .stats {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-raised);
  }
  
  .section-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg-muted);
    margin-bottom: 0.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .section-label.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gap);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .stats-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .stats-card {
    text-align: center;
    padding: 36px 28px;
    border: 1px solid var(--border-subtle);
    transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
    transition-delay: calc(var(--i, 0) * 0.08s);
  }
  
  .stats-card:hover {
    border-color: var(--border);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px oklch(0 0 0 / 0.12);
  }
  
  .stats-number {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 14px;
    color: var(--accent);
  }
  
  .stats-label {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .stats-card {
      padding: 24px 14px;
    }
    
    .stats-number {
      font-size: 1.75rem;
    }
  }
</style>
