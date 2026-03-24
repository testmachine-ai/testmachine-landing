import purgecss from '@fullhuman/postcss-purgecss';

const production = process.env.NODE_ENV === 'production';

export default {
  plugins: [
    // Only purge in production — dev mode needs all CSS for HMR
    production && purgecss({
      content: [
        './src/**/*.svelte',
        './src/**/*.html',
        './src/app.html',
        './src/**/*.ts',
        './src/**/*.js',
      ],

      // Broad extractor that works with Svelte's class: directives,
      // template literals, and standard HTML class attributes.
      defaultExtractor: content => content.match(/[\w-:[\]]+/g) || [],

      safelist: {
        // SvelteKit scoped class hashes, data-attribute selectors
        standard: [
          /^svelte-/,
        ],
        deep: [
          // [data-theme="dark/light"] — used throughout CSS for theming
          /data-theme/,
          // [data-animate] — scroll-driven animation trigger
          /data-animate/,
          // SvelteKit routing attributes
          /data-sveltekit/,
        ],
        // Preserve all classes that are added imperatively via classList.add()
        // (PurgeCSS can't detect these from static analysis)
        greedy: [
          /^az-/,         // Azimuth interactive: az-visible, az-active, az-done …
          /^az[A-Z]/,     // Azimuth phase classes: azPhase1, azAg0 …
          /^eng-/,        // Engineering RL pipeline: eng-rl-*, eng-pipe-*
          /^traj-/,       // Trajectory visualisation: traj-nav-active …
          /^visible$/,    // Generic visibility toggle
          /^exploit$/,    // Trajectory state class
          /^explore$/,    // Trajectory state class
        ],
      },
    }),
  ].filter(Boolean),
};
