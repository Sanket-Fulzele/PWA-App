import React from 'react';
import './Homepage.css';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Hero Banner Component */}
      <HeroBanner />
      
      {/* Features Grid Component */}
      <FeaturesGrid />
      
      {/* Testimonials Carousel */}
      <Testimonials />
      
      {/* Call-to-Action Section */}
      <CallToAction />
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

// Hero Banner Component
const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1>Welcome to Our Platform</h1>
        <p>Discover amazing features that will transform your experience</p>
        <button className="cta-button">Get Started</button>
      </div>
      <div className="hero-image">
        <img src="https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D" alt="Hero illustration" />
      </div>
    </section>
  );
};

// Features Grid Component
const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Lightning fast load times and smooth interactions"
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description: "Enterprise-grade security for your peace of mind"
    },
    {
      icon: "🔄",
      title: "Easy Integration",
      description: "Connect with your favorite tools in minutes"
    },
    {
      icon: "📈",
      title: "Analytics",
      description: "Get actionable insights from your data"
    }
  ];

  return (
    <section className="features-section">
      <h2>Why Choose Us</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "This platform has transformed our workflow. Highly recommended!",
      author: "Jane Smith, CEO at TechCorp"
    },
    {
      quote: "The best solution we've found for our needs. Excellent support too.",
      author: "John Doe, CTO at InnovateCo"
    },
    {
      quote: "Simple to use yet powerful enough for our complex requirements.",
      author: "Sarah Johnson, Director of Operations"
    }
  ];

  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-carousel">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Call-to-Action Component
const CallToAction: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers today</p>
        <div className="cta-buttons">
          <button className="cta-button primary">Sign Up Free</button>
          <button className="cta-button secondary">Schedule Demo</button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>YourLogo</h3>
          <p>© 2023 Your Company. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <h4>Product</h4>
            <ul>
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/integrations">Integrations</a></li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Support</h4>
            <ul>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/status">Status</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Homepage;
