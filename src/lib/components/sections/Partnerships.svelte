<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
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

<section class="partnerships" id="partnerships">
  <div class="container">
    <h2 class="section-title" class:visible={mounted}>Trusted By</h2>
    <p class="partnerships-desc" class:visible={mounted}>
      Securing tokens and protocols for leading exchanges, protocols, 
      and institutions across the ecosystem.
    </p>
    <div class="partnerships-grid" class:visible={mounted}>
      {#each partners as partner}
        <div class="partnership-card">
          {#if partner.isText}
            <span class="partnership-text-logo">{partner.name}</span>
          {:else}
            <img 
              src={partner.logo} 
              alt={partner.name} 
              loading="lazy"
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
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-raised);
  }
  
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.05s;
  }
  
  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .partnerships-desc {
    font-size: 0.9375rem;
    color: var(--fg-muted);
    line-height: 1.75;
    max-width: 560px;
    margin-bottom: clamp(28px, 4vw, 40px);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.1s;
  }
  
  .partnerships-desc.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .partnerships-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.15s;
  }
  
  .partnerships-grid.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .partnership-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    border: 1px solid var(--border-subtle);
    min-height: 88px;
    transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
  }
  
  .partnership-card:hover {
    border-color: var(--border);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px oklch(0 0 0 / 0.1);
  }
  
  .partnership-card img {
    height: 24px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
    opacity: 0.6;
    filter: var(--partner-filter);
    transition: opacity var(--transition), filter var(--transition);
  }
  
  .partnership-card:hover img {
    opacity: 0.9;
  }
  
  .partnership-text-logo {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    opacity: 0.6;
    transition: opacity var(--transition);
  }
  
  .partnership-card:hover .partnership-text-logo {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    .partnerships-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .partnerships-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .partnership-card {
      padding: 20px 14px;
      min-height: 64px;
    }
    
    .partnership-card img {
      height: 20px;
    }
  }
</style>
