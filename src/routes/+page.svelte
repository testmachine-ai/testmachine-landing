<script lang="ts">
  import { onMount } from 'svelte';
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

  /* Lazy-load TrajectoryVisualization in onMount so SvelteKit cannot
     statically trace the import — this prevents its CSS from being
     emitted as a render-blocking <link rel="stylesheet"> in the HTML. */
  let TrajectoryComponent: any = $state(null);
  onMount(async () => {
    const mod = await import('$lib/components/sections/TrajectoryVisualization.svelte');
    TrajectoryComponent = mod.default;
  });
</script>

<svelte:head>
  <title>TestMachine — Security Infrastructure for Web3</title>
  <meta name="description" content="Two products. Zero false positives. From token risk scoring to deep protocol analysis — AI-powered security infrastructure that scales with the chain." />
  
  <!-- Open Graph meta tags -->
  <meta property="og:title" content="TestMachine — Web3 Security That Actually Works" />
  <meta property="og:description" content="Two products. Zero false positives. From token risk scoring to deep protocol analysis — security infrastructure that scales with the chain." />
  <meta property="og:image" content="https://testmachine.ai/testmachine-og-logo.png" />
  <meta property="og:url" content="https://testmachine.ai" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="TestMachine" />
  
  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="TestMachine — Web3 Security That Actually Works" />
  <meta name="twitter:description" content="Two products. Zero false positives. From token risk scoring to deep protocol analysis — security infrastructure that scales with the chain." />
  <meta name="twitter:image" content="https://testmachine.ai/testmachine-og-logo.png" />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- RL Agent Trajectory Visualization — lazy-loaded in onMount to keep
     both the JS bundle and the render-blocking CSS off the critical path. -->
{#if TrajectoryComponent}
  <svelte:component this={TrajectoryComponent} />
{:else}
  <div id="trajectory" style="min-height:600px;" aria-hidden="true"></div>
{/if}

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
