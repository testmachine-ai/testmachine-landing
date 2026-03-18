<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // DOM refs
  let pipeTrack: HTMLDivElement;
  let pipeLineFill: HTMLDivElement;
  let rlViz: HTMLDivElement;
  let rlArena: HTMLDivElement;
  let spaceCanvas: HTMLCanvasElement;
  let rlLogEntries: HTMLDivElement;
  let rlRewardFill: HTMLSpanElement;
  let rlRewardVal: HTMLSpanElement;
  let rlStatusText: HTMLSpanElement;
  let rlStatusDot: HTMLSpanElement;
  let rlEpoch: HTMLDivElement;
  let rlPhaseLabel: HTMLDivElement;
  let rlArenaLabel: HTMLDivElement;

  // Stage refs
  let stageEls: HTMLDivElement[] = [];
  let fnEls: HTMLDivElement[] = [];
  let agentEls: HTMLDivElement[] = [];

  // Pipeline observer
  let pipeObserver: IntersectionObserver;

  // RL animation state
  let rlRunning = false;
  let rlTimeouts: ReturnType<typeof setTimeout>[] = [];
  let spaceAnimId: number | null = null;
  let rlObserver: IntersectionObserver;

  function rlAt(fn: () => void, ms: number) { rlTimeouts.push(setTimeout(fn, ms)); }
  function rlClear() { rlTimeouts.forEach(clearTimeout); rlTimeouts = []; }

  // 3D Action Space data
  const spaceClusters = [
    { name: 'deposit',          color: [45, 212, 191], cx: -1.8, cy:  0.8, cz:  0.5 },
    { name: 'withdraw',         color: [239, 68, 68],  cx:  1.5, cy: -0.6, cz: -0.8 },
    { name: 'claimRewards',     color: [96, 165, 250], cx:  0.3, cy:  1.6, cz: -1.2 },
    { name: 'liquidate',        color: [251, 191, 36], cx: -1.6, cy: -1.2, cz: -0.4 },
    { name: 'setOracle',        color: [167, 139, 250],cx:  1.8, cy:  1.0, cz:  1.5 },
    { name: 'updateRewardRate', color: [52, 211, 153], cx: -1.2, cy: -0.3, cz: -1.6 }
  ];

  interface SpacePoint {
    cluster: number;
    x: number;
    y: number;
    z: number;
    size: number;
    alpha: number;
  }

  const spacePoints: SpacePoint[] = [];
  spaceClusters.forEach((cl, ci) => {
    for (let i = 0; i < 28; i++) {
      const r = 0.28;
      spacePoints.push({
        cluster: ci,
        x: cl.cx + (Math.random() - 0.5) * r * 2,
        y: cl.cy + (Math.random() - 0.5) * r * 2,
        z: cl.cz + (Math.random() - 0.5) * r * 2,
        size: 1.5 + Math.random() * 2,
        alpha: 0
      });
    }
  });

  let spaceAngle = 0;
  let spaceStartTime = 0;
  let spaceZoom = 0.09;

  function resizeSpaceCanvas() {
    if (!spaceCanvas || !rlArena) return;
    const rect = rlArena.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    spaceCanvas.width = rect.width * dpr;
    spaceCanvas.height = rect.height * dpr;
    spaceCanvas.style.width = rect.width + 'px';
    spaceCanvas.style.height = rect.height + 'px';
  }

  function project3D(x: number, y: number, z: number, w: number, h: number, angle: number) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const rx = x * cos - z * sin;
    const rz = x * sin + z * cos;
    const tilt = -0.55;
    const cos2 = Math.cos(tilt), sin2 = Math.sin(tilt);
    const ry = y * cos2 - rz * sin2;
    const rz2 = y * sin2 + rz * cos2;
    const perspective = 4.5 / (4.5 + rz2);
    return {
      sx: w / 2 + rx * perspective * w * spaceZoom,
      sy: h / 2 - ry * perspective * h * spaceZoom,
      scale: perspective,
      depth: rz2
    };
  }

  function drawSpace(ts: number) {
    const ctx = spaceCanvas?.getContext('2d');
    if (!ctx || !spaceCanvas) return;
    if (!spaceStartTime) spaceStartTime = ts;
    const elapsed = ts - spaceStartTime;
    const dpr = window.devicePixelRatio || 1;
    const w = spaceCanvas.width;
    const h = spaceCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const revealSpeed = 1100;
    const targetRevealed = Math.min(spacePoints.length, Math.floor(elapsed / revealSpeed * 28));

    for (let i = 0; i < spacePoints.length; i++) {
      if (i < targetRevealed) {
        spacePoints[i].alpha = Math.min(1, spacePoints[i].alpha + 0.08);
      }
    }

    spaceAngle -= 0.004;

    const zoomDuration = 5000;
    const zoomProgress = Math.min(1, elapsed / zoomDuration);
    const eased = 1 - Math.pow(1 - zoomProgress, 3);
    spaceZoom = 0.06 + (0.14 - 0.06) * eased;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const axisColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)';
    const axisLabelColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)';
    const projLabelColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
    const axisLen = 2.2;
    const axes = [
      { x: axisLen, y: 0, z: 0, label: 'PC1' },
      { x: 0, y: axisLen, z: 0, label: 'PC2' },
      { x: 0, y: 0, z: axisLen, label: 'PC3' }
    ];
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    axes.forEach(ax => {
      const o = project3D(0, 0, 0, w, h, spaceAngle);
      const e = project3D(ax.x, ax.y, ax.z, w, h, spaceAngle);
      ctx.strokeStyle = axisColor;
      ctx.beginPath();
      ctx.moveTo(o.sx, o.sy);
      ctx.lineTo(e.sx, e.sy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = (9 * dpr) + 'px JetBrains Mono, monospace';
      ctx.fillStyle = axisLabelColor;
      ctx.fillText(ax.label, e.sx + 4 * dpr, e.sy - 4 * dpr);
      ctx.setLineDash([4 * dpr, 4 * dpr]);
    });
    ctx.setLineDash([]);

    const sorted = spacePoints.slice().sort((a, b) => {
      const pa = project3D(a.x, a.y, a.z, w, h, spaceAngle);
      const pb = project3D(b.x, b.y, b.z, w, h, spaceAngle);
      return pa.depth - pb.depth;
    });

    sorted.forEach(p => {
      if (p.alpha <= 0) return;
      const proj = project3D(p.x, p.y, p.z, w, h, spaceAngle);
      const cl = spaceClusters[p.cluster];
      const r = p.size * proj.scale * dpr;
      const a = p.alpha * (0.4 + proj.scale * 0.5);

      ctx.beginPath();
      ctx.arc(proj.sx, proj.sy, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + cl.color.join(',') + ',' + (a * 0.15) + ')';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + cl.color.join(',') + ',' + a + ')';
      ctx.fill();
    });

    spaceClusters.forEach((cl, ci) => {
      let clusterAlpha = 0;
      spacePoints.forEach(p => { if (p.cluster === ci) clusterAlpha = Math.max(clusterAlpha, p.alpha); });
      if (clusterAlpha < 0.3) return;
      const proj = project3D(cl.cx, cl.cy + 0.55, cl.cz, w, h, spaceAngle);
      ctx.font = 'bold ' + (10 * dpr) + 'px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(' + cl.color.join(',') + ',' + (clusterAlpha * 0.85) + ')';
      ctx.textAlign = 'center';
      ctx.fillText(cl.name + '()', proj.sx, proj.sy);
      ctx.textAlign = 'left';
    });

    if (elapsed > 600) {
      ctx.font = (10 * dpr) + 'px JetBrains Mono, monospace';
      ctx.fillStyle = projLabelColor;
      ctx.textAlign = 'right';
      ctx.fillText('64-dim \u2192 3D PCA projection', w - 16 * dpr, h - 12 * dpr);
      ctx.textAlign = 'left';
    }

    spaceAnimId = requestAnimationFrame(drawSpace);
  }

  function startSpace() {
    resizeSpaceCanvas();
    spaceStartTime = 0;
    spaceAngle = 0;
    spacePoints.forEach(p => { p.alpha = 0; });
    if (spaceCanvas) spaceCanvas.classList.add('eng-rl-space-visible');
    spaceAnimId = requestAnimationFrame(drawSpace);
  }

  function stopSpace() {
    if (spaceAnimId) cancelAnimationFrame(spaceAnimId);
    spaceAnimId = null;
    if (spaceCanvas) spaceCanvas.classList.remove('eng-rl-space-visible');
    const ctx = spaceCanvas?.getContext('2d');
    if (ctx && spaceCanvas) ctx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
  }

  function jumpTo(agent: HTMLDivElement, fnIdx: number) {
    if (!agent || !fnEls[fnIdx] || !rlArena) return;
    const block = fnEls[fnIdx];
    const aRect = rlArena.getBoundingClientRect();
    const bRect = block.getBoundingClientRect();
    const x = (bRect.left - aRect.left) + bRect.width / 2 - 5;
    const y = (bRect.top - aRect.top) + bRect.height / 2 - 5;
    agent.style.left = x + 'px';
    agent.style.top = y + 'px';
  }

  function activateAgent(agent: HTMLDivElement) { agent?.classList.add('eng-rl-active'); }
  function deactivateAgent(agent: HTMLDivElement) { agent?.classList.remove('eng-rl-active', 'eng-rl-exploit'); }
  function setExploitAgent(agent: HTMLDivElement) { agent?.classList.add('eng-rl-exploit'); }

  function setStage(idx: number, state: string | null) {
    if (!stageEls[idx]) return;
    stageEls[idx].classList.remove('eng-rl-stage-active', 'eng-rl-stage-done', 'eng-rl-stage-exploit', 'eng-rl-stage-pending');
    if (state) stageEls[idx].classList.add('eng-rl-stage-' + state);
  }

  function setFn(idx: number, state: string | null) {
    if (!fnEls[idx]) return;
    fnEls[idx].classList.remove('eng-rl-fn-scanned', 'eng-rl-fn-vuln', 'eng-rl-fn-validated', 'eng-rl-fn-targeted');
    if (state) fnEls[idx].classList.add('eng-rl-fn-' + state);
  }

  function setReward(pct: number, val: string, high: boolean) {
    if (rlRewardFill) {
      rlRewardFill.style.width = pct + '%';
      rlRewardFill.classList.toggle('eng-rl-reward-high', !!high);
    }
    if (rlRewardVal) {
      rlRewardVal.textContent = val;
      rlRewardVal.classList.toggle('eng-rl-reward-high', !!high);
    }
  }

  function setPhase(text: string, type: string) {
    if (!rlPhaseLabel) return;
    rlPhaseLabel.textContent = text;
    rlPhaseLabel.className = 'eng-rl-phase-label eng-rl-phase-active';
    if (type === 'explore') rlPhaseLabel.classList.add('eng-rl-phase-explore');
    if (type === 'exploit') rlPhaseLabel.classList.add('eng-rl-phase-exploit');
  }

  // Safe DOM-based log entry creation (no innerHTML for security)
  function createLogSpan(cls: string, text: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.className = cls;
    span.textContent = text;
    return span;
  }

  function setLog(...parts: Array<{cls: string; text: string}>) {
    if (!rlLogEntries) return;
    while (rlLogEntries.firstChild) rlLogEntries.removeChild(rlLogEntries.firstChild);
    const entry = document.createElement('div');
    entry.className = 'eng-rl-log-entry';
    parts.forEach(p => entry.appendChild(createLogSpan(p.cls, p.text)));
    rlLogEntries.appendChild(entry);
    requestAnimationFrame(() => { entry.classList.add('eng-rl-log-visible'); });
  }

  function setStageNum(n: number) { if (rlEpoch) rlEpoch.textContent = 'Stage ' + n + '/6'; }
  function setStatus(text: string) { if (rlStatusText) rlStatusText.textContent = text; }

  function rlReset() {
    agentEls.forEach(deactivateAgent);
    stageEls.forEach((_, i) => { setStage(i, null); });
    fnEls.forEach((_, i) => { setFn(i, null); });
    fnEls.forEach(fn => { if (fn) fn.style.opacity = '1'; });
    if (rlArenaLabel) rlArenaLabel.style.opacity = '1';
    stopSpace();
    setReward(0, '0.00 ETH', false);
    if (rlPhaseLabel) rlPhaseLabel.className = 'eng-rl-phase-label';
    if (rlLogEntries) { while (rlLogEntries.firstChild) rlLogEntries.removeChild(rlLogEntries.firstChild); }
    setStageNum(0);
    setStatus('Initializing');
    if (rlStatusDot) rlStatusDot.style.background = '#22c55e';
  }

  const stageExplainers = [
    { stage: 1, title: 'Ingestion', desc: 'The target smart contract is parsed using Foundry. Every public and external function is extracted, along with its ABI signature, state variables, and bytecode.', detail: "This gives the system a complete map of the contract's attack surface." },
    { stage: 2, title: 'LLM Analysis', desc: 'Multiple specialized AI agents analyze the code in parallel. CodeIntentAgent understands what each function does. UniverseBuilder creates test actors. ArgHintAgent generates plausible input ranges.', detail: 'LLMs are used for understanding \u2014 not for finding vulnerabilities.' },
    { stage: 3, title: 'Anvil Validation', desc: 'Every LLM-generated hint is validated by actually executing it on a forked blockchain (Anvil). Invalid hints are refined and retested until all function calls are executable.', detail: 'This eliminates hallucinated or impossible test scenarios.' },
    { stage: 4, title: 'Action Space', desc: 'Each validated function call is encoded into a 64-dimensional continuous vector. This creates a mathematical space where the RL agents can smoothly explore combinations of actions.', detail: "This is TestMachine's core technological moat \u2014 turning discrete contract calls into a learnable action space." },
    { stage: 5, title: 'RL Exploration', desc: 'Reinforcement learning agents are deployed onto the forked chain. They explore sequences of function calls, receiving rewards when they cause unexpected state changes.', detail: 'Agents learn attack strategies through trial and error \u2014 thousands of episodes in seconds.' },
    { stage: 6, title: 'Exploitation', desc: 'When an agent discovers a promising attack path, it shifts to exploitation mode \u2014 refining the sequence to maximize damage and generate a working proof-of-concept.', detail: "If we report a vulnerability, we've already exploited it. Zero false positives." }
  ];

  const EXPLAINER_HOLD = 4000;
  const EXPLAINER_FADE = 400;
  const EXPLAINER_TOTAL = EXPLAINER_HOLD + EXPLAINER_FADE;

  function showStageExplainer(stageNum: number) {
    const info = stageExplainers[stageNum - 1];
    if (!info || !rlArena) return;
    setStage(stageNum - 1, 'pending');
    const overlay = document.createElement('div');
    overlay.className = 'eng-rl-stage-explainer';

    const box = document.createElement('div');
    box.className = 'eng-rl-explainer-box';

    const num = document.createElement('div');
    num.className = 'eng-rl-explainer-num';
    num.textContent = 'Stage ' + info.stage + ' of 6';

    const title = document.createElement('div');
    title.className = 'eng-rl-explainer-title';
    title.textContent = info.title;

    const desc = document.createElement('div');
    desc.className = 'eng-rl-explainer-desc';
    desc.textContent = info.desc;

    const detail = document.createElement('div');
    detail.className = 'eng-rl-explainer-detail';
    detail.textContent = info.detail;

    box.appendChild(num);
    box.appendChild(title);
    box.appendChild(desc);
    box.appendChild(detail);
    overlay.appendChild(box);
    rlArena.appendChild(overlay);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { overlay.classList.add('eng-rl-explainer-visible'); });
    });
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.4s ease';
      overlay.style.opacity = '0';
      setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, EXPLAINER_FADE);
    }, EXPLAINER_HOLD);
  }

  function updateStageNav(stageNum: number) {
    document.querySelectorAll('.eng-rl-stage-btn').forEach(btn => {
      const n = parseInt(btn.getAttribute('data-jump') || '0');
      btn.classList.remove('eng-rl-stage-btn-active', 'eng-rl-stage-btn-done');
      if (n === stageNum) btn.classList.add('eng-rl-stage-btn-active');
      else if (n < stageNum) btn.classList.add('eng-rl-stage-btn-done');
    });
  }

  function rlJumpTo(stageNum: number) {
    rlClear();
    rlReset();
    const overlays = rlArena?.querySelectorAll('.eng-rl-stage-explainer, .eng-rl-exploit-overlay');
    overlays?.forEach(o => { if (o.parentNode) o.parentNode.removeChild(o); });
    stopSpace();
    fnEls.forEach(fn => { if (fn) fn.style.opacity = '1'; });
    if (rlArenaLabel) rlArenaLabel.style.opacity = '1';
    rlRunning = true;
    updateStageNav(stageNum);
    rlRunFromStage(stageNum);
  }

  function handleStageClick(e: MouseEvent) {
    const btn = (e.target as HTMLElement).closest('.eng-rl-stage-btn') as HTMLElement;
    if (!btn) return;
    const stage = parseInt(btn.getAttribute('data-jump') || '0');
    rlJumpTo(stage);
  }

  function rlRun() {
    if (!rlRunning) return;
    rlClear();
    rlReset();
    rlRunFromStage(1);
  }

  // Helper to build exploit overlay via safe DOM methods
  function buildExploitOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.className = 'eng-rl-exploit-overlay';

    const box = document.createElement('div');
    box.className = 'eng-rl-exploit-box';

    // Header
    const header = document.createElement('div');
    header.className = 'eng-rl-exploit-header';
    const icon = document.createElement('span');
    icon.className = 'eng-rl-exploit-icon';
    icon.textContent = '\u26A0';
    const titleEl = document.createElement('span');
    titleEl.className = 'eng-rl-exploit-title';
    titleEl.textContent = 'EXPLOIT CONFIRMED';
    header.appendChild(icon);
    header.appendChild(titleEl);

    const subtitle = document.createElement('div');
    subtitle.className = 'eng-rl-exploit-subtitle';
    subtitle.textContent = 'Reentrancy \u2014 withdraw() \u00B7 Severity: Critical';

    // Code block
    const codeWrap = document.createElement('div');
    codeWrap.className = 'eng-rl-exploit-code';
    const pre = document.createElement('pre');

    // Build syntax-highlighted code with styled spans (matching original)
    function codeSpan(cls: string, text: string): HTMLSpanElement {
      const s = document.createElement('span');
      s.className = cls;
      s.textContent = text;
      return s;
    }
    pre.appendChild(codeSpan('eng-rl-code-comment', '// Proof-of-Concept generated by Lodestar RL Agent'));
    pre.appendChild(document.createTextNode('\n'));
    pre.appendChild(codeSpan('eng-rl-code-kw', 'function'));
    pre.appendChild(document.createTextNode(' '));
    pre.appendChild(codeSpan('eng-rl-code-fn', 'attack'));
    pre.appendChild(document.createTextNode('() '));
    pre.appendChild(codeSpan('eng-rl-code-kw', 'external'));
    pre.appendChild(document.createTextNode(' {\n    target.deposit{value: '));
    pre.appendChild(codeSpan('eng-rl-code-num', '10 ether'));
    pre.appendChild(document.createTextNode('}();\n    target.withdraw('));
    pre.appendChild(codeSpan('eng-rl-code-num', '10 ether'));
    pre.appendChild(document.createTextNode(');\n}\n\n'));
    pre.appendChild(codeSpan('eng-rl-code-kw', 'receive'));
    pre.appendChild(document.createTextNode('() '));
    pre.appendChild(codeSpan('eng-rl-code-kw', 'external payable'));
    pre.appendChild(document.createTextNode(' {\n    '));
    pre.appendChild(codeSpan('eng-rl-code-kw', 'if'));
    pre.appendChild(document.createTextNode(' (target.balance >= '));
    pre.appendChild(codeSpan('eng-rl-code-num', '10 ether'));
    pre.appendChild(document.createTextNode(')\n        target.withdraw('));
    pre.appendChild(codeSpan('eng-rl-code-num', '10 ether'));
    pre.appendChild(document.createTextNode(');\n}\n\n'));
    pre.appendChild(codeSpan('eng-rl-code-comment', '// Result: 1,247.3 ETH drained in 6 recursive calls'));

    codeWrap.appendChild(pre);

    // SNR comparison
    const snr = document.createElement('div');
    snr.className = 'eng-rl-exploit-snr';

    function makeSnrRow(label: string, barClass: string, valText: string, valClass: string) {
      const row = document.createElement('div');
      row.className = 'eng-rl-exploit-snr-row';
      const lbl = document.createElement('span');
      lbl.className = 'eng-rl-exploit-snr-label';
      lbl.textContent = label;
      const bar = document.createElement('span');
      bar.className = 'eng-rl-exploit-snr-bar ' + barClass;
      const fill = document.createElement('span');
      fill.className = 'eng-rl-snr-fill';
      fill.style.width = '100%';
      bar.appendChild(fill);
      const val = document.createElement('span');
      val.className = 'eng-rl-exploit-snr-val ' + valClass;
      val.textContent = valText;
      row.appendChild(lbl);
      row.appendChild(bar);
      row.appendChild(val);
      return row;
    }
    snr.appendChild(makeSnrRow('TestMachine', 'eng-rl-snr-tm', '2 findings \u00B7 0 false positives', 'eng-rl-snr-good'));
    snr.appendChild(makeSnrRow('Static Analysis', 'eng-rl-snr-static', '46 findings \u00B7 92% false positives', 'eng-rl-snr-bad'));

    // Footer tags
    const footer = document.createElement('div');
    footer.className = 'eng-rl-exploit-footer';
    ['Every finding verified on-fork', 'Working PoC attached', 'If we report it, we exploited it'].forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'eng-rl-exploit-tag';
      tag.textContent = t;
      footer.appendChild(tag);
    });

    box.appendChild(header);
    box.appendChild(subtitle);
    box.appendChild(codeWrap);
    box.appendChild(snr);
    box.appendChild(footer);
    overlay.appendChild(box);
    return overlay;
  }

  function rlRunFromStage(startStage: number) {
    if (!startStage) startStage = 1;
    let T = 0;

    if (startStage > 1) {
      for (let s = 0; s < startStage - 1; s++) setStage(s, 'done');
      fnEls.forEach((_, i) => { setFn(i, 'scanned'); });
      setStatus('Running');
    }

    // === STAGE 1: INGESTION ===
    if (startStage <= 1) {
      rlAt(() => {
        setStatus('Initializing');
        setLog({cls: 'eng-rl-log-ts', text: 'init'}, {cls: 'eng-rl-log-text', text: ' Connecting to Lodestar engine...'});
        fnEls.forEach((fn, i) => {
          if (!fn) return;
          setTimeout(() => {
            fn.style.borderColor = 'var(--accent, #00e5c7)';
            fn.style.transition = 'border-color 0.3s';
            setTimeout(() => { fn.style.borderColor = ''; }, 300);
          }, i * 150);
        });
      }, T += 100);
      rlAt(() => {
        setLog({cls: 'eng-rl-log-ts', text: 'init'}, {cls: 'eng-rl-log-text', text: ' Loading StakingVault.sol \u2014 target acquired'});
      }, T += 600);
      rlAt(() => {
        setLog({cls: 'eng-rl-log-ok', text: '\u2713 Engine ready'}, {cls: 'eng-rl-log-text', text: ' \u2014 beginning 6-stage analysis pipeline'});
      }, T += 600);

      rlAt(() => { updateStageNav(1); showStageExplainer(1); }, T += 800);
      rlAt(() => {
        setPhase('Ingestion', 'explore');
        setStatus('Ingesting');
        setStageNum(1);
        setStage(0, 'active');
        setLog({cls: 'eng-rl-log-w', text: 'Foundry'}, {cls: 'eng-rl-log-text', text: ' Parsing StakingVault.sol \u2014 6 functions found'});
      }, T += EXPLAINER_TOTAL);

      rlAt(() => { setFn(0, 'scanned'); setFn(1, 'scanned'); }, T += 400);
      rlAt(() => { setFn(2, 'scanned'); setFn(3, 'scanned'); }, T += 300);
      rlAt(() => {
        setFn(4, 'scanned'); setFn(5, 'scanned');
        setStage(0, 'done');
        setLog({cls: 'eng-rl-log-ok', text: '\u2713 Ingestion complete'}, {cls: 'eng-rl-log-text', text: ' ABI loaded \u2022 bytecode verified \u2022 6 functions mapped'});
      }, T += 300);
    }

    // === STAGE 2: LLM ANALYSIS ===
    if (startStage <= 2) {
      rlAt(() => { updateStageNav(2); showStageExplainer(2); }, T += 600);
      rlAt(() => {
        setPhase('LLM Analysis', 'explore');
        setStatus('Analyzing');
        setStageNum(2);
        setStage(1, 'active');
        setLog({cls: 'eng-rl-log-w', text: 'CodeIntentAgent'}, {cls: 'eng-rl-log-text', text: ' Analyzing contract intent...'});
      }, T += EXPLAINER_TOTAL);

      rlAt(() => {
        setFn(1, 'vuln');
        setLog({cls: 'eng-rl-log-crit', text: '\u26A0 Reentrancy risk in withdraw()'}, {cls: 'eng-rl-log-text', text: ' \u2014 external call before state update'});
      }, T += 700);

      rlAt(() => {
        setLog({cls: 'eng-rl-log-w', text: 'UniverseBuilder'}, {cls: 'eng-rl-log-text', text: ' 3 actors: attacker, victim, owner \u2022 '}, {cls: 'eng-rl-log-w', text: 'ArgHintAgent'}, {cls: 'eng-rl-log-text', text: ' bounds for 6 functions'});
      }, T += 600);

      rlAt(() => {
        setStage(1, 'done');
        setLog({cls: 'eng-rl-log-ok', text: '\u2713 Analysis complete'}, {cls: 'eng-rl-log-text', text: ' 1 vulnerability hypothesis \u2022 6 hint sets generated'});
      }, T += 500);
    }

    // === STAGE 3: ANVIL VALIDATION ===
    if (startStage <= 3) {
      rlAt(() => { updateStageNav(3); showStageExplainer(3); }, T += 600);
      rlAt(() => {
        setPhase('Anvil Validation', 'explore');
        setStatus('Validating');
        setStageNum(3);
        setStage(2, 'active');
        setLog({cls: 'eng-rl-log-w', text: 'AnvilValidator'}, {cls: 'eng-rl-log-text', text: ' Forked environment \u2022 testing hints on-chain...'});
      }, T += EXPLAINER_TOTAL);

      rlAt(() => {
        setFn(0, 'validated'); setFn(2, 'validated'); setFn(3, 'validated');
        setLog({cls: 'eng-rl-log-ts', text: 'anvil'}, {cls: 'eng-rl-log-text', text: ' deposit(), claimRewards(), liquidate() \u2014 hints valid'});
      }, T += 500);

      rlAt(() => {
        setFn(4, 'validated'); setFn(5, 'validated');
        setLog({cls: 'eng-rl-log-w', text: 'HintRefiner'}, {cls: 'eng-rl-log-text', text: ' Iteration 2: setOracle(), updateRewardRate() corrected'});
      }, T += 500);

      rlAt(() => {
        setFn(1, 'vuln');
        setStage(2, 'done');
        setLog({cls: 'eng-rl-log-ok', text: '\u2713 6/6 validated'}, {cls: 'eng-rl-log-text', text: ' \u2022 state catalog: 14 observables \u2022 action space ready'});
      }, T += 500);
    }

    // === STAGE 4: ACTION SPACE ===
    if (startStage <= 4) {
      rlAt(() => { updateStageNav(4); showStageExplainer(4); }, T += 500);
      rlAt(() => {
        setPhase('Action Space Generation', 'explore');
        setStatus('Encoding');
        setStageNum(4);
        setStage(3, 'active');
        fnEls.forEach(fn => { if (fn) fn.style.opacity = '0'; });
        if (rlArenaLabel) rlArenaLabel.style.opacity = '0';
        startSpace();
        setLog({cls: 'eng-rl-log-w', text: 'ActionSpace'}, {cls: 'eng-rl-log-text', text: ' Encoding 6 functions into 64-dim latent vectors...'});
      }, T += EXPLAINER_TOTAL);

      rlAt(() => {
        setLog({cls: 'eng-rl-log-ts', text: 'embed'}, {cls: 'eng-rl-log-text', text: ' deposit() \u2022 withdraw() \u2014 label embeddings [32 dims]'});
      }, T += 1200);
      rlAt(() => {
        setLog({cls: 'eng-rl-log-ts', text: 'embed'}, {cls: 'eng-rl-log-text', text: ' claimRewards() \u2022 liquidate() \u2014 parameter encodings [32 dims]'});
      }, T += 1200);
      rlAt(() => {
        setLog({cls: 'eng-rl-log-ts', text: 'embed'}, {cls: 'eng-rl-log-text', text: ' setOracle() \u2022 updateRewardRate() \u2014 clusters separating'});
      }, T += 1200);
      rlAt(() => {
        setLog({cls: 'eng-rl-log-ok', text: '\u2713 Action space built'}, {cls: 'eng-rl-log-text', text: ' 6 function clusters \u2022 continuous 64-dim action space'});
      }, T += 1400);
      rlAt(() => {
        setStage(3, 'done');
        stopSpace();
        fnEls.forEach(fn => { if (fn) fn.style.opacity = '1'; });
        if (rlArenaLabel) rlArenaLabel.style.opacity = '1';
      }, T += 800);
    }

    // === STAGE 5: RL EXPLORATION ===
    if (startStage <= 5) {
      rlAt(() => { updateStageNav(5); showStageExplainer(5); }, T += 500);
      rlAt(() => {
        setPhase('RL Exploration', 'explore');
        setStatus('Training');
        setStageNum(5);
        setStage(4, 'active');
        fnEls.forEach((_, i) => { setFn(i, null); });
        setLog({cls: 'eng-rl-log-w', text: 'RL Agent'}, {cls: 'eng-rl-log-text', text: ' Deploying 4 agents to forked chain...'});
      }, T += EXPLAINER_TOTAL);

      rlAt(() => {
        jumpTo(agentEls[0], 0); activateAgent(agentEls[0]);
        jumpTo(agentEls[1], 2); activateAgent(agentEls[1]);
        setFn(0, 'targeted'); setFn(2, 'targeted');
        setLog({cls: 'eng-rl-log-ts', text: 'ep:8'}, {cls: 'eng-rl-log-text', text: ' Agent-0 \u2192 deposit() \u2022 Agent-1 \u2192 claimRewards()'});
      }, T += 500);
      rlAt(() => {
        jumpTo(agentEls[2], 3); activateAgent(agentEls[2]);
        jumpTo(agentEls[3], 5); activateAgent(agentEls[3]);
        setFn(3, 'targeted'); setFn(5, 'targeted');
        setLog({cls: 'eng-rl-log-ts', text: 'ep:15'}, {cls: 'eng-rl-log-text', text: ' Agent-2 \u2192 liquidate() \u2022 Agent-3 \u2192 updateRewardRate()'});
      }, T += 500);
      rlAt(() => {
        jumpTo(agentEls[0], 1); jumpTo(agentEls[1], 4);
        setFn(0, null); setFn(2, null);
        setFn(1, 'targeted'); setFn(4, 'targeted');
        setReward(8, '0.00 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:24'}, {cls: 'eng-rl-log-text', text: ' Exploring withdraw() \u2022 setOracle() \u2022 mapping state transitions'});
      }, T += 600);
      rlAt(() => {
        jumpTo(agentEls[2], 0); jumpTo(agentEls[3], 1);
        setFn(3, null); setFn(5, null); setFn(4, null);
        setFn(0, 'targeted');
        setReward(12, '0.00 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:31'}, {cls: 'eng-rl-log-text', text: ' Testing deposit() \u2192 withdraw() sequences'});
      }, T += 600);
      rlAt(() => {
        jumpTo(agentEls[0], 0); jumpTo(agentEls[1], 1);
        setFn(1, 'targeted');
        setReward(20, '0.12 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:41'}, {cls: 'eng-rl-log-ok', text: ' \u26A1 Small reward'}, {cls: 'eng-rl-log-text', text: ' \u2014 withdraw() state deviation detected'});
      }, T += 600);
      rlAt(() => {
        jumpTo(agentEls[2], 2); jumpTo(agentEls[3], 3);
        setFn(2, 'targeted'); setFn(3, 'targeted');
        setReward(25, '0.34 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:58'}, {cls: 'eng-rl-log-text', text: ' Agent-2 testing claimRewards() \u2192 liquidate() path'});
      }, T += 600);
    }

    // === STAGE 6: EXPLOITATION ===
    if (startStage <= 6) {
      rlAt(() => { updateStageNav(6); showStageExplainer(6); }, T += 800);
      rlAt(() => {
        setPhase('Exploitation', 'exploit');
        setStatus('Exploiting');
        setStageNum(6);
        setStage(4, 'done');
        setStage(5, 'exploit');
        setExploitAgent(agentEls[0]);
        fnEls.forEach((_, i) => { setFn(i, null); });
        setLog({cls: 'eng-rl-log-crit', text: '\u26A0 Attack hypothesis forming: reentrancy in withdraw()'});
      }, T += EXPLAINER_TOTAL);

      rlAt(() => {
        jumpTo(agentEls[0], 0);
        setFn(0, 'vuln');
        setReward(35, '2.4 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:72'}, {cls: 'eng-rl-log-crit', text: ' deposit(10000e18)'}, {cls: 'eng-rl-log-text', text: ' \u2192 attacker funds loaded'});
      }, T += 700);
      rlAt(() => {
        jumpTo(agentEls[0], 1);
        setFn(1, 'vuln');
        setReward(55, '48.2 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:76'}, {cls: 'eng-rl-log-crit', text: ' withdraw() called \u2192 re-entered via fallback'});
      }, T += 600);
      rlAt(() => {
        setReward(75, '420.8 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:79'}, {cls: 'eng-rl-log-crit', text: ' withdraw() \u00D73 \u2014 recursive drain active'});
      }, T += 500);
      rlAt(() => {
        setReward(90, '842.5 ETH', false);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:83'}, {cls: 'eng-rl-log-crit', text: ' withdraw() \u00D76 \u2014 842.5 ETH extracted'});
      }, T += 500);
      rlAt(() => {
        setReward(95, '1,247.3 ETH', true);
        setLog({cls: 'eng-rl-log-ts', text: 'ep:89'}, {cls: 'eng-rl-log-crit', text: ' \u26A0 EXPLOIT CONFIRMED: 1,247.3 ETH via reentrancy'});
      }, T += 600);
      rlAt(() => {
        setStatus('Complete');
        setPhase('PoC Verified', 'exploit');
        stageEls.forEach((_, i) => { if (i < 5) setStage(i, 'done'); });
        setLog({cls: 'eng-rl-log-ok', text: '\u2713 PoC: deposit \u2192 withdraw \u00D76 \u2192 1,247.3 ETH drained'});
      }, T += 700);

      // Exploit Confirmed overlay
      rlAt(() => {
        if (!rlArena) return;
        const overlay = buildExploitOverlay();
        rlArena.appendChild(overlay);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { overlay.classList.add('eng-rl-exploit-visible'); });
        });
        rlAt(() => {
          overlay.classList.remove('eng-rl-exploit-visible');
          setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 400);
        }, 4500);
      }, T += 800);

      rlAt(() => { if (rlRunning) rlRun(); }, T += 5500);
    }
  }

  // Pipeline scroll animation
  function updatePipeLineFill() {
    if (!pipeTrack || !pipeLineFill) return;
    const visibleStages = pipeTrack.querySelectorAll('.eng-pipe-visible');
    if (visibleStages.length === 0) return;
    const lastVisible = visibleStages[visibleStages.length - 1];
    const trackRect = pipeTrack.getBoundingClientRect();
    const nodeOffset = lastVisible.querySelector('.eng-pipe-node');
    const nodeRect = nodeOffset ? nodeOffset.getBoundingClientRect() : lastVisible.getBoundingClientRect();
    const fillHeight = nodeRect.top + nodeRect.height / 2 - trackRect.top;
    pipeLineFill.style.height = Math.max(0, fillHeight) + 'px';
  }

  onMount(() => {
    if (!browser) return;

    const pipeStages = document.querySelectorAll('[data-pipe-stage]');
    if (pipeStages.length > 0 && pipeTrack) {
      pipeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('eng-pipe-visible');
            updatePipeLineFill();
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      pipeStages.forEach(stage => pipeObserver.observe(stage));
    }

    if (rlViz) {
      rlObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !rlRunning) {
            rlRunning = true;
            rlRun();
          } else if (!entry.isIntersecting && rlRunning) {
            rlRunning = false;
            rlClear();
            rlReset();
          }
        });
      }, { threshold: 0.15 });
      rlObserver.observe(rlViz);
    }
  });

  onDestroy(() => {
    pipeObserver?.disconnect();
    rlObserver?.disconnect();
    rlClear();
    stopSpace();
  });
</script>

<svelte:head>
  <title>How It Works &mdash; TestMachine</title>
  <meta name="description" content="How TestMachine works: dynamic code execution + reinforcement learning = zero false positives. Deep technical breakdown of the pipeline." />
</svelte:head>

<!-- Hero -->
<section class="eng-hero">
  <div class="container">
    <span class="eng-hero-tag">Our Technology</span>
    <h1 class="eng-hero-title">How TestMachine Works</h1>
    <p class="eng-hero-sub"><strong>Dynamic code execution + reinforcement learning = zero false positives.</strong> We don't guess at vulnerabilities. We prove them.</p>
  </div>
</section>

<!-- Pipeline -->
<section class="eng-pipeline" id="pipeline">
  <div class="container">
    <div class="eng-pipeline-header" data-animate>
      <span class="section-label">The Pipeline</span>
      <h2 class="eng-section-title">End-to-end security analysis</h2>
      <p class="eng-section-desc" style="margin: 0 auto;">From code ingestion to verified proof-of-concept. Every stage automated. Every finding proven.</p>
    </div>
    <div class="eng-pipe-track" bind:this={pipeTrack}>
      <div class="eng-pipe-line"></div>
      <div class="eng-pipe-line-fill" bind:this={pipeLineFill}></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">01</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 01</div><div class="eng-pipe-title">Protocol Ingestion</div><div class="eng-pipe-desc">Smart contract source code, ABIs, on-chain state, and economic parameters are ingested. The system maps every contract, every function, every external dependency.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">Source Code</span><span class="eng-pipe-tag">ABIs</span><span class="eng-pipe-tag">On-chain State</span><span class="eng-pipe-tag">Economic Params</span></div></div></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">02</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 02 &mdash; Azimuth Engine</div><div class="eng-pipe-title">LLM Analysis</div><div class="eng-pipe-desc">LLMs parse the protocol to understand structure, identify potential attack surfaces, map economic flows, and understand governance mechanics. This is context-building, not vulnerability detection. The LLMs set up the battlefield.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">Structure Analysis</span><span class="eng-pipe-tag">Attack Surface Mapping</span><span class="eng-pipe-tag">Economic Flow Tracing</span><span class="eng-pipe-tag">Governance Parsing</span></div><div class="eng-pipe-flow"><div class="eng-pipe-flow-dot"></div><span>Outputs structured context for hypothesis generation</span></div></div></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">03</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 03</div><div class="eng-pipe-title">Hypothesis Generation</div><div class="eng-pipe-desc">Based on LLM analysis, the system generates structured attack hypotheses: "What if an attacker flash-loans X and then calls Y?" "What if governance is manipulated to drain the treasury?" Each hypothesis becomes a testable scenario.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">Flash Loan Vectors</span><span class="eng-pipe-tag">Governance Attacks</span><span class="eng-pipe-tag">Price Manipulation</span><span class="eng-pipe-tag">Reentrancy Paths</span></div></div></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">04</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 04</div><div class="eng-pipe-title">RL Agent Deployment</div><div class="eng-pipe-desc">Reinforcement learning agents are deployed in a sandboxed fork of the protocol. Their objective: maximize economic extraction. They explore the state space systematically, probing every entry point, testing every invariant.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">Sandboxed Fork</span><span class="eng-pipe-tag">Reward: Max Extraction</span><span class="eng-pipe-tag">State Space Exploration</span></div><div class="eng-pipe-flow"><div class="eng-pipe-flow-dot"></div><span>Agents explore &rarr; exploit in simulated environment</span></div></div></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">05</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 05</div><div class="eng-pipe-title">Dynamic Execution</div><div class="eng-pipe-desc">Agents actually execute transactions against forked contracts. Real calls, real state changes, real token flows. This is not simulation &mdash; it's execution. Every interaction modifies the forked chain state exactly as it would on mainnet.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">Real Transactions</span><span class="eng-pipe-tag">State Changes</span><span class="eng-pipe-tag">Token Flows</span><span class="eng-pipe-tag">Forked Chain</span></div></div></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">06</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 06</div><div class="eng-pipe-title">Verification &amp; PoC</div><div class="eng-pipe-desc">When an agent finds an exploit path, the system generates a proof-of-concept: reproducible exploit code that demonstrates the vulnerability. Zero false positives because every vulnerability was actually exploited.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">PoC Generation</span><span class="eng-pipe-tag">Reproducible</span><span class="eng-pipe-tag">Zero False Positives</span></div><div class="eng-pipe-flow"><div class="eng-pipe-flow-dot"></div><span>Every finding backed by working exploit code</span></div></div></div>
      <div class="eng-pipe-stage" data-pipe-stage><div class="eng-pipe-node">07</div><div class="eng-pipe-content"><div class="eng-pipe-label">Stage 07</div><div class="eng-pipe-title">Report &amp; Remediation</div><div class="eng-pipe-desc">Findings are compiled with severity scores, proof-of-concept code, recommended fixes, and automated verification that resolves the vulnerability. The loop closes: find, fix, verify.</div><div class="eng-pipe-tags"><span class="eng-pipe-tag">Severity Scoring</span><span class="eng-pipe-tag">Fix Recommendations</span><span class="eng-pipe-tag">Fix Verification</span></div></div></div>
    </div>
  </div>
</section>

<!-- LLM Deep Dive -->
<section class="eng-section" id="llm-engine">
  <div class="container">
    <div class="eng-section-header" data-animate>
      <span class="section-label">Deep Dive</span>
      <h2 class="eng-section-title">LLMs as the intelligence layer</h2>
      <p class="eng-section-desc">At TestMachine, LLMs aren't used to detect vulnerabilities — they act as the context engine that makes everything else work.</p>
    </div>
    <div class="eng-llm-grid" data-animate>
      <div class="eng-llm-roles">
        <div class="eng-llm-role"><div class="eng-llm-role-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></div><div><h4>Attack Surface Identification</h4><p>They identify what to test: structural risks, economic invariants that must hold, access control patterns that could be bypassed, and governance flows that could be manipulated.</p></div></div>
        <div class="eng-llm-role"><div class="eng-llm-role-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div><h4>Economic Flow Mapping</h4><p>LLMs trace how value moves through the protocol: token minting, staking rewards, liquidation mechanics, and fee structures. They build the economic model that the RL agents attack.</p></div></div>
        <div class="eng-llm-role"><div class="eng-llm-role-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/></svg></div><div><h4>Why This Matters</h4><p>LLMs are brilliant at understanding code structure, documentation, and intent. But they're fallible — they hallucinate, produce false positives, and they can't execute code. By using LLMs for what they're good at — understanding — and RL agents for what they're good at — exploration and exploitation — TestMachine eliminates the false positive problem entirely.</p></div></div>
      </div>
      <div class="eng-llm-analogy">
        <div class="eng-llm-analogy-title">The Division of Labor</div>
        <div class="eng-llm-compare">
          <div class="eng-llm-compare-item"><div class="eng-llm-compare-label">Azimuth LLMs</div><div class="eng-llm-compare-role">Intelligence Analysts</div><div class="eng-llm-compare-desc">Map the terrain. Identify targets. Build the plan.</div></div>
          <div class="eng-llm-compare-arrow" aria-hidden="true">&rarr;</div>
          <div class="eng-llm-compare-item"><div class="eng-llm-compare-label">RL Agents</div><div class="eng-llm-compare-role">Special Operators</div><div class="eng-llm-compare-desc">Execute the mission. Adapt in real-time. Prove the exploit.</div></div>
        </div>
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <div style="font-family: var(--font-mono); font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-dim); margin-bottom: 12px;">Why this matters</div>
          <div style="font-size: 0.875rem; color: var(--fg-muted); line-height: 1.7;">LLMs are brilliant at understanding code structure, documentation, and intent. But they hallucinate. They produce false positives. They can't execute code. By using LLMs for what they're good at &mdash; understanding &mdash; and RL agents for what they're good at &mdash; exploration and exploitation &mdash; TestMachine eliminates the false positive problem entirely.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RL Agents Visualization -->
<section class="eng-section" id="rl-agents">
  <div class="container">
    <div class="eng-section-header" data-animate>
      <span class="section-label">Deep Dive</span>
      <h2 class="eng-section-title">RL agents attack your protocol</h2>
      <p class="eng-section-desc">Watch reinforcement learning agents probe a DeFi protocol. They explore every entry point, discover attack paths, and prove exploits by executing them.</p>
    </div>
    <div class="eng-rl-viz" bind:this={rlViz} data-animate>
      <div class="eng-rl-titlebar">
        <div class="eng-rl-titlebar-left"><div class="eng-rl-titlebar-dots"><span style="background:#ef4444"></span><span style="background:#f59e0b"></span><span style="background:#22c55e"></span></div>Lodestar Analysis Pipeline</div>
        <div class="eng-rl-titlebar-right"><div class="eng-rl-status"><span class="eng-rl-status-dot" bind:this={rlStatusDot}></span> <span bind:this={rlStatusText}>Initializing</span></div><div class="eng-rl-epoch" bind:this={rlEpoch}>Stage 0/6</div></div>
      </div>
      <div class="eng-rl-canvas">
        <div class="eng-rl-pipeline">
          <div class="eng-rl-stage" bind:this={stageEls[0]}><div class="eng-rl-stage-icon">&#9638;</div><div class="eng-rl-stage-label">Ingest</div></div><div class="eng-rl-stage-arrow">&rarr;</div>
          <div class="eng-rl-stage" bind:this={stageEls[1]}><div class="eng-rl-stage-icon">&#9672;</div><div class="eng-rl-stage-label">LLM Analysis</div></div><div class="eng-rl-stage-arrow">&rarr;</div>
          <div class="eng-rl-stage" bind:this={stageEls[2]}><div class="eng-rl-stage-icon">&#10003;</div><div class="eng-rl-stage-label">Validate</div></div><div class="eng-rl-stage-arrow">&rarr;</div>
          <div class="eng-rl-stage" bind:this={stageEls[3]}><div class="eng-rl-stage-icon">&#9641;</div><div class="eng-rl-stage-label">Action Space</div></div><div class="eng-rl-stage-arrow">&rarr;</div>
          <div class="eng-rl-stage" bind:this={stageEls[4]}><div class="eng-rl-stage-icon">&#9654;</div><div class="eng-rl-stage-label">RL Agents</div></div><div class="eng-rl-stage-arrow">&rarr;</div>
          <div class="eng-rl-stage" bind:this={stageEls[5]}><div class="eng-rl-stage-icon">&#9888;</div><div class="eng-rl-stage-label">Exploit PoC</div></div>
        </div>
        <div class="eng-rl-arena" bind:this={rlArena}>
          <div class="eng-rl-arena-label" bind:this={rlArenaLabel}>StakingVault.sol</div>
          <div class="eng-rl-fn-block" bind:this={fnEls[0]}><div class="eng-rl-fn-name">deposit</div><div class="eng-rl-fn-sig">(uint256 amount)</div></div>
          <div class="eng-rl-fn-block" bind:this={fnEls[1]}><div class="eng-rl-fn-name">withdraw</div><div class="eng-rl-fn-sig">(address to, uint256 amt)</div></div>
          <div class="eng-rl-fn-block" bind:this={fnEls[2]}><div class="eng-rl-fn-name">claimRewards</div><div class="eng-rl-fn-sig">()</div></div>
          <div class="eng-rl-fn-block" bind:this={fnEls[3]}><div class="eng-rl-fn-name">liquidate</div><div class="eng-rl-fn-sig">(address target)</div></div>
          <div class="eng-rl-fn-block" bind:this={fnEls[4]}><div class="eng-rl-fn-name">setOracle</div><div class="eng-rl-fn-sig">(address oracle)</div></div>
          <div class="eng-rl-fn-block" bind:this={fnEls[5]}><div class="eng-rl-fn-name">updateRewardRate</div><div class="eng-rl-fn-sig">(uint256 rate)</div></div>
          <div class="eng-rl-agent" bind:this={agentEls[0]}></div>
          <div class="eng-rl-agent" bind:this={agentEls[1]}></div>
          <div class="eng-rl-agent" bind:this={agentEls[2]}></div>
          <div class="eng-rl-agent" bind:this={agentEls[3]}></div>
          <canvas class="eng-rl-space-canvas" bind:this={spaceCanvas}></canvas>
          <div class="eng-rl-phase"><div class="eng-rl-phase-label" bind:this={rlPhaseLabel}>Ingestion</div></div>
        </div>
        <div class="eng-rl-log-strip">
          <div class="eng-rl-log-entries" bind:this={rlLogEntries}></div>
          <div class="eng-rl-reward-inline"><span class="eng-rl-reward-label">Reward</span><span class="eng-rl-reward-bar"><span class="eng-rl-reward-fill" bind:this={rlRewardFill}></span></span><span class="eng-rl-reward-val" bind:this={rlRewardVal}>0.00 ETH</span></div>
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="eng-rl-stage-nav" on:click={handleStageClick}>
          <button class="eng-rl-stage-btn" data-jump="1"><span class="eng-rl-stage-btn-num">1</span> Ingest</button>
          <button class="eng-rl-stage-btn" data-jump="2"><span class="eng-rl-stage-btn-num">2</span> LLM Analysis</button>
          <button class="eng-rl-stage-btn" data-jump="3"><span class="eng-rl-stage-btn-num">3</span> Validation</button>
          <button class="eng-rl-stage-btn" data-jump="4"><span class="eng-rl-stage-btn-num">4</span> Action Space</button>
          <button class="eng-rl-stage-btn" data-jump="5"><span class="eng-rl-stage-btn-num">5</span> RL Agents</button>
          <button class="eng-rl-stage-btn" data-jump="6"><span class="eng-rl-stage-btn-num">6</span> Exploit</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Infrastructure -->
<section class="eng-section" id="infrastructure">
  <div class="container">
    <div class="eng-section-header" data-animate><span class="section-label">Infrastructure</span><h2 class="eng-section-title">The infrastructure moat</h2><p class="eng-section-desc">This isn't something you can replicate with a prompt. TestMachine's engine requires dedicated infrastructure that runs at scale, continuously.</p></div>
    <div class="eng-infra-grid" data-animate>
      <div class="eng-infra-card"><span class="eng-infra-icon" aria-hidden="true">&#9878;</span><h3>Forked Environments</h3><p>Full blockchain fork per protocol analysis. Real state, real balances, real contract code.</p></div>
      <div class="eng-infra-card"><span class="eng-infra-icon" aria-hidden="true">&#9878;</span><h3>Zero False Positives</h3><p>RL agents don't just find vulnerabilities — they exploit them on forked chains. Every finding is verified with a working proof-of-concept.</p></div>
      <div class="eng-infra-card"><span class="eng-infra-icon" aria-hidden="true">&#8634;</span><h3>Continuous Re-testing</h3><p>Contracts are re-analyzed as they upgrade. Markets shift, new functions appear &mdash; the engine adapts.</p></div>
      <div class="eng-infra-card"><span class="eng-infra-icon" aria-hidden="true">&#127760;</span><h3>All EVM Chains</h3><p>Ethereum, Base, Arbitrum, Optimism, Polygon, Avalanche, BSC. One engine, full coverage.</p></div>
    </div>
  </div>
</section>

<!-- Products -->
<section class="eng-section" id="products">
  <div class="container">
    <div class="eng-section-header" data-animate><span class="section-label">Products</span><h2 class="eng-section-title">Powered by the engine</h2></div>
    <div class="eng-products-grid" data-animate>
      <div class="eng-product-card"><div class="eng-product-label">Product 01</div><h3>Token Custody</h3><p>Risk scoring for 9M+ tokens across all EVM chains. Every token analyzed for confiscation, hidden minting, proxy manipulation, and more. Scores from &minus;100 (critical) to +100 (safe).</p></div>
      <div class="eng-product-card"><div class="eng-product-label">Product 02</div><h3>Azimuth</h3><p>AI agents that actively attack your smart contracts in forked mainnet environments with real transaction execution. Zero false positives — if Azimuth reports a vulnerability, it was actually exploited. Results in minutes, not weeks.</p></div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="eng-cta" id="cta">
  <div class="container" data-animate>
    <h2 class="eng-cta-title">See it in action</h2>
    <p class="eng-cta-sub">Point TestMachine at your protocol. Get confirmed vulnerabilities with proof-of-concept exploits. Zero false positives.</p>
    <a href="https://app.testmachine.ai/" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Launch App</a>
  </div>
</section>

<style>
  .eng-hero { padding: calc(var(--nav-h) + 100px) 0 80px; text-align: center; position: relative; overflow: hidden; }
  .eng-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.25 0.04 192 / 0.35) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 40%, oklch(0.22 0.02 220 / 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 60%, oklch(0.20 0.02 280 / 0.15) 0%, transparent 60%); pointer-events: none; }
  @keyframes heroFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .eng-hero-tag { display: inline-block; font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent); margin-bottom: 1.5rem; animation: heroFadeIn 0.8s ease 0.2s both; }
  .eng-hero-title { font-family: var(--font-display); font-size: clamp(2.75rem, 7vw, 4.5rem); font-weight: 800; line-height: 1.06; letter-spacing: -0.035em; margin-bottom: 1.5rem; color: var(--fg); animation: heroFadeIn 0.8s ease 0.4s both; }
  .eng-hero-sub { font-size: clamp(0.9375rem, 2vw, 1.125rem); color: var(--fg-muted); max-width: 680px; margin: 0 auto; line-height: 1.7; animation: heroFadeIn 0.8s ease 0.6s both; }
  .eng-hero-sub :global(strong) { color: var(--accent); font-weight: 600; }
  .eng-section { padding: var(--section-py) 0; border-top: 1px solid var(--border-subtle); }
  .eng-section-header { margin-bottom: 3rem; }
  .eng-section-title { font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 700; line-height: 1.12; letter-spacing: -0.025em; margin-bottom: 0.75rem; color: var(--fg); }
  .eng-section-desc { font-family: var(--font-body); color: var(--fg-muted); max-width: 680px; font-size: 0.9375rem; line-height: 1.7; }
  .eng-pipeline { padding: var(--section-py) 0; border-top: 1px solid var(--border-subtle); position: relative; }
  .eng-pipeline-header { text-align: center; margin-bottom: 4rem; }
  .eng-pipe-track { position: relative; max-width: 900px; margin: 0 auto; }
  .eng-pipe-line { position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: var(--border-subtle); }
  .eng-pipe-line-fill { position: absolute; left: 24px; top: 0; width: 2px; height: 0; background: var(--accent); transition: height 0.3s ease; }
  .eng-pipe-stage { position: relative; padding-left: 64px; padding-bottom: 48px; opacity: 0; transform: translateX(-16px); transition: opacity 0.5s ease, transform 0.5s ease; }
  :global(.eng-pipe-stage.eng-pipe-visible) { opacity: 1; transform: translateX(0); }
  .eng-pipe-stage:last-child { padding-bottom: 0; }
  .eng-pipe-node { position: absolute; left: 12px; top: 0; width: 26px; height: 26px; border: 2px solid var(--border); background: var(--bg); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.625rem; font-weight: 700; color: var(--fg-dim); transition: all 0.3s ease; z-index: 2; }
  :global(.eng-pipe-stage.eng-pipe-visible) .eng-pipe-node { border-color: var(--accent); color: var(--accent); box-shadow: 0 0 12px oklch(0.72 0.12 192 / 0.2); }
  .eng-pipe-content { background: var(--card-bg); border: 1px solid var(--border-subtle); padding: 24px; transition: border-color 0.3s ease; }
  :global(.eng-pipe-stage.eng-pipe-visible) .eng-pipe-content { border-color: var(--border); }
  .eng-pipe-label { font-family: var(--font-mono); font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 6px; }
  .eng-pipe-title { font-family: var(--font-display); font-size: clamp(1.125rem, 2vw, 1.375rem); font-weight: 700; color: var(--fg); margin-bottom: 8px; }
  .eng-pipe-desc { font-family: var(--font-body); font-size: 0.875rem; color: var(--fg-muted); line-height: 1.7; }
  .eng-pipe-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
  .eng-pipe-tag { font-family: var(--font-mono); font-size: 0.625rem; font-weight: 500; padding: 3px 10px; background: oklch(0.22 0.005 260); border: 1px solid var(--border-subtle); color: var(--fg-muted); }
  :global([data-theme="light"]) .eng-pipe-tag { background: oklch(0.92 0.003 260); }
  .eng-pipe-flow { display: flex; align-items: center; gap: 8px; margin-top: 14px; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--fg-dim); }
  .eng-pipe-flow-dot { width: 6px; height: 6px; background: var(--accent); animation: eng-flow-pulse 1.5s ease infinite; }
  @keyframes eng-flow-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  .eng-llm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  .eng-llm-roles { display: flex; flex-direction: column; gap: 16px; }
  .eng-llm-role { padding: 20px; background: var(--card-bg); border: 1px solid var(--border-subtle); display: flex; gap: 16px; align-items: flex-start; }
  .eng-llm-role-icon { flex-shrink: 0; width: 36px; height: 36px; background: oklch(0.22 0.01 192); display: flex; align-items: center; justify-content: center; font-size: 0.875rem; }
  :global([data-theme="light"]) .eng-llm-role-icon { background: oklch(0.92 0.02 192); }
  .eng-llm-role h4 { font-family: var(--font-display); font-size: 0.875rem; font-weight: 700; color: var(--fg); margin-bottom: 4px; }
  .eng-llm-role p { font-size: 0.875rem; color: var(--fg-muted); line-height: 1.55; }
  .eng-llm-analogy { background: var(--card-bg); border: 1px solid var(--border-subtle); padding: 28px; position: relative; }
  .eng-llm-analogy::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); }
  .eng-llm-analogy-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--fg); margin-bottom: 16px; }
  .eng-llm-compare { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: start; }
  .eng-llm-compare-item { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .eng-llm-compare-label { font-family: var(--font-mono); font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--fg-dim); margin-bottom: 8px; min-height: 1.2em; }
  .eng-llm-compare-role { font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; color: var(--accent); margin-bottom: 4px; min-height: 1.4em; }
  .eng-llm-compare-desc { font-size: 0.75rem; color: var(--fg-muted); line-height: 1.5; }
  .eng-llm-compare-arrow { font-size: 1.5rem; color: var(--fg-dim); padding-top: 1.6em; }
  .eng-rl-viz { position: relative; background: oklch(0.13 0.005 260); border: 1px solid var(--border-subtle); overflow: hidden; min-height: 600px; }
  :global([data-theme="light"]) .eng-rl-viz { background: oklch(0.97 0.003 260); }
  .eng-rl-titlebar { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: oklch(0.16 0.005 260); border-bottom: 1px solid oklch(0.22 0 0); font-family: var(--font-mono); font-size: 0.75rem; }
  :global([data-theme="light"]) .eng-rl-titlebar { background: oklch(0.94 0 0); border-color: oklch(0.85 0 0); }
  .eng-rl-titlebar-left { display: flex; align-items: center; gap: 10px; color: var(--fg); font-weight: 600; }
  .eng-rl-titlebar-dots { display: flex; gap: 6px; }
  .eng-rl-titlebar-dots span { width: 10px; height: 10px; border-radius: 50%; }
  .eng-rl-titlebar-right { display: flex; align-items: center; gap: 12px; }
  .eng-rl-status { display: flex; align-items: center; gap: 5px; font-size: 0.6875rem; color: #22c55e; font-weight: 500; }
  .eng-rl-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: eng-flow-pulse 1.5s ease infinite; }
  .eng-rl-epoch { font-size: 0.6875rem; color: var(--fg-dim); }
  .eng-rl-canvas { position: relative; overflow: hidden; display: flex; flex-direction: column; }
  .eng-rl-arena { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 16px; padding: 40px 24px 24px; min-height: 360px; flex: 1; }
  .eng-rl-arena-label { position: absolute; top: 10px; right: 16px; font-family: var(--font-mono); font-size: 0.5625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--fg-dim); opacity: 0.6; transition: opacity 0.5s; }
  .eng-rl-fn-block { background: oklch(0.15 0.005 260); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 16px 8px; font-family: var(--font-mono); transition: border-color 0.4s, box-shadow 0.4s, background 0.4s, opacity 0.5s; position: relative; z-index: 2; }
  :global([data-theme="light"]) .eng-rl-fn-block { background: oklch(0.95 0.003 260); }
  .eng-rl-fn-name { font-size: 0.75rem; font-weight: 700; color: var(--fg); transition: color 0.3s; }
  .eng-rl-fn-sig { font-size: 0.5625rem; color: var(--fg-dim); }
  :global(.eng-rl-fn-block.eng-rl-fn-scanned) { border-color: var(--accent); }
  :global(.eng-rl-fn-block.eng-rl-fn-scanned) .eng-rl-fn-name { color: var(--accent); }
  :global(.eng-rl-fn-block.eng-rl-fn-validated) { border-color: #22c55e; }
  :global(.eng-rl-fn-block.eng-rl-fn-validated) .eng-rl-fn-name { color: #22c55e; }
  :global(.eng-rl-fn-block.eng-rl-fn-vuln) { border-color: #ef4444; box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); background: oklch(0.16 0.02 25); }
  :global([data-theme="light"] .eng-rl-fn-block.eng-rl-fn-vuln) { background: oklch(0.95 0.02 25); }
  :global(.eng-rl-fn-block.eng-rl-fn-vuln) .eng-rl-fn-name { color: #ef4444; }
  :global(.eng-rl-fn-block.eng-rl-fn-targeted) { border-color: var(--accent); box-shadow: 0 0 16px oklch(0.72 0.12 192 / 0.25); }
  .eng-rl-agent { position: absolute; width: 10px; height: 10px; background: var(--accent); z-index: 5; opacity: 0; transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s; box-shadow: 0 0 10px oklch(0.72 0.12 192 / 0.6); }
  :global(.eng-rl-agent.eng-rl-active) { opacity: 1; }
  :global(.eng-rl-agent.eng-rl-exploit) { background: #ef4444; box-shadow: 0 0 14px rgba(239, 68, 68, 0.7); }
  .eng-rl-log-strip { display: flex; align-items: center; gap: 16px; padding: 8px 16px; background: oklch(0.12 0.005 260); border-top: 1px solid oklch(0.22 0 0); font-family: var(--font-mono); font-size: 0.625rem; min-height: 36px; overflow: hidden; }
  :global([data-theme="light"]) .eng-rl-log-strip { background: oklch(0.95 0 0); border-color: oklch(0.85 0 0); }
  .eng-rl-log-entries { flex: 1; overflow: hidden; white-space: nowrap; }
  :global(.eng-rl-log-entry) { display: inline; color: var(--fg-dim); opacity: 0; transition: opacity 0.3s; }
  :global(.eng-rl-log-entry.eng-rl-log-visible) { opacity: 1; }
  :global(.eng-rl-log-ts) { color: var(--fg-dim); margin-right: 6px; }
  :global(.eng-rl-log-text) { color: var(--fg-muted); }
  :global(.eng-rl-log-crit) { color: #ef4444; font-weight: 600; }
  :global(.eng-rl-log-ok) { color: #22c55e; }
  :global(.eng-rl-log-w) { color: var(--fg); font-weight: 500; }
  .eng-rl-reward-inline { display: flex; align-items: center; gap: 8px; flex-shrink: 0; font-family: var(--font-mono); font-size: 0.625rem; }
  .eng-rl-reward-label { color: var(--fg-dim); }
  .eng-rl-reward-bar { width: 80px; height: 4px; background: oklch(0.22 0 0); position: relative; overflow: hidden; }
  .eng-rl-reward-fill { height: 100%; width: 0%; background: var(--accent); transition: width 0.8s ease, background 0.3s; }
  :global(.eng-rl-reward-fill.eng-rl-reward-high) { background: #22c55e; }
  .eng-rl-reward-val { color: var(--accent); font-weight: 700; font-size: 0.6875rem; font-variant-numeric: tabular-nums; transition: color 0.3s; min-width: 60px; text-align: right; }
  :global(.eng-rl-reward-val.eng-rl-reward-high) { color: #22c55e; }
  .eng-rl-pipeline { display: flex; align-items: center; justify-content: center; gap: 0; padding: 16px 20px 12px; border-bottom: 1px solid oklch(0.22 0 0); position: relative; z-index: 6; }
  :global([data-theme="light"]) .eng-rl-pipeline { border-color: oklch(0.85 0 0); }
  .eng-rl-stage { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 10px; border: 1px solid var(--border-subtle); background: oklch(0.14 0.005 260); transition: border-color 0.4s, background 0.4s, box-shadow 0.4s; min-width: 72px; }
  :global([data-theme="light"]) .eng-rl-stage { background: oklch(0.96 0 0); }
  :global(.eng-rl-stage.eng-rl-stage-active) { border-color: var(--accent); background: oklch(0.16 0.02 192); box-shadow: 0 0 12px oklch(0.72 0.12 192 / 0.2); }
  :global([data-theme="light"] .eng-rl-stage.eng-rl-stage-active) { background: oklch(0.94 0.03 192); }
  :global(.eng-rl-stage.eng-rl-stage-done) { border-color: #22c55e; opacity: 0.7; }
  :global(.eng-rl-stage.eng-rl-stage-pending) { border-color: #fbbf24; background: oklch(0.16 0.02 85); box-shadow: 0 0 12px rgba(251, 191, 36, 0.2); animation: eng-rl-pending-pulse 1.5s ease-in-out infinite; }
  :global(.eng-rl-stage.eng-rl-stage-pending) .eng-rl-stage-icon { color: #fbbf24; }
  :global(.eng-rl-stage.eng-rl-stage-pending) .eng-rl-stage-label { color: #fbbf24; }
  @keyframes eng-rl-pending-pulse { 0%, 100% { box-shadow: 0 0 8px rgba(251, 191, 36, 0.15); } 50% { box-shadow: 0 0 16px rgba(251, 191, 36, 0.35); } }
  :global([data-theme="light"] .eng-rl-stage.eng-rl-stage-pending) { background: oklch(0.96 0.04 85); }
  :global(.eng-rl-stage.eng-rl-stage-exploit) { border-color: #ef4444; background: oklch(0.16 0.02 25); box-shadow: 0 0 12px rgba(239, 68, 68, 0.2); }
  .eng-rl-stage-icon { font-size: 0.875rem; color: var(--fg-dim); transition: color 0.4s; }
  :global(.eng-rl-stage.eng-rl-stage-active) .eng-rl-stage-icon { color: var(--accent); }
  :global(.eng-rl-stage.eng-rl-stage-done) .eng-rl-stage-icon { color: #22c55e; }
  :global(.eng-rl-stage.eng-rl-stage-exploit) .eng-rl-stage-icon { color: #ef4444; }
  .eng-rl-stage-label { font-family: var(--font-mono); font-size: 0.5625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--fg-dim); transition: color 0.4s; }
  :global(.eng-rl-stage.eng-rl-stage-active) .eng-rl-stage-label { color: var(--fg); }
  .eng-rl-stage-arrow { font-family: var(--font-mono); font-size: 0.75rem; color: var(--fg-dim); padding: 0 2px; opacity: 0.4; }
  .eng-rl-space-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 10; pointer-events: none; opacity: 0; transition: opacity 0.6s ease; }
  :global(.eng-rl-space-canvas.eng-rl-space-visible) { opacity: 1; }
  .eng-rl-phase { position: absolute; top: 12px; left: 12px; z-index: 8; }
  .eng-rl-phase-label { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; padding: 4px 12px; border: 1px solid var(--border); background: oklch(0.14 0.005 260 / 0.9); backdrop-filter: blur(8px); color: var(--fg-muted); display: inline-block; opacity: 0; transition: opacity 0.4s, color 0.3s, border-color 0.3s; }
  :global([data-theme="light"]) .eng-rl-phase-label { background: oklch(0.97 0 0 / 0.9); }
  :global(.eng-rl-phase-label.eng-rl-phase-active) { opacity: 1; }
  :global(.eng-rl-phase-label.eng-rl-phase-explore) { color: var(--accent); border-color: var(--accent); }
  :global(.eng-rl-phase-label.eng-rl-phase-exploit) { color: #ef4444; border-color: #ef4444; }
  .eng-rl-stage-nav { display: flex; gap: 0; border-top: 1px solid oklch(0.22 0 0); }
  :global(.eng-rl-stage-btn) { flex: 1; padding: 10px 8px; background: oklch(0.14 0.005 260); border: none; border-right: 1px solid oklch(0.22 0 0); color: var(--fg-dim, #666); font-family: var(--font-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  :global(.eng-rl-stage-btn:last-child) { border-right: none; }
  :global(.eng-rl-stage-btn:hover) { background: oklch(0.18 0.005 260); color: var(--fg, #e0e0e0); }
  :global(.eng-rl-stage-btn.eng-rl-stage-btn-active) { background: rgba(0, 229, 199, 0.08); color: var(--accent, #00e5c7); box-shadow: inset 0 -2px 0 var(--accent, #00e5c7); }
  :global(.eng-rl-stage-btn.eng-rl-stage-btn-done) { color: var(--fg-muted, #999); }
  :global(.eng-rl-stage-btn.eng-rl-stage-btn-done .eng-rl-stage-btn-num) { border-color: var(--accent, #00e5c7); color: var(--accent, #00e5c7); opacity: 0.5; }
  .eng-rl-stage-btn-num { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border: 1px solid currentColor; font-size: 0.55rem; font-weight: 700; opacity: 0.7; }
  :global([data-theme="light"]) .eng-rl-stage-nav { border-top-color: #ddd; }
  :global([data-theme="light"]) :global(.eng-rl-stage-btn) { background: #f5f5f5; border-right-color: #ddd; }
  :global([data-theme="light"]) :global(.eng-rl-stage-btn:hover) { background: #eee; }
  :global(.eng-rl-stage-explainer) { position: absolute; inset: 0; z-index: 40; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.88); backdrop-filter: blur(8px); opacity: 1; }
  :global(.eng-rl-stage-explainer .eng-rl-explainer-box) { opacity: 0; transform: translateY(8px); transition: opacity 0.35s ease, transform 0.35s ease; }
  :global(.eng-rl-stage-explainer.eng-rl-explainer-visible .eng-rl-explainer-box) { opacity: 1; transform: translateY(0); }
  :global(.eng-rl-explainer-box) { max-width: 460px; width: 85%; padding: 28px 32px; text-align: center; }
  :global(.eng-rl-explainer-num) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent, #00e5c7); margin-bottom: 8px; }
  :global(.eng-rl-explainer-title) { font-family: var(--font-display, 'Inter', sans-serif); font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 12px; }
  :global(.eng-rl-explainer-desc) { font-family: var(--font-body, 'Manrope', sans-serif); font-size: 0.85rem; line-height: 1.6; color: #ccc; margin-bottom: 10px; }
  :global(.eng-rl-explainer-detail) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.7rem; color: var(--accent, #00e5c7); opacity: 0.8; line-height: 1.5; }
  :global([data-theme="light"] .eng-rl-stage-explainer) { background: rgba(255,255,255,0.94); }
  :global([data-theme="light"] .eng-rl-explainer-title) { color: #111; }
  :global([data-theme="light"] .eng-rl-explainer-desc) { color: #444; }
  :global(.eng-rl-exploit-overlay) { position: absolute; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,0.85); backdrop-filter: blur(6px); opacity: 0; transition: opacity 0.4s ease; }
  :global(.eng-rl-exploit-overlay.eng-rl-exploit-visible) { opacity: 1; }
  :global(.eng-rl-exploit-box) { border: 1px solid #ef4444; background: #0a0a0a; padding: 32px 36px; max-width: 680px; width: 92%; max-height: 95%; min-height: 380px; overflow-y: auto; display: flex; flex-direction: column; justify-content: center; }
  :global(.eng-rl-exploit-header) { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  :global(.eng-rl-exploit-icon) { color: #ef4444; font-size: 1.4rem; }
  :global(.eng-rl-exploit-title) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 1.1rem; font-weight: 700; color: #ef4444; letter-spacing: 0.08em; }
  :global(.eng-rl-exploit-subtitle) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.7rem; color: #999; margin-bottom: 16px; letter-spacing: 0.02em; }
  :global(.eng-rl-exploit-code) { background: #111; border: 1px solid #222; padding: 16px; margin-bottom: 16px; overflow-x: auto; }
  :global(.eng-rl-exploit-code pre) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.75rem; line-height: 1.6; color: #e0e0e0; margin: 0; white-space: pre; }
  :global(.eng-rl-code-comment) { color: #555; }
  :global(.eng-rl-code-kw) { color: #c792ea; }
  :global(.eng-rl-code-fn) { color: #82aaff; }
  :global(.eng-rl-code-num) { color: #f78c6c; }
  :global(.eng-rl-exploit-snr) { margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px; }
  :global(.eng-rl-exploit-snr-row) { display: flex; align-items: center; gap: 10px; }
  :global(.eng-rl-exploit-snr-label) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.06em; color: #888; width: 100px; flex-shrink: 0; text-align: right; }
  :global(.eng-rl-exploit-snr-bar) { flex: 1; height: 6px; background: #1a1a1a; position: relative; overflow: hidden; }
  :global(.eng-rl-snr-fill) { display: block; height: 100%; transition: width 1s ease; }
  :global(.eng-rl-snr-tm .eng-rl-snr-fill) { background: var(--accent, #00e5c7); width: 8% !important; }
  :global(.eng-rl-snr-static .eng-rl-snr-fill) { background: #ef4444; width: 100% !important; }
  :global(.eng-rl-exploit-snr-val) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.6rem; white-space: nowrap; width: 180px; flex-shrink: 0; }
  :global(.eng-rl-snr-good) { color: var(--accent, #00e5c7); }
  :global(.eng-rl-snr-bad) { color: #ef4444; }
  :global(.eng-rl-exploit-footer) { display: flex; gap: 8px; flex-wrap: wrap; }
  :global(.eng-rl-exploit-tag) { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 10px; border: 1px solid #333; color: var(--accent, #00e5c7); }
  :global([data-theme="light"] .eng-rl-exploit-overlay) { background: rgba(255,255,255,0.88); }
  :global([data-theme="light"] .eng-rl-exploit-box) { background: #fff; border-color: #ef4444; }
  :global([data-theme="light"] .eng-rl-exploit-code) { background: #f5f5f5; border-color: #ddd; }
  :global([data-theme="light"] .eng-rl-exploit-code pre) { color: #222; }
  .eng-infra-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--gap); }
  .eng-infra-card { padding: 28px 20px; background: var(--card-bg); border: 1px solid var(--border-subtle); text-align: center; }
  .eng-infra-icon { font-size: 1.75rem; margin-bottom: 14px; display: block; }
  .eng-infra-card h3 { font-family: var(--font-display); font-size: 0.9375rem; font-weight: 700; color: var(--fg); margin-bottom: 8px; }
  .eng-infra-card p { font-size: 0.875rem; color: var(--fg-muted); line-height: 1.55; }
  .eng-products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gap); }
  .eng-product-card { padding: 32px 24px; background: var(--card-bg); border: 1px solid var(--border-subtle); transition: border-color var(--transition), transform var(--transition); }
  .eng-product-card:hover { border-color: var(--border); transform: translateY(-2px); }
  .eng-product-label { font-family: var(--font-mono); font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 10px; }
  .eng-product-card h3 { font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; color: var(--fg); margin-bottom: 10px; }
  .eng-product-card p { font-size: 0.875rem; color: var(--fg-muted); line-height: 1.6; }
  .eng-cta { padding: var(--section-py) 0; border-top: 2px solid var(--accent); text-align: center; position: relative; }
  .eng-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, oklch(0.72 0.12 192 / 0.06) 0%, transparent 70%); pointer-events: none; }
  .eng-cta-title { font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 700; line-height: 1.12; letter-spacing: -0.025em; margin-bottom: 1rem; color: var(--fg); }
  .eng-cta-sub { color: var(--fg-muted); font-size: 0.9375rem; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; }
  @media (max-width: 900px) { .eng-llm-grid { grid-template-columns: 1fr; } .eng-infra-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .eng-products-grid { grid-template-columns: 1fr; } .eng-rl-log-strip { flex-direction: column; gap: 6px; padding: 6px 12px; } .eng-rl-arena { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(3, 1fr); gap: 10px; padding: 36px 16px 16px; min-height: 320px; } .eng-rl-pipeline { flex-wrap: wrap; gap: 4px; padding: 10px 12px; } .eng-rl-stage { min-width: 56px; padding: 4px 6px; } .eng-rl-stage-label { font-size: 0.5rem; } .eng-rl-stage-arrow { font-size: 0.625rem; padding: 0 1px; } .eng-rl-fn-name { font-size: 0.6875rem; } :global(.eng-rl-stage-btn) { font-size: 0.5rem; padding: 8px 4px; gap: 4px; } .eng-rl-stage-btn-num { width: 14px; height: 14px; font-size: 0.5rem; } }
  @media (max-width: 480px) { .eng-infra-grid { grid-template-columns: 1fr; } .eng-pipe-stage { padding-left: 48px; } .eng-pipe-line, .eng-pipe-line-fill { left: 16px; } .eng-pipe-node { left: 4px; width: 24px; height: 24px; } .eng-llm-compare { grid-template-columns: 1fr; gap: 12px; } .eng-llm-compare-arrow { transform: rotate(90deg); } }
</style>
