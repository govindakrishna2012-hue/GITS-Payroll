import React from "react";

export default function App() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f4f4f9' 
    }}>
      <h1 style={{ color: '#1a1a2e', fontSize: '3rem' }}>GATEWAY PORTAL</h1>
      <h2 style={{ color: 'green' }}>STATUS: SYSTEM ONLINE</h2>
      <p style={{ color: '#666' }}>If you see this, the blank screen is officially fixed.</p>
      <p style={{ marginTop: '20px', fontSize: '12px' }}>Timestamp: April 24, 2026</p>
    </div>
  );
}