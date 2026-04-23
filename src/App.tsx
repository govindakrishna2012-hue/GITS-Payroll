// @ts-nocheck
// 1. Strict Year Filter
const f26 = db.att.filter(a => a.emp_id === e.id && new Date(a.date) >= new Date('2026-04-01'));

// 2. Updated Welcome Message (to verify deployment)
<h2>GATEWAY PORTAL V2 - APRIL 2026</h2>

// 3. New Tab Logic
const [subView, setSubView] = useState("daily_entry");
import React, { useState, useMemo, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [db, setDb] = useState({ loaded: false, emps: [], att: [] });
  const [ses, setSes] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [subView, setSubView] = useState("daily_entry"); // Renamed to force refresh
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [curStatus, setCurStatus] = useState("Present");
  const [curReason, setCurReason] = useState("");
  const idR = useRef(""); pwR = useRef("");

  useEffect(() => {
    async function fetchAll() {
      const { data: e } = await supabase.from('gits_employees').select('*');
      const { data: a } = await supabase.from('gits_attendance').select('*');
      setDb({ loaded: true, emps: e || [], att: a || [] });
    }
    fetchAll();
  }, []);

  const onUpdate = async (eid) => {
    if (ses?.role !== "a") return;
    const isNewYear = new Date(targetDate) >= new Date('2026-04-01');
    const { error } = await supabase.from('gits_attendance').upsert({
        emp_id: eid,
        date: targetDate,
        status: curStatus,
        reason: (curStatus === "Leave" || curStatus === "Absent") ? curReason : "",
        fy: isNewYear ? 2026 : 2025
    });
    if(!error) alert("Recorded in 2026 Log");
  };

  if (!db.loaded) return <div style={{padding:50}}>Connecting to Gateway IT Cloud...</div>;

  if (!ses) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, fontFamily: 'sans-serif' }}>
      <div style={{ width: 320, padding: 40, border: '1px solid #ddd', borderRadius: 12, textAlign: 'center' }}>
        <img src="/logo.png" style={{ maxHeight: 70, marginBottom: 20 }} />
        <h2>GATEWAY LOGIN</h2>
        <input style={inStyle} placeholder="Employee ID" onChange={e => idR.current = e.target.value} />
        <input style={inStyle} type="password" placeholder="Password" onChange={e => pwR.current = e.target.value} />
        <button style={lBtn} onClick={() => {
            const u = idR.current.trim(), p = pwR.current.trim();
            if(u === "admin" && p === "admin123") setSes({role:"a", id:"admin"});
            else {
                const f = db.emps.find(x => x.id === u && x.pwd === p);
                if(f) setSes({role:"e", id:f.id}); else alert("Invalid Credentials");
            }
        }}>Sign In</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1100, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1a1a2e', paddingBottom: 15 }}>
        <img src="/logo.png" style={{ maxHeight: 50 }} />
        <div>
            <button onClick={() => setActiveTab("dashboard")} style={activeTab === "dashboard" ? aT : pT}>Dashboard</button>
            <button onClick={() => setActiveTab("attendance")} style={activeTab === "attendance" ? aT : pT}>Attendance</button>
            <button onClick={() => setSes(null)} style={sBtn}>Sign Out</button>
        </div>
      </div>

      {activeTab === "attendance" && (
        <div style={{marginTop:30}}>
            <div style={{display:'flex', gap:10, marginBottom:20}}>
                <button onClick={() => setSubView("daily_entry")} style={subView === "daily_entry" ? aB : pB}>1. Daily Entry</button>
                <button onClick={() => setSubView("summary_report")} style={subView === "summary_report" ? aB : pB}>2. Attendance Report</button>
            </div>

            {subView === "daily_entry" ? (
                <div style={cardStyle}>
                    <h4>📅 Update Daily Attendance</h4>
                    <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} style={sInp} />
                    <div style={{marginTop:20}}>
                        {db.emps.map(e => (
                            <div key={e.id} style={rStyle}>
                                <span><strong>{e.name}</strong></span>
                                {ses.role === "a" ? (
                                    <div style={{display:'flex', gap:10}}>
                                        <select onChange={s => setCurStatus(s.target.value)} style={sInp}>
                                            <option>Present</option><option>WFH</option><option>Leave</option><option>Absent</option>
                                        </select>
                                        <input placeholder="Reason" onChange={r => setCurReason(r.target.value)} style={sInp} />
                                        <button onClick={() => onUpdate(e.id)} style={gBtn}>Update</button>
                                    </div>
                                ) : (
                                    <span>{db.att.find(a => a.emp_id === e.id && a.date === targetDate)?.status || "No Entry"}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={cardStyle}>
                    <h4>📊 FY 2026-27 Report (Starts April 1st)</h4>
                    <table style={tStyle}>
                        <thead><tr style={{background:'#1a1a2e', color:'#fff'}}><th>Name</th><th>Presents</th><th>WFH</th><th>Leave Used</th><th>LOP Days</th></tr></thead>
                        <tbody>
                            {db.emps.map(e => {
                                // STRICT 2026 FILTER
                                const f26 = db.att.filter(a => a.emp_id === e.id && new Date(a.date) >= new Date('2026-04-01'));
                                return (
                                    <tr key={e.id} style={{textAlign:'center', borderBottom:'1px solid #eee'}}>
                                        <td style={{padding:12}}>{e.name}</td>
                                        <td>{f26.filter(x => x.status === "Present").length}</td>
                                        <td>{f26.filter(x => x.status === "WFH").length}</td>
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

      {activeTab === "dashboard" && (
          <div style={{marginTop:30, padding:50, background:'#f9f9f9', borderRadius:15, textAlign:'center'}}>
              <h2>GATEWAY PORTAL V2 - APRIL 2026</h2>
              <p>System is now strictly filtering for Financial Year 2026-27.</p>
          </div>
      )}
    </div>
  );
}

const inStyle = { width: '100%', padding: 12, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc', boxSizing:'border-box' };
const lBtn = { width: '100%', padding: 14, background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' };
const pT = { padding:'10px 20px', cursor:'pointer', background:'none', border:'none' };
const aT = { ...pT, borderBottom:'3px solid #1a1a2e', fontWeight:'bold' };
const cardStyle = { background:'#fff', padding:25, borderRadius:12, border:'1px solid #eee' };
const sInp = { padding:8, borderRadius:4, border:'1px solid #ccc' };
const pB = { padding:'8px 15px', cursor:'pointer', borderRadius:5, border:'1px solid #ddd', background:'#fff' };
const aB = { ...pB, background:'#1a1a2e', color:'#fff' };
const gBtn = { background:'#28a745', color:'#fff', border:'none', padding:'8px 15px', borderRadius:5, cursor:'pointer' };
const rStyle = { display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #eee' };
const tStyle = { width:'100%', borderCollapse:'collapse', marginTop:15 };
const sBtn = { padding: '8px 16px', cursor: 'pointer', borderRadius: 4, border: '1px solid #ddd', background:'#fff' };