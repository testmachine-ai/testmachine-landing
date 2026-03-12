<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let showSuccess = false;
  
  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    newsletter: false
  };
  
  let formErrors: Record<string, string> = {};
  let isSubmitting = false;
  
  onMount(() => {
    mounted = true;
  });

  function validateForm(): boolean {
    formErrors = {};
    if (!formData.firstName.trim()) formErrors.firstName = 'Required';
    if (!formData.lastName.trim()) formErrors.lastName = 'Required';
    if (!formData.email.trim()) formErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) formErrors.email = 'Invalid email';
    if (!formData.message.trim()) formErrors.message = 'Required';
    return Object.keys(formErrors).length === 0;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;
    isSubmitting = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess = true;
      formData = { firstName: '', lastName: '', email: '', message: '', newsletter: false };
      setTimeout(() => { showSuccess = false; }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function clearError(field: string) {
    if (formErrors[field]) {
      const { [field]: _, ...rest } = formErrors;
      formErrors = rest;
    }
  }
</script>

<section class="contact" id="contact">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info" class:visible={mounted}>
        <h2 class="section-title">Get in Touch</h2>
        <p class="contact-desc">
          Ready to secure your Web3 project? Let's talk about how TestMachine 
          can protect your protocol.
        </p>
        <p class="contact-response">
          We typically respond within 24 hours.
        </p>
        <p class="contact-email-alt">
          Or email us directly at 
          <a href="mailto:contact@testmachine.ai">contact@testmachine.ai</a>
        </p>
        
        <div class="contact-details">
          <div class="contact-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>20 W 34th St, New York, NY</span>
          </div>
        </div>
        
        <div class="contact-social">
          <a href="https://x.com/testmachine_ai" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="X (Twitter)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/testmachine-ai/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="contact-form-wrap" class:visible={mounted}>
        {#if !showSuccess}
          <form class="contact-form" on:submit={handleSubmit} novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First name</label>
                <input type="text" id="firstName" bind:value={formData.firstName} on:input={() => clearError('firstName')} required autocomplete="given-name" />
              </div>
              <div class="form-group">
                <label for="lastName">Last name</label>
                <input type="text" id="lastName" bind:value={formData.lastName} on:input={() => clearError('lastName')} required autocomplete="family-name" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" bind:value={formData.email} on:input={() => clearError('email')} required autocomplete="email" />
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" rows="5" bind:value={formData.message} on:input={() => clearError('message')} required></textarea>
            </div>
            
            <div class="form-checkbox-group">
              <label class="form-checkbox">
                <input type="checkbox" bind:checked={formData.newsletter} />
                <span class="checkbox-box"></span>
                <span>Subscribe to our newsletter for updates</span>
              </label>
            </div>
            
            <button type="submit" class="btn btn--primary btn--block" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        {:else}
          <div class="form-success active">
            <p class="form-success-title">Message Sent</p>
            <p class="form-success-text">Thank you for reaching out. We'll get back to you shortly.</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
  }
  
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: clamp(40px, 6vw, 80px);
    align-items: start;
  }
  
  .contact-info {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .contact-info.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    margin-bottom: 1.5rem;
  }
  
  .contact-desc {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--fg-muted);
    line-height: 1.7;
    margin-bottom: 12px;
  }
  
  .contact-response {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--fg-dim);
    margin-bottom: 8px;
  }
  
  .contact-email-alt {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--fg-dim);
    margin-bottom: 28px;
  }
  
  .contact-email-alt a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color var(--transition);
  }
  
  .contact-email-alt a:hover {
    color: var(--accent-hover);
  }
  
  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .contact-detail {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.875rem;
    color: var(--fg-muted);
  }
  
  .contact-detail svg {
    color: var(--fg-dim);
    flex-shrink: 0;
  }
  
  .contact-social {
    display: flex;
    gap: 8px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    border: 1px solid var(--border);
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
  
  .contact-form-wrap {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.1s;
  }
  
  .contact-form-wrap.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  
  .form-group label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--fg-muted);
    margin-bottom: 8px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border);
    background: var(--input-bg);
    color: var(--fg);
    font-size: 0.9375rem;
    border-radius: 0;
    outline: none;
    transition: border-color var(--transition), box-shadow var(--transition);
    font-family: inherit;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .form-checkbox-group {
    margin-top: 4px;
  }
  
  .form-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    font-size: 0.8125rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }
  
  .form-checkbox input { display: none; }
  
  .checkbox-box {
    width: 18px;
    height: 18px;
    border: 1px solid var(--border);
    flex-shrink: 0;
    margin-top: 2px;
    position: relative;
    transition: all var(--transition);
  }
  
  .checkbox-box::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 5px;
    width: 5px;
    height: 9px;
    border-right: 1.5px solid var(--btn-fg);
    border-bottom: 1.5px solid var(--btn-fg);
    transform: rotate(45deg) scale(0);
    transition: transform var(--transition);
  }
  
  .form-checkbox input:checked + .checkbox-box {
    background: var(--btn-bg);
    border-color: var(--btn-bg);
  }
  
  .form-checkbox input:checked + .checkbox-box::after {
    transform: rotate(45deg) scale(1);
  }
  
  .form-success {
    display: none;
    padding: 48px 20px;
    text-align: center;
    border: 1px solid var(--border);
  }
  
  .form-success.active {
    display: block;
  }
  
  .form-success-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .form-success-text {
    font-size: 0.875rem;
    color: var(--fg-muted);
  }
  
  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .social-link {
      width: 44px;
      height: 44px;
    }
  }
  
  @media (max-width: 480px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
