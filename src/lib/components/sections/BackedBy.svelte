<script lang="ts">
  const investors = [
    { name: 'BlockChange Ventures', url: 'https://blockchange.vc', role: 'Lead' },
    { name: 'Delphi Ventures', url: 'https://delphiventures.io', role: 'Lead' },
    { name: 'Decasonic', url: 'https://www.decasonic.com', role: 'Lead' },
    { name: 'New Form Capital', url: 'https://www.newformcap.com', role: 'Lead' },
    { name: 'Auros Global', url: 'https://www.auros.global', role: null },
    { name: 'Generative Ventures', url: 'https://www.genventures.xyz', role: null },
    { name: 'Contango Digital', url: 'https://www.contango.digital', role: null },
    { name: 'Santiago Santos', url: 'https://twitter.com/santiagoroel', role: null },
  ];
</script>

<section class="backed-by" id="investors">
  <div class="container">
    <div class="backed-by-inner" data-animate>
      <span class="section-label">Backed By</span>
      <h2 class="section-title">$6.5M raised to scale AI-driven blockchain security</h2>
      <div class="backed-by-grid">
        {#each investors as investor}
          <a class="investor-card" href={investor.url} target="_blank" rel="noopener">
            <span class="investor-logo">{investor.name}</span>
            {#if investor.role}
              <span class="investor-role">{investor.role}</span>
            {/if}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .backed-by {
    padding: var(--section-py) 0;
    border-top: 1px solid var(--border);
  }

  .backed-by-inner {
    text-align: center;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 48px;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  .backed-by-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    max-width: 800px;
    margin: 0 auto;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .investor-card {
    background: var(--bg);
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.3s ease;
    text-decoration: none;
    min-height: 80px;
    position: relative;
  }

  .investor-card:hover {
    background: var(--bg-raised);
  }

  .investor-card .investor-logo {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--fg);
    text-align: center;
    line-height: 1.3;
    opacity: 0.7;
    transition: opacity var(--transition);
    letter-spacing: -0.01em;
  }

  .investor-card:hover .investor-logo {
    opacity: 1;
  }

  .investor-card .investor-role {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
    position: absolute;
    top: 8px;
    right: 10px;
  }

  @media (max-width: 768px) {
    .backed-by-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
