import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Phone, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login step, simply navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg-gradient)'
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '900px', display: 'flex', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Left Side Branding */}
        <div style={{ flex: 1, background: 'var(--primary)', color: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          {/* subtle background pattern */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
              <Sprout size={36} color="white" />
            </div>
            <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>Smarter Farming Starts Here.</h1>
            <p style={{ opacity: 0.9, fontSize: '1.1rem', lineHeight: 1.6 }}>
              Join CropGenie's community of modern farmers. Get AI recommendations, live market prices, and expert support all in one app.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div style={{ flex: 1, padding: '4rem 3rem', background: 'white' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>Login to access your farm dashboard.</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Mobile Number or Email</label>
              <div style={{ position: 'relative' }}>
                <input type="text" className="input-field" style={{ width: '100%', paddingLeft: '3rem' }} placeholder="Enter mobile or email" required />
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '2rem' }}>
              <label className="input-label">Password or OTP</label>
              <input type="password" className="input-field" style={{ width: '100%' }} placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
              Secure Login
            </button>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
               <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Don't have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Register Now</a></span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
