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

  interface Partner {
    name: string;
    logo: string;
    isText?: boolean;
  }

  const partners: Partner[] = [
    { name: 'Avalanche', logo: '/assets/partner-avalanche.png' },
    { name: 'Concrete', logo: '/assets/partner-concrete.png' },
    { name: 'InferenceLabs', logo: '/assets/partner-inferencelabs.png' },
    { name: 'Infinifi', logo: '/assets/partner-infinifi.png' },
    { name: 'Spectral', logo: '/assets/partner-spectral.png' },
    { name: 'Paragon', logo: '/assets/partner-paragon.png' },
    { name: 'coinbase', logo: '', isText: true },
    { name: 'Membrane', logo: '/assets/partner-membrane.png' },
  ];
</script>

<section class="partnerships" id="partnerships" bind:this={sectionElement}>
  <div class="container">
    <h2 class="section-title" class:visible={mounted}>Trusted By</h2>
    <p class="partnerships-desc" class:visible={mounted}>
      Securing tokens and protocols for leading exchanges, protocols, 
      and institutions across the ecosystem.
    </p>
    <div class="partnerships-grid" class:visible={mounted}>
      {#each partners as partner, index}
        <div 
          class="partnership-card" 
          style="--delay: {index * 0.1}s"
          class:animate-in-delayed={mounted}
        >
          {#if partner.isText}
            <span class="partnership-text-logo">{partner.name}</span>
          {:else}
            <img 
              src={partner.logo} 
              alt={partner.name} 
              loading="lazy"
              class="partnership-logo"
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .partnerships {
    padding: var(--section-py) 0;
    background: var(--bg-raised);
    position: relative;
  }
  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--fg-primary);
    font-family: var(--font-sans);
    text-align: center;
    margin: 0 0 1.5rem 0;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .section-title.visible,
  .section-title:global(.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  .partnerships-desc {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
    color: var(--fg-muted);
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem auto;
    font-family: var(--font-serif);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out 0.1s;
  }
  
  .partnerships-desc.visible,
  .partnerships-desc:global(.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  .partnerships-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease-out 0.2s;
  }
  
  .partnerships-grid.visible,
  .partnerships-grid:global(.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  .partnership-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: var(--bg-base);
    border: 1px solid var(--border-muted);
    border-radius: 12px;
    min-height: 120px;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  
  .partnership-card.animate-in-delayed {
    animation: slideInUp 0.6s ease-out forwards;
    animation-delay: var(--delay, 0s);
  }
  
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .partnership-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    border-color: var(--border-subtle);
  }
  
  :global([data-theme="dark"]) .partnership-card:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
  
  .partnership-logo {
    max-width: 140px;
    max-height: 60px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: opacity(0.8);
    transition: filter 0.3s ease;
  }
  
  .partnership-card:hover .partnership-logo {
    filter: opacity(1);
  }
  
  .partnership-text-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--fg-primary);
    font-family: var(--font-sans);
    text-transform: lowercase;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  .partnership-card:hover .partnership-text-logo {
    opacity: 1;
  }
  
  /* Dark mode logo adjustments */
  :global([data-theme="dark"]) .partnership-logo {
    filter: brightness(0.9) opacity(0.8);
  }
  
  :global([data-theme="dark"]) .partnership-card:hover .partnership-logo {
    filter: brightness(1) opacity(1);
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .partnerships {
      padding: calc(var(--section-py) * 0.75) 0;
    }
    
    .partnerships-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
      margin-bottom: 0;
    }
    
    .partnership-card {
      padding: 1.5rem;
      min-height: 100px;
    }
    
    .partnership-logo {
      max-width: 120px;
      max-height: 50px;
    }
    
    .partnership-text-logo {
      font-size: 1.25rem;
    }
    
    .partnerships-desc {
      margin-bottom: 3rem;
    }
  }
  
  @media (max-width: 480px) {
    .partnerships-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Enhanced grid layout for better visual balance */
  @media (min-width: 769px) {
    .partnerships-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  /* Subtle background pattern */
  .partnerships::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(45, 212, 191, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(45, 212, 191, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  
  :global([data-theme="dark"]) .partnerships::before {
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(45, 212, 191, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(45, 212, 191, 0.05) 0%, transparent 50%);
  }
</style>