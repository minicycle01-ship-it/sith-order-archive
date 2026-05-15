const data = window.SITH_ORDER_DATA;

const divisionList = document.getElementById('divisionList');
const divisionDetail = document.getElementById('divisionDetail');
const linkGrid = document.getElementById('linkGrid');
const welcomeModal = document.getElementById('welcomeModal');
const enterSiteButton = document.getElementById('enterSiteButton');
const navTabs = document.querySelectorAll('.nav-tab');
const navJumps = document.querySelectorAll('.nav-jump');
const portalViews = document.querySelectorAll('.portal-view');

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
  divisionList.innerHTML = '';

  data.divisions.forEach((division, index) => {
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

function getLinkCategory(title) {
  if (['The Sith Code', 'The Sith Edict', 'Sith High Command', 'Kaggath Regulations', 'Assassination Regulations'].includes(title)) {
    return 'Documents';
  }

  if (['Rank Progression Registry', 'Assassination Board'].includes(title)) {
    return 'Registries';
  }

  if (['Ashas Ree', 'Malachor'].includes(title)) {
    return 'Sith Territory';
  }

  if (['Naboo'].includes(title)) {
    return 'Jedi Territory';
  }

  if (['Toola', 'Shu Torun', 'Panna Prime', 'Balmorra'].includes(title)) {
    return 'Battlegrounds';
  }

  if (['Orion Community Discord Server', 'Clothing Couturier'].includes(title)) {
    return 'Servers';
  }

  return 'Archive Links';
}

function renderLinks() {
  linkGrid.innerHTML = '';

  data.links.forEach((link) => {
    const anchor = document.createElement('a');
    const category = getLinkCategory(link.title);
    anchor.className = 'link-card';
    anchor.href = link.href;
    anchor.target = link.href.startsWith('http') ? '_blank' : '_self';
    anchor.rel = link.href.startsWith('http') ? 'noreferrer noopener' : '';
    anchor.innerHTML = `
      <p class="link-category">${category}</p>
      <h3>${link.title}</h3>
      <p>${link.description}</p>
    `;
    linkGrid.appendChild(anchor);
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
  welcomeModal.classList.add('hidden');
  welcomeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (welcomeModal) {
  document.body.classList.add('modal-open');
  enterSiteButton.addEventListener('click', dismissWelcome);
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
