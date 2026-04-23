// @ts-nocheck
import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [db, setDb] = useState({ emps: [], att: [], loaded: false });
  const [ses, setSes] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: e } = await supabase.from('gits_employees').select('*');
      const { data: a } = await supabase.from('gits_attendance').select('*');
      setDb({ emps: e || [], att: a || [], loaded: true });
    }
    load();
  }, []);

  if (!db.loaded) return <div style={{padding:50}}>Loading...</div>;

  if (!ses) return (
    <div style={{ padding: 50, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>GITS PORTAL LOGIN</h2>
      <button onClick={() => setSes({role: 'a'})} style={{padding:15, background:'#1a1a2e', color:'#fff'}}>Click to Enter Dashboard</button>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <img src="logo.png" style={{maxHeight: 50}} />
      <h1>Attendance Log</h1>
      <table border="1" width="100%" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#eee'}}><th>Name</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>
          {db.att.map((row, i) => (
            <tr key={i} style={{textAlign:'center'}}>
              <td>{db.emps.find(e => e.id === row.emp_id)?.name || row.emp_id}</td>
              <td>{row.status}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setSes(null)} style={{marginTop:20}}>Sign Out</button>
    </div>
  );
}