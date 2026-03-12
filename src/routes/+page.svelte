<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import SocialProof from '$lib/components/sections/SocialProof.svelte';
  import Stats from '$lib/components/sections/Stats.svelte';
  import Problem from '$lib/components/sections/Problem.svelte';
  import Comparison from '$lib/components/sections/Comparison.svelte';
  import Partnerships from '$lib/components/sections/Partnerships.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';
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

<!-- Problem Statement -->
<Problem />

<!-- Dynamic vs Static Comparison -->
<Comparison />

<!-- Partnerships/Trusted By -->
<Partnerships />

<!-- Contact Form -->
<Contact />

<!-- Note: Complex sections like Predator Technology, Azimuth, Differentiator, and Backed By will be added in future phases -->
<section class="remaining-sections-placeholder">
  <div class="container">
    <div class="placeholder-content">
      <h2 class="section-title">Advanced Sections Coming Soon</h2>
      <ul style="list-style: disc; margin-left: 2rem; color: var(--fg-muted);">
        <li>Predator Technology Demo (Interactive Terminal)</li>
        <li>Azimuth Analysis Simulation (Complex UI)</li>
        <li>Differentiator Comparison (Advanced Layout)</li>
        <li>Backed By Investors (Logo Grid)</li>
      </ul>
    </div>
  </div>
</section>

<style>
  .trajectory-placeholder,
  .remaining-sections-placeholder {
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
  
  .remaining-sections-placeholder {
    background: var(--bg-raised);
  }
  
  .remaining-sections-placeholder ul {
    text-align: left;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
</style>