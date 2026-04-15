// @ts-nocheck
import React, { useState, useMemo, useRef } from "react";

const CO = "GATEWAY IT SOLUTIONS";
const AD = "FLAT NO.201, KARRE COTTAGE, VI PHASE, KPHB COLONY, HYDERABAD-500072.";
const MS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const DY = {Apr:30,May:31,Jun:30,Jul:31,Aug:31,Sep:30,Oct:31,Nov:30,Dec:31,Jan:31,Feb:28,Mar:31};

const fyL = y => `${parseInt(y||0)}-${String(parseInt(y||0)+1).slice(2)}`;
const mL  = (m, y) => `${m}-${String(["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].includes(m) ? parseInt(y||0) : parseInt(y||0)+1).slice(2)}`;
const f$  = n => Math.round(n||0).toLocaleString("en-IN");
const gr  = r => (r.basic||0) + (r.hra||0) + (r.conv||0) + (r.med||0) + (r.inc||0) + (r.oth||0);
const dd  = r => (r.lop||0) + (r.pt||0) + (r.tds||0) + (r.adv||0);
const np  = r => gr(r) - dd(r);
const txInc = r => np(r) + (r.pt||0) + (r.tds||0);

// --- COMPLETE EMPLOYEE DATA ---
const E0 = [
  {id:"SRR1001",name:"P.Umashankar Anand",desig:"Senior Recruiter",pan:"ALKPA8190Q",cat:"Onshore",basic:38500,phone:"9000000001",email:"umashankar@gatewayit.in",pwd:"SRR1001",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015027 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/1ar5eR8ujvwnEaGWlCbrHdr7QcKyeZ0Ww?usp=sharing"},
  {id:"SRR1003",name:"V Sunil Kumar",desig:"Senior Recruiter",pan:"DJCPS8542F",cat:"Onshore",basic:44500,phone:"9000000002",email:"sunil@gatewayit.in",pwd:"SRR1003",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015028 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/1ar5eR8ujvwnEaGWlCbrHdr7QcKyeZ0Ww?usp=sharing"},
  {id:"ADMN1002",name:"R Govinda Krishnan",desig:"Accounts Manager",pan:"AUPPK3079C",cat:"Onshore",basic:33000,phone:"9000000003",email:"govinda@gatewayit.in",pwd:"ADMN1002",start:"07-10-2013",end:"",status:"Active",comments:"",bank:"209610100015027 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/1ar5eR8ujvwnEaGWlCbrHdr7QcKyeZ0Ww?usp=sharing"},
  {id:"D1001",name:"Nagaraju D",desig:"Driver cum Office Boy",pan:"ANJPD1432D",cat:"Onshore",basic:22000,phone:"9000000004",email:"nagaraju@gatewayit.in",pwd:"D1001",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015029 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/15mCFlI5c6r0ChRwKUweyRVRhLtoThUEz?usp=sharing"},
  {id:"ADMN1004",name:"Balamurali Krishna",desig:"Accountant",pan:"CDNPB5192E",cat:"Onshore",basic:25000,phone:"9000000005",email:"balamurali@gatewayit.in",pwd:"ADMN1004",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015030 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/13PU-Gx2Oj_ca00riE2wNeP_dS4kusHRv?usp=sharing"},
  {id:"RR1026",name:"Maneendra Basa",desig:"Recruiter",pan:"BALPB9607E",cat:"Onshore",basic:30000,phone:"9000000006",email:"maneendra@gatewayit.in",pwd:"RR1026",start:"01-04-2024",end:"",status:"Active",comments:"",bank:"209610100015031 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/1y2gs9n9uIc4leEE3UMmuJCJIzZkYTMMf?usp=drive_link"},
  {id:"BA1001",name:"Bhaskar Akkala",desig:"Senior Software Developer",pan:"AEJPA3495G",cat:"Offshore",basic:200000,phone:"9000000007",email:"bhaskar@gatewayit.in",pwd:"BA1001",start:"01-05-2024",end:"",status:"Active",comments:"",bank:"209610100015032 ANDHRA BANK",driveLink:"https://drive.google.com/drive/folders/1gSw5MYcOybJdA9D6bnTInpTnQHeT13J3?usp=sharing"}
];

// --- COMPLETE HISTORICAL PAYROLL DATA ---
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
    {m:"Feb",t:"s",basic:26330,hra:9870,conv:800,med:1500,inc:0,oth:5133,lop:0,adv:0,pt:200,tds:0,note:"Leave encashment Rs.5,133"}
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
    {m:"Feb",t:"s",basic:30140,hra:12060,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.44,300/-"}
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
    {m:"Feb",t:"s",basic:22840,hra:7860,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.32,800/-"}
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
    {m:"Feb",t:"s",basic:14250,hra:5700,conv:800,med:1250,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""}
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
    {m:"Feb",t:"s",basic:15557,hra:6500,conv:800,med:1250,inc:0,oth:0,lop:893,adv:0,pt:200,tds:0,note:"1 day LOP Rs.893"}
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
    {m:"Feb",t:"s",basic:20700,hra:7000,conv:800,med:1500,inc:10000,oth:0,lop:0,adv:0,pt:200,tds:0,note:"Salary Rs.39,800/-"}
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
    {m:"Feb",t:"s",basic:131700,hra:66000,conv:800,med:1500,inc:120000,oth:0,lop:0,adv:0,pt:200,tds:75000,note:"Incentive 120hrs"}
  ]}
};

const initA = emps => {
  const a = {};
  emps.forEach(e => { a[e.id] = {}; MS.forEach(m => { a[e.id][m] = {present:DY[m]-2,absent:0,leave:0,bal:0,lop:0,holiday:2,wd:DY[m]-2,comments:""}; }); });
  return a;
};

const exportCSV = (rows, fn) => {
  const csv = "\uFEFF" + rows.map(r => r.map(c => `"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = fn; document.body.appendChild(a); a.click(); setTimeout(() => document.body.removeChild(a), 100);
};

// --- PDF PAYSLIP GENERATOR ---
const buildSlip = (emp, mo, fyStr, entries, att) => {
  const sal = entries.find(r => r.t === "s") || {basic:0,hra:0,conv:0,med:0,oth:0,lop:0,adv:0,pt:0,tds:0,note:""};
  const incs = entries.filter(r => r.t === "i").reduce((s,r)=>s+(r.inc||0), 0);
  
  const a = att || {};
  const wd = a.wd !== undefined ? a.wd : DY[mo];
  const present = a.present !== undefined ? a.present : "-";
  const leave = a.leave || 0;
  const bal = a.bal || 0;
  const lopDays = a.lop || 0;

  const g = gr(sal) + incs, d = dd(sal), n = g - d;
  const ctc = emp.basic ? emp.basic * 12 : 0;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payslip - ${emp.name}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; padding: 20px; color: #333; margin: 0; }
    .payslip-container { max-width: 800px; margin: auto; background: #fff; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-radius: 8px; border-top: 6px solid #1a1a2e; }
    .header { text-align: center; margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
    .header h1 { margin: 0; color: #1a1a2e; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
    .header p { margin: 5px 0 0; font-size: 13px; color: #666; }
    .title { text-align: center; font-size: 15px; font-weight: bold; margin: 20px 0; color: #444; background: #f4f6f8; padding: 10px; border-radius: 4px; }
    .emp-details, .salary-details { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px; }
    .emp-details td, .salary-details td, .salary-details th { padding: 10px 12px; border: 1px solid #e0e0e0; }
    .emp-details td:nth-child(odd) { font-weight: bold; background-color: #fafafa; width: 22%; color: #555; font-size: 12px; }
    .emp-details td:nth-child(even) { width: 28%; color: #222; font-weight: 500; }
    .salary-details th { background-color: #1a1a2e; color: #fff; text-align: left; font-weight: 600; font-size: 12px; letter-spacing: 0.5px; }
    .tr { text-align: right !important; }
    .fw { font-weight: bold; }
    .net-pay-row td { background: #e8f5e9 !important; border-top: 2px solid #1D9E75 !important; font-size: 15px; color: #1D9E75; padding: 15px 12px !important; }
    .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; color: #444; }
    .print-btn { display: block; width: 200px; margin: 0 auto 20px; padding: 12px; text-align: center; background: #1D9E75; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    @media print { .print-btn { display: none; } body { background: #fff; padding: 0; } .payslip-container { box-shadow: none; border: none; padding: 0; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  <div class="payslip-container">
    <div class="header">
      <h1>${CO}</h1>
      <p>${AD}</p>
    </div>
    <div class="title">PAYSLIP FOR THE MONTH OF ${mo.toUpperCase()}-${fyStr.slice(-2)}</div>
    
    <table class="emp-details">
      <tr>
        <td>NAME OF EMPLOYEE</td><td>${emp.name}</td>
        <td>TOTAL WORKING DAYS</td><td>${wd}</td>
      </tr>
      <tr>
        <td>EMPLOYEE CODE</td><td>${emp.id}</td>
        <td>NO OF DAYS WORKED</td><td>${present}</td>
      </tr>
      <tr>
        <td>DESIGNATION</td><td>${emp.desig}</td>
        <td>NO OF LEAVES TAKEN</td><td>${leave}</td>
      </tr>
      <tr>
        <td>CTC PER ANNUM</td><td>${f$(ctc)}</td>
        <td>LEAVE BALANCE</td><td>${bal}</td>
      </tr>
      <tr>
        <td>DATE OF JOINING</td><td colspan="3">${emp.start||""}</td>
      </tr>
    </table>

    <table class="salary-details">
      <thead>
        <tr>
          <th>PARTICULARS</th>
          <th class="tr">TOTAL AMT</th>
          <th class="tr">NET AMT</th>
          <th>DEDUCTIONS</th>
          <th class="tr">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fw">BASIC</td><td class="tr">${f$(sal.basic)}</td><td class="tr">${f$(sal.basic)}</td>
          <td>PROFESSION TAX</td><td class="tr">${f$(sal.pt)}</td>
        </tr>
        <tr>
          <td class="fw">SPECIAL ALLOWANCE</td><td class="tr">0</td><td class="tr">0</td>
          <td>TDS</td><td class="tr">${f$(sal.tds)}</td>
        </tr>
        <tr>
          <td class="fw">HRA</td><td class="tr">${f$(sal.hra)}</td><td class="tr">${f$(sal.hra)}</td>
          <td>STAFF ADVANCE</td><td class="tr">${f$(sal.adv)}</td>
        </tr>
        <tr>
          <td class="fw">CONVEYANCE ALLOWANCE</td><td class="tr">${f$(sal.conv)}</td><td class="tr">${f$(sal.conv)}</td>
          <td>LOP</td><td class="tr">${f$(sal.lop)}</td>
        </tr>
        <tr>
          <td class="fw">MEDICAL ALLOWANCE</td><td class="tr">${f$(sal.med)}</td><td class="tr">${f$(sal.med)}</td>
          <td>NO OF LEAVES (LOP)</td><td class="tr">${lopDays} DAY/S</td>
        </tr>
        <tr>
          <td class="fw">INCENTIVES</td><td class="tr">${f$(incs)}</td><td class="tr">${f$(incs)}</td>
          <td>ADJUSTMENT DED</td><td class="tr">0</td>
        </tr>
        <tr>
          <td class="fw">ARREARS AND OTHERS</td><td class="tr">${f$(sal.oth)}</td><td class="tr">${f$(sal.oth)}</td>
          <td>REASON FOR ADJ</td><td class="tr">0</td>
        </tr>
        <tr class="fw" style="background:#f4f6f8">
          <td>GROSS SALARY</td><td class="tr">${f$(g)}</td><td></td>
          <td>TOTAL DEDUCTIONS</td><td class="tr">${f$(d)}</td>
        </tr>
        <tr class="fw net-pay-row">
          <td>NET SALARY <span style="font-size:10px;font-weight:normal;color:#555;display:block;margin-top:3px">(Gross - Deductions)</span></td>
          <td class="tr">${f$(n)}</td><td colspan="3"></td>
        </tr>
        <tr>
          <td class="fw">CREDITED TO BANK A/C</td>
          <td>SAVINGS A/C</td>
          <td colspan="3" class="fw">${emp.bank||""}</td>
        </tr>
      </tbody>
    </table>
    
    ${sal.note ? `<div style="font-size:12px;color:#555;margin-bottom:15px"><b>Note:</b> ${sal.note}</div>` : ""}
    
    <div class="footer">
      <div>FOR ${CO}<br><br><span style="color:#666;font-size:11px">HR DEPARTMENT</span></div>
    </div>
    <div style="margin-top:30px;font-size:10px;text-align:center;color:#888;border-top:1px solid #eee;padding-top:15px">
      This is a computer generated pay slip that does not require any signature.
    </div>
  </div>
</body>
</html>`;
};

export default function App() {
  const [emps,setEmps] = useState(E0);
  const [pay,setPay]   = useState(P0);
  const [att,setAtt]   = useState(() => initA(E0));
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
  const [nEn, setNEn] = useState({m:"Apr",t:"s",basic:0,hra:0,conv:800,med:1500,inc:0,oth:0,lop:0,adv:0,pt:200,tds:0,note:""});
  const [showBulk, setShowBulk] = useState(false);
  const [bulkData, setBulkData] = useState({});
  const [showOffCycle, setShowOffCycle] = useState(false);
  const [offCycleData, setOffCycleData] = useState({empId:"", basic:0, hra:0, conv:800, med:1500, inc:0, oth:0, lop:0, pt:200, tds:0, note:""});

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

  const addEmployee = () => {
    if(!nE.id || !nE.name) return alert("ID and Name are required");
    setEmps([...emps, {...nE, basic: Number(nE.basic)}]); setPay({...pay, [nE.id]: {}}); setAtt({...att, [nE.id]: {} });
    setShowAddEmp(false); setNE({id:"",name:"",desig:"",pan:"",cat:"Onshore",basic:"",phone:"",email:"",pwd:"",start:"",end:"",status:"Active",bank:"",comments:"",driveLink:""});
  };

  const addLedgerEntry = () => {
    if(!pEmp) return alert("Select Employee First");
    const e = {...nEn, basic:+nEn.basic, hra:+nEn.hra, conv:+nEn.conv, med:+nEn.med, inc:+nEn.inc, oth:+nEn.oth, lop:+nEn.lop, adv:+nEn.adv, pt:+nEn.pt, tds:+nEn.tds};
    setPay({...pay, [pEmp]: {...pay[pEmp], [fy]: [...(pay[pEmp]?.[fy]||[]), e]}}); setShowAddEntry(false);
  };

  const openBulkPayroll = () => {
    const defaults = {};
    emps.filter(e=>e.status==="Active").forEach(emp => { defaults[emp.id] = {basic:emp.basic, hra:Math.round((emp.basic||0)*0.4), conv:800, med:1500, inc:0, lop:0, pt:200, tds:0, note:""}; });
    setBulkData(defaults); setShowBulk(true); setShowOffCycle(false);
  };

  const saveBulkPayroll = () => {
    const nextPay = {...pay};
    Object.keys(bulkData).forEach(eid => {
      const d = bulkData[eid]; const existing = nextPay[eid]?.[fy]||[];
      if(!existing.find(r=>r.m===mo && r.t==="s")) {
        nextPay[eid] = {...nextPay[eid], [fy]: [...existing, {m:mo, t:"s", basic:+d.basic, hra:+d.hra, conv:+d.conv, med:+d.med, inc:+d.inc, oth:0, lop:+d.lop, adv:0, pt:+d.pt, tds:+d.tds, note:d.note||""}]};
      }
    });
    setPay(nextPay); setShowBulk(false); alert(`Bulk Payroll processed for ${mo} ${fyL(fy)}`);
  };

  const saveOffCycle = () => {
    if(!offCycleData.empId) return alert("Select an employee");
    const entry = { m: mo, t: "s", basic: +offCycleData.basic, hra: +offCycleData.hra, conv: +offCycleData.conv, med: +offCycleData.med, inc: +offCycleData.inc, oth: +offCycleData.oth, lop: +offCycleData.lop, adv: 0, pt: +offCycleData.pt, tds: +offCycleData.tds, note: offCycleData.note || "Off-Cycle" };
    setPay(prev => ({ ...prev, [offCycleData.empId]: { ...prev[offCycleData.empId], [fy]: [...(prev[offCycleData.empId]?.[fy]||[]), entry] } }));
    setShowOffCycle(false); setOffCycleData({empId:"", basic:0, hra:0, conv:800, med:1500, inc:0, oth:0, lop:0, pt:200, tds:0, note:""});
    alert(`Off-Cycle Payroll saved for ${emps.find(e=>e.id===offCycleData.empId)?.name}`);
  };

  const handleExportLedger = () => {
    const head = ["Employee", "Month", "Type", "Basic", "HRA", "Conv", "Med", "Incentive", "Others", "Gross Amount", "LOP", "Prof Tax", "TDS", "Other Ded", "Taxable Income", "Net Amount"];
    const rows = [head]; const tEmps = ses?.role==="a" ? (lEmp ? emps.filter(e=>e.id===lEmp) : emps) : [myE];
    tEmps.forEach(e => { if(!e) return; (pay[e.id]?.[fy] || []).filter(r=>!mo||r.m===mo).forEach(r => rows.push([e.name, r.m, r.t==="s"?"Salary":"Incentive", r.basic||0, r.hra||0, r.conv||0, r.med||0, r.inc||0, r.oth||0, gr(r), r.lop||0, r.pt||0, r.tds||0, r.adv||0, txInc(r), np(r)])); });
    exportCSV(rows, `Ledger_${fyL(fy)}.csv`);
  };

  const updAtt = (eid, m, field, val) => { setAtt(p => ({...p, [eid]: {...p[eid], [m]: {...(p[eid]?.[m]||{}), [field]: val}}})); };

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
            <select value={mo} onChange={e=>setMo(e.target.value)} style={{...sInp, width:150}}>{MS.map(m=><option key={m}>{m}</option>)}</select>
            {ses.role==="a" && <div style={{marginLeft:"auto",display:"flex",gap:10}}>
              <button style={{...btn,background:"#1a1a2e",color:"#fff"}} onClick={openBulkPayroll}>+ Run Bulk Payroll</button>
              <button style={{...btn,background:"#185FA5",color:"#fff"}} onClick={()=>{setShowOffCycle(true); setShowBulk(false);}}>+ Off-Cycle Payroll</button>
              <button style={{...btn,background:"#1D9E75",color:"#fff"}} onClick={()=>{
                const rows = [["Employee","Role","Basic","Inc","Gross","PT","TDS","Taxable Income","Net"]];
                emps.forEach(e=>(pay[e.id]?.[fy]||[]).filter(r=>r.m===mo).forEach(r=>rows.push([e.name,e.desig,r.basic,r.inc,gr(r),r.pt,r.tds,txInc(r),np(r)])));
                exportCSV(rows, `Payroll_${mo}_${fyL(fy)}.csv`);
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
              <h3>Bulk Payroll for {mo} {fyL(fy)}</h3>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
                  <thead><tr style={{textAlign:"left"}}><th>Employee</th><th>Basic</th><th>HRA</th><th>Inc</th><th>LOP</th><th>PT</th><th>Net</th></tr></thead>
                  <tbody>{Object.keys(bulkData).map(eid => {
                    const d = bulkData[eid]; const upd = (k,v) => setBulkData({...bulkData, [eid]:{...d, [k]:v}});
                    return (<tr key={eid}><td>{emps.find(e=>e.id===eid)?.name}</td><td><input style={sInp} type="number" value={d.basic} onChange={e=>upd("basic",e.target.value)}/></td><td><input style={sInp} type="number" value={d.hra} onChange={e=>upd("hra",e.target.value)}/></td><td><input style={sInp} type="number" value={d.inc} onChange={e=>upd("inc",e.target.value)}/></td><td><input style={sInp} type="number" value={d.lop} onChange={e=>upd("lop",e.target.value)}/></td><td><input style={sInp} type="number" value={d.pt} onChange={e=>upd("pt",e.target.value)}/></td><td style={{fontWeight:"bold",color:"#1D9E75"}}>{f$((+d.basic||0)+(+d.hra||0)+(+d.inc||0)-(+d.lop||0)-(+d.pt||0))}</td></tr>)
                  })}</tbody>
                </table>
              </div>
              <button style={{...btn,background:"#1D9E75",color:"#fff",marginTop:15}} onClick={saveBulkPayroll}>Save All</button>
            </div>
          )}

          {showOffCycle && ses.role==="a" && (
            <div style={{...card, border:"1px solid #185FA5", marginBottom:20}}>
              <h3>Run Off-Cycle Payroll for {mo} {fyL(fy)}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:15}}>
                <div><label style={lbl}>Employee</label><select style={sInp} value={offCycleData.empId} onChange={e=>{const emp=emps.find(x=>x.id===e.target.value);setOffCycleData({...offCycleData, empId:e.target.value, basic:emp?.basic||0, hra:Math.round((emp?.basic||0)*0.4)});}}><option value="">Select...</option>{emps.filter(e=>e.status==="Active").map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
                {[["Basic","basic"],["HRA","hra"],["Conv","conv"],["Med","med"],["Incentive","inc"],["Others","oth"],["LOP","lop"],["PT","pt"],["TDS","tds"]].map(([l,k])=>(<div key={k}><label style={lbl}>{l}</label><input style={sInp} type="number" value={offCycleData[k]} onChange={e=>setOffCycleData({...offCycleData,[k]:e.target.value})}/></div>))}
                <div style={{gridColumn:"1/-1"}}><label style={lbl}>Note / Reason</label><input style={sInp} value={offCycleData.note} placeholder="e.g. Arrears" onChange={e=>setOffCycleData({...offCycleData,note:e.target.value})}/></div>
              </div>
              <button style={{...btn,background:"#185FA5",color:"#fff",marginRight:10}} onClick={saveOffCycle}>Save Off-Cycle Entry</button>
              <button style={btn} onClick={()=>setShowOffCycle(false)}>Cancel</button>
            </div>
          )}

          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f8f9fa",textAlign:"left"}}><th style={thS}>Employee</th><th style={thS}>Role</th><th style={thS}>Basic</th><th style={thS}>Inc.</th><th style={thS}>Gross</th><th style={thS}>PT</th><th style={thS}>TDS</th><th style={thS}>Taxable</th><th style={thS}>Net</th><th style={thS}>Payslip</th></tr></thead>
              <tbody>{emps.filter(e => ses.role==="a" ? true : e.id===ses.id).map(emp=>{
                const rows = (pay[emp.id]?.[fy]||[]).filter(r=>r.m===mo);
                if(!rows.length) return <tr key={emp.id}><td style={tdS}>{emp.name}</td><td style={{...tdS,color:"#888"}}>{emp.desig}</td><td colSpan={8} style={{...tdS,color:"#888",textAlign:"center"}}>No entry</td></tr>;
                return rows.map((r,i)=>(<tr key={emp.id+i} style={{borderBottom:"1px solid #eee"}}><td style={tdS}>{emp.name}</td><td style={{...tdS,color:"#888"}}>{emp.desig}</td><td style={tdS}>{f$(r.basic)}</td><td style={tdS}>{f$(r.inc)}</td><td style={{...tdS,fontWeight:"bold"}}>{f$(gr(r))}</td><td style={tdS}>{f$(r.pt)}</td><td style={tdS}>{f$(r.tds)}</td><td style={{...tdS,fontWeight:"bold"}}>{f$(txInc(r))}</td><td style={{...tdS,color:"#1D9E75",fontWeight:"bold"}}>{f$(np(r))}</td><td style={tdS}><button style={{...btn,padding:"4px 8px"}} onClick={()=>setSlip(buildSlip(emp,mo,fyL(fy),rows,att[emp.id]?.[mo]))}>PDF</button></td></tr>));
              })}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- RESTORED ADMIN EMPLOYEES TAB --- */}
      {tab==="employees" && ses.role==="a" && (
        <div>
          <div style={{marginBottom:15,display:"flex",justifyContent:"flex-end"}}>
            <button style={{...btn,background:"#1a1a2e",color:"#fff"}} onClick={()=>setShowAddEmp(!showAddEmp)}>+ Add Employee</button>
          </div>

          {showAddEmp && (
            <div style={{...card, border:"1px solid #1a1a2e", marginBottom:20}}>
              <h3 style={{marginTop:0}}>Add New Employee</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:15}}>
                <div><label style={lbl}>Emp ID</label><input style={sInp} value={nE.id} onChange={e=>setNE({...nE,id:e.target.value})}/></div>
                <div><label style={lbl}>Name</label><input style={sInp} value={nE.name} onChange={e=>setNE({...nE,name:e.target.value})}/></div>
                <div><label style={lbl}>Designation</label><input style={sInp} value={nE.desig} onChange={e=>setNE({...nE,desig:e.target.value})}/></div>
                <div><label style={lbl}>Basic Salary</label><input style={sInp} type="number" value={nE.basic} onChange={e=>setNE({...nE,basic:e.target.value})}/></div>
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
                <button style={{...btn,background:"#1D9E75",color:"#fff",border:"none"}} onClick={()=>{setEmps(p=>p.map(x=>x.id===editEmp?{...x,...editData,comments:editData.reason?editData.reason:editData.comments}:x));setEditEmp(null);}}>Save Update</button>
                <button style={btn} onClick={()=>setEditEmp(null)}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f4f4f4",textAlign:"left"}}><th style={thS}>ID</th><th style={thS}>Name</th><th style={thS}>Email</th><th style={thS}>PAN</th><th style={thS}>Basic</th><th style={thS}>Drive Folder</th><th style={thS}>Status</th><th style={thS}>Action</th></tr></thead>
              <tbody>{emps.map(e=>(<tr key={e.id} style={{borderBottom:"1px solid #eee"}}><td style={tdS}>{e.id}</td><td style={tdS}><b>{e.name}</b></td><td style={tdS}>{e.email}</td><td style={tdS}>{e.pan}</td><td style={tdS}>{f$(e.basic)}</td><td style={tdS}>{e.driveLink ? <a href={e.driveLink} target="_blank" rel="noreferrer">Link</a> : "-"}</td><td style={tdS}>{e.status}</td><td style={tdS}><div style={{display:"flex",gap:5}}><button style={{...btn,padding:"4px 8px"}} onClick={()=>{setEditEmp(e.id);setEditData({...e});}}>Edit</button> <button style={{...btn,padding:"4px 8px",color:"red"}} onClick={()=>setEmps(p=>p.filter(x=>x.id!==e.id))}>Del</button></div></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- RESTORED ATTENDANCE TAB HISTORY --- */}
      {tab==="attendance" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:20}}><select value={mo} onChange={e=>setMo(e.target.value)} style={sInp}>{MS.map(m=><option key={m}>{m}</option>)}</select></div>
          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f4f4f4",textAlign:"left"}}><th style={thS}>Name</th><th>Present</th><th>Leave</th><th>Balance</th><th>LOP</th><th>Comments</th></tr></thead>
              <tbody>{emps.filter(e => ses.role==="a" ? e.status==="Active" : e.id===ses.id).map(e=>{
                const a = att[e.id]?.[mo]||{}; const upd = (f,v) => setAtt(p=>({...p,[e.id]:{...p[e.id],[mo]:{...p[e.id]?.[mo],[f]:v}}}));
                return (<tr key={e.id} style={{borderBottom:"1px solid #eee"}}><td style={tdS}>{e.name}</td><td><input style={{...sInp,width:60}} disabled={ses.role!=="a"} type="number" value={a.present!==undefined?a.present:""} onChange={x=>upd("present",x.target.value)}/></td><td><input style={{...sInp,width:60}} disabled={ses.role!=="a"} type="number" value={a.leave!==undefined?a.leave:""} onChange={x=>upd("leave",x.target.value)}/></td><td><input style={{...sInp,width:60}} disabled={ses.role!=="a"} type="number" value={a.bal!==undefined?a.bal:""} onChange={x=>upd("bal",x.target.value)}/></td><td><input style={{...sInp,width:60}} disabled={ses.role!=="a"} type="number" value={a.lop!==undefined?a.lop:""} onChange={x=>upd("lop",x.target.value)}/></td><td><input style={sInp} disabled={ses.role!=="a"} value={a.comments||""} onChange={x=>upd("comments",x.target.value)}/></td></tr>)
              })}</tbody>
            </table>
          </div>
          
          {ses.role==="a" && (
            <>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:30,marginBottom:15,alignItems:"center"}}>
                <h3 style={{margin:0}}>Leave Register ({fyL(fy)})</h3>
                <button style={{...btn,background:"#1D9E75",color:"#fff",border:"none"}} onClick={()=>{
                  const rows = [["Employee","Month","Present","Leave","Balance","LOP","Comments"]];
                  emps.forEach(e=>MS.forEach(m=>{const a=att[e.id]?.[m]; if(a) rows.push([e.name,m,a.present||0,a.leave||0,a.bal||0,a.lop||0,a.comments||""]);}));
                  exportCSV(rows, `Leave_Register_${fyL(fy)}.csv`);
                }}>Download Excel</button>
              </div>
              <div style={{...card, padding:0, overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr style={{background:"#1a1a2e",color:"#fff",textAlign:"left"}}><th style={thS}>Employee</th>{MS.map(m=><th key={m} style={thS}>{m}</th>)}</tr></thead>
                  <tbody>
                    {emps.map(e=>(
                      <tr key={e.id} style={{borderBottom:"1px solid #eee"}}>
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

      {tab==="ledger" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:20}}><select style={sInp} value={mo} onChange={e=>setMo(e.target.value)}><option value="">All Months</option>{MS.map(m=><option key={m}>{m}</option>)}</select>{ses.role==="a" && <select style={sInp} value={lEmp} onChange={e=>setLEmp(e.target.value)}><option value="">All Employees</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select>}<div style={{marginLeft:"auto", display:"flex", gap:10}}>{ses.role==="a" && <button style={{...btn,background:"#1a1a2e",color:"#fff"}} onClick={()=>setShowAddEntry(!showAddEntry)}>+ Add Entry</button>}<button style={{...btn,background:"#1D9E75",color:"#fff"}} onClick={handleExportLedger}>Download Excel</button></div></div>
          {showAddEntry && ses.role==="a" && (
            <div style={{...card, border:"1px solid #1a1a2e", marginBottom:20}}>
              <h4 style={{marginTop:0}}>Add Manual Ledger Entry</h4>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:15}}>
                <div><label style={lbl}>Employee</label><select style={sInp} value={pEmp} onChange={e=>setPEmp(e.target.value)}><option value="">Select...</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
                <div><label style={lbl}>Month</label><select style={sInp} value={nEn.m} onChange={e=>setNEn({...nEn,m:e.target.value})}>{MS.map(m=><option key={m}>{m}</option>)}</select></div>
                <div><label style={lbl}>Type</label><select style={sInp} value={nEn.t} onChange={e=>setNEn({...nEn,t:e.target.value})}><option value="s">Salary</option><option value="i">Incentive</option></select></div>
                {[["Basic","basic"],["HRA","hra"],["Conv","conv"],["Med","med"],["Incentive","inc"],["Others","oth"],["LOP","lop"],["Adv","adv"],["PT","pt"],["TDS","tds"]].map(([l,k])=>(<div key={k}><label style={lbl}>{l}</label><input style={sInp} type="number" value={nEn[k]} onChange={e=>setNEn({...nEn,[k]:e.target.value})}/></div>))}
              </div>
              <button style={{...btn,background:"green",color:"#fff"}} onClick={addLedgerEntry}>Save Entry</button><button style={{...btn,marginLeft:10}} onClick={()=>setShowAddEntry(false)}>Cancel</button>
            </div>
          )}
          <div style={{...card, padding:0, overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead style={{background:"#1a1a2e",color:"#fff"}}><tr style={{textAlign:"left"}}><th style={thS}>Employee</th><th style={thS}>Month</th><th>Basic</th><th>Inc</th><th>Gross</th><th>Taxable</th><th>Net</th>{ses.role==="a" && <th style={thS}>Action</th>}</tr></thead>
              <tbody>{emps.filter(e => ses.role==="a" ? (!lEmp||e.id===lEmp) : e.id===ses.id).flatMap(e=>(pay[e.id]?.[fy]||[]).filter(r=>!mo||r.m===mo).map((r,i)=>(
                <tr key={e.id+i} style={{borderBottom:"1px solid #eee"}}><td style={tdS}>{e.name}</td><td style={tdS}>{r.m}</td><td>{f$(r.basic)}</td><td>{f$(r.inc)}</td><td>{f$(gr(r))}</td><td style={{fontWeight:"bold"}}>{f$(txInc(r))}</td><td style={{color:"#1D9E75",fontWeight:"bold"}}>{f$(np(r))}</td>{ses.role==="a" && <td style={tdS}><button style={{...btn,padding:"4px 8px",color:"red"}} onClick={()=>setPay({...pay,[e.id]:{...pay[e.id],[fy]:pay[e.id][fy].filter((_,idx)=>idx!==i)}})}>Del</button></td>}</tr>
              )))}</tbody>
            </table>
          </div>
        </div>
      )}

      {tab==="payslips" && (
        <div style={card}>
          <h3 style={{marginTop:0,marginBottom:20}}>Payslip Generator</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:15,marginBottom:20}}>
            {ses.role==="a" && <div><label style={lbl}>Select Staff</label><select style={sInp} value={pEmp} onChange={e=>setPEmp(e.target.value)}><option value="">Select...</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select></div>}
            <div><label style={lbl}>Start Year</label><input type="number" style={sInp} value={pFy} onChange={e=>setPFy(e.target.value)} /></div>
            <div><label style={lbl}>Month</label><select style={sInp} value={pMo} onChange={e=>setPMo(e.target.value)}>{MS.map(m=><option key={m}>{m}</option>)}</select></div>
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
const thS = {padding:12,fontWeight:500};
const tdS = {padding:12};
const sInp = {padding:"8px 12px",border:"1px solid #ddd",borderRadius:4,width:"100%",fontSize:13};
const btn = {padding:"8px 16px",background:"#fff",border:"1px solid #ddd",borderRadius:4,cursor:"pointer",fontSize:12};
const lbl = {display:"block",fontSize:11,color:"#666",marginBottom:4};