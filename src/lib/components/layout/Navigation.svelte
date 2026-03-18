<script lang="ts">
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  import ThemeToggle from './ThemeToggle.svelte';
  import MobileMenu from './MobileMenu.svelte';
  
  let scrolled = false;
  let navElement: HTMLElement;
  let mobileMenuOpen = false;
  let productsDropdownOpen = false;
  
  function handleScroll() {
    scrolled = window.scrollY > 40;
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
</script>

<svelte:window on:scroll={handleScroll} />

<nav bind:this={navElement} class="nav" class:scrolled>
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <img src="/assets/logo-icon-white.png" alt="" class="nav-logo-icon" />
      <span class="nav-logo-text">TestMachine</span>
    </a>
    
    <div class="nav-links">
      <a href="/" class="nav-link" class:nav-link--active={$page.url.pathname === '/'}>Home</a>
      <a href="/solutions" class="nav-link" class:nav-link--active={$page.url.pathname === '/solutions'}>How It Works</a>
      
      <div 
        class="nav-dropdown" 
        on:mouseenter={() => productsDropdownOpen = true}
        on:mouseleave={() => productsDropdownOpen = false}
      >
        <span class="nav-link" class:nav-link--active={$page.url.pathname.startsWith('/products')}>
          Products
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" class="dropdown-arrow">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="nav-dropdown-menu" class:show={productsDropdownOpen}>
          <a href="/products/token-custody" class="nav-dropdown-item">Token Custody</a>
          <a href="/products/azimuth" class="nav-dropdown-item">Azimuth</a>
        </div>
      </div>
      
      <a href="/blog" class="nav-link" class:nav-link--active={$page.url.pathname === '/blog'}>Blog</a>
      <a href="/#contact" class="nav-link">Contact</a>
    </div>
    
    <div class="nav-actions">
      <ThemeToggle />
      <a href="https://app.testmachine.ai/" class="btn btn--primary btn--nav">Launch App</a>
      
      <button 
        class="hamburger" 
        class:active={mobileMenuOpen}
        on:click={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</nav>

<MobileMenu 
  open={mobileMenuOpen} 
  on:close={closeMobileMenu}
/>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-h);
    z-index: 1000;
    background: var(--nav-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid transparent;
    transition: border-color var(--transition), background var(--transition);
  }
  
  .nav.scrolled {
    border-bottom-color: var(--border-subtle);
    background: oklch(0.18 0.005 260 / 0.95);
  }
  
  :global([data-theme="light"]) .nav.scrolled {
    background: oklch(0.97 0.003 260 / 0.95);
  }
  
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 40px);
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
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
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  
  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--fg-muted);
    transition: color var(--transition);
    position: relative;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width var(--transition);
  }
  
  .nav-link:hover,
  .nav-link.nav-link--active {
    color: var(--fg);
  }
  
  .nav-link:hover::after,
  .nav-link.nav-link--active::after {
    width: 100%;
  }
  
  .nav-link.nav-link--active {
    color: var(--accent);
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .hamburger {
    display: none;
    width: 40px;
    height: 40px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    z-index: 1001;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: var(--fg);
    transition: all var(--transition);
    transform-origin: center;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }
  
  @media (max-width: 1024px) {
    .nav-links {
      display: none;
    }
    
    .hamburger {
      display: flex;
    }
  }
  
  .nav-dropdown {
    position: relative;
  }
  
  .nav-dropdown .nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: default;
  }
  
  .dropdown-arrow {
    transition: transform var(--transition);
  }
  
  .nav-dropdown:hover .dropdown-arrow {
    transform: rotate(180deg);
  }
  
  .nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-panel);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 8px 0;
    min-width: 160px;
    box-shadow: 0 8px 32px oklch(0 0 0 / 0.12);
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(-8px);
    transition: all var(--transition);
    z-index: 1000;
  }
  
  .nav-dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
  
  .nav-dropdown-item {
    display: block;
    padding: 8px 16px;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--fg-muted);
    transition: all var(--transition);
    white-space: nowrap;
  }
  
  .nav-dropdown-item:hover {
    background: var(--bg-subtle);
    color: var(--fg);
  }

  @media (max-width: 768px) {
    .nav-logo-icon {
      width: 34px;
      height: 34px;
    }
    
    .nav-logo-text {
      font-size: 1.3rem;
    }
    
    .hamburger {
      width: 44px;
      height: 44px;
    }
  }
</style>
