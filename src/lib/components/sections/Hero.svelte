<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="hero" id="home">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-brand" class:visible={mounted}>
        <img src="/assets/logo-icon-white.png" alt="TestMachine logo" class="hero-brand-icon" />
        <span class="hero-brand-name">TESTMACHINE</span>
      </div>
      
      <h1 class="hero-title" class:visible={mounted}>
        Web3 Security<br />That Actually Works
      </h1>
      
      <p class="hero-subtitle" class:visible={mounted}>
        RL agents that attack your contracts. Risk scores across 8M+ tokens. 
        Security that never sleeps.
      </p>
      
      <div class="hero-actions" class:visible={mounted}>
        <a href="https://app.testmachine.ai/" class="btn btn--primary">
          Launch App
        </a>
        <a href="#trajectory" class="btn btn--secondary">
          See How It Works
        </a>
      </div>
    </div>
    
    <div class="hero-scroll-hint" aria-hidden="true">
      <div class="hero-scroll-line"></div>
      <span class="hero-scroll-text">Scroll</span>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: var(--nav-h) 0 0;
    background: linear-gradient(135deg, var(--bg) 0%, var(--bg-deeper) 100%);
    overflow: hidden;
  }
  
  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, var(--accent-glow) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(45, 212, 191, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .hero-content {
    text-align: center;
    z-index: 1;
    position: relative;
  }
  
  .hero-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    transition-delay: 0.2s;
  }
  
  .hero-brand.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-brand-icon {
    width: 48px;
    height: 48px;
    filter: var(--logo-filter);
  }
  
  .hero-brand-name {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--fg);
  }
  
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--fg);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
    transition-delay: 0.4s;
  }
  
  .hero-title.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-subtitle {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 400;
    line-height: 1.6;
    color: var(--fg-muted);
    max-width: 600px;
    margin: 0 auto 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    transition-delay: 0.6s;
  }
  
  .hero-subtitle.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
    transition-delay: 0.8s;
  }
  
  .hero-actions.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    animation: float 3s ease-in-out infinite;
  }
  
  .hero-scroll-line {
    width: 1px;
    height: 2rem;
    background: linear-gradient(to bottom, transparent, var(--fg-muted), transparent);
    animation: scroll-line 2s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }
  
  @keyframes scroll-line {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .hero {
      min-height: 90vh;
      text-align: center;
    }
    
    .hero-brand {
      gap: 12px;
      margin-bottom: 1.5rem;
    }
    
    .hero-brand-icon {
      width: 40px;
      height: 40px;
    }
    
    .hero-brand-name {
      font-size: 1.25rem;
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .hero-actions .btn {
      min-width: 200px;
    }
    
    .hero-scroll-hint {
      display: none;
    }
  }
</style>