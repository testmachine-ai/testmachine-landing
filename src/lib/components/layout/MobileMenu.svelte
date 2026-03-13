<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  
  const dispatch = createEventDispatcher();
  
  export let open = false;
  
  function handleLinkClick() {
    dispatch('close');
  }
</script>

<div class="mobile-menu" class:active={open} aria-hidden={!open}>
  <div class="mobile-menu-inner">
    <a 
      href="/" 
      class="mobile-menu-link"
      class:active={$page.url.pathname === '/'}
      on:click={handleLinkClick}
    >
      Home
    </a>
    <a 
      href="/solutions" 
      class="mobile-menu-link"
      class:active={$page.url.pathname === '/solutions'}
      on:click={handleLinkClick}
    >
      How It Works
    </a>
    <a 
      href="/products" 
      class="mobile-menu-link"
      class:active={$page.url.pathname === '/products'}
      on:click={handleLinkClick}
    >
      Products
    </a>
    <a 
      href="/blog" 
      class="mobile-menu-link"
      class:active={$page.url.pathname === '/blog'}
      on:click={handleLinkClick}
    >
      Blog
    </a>
    <a
      href="/#contact"
      class="mobile-menu-link"
      on:click={handleLinkClick}
    >
      Contact
    </a>
    
    <div class="mobile-menu-cta">
      <a href="https://app.testmachine.ai/" class="btn btn--primary btn--block">
        Launch App
      </a>
    </div>
  </div>
</div>

<style>
  .mobile-menu {
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg);
    z-index: 99;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .mobile-menu.active {
    transform: translateX(0);
  }
  
  .mobile-menu-inner {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    height: 100%;
  }
  
  .mobile-menu-link {
    display: block;
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--fg);
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    transition: color var(--transition);
  }
  
  .mobile-menu-link:hover,
  .mobile-menu-link.active {
    color: var(--accent);
  }
  
  .mobile-menu-cta {
    margin-top: auto;
    padding-top: 2rem;
  }
  
  @media (min-width: 769px) {
    .mobile-menu {
      display: none;
    }
  }
</style>