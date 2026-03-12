<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import SocialProof from '$lib/components/sections/SocialProof.svelte';
  import Stats from '$lib/components/sections/Stats.svelte';
  // Other section imports will be added as components are created
</script>

<svelte:head>
  <title>TestMachine — Web3 Security That Actually Works</title>
  <meta name="description" content="AI-powered Web3 security. Continuous penetration testing, vulnerability detection, and automated fixes for smart contracts and blockchain protocols." />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- Trajectory Visualization will go here -->
<section class="trajectory-placeholder" id="trajectory">
  <div class="container">
    <div class="placeholder-content">
      <span class="section-label">Reinforcement Learning</span>
      <h2 class="section-title">Our agents learn to break contracts</h2>
      <p>
        <strong>🚧 Complex trajectory visualization component will be implemented here</strong>
      </p>
      <p>
        This will contain the 2000+ line canvas-based RL agent visualization 
        with 3D projections, particle effects, and interactive controls.
      </p>
    </div>
  </div>
</section>

<!-- Social Proof -->
<SocialProof />

<!-- Statistics -->
<Stats />

<!-- Other sections will be added as components are created -->
<section class="sections-placeholder">
  <div class="container">
    <div class="placeholder-content">
      <h2 class="section-title">Additional Sections Coming Soon</h2>
      <ul style="list-style: disc; margin-left: 2rem; color: var(--fg-muted);">
        <li>Problem Statement</li>
        <li>Dynamic vs Static Comparison</li>
        <li>Predator Technology Demo</li>
        <li>Azimuth Analysis Simulation</li>
        <li>Differentiator Comparison</li>
        <li>Backed By Investors</li>
        <li>Partnerships Grid</li>
        <li>Contact Form</li>
      </ul>
    </div>
  </div>
</section>

<style>
  .trajectory-placeholder,
  .sections-placeholder {
    padding: var(--section-py) 0;
    background: var(--bg-deeper);
  }
  
  .placeholder-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .placeholder-content p {
    color: var(--fg-muted);
    margin: 1rem 0;
  }
  
  .sections-placeholder {
    background: var(--bg-raised);
  }
  
  .sections-placeholder ul {
    text-align: left;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
</style>