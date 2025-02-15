import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">StepIn</div>
          <p className="footer-description">
            Connecting students with meaningful volunteer opportunities through council-led programs. Join us in making a difference in our college community.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Programs</h3>
          <div className="footer-links">
            <a href="/ongoing-programs" className="footer-link">Current Programs</a>
            <a href="/achievements" className="footer-link">Past Events</a>
            <a href="/council-members" className="footer-link">Council Directory</a>
            <a href="/join-council" className="footer-link">Join Council</a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">For Students</h3>
          <div className="footer-links">
            <a href="/how-to-join" className="footer-link">How to Participate</a>
            <a href="/certificates" className="footer-link">Certificates</a>
            <a href="/volunteer-hours" className="footer-link">Track Hours</a>
            <a href="/guidelines" className="footer-link">Program Guidelines</a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Council</h3>
          <div className="footer-contact-info">
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Student Council Office: Ext. 1234</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>marian@college.org</span>
            </div>
            <div className="contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Student Council Office, Main Building</span>
            </div>
          </div>
          <div className="social-links">
            <a href="/college-instagram" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="/college-whatsapp" className="social-link" aria-label="WhatsApp Group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a href="/telegram-channel" className="social-link" aria-label="Telegram Channel">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.846 1.857 1.497 4.322 2.366 6.12.238.403.527.78 1.232.503.527-.206.993-.603 1.533-.973.143-.167.276-.356.395-.561.105-.186.215-.37.332-.545.762-1.69 1.521-3.381 2.28-5.072l.028-.067.008-.019 4.436-1.535c.742-.233 1.069-.587 1.069-.923-.013-.898-.195-1.724-.462-2.392-.527-1.292-1.376-1.954-1.168-2.375.217-.433 1.223-.663 2.156-.854 2.843-.629 6.241-1.784 6.241-1.784s.321-.224-.015-.473c-.345-.25-.821-.383-1.327-.484z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Student Council Volunteer Programs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;