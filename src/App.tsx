// @ts-nocheck
import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [db, setDb] = useState({ emps: [], loaded: false });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('gits_employees').select('id, name, pwd');
      setDb({ emps: data || [], loaded: true });
    }
    load();
  }, []);

  if (!db.loaded) return <div style={{padding:50, textAlign:'center'}}>Connecting to Gateway IT...</div>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', textAlign: 'center' }}>
      <img src="logo.png" style={{ maxHeight: 60, marginBottom: 20 }} onError={(e) => e.target.style.display='none'} />
      <h1 style={{color: '#1a1a2e'}}>GATEWAY PORTAL V2</h1>
      <div style={{ maxWidth: 300, margin: 'auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <input style={{width:'100%', padding:10, marginBottom:10}} placeholder="User ID" />
        <input style={{width:'100%', padding:10, marginBottom:10}} type="password" placeholder="Password" />
        <button style={{width:'100%', padding:10, background:'#1a1a2e', color:'#fff', border:'none'}}>Login</button>
      </div>
      <p style={{marginTop:20, color:'#666'}}>If you see this, the connection is stable.</p>
    </div>
  );
}