import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '@/assets/logo.jpg';
import { getSession, signOut } from './session';
import { HEMOLINK_HOME_THEME_CSS } from './homeThemeCss';
// Bundled by Vite (already project dependencies) instead of a CDN, so this
// works offline and the file hashes/cache same as the rest of the build.
import bootstrapCssUrl from 'bootstrap/dist/css/bootstrap.min.css?url';
import bootstrapIconsCssUrl from 'bootstrap-icons/font/bootstrap-icons.css?url';

// This page ships its own design system (Bootstrap 5 + Bootstrap Icons +
// a custom theme). The rest of the app uses Tailwind, so we load these
// assets only while Home is mounted and remove them on unmount — that
// way nothing here ever changes the look of any other page (no format
// change, no class-name collisions/overlap with Tailwind's own
// `.container` etc. elsewhere in the app).
function useScopedHomeStyles() {
  useEffect(() => {
    const created = [];

    const addLink = (href, id) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      created.push(link);
    };

    addLink(bootstrapCssUrl, 'hemolink-home-bootstrap-css');
    addLink(bootstrapIconsCssUrl, 'hemolink-home-bootstrap-icons-css');
    addLink(
      'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      'hemolink-home-fonts'
    );

    let themeStyle = document.getElementById('hemolink-home-theme-css');
    if (!themeStyle) {
      themeStyle = document.createElement('style');
      themeStyle.id = 'hemolink-home-theme-css';
      themeStyle.textContent = HEMOLINK_HOME_THEME_CSS;
      document.head.appendChild(themeStyle);
      created.push(themeStyle);
    }

    return () => {
      created.forEach((el) => el.remove());
    };
  }, []);
}

// Custom Hook for Animated Counter
const useAnimatedCounter = (endValue, duration = 2200, trigger = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * endValue));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration, trigger]);

  return count;
};

// Image Logo
const LogoSVG = ({ isRefreshing }) => (
  <div className={`d-flex align-items-center justify-content-center ${isRefreshing ? 'waving-hand' : ''}`} style={{ height: '55px' }}>
    <img src={logoImg} alt="Hemolink Logo" style={{ height: '100%', width: 'auto', borderRadius: '8px' }} />
  </div>
);

export default function Home() {
  useScopedHomeStyles();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);

  // Real logged-in user (same session used across the rest of the app),
  // instead of the placeholder profile the design template shipped with.
  const userName = getSession()?.name || 'User';

  const handleLogout = () => {
    signOut();
    navigate('/Login');
  };

  const [statsData, setStatsData] = useState({
    registeredDonors: 2845,
    bloodRequests: 1560,
    bloodBanks: 58
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Scroll reveal visibility flags
  const [statsVisible, setStatsVisible] = useState(false);
  const [revealInfoSection, setRevealInfoSection] = useState(false);
  const [revealWhySection, setRevealWhySection] = useState(false);
  const [revealCampsSection, setRevealCampsSection] = useState(false);

  const [pageLoading, setPageLoading] = useState(false);

  const [selectedFaq, setSelectedFaq] = useState(null);
  const [revealHelpSection, setRevealHelpSection] = useState(false);

  const faqList = [
    {
      id: 1,
      question: "How do I request blood?",
      answer:
        "Submit a blood request by providing patient and blood requirement details.",
      details: [
        "Go to the Request Blood page",
        "Fill in patient information",
        "Select blood group",
        "Submit your request"
      ]
    },
    {
      id: 2,
      question: "How to Search Blood",
      answer: "To search for blood donors or blood banks near you, click on 'Find Donors' or 'Blood Banks' from the top navigation bar. You can filter donors by blood group, state, and city to connect instantly.",
      details: [
        "Location-based donor search engine",
        "Filter by specific blood groups (A+, O-, AB+, etc.)",
        "Direct contact options with verified donors",
        "Real-time blood bank inventory availability"
      ]
    },
    {
      id: 3,
      question: "Eligibility for Donors",
      answer: "Any healthy individual between 18 and 65 years of age, weighing at least 45 kg, with a normal pulse, blood pressure, and hemoglobin level (minimum 12.5 g/dL) can donate blood safely.",
      details: [
        "Age between 18 and 65 years",
        "Weight at least 45 kg",
        "Hemoglobin level >= 12.5 g/dL",
        "Interval: 90 days for men, 120 days for women"
      ]
    },
    {
      id: 4,
      question: "FAQs",
      answer: "Is blood donation safe? Yes, blood donation is 100% safe. Single-use, sterile disposable needles and equipment are used for every donor under qualified medical supervision.",
      details: [
        "100% sterile disposable equipment used",
        "Free health checkup conducted prior to donation",
        "Body restores lost fluid volume within 24-48 hours",
        "Donation process takes only 8-10 minutes"
      ]
    },
    {
      id: 5,
      question: "How long does the donation process take?",
      answer: "The blood donation itself takes only 8 to 10 minutes. The entire registration, health screening, mini-physical check, and post-donation refreshment take approximately 30 to 45 minutes.",
      details: [
        "Registration & Form filling: ~10 mins",
        "Mini Health Screening & Hb test: ~10 mins",
        "Blood Extraction: 8-10 mins",
        "Rest & Refreshments: ~15 mins"
      ]
    },
    {
      id: 6,
      question: "What are the eligibility criteria for blood donation?",
      answer: "Donors must be in good general health, free from acute illnesses (cold, flu, fever), not taking antibiotics, and must meet iron/hemoglobin thresholds.",
      details: [
        "Free from cold, flu, or active fever on donation day",
        "No major surgery in the past 6 months",
        "No recent tattoos or body piercings in past 6 months",
        "Not currently taking antibiotics or blood thinners"
      ]
    }
  ];

  const openFaqAnswer = (faq) => {
    setSelectedFaq(faq);
    navigateTo('help-answer');
  };

  const statsRef = useRef(null);
  const infoRef = useRef(null);
  const whyRef = useRef(null);
  const campsRef = useRef(null);
  const helpRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const checkReveal = (ref, setReveal) => {
        if (ref.current && ref.current.getBoundingClientRect().top <= window.innerHeight * 0.9) {
          setReveal(true);
        }
      };

      checkReveal(statsRef, setStatsVisible);
      checkReveal(infoRef, setRevealInfoSection);
      checkReveal(whyRef, setRevealWhySection);
      checkReveal(campsRef, setRevealCampsSection);
      checkReveal(helpRef, setRevealHelpSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const navigateTo = (page, toastMsg, targetRef = null) => {
    if (currentPage === page) {
      if (targetRef) {
        setTimeout(() => {
          if (targetRef.current) targetRef.current.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageLoading(false);
      if (targetRef) {
        setTimeout(() => {
          if (targetRef.current) targetRef.current.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (toastMsg) addToast(toastMsg);
    }, 300);
  };

  const handleLogoClick = () => {
    setIsRefreshing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage('home');
    setTimeout(() => {
      setStatsData({
        registeredDonors: 2845 + Math.floor(Math.random() * 6),
        bloodRequests: 1560 + Math.floor(Math.random() * 4),
        bloodBanks: 58
      });
      setIsRefreshing(false);
      addToast('Data reloaded successfully! 🩸');
    }, 600);
  };

  const handleRippleClick = (e, callback) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    const existingRipple = btn.getElementsByClassName('ripple')[0];
    if (existingRipple) existingRipple.remove();
    btn.appendChild(circle);
    if (callback) callback();
  };

  const donorCount = useAnimatedCounter(statsData.registeredDonors, 2200, statsVisible);
  const requestCount = useAnimatedCounter(statsData.bloodRequests, 2200, statsVisible);
  const bankCount = useAnimatedCounter(statsData.bloodBanks, 1800, statsVisible);

  const handleBackClick = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
    } else {
      navigate('/select-role');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 w-100">

      {/* Toast Alert Stack */}
      <div className="toast-container position-fixed d-flex flex-column gap-2" style={{ top: '90px', right: '20px', zIndex: 1100, pointerEvents: 'none' }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="toast show align-items-center bg-white border-0 shadow-sm rounded-3" role="alert" aria-live="assertive" aria-atomic="true" style={{ pointerEvents: 'auto' }}>
            <div className="d-flex p-3">
              <i className="bi bi-check-circle-fill text-primary fs-5 me-2"></i>
              <div className="toast-body p-0 fw-bold text-dark">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* HERO HEADER WRAPPER (NAVBAR + WELCOME HERO SECTION) */}
      <div className="hero-header-section">
        {/* NAVBAR */}
        <nav className={`navbar navbar-expand-md custom-navbar sticky-top ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container py-2">

            {/* Logo Left */}
            <div className="navbar-brand d-flex align-items-center cursor-pointer gap-2" onClick={handleLogoClick}>
              <LogoSVG isRefreshing={isRefreshing} />
              <div className="d-flex flex-column justify-content-center">
                <span className="brand-title fw-bolder lh-1">Hemolink</span>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
              <i className="bi bi-list fs-2 text-white"></i>
            </button>

            {/* Right Actions & Links */}
            <div className="collapse navbar-collapse" id="navbarContent">
              <ul className="navbar-nav ms-auto mb-2 mb-md-0 d-flex gap-md-2 align-items-md-center">
                <li className="nav-item">
                  <span className={`nav-link custom-nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={(e) => handleRippleClick(e, () => navigateTo('home'))}>Home</span>
                </li>
                <li className="nav-item">
                  <span className={`nav-link custom-nav-link ${currentPage === 'about' ? 'active' : ''}`} onClick={(e) => handleRippleClick(e, () => navigateTo('about'))}>About Us</span>
                </li>
                <li className="nav-item">
                  <span className={`nav-link custom-nav-link ${currentPage === 'contact' ? 'active' : ''}`} onClick={(e) => handleRippleClick(e, () => navigateTo('contact'))}>Contact Us</span>
                </li>
                <li className="nav-item">
                  <span className={`nav-link custom-nav-link ${currentPage === 'help' ? 'active' : ''}`} onClick={(e) => handleRippleClick(e, () => navigateTo('help'))}>Help</span>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link custom-nav-link">Profile</Link>
                </li>
                <li className="nav-item ms-md-2 mt-2 mt-md-0 d-flex gap-2">
                  <Link to="/select-role" className="btn btn-outline-light rounded-pill d-flex align-items-center justify-content-center gap-2 btn-ripple px-4 py-2">
                    <i className="bi bi-person-fill fs-5"></i> {userName}
                  </Link>
                  <button className="btn btn-outline-light rounded-pill d-flex align-items-center justify-content-center gap-2 btn-ripple px-3 py-2" onClick={handleLogout} title="Logout">
                    <i className="bi bi-box-arrow-right fs-5"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* WELCOME HERO SECTION (Centered content with background image) */}
        {currentPage === 'home' && (
          <div className="container py-4">
            <div className="text-start mb-2">
              <button 
                className="btn btn-outline-light rounded-pill btn-ripple px-3 py-1 fw-bold d-inline-flex align-items-center gap-1"
                onClick={handleBackClick}
              >
                <i className="bi bi-chevron-left"></i> Back
              </button>
            </div>

            <div className="text-center py-2">
              <div className="welcome-greeting-yellow mb-2 fade-in-up">
                Welcome to <span style={{ color: '#dc3545', fontWeight: '700' }}>Hemolink</span>, {userName}! <span className="waving-hand ms-1">👋</span>
              </div>

              <h1 className="hero-main-title text-white fw-bold mb-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
                A Bridge Between Heroes and Hope
              </h1>

              <p className="text-light-silver mx-auto mb-4 fade-in-up" style={{ animationDelay: '0.2s', maxWidth: '650px' }}>
                Your donation can save someone's life. <br />
                Thank you for being a part of Hemolink.
              </p>

              <Link
                to="/select-role"
                className="btn btn-primary btn-lg rounded-pill btn-ripple px-5 py-3 fw-bolder fade-in-up d-inline-flex align-items-center gap-2"
                style={{ animationDelay: '0.3s' }}
              >
                Choose Your Role <i className="bi bi-arrow-right-circle-fill"></i>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 position-relative py-3">
        {pageLoading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center loading-overlay z-3 rounded-4">
            <div className="text-center">
              <LogoSVG isRefreshing={true} />
              <p className="mt-2 fw-bolder text-primary">Loading...</p>
            </div>
          </div>
        )}

        <div className="container d-flex flex-column gap-3">

          {currentPage === 'home' ? (
            <>

              {/* STATISTICS SECTION */}
              <div ref={statsRef} className={`premium-card p-4 p-md-5 ${statsVisible ? 'fade-in-up' : 'opacity-0'}`}>
                <div className="row g-4 justify-content-center text-center">

                  <div className="col-lg-6 col-md-6">
                    <div className="stat-card p-4">
                      <i className="bi bi-people-fill fs-1 text-primary opacity-75 mb-2"></i>
                      <h2 className="stat-number mb-0">{donorCount.toLocaleString()}+</h2>
                      <span className="text-dark fw-bold fs-6">Registered Donors</span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="stat-card p-4">
                      <i className="bi bi-droplet-fill fs-1 text-primary opacity-75 mb-2"></i>
                      <h2 className="stat-number mb-0">{requestCount.toLocaleString()}+</h2>
                      <span className="text-dark fw-bold fs-6">Blood Requests</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* HOW HEMOLINK WORKS SECTION */}
              <div ref={infoRef} className={`premium-card p-4 p-md-5 ${revealInfoSection ? 'fade-in-up' : 'opacity-0'}`}>
                <div className="text-center mb-5">
                  <h3 className="fw-bolder mb-2">How Hemolink Works</h3>
                  <div className="title-underline mx-auto"></div>
                </div>

                <div className="row g-4 justify-content-center text-center">
                  <div className="col-lg-3 col-md-6">
                    <div className="p-3">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-link-45deg fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Connecting Donors</h6>
                      <p className="text-muted fw-bold small mb-0">Bridging the gap between voluntary donors and recipients in need.</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="p-3">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-heart-pulse-fill fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Saving Lives</h6>
                      <p className="text-muted fw-bold small mb-0">Helping save lives through timely and efficient blood donations.</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="p-3">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-search fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Easy Search</h6>
                      <p className="text-muted fw-bold small mb-0">Seamlessly search for verified donors and nearby blood banks.</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="p-3">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-shield-lock-fill fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Secure Platform</h6>
                      <p className="text-muted fw-bold small mb-0">A highly secure and verified platform protecting your privacy.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHY DONATE BLOOD SECTION */}
              <div ref={whyRef} className={`premium-card p-4 p-md-5 ${revealWhySection ? 'fade-in-up' : 'opacity-0'}`}>
                <div className="text-center mb-5">
                  <h3 className="fw-bolder mb-2">Why Donate Blood?</h3>
                  <div className="title-underline mx-auto"></div>
                </div>

                <div className="row justify-content-center g-4 text-center">
                  <div className="col-lg-3 col-md-6">
                    <div className="interactive-card p-4 h-100">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-activity fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Save Lives</h6>
                      <p className="text-muted fw-bold small mb-0">Your single blood donation can save up to 3 lives.</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="interactive-card p-4 h-100">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-shield-check fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Health Benefits</h6>
                      <p className="text-muted fw-bold small mb-0">Reduces harmful iron stores and supports heart health.</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="interactive-card p-4 h-100">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-people-fill fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Community Impact</h6>
                      <p className="text-muted fw-bold small mb-0">Strengthen emergency healthcare infrastructure locally.</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="interactive-card p-4 h-100">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-star-fill fs-3"></i>
                      </div>
                      <h6 className="fw-bolder mb-2">Be a Hero</h6>
                      <p className="text-muted fw-bold small mb-0">A small act of kindness brings hope and life to patients.</p>
                    </div>
                  </div>
                </div>
              </div>

            </>
          ) : currentPage === 'about' ? (
            /* ABOUT US PAGE */
            <div className="premium-card p-4 p-md-5 text-start fade-in-up">
              <div className="text-center mb-5">
                <div className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-3 py-2 fw-bold mb-2">
                  Hemolink Platform
                </div>
                <h2 className="fw-bolder text-dark mb-3">About Us</h2>
                <div className="title-underline mx-auto"></div>
              </div>

              <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: 'rgba(194, 1, 20, 0.04)', borderLeft: '5px solid #C20114' }}>
                <p className="lead fw-semibold text-dark mb-3" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                  The Hemolink is a web-based platform designed to make blood donation more accessible and organized. It provides a common platform for blood donors and recipients to register, create profiles, and connect with each other when blood is needed.
                </p>
                <p className="text-muted fw-bold mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                  Our system aims to simplify the process of finding potential donors and requesting blood, while encouraging people to participate in voluntary blood donation.
                </p>
              </div>

              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="interactive-card p-4 h-100 border-start border-4 border-danger">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <span className="fs-2">🎯</span>
                      <h4 className="fw-bolder mb-0 text-dark">Our Mission</h4>
                    </div>
                    <p className="text-muted fw-bold mb-0" style={{ lineHeight: '1.6' }}>
                      Our mission is to use technology to make the blood donation process simple, convenient, and efficient, helping donors and recipients connect when support is needed.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="interactive-card p-4 h-100 border-start border-4 border-danger">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <span className="fs-2">🌟</span>
                      <h4 className="fw-bolder mb-0 text-dark">Our Vision</h4>
                    </div>
                    <p className="text-muted fw-bold mb-0" style={{ lineHeight: '1.6' }}>
                      Our vision is to create a simple and reliable digital platform that brings blood donors and recipients together, encourages voluntary blood donation, and helps people find support when they need it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span className="fs-2">💡</span>
                  <h4 className="fw-bolder mb-0 text-dark">What Our System Offers</h4>
                </div>
                
                <div className="row g-3">
                  {[
                    { icon: '🩸', title: 'Donor Registration', desc: 'Users can register as blood donors.' },
                    { icon: '👤', title: 'Donor Profile', desc: 'Donors can create and manage their profiles.' },
                    { icon: '🧑🤝🧑', title: 'Recipient Registration', desc: 'People who need blood can register as recipients.' },
                    { icon: '📋', title: 'Recipient Profile', desc: 'Recipients can create and manage their profiles.' },
                    { icon: '🚨', title: 'Blood Requests', desc: 'Recipients can submit requests when blood is required.' },
                    { icon: '🤝', title: 'Donor–Recipient Connection', desc: 'Helps connect recipients with potential blood donors.' },
                    { icon: '📊', title: 'User Information Management', desc: 'Donor and recipient information can be maintained through their respective profiles.' },
                  ].map((item, idx) => (
                    <div key={idx} className="col-md-6 col-lg-4">
                      <div className="p-3 border rounded-3 bg-white h-100 d-flex gap-3 align-items-start shadow-sm">
                        <span className="fs-4 flex-shrink-0">{item.icon}</span>
                        <div>
                          <h6 className="fw-bolder mb-1 text-dark">{item.title}</h6>
                          <p className="text-muted small fw-bold mb-0">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 p-md-5 rounded-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #271111 0%, #3D1818 100%)', border: '1px solid rgba(220, 53, 69, 0.3)' }}>
                <span className="fs-1 d-block mb-2">❤️</span>
                <h3 className="fw-bolder text-white mb-3">Every Drop Matters</h3>
                <p className="text-light-silver mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
                  A single blood donation can make a meaningful difference in someone's life. Through the Smart Blood Donation System, we aim to encourage people to donate blood and make the connection between donors and recipients easier.
                </p>
                <div className="p-3 bg-danger bg-opacity-25 border border-danger rounded-pill d-inline-block px-4">
                  <h5 className="fw-bolder text-white mb-0">Donate Blood. Save Lives. Be Someone's Hope.</h5>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top text-center">
                <button className="btn btn-outline-danger rounded-pill btn-ripple px-4 py-2" onClick={() => navigateTo('home')}>
                  <i className="bi bi-arrow-left me-2"></i> Return to Home
                </button>
              </div>
            </div>
          ) : currentPage === 'contact' ? (
            /* CONTACT US PAGE */
            <div className="premium-card p-4 p-md-5 text-start fade-in-up">
              <div className="text-center mb-5">
                <div className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-3 py-2 fw-bold mb-2">
                  Get In Touch
                </div>
                <h2 className="fw-bolder text-dark mb-3">Contact Us</h2>
                <div className="title-underline mx-auto"></div>
                <p className="text-muted fw-bold mt-3 mx-auto" style={{ maxWidth: '600px' }}>
                  Have questions or need immediate assistance? Connect with the Hemolink team anytime.
                </p>
              </div>

              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="interactive-card p-4 text-center h-100">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-envelope-fill fs-3"></i>
                    </div>
                    <h5 className="fw-bolder mb-2 text-dark">Email Us</h5>
                    <p className="text-muted small fw-bold mb-2">For inquiries & support</p>
                    <a href="mailto:hemolink@gmail.com" className="fw-bolder text-primary fs-6">hemolink@gmail.com</a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="interactive-card p-4 text-center h-100">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-telephone-fill fs-3"></i>
                    </div>
                    <h5 className="fw-bolder mb-2 text-dark">Call Us</h5>
                    <p className="text-muted small fw-bold mb-2">24/7 Helpline Support</p>
                    <a href="tel:+919876543210" className="fw-bolder text-primary fs-6">+91 98765 43210</a>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="interactive-card p-4 text-center h-100">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-geo-alt-fill fs-3"></i>
                    </div>
                    <h5 className="fw-bolder mb-2 text-dark">Location</h5>
                    <p className="text-muted small fw-bold mb-2">Headquarters</p>
                    <span className="fw-bolder text-dark fs-6">Andhra Pradesh, India</span>
                  </div>
                </div>
              </div>

              <div className="p-4 p-md-5 rounded-4 bg-light border">
                <h4 className="fw-bolder mb-4 text-dark"><i className="bi bi-chat-left-dots-fill text-danger me-2"></i> Send Us a Message</h4>
                <form onSubmit={(e) => { e.preventDefault(); addToast('Thank you! Your message has been submitted. 🚀'); }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Your Name</label>
                      <input type="text" className="form-control rounded-3 py-2" placeholder="Enter your full name" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-dark">Email Address</label>
                      <input type="email" className="form-control rounded-3 py-2" placeholder="name@example.com" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-dark">Subject</label>
                      <input type="text" className="form-control rounded-3 py-2" placeholder="How can we help you?" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-dark">Message</label>
                      <textarea className="form-control rounded-3 py-2" rows="4" placeholder="Write your message here..." required></textarea>
                    </div>
                    <div className="col-12 text-end mt-4">
                      <button type="submit" className="btn btn-primary rounded-pill btn-ripple px-5 py-2">
                        <i className="bi bi-send-fill me-2"></i> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-4 pt-3 border-top text-center">
                <button className="btn btn-outline-danger rounded-pill btn-ripple px-4 py-2" onClick={() => navigateTo('home')}>
                  <i className="bi bi-arrow-left me-2"></i> Return to Home
                </button>
              </div>
            </div>
          ) : currentPage === 'help' ? (
            /* HELP PAGE */
            <div className="premium-card p-4 p-md-5 text-start fade-in-up">
              <div className="text-center mb-5">
                <div className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-3 py-2 fw-bold mb-2">
                  Support & Information
                </div>
                <h2 className="fw-bolder text-dark mb-3">Help & Frequently Asked Questions</h2>
                <div className="title-underline mx-auto"></div>
                <p className="text-muted fw-bold mt-3 mx-auto" style={{ maxWidth: '650px' }}>
                  Find answers to common questions about blood donation, registration, and using the Hemolink platform.
                </p>
              </div>

              <div className="row g-4 mb-5">
                {faqList.map((faq) => (
                  <div key={faq.id} className="col-md-6">
                    <div className="interactive-card p-4 h-100 d-flex flex-column justify-content-between border-start border-4 border-danger cursor-pointer" onClick={() => openFaqAnswer(faq)}>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <i className="bi bi-question-circle-fill text-danger fs-5"></i>
                          <span className="badge bg-danger bg-opacity-10 text-danger fw-bold">FAQ #{faq.id}</span>
                        </div>
                        <h5 className="fw-bolder text-dark mb-3">{faq.question}</h5>
                        <p className="text-muted fw-semibold small mb-3" style={{ lineHeight: '1.6' }}>
                          {faq.answer}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-2">
                        <span className="text-primary fw-bold small">Read Full Details</span>
                        <i className="bi bi-arrow-right text-primary fs-5"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-top text-center">
                <button className="btn btn-outline-danger rounded-pill btn-ripple px-4 py-2" onClick={() => navigateTo('home')}>
                  <i className="bi bi-arrow-left me-2"></i> Return to Home
                </button>
              </div>
            </div>
          ) : currentPage === 'help-answer' && selectedFaq ? (
            /* HELP ANSWER DETAILS PAGE */
            <div className="premium-card p-4 p-md-5 text-start fade-in-up">
              <button className="btn btn-outline-danger rounded-pill btn-ripple px-4 py-2 mb-4 d-inline-flex align-items-center gap-2" onClick={() => navigateTo('help')}>
                <i className="bi bi-arrow-left fs-5"></i> Back to Help Questions
              </button>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary text-white rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                  <i className="bi bi-question-lg fs-2"></i>
                </div>
                <div>
                  <span className="badge bg-danger text-white rounded-pill px-3 py-1 fw-bold mb-1">Help & FAQ Answer</span>
                  <h3 className="fw-bolder mb-0 text-dark">{selectedFaq.question}</h3>
                </div>
              </div>

              <hr className="my-4 border-secondary opacity-25" />

              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-3"><i className="bi bi-info-circle-fill text-primary me-2"></i> Detailed Explanation</h5>
                <p className="text-muted fw-semibold fs-6 lh-lg p-3 bg-light rounded-3 border-start border-4 border-danger">
                  {selectedFaq.answer}
                </p>
              </div>

              {selectedFaq.details && (
                <div className="mb-4">
                  <h5 className="fw-bold text-dark mb-3"><i className="bi bi-check-circle-fill text-primary me-2"></i> Key Requirements & Points</h5>
                  <div className="row g-3">
                    {selectedFaq.details.map((point, idx) => (
                      <div key={idx} className="col-md-6">
                        <div className="p-3 border rounded-3 bg-white d-flex align-items-center gap-3">
                          <i className="bi bi-check2-circle text-primary fs-4"></i>
                          <span className="fw-bold text-dark fs-6">{point}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex flex-wrap gap-3 mt-4 pt-3 border-top">
                <button className="btn btn-outline-secondary rounded-pill btn-ripple px-4 py-2" onClick={() => navigateTo('home')}>
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* TEMPORARY PAGES */
            <div className="premium-card p-5 text-center fade-in-up" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                <i className={`bi bi-${currentPage === 'donate' ? 'droplet-fill' : currentPage === 'find-donors' ? 'search' : currentPage === 'blood-banks' ? 'building-fill' : currentPage === 'profile' ? 'person-fill' : 'bell-fill'} fs-2`}></i>
              </div>
              <h3 className="fw-bolder mb-2 text-capitalize">{currentPage.replace('-', ' ')} Page</h3>
              <div className="badge bg-primary text-white rounded-pill px-3 py-2 fw-bolder mb-4 border border-danger border-opacity-10">Coming Soon</div>

              <p className="text-muted fw-bold mb-4">Future functionality will be added here.</p>
              <button className="btn btn-primary rounded-pill btn-ripple px-4 py-2" onClick={(e) => handleRippleClick(e, () => navigateTo('home'))}>
                <i className="bi bi-arrow-left me-2"></i> Return Home
              </button>
            </div>
          )}

        </div>
      </main>

      {/* MERGED FULL-WIDTH RECTANGULAR HELP & FOOTER SECTION */}
      {currentPage === 'home' && (
        <div ref={helpRef} className={`help-section-bg pt-5 pb-4 text-white w-100 ${revealHelpSection ? 'fade-in-up' : 'opacity-0'}`} style={{ borderRadius: 0 }}>
          <div className="container">
            <div className="row g-4 mb-4 text-start">

              {/* COLUMN 1: BRAND LOGO & TAGLINE */}
              <div className="col-lg-3 col-md-6 border-end border-white border-opacity-10 pe-lg-4">
                <div className="d-flex align-items-center gap-2 mb-2 cursor-pointer" onClick={() => navigateTo('home')}>
                  <LogoSVG isRefreshing={false} />
                  <div>
                    <h4 className="fw-bolder mb-0 text-white">Hemolink</h4>
                  </div>
                </div>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#dc3545', margin: '12px 0' }}></div>
                <p className="text-light-silver small fw-semibold lh-base">
                  Hemolink connects voluntary blood donors, recipients and blood banks on one platform. Together, we can save more lives.
                </p>
              </div>

              {/* COLUMN 2: ABOUT US */}
              <div className="col-lg-3 col-md-6 border-end border-white border-opacity-10 px-lg-4">
                <div className="d-flex align-items-center gap-2 mb-2 cursor-pointer hover-danger-text" onClick={() => navigateTo('about')}>
                  <i className="bi bi-people-fill text-danger fs-4"></i>
                  <h5 className="fw-bolder mb-0 text-white text-uppercase">About Us</h5>
                </div>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#dc3545', margin: '12px 0' }}></div>
                <p className="text-light-silver small fw-semibold lh-base cursor-pointer hover-danger-text" onClick={() => navigateTo('about')}>
                  Hemolink is a smart platform that helps connect blood donors, recipients and blood banks to make blood donation simple, fast and accessible for everyone.
                </p>
              </div>

              {/* COLUMN 3: CONTACT US */}
              <div className="col-lg-3 col-md-6 border-end border-white border-opacity-10 px-lg-4">
                <div className="d-flex align-items-center gap-2 mb-2 cursor-pointer hover-danger-text" onClick={() => navigateTo('contact')}>
                  <i className="bi bi-telephone-fill text-danger fs-4"></i>
                  <h5 className="fw-bolder mb-0 text-white text-uppercase">Contact Us</h5>
                </div>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#dc3545', margin: '12px 0' }}></div>
                <ul className="list-unstyled d-flex flex-column gap-2 text-light-silver small fw-semibold mb-0">
                  <li className="d-flex align-items-center gap-2 cursor-pointer hover-danger-text" onClick={() => navigateTo('contact')}>
                    <i className="bi bi-envelope-fill text-danger"></i>
                    <span>hemolink@gmail.com</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 cursor-pointer hover-danger-text" onClick={() => navigateTo('contact')}>
                    <i className="bi bi-telephone-fill text-danger"></i>
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 cursor-pointer hover-danger-text" onClick={() => navigateTo('contact')}>
                    <i className="bi bi-geo-alt-fill text-danger"></i>
                    <span>Andhra Pradesh, India</span>
                  </li>
                </ul>
              </div>

              {/* COLUMN 4: HELP */}
              <div className="col-lg-3 col-md-6 ps-lg-4">
                <div className="d-flex align-items-center gap-2 mb-2 cursor-pointer hover-danger-text" onClick={() => navigateTo('help')}>
                  <i className="bi bi-question-circle-fill text-danger fs-4"></i>
                  <h5 className="fw-bolder mb-0 text-white text-uppercase">Help</h5>
                </div>
                <div style={{ width: '40px', height: '3px', backgroundColor: '#dc3545', margin: '12px 0' }}></div>
                <ul className="list-unstyled d-flex flex-column gap-2 text-light-silver small fw-semibold mb-0">
                  {faqList.slice(0, 4).map((faq) => (
                    <li
                      key={faq.id}
                      className="cursor-pointer hover-danger-text d-flex align-items-center gap-2 transition-all py-1"
                      onClick={() => openFaqAnswer(faq)}
                    >
                      <i className="bi bi-chevron-right text-danger"></i>
                      <span>{faq.question}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* FOOTER MOTTO INSIDE MERGED FOOTER BOX */}
            <div className="text-center py-3 my-2 fw-bolder text-white d-flex align-items-center justify-content-center gap-2 fs-6 border-top border-white border-opacity-10 pt-4">
              <span className="text-danger">❤️</span>
              <span>Every Drop Counts. Donate Blood, Save Lives.</span>
            </div>

            {/* COPYRIGHT BAR INSIDE MERGED FOOTER BOX */}
            <div className="text-center pt-2">
              <span className="text-white opacity-50 fw-bold" style={{ fontSize: '0.85rem' }}>© 2026 Hemolink. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

