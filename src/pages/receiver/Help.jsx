import { HelpCircle, Mail, Phone } from 'lucide-react';

const Help = () => {
  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>Help & Support</h3>
        <p>Find answers to common questions or contact our support team.</p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Frequently Asked Questions</h4>
        
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          {[
            { q: 'How do I request blood?', a: 'Navigate to the "Send Request" page, fill out the required details including hospital information and urgency, and submit the form.' },
            { q: 'How do I find a specific donor?', a: 'Use the "Search Donors" page to filter donors by blood group, location, and availability.' },
            { q: 'What happens when a donor accepts my request?', a: 'You will receive a notification, and the request status will change to "Accepted" in your "My Requests" tab. The donor\'s contact details will be shared with you.' }
          ].map((faq, idx) => (
            <div key={idx} style={{ padding: '16px', borderBottom: idx < 2 ? '1px solid var(--border-color)' : 'none' }}>
              <h5 style={{ fontSize: '15px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={16} color="var(--primary)" /> {faq.q}
              </h5>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', paddingLeft: '24px' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '18px' }}>Contact Support</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <Phone size={24} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
            <h5 style={{ marginBottom: '4px' }}>Call Us</h5>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>1800-123-4567</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <Mail size={24} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
            <h5 style={{ marginBottom: '4px' }}>Email Us</h5>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>support@hemolink.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
