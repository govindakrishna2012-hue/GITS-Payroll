// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION ---
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
  const [st, setSt] = useState("Present");
  const [re, setRe] = useState("");
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

  const onUpdate = async (empId) => {
    if (ses?.role !== "a") return;
    const { error } = await supabase.from('gits_attendance').upsert({
        emp_id: empId,
        date: selDate,
        status: st,
        reason: (st === "Leave" || st === "Absent") ? re : "",
        fy: 2026
    });
    if(!error) alert("Saved to FY 2026-27 Log!");
  };

  if (!db.loaded) return <div style={{padding:50, textAlign:'center'}}><h2>GATEWAY IT SOLUTIONS</h2><p>Syncing V2.1 Cloud Instance...</p></div>;

  if (!ses) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, fontFamily: 'sans-serif' }}>
      <div style={{ width: 320, padding: 40, border: '1px solid #ddd', borderRadius: 12, textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <img src="/logo.png" style={{ maxHeight: 70, marginBottom: 20 }} />
        <h2>PORTAL LOGIN</h2>
        <input style={inpStyle} placeholder="ID" onChange={e => idR.current = e.target.value} />
        <input style={inpStyle} type="password" placeholder="Pass" onChange={e => pwR.current = e.target.value} />
        <button style={loginBtn} onClick={() => {
            const u = idR.current.trim(), p = pwR.current.trim();
            if(u === "admin" && p === "admin123") setSes({role:"a", id:"admin"});
            else {
                const f = db.emps?.find(x => x.id === u && x.pwd === p);
                if(f) setSes({role:"e", id:f.id}); else alert("Invalid");
            }
        }}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1100, margin: 'auto' }}>
      <div style={headerStyle}>
        <img src="/logo.png" style={{ maxHeight: 50 }} />
        <div>
            <button onClick={() => setTab("dashboard")} style={tab === "dashboard" ? actT : pasT}>Dashboard</button>
            <button onClick={() => setTab("attendance")} style={tab === "attendance" ? actT : pasT}>Attendance</button>
            <button onClick={() => setSes(null)} style={logBtn}>Sign Out</button>
        </div>
      </div>

      {tab === "attendance" && (
        <div style={{marginTop:30}}>
            <div style={{display:'flex', gap:10, marginBottom:20}}>
                <button onClick={() => setSub("daily")} style={sub === "daily" ? actB : pasB}>1. Daily Entry</button>
                <button onClick={() => setSub("report")} style={sub === "report" ? actB : pasB}>2. FY 2026-27 Report</button>
            </div>

            {sub === "daily" ? (
                <div style={card}>
                    <h4>Marking Status: {selDate}</h4>
                    <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)} style={{padding:8, marginBottom:20}} />
                    {db.emps?.map(e => (
                        <div key={e.id} style={row}>
                            <span><strong>{e.name}</strong></span>
                            {ses.role === "a" ? (
                                <div style={{display:'flex', gap:10}}>
                                    <select onChange={s => setSt(s.target.value)} style={inpS}><option>Present</option><option>WFH</option><option>Leave</option><option>Absent</option></select>
                                    <input placeholder="Reason" onChange={r => setRe(r.target.value)} style={inpS} />
                                    <button onClick={() => onUpdate(e.id)} style={savB}>Update</button>
                                </div>
                            ) : (
                                <span>{db.att?.find(a => a.emp_id === e.id && a.date === selDate)?.status || "-"}</span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={card}>
                    <h4>FY 2026-27 Summary (April 2026 Onwards)</h4>
                    <table style={tbl}>
                        <thead><tr style={{background:'#1a1a2e', color:'#fff'}}><th>Name</th><th>Present</th><th>Leave</th><th>LOP</th></tr></thead>
                        <tbody>
                            {db.emps?.map(e => {
                                // THE CRITICAL 2026 FILTER
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
          <div style={{marginTop:30, padding:50, background:'#f9f9f9', borderRadius:15, textAlign:'center'}}>
              <h2>GATEWAY PORTAL V2.1 ONLINE</h2>
              <p>System fully restored. New Financial Year logic active.</p>
          </div>
      )}
    </div>
  );
}

// Minimal CSS
const inpStyle = { width: '100%', padding: 12, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc', boxSizing:'border-box' };
const loginBtn = { width: '100%', padding: 14, background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight:'bold' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1a1a2e', paddingBottom: 15 };
const pasT = { padding:'10px 20px', cursor:'pointer', background:'none', border:'none' };
const actT = { ...pasT, borderBottom:'3px solid #1a1a2e', fontWeight:'bold' };
const logBtn = { padding: '8px 16px', cursor: 'pointer', borderRadius: 4, border: '1px solid #ddd', background:'#fff' };
const card = { background:'#fff', padding:25, borderRadius:12, border:'1px solid #eee', boxShadow:'0 2px 5px #0001' };
const inpS = { padding:8, borderRadius:4, border:'1px solid #ccc' };
const pasB = { padding:'8px 15px', cursor:'pointer', borderRadius:5, border:'1px solid #ddd', background:'#fff' };
const actB = { ...pasB, background:'#1a1a2e', color:'#fff' };
const savB = { background:'#28a745', color:'#fff', border:'none', padding:'8px 15px', borderRadius:5, cursor:'pointer' };
const row = { display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #eee' };
const tbl = { width:'100%', borderCollapse:'collapse', marginTop:15 };