// ═══════════════════════════════════════
// APP.JS — Vesturo ASMR Prompt Generator v3.0
// ═══════════════════════════════════════

// ─── STATE ───────────────────────────────────────
const state = {
  currentStep: 1,
  selectedCategory: null,
  customCategory: '',
  selectedSubject: '',
  selectedAbstractShape: null,
  selectedTheme: 'original',
  customThemeColor: '',
  selectedDeployStyle: null,
  transformDuration: 4,
  numParts: 6,
  speed: 'smooth',
  generatedMaster: '',
  generatedVideo: '',
  generatedAI: '',
};

// ─── INITIALIZATION ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderAbstractShapes();
  renderThemes();
  renderDeploymentStyles();
  updateDurationLabel();
  updatePartsLabel();
  initApiKeyState();

  // Custom category input
  document.getElementById('customCategory').addEventListener('input', (e) => {
    state.customCategory = e.target.value.trim();
    if (state.customCategory) {
      document.querySelectorAll('.category-item').forEach(el => el.classList.remove('selected'));
      state.selectedCategory = 'custom';
      document.getElementById('selectedCatTag').textContent = state.customCategory;
      renderSubjectSuggestions([]);
    }
  });

  // Custom theme input
  document.getElementById('customThemeInput').addEventListener('input', (e) => {
    state.customThemeColor = e.target.value.trim();
    if (state.customThemeColor) {
      document.querySelectorAll('.theme-card').forEach(el => el.classList.remove('selected'));
      state.selectedTheme = 'custom';
    }
  });

  // Subject input
  document.getElementById('subjectInput').addEventListener('input', (e) => {
    state.selectedSubject = e.target.value.trim();
  });

  // Speed select
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

  document.querySelectorAll('.category-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === cat.id);
  });

  renderSubjectSuggestions(cat.subjects || []);
}

function renderSubjectSuggestions(subjects) {
  const container = document.getElementById('subjectSuggestions');
  container.innerHTML = '';
  if (subjects.length === 0) {
    container.innerHTML = '<span class="subject-pill" style="opacity:0.4">Type your subject name below</span>';
    return;
  }
  subjects.forEach(name => {
    const pill = document.createElement('button');
    pill.className = 'subject-pill';
    pill.textContent = name;
    pill.addEventListener('click', () => {
      state.selectedSubject = name;
      document.getElementById('subjectInput').value = name;
      document.querySelectorAll('.subject-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
    container.appendChild(pill);
  });
}

// ─── RENDER: Abstract Shapes ─────────────────────
function renderAbstractShapes() {
  const grid = document.getElementById('shapeGrid');
  grid.innerHTML = '';
  PromptEngine.ABSTRACT_SHAPES.forEach(shape => {
    const card = document.createElement('div');
    card.className = 'shape-card';
    card.dataset.id = shape.id;
    card.innerHTML = `
      <div class="shape-visual">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="${shape.svgPath}"/>
        </svg>
      </div>
      <div class="shape-name">${shape.name}</div>
      <div class="shape-desc">${shape.desc}</div>
    `;
    card.addEventListener('click', () => selectAbstractShape(shape));
    grid.appendChild(card);
  });
}

function selectAbstractShape(shape) {
  state.selectedAbstractShape = shape.id;
  document.getElementById('selectedShapeTag').textContent = shape.name;
  document.querySelectorAll('.shape-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === shape.id);
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
      <div class="theme-preview" style="background:${theme.gradient};"></div>
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
        <div class="preview-piece p1" style="width:18px;height:18px;top:0;left:0;background:var(--accent);"></div>
        <div class="preview-piece p2" style="width:18px;height:18px;top:0;right:0;background:var(--accent-2);"></div>
        <div class="preview-piece p3" style="width:18px;height:18px;bottom:0;left:0;background:var(--accent-warm);"></div>
        <div class="preview-piece p4" style="width:18px;height:18px;bottom:0;right:0;background:var(--accent-gold);"></div>
      </div>`;
    case 'anim-radial':
      return `<div class="preview-box anim-radial">
        <div class="piece" style="width:44px;height:44px;border:2px solid var(--accent);border-radius:50%;position:absolute;top:6px;left:6px;"></div>
        <div class="piece" style="width:26px;height:26px;border:2px solid var(--accent-2);border-radius:50%;position:absolute;top:15px;left:15px;animation-delay:0.3s;"></div>
        <div class="piece" style="width:10px;height:10px;background:var(--accent-warm);border-radius:50%;position:absolute;top:23px;left:23px;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-cascade':
      return `<div class="preview-box anim-cascade" style="flex-direction:column;gap:3px;">
        <div class="bar" style="width:44px;height:7px;background:var(--accent);border-radius:2px;"></div>
        <div class="bar" style="width:44px;height:7px;background:var(--accent-2);border-radius:2px;animation-delay:0.2s;"></div>
        <div class="bar" style="width:44px;height:7px;background:var(--accent-warm);border-radius:2px;animation-delay:0.4s;"></div>
        <div class="bar" style="width:44px;height:7px;background:var(--accent-gold);border-radius:2px;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-spiral':
      return `<div class="preview-box anim-spiral">
        <div class="spiral-piece" style="width:8px;height:8px;background:var(--accent);border-radius:50%;position:absolute;--tx:18px;--ty:-14px;"></div>
        <div class="spiral-piece" style="width:8px;height:8px;background:var(--accent-2);border-radius:50%;position:absolute;--tx:-16px;--ty:10px;animation-delay:0.3s;"></div>
        <div class="spiral-piece" style="width:8px;height:8px;background:var(--accent-warm);border-radius:50%;position:absolute;--tx:14px;--ty:16px;animation-delay:0.6s;"></div>
        <div class="spiral-piece" style="width:8px;height:8px;background:var(--accent-gold);border-radius:50%;position:absolute;--tx:-18px;--ty:-8px;animation-delay:0.9s;"></div>
      </div>`;
    case 'anim-butterfly':
      return `<div class="preview-box anim-butterfly" style="gap:2px;">
        <div class="left" style="width:20px;height:36px;background:var(--accent);border-radius:3px 0 0 3px;"></div>
        <div style="width:3px;height:36px;background:var(--text-muted);border-radius:1px;"></div>
        <div class="right" style="width:20px;height:36px;background:var(--accent-2);border-radius:0 3px 3px 0;"></div>
      </div>`;
    case 'anim-accordion':
      return `<div class="preview-box anim-accordion" style="gap:2px;">
        <div class="acc-bar" style="width:7px;height:36px;background:var(--accent);border-radius:2px;transform-origin:bottom;"></div>
        <div class="acc-bar" style="width:7px;height:36px;background:var(--accent-2);border-radius:2px;transform-origin:bottom;animation-delay:0.15s;"></div>
        <div class="acc-bar" style="width:7px;height:36px;background:var(--accent-warm);border-radius:2px;transform-origin:bottom;animation-delay:0.3s;"></div>
        <div class="acc-bar" style="width:7px;height:36px;background:var(--accent-gold);border-radius:2px;transform-origin:bottom;animation-delay:0.45s;"></div>
        <div class="acc-bar" style="width:7px;height:36px;background:var(--accent);border-radius:2px;transform-origin:bottom;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-domino':
      return `<div class="preview-box anim-domino" style="gap:3px;">
        <div class="dom" style="width:7px;height:28px;background:var(--accent);border-radius:2px;"></div>
        <div class="dom" style="width:7px;height:28px;background:var(--accent-2);border-radius:2px;animation-delay:0.15s;"></div>
        <div class="dom" style="width:7px;height:28px;background:var(--accent-warm);border-radius:2px;animation-delay:0.3s;"></div>
        <div class="dom" style="width:7px;height:28px;background:var(--accent-gold);border-radius:2px;animation-delay:0.45s;"></div>
        <div class="dom" style="width:7px;height:28px;background:var(--accent-success);border-radius:2px;animation-delay:0.6s;"></div>
      </div>`;
    case 'anim-telescopic':
      return `<div class="preview-box anim-telescopic" style="flex-direction:column;gap:2px;">
        <div class="tele" style="width:44px;height:9px;background:var(--accent);border-radius:2px;transform-origin:left;"></div>
        <div class="tele" style="width:34px;height:9px;background:var(--accent-2);border-radius:2px;transform-origin:left;animation-delay:0.2s;"></div>
        <div class="tele" style="width:24px;height:9px;background:var(--accent-warm);border-radius:2px;transform-origin:left;animation-delay:0.4s;"></div>
      </div>`;
    case 'anim-origami':
      return `<div class="preview-box anim-origami">
        <div class="ori" style="width:32px;height:32px;background:var(--accent);position:absolute;clip-path:polygon(50% 0%,100% 100%,0% 100%);"></div>
        <div class="ori" style="width:32px;height:32px;background:var(--accent-2);position:absolute;clip-path:polygon(0% 0%,100% 0%,50% 100%);animation-delay:0.5s;"></div>
      </div>`;
    case 'anim-gearwork':
      return `<div class="preview-box anim-gearwork">
        <div class="gear" style="width:26px;height:26px;border:3px dashed var(--accent);border-radius:50%;position:absolute;top:8px;left:8px;"></div>
        <div class="gear" style="width:20px;height:20px;border:3px dashed var(--accent-2);border-radius:50%;position:absolute;bottom:8px;right:8px;animation-direction:reverse;"></div>
      </div>`;
    default:
      return `<div class="preview-box"><div style="color:var(--text-muted);font-size:11px;">Preview</div></div>`;
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
  document.getElementById('durationLabel').textContent = `${parseFloat(val).toFixed(1)} seconds`;
}

function updatePartsLabel() {
  const val = document.getElementById('partsSlider').value;
  state.numParts = parseInt(val);
  document.getElementById('partsLabel').textContent = `${val} parts`;
}

// ─── NAVIGATION ──────────────────────────────────
function goToStep(step) {
  state.currentStep = step;
  updateStepper();
  showSection(step);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(step) {
  if (!validateStep(state.currentStep)) return;
  state.currentStep = step;
  updateStepper();
  showSection(step);
  if (step === 4) populateSummary();
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
    if (!state.selectedAbstractShape) {
      showToast('⚠️ Please select an abstract shape');
      return false;
    }
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
  const lines = document.querySelectorAll('.step-line');
  steps.forEach((el, i) => {
    const n = i + 1;
    el.classList.remove('active', 'done');
    if (n === state.currentStep) el.classList.add('active');
    else if (n < state.currentStep) el.classList.add('done');
  });
  lines.forEach((l, i) => {
    l.classList.toggle('active', i + 1 < state.currentStep);
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
  const shapeData = PromptEngine.ABSTRACT_SHAPES.find(s => s.id === state.selectedAbstractShape);
  const shapeDisplay = shapeData ? shapeData.name : 'Not selected';
  const themeData = PromptEngine.THEME_PRESETS.find(t => t.id === state.selectedTheme);
  const themeDisplay = state.customThemeColor || (themeData ? themeData.name : 'Original Colors');
  const deployData = PromptEngine.DEPLOYMENT_STYLES.find(d => d.id === state.selectedDeployStyle);
  const deployDisplay = deployData ? deployData.name : 'Not selected';

  const speedLabels = {
    smooth: 'Smooth & Steady',
    slow: 'Slow & Meditative',
    fast: 'Quick & Snappy',
    variable: 'Variable',
  };

  grid.innerHTML = `
    <div class="summary-item">
      <div class="summary-label">Category</div>
      <div class="summary-value">${catDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Subject</div>
      <div class="summary-value">${state.selectedSubject}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Abstract Shape</div>
      <div class="summary-value">${shapeDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Color Mode</div>
      <div class="summary-value">${themeDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Deploy Style</div>
      <div class="summary-value">${deployDisplay}</div>
    </div>
    <div class="summary-item">
      <div class="summary-label">Config</div>
      <div class="summary-value">${state.transformDuration}s · ${state.numParts} parts · ${speedLabels[state.speed]}</div>
    </div>
  `;

  // Update preview
  const catIcon = catData ? catData.icon : '⚙️';
  document.getElementById('previewEmoji').textContent = catIcon;
  if (themeData && themeData.id !== 'original') {
    document.getElementById('previewAbstract').style.background = themeData.gradient;
  }
}

// ─── PREVIEW ─────────────────────────────────────
let previewRunning = false;

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

  abstract.classList.remove('deployed');
  abstract.style.transform = '';
  hand.style.opacity = '0';
  hand.style.left = '-50px';
  timelineFill.style.width = '0%';

  let elapsed = 0;
  const total = 10;

  const interval = setInterval(() => {
    elapsed += 0.1;
    const pct = Math.min((elapsed / total) * 100, 100);
    timelineFill.style.width = pct + '%';
    timerTop.textContent = `${fmtTime(elapsed)} / 0:10`;
    timerBottom.textContent = fmtTime(elapsed);
    if (elapsed >= total) {
      clearInterval(interval);
      previewRunning = false;
      playBtn.disabled = false;
      playBtn2.disabled = false;
      playBtn.textContent = '▶ Play';
    }
  }, 100);

  setTimeout(() => { hand.style.opacity = '1'; hand.style.left = 'calc(50% - 20px)'; hand.style.bottom = '42%'; }, 200);
  setTimeout(() => { abstract.style.transform = 'scale(0.9)'; abstract.style.boxShadow = '0 0 24px rgba(255,255,255,0.4)'; }, 1500);
  setTimeout(() => { abstract.style.transform = 'scale(1)'; abstract.style.boxShadow = ''; }, 1700);
  setTimeout(() => { hand.style.left = '-50px'; hand.style.opacity = '0'; }, 2200);
  setTimeout(() => { abstract.classList.add('deployed'); }, 3000);
}

function fmtTime(s) {
  return `0:${Math.floor(s).toString().padStart(2, '0')}`;
}

// ─── BUILD CONFIG ────────────────────────────────
function buildConfig() {
  const effectiveCategory = state.customCategory ? 'custom' : state.selectedCategory;
  return {
    category: effectiveCategory === 'custom' ? (state.customCategory || 'custom') : state.selectedCategory,
    subject: state.selectedSubject,
    abstractShape: state.selectedAbstractShape || 'compressed_cube',
    themeId: state.selectedTheme,
    customThemeColor: state.customThemeColor,
    deployStyle: state.selectedDeployStyle,
    transformDuration: state.transformDuration,
    numParts: state.numParts,
    speed: state.speed,
  };
}

// ─── GENERATE LOCAL PROMPTS ──────────────────────
function generatePrompts() {
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="loader"></div> Generating...';

  const config = buildConfig();

  setTimeout(() => {
    const masterPrompt = PromptEngine.generateMasterPrompt(config);
    const videoPrompt = PromptEngine.generateVideoPrompt(config);

    state.generatedMaster = masterPrompt;
    state.generatedVideo = videoPrompt;

    document.getElementById('masterPromptContent').textContent = masterPrompt;
    document.getElementById('videoPromptContent').textContent = videoPrompt;
    document.getElementById('promptOutput').style.display = 'block';

    btn.disabled = false;
    btn.innerHTML = '⚡ Regenerate Local Prompts';

    document.getElementById('promptOutput').scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('✅ Local prompts generated!');
  }, 600);
}

// ─── GENERATE AI PROMPTS ─────────────────────────
async function generateAIPrompts() {
  if (!AIEngine.hasApiKey()) {
    showToast('⚠️ Please add your API key first');
    toggleApiModal();
    return;
  }

  const btn = document.getElementById('aiGenerateBtn');
  const status = document.getElementById('aiStatus');
  const statusText = document.getElementById('aiStatusText');
  const aiBlock = document.getElementById('aiPromptBlock');
  const aiContent = document.getElementById('aiPromptContent');

  btn.disabled = true;
  btn.innerHTML = '<div class="loader"></div> Generating with AI...';
  status.classList.add('active');
  statusText.textContent = 'Connecting to Kimi K2.6...';

  // Also generate local prompts first
  const config = buildConfig();
  const masterPrompt = PromptEngine.generateMasterPrompt(config);
  const videoPrompt = PromptEngine.generateVideoPrompt(config);
  state.generatedMaster = masterPrompt;
  state.generatedVideo = videoPrompt;
  document.getElementById('masterPromptContent').textContent = masterPrompt;
  document.getElementById('videoPromptContent').textContent = videoPrompt;
  document.getElementById('promptOutput').style.display = 'block';

  // Now generate AI prompt
  aiBlock.style.display = 'block';
  aiContent.textContent = '';

  try {
    statusText.textContent = 'AI is generating your ultra-detailed prompt...';

    const result = await AIEngine.generateAIVideoPrompt(config, (chunk, fullText) => {
      aiContent.textContent = fullText;
      // Auto-scroll to bottom of content
      aiContent.scrollTop = aiContent.scrollHeight;
    });

    state.generatedAI = result;
    if (!result || result.length < 50) {
      aiContent.textContent = result || 'No response received from AI.';
    }

    status.classList.remove('active');
    btn.disabled = false;
    btn.innerHTML = '🤖 Regenerate with AI (Kimi K2.6)';
    showToast('✅ AI prompt generated!');

    aiBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    status.classList.remove('active');
    btn.disabled = false;
    btn.innerHTML = '🤖 Generate with AI (Kimi K2.6)';
    aiContent.textContent = `Error: ${err.message}`;
    showToast(`❌ AI Error: ${err.message}`);
  }
}

// ─── COPY ────────────────────────────────────────
function copyPrompt(type) {
  let text = '';
  let feedbackId = '';

  if (type === 'master') { text = state.generatedMaster; feedbackId = 'masterCopyFeedback'; }
  else if (type === 'video') { text = state.generatedVideo; feedbackId = 'videoCopyFeedback'; }
  else if (type === 'ai') { text = state.generatedAI; feedbackId = 'aiCopyFeedback'; }

  if (!text) { showToast('⚠️ No prompt to copy'); return; }

  const feedback = document.getElementById(feedbackId);

  navigator.clipboard.writeText(text).then(() => {
    feedback.classList.add('show');
    showToast(`📋 ${type === 'master' ? 'Master' : type === 'video' ? 'Video' : 'AI'} prompt copied!`);
    setTimeout(() => feedback.classList.remove('show'), 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    feedback.classList.add('show');
    showToast(`📋 Copied!`);
    setTimeout(() => feedback.classList.remove('show'), 2000);
  });
}

// ─── API KEY MANAGEMENT ──────────────────────────
function initApiKeyState() {
  // Check if API key was previously saved by user in settings
  updateApiButtonState();
}

function updateApiButtonState() {
  const btn = document.getElementById('btnApiSettings');
  if (AIEngine.hasApiKey()) {
    btn.classList.add('active');
    btn.title = 'AI Connected';
  } else {
    btn.classList.remove('active');
    btn.title = 'AI Settings';
  }
}

function toggleApiModal() {
  const modal = document.getElementById('apiModal');
  const isOpen = modal.classList.contains('show');
  if (isOpen) {
    closeApiModal();
  } else {
    modal.classList.add('show');
    const input = document.getElementById('apiKeyInput');
    input.value = AIEngine.getApiKey();
    updateApiKeyStatusDisplay();
  }
}

function closeApiModal() {
  document.getElementById('apiModal').classList.remove('show');
}

function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (key) {
    AIEngine.setApiKey(key);
    showToast('✅ API key saved!');
  } else {
    AIEngine.clearApiKey();
    showToast('🔑 API key cleared');
  }
  updateApiButtonState();
  closeApiModal();
}

async function testApiConnection() {
  const btn = document.getElementById('btnTestApi');
  const status = document.getElementById('apiKeyStatus');
  const key = document.getElementById('apiKeyInput').value.trim();

  if (!key) {
    status.className = 'api-key-status disconnected';
    status.textContent = '⚠️ Please enter an API key first';
    return;
  }

  // Temporarily save for testing
  AIEngine.setApiKey(key);

  btn.disabled = true;
  btn.textContent = 'Testing...';
  status.className = 'api-key-status';
  status.textContent = '⏳ Testing connection...';

  const result = await AIEngine.testConnection();

  if (result.ok) {
    status.className = 'api-key-status connected';
    status.textContent = '✅ Connected! Model: moonshotai/kimi-k2.6:free';
  } else {
    status.className = 'api-key-status disconnected';
    status.textContent = `❌ Error: ${result.error}`;
  }

  btn.disabled = false;
  btn.textContent = 'Test Connection';
}

function updateApiKeyStatusDisplay() {
  const status = document.getElementById('apiKeyStatus');
  if (AIEngine.hasApiKey()) {
    status.className = 'api-key-status connected';
    status.textContent = '🔑 Key configured';
  } else {
    status.className = 'api-key-status disconnected';
    status.textContent = 'No key configured';
  }
}

// ─── TOAST ───────────────────────────────────────
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  msg.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  if (e.target.id === 'apiModal') {
    closeApiModal();
  }
});
