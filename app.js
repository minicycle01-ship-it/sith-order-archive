const data = window.SITH_ORDER_DATA;

const divisionList = document.getElementById('divisionList');
const divisionDetail = document.getElementById('divisionDetail');
const linkGrid = document.getElementById('linkGrid');
const welcomeModal = document.getElementById('welcomeModal');
const enterSiteButton = document.getElementById('enterSiteButton');
const navTabs = document.querySelectorAll('.nav-tab');
const navJumps = document.querySelectorAll('.nav-jump');
const portalViews = document.querySelectorAll('.portal-view');

// Display order for the grouped Resources view.
const LINK_CATEGORY_ORDER = [
  'Communities',
  'Information',
  'Logistics',
  'Sith Territory',
  'Jedi Territory',
  'Battlegrounds'
];

function renderDivisionDetail(division) {
  divisionDetail.innerHTML = `
    <p class="eyebrow">Division Record</p>
    <h3>${division.name}</h3>
    <p>${division.purpose}</p>
    <div class="division-meta">
      <div class="meta-box">
        <h4>Primary Focus</h4>
        <p>${division.focus}</p>
      </div>
      <div class="meta-box">
        <h4>Atmosphere</h4>
        <p>${division.atmosphere}</p>
      </div>
    </div>
  `;
}

function renderDivisions() {
  if (!divisionList) return;
  divisionList.innerHTML = '';

  (data.divisions || []).forEach((division, index) => {
    const button = document.createElement('button');
    button.className = 'division-button';
    button.type = 'button';
    button.innerHTML = `
      <strong>${division.name}</strong>
      <span>${division.summary}</span>
    `;

    if (index === 0) {
      button.classList.add('active');
      renderDivisionDetail(division);
    }

    button.addEventListener('click', () => {
      document
        .querySelectorAll('.division-button')
        .forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderDivisionDetail(division);
    });

    divisionList.appendChild(button);
  });
}

function renderLinks() {
  if (!linkGrid) return;
  linkGrid.innerHTML = '';

  // Group links by their declared category, preserving original order within each group.
  const grouped = new Map();
  (data.links || []).forEach((link) => {
    const cat = link.category || 'Other';
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat).push(link);
  });

  // Render in the defined order, with anything else appended after.
  const orderedCats = [
    ...LINK_CATEGORY_ORDER.filter((c) => grouped.has(c)),
    ...[...grouped.keys()].filter((c) => !LINK_CATEGORY_ORDER.includes(c))
  ];

  orderedCats.forEach((category) => {
    const section = document.createElement('section');
    section.className = 'link-section';

    const heading = document.createElement('div');
    heading.className = 'link-section-heading';
    heading.innerHTML = `
      <p class="eyebrow">${category}</p>
      <span class="link-section-divider" aria-hidden="true"></span>
    `;
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'link-section-grid';

    grouped.get(category).forEach((link) => {
      const anchor = document.createElement('a');
      anchor.className = 'link-card';
      anchor.href = link.href;
      anchor.target = link.href.startsWith('http') ? '_blank' : '_self';
      anchor.rel = link.href.startsWith('http') ? 'noreferrer noopener' : '';
      anchor.innerHTML = `
        <p class="link-category">${category}</p>
        <h3>${link.title}</h3>
        <p>${link.description}</p>
      `;
      grid.appendChild(anchor);
    });

    section.appendChild(grid);
    linkGrid.appendChild(section);
  });
}
function setActiveNav(viewName) {
  navTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.view === viewName);
  });
}

function showView(viewName, updateHash = true) {
  portalViews.forEach((view) => {
    const isActive = view.dataset.view === viewName;
    view.classList.toggle('active-view', isActive);
  });

  setActiveNav(viewName);

  if (updateHash) {
    window.location.hash = viewName;
  }
}

function handleViewChange(viewName) {
  if (!viewName) return;
  showView(viewName);
}

navTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    handleViewChange(tab.dataset.view);
  });
});

navJumps.forEach((button) => {
  button.addEventListener('click', () => {
    handleViewChange(button.dataset.view);
  });
});

window.addEventListener('hashchange', () => {
  const hashView = window.location.hash.replace('#', '');
  if (hashView) {
    showView(hashView, false);
  }
});

function dismissWelcome() {
  if (!welcomeModal) return;
  welcomeModal.classList.add('hidden');
  welcomeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (welcomeModal) {
  document.body.classList.add('modal-open');
  if (enterSiteButton) {
    enterSiteButton.addEventListener('click', dismissWelcome);
  }
  welcomeModal.addEventListener('click', (event) => {
    if (event.target === welcomeModal) {
      dismissWelcome();
    }
  });
}

renderDivisions();
renderLinks();

const initialView = window.location.hash.replace('#', '') || 'overview';
showView(initialView, false);
