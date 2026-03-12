<script lang="ts">
  import { theme } from '$lib/stores/theme';
  
  function toggleTheme() {
    theme.toggle();
  }
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme}
  aria-label="Toggle light/dark mode"
>
  <svg 
    class="theme-icon theme-icon--sun" 
    class:hidden={$theme === 'dark'}
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
  
  <svg 
    class="theme-icon theme-icon--moon" 
    class:hidden={$theme === 'light'}
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: transparent;
    color: var(--fg-muted);
    transition: all var(--transition);
    position: relative;
  }
  
  .theme-toggle:hover {
    background: var(--bg-raised);
    color: var(--fg);
    transform: scale(1.05);
  }
  
  .theme-toggle:active {
    transform: scale(0.95);
  }
  
  .theme-icon {
    transition: all 0.3s ease;
    position: absolute;
  }
  
  .theme-icon.hidden {
    opacity: 0;
    transform: scale(0.8) rotate(90deg);
  }
  
  .theme-icon:not(.hidden) {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
</style>