import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Leaf, Microscope, Sprout, LineChart, Headset, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Farmer Ramesh';
  const initial = userName.charAt(0).toUpperCase();
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Crop Recommendation', path: '/crop-ai', icon: Leaf },
    { name: 'Disease Detection', path: '/disease-ai', icon: Microscope },
    { name: 'My Farm', path: '/my-farm', icon: Sprout },
    { name: 'Market & Finance', path: '/market', icon: LineChart },
    { name: 'Support', path: '/support', icon: Headset },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40,
          }}
        />
      )}

      <aside style={{
        position: 'fixed',
        left: isOpen || window.innerWidth > 768 ? 0 : '-100%',
        top: 0,
        height: '100vh',
        width: 'var(--sidebar-width)',
        background: 'var(--panel-bg)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid var(--border-color)',
        zIndex: 50,
        transition: 'var(--transition)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Sprout size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--primary)' }}>CropGenie</h2>
          </div>
          {window.innerWidth <= 768 && (
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
          )}
        </div>

        <nav style={{ padding: '1rem', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', paddingLeft: '1rem' }}>Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth <= 768 && setIsOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                marginBottom: '0.5rem',
                transition: 'var(--transition)'
              })}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
          {showProfile && (
            <div className="animate-fade-in" style={{ position: 'absolute', bottom: '100%', left: '1rem', right: '1rem', background: '#fff', borderRadius: '12px', padding: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginBottom: '0.5rem', zIndex: 100, border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Profile Menu</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><button onClick={() => { setShowProfile(false); navigate('/my-farm'); }} style={{ background:'none',border:'none',textAlign:'left',width:'100%',padding:'0.25rem 0',color: 'var(--text-main)', fontSize: '0.9rem', cursor:'pointer' }}>Edit Farm Details</button></li>
                <li><button onClick={() => { setShowProfile(false); alert('Premium plans are coming soon! Stay tuned.'); }} style={{ background:'none',border:'none',textAlign:'left',width:'100%',padding:'0.25rem 0',color: 'var(--text-main)', fontSize: '0.9rem', cursor:'pointer' }}>Upgrade to Premium</button></li>
                <li><button onClick={() => { setShowProfile(false); navigate('/login'); }} style={{ background:'none',border:'none',textAlign:'left',width:'100%',color: 'var(--danger)', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', cursor:'pointer' }}>Log Out</button></li>
              </ul>
            </div>
          )}
          <button 
            onClick={() => setShowProfile(!showProfile)}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', background: showProfile ? 'rgba(0,0,0,0.03)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.5rem', borderRadius: '12px', transition: 'var(--transition)' }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, { background: 'rgba(0,0,0,0.05)' })}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: showProfile ? 'rgba(0,0,0,0.03)' : 'transparent' })}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'var(--secondary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <strong style={{ color: 'var(--secondary-hover)' }}>{initial}</strong>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{userName}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Free Plan</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

