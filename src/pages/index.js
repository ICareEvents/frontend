import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ModelComparison from './modelcomparison';

export default function Home() {
  const [f, sF] = useState(null);  // file object
  const [t, sT] = useState('');    // file text content
  const [r, sR] = useState(null);  // advanced model/LLM results
  const [m, sM] = useState('');    // message for status updates
  const ro = useRouter();

  // 1) Handle file selection
  const hFS = (e) => {
    sF(e.target.files[0]);
  };

  // 2) Load file content into memory
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

  // 3) Upload text to the backend
  const hUT = async () => {
    if (!t.trim()) {
      sM('No text in memory. Please load file first.');
      return;
    }
    sM('Uploading text to Flask...');
    try {
      // Use your actual Flask endpoint on Render
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

  // 4) Run advanced analysis (LLM-based)
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
        sR(d.analysis);  // Store the analysis part
        sM(`Done in ${d.elapsed} seconds.`);
      }
    } catch (err) {
      sM('Error: ' + err.message);
    }
  };
<button onClick={async ()=> {
  const aRes = await fetch('https://crisil.onrender.com/download_analysis');
  const blob = await aRes.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'analysis_output.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}}>
  Download Analysis
</button>

<button onClick={async ()=> {
  const cRes = await fetch('https://crisil.onrender.com/download_code');
  const blob = await cRes.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'generated_code.py';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}}>
  Download Code
</button>

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20, fontFamily: 'Arial' }}>
      <h1>Advanced Topic Modeling Tool</h1>
      <h3>Author: **********</h3>
      <p>
        1) Select your .txt file. <br/>
        2) "Load File" to read into memory. <br/>
        3) "Upload to Flask" to send text to the backend. <br/>
        4) "Run Advanced Analysis" to see LLM-based extraction. <br/>
        5) Also see "Preprocessed Data" and "Visualize Graph" links below.
      </p>

      <input type="file" accept=".txt" onChange={hFS} />
      <button onClick={hLF} style={{ marginLeft: 10 }}>Load File</button>
      <button onClick={hUT} style={{ marginLeft: 10 }}>Upload to Flask</button>

      <br/><br/>
      <button onClick={hAdv}>Run Advanced Analysis</button>
      <button onClick={() => ro.push('/preprocess')} style={{ marginLeft: 10 }}>Preprocessed Data</button>
      <button onClick={() => ro.push('/visualize')} style={{ marginLeft: 10 }}>Visualize Graph</button>

      <p style={{ color: 'yellow' }}>{m}</p>

      {r && (
        <div>
          <h2 style={{ color: 'lightgreen' }}>LLM Analysis</h2>
          <ModelComparison analysis={r} />
        </div>
      )}
    </div>
  );
}

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20, fontFamily: 'Arial' }}>
      <h1>Advanced Topic Modeling Tool</h1>
      <h3>Author: **********</h3>
      <p>
        1) Select your .txt file. <br/>
        2) "Load File" to read into memory. <br/>
        3) "Upload to Flask" to send text to the backend. <br/>
        4) "Run Advanced Analysis" to see the LLM-based extraction. <br/>
        5) Also see "Preprocessed Data" and "Visualize Graph" links below.
      </p>

      <input type="file" accept=".txt" onChange={hFS} />
      <button onClick={hLF} style={{ marginLeft: 10 }}>Load File</button>
      <button onClick={hUT} style={{ marginLeft: 10 }}>Upload to Flask</button>

      <br/><br/>
      <button onClick={hAdv}>Run Advanced Analysis</button>
      <button onClick={() => ro.push('/preprocess')} style={{ marginLeft: 10 }}>Preprocessed Data</button>
      <button onClick={() => ro.push('/visualize')} style={{ marginLeft: 10 }}>Visualize Graph</button>

      <p style={{ color: 'yellow' }}>{m}</p>
      {r && <ModelComparison analysis={r} />}
    </div>
  );
}
