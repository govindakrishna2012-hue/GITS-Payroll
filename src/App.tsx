// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

const MS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

export default function App() {
  const [db, setDb] = useState({ loaded: false, emps: [], att: [] });
  const [ses, setSes] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [sub, setSub] = useState("daily");
  const [selDate, setSelDate] = useState(new Date().toISOString().split('T')[0]);
  
  const idR = useRef(""); pwR = useRef("");

  useEffect(() => {
    async function load() {
      try {
        const { data: e } = await supabase.from('gits_employees').select('*');
        const { data: a } = await supabase.from('gits_attendance').select('*');
        setDb({ loaded: true, emps: e || [], att: a || [] });
      } catch (err) { console.error("Sync Error:", err); }
    }
    load();
  }, []);

  if (!db.loaded) return <div style={{padding:50, textAlign:'center'}}><h2>GATEWAY IT SOLUTIONS</h2><p>Syncing V2.1 Cloud Instance...</p></div>;

  if (!ses) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, fontFamily: 'sans-serif' }}>
      <div style={{ width: 320, padding: 40, border: '1px solid #ddd', borderRadius: 12, textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <img src="/logo.png" style={{ maxHeight: 70, marginBottom: 20 }} />
        <h2>PORTAL LOGIN</h2>
        <input style={{width:'100%', padding:12, marginBottom:10}} placeholder="User ID" onChange={e => idR.current = e.target.value} />
        <input style={{width:'100%', padding:12, marginBottom:20}} type="password" placeholder="Password" onChange={e => pwR.current = e.target.value} />
        <button style={{width:'100%', padding:14, background:'#1a1a2e', color:'#fff', border:'none', borderRadius:6, cursor:'pointer'}} onClick={() => {
            const u = idR.current.trim(), p = pwR.current.trim();
            if(u === "admin" && p === "admin123") setSes({role:"a", id:"admin"});
            else {
                const f = db.emps?.find(x => x.id === u && x.pwd === p);
                if(f) setSes({role:"e", id:f.id}); else alert("Invalid Credentials");
            }
        }}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1100, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1a1a2e', paddingBottom: 15 }}>
        <img src="/logo.png" style={{ maxHeight: 40 }} />
        <div>
            <button onClick={() => setTab("dashboard")} style={{marginRight:10, padding:'8px 15px', cursor:'pointer'}}>Dashboard</button>
            <button onClick={() => setTab("attendance")} style={{padding:'8px 15px', cursor:'pointer'}}>Attendance</button>
            <button onClick={() => setSes(null)} style={{marginLeft:20, padding:'8px 15px', cursor:'pointer'}}>Logout</button>
        </div>
      </div>

      {tab === "attendance" && (
        <div style={{marginTop:30}}>
            <div style={{marginBottom:20}}>
                <button onClick={() => setSub("daily")} style={{background: sub==="daily"?'#1a1a2e':'#eee', color: sub==="daily"?'#fff':'#000', padding:10, marginRight:10, border:'none', cursor:'pointer'}}>1. Daily Entry</button>
                <button onClick={() => setSub("report")} style={{background: sub==="report"?'#1a1a2e':'#eee', color: sub==="report"?'#fff':'#000', padding:10, border:'none', cursor:'pointer'}}>2. FY 2026-27 Report</button>
            </div>

            {sub === "daily" ? (
                <div style={{padding:20, border:'1px solid #ddd', borderRadius:8}}>
                    <h4>Marking for {selDate}</h4>
                    <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)} style={{padding:8, marginBottom:20}} />
                    {db.emps?.map(e => (
                        <div key={e.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                            <span><strong>{e.name}</strong></span>
                            <span>{db.att?.find(a => a.emp_id === e.id && a.date === selDate)?.status || "No Entry"}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{padding:20, border:'1px solid #ddd', borderRadius:8}}>
                    <h4>FY 2026-27 Attendance (Starts April 2026)</h4>
                    <table style={{width:'100%', borderCollapse:'collapse', marginTop:15}}>
                        <thead><tr style={{background:'#f4f4f4'}}><th>Name</th><th>Present</th><th>Leave</th><th>LOP</th></tr></thead>
                        <tbody>
                            {db.emps?.map(e => {
                                // THE CRITICAL FILTER: ONLY SHOW 2026 DATA
                                const f26 = db.att?.filter(a => a.emp_id === e.id && new Date(a.date) >= new Date('2026-04-01'));
                                return (
                                    <tr key={e.id} style={{textAlign:'center', borderBottom:'1px solid #eee'}}>
                                        <td style={{padding:12}}>{e.name}</td>
                                        <td>{f26.filter(x => ["Present","WFH"].includes(x.status)).length}</td>
                                        <td>{f26.filter(x => x.status === "Leave").length}</td>
                                        <td style={{color:'red'}}>{f26.filter(x => x.status === "Absent").length}</td>
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
          <div style={{marginTop:50, textAlign:'center'}}>
              <h1>GATEWAY PORTAL V2.1 ONLINE</h1>
              <p>Database Connected. Historical data safely stored in Supabase.</p>
          </div>
      )}
    </div>
  );
}