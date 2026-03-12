<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import TrajectoryVisualization from '$lib/components/sections/TrajectoryVisualization.svelte';
  import AzimuthAnalysis from '$lib/components/sections/AzimuthAnalysis.svelte';
  import SocialProof from '$lib/components/sections/SocialProof.svelte';
  import Stats from '$lib/components/sections/Stats.svelte';
  import Problem from '$lib/components/sections/Problem.svelte';
  import Comparison from '$lib/components/sections/Comparison.svelte';
  import Predator from '$lib/components/sections/Predator.svelte';
  import Differentiator from '$lib/components/sections/Differentiator.svelte';
  import BackedBy from '$lib/components/sections/BackedBy.svelte';
  import Partnerships from '$lib/components/sections/Partnerships.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';
</script>

<svelte:head>
  <title>TestMachine — Web3 Security That Actually Works</title>
  <meta name="description" content="AI-powered Web3 security. Continuous penetration testing, vulnerability detection, and automated fixes for smart contracts and blockchain protocols." />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- RL Agent Trajectory Visualization -->
<TrajectoryVisualization />

<!-- Social Proof -->
<SocialProof />

<!-- Statistics -->
<Stats />

<!-- Problem Statement -->
<Problem />

<!-- Dynamic vs Static Comparison -->
<Comparison />

<!-- Predator Technology -->
<Predator />

<!-- Azimuth Analysis Demo -->
<AzimuthAnalysis />

<!-- Why TestMachine / Not Another Audit Tool -->
<Differentiator />

<!-- Backed By Investors -->
<BackedBy />

<!-- Partnerships/Trusted By -->
<Partnerships />

<!-- Contact Form -->
<Contact />
