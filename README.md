// @ts-nocheck
import React, { useState, useMemo, useCallback, useRef } from "react";

const CO = "Gateway IT Solutions";
const AD = "#201, Plot# 116, Karre Cottage, KPHB 6th Phase, Hyderabad - 500072";
const MS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const DY = {Apr:30,May:31,Jun:30,Jul:31,Aug:31,Sep:30,Oct:31,Nov:30,Dec:31,Jan:31,Feb:28,Mar:31};
const QQ = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];

const fyL = y => { const s = parseInt(y); return `FY ${s}-${String(s+1).slice(2)}`; };
const mL  = (m, y) => `${m} ${["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].includes(m) ? parseInt(y) : parseInt(y)+1}`;
const f$  = n => "₹" + Math.round(n||0).toLocaleString("en-IN");
const sf  = (a, k) => a.reduce((s, r) => s + (r[k]||0), 0);
const gr  = r => (r.basic||0) + (r.hra||0) + (r.conv||0) + (r.med||0) + (r.inc||0) + (r.oth||0);
const dd  = r => (r.lop||0) + (r.adv||0) + (r.pt||0) + (r.tds||0);
const np  = r => gr(r) - dd(r);

// --- FULL STAFF LIST ---
const E0 = [
  {id:"SRR1001",name:"P.Umashankar Anand",desig:"Senior Recruiter",pan:"ALKPA8190Q",cat:"Onshore",basic:38500,phone:"9000000001",email:"umashankar@gatewayit.in",pwd:"SRR1001"},
  {id:"SRR1003",name:"V Sunil Kumar",desig:"Senior Recruiter",pan:"DJCPS8542F",cat:"Onshore",basic:44500,phone:"9000000002",email:"sunil@gatewayit.in",pwd:"SRR1003"},
  {id:"ADMN1002",name:"R Govinda Krishnan",desig:"Accounts Manager",pan:"AUPPK3079C",cat:"Onshore",basic:33000,phone:"9000000003",email:"govinda@gatewayit.in",pwd:"ADMN1002"},
  {id:"D1001",name:"Nagaraju D",desig:"Driver cum Office Boy",pan:"ANJPD1432D",cat:"Onshore",basic:22000,phone:"9000000004",email:"nagaraju@gatewayit.in",pwd:"D1001"},
  {id:"ADMN1004",name:"Balamurali Krishna",desig:"Accountant",pan:"CDNPB5192E",cat:"Onshore",basic:25000,phone:"9000000005",email:"balamurali@gatewayit.in",pwd:"ADMN1004"},
  {id:"RR1026",name:"Maneendra Basa",desig:"Recruiter",pan:"BALPB9607E",cat:"Onshore",basic:30000,phone:"9000000006",email:"maneendra@gatewayit.in",pwd:"RR1026"},
  {id:"BA1001",name:"Bhaskar Akkala",desig:"Senior Software Developer",pan:"AEJPA3495G",cat:"Offshore",basic:200000,phone:"9000000007",email:"bhaskar@gatewayit.in",pwd:"BA1001"},
];

// --- FULL HISTORICAL RECORDS ---
const P0 = {
  SRR1001:{2025:[
    {m:"Apr",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"May",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"May",t:"i",basic:0,hra:0,conv:0,med:0,inc:151972,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1 2025"},
    {m:"Jun",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Jul",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Aug",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Aug",t:"i",basic:0,hra:0,conv:0,med:0,inc:142448,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2 2025"},
    {m:"Sep",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Oct",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Nov",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Nov",t:"i",basic:0,hra:0,conv:0,med:0,inc:176303,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3 2025"},
    {m:"Dec",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Jan",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.38,300/-"},
    {m:"Feb",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:5133,lop:0,adv:0,pt:200,tds:0,note:"Leave encashment Rs.5,133"},
  ]},
  SRR1003:{2025:[
    {m:"Apr",t:"i",basic:0,hra:0,conv:0,med:0,inc:97120,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},
    {m:"Apr",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"May",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Jun",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Jul",t:"i",basic:0,hra:0,conv:0,med:0,inc:106320,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},
    {m:"Jul",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Aug",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Sep",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Oct",t:"i",basic:0,hra:0,conv:0,med:0,inc:111600,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},
    {m:"Oct",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Nov",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Dec",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Jan",t:"i",basic:0,hra:0,conv:0,med:0,inc:95520,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q4"},
    {m:"Jan",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
    {m:"Feb",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"},
  ]},
  ADMN1002:{2025:[
    {m:"Apr",t:"i",basic:0,hra:0,conv:0,med:0,inc:79891,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},
    {m:"Apr",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"May",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Jun",t:"s",basic:21740,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:1100,adv:0,pt:200,tds:0,note:"LOP Rs.1100"},
    {m:"Jul",t:"i",basic:0,hra:0,conv:0,med:0,inc:81791,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},
    {m:"Jul",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Aug",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Sep",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Oct",t:"i",basic:0,hra:0,conv:0,med:0,inc:87588,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},
    {m:"Oct",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Nov",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Dec",t:"s",basic:21775,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:1065,adv:0,pt:200,tds:0,note:"LOP Rs.1065"},
    {m:"Jan",t:"i",basic:0,hra:0,conv:0,med:0,inc:79466,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q4"},
    {m:"Jan",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
    {m:"Feb",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"},
  ]},
  D1001:{2025:[
    {m:"Apr",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},
    {m:"May",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},
    {m:"Jun",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},
    {m:"Jul",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 5972"},
    {m:"Aug",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 4972"},
    {m:"Sep",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 3972"},
    {m:"Oct",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 2972"},
    {m:"Nov",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 1972"},
    {m:"Dec",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:1000,pt:200,tds:0,note:"Hlth Ins Bal 972"},
    {m:"Jan",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:972,pt:200,tds:0,note:"Hlth Ins Bal 0"},
    {m:"Feb",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""},
  ]},
  ADMN1004:{2025:[
    {m:"Apr",t:"i",basic:0,hra:0,conv:0,med:0,inc:39946,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},
    {m:"Apr",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"May",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"Jun",t:"s",basic:14783,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:1667,adv:0,pt:200,tds:0,note:"2 days LOP Rs.1667"},
    {m:"Jul",t:"i",basic:0,hra:0,conv:0,med:0,inc:40896,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},
    {m:"Jul",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"Aug",t:"s",basic:15644,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:806,adv:0,pt:200,tds:0,note:"1 day LOP Rs.806"},
    {m:"Sep",t:"s",basic:15617,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:833,adv:0,pt:200,tds:0,note:"1 day LOP Rs.833"},
    {m:"Oct",t:"i",basic:0,hra:0,conv:0,med:0,inc:43794,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},
    {m:"Oct",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"Nov",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"Dec",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"Jan",t:"i",basic:0,hra:0,conv:0,med:0,inc:39733,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q4"},
    {m:"Jan",t:"s",basic:16450,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.24,800/-"},
    {m:"Feb",t:"s",basic:15557,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:893,adv:0,pt:200,tds:0,note:"1 day LOP Rs.893"},
  ]},
  RR1026:{2025:[
    {m:"Apr",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"May",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"May",t:"i",basic:0,hra:0,conv:0,med:0,inc:32057,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q1"},
    {m:"Jun",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Jul",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Aug",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Aug",t:"i",basic:0,hra:0,conv:0,med:0,inc:35303,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q2"},
    {m:"Sep",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Oct",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Nov",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Nov",t:"i",basic:0,hra:0,conv:0,med:0,inc:45433,oth:0,lop:0,adv:0,pt:0,tds:0,note:"Incentive Q3"},
    {m:"Dec",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Jan",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
    {m:"Feb",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"},
  ]},
  BA1001:{2025:[
    {m:"May",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:20050,note:"Salary Rs.1,79,750/-"},
    {m:"Jun",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:20050,note:"Salary Rs.1,79,750/-"},
    {m:"Jul",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:240000,oth:0,lop:0,adv:0,pt:200,tds:56300,note:"Incentive 240hrs"},
    {m:"Aug",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:128000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 128hrs"},
    {m:"Sep",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:128000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 128hrs"},
    {m:"Oct",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 120hrs"},
    {m:"Nov",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 120hrs"},
    {m:"Dec",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:40000,oth:0,lop:0,adv:0,pt:200,tds:52650,note:"Incentive 40hrs"},
    {m:"Jan",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:61000,note:"Incentive 120hrs"},
    {m:"Feb",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:75000,note:"Incentive 120hrs"},
  ]},
};

const initA = emps => {
  const a = {};
  emps.forEach(e => { a[e.id] = {}; MS.forEach(m => { a[e.id][m] = {present:DY[m]-2,absent:0,leave:0,lop:0,holiday:2,wd:DY[m]-2}; }); });
  return a;
};

const buildSlip = (emp, mo, fy, entries, att) => {
  const sal = entries.find(r => r.t === "s"), incs = entries.filter(r => r.t === "i");
  const a = att || {present:0,absent:0,leave:0,lop:0,holiday:0,wd:0};
  if (!sal && !incs.length) return null;
  const g = sal ? gr(sal) : 0, de = sal ? dd(sal) : 0, n = sal ? np(sal) : 0;
  const ti = incs.reduce((s, r) => s + (r.inc||0), 0);
  const earns = [["Basic Pay",sal?.basic],["HRA",sal?.hra],["Conveyance",sal?.conv],["Medical",sal?.med],sal?.inc?["Incentive",sal.inc]:null,sal?.oth?["Others",sal.oth]:null].filter(Boolean);
  const deds = [sal?.lop?["Leave/LOP",sal.lop]:null,sal?.adv?["Advance",sal.adv]:null,["Prof. Tax",sal?.pt||0],sal?.tds?["TDS",sal.tds]:null].filter(Boolean);
  const nr = Math.max(earns.length, deds.length);
  const trs = Array.from({length:nr}, (_, i) => { const e = earns[i]||["",""]; const d = deds[i]||["",""]; return `<tr><td>${e[0]}</td><td style="text-align:right">${e[1]?f$(e[1]):""}</td><td style="border-left:1px solid #eee">${d[0]}</td><td style="text-align:right">${d[1]?f$(d[1]):""}</td></tr>`; }).join("");
  return `<!DOCTYPE html><html><head><style>body{font-family:Arial;font-size:12px;padding:20px}table{width:100%;border-collapse:collapse}td,th{padding:8px;border:1px solid #eee}th{background:#1a1a2e;color:#fff}</style></head><body><button onclick="window.print()">Print PDF</button><h2>${CO}</h2><p>${AD}</p><h3>Payslip for ${mL(mo,fy)}</h3><p><b>${emp.name}</b> (${emp.desig})</p><table><thead><tr><th colspan="2">Earnings</th><th colspan="2">Deductions</th></tr></thead><tbody>${trs}</tbody></table><h4>Net Pay: ${f$(n+ti)}</h4></body></html>`;
};

function Field({ label, children }) {
  return React.createElement("div", { style: { marginBottom: 10 } },
    React.createElement("div", { style: { fontSize: 11, color: "#666", marginBottom: 3 } }, label),
    children
  );
}

export default function App() {
  const [emps,setEmps]   = useState(E0);
  const [pay,setPay]     = useState(P0);
  const [att,setAtt]     = useState(() => initA(E0));
  const [ses,setSes]     = useState(null);
  const [fy,setFy]       = useState("2025");
  const [tab,setTab]     = useState("dashboard");
  const [mo,setMo]       = useState("Apr");
  const [sEmp,setSEmp]   = useState(null);
  const [slip,setSlip]   = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [editData, setEditData] = useState({});
  const idR = useRef(""), pwR = useRef("");

  const login = () => {
    const id = idR.current.trim(), pw = pwR.current.trim();
    if(id==="admin" && pw==="admin123") return setSes({role:"a"});
    const e = emps.find(x => x.id === id && x.pwd === pw);
    if(e) setSes({role:"e", id:e.id}); else alert("Invalid Login");
  };

  if (slip) return <div style={{position:"fixed",inset:0,zIndex:9999,background:"#fff",display:"flex",flexDirection:"column"}}><button style={{padding:15,background:"#1a1a2e",color:"#fff"}} onClick={()=>setSlip(null)}>Back to App</button><iframe srcDoc={slip} style={{flex:1,border:"none"}} title="PDF Viewer"/></div>;

  if (!ses) return (
    <div style={{display:"flex",justifyContent:"center",paddingTop:100,fontFamily:"sans-serif"}}>
      <div style={{width:320,padding:30,border:"1px solid #ddd",borderRadius:12}}>
        <h2 style={{textAlign:"center"}}>{CO}</h2>
        <Field label="ID"><input style={{width:"100%",padding:8}} onChange={e=>idR.current=e.target.value}/></Field>
        <Field label="Password"><input style={{width:"100%",padding:8}} type="password" onChange={e=>pwR.current=e.target.value}/></Field>
        <button style={{width:"100%",padding:12,background:"#1a1a2e",color:"#fff",marginTop:15,border:"none",borderRadius:6}} onClick={login}>Sign In</button>
      </div>
    </div>
  );

  return (
    <div style={{padding:20,fontFamily:"sans-serif",maxWidth:1200,margin:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"2px solid #1a1a2e",paddingBottom:10,marginBottom:20}}>
        <div><h2 style={{margin:0}}>{CO} Payroll</h2><small>{AD}</small></div>
        <button style={{padding:"8px 16px"}} onClick={()=>setSes(null)}>Sign Out</button>
      </div>

      <div style={{display:"flex",gap:15,marginBottom:25,borderBottom:"1px solid #eee"}}>
        {["dashboard","employees","attendance","ledger"].map(t=>(
          <button key={t} style={{padding:"10px 15px",background:"none",border:"none",borderBottom:tab===t?"3px solid #1a1a2e":"none",fontWeight:tab===t?"bold":"normal",cursor:"pointer"}} onClick={()=>setTab(t)}>{t.toUpperCase()}</button>
        ))}
      </div>

      {tab==="dashboard" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
          <div style={{padding:20,border:"1px solid #eee",borderRadius:8}}><h3>Total Staff</h3><p style={{fontSize:32,fontWeight:"bold"}}>{emps.length}</p></div>
          <div style={{padding:20,border:"1px solid #eee",borderRadius:8}}><h3>Active FY</h3><p>{fyL(fy)}</p></div>
        </div>
      )}

      {tab==="employees" && (
        <div>
          {editEmp && (
            <div style={{background:"#f0f7ff",padding:20,border:"1px solid #007bff",borderRadius:10,marginBottom:20}}>
              <h4>Edit Employee: {emps.find(e=>e.id===editEmp)?.name}</h4>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:15}}>
                <Field label="Phone"><input style={{width:"100%",padding:6}} value={editData.phone||""} onChange={e=>setEditData({...editData,phone:e.target.value})}/></Field>
                <Field label="Email"><input style={{width:"100%",padding:6}} value={editData.email||""} onChange={e=>setEditData({...editData,email:e.target.value})}/></Field>
                <Field label="Designation"><input style={{width:"100%",padding:6}} value={editData.desig||""} onChange={e=>setEditData({...editData,desig:e.target.value})}/></Field>
              </div>
              <div style={{marginTop:15,display:"flex",gap:10}}>
                <button style={{padding:"8px 16px",background:"#28a745",color:"#fff",border:"none",borderRadius:4}} onClick={()=>{setEmps(p=>p.map(x=>x.id===editEmp?{...x,...editData}:x));setEditEmp(null);}}>Save Changes</button>
                <button style={{padding:"8px 16px"}} onClick={()=>setEditEmp(null)}>Cancel</button>
              </div>
            </div>
          )}
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#f8f9fa"}}><th style={{padding:12,textAlign:"left"}}>ID</th><th style={{textAlign:"left"}}>Name</th><th style={{textAlign:"left"}}>Designation</th><th style={{textAlign:"left"}}>Contact</th><th style={{textAlign:"left"}}>Action</th></tr></thead>
            <tbody>
              {emps.map(e=>(
                <tr key={e.id} style={{borderBottom:"1px solid #eee"}}>
                  <td style={{padding:12}}>{e.id}</td><td><b>{e.name}</b></td><td>{e.desig}</td><td>{e.phone}<br/><small>{e.email}</small></td>
                  <td><button style={{padding:"5px 10px"}} onClick={()=>{setEditEmp(e.id);setEditData({phone:e.phone,email:e.email,desig:e.desig});}}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab==="ledger" && (
        <div>
          <select style={{padding:8,marginBottom:20,width:250}} value={sEmp||""} onChange={e=>setSEmp(e.target.value)}>
            <option value="">Select Employee...</option>
            {emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          {sEmp && (
            <div>
              <h3>{emps.find(e=>e.id===sEmp)?.name} History</h3>
              {MS.map(m=>{
                const rows=(pay[sEmp]?.[fy]||[]).filter(r=>r.m===m);
                if(!rows.length) return null;
                return (
                  <div key={m} style={{display:"flex",justifyContent:"space-between",padding:12,borderBottom:"1px solid #eee",alignItems:"center"}}>
                    <span><b>{m}</b> — Net: {f$(rows.reduce((s,r)=>s+np(r),0))}</span>
                    <button style={{padding:"6px 12px"}} onClick={()=>setSlip(buildSlip(emps.find(e=>e.id===sEmp),m,fy,rows,att[sEmp]?.[m]))}>View PDF</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab==="attendance" && <div style={{padding:20,border:"1px solid #eee",borderRadius:8}}>Attendance Tab Active - Use Ledger to generate PDF Payslips for team.</div>}
    </div>
  );
}