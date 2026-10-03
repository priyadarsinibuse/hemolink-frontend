// Scoped theme CSS for the Home (landing) page only.
// Injected/removed at runtime by Home.jsx so it never affects other pages.
export const HEMOLINK_HOME_THEME_CSS = `
/* Hemolink Premium Healthcare UI CSS overriding Bootstrap 5 */

:root,
[data-bs-theme="light"] {
  /* Enforce Red Theme System-Wide */
  --bs-primary: #C20114;
  --bs-primary-rgb: 194, 1, 20;
  --primary-hover: #9A000F;
  --bs-link-color: #C20114;
  --bs-link-hover-color: #9A000F;

  /* Backgrounds */
  --bg-page: #F4F7F9;
  /* Professional soft off-white to make cards pop */
  --bg-footer: #271111;
  /* Dark elegant footer */

  /* Fonts & Shadows */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Premium Bootstrap-style Shadows for Cards */
  --card-shadow: 0 4px 15px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
  --card-shadow-hover: 0 12px 30px rgba(217, 4, 41, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Force override Bootstrap 5.3 Button CSS Variables */
.btn-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: var(--bs-primary);
  --bs-btn-border-color: var(--bs-primary);
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: var(--primary-hover);
  --bs-btn-hover-border-color: var(--primary-hover);
  --bs-btn-focus-shadow-rgb: 217, 4, 41;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: var(--primary-hover);
  --bs-btn-active-border-color: var(--primary-hover);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #FFB3C1;
  --bs-btn-disabled-border-color: #FFB3C1;
}

/* Force override focus rings */
.form-control:focus,
.btn:focus {
  border-color: #FFB3C1 !important;
  box-shadow: 0 0 0 0.25rem rgba(217, 4, 41, 0.25) !important;
}

body {
  font-family: var(--font-heading);
  background-color: var(--bg-page);
  -webkit-font-smoothing: antialiased;
  color: #334155;
}

a {
  color: var(--bs-primary);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-hover);
}

h1,
h2,
h3,
h4,
h5,
h6,
.font-heading {
  font-family: var(--font-heading);
  color: #0F172A;
}

.text-primary {
  color: var(--bs-primary) !important;
}

.bg-primary {
  background-color: var(--bs-primary) !important;
}

.bg-pink-light {
  background-color: #FFF1F2 !important;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #F1F5F9;
}

::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Animations */
@keyframes waveHand {

  0%,
  100% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(16deg);
  }

  40% {
    transform: rotate(-10deg);
  }

  60% {
    transform: rotate(16deg);
  }

  80% {
    transform: rotate(-4deg);
  }
}

.waving-hand {
  display: inline-block;
  animation: waveHand 2s infinite ease-in-out;
  transform-origin: 70% 70%;
}

@keyframes floatIllustration {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-12px) rotate(1deg);
  }
}

.floating-illustration {
  animation: floatIllustration 5s ease-in-out infinite;
  filter: none;
  border-radius: 0;
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.heading-slide-left {
  animation: slideFromLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pulseGlowRed {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(217, 4, 41, 0.4);
  }

  50% {
    box-shadow: 0 0 0 10px rgba(217, 4, 41, 0);
  }
}

.pulse-glow-red {
  animation: pulseGlowRed 2s infinite;
}

@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: rippleEffect 0.6s linear;
  background-color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

/* Navbar - Clean White Professional Theme */
/* Merged Dark Hero Header Section */
.hero-header-section {
  position: relative;
  z-index: 1;
  background: url('https://t3.ftcdn.net/jpg/07/83/30/38/360_F_783303809_isfe4vtaV9W5H1Ur6ejUqxLhy0UqcmvT.jpg') center/cover no-repeat;
  border-radius: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
}

.hero-header-section::before,
.help-section-bg::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: -1;
}

.custom-navbar {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.btn-back-nav {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-back-nav:hover {
  transform: translateX(-4px);
  opacity: 0.85;
}


.custom-navbar.scrolled {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  background: rgba(15, 17, 35, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* Custom SVG Logo Sizing */
.svg-logo {
  height: 38px;
  width: auto;
  transition: var(--transition);
}

@media (max-width: 768px) {
  .svg-logo {
    height: 32px;
  }
}

.brand-title {
  color: #FFFFFF !important;
  font-size: 1.4rem;
  letter-spacing: -0.5px;
}

/* Navbar Links with Left-to-Right Animated Red Underline */
.custom-nav-link {
  position: relative;
  color: #E2E8F0 !important;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.6rem 0.4rem !important;
  margin: 0 0.6rem;
}

.custom-nav-link:hover,
.custom-nav-link.active {
  color: var(--bs-primary) !important;
}

/* The Underline Effect */
.custom-nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background-color: var(--bs-primary);
  border-radius: 3px;
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.custom-nav-link:hover::after,
.custom-nav-link.active::after {
  width: 100%;
}

/* Navbar Dropdown Styling */
.nav-item.dropdown:hover .custom-dropdown-menu,
.nav-item.dropdown .custom-dropdown-menu.show {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.custom-dropdown-menu {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 190px !important;
  min-width: 190px !important;
  max-width: 190px !important;
  background: rgba(15, 17, 35, 0.95) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  padding: 0.5rem !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
  z-index: 1050;
}

.custom-dropdown-item {
  color: #E2E8F0 !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  height: 42px !important;
  min-height: 42px !important;
  max-height: 42px !important;
  padding: 0 1rem !important;
  margin: 0 !important;
  border: none !important;
  outline: none !important;
  border-radius: 8px !important;
  transition: background-color 0.15s ease, color 0.15s ease;
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  cursor: pointer !important;
  text-decoration: none !important;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  position: relative !important;
  overflow: hidden !important;
  transform: none !important;
  box-shadow: none !important;
}

.custom-dropdown-item i {
  font-size: 1rem !important;
  width: 18px !important;
  min-width: 18px !important;
  max-width: 18px !important;
  text-align: center !important;
  flex-shrink: 0 !important;
  transition: color 0.15s ease;
}

.custom-dropdown-item:hover,
.custom-dropdown-item:active,
.custom-dropdown-item:focus,
.custom-dropdown-item.active {
  background-color: var(--bs-primary) !important;
  color: #FFFFFF !important;
  height: 42px !important;
  min-height: 42px !important;
  max-height: 42px !important;
  padding: 0 1rem !important;
  margin: 0 !important;
  border: none !important;
  outline: none !important;
  width: 100% !important;
  transform: none !important;
  box-shadow: none !important;
}

.custom-dropdown-item:hover i,
.custom-dropdown-item:active i,
.custom-dropdown-item:focus i,
.custom-dropdown-item.active i {
  color: #FFFFFF !important;
}

.welcome-greeting-yellow {
  color: #FACC15;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.hero-main-title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #FFFFFF;
}

@media (max-width: 768px) {
  .hero-main-title {
    font-size: 2.1rem;
  }
  .welcome-greeting-yellow {
    font-size: 1.5rem;
  }
}

.text-light-silver {
  color: #CBD5E1;
  font-size: 1.15rem;
  line-height: 1.6;
}

/* Unified Buttons (ALL Solid Red) */
.btn-primary {
  background-color: var(--bs-primary) !important;
  border: 1px solid var(--bs-primary) !important;
  color: #fcf8f8 !important;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(194, 1, 20, 0.25);
  transition: var(--transition);
}

.btn-primary:hover {
  background-color: var(--primary-hover) !important;
  border-color: var(--primary-hover) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgb(255, 2, 2);
}

/* Universal Card Styling */
.premium-card {
  background: #fcf8f8;
  border: 1px solid #fcf8f8;
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  overflow: hidden;
}

/* Interactive Minor Cards */
.interactive-card {
  background: #fcf8f8;
  border: 1px solid #fcf8f8;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: var(--transition);
  cursor: pointer;
}

.interactive-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
  border-color: #fcf8f8;
}

/* User Name Gradient */
.user-name-gradient {
  background: linear-gradient(135deg, #D90429 0%, #FF2A4B 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

/* Features Badges */
.badge-item {
  background: #fcf8f8;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  border: 1px solid #fcf8f8;
  font-size: 0.85rem;
  color: #fcf8f8;
}

.badge-icon-wrap {
  color: var(--bs-primary);
  font-size: 0.95rem;
  margin-right: 0.4rem;
}

/* Statistics */
.stat-card {
  background: #fcf8f8;
  border: 1px solid #fcf8f8;
  border-radius: 1rem;
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(217, 4, 41, 0.1);
}

.stat-number {
  font-size: 2.8rem;
  letter-spacing: -1px;
  color: var(--bs-primary);
  font-weight: 800;
}

/* Why Donate / Headers */
.title-underline {
  width: 50px;
  height: 4px;
  background: var(--bs-primary);
  border-radius: 4px;
}

/* Footer */
.footer-section {
  background: var(--bg-footer);
}

.copyright-bar {
  border-top: 1px solid rgb(255, 0, 0);
  font-size: 0.8rem;
}

/* Utilities */
.cursor-pointer {
  cursor: pointer;
}


/* Help & FAQ Section */
.help-section-bg {
  position: relative;
  z-index: 1;
  background: url('https://t3.ftcdn.net/jpg/07/83/30/38/360_F_783303809_isfe4vtaV9W5H1Ur6ejUqxLhy0UqcmvT.jpg') center/cover no-repeat;
  border: none !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.help-question-card {
  background: rgba(255, 255, 255, 0.06);
  border: none !important;
  box-shadow: none !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.help-question-card:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateX(5px);
}

.hover-danger-text {
  transition: all 0.2s ease-in-out;
}

.hover-danger-text:hover {
  color: #dc3545 !important;
  transform: translateX(4px);
}
`;
