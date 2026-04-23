// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [db, setDb] = useState({ emps: [], att: [], loaded: false });
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
        setDb({ emps: e || [], att: a || [], loaded: true });
      } catch (err) {
        console.error(err);
        setDb(prev => ({ ...prev, loaded: true }));
      }
    }
    load();
  }, []);

  const handleUpdate = async (eid, stat, rsn) => {
    if (ses?.role !== "a") return;
    const { error } = await supabase.from('gits_attendance').upsert({
      emp_id: eid, date: selDate, status: stat, reason: rsn, fy: 2026
    });
    if(!error) alert("Saved");
  };

  if (!db.loaded) return <div style={{padding:50, textAlign:'center'}}><h2>GATEWAY IT SOLUTIONS</h2><p>Syncing Secure Instance...</p></div>;

  if (!ses) return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80, fontFamily: 'sans-serif' }}>
      <div style={{ width: 320, padding: 40, border: '1px solid #ddd', borderRadius: 12, textAlign: 'center' }}>
        <img src="/logo.png" style={{ maxHeight: 60, marginBottom: 20 }} />
        <h3>PORTAL LOGIN</h3>
        <input style={iS} placeholder="User ID" onChange={e => idR.current = e.target.value} />
        <input style={iS} type="password" placeholder="Password" onChange={e => pwR.current = e.target.value} />
        <button style={bS} onClick={() => {
            const u = idR.current.trim(), p = pwR.current.trim();
            if(u === "admin" && p === "admin123") setSes({role:"a", id:"admin"});
            else {
                const f = db.emps.find(x => x.id === u && x.pwd === p);
                if(f) setSes({role:"e", id:f.id}); else alert("Invalid Credentials");
            }
        }}>Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1000, margin: 'auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', borderBottom:'2px solid #1a1a2e', paddingBottom:15 }}>
        <img src="/logo.png" style={{ maxHeight: 40 }} />
        <div>
            <button onClick={() => setTab("dashboard")} style={tab === "dashboard" ? aT : pT}>Dashboard</button>
            <button onClick={() => setTab("attendance")} style={tab === "attendance" ? aT : pT}>Attendance</button>
            <button onClick={() => setSes(null)} style={{marginLeft:20}}>Logout</button>
        </div>
      </div>

      {tab === "attendance" && (
        <div style={{marginTop:20}}>
            <button onClick={() => setSub("daily")} style={{fontWeight: sub==="daily"?'bold':'normal'}}>1. Daily Entry</button>
            <button onClick={() => setSub("report")} style={{marginLeft:15, fontWeight: sub==="report"?'bold':'normal'}}>2. FY 2026-27 Report</button>

            {sub === "daily" ? (
                <div style={{marginTop:20, border:'1px solid #eee', padding:20, borderRadius:8}}>
                    <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)} style={{marginBottom:20}} />
                    {db.emps.map(e => (
                        <div key={e.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f9f9f9'}}>
                            <span>{e.name}</span>
                            <span>{db.att.find(a => a.emp_id === e.id && a.date === selDate)?.status || "-"}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{marginTop:20}}>
                    <table border="1" width="100%" style={{borderCollapse:'collapse'}}>
                        <thead style={{background:'#f4f4f4'}}><tr><th>Name</th><th>Present</th><th>Leave</th><th>LOP</th></tr></thead>
                        <tbody>
                            {db.emps.map(e => {
                                const f26 = db.att.filter(a => a.emp_id === e.id && new Date(a.date) >= new Date('2026-04-01'));
                                return (
                                    <tr key={e.id} style={{textAlign:'center'}}>
                                        <td style={{padding:10}}>{e.name}</td>
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
              <h1>GATEWAY PORTAL V2.2</h1>
              <p>System Online. FY 2026-27 filters are active.</p>
          </div>
      )}
    </div>
  );
}

const iS = { width:'100%', padding:10, marginBottom:10, boxSizing:'border-box' };
const bS = { width:'100%', padding:12, background:'#1a1a2e', color:'#fff', border:'none', cursor:'pointer' };
const pT = { padding:'10px', cursor:'pointer', background:'none', border:'none' };
const aT = { ...pT, fontWeight:'bold', borderBottom:'2px solid #1a1a2e' };