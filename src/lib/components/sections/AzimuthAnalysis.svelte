<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentPhase = 1;
  let progress = 0;
  let investigated = 0;
  let confirmed = 0;
  let isRunning = true;
  let animationId: number | null = null;
  
  onMount(() => {
    startAnimation();
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });
  
  function startAnimation() {
    const phases = [
      { duration: 3000, title: "New Analysis", progress: 0 },
      { duration: 4000, title: "Analysis Running", progress: 0.6 },
      { duration: 3000, title: "Results", progress: 1.0 }
    ];
    
    let startTime = Date.now();
    let phaseIndex = 0;
    
    function animate() {
      if (!isRunning) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = Date.now() - startTime;
      const currentPhaseDuration = phases[phaseIndex].duration;
      
      if (elapsed >= currentPhaseDuration) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        startTime = Date.now();
      }
      
      const phaseProgress = Math.min(elapsed / currentPhaseDuration, 1);
      
      // Update state based on current phase
      currentPhase = phaseIndex + 1;
      progress = phases[phaseIndex].progress * phaseProgress;
      
      if (phaseIndex >= 1) {
        investigated = Math.floor(324 * phaseProgress);
        confirmed = Math.floor(2 * phaseProgress);
      } else {
        investigated = 0;
        confirmed = 0;
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  function resetAnimation() {
    currentPhase = 1;
    progress = 0;
    investigated = 0;
    confirmed = 0;
  }
</script>

<section class="azimuth" id="azimuth">
  <div class="container">
    <div class="azimuth-header" data-animate>
      <span class="section-label">Automated Security Analysis</span>
      <h2 class="section-title">Azimuth</h2>
      <p class="azimuth-desc">
        Azimuth deploys reinforcement learning agents against your smart contracts. Real transactions. 
        Forked mainnet. Dynamic execution, not static analysis. They probe every function, chain multi-step attacks, 
        and prove exploits end-to-end. If Azimuth reports it, it was actually exploited. Zero false positives — in minutes, not weeks.
      </p>
    </div>
    
    <div class="az-frame-wrap" data-animate>
      <div class="az-browser-frame">
        <div class="az-browser-titlebar">
          <div class="az-browser-dot az-dot-red"></div>
          <div class="az-browser-dot az-dot-yellow"></div>
          <div class="az-browser-dot az-dot-green"></div>
          <div class="az-browser-url">
            <span class="az-protocol">https://</span>
            <span class="az-domain">app.testmachine.ai</span>
            <span class="az-path">/azimuth</span>
          </div>
        </div>
        
        <div class="az-top-progress">
          <div class="az-top-progress-fill" style="width: {progress * 100}%"></div>
        </div>
        
        <div class="az-app-viewport">
          <div class="az-sidebar">
            <div class="az-sidebar-logo">
              <img src="/assets/logo-icon-white.png" alt="" class="az-sidebar-icon">
              TestMachine
            </div>
            <div class="az-sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
              Dashboard
            </div>
            <div class="az-sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Token Explorer
            </div>
            <div class="az-sidebar-item az-sidebar-active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Azimuth
            </div>
          </div>
          
          <div class="az-main-content">
            {#if currentPhase === 1}
              <!-- Phase 1: New Analysis -->
              <div class="az-phase">
                <div class="az-page-title">New Analysis</div>
                <div class="az-input-card">
                  <div class="az-input-row">
                    <div class="az-input-label">Contract Address</div>
                    <div class="az-input-field">
                      <input 
                        type="text" 
                        value="0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b" 
                        readonly
                        class="az-input"
                      >
                    </div>
                  </div>
                  <div class="az-input-row">
                    <div class="az-input-label">Network</div>
                    <div class="az-input-field">
                      <select class="az-input" disabled>
                        <option>Ethereum Mainnet</option>
                      </select>
                    </div>
                  </div>
                  <div class="az-input-actions">
                    <button class="btn btn--primary" disabled>
                      {progress > 0.1 ? 'Starting Analysis...' : 'Start Analysis'}
                    </button>
                  </div>
                </div>
              </div>
            {:else if currentPhase === 2}
              <!-- Phase 2: Analysis Running -->
              <div class="az-phase">
                <div class="az-page-title">Analysis Running</div>
                <div class="az-progress-section">
                  <div class="az-progress-bar">
                    <div class="az-progress-fill" style="width: {progress * 100}%"></div>
                  </div>
                  <div class="az-progress-text">{Math.floor(progress * 100)}% Complete</div>
                </div>
                <div class="az-stats-row">
                  <div class="az-r-stat">
                    <div class="az-r-stat-label">Investigated</div>
                    <div class="az-r-stat-value">{investigated}</div>
                  </div>
                  <div class="az-r-stat">
                    <div class="az-r-stat-label">Confirmed</div>
                    <div class="az-r-stat-value az-rsv-green">{confirmed}</div>
                  </div>
                  <div class="az-r-stat">
                    <div class="az-r-stat-label">False Positives</div>
                    <div class="az-r-stat-value az-rsv-emerald">0</div>
                  </div>
                </div>
              </div>
            {:else}
              <!-- Phase 3: Results -->
              <div class="az-phase">
                <div class="az-page-title">Results</div>
                <div class="az-signal-row">
                  <div class="az-signal-badge">
                    <span class="az-signal-dot"></span>
                    100% signal · 0 false positives
                  </div>
                  <div class="az-cost-badge">
                    4.8M tokens · <span class="az-cost-val">$0.05</span> total cost
                  </div>
                </div>
                <div class="az-findings-card">
                  <div class="az-findings-card-header">
                    Findings
                    <span class="az-sev-chip az-sev-crit">Critical 1</span>
                    <span class="az-sev-chip az-sev-low">Low 1</span>
                  </div>
                  <table class="az-f-table">
                    <thead>
                      <tr>
                        <th>Finding</th>
                        <th>Impact</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="az-data-row">
                        <td>Reentrancy in withdraw() enables fund drainage</td>
                        <td><span class="az-badge az-badge-critical">Critical</span></td>
                        <td><span class="az-confirmed">Confirmed</span></td>
                      </tr>
                      <tr class="az-data-row">
                        <td>Arithmetic overflow in pendingReward calculation</td>
                        <td><span class="az-badge az-badge-low">Low</span></td>
                        <td><span class="az-confirmed">Confirmed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    
    <div class="az-controls">
      <button class="btn btn--secondary" on:click={resetAnimation}>
        Reset Demo
      </button>
    </div>
  </div>
</section>

<style>
  .azimuth {
    padding: var(--section-py) 0;
    background: var(--bg);
  }
  
  .azimuth-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .section-label {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--fg);
    margin-bottom: 1.5rem;
  }
  
  .azimuth-desc {
    font-size: 1.125rem;
    color: var(--fg-muted);
    max-width: 70ch;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .az-frame-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .az-browser-frame {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  .az-browser-titlebar {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-deeper);
    border-bottom: 1px solid var(--border);
    gap: 8px;
  }
  
  .az-browser-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .az-dot-red { background: #ff5f57; }
  .az-dot-yellow { background: #ffbd2e; }
  .az-dot-green { background: #28ca42; }
  
  .az-browser-url {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
  }
  
  .az-protocol { color: var(--fg-dim); }
  .az-domain { color: var(--fg); }
  .az-path { color: var(--accent); }
  
  .az-top-progress {
    height: 3px;
    background: var(--bg);
  }
  
  .az-top-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-hover));
    transition: width 0.3s ease;
  }
  
  .az-app-viewport {
    display: flex;
    min-height: 500px;
  }
  
  .az-sidebar {
    width: 200px;
    background: var(--bg-deeper);
    border-right: 1px solid var(--border);
    padding: 20px 0;
  }
  
  .az-sidebar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    margin-bottom: 20px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg);
  }
  
  .az-sidebar-icon {
    width: 18px;
    height: 18px;
    filter: brightness(0) invert(70%) sepia(40%) saturate(500%) hue-rotate(130deg) brightness(1.05);
  }
  
  .az-sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--fg-muted);
    transition: all var(--transition);
    cursor: pointer;
  }
  
  .az-sidebar-item:hover {
    color: var(--fg);
    background: var(--bg);
  }
  
  .az-sidebar-item.az-sidebar-active {
    color: var(--accent);
    background: var(--accent-glow);
  }
  
  .az-sidebar-item svg {
    width: 16px;
    height: 16px;
  }
  
  .az-main-content {
    flex: 1;
    padding: 30px;
    background: var(--bg);
  }
  
  .az-page-title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--fg);
    margin-bottom: 2rem;
  }
  
  .az-input-card {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 2rem;
  }
  
  .az-input-row {
    margin-bottom: 1.5rem;
  }
  
  .az-input-label {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--fg);
    margin-bottom: 8px;
  }
  
  .az-input {
    width: 100%;
    padding: 12px 16px;
    background: var(--input-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--fg);
  }
  
  .az-progress-section {
    margin-bottom: 2rem;
  }
  
  .az-progress-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-deeper);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  
  .az-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-hover));
    transition: width 0.5s ease;
  }
  
  .az-progress-text {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--fg-muted);
    text-align: center;
  }
  
  .az-stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .az-r-stat {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 16px;
    text-align: center;
  }
  
  .az-r-stat-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
  
  .az-r-stat-value {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--fg);
  }
  
  .az-rsv-green { color: var(--color-safe); }
  .az-rsv-emerald { color: var(--accent); }
  
  .az-signal-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .az-signal-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--color-safe);
  }
  
  .az-signal-dot {
    width: 8px;
    height: 8px;
    background: var(--color-safe);
    border-radius: 50%;
  }
  
  .az-cost-badge {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--fg-muted);
  }
  
  .az-cost-val {
    color: var(--accent);
    font-weight: 600;
  }
  
  .az-findings-card {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .az-findings-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: var(--bg-deeper);
    border-bottom: 1px solid var(--border);
    font-family: var(--font-mono);
    font-weight: 600;
    color: var(--fg);
  }
  
  .az-sev-chip {
    font-size: 0.7rem;
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .az-sev-crit {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }
  
  .az-sev-low {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
  
  .az-f-table {
    width: 100%;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
  
  .az-f-table th {
    text-align: left;
    padding: 12px 20px;
    color: var(--fg-muted);
    font-weight: 500;
    border-bottom: 1px solid var(--border);
  }
  
  .az-f-table td {
    padding: 12px 20px;
    color: var(--fg);
    border-bottom: 1px solid var(--border-subtle);
  }
  
  .az-badge {
    font-size: 0.7rem;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .az-badge-critical {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }
  
  .az-badge-low {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }
  
  .az-confirmed {
    color: var(--color-safe);
    font-weight: 600;
  }
  
  .az-controls {
    text-align: center;
    margin-top: 2rem;
  }
  
  @media (max-width: 768px) {
    .az-frame-wrap {
      margin: 0 1rem;
    }
    
    .az-app-viewport {
      flex-direction: column;
    }
    
    .az-sidebar {
      width: 100%;
      display: flex;
      overflow-x: auto;
      padding: 12px 0;
    }
    
    .az-sidebar-item {
      white-space: nowrap;
      min-width: max-content;
    }
    
    .az-stats-row {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .az-signal-row {
      flex-direction: column;
      align-items: stretch;
      text-align: center;
    }
  }
</style>