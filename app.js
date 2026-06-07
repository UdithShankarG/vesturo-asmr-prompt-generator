// ═══════════════════════════════════════
// APP.JS — Vesturo ASMR Prompt Generator
// ═══════════════════════════════════════

// ─── STATE ───────────────────────────────────────
const state = {
  currentStep: 1,
  selectedCategory: null,
  customCategory: '',
  selectedSubject: '',
  selectedTheme: 'brushed_steel',
  customThemeColor: '',
  selectedDeployStyle: null,
  transformDuration: 4,
  numParts: 6,
  speed: 'smooth',
  generatedMaster: '',
  generatedVideo: '',
};

// ─── INITIALIZATION ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderThemes();
  renderDeploymentStyles();
  updateDurationLabel();
  updatePartsLabel();

  // Custom category input listener
  document.getElementById('customCategory').addEventListener('input', (e) => {
    state.customCategory = e.target.value.trim();
    if (state.customCategory) {
      // Deselect grid categories
      document.querySelectorAll('.category-item').forEach(el => el.classList.remove('selected'));
      state.selectedCategory = 'custom';
      document.getElementById('selectedCatTag').textContent = state.customCategory;
      // Clear suggestions
      renderSubjectSuggestions([]);
    }
  });

  // Custom theme input listener
  document.getElementById('customThemeInput').addEventListener('input', (e) => {
    state.customThemeColor = e.target.value.trim();
    if (state.customThemeColor) {
      document.querySelectorAll('.theme-card').forEach(el => el.classList.remove('selected'));
      state.selectedTheme = 'custom';
    }
  });

  // Subject input listener
  document.getElementById('subjectInput').addEventListener('input', (e) => {
    state.selectedSubject = e.target.value.trim();
  });

  // Speed select listener
  document.getElementById('speedSelect').addEventListener('change', (e) => {
    state.speed = e.target.value;
  });
});

// ─── RENDER: Categories ──────────────────────────
function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = '';
  PromptEngine.CATEGORIES.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'category-item';
    item.dataset.id = cat.id;
    item.innerHTML = `
      <span class="category-icon">${cat.icon}</span>
      <span class="category-name">${cat.name}</span>
    `;
    item.addEventListener('click', () => selectCategory(cat));
    grid.appendChild(item);
  });
}

function selectCategory(cat) {
  state.selectedCategory = cat.id;
  state.customCategory = '';
  document.getElementById('customCategory').value = '';
  document.getElementById('selectedCatTag').textContent = cat.name;

  // Visual selection
  document.querySelectorAll('.category-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === cat.id);
  });

  // Show subject suggestions
  renderSubjectSuggestions(cat.subjects || []);
}

function renderSubjectSuggestions(subjects) {
  const container = document.getElementById('subjectSuggestions');
  container.innerHTML = '';
  if (subjects.length === 0) {
    container.innerHTML = '<span class="subject-pill" style="opacity:0.5">Type your subject name below</span>';
    return;
  }
  subjects.forEach(name => {
    const pill = document.createElement('button');
    pill.className = 'subject-pill';
    pill.textContent = name;
    pill.addEventListener('click', () => {
      state.selectedSubject = name;
      document.getElementById('subjectInput').value = name;
      // Highlight selected pill
      document.querySelectorAll('.subject-pill').forEach(p => p.style.borderColor = '');
      pill.style.borderColor = 'var(--accent-primary)';
      pill.style.background = 'rgba(108, 92, 231, 0.15)';
      pill.style.color = 'var(--text-primary)';
    });
    container.appendChild(pill);
  });
}

// ─── RENDER: Themes ──────────────────────────────
function renderThemes() {
  const grid = document.getElementById('themeGrid');
  grid.innerHTML = '';
  PromptEngine.THEME_PRESETS.forEach(theme => {
    const card = document.createElement('div');
    card.className = `theme-card${theme.id === state.selectedTheme ? ' selected' : ''}`;
    card.dataset.id = theme.id;
    card.innerHTML = `
      <div class="theme-preview" style="background: ${theme.gradient};"></div>
      <span class="theme-name">${theme.name}</span>
    `;
    card.addEventListener('click', () => selectTheme(theme.id));
    grid.appendChild(card);
  });
}

function selectTheme(themeId) {
  state.selectedTheme = themeId;
  state.customThemeColor = '';
  document.getElementById('customThemeInput').value = '';

  document.querySelectorAll('.theme-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === themeId);
  });
}

// ─── RENDER: Deployment Styles ───────────────────
function renderDeploymentStyles() {
  const grid = document.getElementById('deployGrid');
  grid.innerHTML = '';
  PromptEngine.DEPLOYMENT_STYLES.forEach(style => {
    const card = document.createElement('div');
    card.className = 'deploy-card';
    card.dataset.id = style.id;
    card.innerHTML = `
      <div class="deploy-preview">
        ${getDeployPreviewHTML(style.animClass)}
      </div>
      <div class="deploy-name">${style.name}</div>
      <div class="deploy-desc">${style.desc}</div>
    `;
    card.addEventListener('click', () => selectDeployStyle(style.id, style.name));
    grid.appendChild(card);
  });
}

function getDeployPreviewHTML(animClass) {
  switch (animClass) {
    case 'anim-sequential':
      return `<div class="preview-box anim-sequential">
        <div class="preview-piece p1" style="width:22px;height:22px;top:0;left:0;background:var(--accent-primary);"></div>
        <div class="preview-piece p2" style="width:22px;height:22px;top:0;right:0;background:var(--accent-secondary);"></div>
        <div class="preview-piece p3" style="width:22px;height:22px;bottom:0;left:0;background:var(--accent-warm);"></div>
        <div class="preview-piece p4" style="width:22px;height:22px;bottom:0;right:0;background:var(--accent-gold);"></div>
      </div>`;
    case 'anim-radial':
      return `<div class="preview-box anim-radial">
        <div class="piece" style="width:50px;height:50px;border:3px solid var(--accent-primary);border-radius:50%;position:absolute;top:5px;left:5px;"></div>
        <div class="piece" style="width:30px;height:30px;border:3px solid var(--accent-secondary);border-radius:50%;position:absolute;top:15px;left:15px;animation-delay:0.3s;"></div>
        <div class="piece" style="width:14px;height:14px;background:var(--accent-warm);border-radius:50%;position:absolute;top:23px;left:23px;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-cascade':
      return `<div class="preview-box anim-cascade" style="flex-direction:column;gap:4px;">
        <div class="bar" style="width:48px;height:8px;background:var(--accent-primary);border-radius:2px;"></div>
        <div class="bar" style="width:48px;height:8px;background:var(--accent-secondary);border-radius:2px;animation-delay:0.2s;"></div>
        <div class="bar" style="width:48px;height:8px;background:var(--accent-warm);border-radius:2px;animation-delay:0.4s;"></div>
        <div class="bar" style="width:48px;height:8px;background:var(--accent-gold);border-radius:2px;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-spiral':
      return `<div class="preview-box anim-spiral">
        <div class="spiral-piece" style="width:10px;height:10px;background:var(--accent-primary);border-radius:50%;position:absolute;--tx:20px;--ty:-15px;"></div>
        <div class="spiral-piece" style="width:10px;height:10px;background:var(--accent-secondary);border-radius:50%;position:absolute;--tx:-18px;--ty:12px;animation-delay:0.3s;"></div>
        <div class="spiral-piece" style="width:10px;height:10px;background:var(--accent-warm);border-radius:50%;position:absolute;--tx:15px;--ty:18px;animation-delay:0.6s;"></div>
        <div class="spiral-piece" style="width:10px;height:10px;background:var(--accent-gold);border-radius:50%;position:absolute;--tx:-20px;--ty:-10px;animation-delay:0.9s;"></div>
      </div>`;
    case 'anim-butterfly':
      return `<div class="preview-box anim-butterfly" style="gap:2px;">
        <div class="left" style="width:24px;height:40px;background:var(--accent-primary);border-radius:4px 0 0 4px;"></div>
        <div style="width:4px;height:40px;background:var(--text-muted);border-radius:2px;"></div>
        <div class="right" style="width:24px;height:40px;background:var(--accent-secondary);border-radius:0 4px 4px 0;"></div>
      </div>`;
    case 'anim-accordion':
      return `<div class="preview-box anim-accordion" style="gap:3px;">
        <div class="acc-bar" style="width:8px;height:40px;background:var(--accent-primary);border-radius:2px;transform-origin:bottom;"></div>
        <div class="acc-bar" style="width:8px;height:40px;background:var(--accent-secondary);border-radius:2px;transform-origin:bottom;animation-delay:0.15s;"></div>
        <div class="acc-bar" style="width:8px;height:40px;background:var(--accent-warm);border-radius:2px;transform-origin:bottom;animation-delay:0.3s;"></div>
        <div class="acc-bar" style="width:8px;height:40px;background:var(--accent-gold);border-radius:2px;transform-origin:bottom;animation-delay:0.45s;"></div>
        <div class="acc-bar" style="width:8px;height:40px;background:var(--accent-primary);border-radius:2px;transform-origin:bottom;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-domino':
      return `<div class="preview-box anim-domino" style="gap:4px;">
        <div class="dom" style="width:8px;height:32px;background:var(--accent-primary);border-radius:2px;"></div>
        <div class="dom" style="width:8px;height:32px;background:var(--accent-secondary);border-radius:2px;animation-delay:0.15s;"></div>
        <div class="dom" style="width:8px;height:32px;background:var(--accent-warm);border-radius:2px;animation-delay:0.3s;"></div>
        <div class="dom" style="width:8px;height:32px;background:var(--accent-gold);border-radius:2px;animation-delay:0.45s;"></div>
        <div class="dom" style="width:8px;height:32px;background:var(--accent-success);border-radius:2px;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-telescopic':
      return `<div class="preview-box anim-telescopic" style="flex-direction:column;gap:2px;">
        <div class="tele" style="width:50px;height:10px;background:var(--accent-primary);border-radius:2px;transform-origin:left;"></div>
        <div class="tele" style="width:40px;height:10px;background:var(--accent-secondary);border-radius:2px;transform-origin:left;animation-delay:0.2s;"></div>
        <div class="tele" style="width:30px;height:10px;background:var(--accent-warm);border-radius:2px;transform-origin:left;animation-delay:0.4s;"></div>
      </div>`;
    case 'anim-origami':
      return `<div class="preview-box anim-origami">
        <div class="ori" style="width:36px;height:36px;background:var(--accent-primary);position:absolute;clip-path:polygon(50% 0%,100% 100%,0% 100%);"></div>
        <div class="ori" style="width:36px;height:36px;background:var(--accent-secondary);position:absolute;clip-path:polygon(0% 0%,100% 0%,50% 100%);animation-delay:0.5s;"></div>
      </div>`;
    case 'anim-gearwork':
      return `<div class="preview-box anim-gearwork">
        <div class="gear" style="width:30px;height:30px;border:4px dashed var(--accent-primary);border-radius:50%;position:absolute;top:8px;left:8px;"></div>
        <div class="gear" style="width:24px;height:24px;border:4px dashed var(--accent-secondary);border-radius:50%;position:absolute;bottom:8px;right:8px;animation-direction:reverse;"></div>
        <div style="width:6px;height:6px;background:var(--accent-warm);border-radius:50%;position:absolute;top:21px;left:21px;"></div>
        <div style="width:6px;height:6px;background:var(--accent-gold);border-radius:50%;position:absolute;bottom:17px;right:17px;"></div>
      </div>`;
    default:
      return `<div class="preview-box"><div style="color:var(--text-muted);font-size:12px;">Preview</div></div>`;
  }
}

function selectDeployStyle(styleId, styleName) {
  state.selectedDeployStyle = styleId;
  document.getElementById('selectedDeployTag').textContent = styleName;

  document.querySelectorAll('.deploy-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === styleId);
  });
}

// ─── RANGE SLIDERS ───────────────────────────────
function updateDurationLabel() {
  const val = document.getElementById('durationSlider').value;
  state.transformDuration = parseFloat(val);
  document.getElementById('durationLabel').textContent = `⏱️ ${parseFloat(val).toFixed(1)} seconds`;
}

function updatePartsLabel() {
  const val = document.getElementById('partsSlider').value;
  state.numParts = parseInt(val);
  document.getElementById('partsLabel').textContent = `🔩 ${val} parts`;
}

// ─── STEPPER NAVIGATION ─────────────────────────
function goToStep(step) {
  // Only allow going to steps that have been reached
  state.currentStep = step;
  updateStepper();
  showSection(step);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(step) {
  // Validate current step
  if (!validateStep(state.currentStep)) return;

  state.currentStep = step;
  updateStepper();
  showSection(step);

  // If going to step 4, populate summary
  if (step === 4) {
    populateSummary();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
  if (step === 1) {
    if (!state.selectedCategory && !state.customCategory) {
      showToast('⚠️ Please select or enter a category');
      return false;
    }
    const subj = document.getElementById('subjectInput').value.trim();
    if (!subj) {
      showToast('⚠️ Please enter a subject name');
      return false;
    }
    state.selectedSubject = subj;
    return true;
  }
  if (step === 2) {
    // Theme has a default, so always valid
    return true;
  }
  if (step === 3) {
    if (!state.selectedDeployStyle) {
      showToast('⚠️ Please select a deployment style');
      return false;
    }
    return true;
  }
  return true;
}

function updateStepper() {
  const steps = document.querySelectorAll('.step-item');
  const connectors = document.querySelectorAll('.step-connector');

  steps.forEach((stepEl, i) => {
    const stepNum = i + 1;
    stepEl.classList.remove('active', 'completed');
    if (stepNum === state.currentStep) {
      stepEl.classList.add('active');
    } else if (stepNum < state.currentStep) {
      stepEl.classList.add('completed');
    }
  });

  connectors.forEach((conn, i) => {
    conn.classList.toggle('active', i + 1 < state.currentStep);
  });
}

function showSection(step) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`step${step}`);
  if (target) target.classList.add('active');
}

// ─── SUMMARY ─────────────────────────────────────
function populateSummary() {
  const grid = document.getElementById('summaryGrid');
  const catData = PromptEngine.CATEGORIES.find(c => c.id === state.selectedCategory);
  const catDisplay = catData ? `${catData.icon} ${catData.name}` : state.customCategory;
  const themeData = PromptEngine.THEME_PRESETS.find(t => t.id === state.selectedTheme);
  const themeDisplay = state.customThemeColor || (themeData ? themeData.name : 'Brushed Steel');
  const deployData = PromptEngine.DEPLOYMENT_STYLES.find(d => d.id === state.selectedDeployStyle);
  const deployDisplay = deployData ? deployData.name : 'Not selected';

  const speedLabels = {
    smooth: '🎯 Smooth & Steady',
    slow: '🐢 Slow & Meditative',
    fast: '⚡ Quick & Snappy',
    variable: '🌊 Variable',
  };

  grid.innerHTML = `
    <div class="summary-item">
      <div class="summary-label">Category</div>
      <div class="summary-value">${catDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Subject</div>
      <div class="summary-value">🎯 ${state.selectedSubject}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Theme / Color</div>
      <div class="summary-value">✨ ${themeDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Deploy Style</div>
      <div class="summary-value">⚙️ ${deployDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Duration</div>
      <div class="summary-value">⏱️ ${state.transformDuration}s transform</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Parts / Speed</div>
      <div class="summary-value">🔩 ${state.numParts} parts · ${speedLabels[state.speed] || state.speed}</div>
    </div>
  `;

  // Update preview emoji
  const catIcon = catData ? catData.icon : '⚙️';
  document.getElementById('previewEmoji').textContent = catIcon;

  // Update preview colors
  if (themeData) {
    document.getElementById('previewAbstract').style.background = themeData.gradient;
  }
}

// ─── PREVIEW ANIMATION ──────────────────────────
let previewRunning = false;
let previewTimeout = null;

function playPreview() {
  if (previewRunning) return;
  previewRunning = true;

  const abstract = document.getElementById('previewAbstract');
  const hand = document.getElementById('previewHand');
  const timelineFill = document.getElementById('previewTimelineFill');
  const timerTop = document.getElementById('previewTimer');
  const timerBottom = document.getElementById('previewTimerBottom');
  const playBtn = document.getElementById('previewPlayBtn');
  const playBtn2 = document.getElementById('previewPlayBtn2');

  playBtn.disabled = true;
  playBtn2.disabled = true;
  playBtn.textContent = '⏳ Playing...';

  // Reset
  abstract.classList.remove('deployed');
  abstract.style.transform = '';
  hand.style.opacity = '0';
  hand.style.left = '-60px';
  timelineFill.style.width = '0%';

  let elapsed = 0;
  const totalTime = 10;

  // Timeline updater
  const interval = setInterval(() => {
    elapsed += 0.1;
    const pct = Math.min((elapsed / totalTime) * 100, 100);
    timelineFill.style.width = pct + '%';
    timerTop.textContent = `${formatTime(elapsed)} / 0:10`;
    timerBottom.textContent = formatTime(elapsed);

    if (elapsed >= totalTime) {
      clearInterval(interval);
      previewRunning = false;
      playBtn.disabled = false;
      playBtn2.disabled = false;
      playBtn.textContent = '▶ Play Preview';
    }
  }, 100);

  // Phase 1: Hand enters (0-1s)
  setTimeout(() => {
    hand.style.opacity = '1';
    hand.style.left = 'calc(50% - 24px)';
    hand.style.bottom = '42%';
  }, 200);

  // Phase 2: Button press (1-2s)
  setTimeout(() => {
    abstract.style.transform = 'scale(0.9)';
    // Flash effect for click
    abstract.style.boxShadow = '0 0 30px rgba(255,255,255,0.5)';
  }, 1500);

  setTimeout(() => {
    abstract.style.transform = 'scale(1)';
    abstract.style.boxShadow = '';
  }, 1700);

  // Phase 3: Hand exits (2-3s)
  setTimeout(() => {
    hand.style.left = '-60px';
    hand.style.opacity = '0';
  }, 2200);

  // Phase 4: Deployment (3-7s)
  setTimeout(() => {
    abstract.classList.add('deployed');
  }, 3000);

  // Phase 5: Rest (7-10s) - already handled
}

function formatTime(seconds) {
  const s = Math.floor(seconds);
  const ms = Math.floor((seconds % 1) * 10);
  return `0:${s.toString().padStart(2, '0')}`;
}

// ─── GENERATE PROMPTS ───────────────────────────
function generatePrompts() {
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="loader"></div> Generating...';

  // Determine effective category
  const effectiveCategory = state.customCategory ? 'custom' : state.selectedCategory;

  const config = {
    category: effectiveCategory === 'custom' ? (state.customCategory || 'custom') : state.selectedCategory,
    subject: state.selectedSubject,
    themeId: state.selectedTheme,
    customThemeColor: state.customThemeColor,
    deployStyle: state.selectedDeployStyle,
    transformDuration: state.transformDuration,
    numParts: state.numParts,
    speed: state.speed,
  };

  // Small delay for UX feel
  setTimeout(() => {
    const masterPrompt = PromptEngine.generateMasterPrompt(config);
    const videoPrompt = PromptEngine.generateVideoPrompt(config);

    state.generatedMaster = masterPrompt;
    state.generatedVideo = videoPrompt;

    document.getElementById('masterPromptContent').textContent = masterPrompt;
    document.getElementById('videoPromptContent').textContent = videoPrompt;
    document.getElementById('promptOutput').style.display = 'block';

    btn.disabled = false;
    btn.innerHTML = '⚡ Regenerate Prompts';

    // Scroll to output
    document.getElementById('promptOutput').scrollIntoView({ behavior: 'smooth', block: 'start' });

    showToast('✅ Prompts generated successfully!');
  }, 800);
}

// ─── COPY TO CLIPBOARD ──────────────────────────
function copyPrompt(type) {
  const text = type === 'master' ? state.generatedMaster : state.generatedVideo;
  const feedbackEl = document.getElementById(type === 'master' ? 'masterCopyFeedback' : 'videoCopyFeedback');

  navigator.clipboard.writeText(text).then(() => {
    feedbackEl.classList.add('show');
    showToast(`📋 ${type === 'master' ? 'Master' : 'Video'} prompt copied to clipboard!`);
    setTimeout(() => feedbackEl.classList.remove('show'), 2000);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    feedbackEl.classList.add('show');
    showToast(`📋 ${type === 'master' ? 'Master' : 'Video'} prompt copied!`);
    setTimeout(() => feedbackEl.classList.remove('show'), 2000);
  });
}

// ─── TOAST NOTIFICATION ─────────────────────────
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  msg.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
