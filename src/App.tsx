// @ts-nocheck
import React, { useState, useMemo, useRef, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

// ==========================================
// 🔴 CLOUD DATABASE CONNECTION (SUPABASE) 🔴
const SUPABASE_URL = "https://vmntpwethpuvptczrfft.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbnRwd2V0aHB1dnB0Y3pyZmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzQ3ODUsImV4cCI6MjA5MjAxMDc4NX0.eAtuPwCE2WH5ReV1cXaxah6c4hxdo2pjS8d62nWIKCo";
// ==========================================

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CO = "GATEWAY IT SOLUTIONS";
const AD = "FLAT NO.201, KARRE COTTAGE, VI PHASE, KPHB COLONY, HYDERABAD-500072.";
const MS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const DY = {Apr:30,May:31,Jun:30,Jul:31,Aug:31,Sep:30,Oct:31,Nov:30,Dec:31,Jan:31,Feb:28,Mar:31};

const fyL = y => `${parseInt(y||0)}-${String(parseInt(y||0)+1).slice(-2)}`;
const mL  = (m, y) => `${m}-${String(["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].includes(m) ? parseInt(y||0) : parseInt(y||0)+1).slice(-2)}`;
const f$  = n => Math.round(n||0).toLocaleString("en-IN");
const gr  = r => (r.basic||0) + (r.hra||0) + (r.conv||0) + (r.med||0) + (r.inc||0) + (r.oth||0);
const dd  = r => (r.lop||0) + (r.pt||0) + (r.tds||0) + (r.adv||0) + (r.othD||0);
const np  = r => gr(r) - dd(r);
const txInc = r => np(r) + (r.pt||0) + (r.tds||0);

// --- FULL RESTORED SEED DATA ---
const E0 = [{id:"SRR1001",name:"P.Umashankar Anand",desig:"Senior Recruiter",pan:"ALKPA8190Q",cat:"Onshore",basic:38500,phone:"9000000001",email:"umashankar@gatewayit.in",pwd:"SRR1001",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015027 ANDHRA BANK",driveLink:""},{id:"SRR1003",name:"V Sunil Kumar",desig:"Senior Recruiter",pan:"DJCPS8542F",cat:"Onshore",basic:44500,phone:"9000000002",email:"sunil@gatewayit.in",pwd:"SRR1003",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015028 ANDHRA BANK",driveLink:""},{id:"ADMN1002",name:"R Govinda Krishnan",desig:"Accounts Manager",pan:"AUPPK3079C",cat:"Onshore",basic:33000,phone:"9000000003",email:"govinda@gatewayit.in",pwd:"ADMN1002",start:"07-10-2013",end:"",status:"Active",comments:"",bank:"209610100015027 ANDHRA BANK",driveLink:""},{id:"D1001",name:"Nagaraju D",desig:"Driver cum Office Boy",pan:"ANJPD1432D",cat:"Onshore",basic:22000,phone:"9000000004",email:"nagaraju@gatewayit.in",pwd:"D1001",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015029 ANDHRA BANK",driveLink:""},{id:"ADMN1004",name:"Balamurali Krishna",desig:"Accountant",pan:"CDNPB5192E",cat:"Onshore",basic:25000,phone:"9000000005",email:"balamurali@gatewayit.in",pwd:"ADMN1004",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015030 ANDHRA BANK",driveLink:""},{id:"RR1026",name:"Maneendra Basa",desig:"Recruiter",pan:"BALPB9607E",cat:"Onshore",basic:30000,phone:"9000000006",email:"maneendra@gatewayit.in",pwd:"RR1026",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015031 ANDHRA BANK",driveLink:""},{id:"BA1001",name:"Bhaskar Akkala",desig:"Senior Software Developer",pan:"AEJPA3495G",cat:"Offshore",basic:200000,phone:"9000000007",email:"bhaskar@gatewayit.in",pwd:"BA1001",start:"01-05-2024",end:"",status:"Active",comments:"",bank:"209610100015032 ANDHRA BANK",driveLink:""}];
const P0 = {
  SRR1001:{2025:[{m:"Apr",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"May",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"May",t:"i",basic:0,hra:0,conv:0,med:0,inc:151972,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1 2025"},{m:"Jun",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Jul",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Aug",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Aug",t:"i",basic:0,hra:0,conv:0,med:0,inc:142448,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2 2025"},{m:"Sep",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Oct",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Nov",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Nov",t:"i",basic:0,hra:0,conv:0,med:0,inc:176303,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3 2025"},{m:"Dec",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Jan",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},{m:"Feb",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:5133,lop:0,adv:0,pt:200,tds:0,note:"Leave encashment Rs.5,133"}]},
  SRR1003:{2025:[{m:"Apr",t:"i",basic:0,hra:0,conv:0,med:0,inc:97120,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},{m:"Apr",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"May",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Jun",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Jul",t:"i",basic:0,hra:0,conv:0,med:0,inc:106320,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},{m:"Jul",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Aug",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Sep",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Oct",t:"i",basic:0,hra:0,conv:0,med:0,inc:111600,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},{m:"Oct",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Nov",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Dec",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Jan",t:"i",basic:0,hra:0,conv:0,med:0,inc:95520,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q4"},{m:"Jan",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},{m:"Feb",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"}]},
  ADMN1002:{2025:[{m:"Apr",t:"i",basic:0,hra:0,conv:0,med:0,inc:79891,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},{m:"Apr",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"May",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Jun",t:"s",basic:21740,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:1100,adv:0,pt:200,tds:0,note:"LOP Rs.1100"},{m:"Jul",t:"i",basic:0,hra:0,conv:0,med:0,inc:81791,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},{m:"Jul",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Aug",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Sep",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Oct",t:"i",basic:0,hra:0,conv:0,med:0,inc:87588,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},{m:"Oct",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Nov",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Dec",t:"s",basic:21775,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:1065,adv:0,pt:200,tds:0,note:"LOP Rs.1065"},{m:"Jan",t:"i",basic:0,hra:0,conv:0,med:0,inc:79466,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q4"},{m:"Jan",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},{m:"Feb",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"}]},
  D1001:{2025:[{m:"Apr",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},{m:"May",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},{m:"Jun",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},{m:"Jul",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 5972"},{m:"Aug",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 4972"},{m:"Sep",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 3972"},{m:"Oct",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 2972"},{m:"Nov",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 1972"},{m:"Dec",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 972"},{m:"Jan",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:972,pt:200,tds:0,note:"Hlth Ins Bal 0"},{m:"Feb",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""}]},
  ADMN1004:{2025:[{m:"Apr",t:"i",basic:0,hra:0,conv:0,med:0,inc:39946,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},{m:"Apr",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"May",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"Jun",t:"s",basic:14783,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:1667,adv:0,pt:200,tds:0,note:"2 days LOP Rs.1667"},{m:"Jul",t:"i",basic:0,hra:0,conv:0,med:0,inc:40896,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},{m:"Jul",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"Aug",t:"s",basic:15644,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:806,adv:0,pt:200,tds:0,note:"1 day LOP Rs.806"},{m:"Sep",t:"s",basic:15617,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:833,adv:0,pt:200,tds:0,note:"1 day LOP Rs.833"},{m:"Oct",t:"i",basic:0,hra:0,conv:0,med:0,inc:43794,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},{m:"Oct",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"Nov",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"Dec",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"Jan",t:"i",basic:0,hra:0,conv:0,med:0,inc:39733,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q4"},{m:"Jan",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},{m:"Feb",t:"s",basic:15557,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:893,adv:0,pt:200,tds:0,note:"1 day LOP Rs.893"}]},
  RR1026:{2025:[{m:"Apr",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"May",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"May",t:"i",basic:0,hra:0,conv:0,med:0,inc:32057,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},{m:"Jun",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Jul",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Aug",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Aug",t:"i",basic:0,hra:0,conv:0,med:0,inc:35303,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},{m:"Sep",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Oct",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Nov",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Nov",t:"i",basic:0,hra:0,conv:0,med:0,inc:45433,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},{m:"Dec",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Jan",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},{m:"Feb",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"}]},
  BA1001:{2025:[{m:"May",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:20050,note:"Salary Rs.1,79,750/-"},{m:"Jun",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:20050,note:"Salary Rs.1,79,750/-"},{m:"Jul",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:240000,oth:0,lop:0,adv:0,pt:200,tds:56300,note:"Incentive 240hrs"},{m:"Aug",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:128000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 128hrs"},{m:"Sep",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:128000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 128hrs"},{m:"Oct",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 120hrs"},{m:"Nov",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 120hrs"},{m:"Dec",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:40000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 40hrs"},{m:"Jan",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:61000,note:"Incentive 120hrs"},{m:"Feb",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:75000,note:"Incentive 120hrs"}]}
};
const initA = emps => { const a = {}; emps.forEach(e => { a[e.id] = {}; MS.forEach(m => { a[e.id][m] = {present:DY[m]-2,absent:0,leave:0,bal:0,lop:0,holiday:2,wd:DY[m]-2,comments:""}; }); }); return a; };

const exportCSV = (rows, fn) => {
  const csv = "\uFEFF" + rows.map(r => r.map(c => `"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = fn; document.body.appendChild(a); a.click(); setTimeout(() => document.body.removeChild(a), 100);
};

const buildSlip = (emp, mo, fyStr, entries, att) => {
  const sal = entries.find(r => r.t === "s") || {basic:0,hra:0,conv:0,med:0,oth:0,lop:0,adv:0,pt:0,tds:0,othD:0,note:""};
  const incs = entries.filter(r => r.t === "i").reduce((s,r)=>s+(r.inc||0), 0);
  const a = att || {}; const wd = a.wd !== undefined ? a.wd : DY[mo]; const present = a.present !== undefined ? a.present : "-";
  const leave = a.leave || 0; const bal = a.bal || 0; const lopDays = a.lop || 0;
  const g = gr(sal) + incs, d = dd(sal), n = g - d; const ctc = emp.basic ? emp.basic * 12 : 0;
  
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Payslip - ${emp.name}</title><style>body{font-family:sans-serif;background:#f9f9f9;padding:20px;color:#333;margin:0}.payslip-container{max-width:800px;margin:auto;background:#fff;padding:30px;box-shadow:0 4px 15px rgba(0,0,0,0.05);border-radius:8px;border-top:6px solid #1a1a2e}.header{text-align:center;margin-bottom:25px;border-bottom:2px solid #eee;padding-bottom:15px}.header h1{margin:0;color:#1a1a2e;font-size:22px}.header p{margin:5px 0 0;font-size:13px;color:#666}.title{text-align:center;font-size:15px;font-weight:bold;margin:20px 0;background:#f4f6f8;padding:10px;border-radius:4px}table{width:100%;border-collapse:collapse;margin-bottom:25px;font-size:13px}td,th{padding:10px 12px;border:1px solid #e0e0e0}.emp-details td:nth-child(odd){font-weight:bold;background:#fafafa;width:22%;font-size:12px}.salary-details th{background:#1a1a2e;color:#fff;text-align:left;font-size:12px}.tr{text-align:right!important}.fw{font-weight:bold}.net-pay-row td{background:#e8f5e9!important;border-top:2px solid #1D9E75!important;font-size:15px;color:#1D9E75}.print-btn{display:block;width:200px;margin:0 auto 20px;padding:12px;text-align:center;background:#1D9E75;color:#fff;border:none;border-radius:4px;cursor:pointer}@media print{.print-btn{display:none}body{background:#fff;padding:0}.payslip-container{box-shadow:none;border:none;padding:0}}</style></head><body><button class="print-btn" onclick="window.print()">Print Payslip</button><div class="payslip-container"><div class="header"><h1>${CO}</h1><p>${AD}</p></div><div class="title">PAYSLIP FOR ${mo.toUpperCase()}-${fyStr.slice(-2)}</div><table class="emp-details"><tr><td>NAME</td><td>${emp.name}</td><td>TOTAL DAYS</td><td>${wd}</td></tr><tr><td>EMP CODE</td><td>${emp.id}</td><td>DAYS WORKED</td><td>${present}</td></tr><tr><td>DESIGNATION</td><td>${emp.desig}</td><td>LEAVES TAKEN</td><td>${leave}</td></tr><tr><td>CTC P.A.</td><td>${f$(ctc)}</td><td>LEAVE BALANCE</td><td>${bal}</td></tr></table><table class="salary-details"><thead><tr><th>PARTICULARS</th><th class="tr">TOTAL</th><th class="tr">NET</th><th>DEDUCTIONS</th><th class="tr">AMOUNT</th></tr></thead><tbody><tr><td class="fw">BASIC</td><td class="tr">${f$(sal.basic)}</td><td class="tr">${f$(sal.basic)}</td><td>PROFESSION TAX</td><td class="tr">${f$(sal.pt)}</td></tr><tr><td class="fw">HRA</td><td class="tr">${f$(sal.hra)}</td><td class="tr">${f$(sal.hra)}</td><td>TDS</td><td class="tr">${f$(sal.tds)}</td></tr><tr><td class="fw">CONVEYANCE</td><td class="tr">${f$(sal.conv)}</td><td class="tr">${f$(sal.conv)}</td><td>STAFF ADVANCE</td><td class="tr">${f$(sal.adv)}</td></tr><tr><td class="fw">MEDICAL</td><td class="tr">${f$(sal.med)}</td><td class="tr">${f$(sal.med)}</td><td>LOP</td><td class="tr">${f$(sal.lop)}</td></tr><tr><td class="fw">INCENTIVES</td><td class="tr">${f$(incs)}</td><td class="tr">${f$(incs)}</td><td>OTHER DED</td><td class="tr">${f$(sal.othD)}</td></tr><tr><td class="fw">ARREARS/OTH</td><td class="tr">${f$(sal.oth)}</td><td class="tr">${f$(sal.oth)}</td><td></td><td></td></tr><tr class="fw" style="background:#f4f6f8"><td>GROSS SALARY</td><td class="tr">${f$(g)}</td><td></td><td>TOTAL DED</td><td class="tr">${f$(d)}</td></tr><tr class="fw net-pay-row"><td>NET SALARY</td><td class="tr">${f$(n)}</td><td colspan="3"></td></tr><tr><td class="fw">BANK A/C</td><td>SAVINGS</td><td colspan="3" class="fw">${emp.bank||""}</td></tr></tbody></table></div></body></html>`;
};

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);
  const [emps,setEmps] = useState([]);
  const [pay,setPay]   = useState({});
  const [att,setAtt]   = useState({});

  useEffect(() => {
    const initDb = async () => {
      const { data: empData, error } = await supabase.from('gits_employees').select('*');
      if (error) { console.error(error); alert("Database Connection Failed. Check URL and Key."); return; }

      // 🔴 COMPLETE MIGRATION SCRIPT 🔴
      try {
         let didMigrate = false;

         // 1. Employees
         if (empData && empData.length === 0) {
             const empInserts = E0.map(e => ({
                id: e.id, name: e.name, desig: e.desig, pan: e.pan, cat: e.cat, basic: e.basic,
                phone: e.phone, email: e.email, pwd: e.pwd, start_date: e.start, end_date: e.end,
                status: e.status, comments: e.comments, bank: e.bank, drive_link: e.driveLink
             }));
             await supabase.from('gits_employees').insert(empInserts);
             didMigrate = true;
         }

         // 2. Ledger
         const { data: ledCheck } = await supabase.from('gits_ledger').select('id').limit(1);
         if (ledCheck && ledCheck.length === 0) {
             const ledgerInserts = [];
             Object.keys(P0).forEach(eid => {
                Object.keys(P0[eid]).forEach(fyear => {
                   P0[eid][fyear].forEach(r => {
                      ledgerInserts.push({ emp_id: eid, fy: fyear, mo: r.m, t: r.t, basic: r.basic, hra: r.hra, conv: r.conv, med: r.med, inc: r.inc, oth: r.oth, lop: r.lop, adv: r.adv, pt: r.pt, tds: r.tds, othd: r.othD||0, note: r.note||"" });
                   });
                });
             });
             if(ledgerInserts.length) await supabase.from('gits_ledger').insert(ledgerInserts);
             didMigrate = true;
         }

         // 3. Attendance
         const { data: attCheck } = await supabase.from('gits_attendance').select('id').limit(1);
         if (attCheck && attCheck.length === 0) {
             const localAtt = initA(E0);
             const attInserts = [];
             Object.keys(localAtt).forEach(eid => {
                Object.keys(localAtt[eid]).forEach(month => {
                   const a = localAtt[eid][month];
                   attInserts.push({ emp_id: eid, fy: "2025", mo: month, present: a.present, leave: a.leave, bal: a.bal, lop: a.lop, comments: a.comments });
                });
             });
             if(attInserts.length) await supabase.from('gits_attendance').insert(attInserts);
             didMigrate = true;
         }

         if (didMigrate) {
             window.location.reload();
             return;
         }
      } catch (err) {
         console.error("Migration Error:", err);
      }

      // --- STANDARD CLOUD DATA LOAD ---
      const formattedEmps = empData.map(e => ({
          id: e.id, name: e.name, desig: e.desig, pan: e.pan, cat: e.cat, basic: e.basic,
          phone: e.phone, email: e.email, pwd: e.pwd, start: e.start_date, end: e.end_date,
          status: e.status, comments: e.comments, bank: e.bank, driveLink: e.drive_link
      }));

      const { data: ledData } = await supabase.from('gits_ledger').select('*');
      const formattedPay = {};
      if(ledData) {
          ledData.forEach(r => {
              if(!formattedPay[r.emp_id]) formattedPay[r.emp_id] = {};
              if(!formattedPay[r.emp_id][r.fy]) formattedPay[r.emp_id][r.fy] = [];
              formattedPay[r.emp_id][r.fy].push({ db_id: r.id, m: r.mo, t: r.t, basic: r.basic, hra: r.hra, conv: r.conv, med: r.med, inc: r.inc, oth: r.oth, lop: r.lop, adv: r.adv, pt: r.pt, tds: r.tds, othD: r.othd, note: r.note });
          });
      }

      const { data: attData } = await supabase.from('gits_attendance').select('*');
      const formattedAtt = initA(formattedEmps);
      if(attData) {
          attData.forEach(r => {
              if(!formattedAtt[r.emp_id]) formattedAtt[r.emp_id] = {};
              formattedAtt[r.emp_id][r.mo] = { present: r.present, leave: r.leave, bal: r.bal, lop: r.lop, comments: r.comments };
          });
      }

      setEmps(formattedEmps); setPay(formattedPay); setAtt(formattedAtt); setDbLoaded(true);
    };
    if (SUPABASE_URL !== "PASTE_YOUR_URL_HERE") initDb();
  }, []);

  const [ses,setSes]   = useState(null);
  const [tab,setTab]   = useState("dashboard");
  const [fy,setFy]     = useState("2025");
  const [mo,setMo]     = useState("Apr");
  const [slip,setSlip] = useState(null);
  
  const [lEmp,setLEmp] = useState("");
  const [pEmp,setPEmp] = useState("");
  const [pMo,setPMo]   = useState("Apr");
  const [pFy,setPFy]   = useState("2025");
  
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [nE, setNE] = useState({id:"",name:"",desig:"",pan:"",cat:"Onshore",basic:"",phone:"",email:"",pwd:"",start:"",end:"",status:"Active",bank:"",comments:"",driveLink:""});
  const [editEmp, setEditEmp] = useState(null);
  const [editData, setEditData] = useState({});
  
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [editLedger, setEditLedger] = useState(null);
  const [nEn, setNEn] = useState({m:"Apr",t:"s",basic:0,hra:0,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,othD:0,note:""});
  
  const [showBulk, setShowBulk] = useState(false);
  const [bulkData, setBulkData] = useState({});
  const [showOffCycle, setShowOffCycle] = useState(false);
  const [offCycleData, setOffCycleData] = useState({empId:"", basic:0, hra:0, conv:800, med:1500, inc:0, oth:0, lop:0, adv:0, pt:200, tds:0, othD:0, note:""});

  const idR = useRef(""), pwR = useRef("");
  const myE = ses?.role === "e" ? emps.find(e=>e.id===ses.id) : null;

  const dTot = useMemo(() => {
    let g=0,d=0,n=0; 
    const targetEmps = ses?.role === "a" ? emps : (myE ? [myE] : []);
    targetEmps.forEach(e => (pay[e.id]?.[fy]||[]).filter(r=>r.m===mo).forEach(r=>{g+=gr(r);d+=dd(r);n+=np(r);})); 
    return {g,d,n};
  }, [emps,pay,fy,mo,ses,myE]);

  const login = () => {
    const id = idR.current.trim(), pw = pwR.current.trim();
    if(id==="admin" && pw==="admin123") { setSes({role:"a"}); setTab("dashboard"); }
    else { const e = emps.find(x => x.id===id && x.pwd===pw); if(e) { setSes({role:"e", id:e.id}); setLEmp(e.id); setPEmp(e.id); setTab("dashboard"); } else alert("Invalid Credentials"); }
  };

  const addEmployee = async () => {
    if(!nE.id || !nE.name) return alert("ID and Name are required");
    const newEmp = {...nE, basic: Number(nE.basic)};
    await supabase.from('gits_employees').insert({
        id: newEmp.id, name: newEmp.name, desig: newEmp.desig, pan: newEmp.pan, cat: newEmp.cat, basic: newEmp.basic,
        phone: newEmp.phone, email: newEmp.email, pwd: newEmp.pwd, start_date: newEmp.start, end_date: newEmp.end,
        status: newEmp.status, comments: newEmp.comments, bank: newEmp.bank, drive_link: newEmp.driveLink
    });
    setEmps([...emps, newEmp]); setPay({...pay, [nE.id]: {}}); setAtt({...att, [nE.id]: {} });
    setShowAddEmp(false); setNE({id:"",name:"",desig:"",pan:"",cat:"Onshore",basic:"",phone:"",email:"",pwd:"",start:"",end:"",status:"Active",bank:"",comments:"",driveLink:""});
  };

  const saveEditEmployee = async () => {
    const combinedComments = editData.reason ? editData.reason : editData.comments;
    await supabase.from('gits_employees').update({
        phone: editData.phone, email: editData.email, start_date: editData.start, end_date: editData.end,
        status: editData.status, comments: combinedComments, bank: editData.bank, drive_link: editData.driveLink
    }).eq('id', editEmp);
    setEmps(p=>p.map(x=>x.id===editEmp?{...x,...editData,comments:combinedComments}:x)); setEditEmp(null);
  };

  const delEmployee = async (id) => {
    if(confirm("Are you sure you want to delete this employee?")) {
      await supabase.from('gits_employees').delete().eq('id', id); setEmps(p=>p.filter(x=>x.id!==id));
    }
  };

  const addLedgerEntry = async () => {
    if(!pEmp) return alert("Select Employee First");
    const e = {...nEn, basic:+nEn.basic, hra:+nEn.hra, conv:+nEn.conv, med:+nEn.med, inc:+nEn.inc, oth:+nEn.oth, lop:+nEn.lop, adv:+nEn.adv, pt:+nEn.pt, tds:+nEn.tds, othD:+nEn.othD};
    if (editLedger) {
      await supabase.from('gits_ledger').update({ mo: e.m, t: e.t, basic: e.basic, hra: e.hra, conv: e.conv, med: e.med, inc: e.inc, oth: e.oth, lop: e.lop, adv: e.adv, pt: e.pt, tds: e.tds, othd: e.othD, note: e.note }).eq('id', editLedger.db_id);
      const updatedArr = [...(pay[pEmp]?.[fy] || [])];
      updatedArr[editLedger.idx] = { ...e, db_id: editLedger.db_id };
      setPay({...pay, [pEmp]: {...pay[pEmp], [fy]: updatedArr}});
    } else {
      const { data } = await supabase.from('gits_ledger').insert({ emp_id: pEmp, fy: fy, mo: e.m, t: e.t, basic: e.basic, hra: e.hra, conv: e.conv, med: e.med, inc: e.inc, oth: e.oth, lop: e.lop, adv: e.adv, pt: e.pt, tds: e.tds, othd: e.othD, note: e.note }).select();
      if(data) setPay({...pay, [pEmp]: {...pay[pEmp], [fy]: [...(pay[pEmp]?.[fy]||[]), { ...e, db_id: data[0].id }]}});
    }
    setShowAddEntry(false); setEditLedger(null);
  };

  const delLedgerEntry = async (eid, idx, db_id) => {
    if(confirm("Delete this payroll entry?")) {
      if(db_id) await supabase.from('gits_ledger').delete().eq('id', db_id);
      setPay({...pay,[eid]:{...pay[eid],[fy]:pay[eid][fy].filter((_,i)=>i!==idx)}});
    }
  };

  const getLastPay = (eid) => {
    let ls = null; const ks = Object.keys(pay[eid] || {}).sort();
    for (let i = ks.length - 1; i >= 0; i--) { const arr = pay[eid][ks[i]].filter(r => r.t === "s"); if (arr.length) { ls = arr[arr.length - 1]; break; } }
    if (ls) return { basic: ls.basic||0, hra: ls.hra||0, conv: ls.conv||0, med: ls.med||0, inc: 0, oth: 0, lop: 0, adv: 0, pt: ls.pt||0, tds: ls.tds||0, othD: 0, note: "" };
    const e = emps.find(x => x.id === eid); const gross = e?.basic || 0;
    if (gross > 0) { const defaultBasic = Math.round(gross * 0.6839); const defaultHra = gross - defaultBasic - 800 - 1500; return { basic: defaultBasic, hra: defaultHra > 0 ? defaultHra : 0, conv: 800, med: 1500, inc: 0, oth: 0, lop: 0, adv: 0, pt: 200, tds: 0, othD: 0, note: "" }; }
    return { basic: 0, hra: 0, conv: 800, med: 1500, inc: 0, oth: 0, lop: 0, adv: 0, pt: 200, tds: 0, othD: 0, note: "" };
  };

  const openBulkPayroll = () => { const defaults = {}; emps.filter(e=>e.status==="Active").forEach(emp => { defaults[emp.id] = getLastPay(emp.id); }); setBulkData(defaults); setShowBulk(true); setShowOffCycle(false); };

  const saveBulkPayroll = async () => {
    const nextPay = {...pay}; const dbInserts = [];
    Object.keys(bulkData).forEach(eid => {
      const d = bulkData[eid]; const existing = nextPay[eid]?.[fy]||[];
      if(!existing.find(r=>r.m===mo && r.t==="s")) {
        const entry = { m:mo, t:"s", basic:+d.basic, hra:+d.hra, conv:+d.conv, med:+d.med, inc:+d.inc, oth:+d.oth, lop:+d.lop, adv:+d.adv, pt:+d.pt, tds:+d.tds, othD:+d.othD, note:d.note||"" };
        dbInserts.push({ emp_id: eid, fy: fy, mo: mo, t: "s", basic: entry.basic, hra: entry.hra, conv: entry.conv, med: entry.med, inc: entry.inc, oth: entry.oth, lop: entry.lop, adv: entry.adv, pt: entry.pt, tds: entry.tds, othd: entry.othD, note: entry.note });
      }
    });
    if(dbInserts.length) {
      const { data } = await supabase.from('gits_ledger').insert(dbInserts).select();
      data.forEach(r => {
          if(!nextPay[r.emp_id]) nextPay[r.emp_id] = {};
          if(!nextPay[r.emp_id][r.fy]) nextPay[r.emp_id][r.fy] = [];
          nextPay[r.emp_id][r.fy].push({ db_id: r.id, m: r.mo, t: r.t, basic: r.basic, hra: r.hra, conv: r.conv, med: r.med, inc: r.inc, oth: r.oth, lop: r.lop, adv: r.adv, pt: r.pt, tds: r.tds, othD: r.othd, note: r.note });
      });
    }
    setPay(nextPay); setShowBulk(false); alert(`Bulk Payroll processed for ${mL(mo, fy)}`);
  };

  const saveOffCycle = async () => {
    if(!offCycleData.empId) return alert("Select an employee");
    const entry = { m: mo, t: "s", basic: +offCycleData.basic, hra: +offCycleData.hra, conv: +offCycleData.conv, med: +offCycleData.med, inc: +offCycleData.inc, oth: +offCycleData.oth, lop: +offCycleData.lop, adv: +offCycleData.adv, pt: +offCycleData.pt, tds: +offCycleData.tds, othD: +offCycleData.othD, note: offCycleData.note || "Off-Cycle" };
    const { data } = await supabase.from('gits_ledger').insert({ emp_id: offCycleData.empId, fy: fy, mo: mo, t: "s", basic: entry.basic, hra: entry.hra, conv: entry.conv, med: entry.med, inc: entry.inc, oth: entry.oth, lop: entry.lop, adv: entry.adv, pt: entry.pt, tds: entry.tds, othd: entry.othD, note: entry.note }).select();
    setPay(prev => ({ ...prev, [offCycleData.empId]: { ...prev[offCycleData.empId], [fy]: [...(prev[offCycleData.empId]?.[fy]||[]), { ...entry, db_id: data[0].id }] } }));
    setShowOffCycle(false); setOffCycleData({empId:"", basic:0, hra:0, conv:800, med:1500, inc:0, oth:0, lop:0, adv:0, pt:200, tds:0, othD:0, note:""});
    alert(`Off-Cycle Payroll saved for ${emps.find(e=>e.id===offCycleData.empId)?.name}`);
  };

  const handleExportLedger = () => {
    const head = ["S.No", "Emp ID", "Employee", "Month", "Type", "Basic", "HRA", "Conv", "Med", "Incentive", "Other Earnings", "Gross Amount", "LOP", "Staff Advance", "Prof Tax", "TDS", "Other Deductions", "Total Deductions", "Taxable Income", "Net Amount", "Note/Comments"];
    const rows = [head]; const tEmps = ses?.role==="a" ? (lEmp ? emps.filter(e=>e.id===lEmp) : emps) : [myE];
    let sno = 1;
    tEmps.forEach(e => { if(!e) return; (pay[e.id]?.[fy] || []).filter(r=>!mo||r.m===mo).forEach(r => rows.push([sno++, e.id, e.name, mL(r.m, fy), r.t==="s"?"Salary":"Incentive", r.basic||0, r.hra||0, r.conv||0, r.med||0, r.inc||0, r.oth||0, gr(r), r.lop||0, r.adv||0, r.pt||0, r.tds||0, r.othD||0, dd(r), txInc(r), np(r), r.note||""])); });
    exportCSV(rows, `Ledger_${fyL(fy)}.csv`);
  };

  const updAtt = async (eid, m, field, val) => { 
    const newVal = val === "" ? null : Number(val);
    setAtt(p => ({...p, [eid]: {...p[eid], [m]: {...(p[eid]?.[m]||{}), [field]: newVal}}})); 
    const currentAtt = att[eid]?.[m] || {};
    const dbPayload = { emp_id: eid, fy: "2025", mo: m, present: currentAtt.present, leave: currentAtt.leave, bal: currentAtt.bal, lop: currentAtt.lop, comments: currentAtt.comments };
    dbPayload[field] = newVal;
    await supabase.from('gits_attendance').upsert(dbPayload);
  };

  if (SUPABASE_URL === "PASTE_YOUR_URL_HERE") return <div style={{padding:50,textAlign:"center",fontFamily:"sans-serif",color:"red"}}><h3>Stop!</h3><p>You must paste your Supabase Project URL and API Key at the very top of <b>App.tsx</b> on lines 8 and 9 before the app will load!</p></div>;
  if (!dbLoaded) return <div style={{padding:50,textAlign:"center",fontFamily:"sans-serif"}}><h3>Connecting to Cloud Database...</h3></div>;
  if (slip) return <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.8)",display:"flex",flexDirection:"column"}}><button style={{padding:15,background:"#1a1a2e",color:"#fff",border:"none",cursor:"pointer",fontWeight:"bold",fontSize:16}} onClick={()=>setSlip(null)}>✕ Close PDF Viewer</button><iframe srcDoc={slip} style={{flex:1,border:"none",background:"#fff"}} /></div>;

  if (!ses) return (
    <div style={{display:"flex",justifyContent:"center",paddingTop:100,fontFamily:"sans-serif"}}>
      <div style={{width:320,padding:30,border:"1px solid #ddd",borderRadius:12,boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>
        <h2 style={{textAlign:"center",marginBottom:20}}>{CO}</h2>
        <input style={sInp} placeholder="Employee ID" onChange={e=>idR.current=e.target.value}/>
        <input style={{...sInp,marginTop:15,marginBottom:20}} type="password" placeholder="Password" onChange={e=>pwR.current=e.target.value}/>
        <button style={{width:"100%",padding:12,background:"#1a1a2e",color:"#fff",border:"none",borderRadius:6,cursor:"pointer"}} onClick={login}>Login</button>
      </div>
    </div>
  );

  const TABS = ses?.role === "a" ? ["dashboard","employees","attendance","ledger","payslips"] : ["dashboard","attendance","ledger","payslips"];
  const ADMIN_DRIVE = "https://drive.google.com/drive/folders/1kq4pVPRpaycQczhgycGz0dGHLUn2LmG6?usp=sharing";
  const DRIVE_LINK = ses.role === "a" ? ADMIN_DRIVE : myE?.driveLink;

  return (
    <div style={{padding:20,fontFamily:"sans-serif",maxWidth:1200,margin:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"2px solid #1a1a2e",paddingBottom:10,marginBottom:20}}>
        <div><h2 style={{margin:0}}>{CO} — {ses.role==="e"?"Employee Portal":"Admin"}</h2><small>{AD}</small></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {DRIVE_LINK && <a href={DRIVE_LINK} target="_blank" rel="noreferrer" style={{...btn, background:"#4285F4", color:"#fff", textDecoration:"none", fontWeight:"bold", display:"flex", alignItems:"center"}}>📂 {ses.role==="a"?"Admin Drive":"My Folder"}</a>}
          <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:13,fontWeight:"bold"}}>FY</span><input type="number" value={fy} onChange={e=>setFy(e.target.value)} style={{...sInp, width:80, padding:"6px"}} /><span style={{fontSize:13,fontWeight:"bold"}}>{fyL(fy)}</span></div>
          <button style={btn} onClick={()=>{setSes(null); setTab("dashboard");}}>Sign Out</button>
        </div>
      </div>

      <div style={{display:"flex",gap:10,marginBottom:25,borderBottom:"1px solid #eee"}}>
        {TABS.map(t=>(<button key={t} style={{padding:"10px 15px",background:"none",border:"none",borderBottom:tab===t?"3px solid #1a1a2e":"none",cursor:"pointer",fontWeight:tab===t?"bold":"normal"}} onClick={()=>setTab(t)}>{t.toUpperCase()}</button>))}
      </div>

      {tab==="dashboard" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:20,alignItems:"center"}}>
            <select value={mo} onChange={e=>setMo(e.target.value)} style={{...sInp, width:150}}>{MS.map(m=><option key={m} value={m}>{mL(m, fy)}</option>)}</select>
            {ses.role==="a" && <div style={{marginLeft:"auto",display:"flex",gap:10}}>
              <button style={{...btn,background:"#1a1a2e",color:"#fff"}} onClick={openBulkPayroll}>+ Run Bulk Payroll</button>
              <button style={{...btn,background:"#185FA5",color:"#fff"}} onClick={()=>{setShowOffCycle(true); setShowBulk(false);}}>+ Off-Cycle Payroll</button>
              <button style={{...btn,background:"#1D9E75",color:"#fff"}} onClick={()=>{
                const rows = [["S.No","Emp ID","Employee","Role","Basic","HRA","Conv","Med","Inc","Oth Earn","Gross","LOP","Advance","PT","TDS","Oth Ded","Total Deductions","Taxable Income","Net","Note"]];
                let sno = 1;
                emps.forEach(e=>(pay[e.id]?.[fy]||[]).filter(r=>r.m===mo).forEach(r=>rows.push([sno++,e.id,e.name,e.desig,r.basic,r.hra,r.conv,r.med,r.inc,r.oth,gr(r),r.lop,r.adv,r.pt,r.tds,r.othD||0,dd(r),txInc(r),np(r),r.note||""])));
                exportCSV(rows, `Payroll_${mL(mo, fy)}.csv`);
              }}>Export CSV</button>
            </div>}
          </div>
          
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,textAlign:"center",marginBottom:20}}>
            <div style={card}><div style={lbl}>{ses.role==="a"?"Total Staff":"My Salary"}</div><div style={{fontSize:24,fontWeight:"bold"}}>{ses.role==="a"?emps.length:f$(myE?.basic)}</div></div>
            <div style={card}><div style={lbl}>{ses.role==="a"?"Gross Month":"My YTD Gross"}</div><div style={{fontSize:24,fontWeight:"bold"}}>{ses.role==="a"?f$(dTot.g):f$((pay[myE?.id]?.[fy]||[]).reduce((s,r)=>s+gr(r),0))}</div></div>
            <div style={card}><div style={lbl}>Deductions</div><div style={{fontSize:24,fontWeight:"bold",color:"#D85A30"}}>{f$(dTot.d)}</div></div>
            <div style={card}><div style={lbl}>Net Amount</div><div style={{fontSize:24,fontWeight:"bold",color:"#1D9E75"}}>{f$(dTot.n)}</div></div>
          </div>

          {showBulk && ses.role==="a" && (
            <div style={{...card, border:"1px solid #1a1a2e", marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <h3 style={{margin:0}}>Bulk Payroll for {mL(mo, fy)}</h3>
                <div>
                  <button style={{...btn,background:"#1D9E75",color:"#fff"}} onClick={saveBulkPayroll}>Save All</button>
                  <button style={{...btn,marginLeft:10}} onClick={()=>setShowBulk(false)}>Cancel</button>
                </div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
                  <thead><tr style={{textAlign:"left",whiteSpace:"nowrap"}}>
                    <th style={{padding:8}}>S.No</th><th style={{padding:8}}>Emp ID</th><th style={{padding:8}}>Employee</th><th style={{padding:8}}>Basic</th><th style={{padding:8}}>HRA</th><th style={{padding:8}}>Conv.</th><th style={{padding:8}}>Med.</th><th style={{padding:8}}>Inc.</th><th style={{padding:8}}>Oth Earn</th><th style={{padding:8}}>LOP</th><th style={{padding:8}}>Advance</th><th style={{padding:8}}>PT</th><th style={{padding:8}}>TDS</th><th style={{padding:8}}>Oth Ded.</th><th style={{padding:8}}>Note</th><th style={{padding:8}}>Taxable</th><th style={{padding:8}}>Net</th>
                  </tr></thead>
                  <tbody>{Object.keys(bulkData).map((eid, idx) => {
                    const d = bulkData[eid]; const upd = (k,v) => setBulkData({...bulkData, [eid]:{...d, [k]:v}});
                    const bInp = {padding:"6px",border:"1px solid #ddd",borderRadius:4,minWidth:80,fontSize:12};
                    
                    const g = (+d.basic||0)+(+d.hra||0)+(+d.conv||0)+(+d.med||0)+(+d.inc||0)+(+d.oth||0);
                    const ded = (+d.lop||0)+(+d.adv||0)+(+d.pt||0)+(+d.tds||0)+(+d.othD||0);
                    const n = g - ded; const taxIncVal = n + (+d.pt||0) + (+d.tds||0);

                    return (<tr key={eid} style={{borderBottom:"1px solid #eee"}}>
                      <td style={{padding:8, color:"#666"}}>{idx + 1}</td><td style={{padding:8, color:"#666"}}>{eid}</td>
                      <td style={{whiteSpace:"nowrap",paddingRight:10}}>{emps.find(e=>e.id===eid)?.name}</td>
                      <td><input style={bInp} type="number" value={d.basic} onChange={e=>upd("basic",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.hra} onChange={e=>upd("hra",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.conv} onChange={e=>upd("conv",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.med} onChange={e=>upd("med",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.inc} onChange={e=>upd("inc",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.oth} onChange={e=>upd("oth",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.lop} onChange={e=>upd("lop",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.adv} onChange={e=>upd("adv",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.pt} onChange={e=>upd("pt",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.tds} onChange={e=>upd("tds",e.target.value)}/></td>
                      <td><input style={bInp} type="number" value={d.othD} onChange={e=>upd("othD",e.target.value)}/></td>
                      <td><input style={{...bInp, minWidth: 120}} type="text" placeholder="Optional" value={d.note||""} onChange={e=>upd("note",e.target.value)}/></td>
                      <td style={{fontWeight:"bold",paddingLeft:10}}>{f$(taxIncVal)}</td>
                      <td style={{fontWeight:"bold",color:"#1D9E75",paddingLeft:10}}>{f$(n)}</td>
                    </tr>)
                  })}</tbody>
                </table>
              </div>
            </div>
          )}

          {showOffCycle && ses.role==="a" && (
            <div style={{...card, border:"1px solid #185FA5", marginBottom:20}}>
              <h3>Run Off-Cycle Payroll for {mL(mo, fy)}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:15}}>
                <div><label style={lbl}>Employee</label><select style={sInp} value={offCycleData.empId} onChange={e=>{
                  const id = e.target.value;
                  if(id) setOffCycleData({...offCycleData, empId:id, ...getLastPay(id)});
                  else setOffCycleData({...offCycleData, empId:""});
                }}><option value="">Select...</option>{emps.filter(e=>e.status==="Active").map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
                {[["Basic","basic"],["HRA","hra"],["Conv","conv"],["Med","med"],["Incentive","inc"],["Oth Earn","oth"],["LOP","lop"],["Advance","adv"],["PT","pt"],["TDS","tds"],["Oth Ded","othD"]].map(([l,k])=>(<div key={k}><label style={lbl}>{l}</label><input style={sInp} type="number" value={offCycleData[k]} onChange={e=>setOffCycleData({...offCycleData,[k]:e.target.value})}/></div>))}
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>Note / Reason</label><input style={sInp} value={offCycleData.note} placeholder="e.g. Arrears" onChange={e=>setOffCycleData({...offCycleData,note:e.target.value})}/></div>
              </div>
              <button style={{...btn,background:"#185FA5",color:"#fff",marginRight:10}} onClick={saveOffCycle}>Save Off-Cycle Entry</button>
              <button style={btn} onClick={()=>setShowOffCycle(false)}>Cancel</button>
            </div>
          )}

          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f8f9fa",textAlign:"left",whiteSpace:"nowrap"}}>
                <th style={thS}>S.No</th><th style={thS}>Emp ID</th><th style={thS}>Employee</th><th style={thS}>Role</th><th style={thS}>Basic</th><th style={thS}>HRA</th><th style={thS}>Conv</th><th style={thS}>Med</th><th style={thS}>Inc</th><th style={thS}>Oth Earn</th><th style={thS}>Gross</th><th style={thS}>LOP</th><th style={thS}>Adv</th><th style={thS}>PT</th><th style={thS}>TDS</th><th style={thS}>Oth Ded</th><th style={thS}>Tot. Ded</th><th style={thS}>Taxable</th><th style={thS}>Net</th><th style={thS}>Note</th><th style={thS}>Payslip</th>
              </tr></thead>
              <tbody>{emps.filter(e => ses.role==="a" ? true : e.id===ses.id).map((emp, idx)=>{
                const rows = (pay[emp.id]?.[fy]||[]).filter(r=>r.m===mo);
                if(!rows.length) return <tr key={emp.id}><td style={{...tdS,color:"#666"}}>{idx + 1}</td><td style={{...tdS,color:"#666"}}>{emp.id}</td><td style={tdS}>{emp.name}</td><td style={{...tdS,color:"#888"}}>{emp.desig}</td><td colSpan={17} style={{...tdS,color:"#888",textAlign:"center"}}>No entry</td></tr>;
                return rows.map((r,i)=>(<tr key={emp.id+i} style={{borderBottom:"1px solid #eee"}}>
                  <td style={{...tdS,color:"#666"}}>{idx + 1}</td><td style={{...tdS,color:"#666"}}>{emp.id}</td><td style={tdS}>{emp.name}</td><td style={{...tdS,color:"#888"}}>{emp.desig}</td><td style={tdS}>{f$(r.basic)}</td><td style={tdS}>{f$(r.hra)}</td><td style={tdS}>{f$(r.conv)}</td><td style={tdS}>{f$(r.med)}</td><td style={tdS}>{f$(r.inc)}</td><td style={tdS}>{f$(r.oth)}</td><td style={{...tdS,fontWeight:"bold"}}>{f$(gr(r))}</td><td style={tdS}>{f$(r.lop)}</td><td style={tdS}>{f$(r.adv)}</td><td style={tdS}>{f$(r.pt)}</td><td style={tdS}>{f$(r.tds)}</td><td style={tdS}>{f$(r.othD||0)}</td><td style={{...tdS,color:"#D85A30"}}>{f$(dd(r))}</td><td style={{...tdS,fontWeight:"bold"}}>{f$(txInc(r))}</td><td style={{...tdS,color:"#1D9E75",fontWeight:"bold"}}>{f$(np(r))}</td><td style={{...tdS,fontSize:11,color:"#666"}}>{r.note||"-"}</td><td style={tdS}><button style={{...btn,padding:"4px 8px"}} onClick={()=>setSlip(buildSlip(emp,mo,fyL(fy),rows,att[emp.id]?.[mo]))}>PDF</button></td>
                </tr>));
              })}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- EMPLOYEES TAB --- */}
      {tab==="employees" && ses.role==="a" && (
        <div>
          <div style={{marginBottom:15,display:"flex",justifyContent:"flex-end",gap:10}}>
            <button style={{...btn,background:"#1D9E75",color:"#fff"}} onClick={()=>{
              const rows = [["S.No","Emp ID","Name","Designation","Email","Phone","PAN","Category","Basic Salary","Bank Details","Start Date","End Date","Status","Comments"]];
              let sno = 1;
              emps.forEach(e => rows.push([sno++,e.id,e.name,e.desig,e.email,e.phone,e.pan,e.cat,e.basic,e.bank,e.start,e.end,e.status,e.comments||""]));
              exportCSV(rows, `Employees_${fyL(fy)}.csv`);
            }}>Download Excel</button>
            <button style={{...btn,background:"#1a1a2e",color:"#fff"}} onClick={()=>setShowAddEmp(!showAddEmp)}>+ Add Employee</button>
          </div>

          {showAddEmp && (
            <div style={{...card, border:"1px solid #1a1a2e", marginBottom:20}}>
              <h3 style={{marginTop:0}}>Add New Employee</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:15}}>
                <div><label style={lbl}>Emp ID</label><input style={sInp} value={nE.id} onChange={e=>setNE({...nE,id:e.target.value})}/></div>
                <div><label style={lbl}>Name</label><input style={sInp} value={nE.name} onChange={e=>setNE({...nE,name:e.target.value})}/></div>
                <div><label style={lbl}>Designation</label><input style={sInp} value={nE.desig} onChange={e=>setNE({...nE,desig:e.target.value})}/></div>
                <div><label style={lbl}>Gross Basic Salary</label><input style={sInp} type="number" value={nE.basic} onChange={e=>setNE({...nE,basic:e.target.value})}/></div>
                <div><label style={lbl}>Phone</label><input style={sInp} value={nE.phone} onChange={e=>setNE({...nE,phone:e.target.value})}/></div>
                <div><label style={lbl}>Email</label><input style={sInp} value={nE.email} onChange={e=>setNE({...nE,email:e.target.value})}/></div>
                <div><label style={lbl}>Start Date</label><input style={sInp} type="date" value={nE.start} onChange={e=>setNE({...nE,start:e.target.value})}/></div>
                <div><label style={lbl}>Bank A/C</label><input style={sInp} value={nE.bank} onChange={e=>setNE({...nE,bank:e.target.value})}/></div>
                <div><label style={lbl}>Drive Link</label><input style={sInp} value={nE.driveLink} placeholder="Optional URL" onChange={e=>setNE({...nE,driveLink:e.target.value})}/></div>
              </div>
              <div style={{marginTop:15}}><button style={{...btn,background:"green",color:"#fff",marginRight:10}} onClick={addEmployee}>Save Employee</button><button style={btn} onClick={()=>setShowAddEmp(false)}>Cancel</button></div>
            </div>
          )}

          {editEmp && (
            <div style={{background:"#f0f7ff",padding:20,borderRadius:8,marginBottom:20,border:"1px solid #007bff"}}>
              <h4 style={{marginTop:0}}>Editing: {emps.find(e=>e.id===editEmp)?.name}</h4>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:15}}>
                <div><label style={lbl}>Phone</label><input style={sInp} value={editData.phone||""} onChange={e=>setEditData({...editData,phone:e.target.value})}/></div>
                <div><label style={lbl}>Email</label><input style={sInp} value={editData.email||""} onChange={e=>setEditData({...editData,email:e.target.value})}/></div>
                <div><label style={lbl}>Bank Details</label><input style={sInp} value={editData.bank||""} onChange={e=>setEditData({...editData,bank:e.target.value})}/></div>
                <div><label style={lbl}>Drive Link</label><input style={sInp} value={editData.driveLink||""} onChange={e=>setEditData({...editData,driveLink:e.target.value})}/></div>
                <div><label style={lbl}>Start Date</label><input style={sInp} type="date" value={editData.start||""} onChange={e=>setEditData({...editData,start:e.target.value})}/></div>
                <div><label style={lbl}>End Date</label><input style={sInp} type="date" value={editData.end||""} onChange={e=>setEditData({...editData,end:e.target.value})}/></div>
                <div><label style={lbl}>Status</label><select style={sInp} value={editData.status||"Active"} onChange={e=>setEditData({...editData,status:e.target.value})}><option>Active</option><option>Resigned</option><option>Terminated</option></select></div>
                {editData.end && <div style={{gridColumn:"1/-1"}}><label style={lbl}>Reason for leaving</label><input style={sInp} value={editData.reason||""} onChange={e=>setEditData({...editData,reason:e.target.value})}/></div>}
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>Comments</label><input style={sInp} value={editData.comments||""} onChange={e=>setEditData({...editData,comments:e.target.value})}/></div>
              </div>
              <div style={{marginTop:15,display:"flex",gap:10}}>
                <button style={{...btn,background:"#1D9E75",color:"#fff",border:"none"}} onClick={saveEditEmployee}>Save Update</button>
                <button style={btn} onClick={()=>setEditEmp(null)}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f4f4f4",textAlign:"left",whiteSpace:"nowrap"}}><th style={thS}>S.No</th><th style={thS}>Emp ID</th><th style={thS}>Name</th><th style={thS}>Gross Basic</th><th style={thS}>Drive Folder</th><th style={thS}>Status</th><th style={thS}>Comments</th><th style={thS}>Action</th></tr></thead>
              <tbody>{emps.map((e, idx)=>(<tr key={e.id} style={{borderBottom:"1px solid #eee"}}><td style={{...tdS,color:"#666"}}>{idx + 1}</td><td style={tdS}>{e.id}</td><td style={tdS}><b>{e.name}</b><br/><small style={{color:"#888"}}>{e.desig}</small></td><td style={tdS}>{f$(e.basic)}</td><td style={tdS}>{e.driveLink ? <a href={e.driveLink} target="_blank" rel="noreferrer">Link</a> : "-"}</td><td style={tdS}>{e.status}</td><td style={tdS}>{e.comments||"-"}</td><td style={tdS}><div style={{display:"flex",gap:5}}><button style={{...btn,padding:"4px 8px"}} onClick={()=>{setEditEmp(e.id);setEditData({...e});}}>Edit</button> <button style={{...btn,padding:"4px 8px",color:"red"}} onClick={()=>delEmployee(e.id)}>Del</button></div></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- ATTENDANCE TAB --- */}
      {tab==="attendance" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:20}}><select value={mo} onChange={e=>setMo(e.target.value)} style={sInp}>{MS.map(m=><option key={m} value={m}>{mL(m, fy)}</option>)}</select></div>
          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f4f4f4",textAlign:"left",whiteSpace:"nowrap"}}><th style={thS}>S.No</th><th style={thS}>Emp ID</th><th style={thS}>Name</th><th>Present</th><th>Leave</th><th>Balance</th><th>LOP</th><th>Comments</th></tr></thead>
              <tbody>{emps.filter(e => ses.role==="a" ? e.status==="Active" : e.id===ses.id).map((e, idx)=>{
                const a = att[e.id]?.[mo]||{}; 
                return (<tr key={e.id} style={{borderBottom:"1px solid #eee"}}><td style={{...tdS,color:"#666"}}>{idx + 1}</td><td style={{...tdS,color:"#666"}}>{e.id}</td><td style={tdS}>{e.name}</td><td><input style={{...sInp,minWidth:60}} disabled={ses.role!=="a"} type="number" value={a.present!==undefined?a.present:""} onChange={x=>updAtt(e.id, mo, "present", x.target.value)}/></td><td><input style={{...sInp,minWidth:60}} disabled={ses.role!=="a"} type="number" value={a.leave!==undefined?a.leave:""} onChange={x=>updAtt(e.id, mo, "leave", x.target.value)}/></td><td><input style={{...sInp,minWidth:60}} disabled={ses.role!=="a"} type="number" value={a.bal!==undefined?a.bal:""} onChange={x=>updAtt(e.id, mo, "bal", x.target.value)}/></td><td><input style={{...sInp,minWidth:60}} disabled={ses.role!=="a"} type="number" value={a.lop!==undefined?a.lop:""} onChange={x=>updAtt(e.id, mo, "lop", x.target.value)}/></td><td><input style={{...sInp, minWidth:120}} disabled={ses.role!=="a"} value={a.comments||""} onChange={x=>updAtt(e.id, mo, "comments", x.target.value)}/></td></tr>)
              })}</tbody>
            </table>
          </div>
          
          {ses.role==="a" && (
            <>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:30,marginBottom:15,alignItems:"center"}}>
                <h3 style={{margin:0}}>Leave Register ({fyL(fy)})</h3>
                <button style={{...btn,background:"#1D9E75",color:"#fff",border:"none"}} onClick={()=>{
                  const rows = [["S.No","Emp ID","Employee","Month","Present","Leave","Balance","LOP","Comments"]];
                  let sno = 1;
                  emps.forEach(e=>MS.forEach(m=>{const a=att[e.id]?.[m]; if(a) rows.push([sno++,e.id,e.name,mL(m, fy),a.present||0,a.leave||0,a.bal||0,a.lop||0,a.comments||""]);}));
                  exportCSV(rows, `Leave_Register_${fyL(fy)}.csv`);
                }}>Download Excel</button>
              </div>
              <div style={{...card, padding:0, overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr style={{background:"#1a1a2e",color:"#fff",textAlign:"left",whiteSpace:"nowrap"}}><th style={thS}>S.No</th><th style={thS}>Emp ID</th><th style={thS}>Employee</th>{MS.map(m=><th key={m} style={thS}>{mL(m, fy)}</th>)}</tr></thead>
                  <tbody>
                    {emps.map((e, idx)=>(
                      <tr key={e.id} style={{borderBottom:"1px solid #eee"}}>
                        <td style={{...tdS,color:"#666"}}>{idx + 1}</td>
                        <td style={{...tdS,color:"#666"}}>{e.id}</td>
                        <td style={tdS}><b>{e.name}</b></td>
                        {MS.map(m=><td key={m} style={tdS}>{(att[e.id]?.[m]?.leave>0) ? `${att[e.id]?.[m]?.leave} L` : "-"}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* --- LEDGER TAB --- */}
      {tab==="ledger" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:20}}><select style={sInp} value={mo} onChange={e=>setMo(e.target.value)}><option value="">All Months</option>{MS.map(m=><option key={m} value={m}>{mL(m, fy)}</option>)}</select>{ses.role==="a" && <select style={sInp} value={lEmp} onChange={e=>setLEmp(e.target.value)}><option value="">All Employees</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select>}<div style={{marginLeft:"auto", display:"flex", gap:10}}>{ses.role==="a" && <button style={{...btn,background:"#1a1a2e",color:"#fff"}} onClick={()=>{setEditLedger(null); setNEn({m:"Apr",t:"s",basic:0,hra:0,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,othD:0,note:""}); setShowAddEntry(true);}}>+ Add Entry</button>}<button style={{...btn,background:"#1D9E75",color:"#fff"}} onClick={handleExportLedger}>Download Excel</button></div></div>
          {showAddEntry && ses.role==="a" && (
            <div style={{...card, border:"1px solid #1a1a2e", marginBottom:20}}>
              <h4 style={{marginTop:0}}>{editLedger ? "Edit Ledger Entry" : "Add Manual Ledger Entry"}</h4>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:15}}>
                <div><label style={lbl}>Employee</label><select style={sInp} value={pEmp} disabled={!!editLedger} onChange={e=>{
                  const id = e.target.value; setPEmp(id);
                  if(id) {
                    const l = getLastPay(id);
                    setNEn(prev => ({...prev, basic:l.basic, hra:l.hra, conv:l.conv, med:l.med, pt:l.pt, tds:l.tds}));
                  }
                }}><option value="">Select...</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
                <div><label style={lbl}>Month</label><select style={sInp} value={nEn.m} onChange={e=>setNEn({...nEn,m:e.target.value})}>{MS.map(m=><option key={m} value={m}>{mL(m, fy)}</option>)}</select></div>
                <div><label style={lbl}>Type</label><select style={sInp} value={nEn.t} onChange={e=>setNEn({...nEn,t:e.target.value})}><option value="s">Salary</option><option value="i">Incentive</option></select></div>
                {[["Basic","basic"],["HRA","hra"],["Conv","conv"],["Med","med"],["Incentive","inc"],["Other Earn","oth"],["LOP","lop"],["Advance","adv"],["PT","pt"],["TDS","tds"],["Other Ded","othD"]].map(([l,k])=>(<div key={k}><label style={lbl}>{l}</label><input style={sInp} type="number" value={nEn[k]} onChange={e=>setNEn({...nEn,[k]:e.target.value})}/></div>))}
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>Note / Comments</label><input style={sInp} value={nEn.note} placeholder="Optional reason for entry" onChange={e=>setNEn({...nEn,note:e.target.value})}/></div>
              </div>
              <button style={{...btn,background:"green",color:"#fff"}} onClick={addLedgerEntry}>{editLedger ? "Update Entry" : "Save Entry"}</button><button style={{...btn,marginLeft:10}} onClick={()=>{setShowAddEntry(false); setEditLedger(null);}}>Cancel</button>
            </div>
          )}
          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead style={{background:"#1a1a2e",color:"#fff"}}><tr style={{textAlign:"left",whiteSpace:"nowrap"}}>
                <th style={thS}>S.No</th><th style={thS}>Emp ID</th><th style={thS}>Employee</th><th style={thS}>Month</th><th style={thS}>Basic</th><th style={thS}>HRA</th><th style={thS}>Conv</th><th style={thS}>Med</th><th style={thS}>Inc</th><th style={thS}>Oth Earn</th><th style={thS}>Gross</th><th style={thS}>LOP</th><th style={thS}>Adv</th><th style={thS}>PT</th><th style={thS}>TDS</th><th style={thS}>Oth Ded</th><th style={thS}>Tot. Ded</th><th style={thS}>Taxable</th><th style={thS}>Net</th><th style={thS}>Note</th>{ses.role==="a" && <th style={thS}>Action</th>}
              </tr></thead>
              <tbody>
                {emps.filter(e => ses.role==="a" ? (!lEmp||e.id===lEmp) : e.id===ses.id)
                  .flatMap(e=>(pay[e.id]?.[fy]||[]).filter(r=>!mo||r.m===mo).map((r,i)=>({e,r,i})))
                  .map((item, idx) => (
                  <tr key={item.e.id+item.i} style={{borderBottom:"1px solid #eee"}}>
                    <td style={{...tdS,color:"#666"}}>{idx + 1}</td>
                    <td style={{...tdS,color:"#666"}}>{item.e.id}</td>
                    <td style={tdS}><b>{item.e.name}</b></td>
                    <td style={tdS}>{mL(item.r.m, fy)}</td>
                    <td style={tdS}>{f$(item.r.basic)}</td>
                    <td style={tdS}>{f$(item.r.hra)}</td>
                    <td style={tdS}>{f$(item.r.conv)}</td>
                    <td style={tdS}>{f$(item.r.med)}</td>
                    <td style={tdS}>{f$(item.r.inc)}</td>
                    <td style={tdS}>{f$(item.r.oth)}</td>
                    <td style={{...tdS,fontWeight:"bold"}}>{f$(gr(item.r))}</td>
                    <td style={tdS}>{f$(item.r.lop)}</td>
                    <td style={tdS}>{f$(item.r.adv)}</td>
                    <td style={tdS}>{f$(item.r.pt)}</td>
                    <td style={tdS}>{f$(item.r.tds)}</td>
                    <td style={tdS}>{f$(item.r.othD||0)}</td>
                    <td style={{...tdS,color:"#D85A30"}}>{f$(dd(item.r))}</td>
                    <td style={{...tdS,fontWeight:"bold"}}>{f$(txInc(item.r))}</td>
                    <td style={{...tdS,color:"#1D9E75",fontWeight:"bold",fontSize:12}}>{f$(np(item.r))}</td>
                    <td style={{...tdS,fontSize:11,color:"#666"}}>{item.r.note||"-"}</td>
                    {ses.role==="a" && <td style={tdS}>
                      <div style={{display:"flex", gap:5}}>
                        <button style={{...btn,padding:"4px 8px"}} onClick={()=>{
                          setPEmp(item.e.id); setNEn({ ...item.r });
                          setEditLedger({eid: item.e.id, idx: item.i, db_id: item.r.db_id});
                          setShowAddEntry(true);
                        }}>Edit</button>
                        <button style={{...btn,padding:"4px 8px",color:"red"}} onClick={()=>delLedgerEntry(item.e.id, item.i, item.r.db_id)}>Del</button>
                      </div>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- PAYSLIPS TAB --- */}
      {tab==="payslips" && (
        <div style={card}>
          <h3 style={{marginTop:0,marginBottom:20}}>Payslip Generator</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:15,marginBottom:20}}>
            {ses.role==="a" && <div><label style={lbl}>Select Staff</label><select style={sInp} value={pEmp} onChange={e=>setPEmp(e.target.value)}><option value="">Select...</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></div>}
            <div><label style={lbl}>Start Year</label><input type="number" style={sInp} value={pFy} onChange={e=>setPFy(e.target.value)} /></div>
            <div><label style={lbl}>Month</label><select style={sInp} value={pMo} onChange={e=>setPMo(e.target.value)}>{MS.map(m=><option key={m} value={m}>{mL(m, pFy)}</option>)}</select></div>
          </div>
          <button style={{padding:"12px 24px",background:"#1a1a2e",color:"#fff",border:"none",borderRadius:6,width:"100%",fontSize:14,fontWeight:"bold"}} onClick={()=>{
            const t = ses.role==="a"?pEmp:ses.id; const ents = (pay[t]?.[pFy] || []).filter(x=>x.m===pMo);
            if(ents.length) setSlip(buildSlip(emps.find(e=>e.id===t),pMo,fyL(pFy),ents,att[t]?.[pMo])); else alert("No record found");
          }}>Generate PDF Payslip</button>
        </div>
      )}
    </div>
  );
}

const card = {padding:25,border:"1px solid #eee",borderRadius:8,background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",marginBottom:20};
const thS = {padding:12,fontWeight:500,whiteSpace:"nowrap"};
const tdS = {padding:12,whiteSpace:"nowrap"};
const sInp = {padding:"8px 12px",border:"1px solid #ddd",borderRadius:4,width:"100%",fontSize:13};
const btn = {padding:"8px 16px",background:"#fff",border:"1px solid #ddd",borderRadius:4,cursor:"pointer",fontSize:12};
const lbl = {display:"block",fontSize:11,color:"#666",marginBottom:4};