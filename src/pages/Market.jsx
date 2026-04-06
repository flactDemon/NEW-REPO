import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Info } from 'lucide-react';

export default function Market() {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    fetch('/api/market')
      .then(res => res.json())
      .then(data => setMarketData(data))
      .catch(err => console.error("Failed to fetch market data", err));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Market & Finance</h2>
        <p className="text-muted">Track real-time crop prices, estimate profits, and manage your expenses.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Live Market Prices */}
        <div className="glass-panel" style={{ flex: '1 1 500px', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Live Mandi Prices</h3>
            <span style={{ fontSize: '0.8rem', background: '#e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Updated 10 mins ago</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Crop Commodity</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Mandi Price</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Trend 24h</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.crop}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)' }}>{item.currentPrice}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
                      background: item.trend === 'up' ? 'var(--primary-light)' : 'var(--danger-light)',
                      color: item.trend === 'up' ? 'var(--primary-hover)' : 'var(--danger)'
                    }}>
                      {item.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {item.change}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expense Tracker Widget */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel p-6">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign className="text-secondary" /> Profit Estimator</h3>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Estimated Wheat Yield Value</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', margin: '0.5rem 0' }}>₹1,45,000</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Based on current Mandi rates for 60 quintals</div>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }}>Calculate New Yield</button>
          </div>

          <div className="glass-panel p-6">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><PieChart className="text-primary" /> Month Expenses</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Seeds & Fertilizers</span> <strong>₹12,400</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Labor</span> <strong>₹8,000</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Machinery Draft</span> <strong>₹4,500</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.5rem', fontWeight: 700 }}>
                <span>Total</span> <span style={{ color: 'var(--danger)' }}>₹24,900</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
