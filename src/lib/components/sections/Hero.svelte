<section class="hero" id="home">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-brand">
        <img src="/assets/logo-icon-white.png" alt="TestMachine logo" class="hero-brand-icon" />
        <span class="hero-brand-name">TESTMACHINE</span>
      </div>

      <h1 class="hero-title">
        Security Infrastructure<br />for Web3
      </h1>

      <p class="hero-subtitle">
        From token risk scoring to deep protocol analysis — security that scales with the chain. Two products. Zero false positives.
      </p>

      <div class="hero-actions">
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
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: var(--nav-h);
    overflow: hidden;
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.28 0.015 260 / 0.7), transparent 70%),
      radial-gradient(ellipse 60% 40% at 80% 50%, oklch(0.22 0.01 200 / 0.3), transparent 60%),
      radial-gradient(ellipse 50% 50% at 20% 80%, oklch(0.20 0.01 280 / 0.2), transparent 60%);
    pointer-events: none;
  }
  
  :global([data-theme="light"]) .hero-bg {
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.92 0.01 260 / 0.5), transparent 70%),
      radial-gradient(ellipse 60% 40% at 80% 50%, oklch(0.95 0.005 200 / 0.3), transparent 60%);
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 0;
  }
  
  @keyframes heroFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 36px;
    animation: heroFadeIn 0.8s ease 0.2s both;
  }
  
  .hero-brand-icon {
    width: 72px;
    height: 72px;
    filter: brightness(0) invert(70%) sepia(40%) saturate(500%) hue-rotate(130deg) brightness(1.05);
  }
  
  :global([data-theme="light"]) .hero-brand-icon {
    filter: brightness(0) invert(45%) sepia(50%) saturate(600%) hue-rotate(130deg);
  }
  
  .hero-brand-name {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--fg-muted);
  }
  
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    line-height: 1.02;
    letter-spacing: -0.035em;
    margin-bottom: 24px;
    animation: heroFadeIn 0.8s ease 0.4s both;
  }
  
  .hero-subtitle {
    font-family: var(--font-mono);
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--fg-muted);
    margin-bottom: 48px;
    font-weight: 400;
    animation: heroFadeIn 0.8s ease 0.6s both;
  }
  
  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    animation: heroFadeIn 0.8s ease 0.8s both;
  }
  
  .hero-scroll-hint {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.65;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .hero-scroll-hint:hover {
    opacity: 0.8;
  }
  
  .hero-scroll-line {
    width: 1px;
    height: 40px;
    position: relative;
    overflow: hidden;
    background: var(--border);
  }

  .hero-scroll-line::after {
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, var(--accent));
    animation: scrollLine 2s ease-in-out infinite;
  }

  @keyframes scrollLine {
    0% { top: -40px; }
    50% { top: 40px; }
    50.01% { top: -40px; }
    100% { top: -40px; }
  }

  .hero-scroll-text {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--fg-dim);
  }

  @media (max-width: 1024px) {
    .hero-title {
      font-size: clamp(2.5rem, 7vw, 4.5rem);
    }
  }
  
  @media (max-width: 768px) {
    .hero-scroll-hint { display: none; }
    
    .hero-content {
      padding: 48px 0 64px;
    }
    
    .hero-title {
      font-size: clamp(2.25rem, 8vw, 3.5rem);
    }

    .hero-brand-icon {
      width: 64px;
      height: 64px;
    }
  }

  @media (max-width: 480px) {
    .hero {
      min-height: calc(100vh - 40px);
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
