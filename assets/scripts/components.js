const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'faq.html', label: 'FAQ' },
  { href: 'appointments.html', label: 'Appointments' },
  { href: 'contact.html', label: 'Contact' }
]

function currentPage() {
  const file = window.location.pathname.split('/').pop()
  return file || 'index.html'
}

function navLinksHTML() {
  const page = currentPage()
  return NAV_LINKS.map(({ href, label }) => {
    const isActive = page === href
    const classes = ['nav-link', 'fw-bold', isActive ? 'active' : ''].filter(Boolean).join(' ')
    const ariaCurrent = isActive ? ' aria-current="page"' : ''
    return `        <li class="nav-item p-3 fs-5">
          <a class="${classes}"${ariaCurrent} href="${href}">${label}</a>
        </li>`
  }).join('\n')
}

function injectNavbar() {
  const placeholder = document.querySelector('[data-navbar]')
  if (!placeholder) return

  const isAppointments = placeholder.dataset.navbar === 'appointments'
  const userStatusHTML = isAppointments ? `
  <div class="user-status__container">
    <p class="user-status" data-user-status>
      Logged in as <span class="user-email">verylongemailexample@gmail.com</span>
    </p>
    <button class="btn login-btn" data-login-btn data-bs-target="#loginModalToggle" data-bs-toggle="modal">
      Log in
    </button>
    <button class="btn logout-btn" data-logout-btn>Log out</button>
  </div>` : ''

  placeholder.outerHTML = `<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a href="index.html">
      <img src="assets/images/talkingtechlogo.webp" alt="TalkingTech logo" class="rounded-circle logo">
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav mb-2 mb-lg-0">
${navLinksHTML()}
      </ul>
    </div>
  </div>${userStatusHTML}
</nav>`
}

function injectFooter() {
  const placeholder = document.querySelector('[data-footer]')
  if (!placeholder) return

  placeholder.outerHTML = `<footer class="footer mt-auto py-3 bg-dark">
  <div class="container">
    <span class="footer__text">
      &copy; TalkingTech 2022. All rights reserved
      <a href="https://github.com/SasanTazayoni/TalkingTech" target="_blank" rel="noopener" class="github-link" aria-label="Github profile link">
        <i class="fa-brands fa-square-github"></i>
      </a>
    </span>
  </div>
</footer>`
}

function injectScrollUp() {
  const placeholder = document.querySelector('[data-scroll-up]')
  if (!placeholder) return

  placeholder.outerHTML = `<a href="#" class="scroll-up-link" aria-label="Scroll to top">
  <i class="fas fa-solid fa-arrow-up"></i>
</a>`
}

injectNavbar()
injectFooter()
injectScrollUp()
