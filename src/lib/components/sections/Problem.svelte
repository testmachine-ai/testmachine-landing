<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let sectionElement: HTMLElement;
  
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
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => {
      observer.disconnect();
    };
  });
</script>

<section class="problem" id="problem" bind:this={sectionElement}>
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
    background: var(--bg-deeper);
    position: relative;
  }
  
  .problem-inner {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .problem-inner.visible,
  .problem-inner:global(.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: var(--fg-primary);
    font-family: var(--font-sans);
  }
  
  .problem-text {
    font-size: clamp(1.125rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    color: var(--fg-muted);
    font-family: var(--font-serif);
    font-weight: 400;
  }
  
  /* Add subtle emphasis to the numbers */
  .problem-text {
    position: relative;
  }
  
  /* Target specific dollar amounts and numbers for emphasis */
  .problem-text::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      var(--accent-red-subtle) 20%,
      transparent 40%,
      var(--accent-red-subtle) 60%,
      transparent 100%
    );
    opacity: 0.03;
    pointer-events: none;
    border-radius: 8px;
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .problem {
      padding: calc(var(--section-py) * 0.75) 0;
    }
    
    .section-title {
      margin-bottom: 1.5rem;
    }
    
    .problem-text {
      font-size: 1.125rem;
    }
  }
  
  /* Dark mode specific adjustments */
  :global([data-theme="dark"]) .problem {
    background: var(--bg-deeper);
  }
  
  :global([data-theme="dark"]) .problem-text::after {
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(248, 113, 113, 0.05) 20%,
      transparent 40%,
      rgba(248, 113, 113, 0.05) 60%,
      transparent 100%
    );
  }
</style>