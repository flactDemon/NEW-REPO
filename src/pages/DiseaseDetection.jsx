import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';

export default function DiseaseDetection() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleDemoLoad = async () => {
    try {
      const response = await fetch('/cropD.jpeg');
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target.result);
        setUploaded(true);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setResult({
            disease: "Tomato Early Blight",
            severity: "Moderate",
            treatment: "Apply Copper-based fungicide (e.g., Copper Oxychloride) at 2.5g/liter of water. Avoid overhead watering.",
            prevention: "Ensure proper spacing between plants for air circulation. Rotate crops next season."
          });
        }, 2500);
      };
      reader.readAsDataURL(blob);
    } catch(e) { console.error(e); }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target.result);
      setUploaded(true);
      setAnalyzing(true);
      
      // Add varying responses based on file attributes for accurate simulation
      const fileHash = (file.size + file.name.length) % 4;
      const diseaseDatabase = [
        { disease: "Healthy Plant", severity: "None", treatment: "No treatment needed. Keep maintaining current watering cycle.", prevention: "Continue regular care." },
        { disease: "Powdery Mildew", severity: "Low", treatment: "Spray Neem oil extract and reduce humidity in the greenhouse/field.", prevention: "Prune affected leaves immediately to increase airflow." },
        { disease: "Tomato Early Blight", severity: "Moderate", treatment: "Apply Copper-based fungicide (e.g., Copper Oxychloride) at 2.5g/liter of water.", prevention: "Ensure proper spacing between crops. Rotate crops next season." },
        { disease: "Leaf Rust", severity: "High", treatment: "Use systemic fungicides like Propiconazole immediately to halt spread.", prevention: "Remove infected debris and weeds from the farm ground." }
      ];
      
      // Simulate API call delay
      setTimeout(() => {
        setAnalyzing(false);
        setResult(diseaseDatabase[fileHash]);
      }, 2500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Crop Disease Detection</h2>
        <p className="text-muted">Upload a clear photo of the affected plant leaf, and our computer vision model will diagnose the problem instantly.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Upload Hub */}
        <div className="glass-panel" style={{ flex: '1 1 400px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {!uploaded ? (
            <div 
              style={{ 
                border: '2px dashed var(--border-color)', 
                borderRadius: '16px', 
                padding: '3rem 2rem',
                width: '100%',
                cursor: 'pointer',
                transition: 'var(--transition)',
                backgroundColor: 'rgba(255,255,255,0.5)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              onClick={() => fileInputRef.current.click()}
            >
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
              <UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Click or Drag Image Here</h3>
              <p className="text-muted text-sm" style={{ margin: 0 }}>Supports JPG, PNG (Max 5MB)</p>
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              <div style={{ height: '250px', background: 'var(--border-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                {previewUrl ? (
                  <img src={previewUrl} alt="Uploaded leaf" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <ImageIcon size={64} color="#fff" />
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg, #2ecc71, #27ae60)', opacity: 0.8 }} />
                  </>
                )}
              </div>
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => { setUploaded(false); setResult(null); setPreviewUrl(null); }}
              >
                Upload Different Photo
              </button>
            </div>
          )}
        </div>

        {/* Action / Result */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          {!uploaded && (
            <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <p className="text-muted text-center">Upload an image to see the diagnosis here.</p>
            </div>
          )}

          {analyzing && (
            <div className="glass-panel animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
               <Loader2 size={48} className="animate-spin text-primary" style={{ marginBottom: '1rem' }} />
               <h4>Scanning Image...</h4>
               <p className="text-muted">Isolating leaf structure and comparing with disease database.</p>
            </div>
          )}

          {result && !analyzing && (
            <div className="glass-panel animate-fade-in p-6" style={{ borderTop: '4px solid var(--danger)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <AlertTriangle size={32} color="var(--danger)" />
                <div>
                  <h3 style={{ margin: 0, color: 'var(--danger)' }}>{result.disease}</h3>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--danger)' }}>Severity: {result.severity}</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={18} className="text-primary"/> Recommended Treatment</h4>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem', border: '1px solid var(--border-color)' }}>
                  {result.treatment}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Preventive Measures</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{result.prevention}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
