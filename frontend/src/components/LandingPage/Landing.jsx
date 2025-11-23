import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Sparkles,
  GraduationCap,
  User,
  ChevronRight,
  Star,
  Trophy,
  Heart,
} from 'lucide-react';

function Langing() {
    const navigate = useNavigate();
    const Login = () => {
        navigate("/login")
    }
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-icon">
              <Sparkles className="icon-white" />
            </div>
            <h1 className="logo-text">Bit Community Hub</h1>
          </div>
          <div className="nav-right">
            <a href="#features">Features</a>
            
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="badge">
            <Star className="icon-blue" />
            <span>Welcome to the Future of Learning</span>
          </div>
          <h1 className="hero-title">
            Connect, Learn, and <span className="highlight">Grow Together</span>
          </h1>
          <p className="hero-subtitle">
            Join our vibrant community where students and teachers collaborate, share knowledge,
            and build the future of education together.
          </p>

          <div className="hero-buttons">
            <button onClick={Login} className="btn student-btn">
              <GraduationCap className="icon-white" />
              Login 
              <ChevronRight />
            </button>
            {/* <button className="btn teacher-btn">
              <User className="icon-white" />
              Login as Teacher
              <ChevronRight />
            </button> */}
          </div>

          <div className="stats ">
            <div className="stat">
              <div className="stat-number blue">5,000+</div>
              <div className="stat-label">Active Students <br/>+ Alumni</div>
            </div>
            {/* <div className="stat">
              <div className="stat-number purple">500+</div>
              <div className="stat-label">Expert Teachers</div>
            </div> */}
            <div className="stat">
              <div className="stat-number pink">4+</div>
              <div className="stat-label">features</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose Bit Community Hub?</h2>
          <p className="features-subtitle">
            Experience a platform designed to foster meaningful connections and accelerate learning
          </p>

          <div className="features-grid">
            <div className="feature-card blue-card">
              <div className="card-icon"><Users className="icon-white" /></div>
              <h3>Collaborative Learning</h3>
              <p>Connect with peers, and learn together in an interactive environment.</p>
            </div>
            <div className="feature-card purple-card">
              <div className="card-icon"><BookOpen className="icon-white" /></div>
              <h3>Rich Resources</h3>
              <p>Provides a platform for students to connect with alumni..</p>
            </div>
            <div className="feature-card pink-card">
              <div className="card-icon"><Trophy className="icon-white" /></div>
              <h3>Hostel / Mess Issue</h3>
              <p> Feature to report problems related to hostel or mess facilities.</p>
            </div>
            <div className="feature-card pink-card">
              <div className="card-icon"><Users className="icon-white" /></div>
              <h3>Find People</h3>
              <p> Allows users to find other students or faculty within the community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <Heart className="cta-icon" />
        <h2>Ready to Transform Your Learning Experience?</h2>
        <p>Join thousands of students and teachers who are already part of our growing community.</p>
        <div className="cta-buttons">
          <button className="btn white-btn">Get Started Today</button>
          <button className="btn outline-btn">Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="logo-icon">
              <Sparkles className="icon-white" />
            </div>
            <span className="logo-text">Bit Community Hub</span>
          </div>
          <div className="footer-right">
            © 2024 Bit Community Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Langing;
