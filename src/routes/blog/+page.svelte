<script lang="ts">
  import '$lib/styles/blog.css';
  import { blogPosts } from '$lib/data/blog-posts';
  
  const featured = blogPosts.find(p => p.featured);
  const allPosts = blogPosts.filter(p => !p.featured);
</script>

<svelte:head>
  <title>Beyond the Audit — TestMachine</title>
  <meta name="description" content="Insights on real exploits, token risk, and AI systems that test security through execution — not static analysis." />
  
  <!-- Open Graph meta tags -->
  <meta property="og:title" content="Beyond the Audit — TestMachine Blog" />
  <meta property="og:description" content="Insights on real exploits, token risk, and AI systems that test security through execution — not static analysis." />
  <meta property="og:image" content="https://testmachine.ai/testmachine-og-logo.png" />
  <meta property="og:url" content="https://testmachine.ai/blog" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="TestMachine" />
  
  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Beyond the Audit — TestMachine Blog" />
  <meta name="twitter:description" content="Insights on real exploits, token risk, and AI systems that test security through execution — not static analysis." />
  <meta name="twitter:image" content="https://testmachine.ai/testmachine-og-logo.png" />
</svelte:head>

<!-- Blog Hero -->
<section class="blog-hero">
  <div class="container">
    <h1 class="blog-hero-title" data-animate>Beyond the Audit</h1>
    <p class="blog-hero-desc" data-animate>Insights on real exploits, token risk, and AI systems that test security through execution — not static analysis.</p>
  </div>
</section>

<!-- Featured Post -->
{#if featured}
<section class="blog-featured-section">
  <div class="container">
    <div class="blog-featured" data-animate>
      <div class="blog-featured-badge">Featured Story</div>
      <div class="blog-featured-inner">
        <div class="blog-featured-content">
          <h2 class="blog-featured-title"><a href="/blog/{featured.slug}">{featured.title}</a></h2>
          <p class="blog-featured-excerpt">{featured.excerpt}</p>
          {#if featured.featuredQuote}
            <blockquote class="blog-featured-quote">
              {featured.featuredQuote}
            </blockquote>
          {/if}
          <a href="/blog/{featured.slug}" class="btn btn--primary">Read the full story &rarr;</a>
        </div>
        <div class="blog-featured-visual">
          <div class="blog-featured-logos">
            <img src="/assets/logo-icon-white.webp" alt="TestMachine" class="blog-featured-logo">
            <span class="blog-featured-x">&times;</span>
            <img src="/assets/partner-coinbase.webp" alt="Coinbase" class="blog-featured-logo-wide">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Blog Grid -->
<section class="blog-grid-section">
  <div class="container">
    <h3 class="blog-grid-heading" data-animate>All Posts <span class="blog-post-count">{blogPosts.length}</span></h3>
    <div class="blog-grid">
      {#each allPosts as post}
        <article class="blog-card" data-animate>
          <div class="blog-card-meta">
            <span class="blog-card-tag">{post.tag}</span>
            <span class="blog-card-date">{post.date}</span>
          </div>
          <h2 class="blog-card-title"><a href="/blog/{post.slug}">{post.title}</a></h2>
          <p class="blog-card-excerpt">{post.excerpt}</p>
          <a href="/blog/{post.slug}" class="blog-card-link">Read more &rarr;</a>
        </article>
      {/each}
    </div>
  </div>
</section>
