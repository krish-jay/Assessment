import React from 'react';

export function SkeletonItem() {
  return (
    <div style={{ 
      padding: '8px'
    }}>
      <div style={{ 
        border: '1px solid #e0e0e0', 
        padding: '15px',
        borderRadius: '6px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          height: '20px', 
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '10px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
        <div style={{ 
          height: '16px', 
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '6px',
          width: '60%',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.1s'
        }}></div>
        <div style={{ 
          height: '16px', 
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          width: '40%',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.2s'
        }}></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 5, height = 400 }) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      height: height
    }}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
}

export function SkeletonSearch() {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        alignItems: 'center' 
      }}>
        <div style={{
          height: '40px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          flex: 1,
          maxWidth: '400px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
        <div style={{
          height: '40px',
          width: '100px',
          backgroundColor: '#f0f0f0',
          borderRadius: '6px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.1s'
        }}></div>
      </div>
    </div>
  );
}