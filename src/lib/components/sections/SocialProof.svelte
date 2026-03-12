<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="social-proof" id="social-proof">
  <div class="container">
    <div class="social-proof-inner" class:visible={mounted}>
      <blockquote class="social-proof-text">
        &ldquo;[TestMachine] stood out because it achieved 100% accuracy on all tokens, 
        with no false positives or negatives, even catching human errors in our own reviews.&rdquo;
      </blockquote>
      <div class="social-proof-attribution">
        <strong class="social-proof-name">Coinbase Blockchain Security Team</strong>
        <span class="social-proof-role">during evaluation of TestMachine for DEX token safety</span>
      </div>
    </div>
  </div>
</section>

<style>
  .social-proof {
    padding: var(--section-py) 0;
    background: var(--bg-raised);
  }
  
  .social-proof-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .social-proof-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .social-proof-text {
    font-family: var(--font-body);
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 400;
    line-height: 1.6;
    color: var(--fg);
    font-style: italic;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .social-proof-text::before,
  .social-proof-text::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 2px;
    background: var(--accent);
  }
  
  .social-proof-text::before {
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .social-proof-text::after {
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .social-proof-attribution {
    font-family: var(--font-mono);
  }
  
  .social-proof-name {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--fg);
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .social-proof-role {
    font-size: 0.8rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .social-proof {
      padding: clamp(60px, 8vw, 100px) 0;
    }
    
    .social-proof-text {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }
    
    .social-proof-text::before,
    .social-proof-text::after {
      width: 30px;
    }
    
    .social-proof-name {
      font-size: 0.85rem;
    }
    
    .social-proof-role {
      font-size: 0.75rem;
    }
  }
</style>