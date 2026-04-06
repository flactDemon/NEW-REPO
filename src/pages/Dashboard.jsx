import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Thermometer, Droplets, Activity, AlertCircle, CheckCircle2, Edit2 } from 'lucide-react';

export default function Dashboard() {
  const [location, setLocation] = useState('Pune, MH');
  const [editingLoc, setEditingLoc] = useState(false);
  const [weather, setWeather] = useState({ temp: 24, condition: 'Light Rain', humidity: 78, tomorrow: 28, day3: 23, day4: 29 });

  // Fetch real weather data when location changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (err) {
        console.error("Failed to fetch weather data", err);
      }
    };
    fetchWeather();
  }, [location]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Farm Overview</h2>
        <span style={{ color: 'var(--text-muted)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Weather Widget */}
        <div className="glass-panel p-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Weather Forecast</h3>
            {editingLoc ? (
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                onBlur={() => setEditingLoc(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingLoc(false)}
                autoFocus
                style={{ padding: '0.2rem 0.5rem', borderRadius: '8px', border: '1px solid var(--primary)', outline: 'none', width: '120px' }}
              />
            ) : (
              <span 
                onClick={() => setEditingLoc(true)}
                style={{ background: 'var(--primary-light)', color: 'var(--primary-hover)', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                title="Click to change location"
              >
                {location} <Edit2 size={12} />
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {weather.condition.includes('Rain') || weather.condition.includes('Storm') ? <CloudRain size={48} color="var(--primary)" /> : 
             weather.condition.includes('Sun') || weather.condition.includes('Clear') ? <Sun size={48} color="var(--secondary)" /> : 
             <Cloud size={48} color="#94a3b8" />}
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>{weather.temp}°C</div>
              <div style={{ color: 'var(--text-muted)' }}>{weather.condition} • Humidity: {weather.humidity}%</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Tomorrow</div>
              <Sun size={24} color="var(--secondary)" style={{ margin: '0 auto' }} />
              <div style={{ fontWeight: 600 }}>{weather.tomorrow}°C</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Day 3</div>
              <CloudRain size={24} color="var(--primary)" style={{ margin: '0 auto' }} />
              <div style={{ fontWeight: 600 }}>{weather.day3}°C</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Day 4</div>
              <Sun size={24} color="var(--secondary)" style={{ margin: '0 auto' }} />
              <div style={{ fontWeight: 600 }}>{weather.day4}°C</div>
            </div>
          </div>
        </div>

        {/* Reminders Widget */}
        <div className="glass-panel p-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Today's Tasks</h3>
            <span style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>2 Pending</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--secondary)' }}><AlertCircle size={24} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Apply UREA Fertilizer</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Wheat Crop • Field A • Evening</div>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '8px' }}><CheckCircle2 size={16} /></button>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--primary)' }}><Droplets size={24} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Irrigation Required</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tomato Crop • Field C • By 4 PM</div>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '8px' }}><CheckCircle2 size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="mb-4">Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <button className="glass-panel p-6" style={{ border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'var(--transition)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Thermometer size={24} />
          </div>
          <h4 style={{ margin: 0 }}>Check Soil Health</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, marginTop: '0.5rem' }}>Upload NPK values for analysis</p>
        </button>
        
        <button className="glass-panel p-6" style={{ border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'var(--transition)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Activity size={24} />
          </div>
          <h4 style={{ margin: 0 }}>Market Prices</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, marginTop: '0.5rem' }}>Live rates for your crops</p>
        </button>
      </div>
    </div>
  );
}
