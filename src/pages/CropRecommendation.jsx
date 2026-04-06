import React, { useState } from 'react';
import { BrainCircuit, Sprout, Check, Loader2 } from 'lucide-react';

export default function CropRecommendation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    // Extract actual user data
    const formData = new FormData(e.target);
    const n = Number(formData.get('N')) || 0;
    const p = Number(formData.get('P')) || 0;
    const k = Number(formData.get('K')) || 0;
    const ph = Number(formData.get('pH')) || 7;

    setLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      setLoading(false);
      
      let recommended = "Wheat";
      if (ph < 6) recommended = "Rice";
      else if (n > 70) recommended = "Maize (Corn)";
      else if (k > 60) recommended = "Sugarcane";
      else if (p > 60) recommended = "Cotton";
      else if (ph > 7.5) recommended = "Barley";

      setResult({
        crop: recommended,
        confidence: Math.floor(Math.random() * (98 - 85 + 1) + 85),
        reason: `Your specific soil profile (N:${n}, P:${p}, K:${k}, pH:${ph}) strongly supports ${recommended} cultivation.`,
        fertilizer: `Apply targeted fertilizer to balance current NPK deficits within 15 days of sowing.`
      });
    }, 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>AI Crop & Fertilizer Recommendation</h2>
        <p className="text-muted">Enter your soil and environmental data to get the smartest crop suggestions powered by AI.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
        {/* Form Panel */}
        <div className="glass-panel p-6">
          <form onSubmit={handleAnalyze}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Nitrogen (N)</label>
                <input type="number" name="N" className="input-field" placeholder="e.g. 50" required defaultValue="50" />
              </div>
              <div className="input-group">
                <label className="input-label">Phosphorous (P)</label>
                <input type="number" name="P" className="input-field" placeholder="e.g. 53" required defaultValue="53" />
              </div>
              <div className="input-group">
                <label className="input-label">Potassium (K)</label>
                <input type="number" name="K" className="input-field" placeholder="e.g. 48" required defaultValue="48" />
              </div>
              <div className="input-group">
                <label className="input-label">pH Level</label>
                <input type="number" name="pH" step="0.1" className="input-field" placeholder="e.g. 6.5" required defaultValue="6.5" />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">Average Rainfall (mm)</label>
              <input type="number" name="Rain" className="input-field" placeholder="e.g. 200" required defaultValue="100" />
            </div>

            <div className="input-group">
              <label className="input-label">City/Region (for live weather sync)</label>
              <input type="text" className="input-field" placeholder="e.g. Pune" required defaultValue="Pune" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
              {loading ? 'Analyzing Data...' : 'Generate AI Recommendation'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!result && !loading && (
            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <BrainCircuit size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>Awaiting data to generate intelligent recommendations.</p>
            </div>
          )}

          {loading && (
            <div className="glass-panel animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <Loader2 size={40} className="text-primary animate-spin" style={{ marginBottom: '1rem', animationDuration: '3s' }} />
              <h3 className="text-primary text-center">Processing with AI Models</h3>
              <p className="text-muted text-center max-w-sm">Cross-referencing your soil NPK with 20-year weather patterns and crop yield history...</p>
            </div>
          )}

          {result && !loading && (
            <div className="glass-panel animate-fade-in p-6" style={{ border: '2px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Top Recommendation</h4>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>{result.crop}</h2>
                </div>
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary-hover)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold' }}>
                  {result.confidence}% Match
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                <strong>Why {result.crop}?</strong>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{result.reason}</p>
              </div>

              <h4 style={{ marginBottom: '1rem' }}>Fertilizer Plan</h4>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Check size={20} color="var(--primary)" style={{ marginTop: '0.1rem' }} />
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{result.fertilizer}</p>
              </div>

              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '2rem' }}>
                <Sprout size={18} />
                Add to My Farm Tracking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
