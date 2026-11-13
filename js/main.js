const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const root = document.documentElement;
const state = {
  flavorIndex: 0,
  packCount: 0,
  packSize: 12
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let canvasEngine = null;
let toastTimer = null;

function applyAccent(flavor) {
  root.style.setProperty('--accent', flavor.color);
  root.style.setProperty('--accent-dark', flavor.colorDark);
  root.style.setProperty('--accent-light', flavor.colorLight);
  root.style.setProperty('--accent-rgb', flavor.colorRgb);

  const themeMeta = $('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', flavor.colorLight);
}

function renderFlavorList() {
  const list = $('#flavor-list');
  list.innerHTML = DEWDROP_FLAVORS.map((flavor, index) => `
    <button class="flavor-item${index === 0 ? ' is-active' : ''}" type="button" role="tab"
      id="flavor-tab-${flavor.id}" aria-selected="${index === 0}" aria-controls="flavor-panel"
      data-index="${index}">
      <span class="flavor-num">${flavor.number}</span>
      <span class="flavor-name">${flavor.shortName}</span>
      <span class="flavor-swatch" style="--swatch: ${flavor.color}"></span>
    </button>
  `).join('');

  list.addEventListener('click', (event) => {
    const button = event.target.closest('.flavor-item');
    if (button) selectFlavor(Number(button.dataset.index));
  });

  list.addEventListener('keydown', (event) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const dir = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const next = (state.flavorIndex + dir + DEWDROP_FLAVORS.length) % DEWDROP_FLAVORS.length;
    selectFlavor(next);
    const nextTab = $(`#flavor-tab-${DEWDROP_FLAVORS[next].id}`);
    if (nextTab) nextTab.focus();
  });
}

function renderPanel(flavor) {
  const noteLabels = { top: 'Top', heart: 'Heart', finish: 'Finish' };
  const specRows = [
    ['pH', flavor.specs.ph],
    ['TDS', flavor.specs.tds],
    ['Magnesium', flavor.specs.magnesium],
    ['Silica', flavor.specs.silica],
    ['Calcium', flavor.specs.calcium],
    ['Sugar', flavor.specs.sugar]
  ];

  return `
    <div class="panel-inner">
      <div class="panel-top">
        <span class="panel-number">No. ${flavor.number}</span>
        <span class="panel-origin">${flavor.botanicalOrigin}</span>
      </div>
      <h3 class="panel-name">${flavor.name}</h3>
      <p class="panel-tagline">${flavor.tagline}</p>
      <p class="panel-desc">${flavor.description}</p>

      <div class="notes">
        ${['top', 'heart', 'finish'].map((key) => `
          <div class="note">
            <span class="note-label">${noteLabels[key]}</span>
            <p>${flavor.tastingNotes[key]}</p>
          </div>
        `).join('')}
      </div>

      <dl class="specs">
        ${specRows.map(([label, value]) => `
          <div class="spec">
            <dt>${label}</dt>
            <dd>${value}</dd>
          </div>
        `).join('')}
      </dl>

      <p class="pairing"><span>Pairs with</span>${flavor.pairing}</p>

      <div class="panel-foot">
        <div class="badges">
          ${flavor.badges.map((badge) => `<span class="badge">${badge}</span>`).join('')}
        </div>
        <button class="btn btn-primary" type="button" id="add-flavor">Add six cans · €18</button>
      </div>
    </div>
  `;
}

function selectFlavor(index, options = {}) {
  const flavor = DEWDROP_FLAVORS[index];
  if (!flavor) return;
  state.flavorIndex = index;

  applyAccent(flavor);

  $$('.flavor-item').forEach((item, itemIndex) => {
    const active = itemIndex === index;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });

  const panel = $('#flavor-panel');
  panel.innerHTML = renderPanel(flavor);
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', `flavor-tab-${flavor.id}`);
  panel.setAttribute('tabindex', '0');

  const heroCan = $('#hero-can');
  if (heroCan) heroCan.setAttribute('aria-label', `A can of DewDrop ${flavor.name}`);
  const heroFlavor = $('#hero-can-flavor');
  const heroNo = $('#hero-can-no');
  if (heroFlavor) heroFlavor.textContent = flavor.name;
  if (heroNo) heroNo.textContent = `No. ${flavor.number}`;

  const addButton = $('#add-flavor');
  if (addButton) {
    addButton.addEventListener('click', () => {
      addToPack(6, `${flavor.shortName} × 6`);
    });
  }

  if (canvasEngine) canvasEngine.setColor(flavor.color);

  if (!options.silent) {
    dewDropAudio.playFlavorShift(400 + index * 55);
  }
}

function renderMinerals() {
  const body = $('#mineral-body');
  body.innerHTML = MINERAL_COMPARISON.map((row) => `
    <tr>
      <td data-label="Mineral">${row.name}</td>
      <td data-label="DewDrop" class="is-dewdrop">${row.dewdrop}</td>
      <td data-label="Still water">${row.standard}</td>
      <td data-label="San Pellegrino">${row.sanpellegrino}</td>
      <td data-label="LaCroix">${row.lacroix}</td>
      <td data-label="Why it matters">${row.benefit}</td>
    </tr>
  `).join('');
}

function renderVoices() {
  const grid = $('#voice-grid');
  grid.innerHTML = TESTIMONIALS.map((item, index) => `
    <article class="voice-card" data-reveal style="transition-delay: ${index * 90}ms">
      <blockquote class="voice-quote">${item.quote}</blockquote>
      <div class="voice-author">
        <span class="avatar" aria-hidden="true">${item.avatar}</span>
        <div>
          <strong>${item.author}</strong>
          <span>${item.role}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function setupReveal() {
  const targets = $$('[data-reveal]');

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach((el) => observer.observe(el));
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3400);
}

function updatePackDisplay() {
  $$('[data-pack-count]').forEach((el) => {
    el.textContent = state.packCount;
  });
  const packButton = $('.pack-btn');
  if (packButton) {
    packButton.classList.remove('is-pulsing');
    void packButton.offsetWidth;
    packButton.classList.add('is-pulsing');
  }
}

function addToPack(quantity, label) {
  state.packCount += quantity;
  updatePackDisplay();
  dewDropAudio.playClick();
  showToast(`${label} added to your pack.`);
}

function setupPackOptions() {
  $$('.pack-option').forEach((option) => {
    option.addEventListener('click', () => {
      $$('.pack-option').forEach((item) => item.classList.remove('is-active'));
      option.classList.add('is-active');
      state.packSize = Number(option.dataset.size);
    });
  });
}

function setupSound() {
  const button = $('#sound-toggle');
  if (!button) return;
  button.addEventListener('click', () => {
    const enabled = dewDropAudio.toggle();
    button.classList.toggle('is-on', enabled);
    button.setAttribute('aria-pressed', String(enabled));
    showToast(enabled ? 'Ambient sound on. Move gently.' : 'Sound off.');
  });
}

function setupMenu() {
  const button = $('#menu-toggle');
  const nav = $('#mobile-nav');
  if (!button || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  button.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  $$('a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });
}

function setupHeader() {
  const header = $('#site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupCanTilt() {
  const stage = $('#can-stage');
  const can = $('#hero-can');
  if (!stage || !can) return;
  if (prefersReducedMotion) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    can.style.transform = `rotate(${x * 7 - 4}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
  });

  stage.addEventListener('mouseleave', () => {
    can.style.transform = '';
  });
}

function setupForm() {
  const form = $('#subscribe-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = $('#email');
    if (!email || !email.value.trim()) {
      showToast('Please add an email so we can reserve your crate.');
      return;
    }
    const plan = state.packSize === 6 ? 'Discovery' : 'Ritual';
    showToast(`Reserved. The ${plan} crate is yours — watch your inbox.`);
    form.reset();
  });
}

function init() {
  renderFlavorList();
  renderMinerals();
  renderVoices();

  if (typeof DewDropCanvas === 'function' && $('#drops-canvas')) {
    canvasEngine = new DewDropCanvas('drops-canvas');
  }

  selectFlavor(0, { silent: true });

  setupReveal();
  setupHeader();
  setupMenu();
  setupSound();
  setupPackOptions();
  setupForm();
  setupCanTilt();

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
}

init();
