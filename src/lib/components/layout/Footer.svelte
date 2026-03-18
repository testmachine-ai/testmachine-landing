<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="nav-logo">
          <img src="/assets/logo-icon-white.png" alt="" class="nav-logo-icon" />
          <span class="nav-logo-text">TestMachine</span>
        </a>
        <p class="footer-address">TestMachine Inc., 20 W 34th St, New York, NY</p>
      </div>
      
      <div class="footer-col">
        <h4 class="footer-heading">Company</h4>
        <ul class="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/solutions">How It Works</a></li>
          <li><a href="/products/token-custody">Products</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4 class="footer-heading">Product</h4>
        <ul class="footer-links">
          <li><a href="https://app.testmachine.ai/">Launch App</a></li>
          <li><a href="/#contact">Contact</a></li>
          <li><a href="/#contact">Privacy Policy</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4 class="footer-heading">Connect</h4>
        <ul class="footer-links">
          <li><a href="https://x.com/testmachine_ai" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
          <li><a href="https://www.linkedin.com/company/testmachine-ai/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025–{currentYear} TestMachine Inc. All rights reserved.</p>
      <div class="footer-social">
        <a href="https://x.com/testmachine_ai" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="X (Twitter)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/testmachine-ai/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: 56px 0 32px;
    background: var(--bg-raised);
    border-top: 1px solid var(--border-subtle);
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border-subtle);
    margin-bottom: 28px;
  }
  
  .footer-brand .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  
  .nav-logo-icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
    filter: brightness(0) invert(70%) sepia(40%) saturate(500%) hue-rotate(130deg) brightness(1.05);
    transition: filter var(--transition);
  }
  
  :global([data-theme="light"]) .nav-logo-icon {
    filter: brightness(0) invert(45%) sepia(50%) saturate(600%) hue-rotate(130deg);
  }
  
  .nav-logo-text {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  
  .footer-address {
    font-size: 0.8125rem;
    color: var(--fg-dim);
    line-height: 1.5;
  }
  
  .footer-heading {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--fg);
    margin-bottom: 16px;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 10px;
  }
  
  .footer-links a {
    font-size: 0.8125rem;
    color: var(--fg-muted);
    transition: color var(--transition);
    position: relative;
  }
  
  .footer-links a:hover {
    color: var(--fg);
  }
  
  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .footer-bottom p {
    font-size: 0.75rem;
    color: var(--fg-dim);
  }
  
  .footer-social {
    display: flex;
    gap: 8px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
    border: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fg-muted);
    transition: all var(--transition);
  }
  
  .social-link:hover {
    color: var(--fg);
    border-color: var(--fg);
    transform: translateY(-1px);
  }
  
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 2fr 1fr 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    
    .footer-brand {
      grid-column: 1 / -1;
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
  }
  
  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
