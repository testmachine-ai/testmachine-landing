<script lang="ts">
  import { onMount } from 'svelte';
  
  let trajectoryCanvas: HTMLCanvasElement;
  let trajRewardChart: HTMLCanvasElement;
  let mounted = false;
  
  // Animation state
  let epIdx = 0;
  let stepIdx = 0;
  let isRunning = true;
  let animationId: number | null = null;
  
  // Contract data for display
  let targetAddr = '';
  let targetName = '';
  let currentAction = '—';
  
  onMount(() => {
    mounted = true;
    initializeVisualization();
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });
  
  function initializeVisualization() {
    if (!trajectoryCanvas || !trajRewardChart) return;
    
    // Set up canvas contexts
    const ctx = trajectoryCanvas.getContext('2d');
    const rewardCtx = trajRewardChart.getContext('2d');
    
    if (!ctx || !rewardCtx) return;
    
    // Initialize trajectory data (simplified version)
    const contractSamples = [
      { addr: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b', name: 'CREAM Finance' },
      { addr: '0x5f3f1dbd7b74c6b46e8c44f98792a1daf8d69154', name: 'bZx Protocol' },
      { addr: '0x3e3b357061103dc040759ac7dceeaba9901043ad', name: 'DeFi Yield' }
    ];
    
    let currentSample = 0;
    targetAddr = contractSamples[currentSample].addr;
    targetName = contractSamples[currentSample].name;
    
    // Generate simplified trajectory data
    const trajData = generateTrajectoryData();
    
    // Start animation
    animate(ctx, rewardCtx, trajData);
  }
  
  function generateTrajectoryData() {
    // Generate simplified trajectory bolts for visualization
    const bolts = [];
    const numBolts = 20;
    
    for (let i = 0; i < numBolts; i++) {
      const points = [];
      const numPoints = 30 + Math.random() * 20;
      
      for (let j = 0; j < numPoints; j++) {
        // Generate 3D trajectory points (simplified)
        const t = j / numPoints;
        points.push([
          Math.cos(t * Math.PI * 2 + i) * (0.5 + Math.random() * 0.3),
          Math.sin(t * Math.PI * 1.5 + i * 0.5) * (0.3 + Math.random() * 0.2),
          (t - 0.5) * (0.4 + Math.random() * 0.2)
        ]);
      }
      
      bolts.push({
        points,
        reward: Math.random() * (i < 15 ? 0.1 : 0.9), // Later episodes have higher rewards
        energy: Math.max(0, (i - 10) / 10) // Energy increases over time
      });
    }
    
    return bolts;
  }
  
  function animate(ctx: CanvasRenderingContext2D, rewardCtx: CanvasRenderingContext2D, trajData: any[]) {
    const canvas = trajectoryCanvas;
    const w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const rewardCanvas = trajRewardChart;
    const rw = rewardCanvas.width = 220;
    const rh = rewardCanvas.height = 80;
    
    function frame() {
      if (!isRunning) return;
      
      // Clear canvases
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, w, h);
      
      rewardCtx.fillStyle = '#0f0f0f';
      rewardCtx.fillRect(0, 0, rw, rh);
      
      // Draw trajectory visualization (simplified)
      drawTrajectories(ctx, trajData, w / window.devicePixelRatio, h / window.devicePixelRatio);
      
      // Draw reward chart
      drawRewardChart(rewardCtx, trajData, rw, rh);
      
      // Update animation state
      stepIdx++;
      if (stepIdx > 50) {
        stepIdx = 0;
        epIdx = (epIdx + 1) % trajData.length;
      }
      
      // Update UI
      updateHUD();
      
      animationId = requestAnimationFrame(frame);
    }
    
    frame();
  }
  
  function drawTrajectories(ctx: CanvasRenderingContext2D, bolts: any[], w: number, h: number) {
    const centerX = w * 0.5;
    const centerY = h * 0.5;
    const scale = Math.min(w, h) * 0.3;
    
    // Draw background grid (simplified)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale * 0.5, centerY - scale);
      ctx.lineTo(centerX + i * scale * 0.5, centerY + scale);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(centerX - scale, centerY + i * scale * 0.5);
      ctx.lineTo(centerX + scale, centerY + i * scale * 0.5);
      ctx.stroke();
    }
    
    // Draw trajectory bolts
    bolts.forEach((bolt, boltIdx) => {
      if (boltIdx > epIdx) return;
      
      const alpha = boltIdx === epIdx ? 1.0 : 0.3;
      const maxStep = boltIdx === epIdx ? stepIdx : bolt.points.length - 1;
      
      ctx.strokeStyle = `rgba(${120 + boltIdx * 6}, ${200 + bolt.reward * 55}, ${150}, ${alpha})`;
      ctx.lineWidth = boltIdx === epIdx ? 3 : 1.5;
      
      ctx.beginPath();
      for (let i = 0; i <= Math.min(maxStep, bolt.points.length - 1); i++) {
        const point = bolt.points[i];
        const x = centerX + point[0] * scale;
        const y = centerY + point[1] * scale;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw current position dot for active bolt
      if (boltIdx === epIdx && maxStep < bolt.points.length - 1) {
        const point = bolt.points[maxStep];
        const x = centerX + point[0] * scale;
        const y = centerY + point[1] * scale;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  
  function drawRewardChart(ctx: CanvasRenderingContext2D, bolts: any[], w: number, h: number) {
    const margin = 10;
    const chartW = w - margin * 2;
    const chartH = h - margin * 2;
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin, h - margin);
    ctx.lineTo(w - margin, h - margin);
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, h - margin);
    ctx.stroke();
    
    // Draw reward curve
    if (bolts.length > 1) {
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      bolts.slice(0, epIdx + 1).forEach((bolt, i) => {
        const x = margin + (i / bolts.length) * chartW;
        const y = h - margin - bolt.reward * chartH;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }
  }
  
  function updateHUD() {
    currentAction = getRandomAction();
  }
  
  function getRandomAction() {
    const actions = [
      'deposit()',
      'withdraw()',
      'setOracle()',
      'borrow()',
      'liquidate()',
      'flashLoan()'
    ];
    return actions[Math.floor(Math.random() * actions.length)];
  }
  
  function toggleAnimation() {
    isRunning = !isRunning;
    if (isRunning && trajectoryCanvas && trajRewardChart) {
      const ctx = trajectoryCanvas.getContext('2d')!;
      const rewardCtx = trajRewardChart.getContext('2d')!;
      const trajData = generateTrajectoryData();
      animate(ctx, rewardCtx, trajData);
    }
  }
</script>

<section class="trajectory-section" id="trajectory">
  <div class="container">
    <div class="trajectory-header" data-animate>
      <span class="section-label">Reinforcement Learning</span>
      <h2 class="section-title">Our agents learn to break contracts</h2>
      <p class="trajectory-desc">
        Our agents interact with live contract forks — calling functions, passing arguments, observing state changes. 
        Each trajectory below is one episode projected from 16-dimensional observation space. Early runs explore randomly; 
        over hundreds of trials, the agent converges on the exact sequence of calls that drains funds.
      </p>
    </div>
    
    <div class="trajectory-viz" data-animate>
      <div class="traj-target-bar">
        <span class="traj-target-label">ANALYZING</span>
        <span class="traj-target-addr">{targetAddr}</span>
        <span class="traj-target-name">{targetName}</span>
      </div>
      
      <div class="traj-branding-overlay">
        <img src="/assets/logo-icon-white.png" alt="" class="traj-brand-icon">
        <span class="traj-brand-text">Contract State Space</span>
      </div>
      
      <span class="traj-pca-label">PCA 16d → 3d</span>
      
      <div class="traj-canvas-wrap">
        <canvas bind:this={trajectoryCanvas} id="trajectoryCanvas"></canvas>
        
        <!-- Reward chart inset -->
        <div class="traj-reward-inset">
          <div class="traj-reward-header">
            <span class="traj-reward-title">Cumulative Reward</span>
            <span class="traj-reward-val">{(Math.random() * 0.85).toFixed(2)}</span>
          </div>
          <canvas bind:this={trajRewardChart} width="220" height="80"></canvas>
        </div>
      </div>
      
      <!-- HUD: bottom strip -->
      <div class="traj-hud-strip">
        <div class="traj-hud-info">
          <span class="traj-hud-tag">{epIdx}/200</span>
          <span class="traj-hud-tag">{stepIdx}/50</span>
          <span class="traj-hud-tag traj-hud-action-tag">{currentAction}</span>
        </div>
        <div class="traj-hud-controls">
          <button on:click={toggleAnimation} class="traj-control-btn">
            {isRunning ? '⏸️' : '▶️'} {isRunning ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .trajectory-section {
    padding: var(--section-py) 0;
    background: var(--bg-deeper);
    position: relative;
  }
  
  .trajectory-header {
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
  
  .trajectory-desc {
    font-size: 1.125rem;
    color: var(--fg-muted);
    max-width: 70ch;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .trajectory-viz {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .traj-target-bar {
    padding: 12px 16px;
    background: var(--bg-raised);
    border-bottom: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .traj-target-label {
    color: var(--accent);
    font-weight: 600;
  }
  
  .traj-target-addr {
    color: var(--fg-muted);
    font-family: var(--font-mono);
  }
  
  .traj-target-name {
    color: var(--fg);
    font-weight: 500;
  }
  
  .traj-branding-overlay {
    position: absolute;
    top: 42px;
    left: 14px;
    z-index: 10;
    opacity: 0.4;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .traj-brand-icon {
    width: 22px;
    height: 22px;
    object-fit: contain;
    flex-shrink: 0;
  }
  
  .traj-brand-text {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--fg-muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  
  .traj-pca-label {
    position: absolute;
    top: 42px;
    right: 14px;
    z-index: 10;
    opacity: 0.4;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--fg-muted);
    letter-spacing: 0.04em;
  }
  
  .traj-canvas-wrap {
    position: relative;
    height: 400px;
    background: linear-gradient(135deg, var(--bg-deeper), var(--bg));
  }
  
  #trajectoryCanvas {
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }
  
  .traj-reward-inset {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 240px;
    height: 100px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px;
    backdrop-filter: blur(8px);
  }
  
  .traj-reward-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  
  .traj-reward-title {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .traj-reward-val {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent);
    font-weight: 600;
  }
  
  .traj-hud-strip {
    padding: 12px 16px;
    background: var(--bg-raised);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .traj-hud-info {
    display: flex;
    gap: 16px;
  }
  
  .traj-hud-tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
    padding: 4px 8px;
    background: var(--bg);
    border: 1px solid var(--border-subtle);
    border-radius: 4px;
  }
  
  .traj-hud-action-tag {
    color: var(--accent);
    background: var(--accent-glow);
    border-color: var(--accent);
  }
  
  .traj-control-btn {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    background: var(--btn-bg);
    color: var(--btn-fg);
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all var(--transition);
  }
  
  .traj-control-btn:hover {
    background: var(--btn-hover);
  }
  
  @media (max-width: 768px) {
    .traj-reward-inset {
      width: 200px;
      height: 80px;
    }
    
    .traj-hud-strip {
      flex-direction: column;
      gap: 12px;
    }
    
    .trajectory-viz {
      margin: 0 1rem;
    }
  }
</style>