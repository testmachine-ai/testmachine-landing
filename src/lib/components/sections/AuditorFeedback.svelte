<section class="auditor-feedback" id="auditor-feedback">
  <div class="container">
    <div class="auditor-feedback-inner" data-animate>
      <h3 class="auditor-feedback-subhead">What Auditors Are Saying</h3>
      <div class="auditor-feedback-grid">
        <div class="auditor-feedback-card">
          <blockquote class="auditor-feedback-quote">
            &ldquo;Overall, I&rsquo;m really impressed by the tool, mainly because it provides very high signal. As an auditor, I hate spending 15 minutes reading an AI finding only to realize it hallucinated a line of code and I&rsquo;ve wasted time. I can definitely see myself using this tool during audits to at least get baseline coverage across the project, knowing I don&rsquo;t have to spend time validating its output. I can also see myself recommending this tool to clients who do not have enough budget for a manual review.&rdquo;
          </blockquote>
          <div class="auditor-feedback-attribution">
            <a href="https://x.com/LuxLode" target="_blank" rel="noopener noreferrer" class="auditor-feedback-name">@LuxLode</a>
            <span class="auditor-feedback-role">Independent Security Auditor</span>
          </div>
        </div>
        <div class="auditor-feedback-card">
          <blockquote class="auditor-feedback-quote">
            &ldquo;Checking the results took least amount of time, as it includes roughly half of items (due to no FP present) and the findings are well-written.&rdquo;
          </blockquote>
          <div class="auditor-feedback-attribution">
            <a href="https://x.com/pessimistic_io" target="_blank" rel="noopener noreferrer" class="auditor-feedback-name">@pessimistic_io</a>
            <span class="auditor-feedback-role">Pessimistic Security</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .auditor-feedback {
    padding: var(--section-py) 0;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg);
  }
  .auditor-feedback-subhead {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--fg);
    margin-bottom: 1.25rem;
  }
  .auditor-feedback-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap);
    align-items: start;
  }
  .auditor-feedback-card {
    background: oklch(0.15 0.005 260);
    border: 1px solid var(--border-subtle);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
  }
  :global([data-theme="light"]) .auditor-feedback-card {
    background: oklch(0.97 0 0);
  }
  .auditor-feedback-quote {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.7;
    color: var(--fg);
    font-style: italic;
    margin: 0;
    padding: 0;
  }
  .auditor-feedback-attribution {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .auditor-feedback-name {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--accent);
    text-decoration: none;
  }
  .auditor-feedback-name:hover {
    text-decoration: underline;
  }
  .auditor-feedback-role {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--fg-muted);
  }
  @media (max-width: 768px) {
    .auditor-feedback-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
