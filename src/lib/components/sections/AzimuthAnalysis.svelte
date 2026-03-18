<script lang="ts">
  import { onMount } from 'svelte';

  let azTimeouts: ReturnType<typeof setTimeout>[] = [];
  let azTimerRef: ReturnType<typeof setInterval> | null = null;
  let azElapsedMs = 0;
  let azRunning = false;

  function az(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  function azAt(fn: () => void, ms: number) {
    azTimeouts.push(setTimeout(fn, ms));
  }

  function azTypeInto(el: HTMLElement | null, text: string, startMs: number, cb?: () => void) {
    if (!el) return;
    let i = 0;
    function next() {
      if (i < text.length) {
        el!.textContent += text[i++];
        azAt(next, 35 + Math.random() * 25);
      } else if (cb) cb();
    }
    azAt(next, startMs);
  }

  function azAddLog(text: string, dot?: string, ts?: string) {
    const s = az('azActScroll');
    if (!s) return;
    const d = document.createElement('div');
    d.className = 'az-act-line';
    // All innerHTML content here is hardcoded strings with no user input
    const dotDiv = document.createElement('div');
    dotDiv.className = 'az-act-dot ' + (dot || '');
    const textDiv = document.createElement('div');
    textDiv.className = 'az-act-text';
    textDiv.innerHTML = text; // Safe: only hardcoded animation strings, no user input
    d.appendChild(dotDiv);
    d.appendChild(textDiv);
    if (ts) {
      const tsDiv = document.createElement('div');
      tsDiv.className = 'az-act-ts';
      tsDiv.textContent = ts;
      d.appendChild(tsDiv);
    }
    s.appendChild(d);
    const lines = s.querySelectorAll('.az-act-line');
    if (lines.length > 14) lines[lines.length - 15].classList.add('az-old');
    requestAnimationFrame(() => { d.classList.add('az-visible'); });
  }

  function azSetStage(idx: number, pct: number) {
    for (let i = 0; i < 5; i++) {
      const stage = az('azPs' + i);
      const label = az('azPl' + i);
      if (!stage || !label) continue;
      const bar = stage.querySelector('.az-bar') as HTMLElement;
      if (!bar) continue;
      if (i < idx) {
        stage.classList.add('az-done');
        stage.classList.remove('az-active');
        bar.style.width = '100%';
        label.classList.add('az-done');
        label.classList.remove('az-active');
      } else if (i === idx) {
        stage.classList.add('az-active');
        stage.classList.remove('az-done');
        bar.style.width = (pct || 50) + '%';
        label.classList.add('az-active');
        label.classList.remove('az-done');
      } else {
        stage.classList.remove('az-active', 'az-done');
        bar.style.width = '0%';
        label.classList.remove('az-active', 'az-done');
      }
    }
  }

  function azStartTimer() {
    azElapsedMs = 0;
    azTimerRef = setInterval(() => {
      azElapsedMs += 100;
      const s = (azElapsedMs / 1000).toFixed(1);
      const el = az('azElapsed');
      if (el) {
        el.textContent = '';
        const valSpan = document.createElement('span');
        valSpan.className = 'az-elapsed-val';
        valSpan.textContent = s + 's';
        el.appendChild(valSpan);
        el.appendChild(document.createTextNode(' elapsed'));
      }
    }, 100);
  }

  function azStopTimer() {
    if (azTimerRef) clearInterval(azTimerRef);
  }

  function azCounter(el: HTMLElement, target: number, dur: number = 500) {
    const t0 = performance.now();
    (function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function azRun() {
    if (!azRunning) return;

    // Reset
    azTimeouts.forEach(clearTimeout);
    azTimeouts = [];
    azStopTimer();

    const topBar = az('azTopBar');
    if (topBar) topBar.style.width = '0%';

    ['azPhase1', 'azPhase2', 'azPhase3'].forEach((id) => {
      const el = az(id);
      if (el) el.classList.remove('az-visible');
    });

    const inputText = az('azInputText');
    const inputCursor = az('azInputCursor');
    const repoInfo = az('azRepoInfo');
    const analyzeBtn = az('azAnalyzeBtn');
    const inputField = az('azInputField');
    const actScroll = az('azActScroll');
    const agentsCard = az('azAgentsCard');
    const statsMini = az('azStatsMini');
    const statusChip = az('azStatusChip');

    if (inputText) inputText.textContent = '';
    if (inputCursor) (inputCursor as HTMLElement).style.display = 'inline-block';
    if (repoInfo) repoInfo.classList.remove('az-visible');
    if (analyzeBtn) analyzeBtn.classList.remove('az-visible', 'az-clicked');
    if (inputField) inputField.classList.remove('az-focused');
    if (actScroll) actScroll.textContent = '';
    if (agentsCard) agentsCard.classList.remove('az-visible');
    if (statsMini) statsMini.classList.remove('az-visible');

    for (let i = 0; i < 3; i++) {
      const ag = az('azAg' + i);
      const agd = az('azAgd' + i);
      if (ag) ag.classList.remove('az-visible');
      if (agd) agd.className = 'az-agent-dot az-agent-dot-active';
    }
    for (let j = 0; j < 5; j++) {
      const ps = az('azPs' + j);
      const pl = az('azPl' + j);
      if (ps) {
        ps.classList.remove('az-active', 'az-done');
        const bar = ps.querySelector('.az-bar') as HTMLElement;
        if (bar) bar.style.width = '0%';
      }
      if (pl) pl.classList.remove('az-active', 'az-done');
    }
    if (statusChip) {
      statusChip.className = 'az-status-chip az-status-running';
      statusChip.textContent = '● Analyzing';
    }
    for (let k = 0; k < 4; k++) {
      const rs = az('azRs' + k);
      if (rs) rs.classList.remove('az-visible');
    }
    const signalRow = az('azSignalRow');
    const findingsCard = az('azFindingsCard');
    const fr0 = az('azFr0');
    const fr1 = az('azFr1');
    if (signalRow) signalRow.classList.remove('az-visible');
    if (findingsCard) findingsCard.classList.remove('az-visible');
    if (fr0) fr0.classList.remove('az-visible');
    if (fr1) fr1.classList.remove('az-visible');

    const mc = az('azMiniContracts');
    const mi = az('azMiniInvest');
    const mco = az('azMiniConfirm');
    const mf = az('azMiniFP');
    if (mc) mc.textContent = '0/4';
    if (mi) mi.textContent = '0';
    if (mco) mco.textContent = '0';
    if (mf) mf.textContent = '0';

    // Phase 1: Input
    azAt(() => { const p = az('azPhase1'); if (p) p.classList.add('az-visible'); }, 200);
    azAt(() => { if (inputField) inputField.classList.add('az-focused'); }, 600);

    azTypeInto(az('azInputText'), 'testmachine-ai/PrimeVault', 800, () => {
      if (inputCursor) (inputCursor as HTMLElement).style.display = 'none';
      azAt(() => { if (repoInfo) repoInfo.classList.add('az-visible'); }, 150);
      azAt(() => { if (analyzeBtn) analyzeBtn.classList.add('az-visible'); }, 400);
    });

    azAt(() => {
      if (analyzeBtn) analyzeBtn.classList.add('az-clicked');
      azAt(() => { const p = az('azPhase1'); if (p) p.classList.remove('az-visible'); }, 300);
    }, 3200);

    // Phase 2: Analysis
    const P2 = 3800;
    azAt(() => {
      const p = az('azPhase2'); if (p) p.classList.add('az-visible');
      azStartTimer();
      if (topBar) topBar.style.width = '5%';
    }, P2);

    // Safe: all azAddLog text arguments are hardcoded strings containing only display markup (spans with class names), no user input
    azAt(() => { azSetStage(0, 50); azAddLog('Cloning <span class="az-w">testmachine-ai/PrimeVault</span> at <span class="az-d">main</span>', 'az-dg'); if (topBar) topBar.style.width = '8%'; }, P2 + 400);
    azAt(() => { azSetStage(0, 100); azAddLog('Repository cloned <span class="az-d">\u00b7 4 contracts</span>', 'az-dg', '0.3s'); if (topBar) topBar.style.width = '12%'; }, P2 + 900);
    azAt(() => { azSetStage(1, 30); azAddLog('Installing dependencies...', ''); if (topBar) topBar.style.width = '16%'; }, P2 + 1200);
    azAt(() => { azSetStage(1, 70); azAddLog('Compiling with <span class="az-w">solc 0.8.19</span>', ''); if (topBar) topBar.style.width = '22%'; }, P2 + 1600);
    azAt(() => { azSetStage(1, 100); azAddLog('Compilation successful <span class="az-gr">\u2713</span>', 'az-dg', '1.1s'); if (topBar) topBar.style.width = '28%'; }, P2 + 2000);
    azAt(() => { azSetStage(2, 20); azAddLog('Exploring codebase...', 'az-db'); if (topBar) topBar.style.width = '32%'; }, P2 + 2400);
    azAt(() => { azSetStage(2, 50); azAddLog('Found <span class="az-w">PrimeVault.sol</span> <span class="az-d">\u00b7 Core Protocol Logic</span>', ''); if (mc) mc.textContent = '1/4'; if (topBar) topBar.style.width = '36%'; }, P2 + 2800);
    azAt(() => { azAddLog('Found <span class="az-w">PrimeToken.sol</span> <span class="az-d">\u00b7 Token Handling</span>', ''); if (mc) mc.textContent = '2/4'; if (topBar) topBar.style.width = '40%'; }, P2 + 3100);
    azAt(() => { azSetStage(2, 80); azAddLog('Mapping protocol intent <span class="az-d">\u00b7 staking vault</span>', 'az-db'); if (mc) mc.textContent = '4/4'; if (topBar) topBar.style.width = '46%'; }, P2 + 3400);
    azAt(() => { azSetStage(2, 100); azAddLog('Identified <span class="az-w">11 invariants</span> across <span class="az-w">4 categories</span>', 'az-dg', '2.8s'); if (topBar) topBar.style.width = '52%'; }, P2 + 3800);

    // Agents
    azAt(() => {
      azSetStage(3, 10);
      azAddLog('Launching analysis agents...', 'az-da');
      if (agentsCard) agentsCard.classList.add('az-visible');
      if (statsMini) statsMini.classList.add('az-visible');
      if (topBar) topBar.style.width = '56%';
    }, P2 + 4200);
    azAt(() => { const a = az('azAg0'); if (a) a.classList.add('az-visible'); }, P2 + 4400);
    azAt(() => { const a = az('azAg1'); if (a) a.classList.add('az-visible'); }, P2 + 4600);
    azAt(() => { const a = az('azAg2'); if (a) a.classList.add('az-visible'); }, P2 + 4800);

    azAt(() => { azSetStage(3, 30); azAddLog('Investigating <span class="az-w">withdraw()</span> <span class="az-d">\u00b7 state mutation</span>', 'az-da'); if (mi) mi.textContent = '1'; if (topBar) topBar.style.width = '62%'; }, P2 + 5200);
    azAt(() => { azSetStage(3, 50); azAddLog('<span class="az-gr">\u26a1 Critical:</span> Reentrancy via state-mutation-before-transfer', 'az-dr'); if (mco) mco.textContent = '1'; if (topBar) topBar.style.width = '68%'; }, P2 + 6000);
    azAt(() => { azAddLog('Generating proof of concept...', ''); if (topBar) topBar.style.width = '72%'; }, P2 + 6500);
    azAt(() => { azSetStage(3, 70); azAddLog('PoC confirmed: <span class="az-w">10x drain</span> in simulated EVM', 'az-dg', '6.2s'); if (topBar) topBar.style.width = '76%'; }, P2 + 7000);
    azAt(() => { azSetStage(3, 85); azAddLog('Investigating <span class="az-w">pendingReward()</span> <span class="az-d">\u00b7 overflow</span>', 'az-da'); if (mi) mi.textContent = '2'; if (topBar) topBar.style.width = '80%'; }, P2 + 7500);
    azAt(() => { azSetStage(3, 100); azAddLog('Overflow confirmed <span class="az-d">\u00b7 Low risk \u00b7 DoS only</span>', 'az-dg'); if (mco) mco.textContent = '2'; if (topBar) topBar.style.width = '86%'; }, P2 + 8000);

    // Agents finish
    azAt(() => { const d = az('azAgd0'); if (d) d.className = 'az-agent-dot az-agent-done'; }, P2 + 7200);
    azAt(() => { const d = az('azAgd1'); if (d) d.className = 'az-agent-dot az-agent-done'; }, P2 + 8200);
    azAt(() => { const d = az('azAgd2'); if (d) d.className = 'az-agent-dot az-agent-done'; }, P2 + 8500);

    // Report
    azAt(() => { azSetStage(4, 50); azAddLog('Consolidating findings...', 'az-db'); if (topBar) topBar.style.width = '92%'; }, P2 + 8800);
    azAt(() => { azSetStage(4, 100); azAddLog('<span class="az-w">2</span> findings \u00b7 <span class="az-w">0</span> false positives \u00b7 <span class="az-gr">100% signal</span>', 'az-dg', '12.6m'); if (topBar) topBar.style.width = '100%'; }, P2 + 9400);

    // Phase 3: Results
    azAt(() => {
      azStopTimer();
      const p = az('azPhase2'); if (p) p.classList.remove('az-visible');
    }, P2 + 10200);
    azAt(() => {
      const p = az('azPhase3'); if (p) p.classList.add('az-visible');
    }, P2 + 10600);

    azAt(() => { const r = az('azRs0'); if (r) r.classList.add('az-visible'); const v = az('azRvInvest'); if (v) azCounter(v, 2, 400); }, P2 + 10900);
    azAt(() => { const r = az('azRs1'); if (r) r.classList.add('az-visible'); const v = az('azRvConfirm'); if (v) azCounter(v, 2, 400); }, P2 + 11100);
    azAt(() => { const r = az('azRs2'); if (r) r.classList.add('az-visible'); const v = az('azRvFP'); if (v) v.textContent = '0'; }, P2 + 11300);
    azAt(() => { const r = az('azRs3'); if (r) r.classList.add('az-visible'); }, P2 + 11500);

    azAt(() => { if (signalRow) signalRow.classList.add('az-visible'); }, P2 + 12000);
    azAt(() => { if (findingsCard) findingsCard.classList.add('az-visible'); }, P2 + 12500);
    azAt(() => { if (fr0) fr0.classList.add('az-visible'); }, P2 + 12800);
    azAt(() => { if (fr1) fr1.classList.add('az-visible'); }, P2 + 13100);

    // Loop
    azAt(() => {
      const p = az('azPhase3'); if (p) p.classList.remove('az-visible');
      azAt(azRun, 600);
    }, P2 + 18000);
  }

  onMount(() => {
    const azSection = document.getElementById('azimuth');
    if (!azSection) return;

    const azObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !azRunning) {
            azTimeouts.forEach(clearTimeout);
            azTimeouts = [];
            if (azTimerRef) clearInterval(azTimerRef);
            azRunning = true;
            azRun();
          } else if (!entry.isIntersecting && azRunning) {
            azRunning = false;
            azTimeouts.forEach(clearTimeout);
            azTimeouts = [];
            if (azTimerRef) clearInterval(azTimerRef);
          }
        });
      },
      { threshold: 0.15 }
    );
    azObserver.observe(azSection);

    return () => {
      azRunning = false;
      azTimeouts.forEach(clearTimeout);
      azTimeouts = [];
      if (azTimerRef) clearInterval(azTimerRef);
      azObserver.disconnect();
    };
  });
</script>

<section class="azimuth" id="azimuth">
  <div class="container">
    <div class="azimuth-header" data-animate>
      <span class="section-label">Automated Security Analysis</span>
      <h2 class="section-title">Azimuth</h2>
      <p class="azimuth-desc">Azimuth deploys reinforcement learning agents against your smart contracts. Real transactions. Forked mainnet. Dynamic execution, not static analysis. They probe every function, chain multi-step attacks, and prove exploits end-to-end. If Azimuth reports it, it was actually exploited. Zero false positives — in minutes, not weeks.</p>
    </div>
    <div class="az-frame-wrap" data-animate>
      <div class="az-browser-frame">
        <div class="az-browser-titlebar">
          <div class="az-browser-dot az-dot-red"></div>
          <div class="az-browser-dot az-dot-yellow"></div>
          <div class="az-browser-dot az-dot-green"></div>
          <div class="az-browser-url">
            <span class="az-protocol">https://</span><span class="az-domain">app.testmachine.ai</span><span class="az-path">/azimuth</span>
          </div>
        </div>
        <div class="az-top-progress"><div class="az-top-progress-fill" id="azTopBar"></div></div>
        <div class="az-app-viewport">
          <div class="az-sidebar">
            <div class="az-sidebar-logo">
              <img src="/assets/logo-icon-white.png" alt="" style="width:18px;height:18px;filter:brightness(0) invert(70%) sepia(40%) saturate(500%) hue-rotate(130deg) brightness(1.05);">
              TestMachine
            </div>
            <div class="az-sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Dashboard
            </div>
            <div class="az-sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Token Explorer
            </div>
            <div class="az-sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              Webhooks
            </div>
            <div class="az-sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
              API Keys
            </div>
            <div class="az-sidebar-item az-sidebar-active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Azimuth
            </div>
          </div>
          <div class="az-main-content">
            <!-- Phase 1: New Analysis -->
            <div class="az-phase" id="azPhase1">
              <div class="az-page-title">New Analysis</div>
              <div class="az-input-card">
                <div class="az-input-label">GitHub Repository</div>
                <div class="az-input-field" id="azInputField">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span class="az-input-text" id="azInputText"></span><span class="az-cursor" id="azInputCursor"></span>
                </div>
                <div class="az-repo-info" id="azRepoInfo">
                  <span class="az-tag">Solidity</span>
                  <span>4 contracts</span>
                  <span>1,247 lines</span>
                  <span class="az-tag">MIT</span>
                </div>
                <button class="az-analyze-btn" id="azAnalyzeBtn">Run Analysis</button>
              </div>
            </div>
            <!-- Phase 2: Analysis Running -->
            <div class="az-phase" id="azPhase2">
              <div class="az-analysis-header">
                <div class="az-analysis-left">
                  <div class="az-analysis-title">testmachine-ai/PrimeVault</div>
                  <div class="az-status-chip az-status-running" id="azStatusChip">● Analyzing</div>
                </div>
                <div class="az-elapsed-time" id="azElapsed"></div>
              </div>
              <div class="az-pipeline-row" id="azPipelineRow">
                <div class="az-p-stage" id="azPs0"><div class="az-bar"></div></div>
                <div class="az-p-stage" id="azPs1"><div class="az-bar"></div></div>
                <div class="az-p-stage" id="azPs2"><div class="az-bar"></div></div>
                <div class="az-p-stage" id="azPs3"><div class="az-bar"></div></div>
                <div class="az-p-stage" id="azPs4"><div class="az-bar"></div></div>
              </div>
              <div class="az-pipeline-labels">
                <div class="az-p-label" id="azPl0">Clone</div>
                <div class="az-p-label" id="azPl1">Compile</div>
                <div class="az-p-label" id="azPl2">Explore</div>
                <div class="az-p-label" id="azPl3">Analyze</div>
                <div class="az-p-label" id="azPl4">Report</div>
              </div>
              <div class="az-analysis-body">
                <div class="az-activity-panel">
                  <div class="az-activity-panel-header">Activity Log</div>
                  <div class="az-activity-scroll" id="azActScroll"></div>
                </div>
                <div class="az-agents-side">
                  <div class="az-agents-card" id="azAgentsCard">
                    <div class="az-agents-card-title">Agents</div>
                    <div class="az-agent-item" id="azAg0">
                      <div class="az-agent-dot az-agent-dot-active" id="azAgd0"></div>
                      <span class="az-agent-name">explorer</span>
                    </div>
                    <div class="az-agent-item" id="azAg1">
                      <div class="az-agent-dot az-agent-dot-active" id="azAgd1"></div>
                      <span class="az-agent-name">proposer</span>
                    </div>
                    <div class="az-agent-item" id="azAg2">
                      <div class="az-agent-dot az-agent-dot-active" id="azAgd2"></div>
                      <span class="az-agent-name">verifier</span>
                    </div>
                  </div>
                  <div class="az-stats-mini" id="azStatsMini">
                    <div class="az-stats-mini-title">Progress</div>
                    <div class="az-stats-mini-row"><span class="az-sml">Contracts</span><span class="az-smv" id="azMiniContracts">0/4</span></div>
                    <div class="az-stats-mini-row"><span class="az-sml">Investigated</span><span class="az-smv" id="azMiniInvest">0</span></div>
                    <div class="az-stats-mini-row"><span class="az-sml">Confirmed</span><span class="az-smv az-smv-gr" id="azMiniConfirm">0</span></div>
                    <div class="az-stats-mini-row"><span class="az-sml">False Pos.</span><span class="az-smv az-smv-gr" id="azMiniFP">0</span></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Phase 3: Results -->
            <div class="az-phase" id="azPhase3">
              <div class="az-analysis-header" style="margin-bottom:20px">
                <div class="az-analysis-left">
                  <div class="az-analysis-title">Security Analysis Report</div>
                  <div class="az-status-chip az-status-completed">✓ Completed</div>
                </div>
                <div class="az-elapsed-time"><span class="az-elapsed-val">12.6m</span> total</div>
              </div>
              <div class="az-results-stats">
                <div class="az-r-stat" id="azRs0">
                  <div class="az-r-stat-label">Investigated</div>
                  <div class="az-r-stat-value az-rsv-white" id="azRvInvest">0</div>
                </div>
                <div class="az-r-stat" id="azRs1">
                  <div class="az-r-stat-label">Confirmed</div>
                  <div class="az-r-stat-value az-rsv-green" id="azRvConfirm">0</div>
                </div>
                <div class="az-r-stat" id="azRs2">
                  <div class="az-r-stat-label">False Positives</div>
                  <div class="az-r-stat-value az-rsv-emerald" id="azRvFP">0</div>
                </div>
                <div class="az-r-stat" id="azRs3">
                  <div class="az-r-stat-label">Analysis Time</div>
                  <div class="az-r-stat-value az-rsv-white">12.6<span class="az-unit">m</span></div>
                </div>
              </div>
              <div class="az-signal-row" id="azSignalRow">
                <div class="az-signal-badge"><span class="az-signal-dot"></span>100% signal · 0 false positives</div>
                <div class="az-cost-badge">4.8M tokens · <span class="az-cost-val">$0.05</span> total cost</div>
              </div>
              <div class="az-findings-card" id="azFindingsCard">
                <div class="az-findings-card-header">
                  Findings
                  <span class="az-sev-chip az-sev-crit">Critical 1</span>
                  <span class="az-sev-chip az-sev-low">Low 1</span>
                </div>
                <table class="az-f-table">
                  <thead>
                    <tr>
                      <th style="width:50%">Finding</th>
                      <th>Impact</th>
                      <th>Likelihood</th>
                      <th>Risk</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="az-data-row" id="azFr0">
                      <td>Reentrancy in withdraw() enables fund drainage</td>
                      <td><span class="az-badge az-badge-critical">Critical</span></td>
                      <td><span class="az-badge az-badge-high">High</span></td>
                      <td><span class="az-badge az-badge-critical">Critical</span></td>
                      <td><span class="az-confirmed">Confirmed</span></td>
                    </tr>
                    <tr class="az-data-row" id="azFr1">
                      <td>Arithmetic overflow in pendingReward calculation</td>
                      <td><span class="az-badge az-badge-medium">Medium</span></td>
                      <td><span class="az-badge az-badge-low">Low</span></td>
                      <td><span class="az-badge az-badge-low">Low</span></td>
                      <td><span class="az-confirmed">Confirmed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    color: var(--fg-muted);
    margin-bottom: 0.75rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.12;
    color: var(--fg);
    letter-spacing: -0.025em;
    margin-bottom: 1.5rem;
  }
  .azimuth-desc {
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: var(--fg-muted);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.75;
    text-align: left;
  }

  /* Frame */
  .az-frame-wrap {
    max-width: 1060px;
    margin: 0 auto;
  }
  .az-browser-frame {
    border-radius: 0;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.06),
      0 25px 60px rgba(0,0,0,0.5),
      0 0 120px rgba(34, 197, 94, 0.03);
    background: #111113;
  }
  :global([data-theme="light"]) .az-browser-frame {
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.15),
      0 25px 60px rgba(0,0,0,0.2),
      0 0 0 4px oklch(0.92 0 0);
    border: 1px solid oklch(0.75 0 0);
  }
  .az-browser-titlebar {
    height: 40px;
    background: #19191d;
    border-bottom: 1px solid #2e2e36;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 8px;
  }
  .az-browser-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3a3a44;
  }
  .az-dot-red { background: #ff5f57; }
  .az-dot-yellow { background: #febc2e; }
  .az-dot-green { background: #28c840; }
  .az-browser-url {
    flex: 1;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 11px;
    color: #5a5a66;
    background: #222228;
    border-radius: 0;
    padding: 4px 12px;
    margin: 0 40px;
  }
  .az-protocol { color: #5a5a66; }
  .az-domain { color: #8e8e9a; }
  .az-path { color: #c8c8d0; }

  /* Top progress bar */
  .az-top-progress {
    position: relative;
    height: 2px;
    background: #2e2e36;
    z-index: 5;
  }
  :global(.az-top-progress-fill) {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #059669, #22c55e);
    transition: width 0.4s ease;
  }

  /* App viewport */
  .az-app-viewport {
    height: 540px;
    position: relative;
    overflow: hidden;
    background: #111113;
  }

  /* Sidebar */
  .az-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background: #19191d;
    border-right: 1px solid #2e2e36;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 2;
  }
  .az-sidebar-logo {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    color: #e8e8ec;
    padding: 0 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .az-sidebar-item {
    font-family: var(--font-mono);
    font-size: 12px;
    color: #5a5a66;
    padding: 8px 10px;
    border-radius: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  .az-sidebar-active {
    color: #e8e8ec;
    background: #222228;
  }
  .az-sidebar-item :global(svg) { width: 14px; height: 14px; opacity: 0.5; }
  .az-sidebar-active :global(svg) { opacity: 0.9; }

  /* Main content area */
  .az-main-content {
    position: absolute;
    top: 0;
    left: 200px;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  /* Phases */
  :global(.az-phase) {
    position: absolute;
    inset: 0;
    padding: 28px 32px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s;
  }
  :global(.az-phase.az-visible) {
    opacity: 1;
    pointer-events: auto;
  }
  .az-page-title {
    font-family: var(--font-mono);
    font-size: 20px;
    font-weight: 700;
    color: #e8e8ec;
    margin-bottom: 24px;
  }

  /* Phase 1: Repo input */
  .az-input-card {
    background: #19191d;
    border: 1px solid #2e2e36;
    border-radius: 0;
    padding: 24px;
    max-width: 560px;
  }
  .az-input-label {
    font-family: var(--font-mono);
    font-size: 11px;
    color: #5a5a66;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
  }
  :global(.az-input-field) {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #222228;
    border: 1px solid #2e2e36;
    border-radius: 0;
    padding: 10px 14px;
    font-family: var(--font-mono);
    font-size: 14px;
    color: #e8e8ec;
    margin-bottom: 16px;
    transition: border-color 0.2s;
  }
  :global(.az-input-field.az-focused) { border-color: #5a5a66; }
  :global(.az-input-field) :global(svg) { width: 16px; height: 16px; color: #5a5a66; flex-shrink: 0; }
  :global(.az-input-text) { color: #e8e8ec; font-family: var(--font-mono); font-size: 14px; }
  :global(.az-cursor) {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background: #e8e8ec;
    animation: azBlink 0.7s step-end infinite;
    vertical-align: text-bottom;
  }
  @keyframes azBlink { 50% { opacity: 0; } }

  :global(.az-repo-info) {
    display: flex;
    gap: 20px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: #5a5a66;
    margin-bottom: 20px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  :global(.az-repo-info.az-visible) { opacity: 1; }
  .az-tag {
    background: #2e2e36;
    padding: 2px 8px;
    border-radius: 0;
    color: #8e8e9a;
  }

  :global(.az-analyze-btn) {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
    background: #e8e8ec;
    color: #111113;
    border: none;
    border-radius: 0;
    padding: 9px 24px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.3s;
  }
  :global(.az-analyze-btn.az-visible) { opacity: 1; transform: translateY(0); }
  :global(.az-analyze-btn.az-clicked) {
    transform: scale(0.97);
    background: #22c55e;
    color: #fff;
  }

  /* Phase 2: Analysis running */
  .az-analysis-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .az-analysis-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .az-analysis-title {
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 600;
    color: #e8e8ec;
  }
  :global(.az-status-chip) {
    font-family: var(--font-mono);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 0;
    font-weight: 500;
  }
  :global(.az-status-running) {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
  }
  .az-status-completed {
    background: #14532d;
    color: #bbf7d0;
  }
  :global(.az-elapsed-time) {
    font-family: var(--font-mono);
    font-size: 13px;
    color: #5a5a66;
    font-variant-numeric: tabular-nums;
  }
  :global(.az-elapsed-val) { color: #c8c8d0; }

  /* Pipeline stages */
  .az-pipeline-row {
    display: flex;
    gap: 3px;
    margin-bottom: 8px;
  }
  :global(.az-p-stage) {
    flex: 1;
    height: 4px;
    background: #2e2e36;
    border-radius: 2px;
    overflow: hidden;
  }
  :global(.az-bar) {
    height: 100%;
    width: 0%;
    border-radius: 2px;
    background: #22c55e;
    transition: width 0.6s ease;
  }
  :global(.az-p-stage.az-done .az-bar) { width: 100%; background: #059669; }
  :global(.az-p-stage.az-active .az-bar) { background: #22c55e; }

  .az-pipeline-labels {
    display: flex;
    gap: 3px;
    margin-bottom: 20px;
  }
  :global(.az-p-label) {
    flex: 1;
    font-family: var(--font-mono);
    font-size: 10px;
    text-align: center;
    color: #5a5a66;
    opacity: 0.5;
    transition: all 0.2s;
  }
  :global(.az-p-label.az-active) { color: #22c55e; opacity: 1; }
  :global(.az-p-label.az-done) { color: #059669; opacity: 0.7; }

  /* Activity log + agents */
  .az-analysis-body {
    display: flex;
    gap: 20px;
    flex: 1;
    min-height: 0;
  }
  .az-activity-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
    position: relative;
    background: #19191d;
    border: 1px solid #2e2e36;
    border-radius: 0;
    padding: 12px 14px;
  }
  .az-activity-panel::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(transparent, #19191d);
    pointer-events: none;
    border-radius: 0 0 8px 8px;
  }
  .az-activity-panel-header {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #5a5a66;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #2e2e36;
  }
  :global(.az-activity-scroll) {
    flex: 1;
    overflow: hidden;
  }

  :global(.az-act-line) {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 3px 0;
    font-family: var(--font-mono);
    font-size: 11px;
    opacity: 0;
    transform: translateY(6px);
    transition: all 0.2s;
  }
  :global(.az-act-line.az-visible) { opacity: 1; transform: translateY(0); }
  :global(.az-act-line.az-old) { opacity: 0.25; }
  :global(.az-act-dot) {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #5a5a66;
    margin-top: 5px;
    flex-shrink: 0;
  }
  :global(.az-act-dot.az-dg) { background: #22c55e; }
  :global(.az-act-dot.az-db) { background: #3b82f6; }
  :global(.az-act-dot.az-da) { background: #f59e0b; }
  :global(.az-act-dot.az-dr) { background: #ef4444; }
  :global(.az-act-text) { color: #8e8e9a; line-height: 1.4; }
  :global(.az-act-text .az-w) { color: #e8e8ec; font-weight: 500; }
  :global(.az-act-text .az-gr) { color: #22c55e; }
  :global(.az-act-text .az-d) { color: #5a5a66; }
  :global(.az-act-ts) { margin-left: auto; color: #5a5a66; font-family: var(--font-mono); font-size: 10px; flex-shrink: 0; font-variant-numeric: tabular-nums; }

  /* Agents panel */
  .az-agents-side {
    width: 200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  :global(.az-agents-card) {
    background: #19191d;
    border: 1px solid #2e2e36;
    border-radius: 0;
    padding: 12px 14px;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s;
  }
  :global(.az-agents-card.az-visible) { opacity: 1; transform: translateY(0); }
  .az-agents-card-title {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #5a5a66;
    margin-bottom: 10px;
  }
  :global(.az-agent-item) {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
    font-family: var(--font-mono);
    font-size: 11px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  :global(.az-agent-item.az-visible) { opacity: 1; }
  :global(.az-agent-dot) {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #3b82f6;
  }
  :global(.az-agent-dot-active) { animation: azAgentPulse 1.5s ease infinite; }
  @keyframes azAgentPulse {
    0%,100% { opacity: 0.3; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  :global(.az-agent-dot.az-agent-done) { background: #22c55e; animation: none; }
  :global(.az-agent-name) { color: #8e8e9a; }

  /* Stats mini */
  :global(.az-stats-mini) {
    background: #19191d;
    border: 1px solid #2e2e36;
    border-radius: 0;
    padding: 12px 14px;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s;
  }
  :global(.az-stats-mini.az-visible) { opacity: 1; transform: translateY(0); }
  .az-stats-mini-title {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #5a5a66;
    margin-bottom: 8px;
  }
  .az-stats-mini-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 11px;
    padding: 3px 0;
  }
  .az-sml { color: #5a5a66; }
  .az-smv { color: #c8c8d0; font-variant-numeric: tabular-nums; }
  .az-smv-gr { color: #22c55e; }

  /* Phase 3: Results */
  .az-results-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 24px;
  }
  :global(.az-r-stat) {
    background: #19191d;
    border: 1px solid #2e2e36;
    border-radius: 0;
    padding: 16px 18px;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.35s ease;
  }
  :global(.az-r-stat.az-visible) { opacity: 1; transform: translateY(0); }
  .az-r-stat-label {
    font-family: var(--font-mono);
    font-size: 10px;
    color: #5a5a66;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .az-r-stat-value {
    font-family: var(--font-mono);
    font-size: 30px;
    font-weight: 700;
  }
  .az-rsv-white { color: #e8e8ec; }
  .az-rsv-green { color: #22c55e; }
  .az-rsv-emerald { color: #059669; }
  .az-unit { font-size: 16px; font-weight: 400; color: #8e8e9a; margin-left: 2px; }

  /* Signal badge */
  :global(.az-signal-row) {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    opacity: 0;
    transition: opacity 0.4s;
  }
  :global(.az-signal-row.az-visible) { opacity: 1; }
  .az-signal-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    color: #22c55e;
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.2);
    padding: 5px 14px;
    border-radius: 0;
  }
  .az-signal-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
  }
  .az-cost-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    color: #5a5a66;
  }
  .az-cost-val { color: #c8c8d0; }

  /* Findings table */
  :global(.az-findings-card) {
    background: #19191d;
    border: 1px solid #2e2e36;
    border-radius: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s;
  }
  :global(.az-findings-card.az-visible) { opacity: 1; transform: translateY(0); }
  .az-findings-card-header {
    padding: 14px 18px;
    border-bottom: 1px solid #2e2e36;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: #8e8e9a;
  }
  .az-sev-chip {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 0;
  }
  .az-sev-crit { background: #7f1d1d; color: #fca5a5; }
  .az-sev-low { background: rgba(34,100,34,0.5); color: #bbf7d0; }

  .az-f-table {
    width: 100%;
    border-collapse: collapse;
  }
  .az-f-table th {
    text-align: left;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 400;
    color: #5a5a66;
    padding: 10px 18px;
    border-bottom: 1px solid #222228;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .az-f-table td {
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 12px 18px;
    border-bottom: 1px solid #222228;
    color: #c8c8d0;
  }
  :global(.az-data-row) {
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s;
  }
  :global(.az-data-row.az-visible) {
    opacity: 1;
    transform: translateX(0);
  }

  .az-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 0;
    display: inline-block;
  }
  .az-badge-critical { background: #7f1d1d; color: #fca5a5; }
  .az-badge-high { background: #7c2d12; color: #fdba74; }
  .az-badge-medium { background: rgba(120,80,10,0.6); color: #fde68a; }
  .az-badge-low { background: rgba(34,100,34,0.5); color: #bbf7d0; }

  .az-confirmed {
    font-family: var(--font-mono);
    font-size: 11px;
    color: #22c55e;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .az-confirmed::before { content: '\25CF'; font-size: 7px; }

  /* Tablet */
  @media (max-width: 1024px) {
    .az-browser-url { margin: 0 16px; }
    .az-sidebar { width: 160px; }
    .az-main-content { left: 160px; }
    .az-agents-side { width: 160px; }
    .az-app-viewport { height: 540px; }
    :global(.az-phase) { padding: 20px 24px; }
    .az-r-stat-value { font-size: 24px; }
    :global(.az-r-stat) { padding: 12px 14px; }
    .az-f-table th,
    .az-f-table td { padding: 8px 12px; font-size: 10px; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .az-browser-titlebar { display: none; }
    .az-top-progress { display: none; }
    .az-sidebar { display: none; }
    .az-main-content { left: 0; }
    .az-browser-frame { border-radius: 0; }
    .az-app-viewport {
      height: auto;
      min-height: 420px;
    }
    :global(.az-phase) {
      position: relative;
      padding: 20px 16px;
      display: none;
    }
    :global(.az-phase.az-visible) {
      display: block;
      opacity: 1;
    }
    .az-page-title { font-size: 16px; margin-bottom: 16px; }
    .az-input-card { padding: 16px; }
    :global(.az-input-field) { font-size: 12px; padding: 8px 10px; }
    :global(.az-input-text) { font-size: 12px; }
    :global(.az-repo-info) { gap: 10px; font-size: 10px; flex-wrap: wrap; }
    .az-analysis-header { flex-direction: column; align-items: flex-start; gap: 8px; }
    .az-analysis-title { font-size: 13px; }
    .az-pipeline-labels { display: none; }
    .az-analysis-body { flex-direction: column; }
    .az-agents-side { display: none; }
    .az-results-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    :global(.az-r-stat) { padding: 12px; }
    .az-r-stat-value { font-size: 22px; }
    .az-unit { font-size: 13px; }
    :global(.az-signal-row) { flex-direction: column; align-items: flex-start; gap: 8px; }
    .az-signal-badge { font-size: 11px; }
    .az-cost-badge { font-size: 10px; }
    .az-f-table th:nth-child(n+3),
    .az-f-table td:nth-child(n+3) { display: none; }
    .az-f-table th,
    .az-f-table td { padding: 8px 12px; font-size: 11px; }
    .az-findings-card-header { padding: 10px 12px; font-size: 11px; }
  }
</style>