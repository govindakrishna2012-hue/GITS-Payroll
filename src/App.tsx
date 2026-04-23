// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [db, setDb] = useState({ loaded: false, emps: [], att: [] });
  const [ses, setSes] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [sub, setSub] = useState("daily");
  const [selDate, setSelDate] = useState("2026-04-24");
  
  const idR = useRef(""); pwR = useRef("");

  useEffect(() => {
    async function load() {
      try {
        const { data: e } = await supabase.from('gits_employees').select('*');
        const { data: a } = await supabase.from('gits_attendance').select('*');
        setDb({ loaded: true, emps: e || [], att: a || [] });
      } catch (err) { console.error(err); }
    }
    load();
  }, []);

  if (!db.loaded) return <div style={{padding:20}}>Loading Gateway Portal...</div>;

  if (!ses) return (
    <div style={{ padding: 50, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>GATEWAY LOGIN</h2>
      <input style={{display:'block', margin:'10px auto', padding:10}} placeholder="User ID" onChange={e => idR.current = e.target.value} />
      <input style={{display:'block', margin:'10px auto', padding:10}} type="password" placeholder="Password" onChange={e => pwR.current = e.target.value} />
      <button style={{padding:10, background:'#1a1a2e', color:'#fff'}} onClick={() => {
          const u = idR.current.trim(), p = pwR.current.trim();
          if(u === "admin" && p === "admin123") setSes({role:"a", id:"admin"});
          else {
              const f = db.emps?.find(x => x.id === u && x.pwd === p);
              if(f) setSes({role:"e", id:f.id}); else alert("Invalid");
          }
      }}>Sign In</button>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <div style={{ borderBottom: '2px solid #333', paddingBottom: 10, marginBottom: 20 }}>
        <button onClick={() => setTab("dashboard")} style={{marginRight:10}}>Dashboard</button>
        <button onClick={() => setTab("attendance")}>Attendance</button>
        <button onClick={() => setSes(null)} style={{float:'right'}}>Logout</button>
      </div>

      {tab === "attendance" && (
        <div>
          <button onClick={() => setSub("daily")} style={{fontWeight: sub==="daily"?'bold':'normal'}}>1. Daily Entry</button>
          <button onClick={() => setSub("report")} style={{marginLeft:10, fontWeight: sub==="report"?'bold':'normal'}}>2. FY 2026-27 Report</button>
          
          {sub === "daily" ? (
            <div style={{marginTop:20, border:'1px solid #ccc', padding:15}}>
              <h4>Mark for {selDate}</h4>
              {db.emps?.map(e => (
                <div key={e.id} style={{padding:'5px 0', borderBottom:'1px solid #eee'}}>
                  {e.name} - {db.att?.find(a => a.emp_id === e.id && a.date === selDate)?.status || "No Entry"}
                </div>
              ))}
            </div>
          ) : (
            <div style={{marginTop:20}}>
              <h4>FY 2026-27 Summary (April Onwards)</h4>
              <table border="1" width="100%" style={{borderCollapse:'collapse'}}>
                <thead><tr><th>Name</th><th>Presents</th><th>Leaves</th><th>LOP</th></tr></thead>
                <tbody>
                  {db.emps?.map(e => {
                    const f26 = db.att?.filter(a => a.emp_id === e.id && new Date(a.date) >= new Date('2026-04-01')) || [];
                    return (
                      <tr key={e.id} style={{textAlign:'center'}}>
                        <td>{e.name}</td>
                        <td>{f26.filter(x => x.status === "Present").length}</td>
                        <td>{f26.filter(x => x.status === "Leave").length}</td>
                        <td>{f26.filter(x => x.status === "Absent").length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "dashboard" && (
        <div style={{textAlign:'center', marginTop:50}}>
          <h1>GATEWAY V2 ONLINE</h1>
          <p>Financial Year 2026-27 Filter Active.</p>
        </div>
      )}
    </div>
  );
}