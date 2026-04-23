// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [db, setDb] = useState({ emps: [], att: [], loaded: false });
  const [ses, setSes] = useState(null);
  const idR = useRef(""); pwR = useRef("");

  useEffect(() => {
    async function load() {
      try {
        const { data: e } = await supabase.from('gits_employees').select('*');
        const { data: a } = await supabase.from('gits_attendance').select('*');
        setDb({ emps: e || [], att: a || [], loaded: true });
      } catch (err) {
        console.error(err);
        setDb(prev => ({ ...prev, loaded: true }));
      }
    }
    load();
  }, []);

  const handleLogin = () => {
    const u = idR.current.trim();
    const p = pwR.current.trim();
    if(u === "admin" && p === "admin123") setSes({role: "a", id: "admin"});
    else {
      const f = db.emps.find(x => x.id === u && x.pwd === p);
      if(f) setSes({role: "e", id: f.id});
      else alert("Invalid Credentials");
    }
  };

  if (!db.loaded) return <div style={{padding:50, textAlign:'center'}}><h2>GATEWAY IT SOLUTIONS</h2><p>Syncing Cloud...</p></div>;

  if (!ses) return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', textAlign: 'center' }}>
      <img src="logo.png" style={{ maxHeight: 60, marginBottom: 20 }} onError={(e) => e.target.style.display='none'} />
      <h1 style={{ color: '#1a1a2e' }}>GATEWAY PORTAL V2.5</h1>
      <div style={{ maxWidth: 320, margin: 'auto', padding: 25, border: '1px solid #ddd', borderRadius: 12, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
        <input style={iS} placeholder="User ID" onChange={e => idR.current = e.target.value} />
        <input style={iS} type="password" placeholder="Password" onChange={e => pwR.current = e.target.value} />
        <button style={bS} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1000, margin: 'auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', borderBottom:'2px solid #1a1a2e', paddingBottom:15 }}>
        <img src="logo.png" style={{ maxHeight: 40 }} />
        <button onClick={() => setSes(null)} style={{cursor:'pointer'}}>Sign Out</button>
      </div>

      <div style={{marginTop:30, padding:20, background:'#f9f9f9', borderRadius:10}}>
          <h3>Welcome, {ses.id === "admin" ? "Administrator" : db.emps.find(e => e.id === ses.id)?.name}</h3>
          <p>Financial Year 2026-27 Active</p>
          
          <table border="1" width="100%" style={{borderCollapse:'collapse', background:'#fff', marginTop:20}}>
            <thead>
              <tr style={{background:'#1a1a2e', color:'#fff'}}>
                <th style={{padding:10}}>Employee Name</th>
                <th>Presents (April 2026+)</th>
                <th>LOP</th>
              </tr>
            </thead>
            <tbody>
              {db.emps.map(e => {
                const f26 = db.att.filter(a => a.emp_id === e.id && new Date(a.date) >= new Date('2026-04-01'));
                return (
                  <tr key={e.id} style={{textAlign:'center'}}>
                    <td style={{padding:10, textAlign:'left'}}>{e.name}</td>
                    <td>{f26.filter(x => ["Present","WFH"].includes(x.status)).length}</td>
                    <td style={{color:'red'}}>{f26.filter(x => x.status === "Absent").length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
}

const iS = { width:'100%', padding:12, marginBottom:10, boxSizing:'border-box', borderRadius:6, border:'1px solid #ccc' };
const bS = { width:'100%', padding:12, background:'#1a1a2e', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontWeight:'bold' };