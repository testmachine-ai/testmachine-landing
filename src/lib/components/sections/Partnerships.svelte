<script lang="ts">
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
    <div class="partnerships-inner" data-animate>
      <span class="section-label">Trusted By</span>
      <h2 class="section-title">Securing tokens and protocols for leading exchanges, protocols, and institutions.</h2>
      <div class="partnerships-grid">
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
  </div>
</section>

<style>
  .partnerships {
    padding: var(--section-py) 0;
    border-top: 1px solid var(--border);
  }

  .partnerships-inner {
    text-align: center;
  }

  .section-label {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 600;
    color: var(--fg);
    letter-spacing: -0.02em;
    line-height: 1.3;
    max-width: 600px;
    margin: 0 auto clamp(28px, 4vw, 48px);
  }

  .partnerships-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    max-width: 800px;
    margin: 0 auto;
    background: var(--border);
    border: 1px solid var(--border);
  }
  
  .partnership-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    background: var(--bg);
    min-height: 88px;
    transition: background var(--transition);
  }
  
  .partnership-card:hover {
    background: var(--bg-raised);
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
      gap: 1px;
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
