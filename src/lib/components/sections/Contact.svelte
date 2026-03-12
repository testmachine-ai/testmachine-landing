<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let sectionElement: HTMLElement;
  let contactInfoElement: HTMLElement;
  let contactFormElement: HTMLElement;
  let showSuccess = false;
  
  // Form state
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
    
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    [contactInfoElement, contactFormElement].forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  });

  function validateForm(): boolean {
    formErrors = {};
    
    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      formErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      formErrors.message = 'Message must be at least 10 characters';
    }
    
    return Object.keys(formErrors).length === 0;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showSuccess = true;
      
      // Reset form
      formData = {
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        newsletter: false
      };
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        showSuccess = false;
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error (you could show an error message)
    } finally {
      isSubmitting = false;
    }
  }

  function clearError(field: string) {
    if (formErrors[field]) {
      const { [field]: removed, ...rest } = formErrors;
      formErrors = rest;
    }
  }
</script>

<section class="contact" id="contact" bind:this={sectionElement}>
  <div class="container">
    <div class="contact-grid">
      <div 
        class="contact-info" 
        class:visible={mounted}
        bind:this={contactInfoElement}
      >
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
          <a 
            href="https://x.com/testmachine_ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="social-link" 
            aria-label="X (Twitter)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/company/testmachine-ai/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="social-link" 
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div 
        class="contact-form-wrap" 
        class:visible={mounted}
        bind:this={contactFormElement}
      >
        <form 
          class="contact-form" 
          class:success={showSuccess}
          on:submit={handleSubmit} 
          novalidate
        >
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                bind:value={formData.firstName}
                on:input={() => clearError('firstName')}
                class:error={formErrors.firstName}
                required 
                autocomplete="given-name"
              />
              {#if formErrors.firstName}
                <span class="form-error">{formErrors.firstName}</span>
              {/if}
            </div>
            <div class="form-group">
              <label for="lastName">Last name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                bind:value={formData.lastName}
                on:input={() => clearError('lastName')}
                class:error={formErrors.lastName}
                required 
                autocomplete="family-name"
              />
              {#if formErrors.lastName}
                <span class="form-error">{formErrors.lastName}</span>
              {/if}
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              bind:value={formData.email}
              on:input={() => clearError('email')}
              class:error={formErrors.email}
              required 
              autocomplete="email"
            />
            {#if formErrors.email}
              <span class="form-error">{formErrors.email}</span>
            {/if}
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              bind:value={formData.message}
              on:input={() => clearError('message')}
              class:error={formErrors.message}
              required
            ></textarea>
            {#if formErrors.message}
              <span class="form-error">{formErrors.message}</span>
            {/if}
          </div>
          
          <div class="form-checkbox-group">
            <label class="form-checkbox">
              <input 
                type="checkbox" 
                name="newsletter" 
                bind:checked={formData.newsletter}
              />
              <span class="checkbox-box"></span>
              <span>Subscribe to our newsletter for updates</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            class="btn btn--primary btn--block"
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              Sending...
            {:else}
              Submit
            {/if}
          </button>
        </form>
        
        <div class="form-success" class:visible={showSuccess}>
          <p class="form-success-title">Message Sent</p>
          <p class="form-success-text">
            Thank you for reaching out. We'll get back to you shortly.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    padding: var(--section-py) 0;
    background: var(--bg-base);
    position: relative;
  }
  
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  
  .contact-info {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease-out;
  }
  
  .contact-info.visible,
  .contact-info:global(.animate-in) {
    opacity: 1;
    transform: translateX(0);
  }
  
  .section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--fg-primary);
    font-family: var(--font-sans);
    margin: 0 0 1.5rem 0;
  }
  
  .contact-desc {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--fg-muted);
    margin-bottom: 1.5rem;
    font-family: var(--font-serif);
  }
  
  .contact-response {
    font-size: 1rem;
    color: var(--fg-secondary);
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .contact-email-alt {
    font-size: 1rem;
    color: var(--fg-muted);
    margin-bottom: 2rem;
  }
  
  .contact-email-alt a {
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 500;
  }
  
  .contact-email-alt a:hover {
    text-decoration: underline;
  }
  
  .contact-details {
    margin-bottom: 2rem;
  }
  
  .contact-detail {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9375rem;
    color: var(--fg-muted);
  }
  
  .contact-detail svg {
    color: var(--accent-primary);
    flex-shrink: 0;
  }
  
  .contact-social {
    display: flex;
    gap: 1rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--bg-raised);
    border: 1px solid var(--border-muted);
    border-radius: 8px;
    color: var(--fg-muted);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .social-link:hover {
    background: var(--accent-primary);
    border-color: var(--accent-primary);
    color: white;
    transform: translateY(-2px);
  }
  
  .contact-form-wrap {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease-out 0.1s;
  }
  
  .contact-form-wrap.visible,
  .contact-form-wrap:global(.animate-in) {
    opacity: 1;
    transform: translateX(0);
  }
  
  .contact-form {
    background: var(--bg-raised);
    border: 1px solid var(--border-muted);
    border-radius: 16px;
    padding: 2.5rem;
    position: relative;
  }
  
  .contact-form.success {
    pointer-events: none;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg-secondary);
    margin-bottom: 0.5rem;
    font-family: var(--font-sans);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--bg-base);
    border: 1px solid var(--border-muted);
    border-radius: 8px;
    font-size: 1rem;
    color: var(--fg-primary);
    font-family: var(--font-sans);
    transition: all 0.2s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.1);
  }
  
  .form-group input.error,
  .form-group textarea.error {
    border-color: #ef4444;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .form-error {
    display: block;
    font-size: 0.875rem;
    color: #ef4444;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .form-checkbox-group {
    margin-bottom: 2rem;
  }
  
  .form-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.9375rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }
  
  .form-checkbox input[type="checkbox"] {
    display: none;
  }
  
  .checkbox-box {
    width: 20px;
    height: 20px;
    background: var(--bg-base);
    border: 1px solid var(--border-muted);
    border-radius: 4px;
    position: relative;
    flex-shrink: 0;
    transition: all 0.2s ease;
    margin-top: 0.125rem;
  }
  
  .checkbox-box::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 7px;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .form-checkbox input:checked + .checkbox-box {
    background: var(--accent-primary);
    border-color: var(--accent-primary);
  }
  
  .form-checkbox input:checked + .checkbox-box::after {
    opacity: 1;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    font-family: var(--font-sans);
    text-decoration: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn--primary {
    background: var(--accent-gradient);
    color: white;
  }
  
  .btn--primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(45, 212, 191, 0.3);
  }
  
  .btn--primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .btn--block {
    width: 100%;
  }
  
  .form-success {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-raised);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .form-success.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .form-success-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--fg-primary);
    margin: 0 0 0.5rem 0;
    font-family: var(--font-sans);
  }
  
  .form-success-text {
    font-size: 1rem;
    color: var(--fg-muted);
    margin: 0;
    line-height: 1.5;
  }
  
  /* Mobile adjustments */
  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .contact-info {
      transform: translateY(-30px);
    }
    
    .contact-form-wrap {
      transform: translateY(30px);
    }
  }
  
  @media (max-width: 768px) {
    .contact {
      padding: calc(var(--section-py) * 0.75) 0;
    }
    
    .contact-grid {
      gap: 2.5rem;
    }
    
    .contact-form {
      padding: 2rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
    
    .social-link {
      width: 44px;
      height: 44px;
    }
  }
  
  @media (max-width: 480px) {
    .contact-form {
      padding: 1.5rem;
    }
    
    .form-group input,
    .form-group textarea {
      padding: 0.625rem 0.875rem;
    }
  }
</style>