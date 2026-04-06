import React from 'react';
import { Sprout, Droplets, Bug, Scissors, CheckCircle2, ChevronRight } from 'lucide-react';

export default function MyFarm() {
  const stages = [
    { title: 'Preparation & Sowing', date: 'Completed (Jan 10)', icon: Sprout, status: 'done', tasks: [] },
    { 
      title: 'Vegetative Growth', date: 'Current Stage (Day 20-50)', icon: Droplets, status: 'active', 
      tasks: [
        { name: 'Apply NPK Fertilizer', done: true },
        { name: 'Monitor Soil Moisture', done: false },
        { name: 'Weeding Round 1', done: false }
      ] 
    },
    { title: 'Flowering & Grain Filling', date: 'Upcoming (Mar 1)', icon: Bug, status: 'pending', tasks: [] },
    { title: 'Harvesting', date: 'Upcoming (Apr 15)', icon: Scissors, status: 'pending', tasks: [] },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2>My Farm Tracking</h2>
          <p className="text-muted" style={{ margin: 0 }}>Step-by-step guidance for your active crops.</p>
        </div>
        <button className="btn btn-primary">+ Add New Crop</button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Crop Selector / Overview */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel p-6" style={{ borderLeft: '4px solid var(--primary)', cursor: 'pointer' }}>
            <h3 style={{ margin: 0 }}>Wheat (Durum)</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Planted: Jan 10 • Expected Harvest: Apr 15</p>
            <div style={{ marginTop: '1rem', background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '35%', height: '100%', background: 'var(--primary)' }}></div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', marginTop: '0.5rem' }}>35% Grown</div>
          </div>
          
          <div className="glass-panel p-6" style={{ opacity: 0.6, cursor: 'pointer', transition: 'var(--transition)' }}>
            <h3 style={{ margin: 0 }}>Tomato</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Planted: Feb 5 • Expected Harvest: May 20</p>
          </div>
        </div>

        {/* Timeline View */}
        <div className="glass-panel p-6" style={{ flex: '2 1 500px' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sprout className="text-primary"/> Timeline: Wheat
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {stages.map((stage, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', opacity: stage.status === 'pending' ? 0.5 : 1 }}>
                
                {/* Timeline Line & Icon */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', 
                    background: stage.status === 'done' ? 'var(--primary)' : stage.status === 'active' ? 'white' : '#cbd5e1',
                    border: `2px solid ${stage.status === 'active' ? 'var(--primary)' : 'transparent'}`,
                    color: stage.status === 'done' ? 'white' : stage.status === 'active' ? 'var(--primary)' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
                  }}>
                    {stage.status === 'done' ? <CheckCircle2 size={24} /> : <stage.icon size={20} />}
                  </div>
                  {idx !== stages.length - 1 && (
                    <div style={{ width: '2px', flex: 1, background: stage.status === 'done' ? 'var(--primary)' : '#e2e8f0', margin: '4px 0' }}></div>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: idx !== stages.length - 1 ? '2rem' : '0' }}>
                  <h4 style={{ margin: 0, color: stage.status === 'active' ? 'var(--primary)' : 'var(--text-main)', fontSize: '1.1rem' }}>{stage.title}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{stage.date}</div>
                  
                  {stage.tasks.length > 0 && (
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <h5 style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>Action Items:</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {stage.tasks.map((task, tIdx) => (
                          <div key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                            <input type="checkbox" defaultChecked={task.done} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }} />
                            <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'var(--text-muted)' : 'var(--text-main)' }}>{task.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
