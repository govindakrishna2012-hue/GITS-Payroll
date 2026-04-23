// @ts-nocheck
import React, { useState, useMemo, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// Verified Direct Connection
const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

const MS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const f$ = n => Math.round(n||0).toLocaleString("en-IN");
const fyL = y => `${parseInt(y||0)}-${String(parseInt(y||0)+1).slice(-2)}`;

export default function App() {
  const [db, setDb] = useState({ loaded: false, emps: [], pay: {}, att: {} });
  const [ses, setSes] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [pMo, setPMo] = useState("Apr");
  const idR = useRef(""); pwR = useRef("");

  useEffect(() => {
    async function load() {
      try {
        const { data: e } = await supabase.from('gits_employees').select('*');
        const { data: l } = await supabase.from('gits_ledger').select('*');
        const { data: a } = await supabase.from('gits_attendance').select('*');
        
        const pm = {}; 
        if(l) l.forEach(r => { 
          if(!pm[r.emp_id]) pm[r.emp_id]={}; 
          if(!pm[r.emp_id][r.fy]) pm[r.emp_id][r.fy]=[]; 
          pm[r.emp_id][r.fy].push(r); 
        });

        const am = {};
        if(a) a.forEach(r => { if(!am[r.emp_id]) am[r.emp_id]={}; am[r.emp_id][r.mo] = r; });

        setDb({ loaded: true, emps: e || [], pay: pm, att: am });
      } catch (err) { console.error(err); }
    }
    load();
  }, []);

  const login = () => {
    const u = idR.current.trim(), p = pwR.current.trim();
    if(u === "admin" && p === "admin123") setSes({role:"a", id:"admin"});
    else {
      const found = db.emps.find(x => x.id === u && x.pwd === p);
      if(found) setSes({role:"e", id:found.id}); else alert("Invalid Credentials");
    }
  };

  if (!db.loaded) return <div style={{padding:50, textAlign:'center', fontFamily:'sans-serif'}}><h2>GATEWAY IT SOLUTIONS</h2><p>Syncing Cloud Database...</p></div>;

  if (!ses) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, fontFamily: 'sans-serif' }}>
      <div style={{ width: 320, padding: 40, border: '1px solid #ddd', borderRadius: 12, textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <img src="/logo.png" style={{ maxHeight: 70, marginBottom: 20 }} />
        <h2 style={{ marginTop: 0 }}>PORTAL LOGIN</h2>
        <input style={{ width: '100%', padding: 12, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box' }} placeholder="Employee ID" onChange={e => idR.current = e.target.value} />
        <input style={{ width: '100%', padding: 12, marginBottom: 20, borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box' }} type="password" placeholder="Password" onChange={e => pwR.current = e.target.value} />
        <button style={{ width: '100%', padding: 14, background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }} onClick={login}>Login</button>
      </div>
    </div>
  );

  const myE = db.emps.find(e => e.id === ses.id);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1000, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1a1a2e', paddingBottom: 15 }}>
        <img src="/logo.png" style={{ maxHeight: 50 }} />
        <button onClick={() => setSes(null)} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: 4, border: '1px solid #ddd' }}>Sign Out</button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Welcome, {myE?.name || "Admin"}</h3>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button onClick={() => setTab("dashboard")} style={{ padding: '10px 20px', background: tab === "dashboard" ? "#1a1a2e" : "#fff", color: tab === "dashboard" ? "#fff" : "#000" }}>Dashboard</button>
          <button onClick={() => setTab("payslips")} style={{ padding: '10px 20px', background: tab === "payslips" ? "#1a1a2e" : "#fff", color: tab === "payslips" ? "#fff" : "#000" }}>Payslips</button>
        </div>

        {tab === "dashboard" ? (
          <div style={{ padding: 30, background: '#f9f9f9', borderRadius: 12, border: '1px solid #eee' }}>
            <h4>Profile Info</h4>
            <p><strong>Designation:</strong> {myE?.desig || "Management"}</p>
            <p><strong>Status:</strong> {myE?.status || "Active"}</p>
          </div>
        ) : (
          <div style={{ padding: 30, background: '#f9f9f9', borderRadius: 12, border: '1px solid #eee' }}>
            <h4>Generate PDF Payslip</h4>
            <div style={{ display: 'flex', gap: 10 }}>
              <select onChange={e => setPMo(e.target.value)} style={{ padding: 10 }}>{MS.map(m => <option key={m}>{m}</option>)}</select>
              <button style={{ padding: '10px 20px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 5 }}>Download PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}