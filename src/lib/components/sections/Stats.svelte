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
    { value: 8.1, suffix: 'M+', label: 'Tokens analyzed', delay: 0 },
    { value: 100, suffix: '%', label: 'Rug pull detection accuracy', delay: 200 },
    { value: 120, prefix: '$', suffix: 'M+', label: 'In rug pulls identified from 11K token validation set', delay: 400 },
    { value: 0, suffix: '', label: 'False positives in Coinbase evaluation', delay: 600 }
  ];
  
  let containerElement: HTMLElement;
  let hasAnimated = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    // Intersection Observer for animation trigger
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
      
      // Easing function (ease-out-quart)
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
        <div class="stats-card" style="--delay: {index * 100}ms">
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
    background: var(--bg);
  }
  
  .section-label {
    display: block;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }
  
  .section-label.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    transition-delay: 0.2s;
  }
  
  .stats-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .stats-card {
    text-align: center;
    padding: 2.5rem 1.5rem;
    background: var(--card-bg);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.6s ease forwards;
    animation-delay: var(--delay);
  }
  
  .stats-card:hover {
    transform: translateY(-8px);
    background: var(--bg-raised);
    border-color: var(--accent);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  .stats-number {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  
  .stats-label {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--fg-muted);
    line-height: 1.5;
    font-weight: 500;
  }
  
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .stats-card {
      padding: 2rem 1rem;
    }
    
    .stats-number {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }
    
    .stats-label {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-card {
      padding: 1.5rem 1rem;
    }
    
    .stats-number {
      font-size: 2rem;
    }
  }
</style>