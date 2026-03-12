<script lang="ts">
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  import ThemeToggle from './ThemeToggle.svelte';
  import MobileMenu from './MobileMenu.svelte';
  
  let scrolled = false;
  let navElement: HTMLElement;
  let mobileMenuOpen = false;
  
  // Handle scroll state for glassmorphism effect
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
    <!-- Logo -->
    <a href="/" class="nav-logo">
      <img src="/assets/logo-icon-white.png" alt="" class="nav-logo-icon" />
      <span class="nav-logo-text">TestMachine</span>
    </a>
    
    <!-- Desktop Navigation -->
    <div class="nav-links">
      <a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>Home</a>
      <a href="/solutions" class="nav-link" class:active={$page.url.pathname === '/solutions'}>How It Works</a>
      <a href="/products" class="nav-link" class:active={$page.url.pathname === '/products'}>Products</a>
      <a href="/blog" class="nav-link" class:active={$page.url.pathname === '/blog'}>Blog</a>
      <a href="/contact" class="nav-link" class:active={$page.url.pathname === '/contact'}>Contact</a>
    </div>
    
    <!-- Actions -->
    <div class="nav-actions">
      <ThemeToggle />
      <a href="https://app.testmachine.ai/" class="btn btn--primary btn--nav">Launch App</a>
      
      <!-- Hamburger -->
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

<!-- Mobile Menu -->
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
    z-index: 100;
    background: var(--nav-bg);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid transparent;
    transition: all var(--transition);
    height: var(--nav-h);
  }
  
  .nav.scrolled {
    background: var(--nav-bg);
    border-bottom-color: var(--border);
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.1);
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
    gap: 12px;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.125rem;
    letter-spacing: 0.05em;
    color: var(--fg);
    transition: opacity var(--transition);
  }
  
  .nav-logo:hover {
    opacity: 0.8;
  }
  
  .nav-logo-icon {
    width: 28px;
    height: 28px;
    filter: var(--logo-filter);
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--fg-muted);
    transition: color var(--transition);
    position: relative;
  }
  
  .nav-link:hover {
    color: var(--fg);
  }
  
  .nav-link.active {
    color: var(--accent);
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .btn--nav {
    font-size: 0.75rem;
    padding: 10px 20px;
  }
  
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--fg);
    transition: all 0.3s ease;
    transform-origin: center;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .hamburger {
      display: flex;
    }
    
    .btn--nav {
      display: none;
    }
  }
</style>