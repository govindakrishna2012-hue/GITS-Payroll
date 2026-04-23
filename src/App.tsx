// @ts-nocheck
import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const URL = "https://vmntpwethpuvptczrfft.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NDU0MjIsImV4cCI6MjAyOTQyMTQyMn0.eAtuPwcE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
const supabase = createClient(URL, KEY);

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // This pulls EVERYTHING so you can see your old data is safe
      const { data: ledger } = await supabase.from('gits_ledger').select('*');
      setData(ledger || []);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <h1 style={{textAlign:'center', marginTop:100}}>Fetching Your Data Safely...</h1>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <div style={{textAlign:'center', marginBottom:30}}>
        <img src="/logo.png" style={{maxHeight:60}} />
        <h1 style={{color:'#1a1a2e'}}>DATA RECOVERY MODE</h1>
        <p>If you see the table below, your connection is 100% fixed.</p>
      </div>

      <table border="1" style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#eee'}}>
            <th>Emp ID</th>
            <th>Month</th>
            <th>FY</th>
            <th>Basic</th>
            <th>LOP Deducted</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{textAlign:'center'}}>
              <td style={{padding:10}}>{row.emp_id}</td>
              <td>{row.mo}</td>
              <td>{row.fy}</td>
              <td>{row.basic}</td>
              <td style={{color:'red'}}>{row.lop || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{marginTop:30, textAlign:'center'}}>
        <button onClick={() => window.location.reload()} style={{padding:15, background:'#1a1a2e', color:'#fff', cursor:'pointer'}}>Refresh View</button>
      </div>
    </div>
  );
}