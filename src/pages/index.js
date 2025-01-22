import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ModelComparison from './modelcomparison';

export default function Home() {
  const [f, sF] = useState(null);  // file object
  const [t, sT] = useState('');    // file text content
  const [r, sR] = useState(null);  // LLM-based analysis
  const [m, sM] = useState('');    // status message
  const ro = useRouter();

  const hFS = (e) => {
    sF(e.target.files[0]);
  };

  const hLF = () => {
    if (!f) {
      sM('No file selected.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      sT(ev.target.result);
      sM('File content loaded. Ready to upload to Flask.');
    };
    reader.readAsText(f);
  };

  const hUT = async () => {
    if (!t.trim()) {
      sM('No text in memory. Please load file first.');
      return;
    }
    sM('Uploading text to Flask...');
    try {
      const resp = await fetch('https://crisil.onrender.com/upload_text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: t }),
      });
      const d = await resp.json();
      if (!resp.ok) {
        sM('Error: ' + (d.error || 'unknown'));
      } else {
        sM('Uploaded to Flask successfully!');
      }
    } catch (err) {
      sM('Error: ' + err.message);
    }
  };

  const hAdv = async () => {
    sM('Running advanced pipeline on Flask...');
    try {
      const resp = await fetch('https://crisil.onrender.com/run_advanced_model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const d = await resp.json();
      if (!resp.ok) {
        sM('Error: ' + (d.error || 'unknown'));
      } else {
        sR(d.analysis);
        sM(`Done in ${d.elapsed} seconds.`);
      }
    } catch (err) {
      sM('Error: ' + err.message);
    }
  };

  const downloadAnalysis = async () => {
    try {
      const r = await fetch('https://crisil.onrender.com/download_analysis');
      const blob = await r.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analysis_output.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      sM('Error: ' + err.message);
    }
  };

  const downloadCode = async () => {
    try {
      const r = await fetch('https://crisil.onrender.com/download_code');
      const blob = await r.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_code.py';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      sM('Error: ' + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h1>Advanced Topic Modeling Tool</h1>
      <p>1) Select your .txt file.</p>
      <p>2) "Load File" to read into memory.</p>
      <p>3) "Upload to Flask" to send text to the backend.</p>
      <p>4) "Run Advanced Analysis" for LLM extraction.</p>
      <p>5) Also see "Preprocessed Data" and "Visualize Graph".</p>

      <input type="file" accept=".txt" onChange={hFS} />
      <button onClick={hLF} style={{ marginLeft: 10 }}>Load File</button>
      <button onClick={hUT} style={{ marginLeft: 10 }}>Upload to Flask</button>

      <br /><br />
      <button onClick={hAdv}>Run Advanced Analysis</button>
      <button onClick={() => ro.push('/preprocess')} style={{ marginLeft: 10 }}>Preprocessed Data</button>
      <button onClick={() => ro.push('/visualize')} style={{ marginLeft: 10 }}>Visualize Graph</button>

      <br /><br />
      <button onClick={downloadAnalysis}>Download Analysis</button>
      <button onClick={downloadCode} style={{ marginLeft: 10 }}>Download Code</button>

      <p style={{ color: 'yellow' }}>{m}</p>

      {r && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ color: 'lightgreen' }}>LLM Analysis Output</h3>
          <ModelComparison analysis={r} />
        </div>
      )}
    </div>
  );
}
