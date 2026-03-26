<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import ProductOverview from '$lib/components/sections/ProductOverview.svelte';
  import SocialProof from '$lib/components/sections/SocialProof.svelte';
  import Stats from '$lib/components/sections/Stats.svelte';
  import Problem from '$lib/components/sections/Problem.svelte';
  import Comparison from '$lib/components/sections/Comparison.svelte';
  import TokenCustody from '$lib/components/sections/TokenCustody.svelte';
  import AzimuthAnalysis from '$lib/components/sections/AzimuthAnalysis.svelte';
  import Differentiator from '$lib/components/sections/Differentiator.svelte';
  import BackedBy from '$lib/components/sections/BackedBy.svelte';
  import Partnerships from '$lib/components/sections/Partnerships.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';
</script>

<svelte:head>
  <title>TestMachine — Security Infrastructure for Web3</title>
  <meta name="description" content="Two products. Zero false positives. From token risk scoring to deep protocol analysis — AI-powered security infrastructure that scales with the chain." />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- RL Agent Trajectory Visualization — lazy-loaded to keep main bundle lean.
     The placeholder preserves height to avoid CLS on larger viewports. -->
{#await import('$lib/components/sections/TrajectoryVisualization.svelte')}
  <div id="trajectory" style="min-height:600px;" aria-hidden="true"></div>
{:then { default: TrajectoryVisualization }}
  <svelte:component this={TrajectoryVisualization} />
{/await}

<!-- Product Overview Cards -->
<ProductOverview />

<!-- Statistics — credibility anchors -->
<Stats />

<!-- Social Proof -->
<SocialProof />

<!-- Problem Statement -->
<Problem />

<!-- Dynamic vs Static Comparison -->
<Comparison />

<!-- Token Custody Technology -->
<TokenCustody />

<!-- Azimuth Analysis Demo -->
<AzimuthAnalysis />

<!-- Why TestMachine / Not Another Audit Tool -->
<Differentiator />

<!-- Backed By Investors -->
<!-- Trusted By -->
<Partnerships />

<!-- Backed By -->
<BackedBy />

<!-- Contact Form -->
<Contact />
