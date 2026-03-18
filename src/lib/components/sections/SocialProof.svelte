<section class="social-proof" id="social-proof">
  <div class="container">
    <div class="social-proof-inner">
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
    padding: clamp(64px, 8vw, 100px) 0;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg);
  }
  
  @keyframes sectionFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .social-proof-inner {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    animation: sectionFadeIn 0.6s ease both;
  }
  
  .social-proof-text {
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 2.5vw, 1.625rem);
    font-weight: 400;
    line-height: 1.6;
    color: var(--fg);
    font-style: italic;
    margin-bottom: 32px;
    position: relative;
    padding: 0 24px;
  }
  
  .social-proof-text::before {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    background: var(--accent);
    margin: 0 auto 32px;
  }
  
  .social-proof-attribution {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .social-proof-name {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
  }
  
  .social-proof-role {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--fg-muted);
  }
  
  @media (max-width: 768px) {
    .social-proof-text {
      font-size: clamp(1rem, 2vw, 1.25rem);
      padding: 0;
    }
  }
</style>
