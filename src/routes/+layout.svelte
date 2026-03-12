<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import Navigation from '$lib/components/layout/Navigation.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import '../app.css';

  // Initialize theme on mount + global scroll animations
  onMount(() => {
    if (browser) {
      const savedTheme = localStorage.getItem('tm-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      theme.set(savedTheme);
      
      // Global IntersectionObserver for [data-animate] elements
      // Mirrors the original site's scroll animation behavior
      const animObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.15 }
      );
      
      // Observe existing elements
      document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));
      
      // Also observe dynamically added elements via MutationObserver
      const mutObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (node.hasAttribute('data-animate')) {
                animObserver.observe(node);
              }
              node.querySelectorAll?.('[data-animate]')?.forEach((el: Element) => animObserver.observe(el));
            }
          });
        });
      });
      mutObserver.observe(document.body, { childList: true, subtree: true });
      
      return () => {
        animObserver.disconnect();
        mutObserver.disconnect();
      };
    }
  });
</script>

<svelte:head>
  <title>TestMachine — Web3 Security That Actually Works</title>
  <meta name="description" content="AI-powered Web3 security. Continuous penetration testing, vulnerability detection, and automated fixes for smart contracts and blockchain protocols." />
  <meta name="keywords" content="Web3 security, smart contract audit, blockchain security, AI security, penetration testing, DeFi security" />
  <meta property="og:title" content="TestMachine — Web3 Security That Actually Works" />
  <meta property="og:description" content="AI-powered continuous security for Web3. Predator technology finds exploitable vulnerabilities before hackers do." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://testmachine.ai" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Navigation />

<main>
  <slot />
</main>

<Footer />

<style>
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: var(--nav-h);
    -webkit-text-size-adjust: 100%;
  }

  :global(body) {
    font-family: var(--font);
    font-size: 17px;
    line-height: 1.7;
    color: var(--fg);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    transition: background var(--transition), color var(--transition);
    margin: 0;
    padding: 0;
  }

  main {
    min-height: 100vh;
  }
</style>