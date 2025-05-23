import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <svg
          className="loader-svg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer rotating ring */}
          <circle
            className="outer-ring"
            cx="100"
            cy="100"
            r="90"
            stroke="#5CDB95"
            strokeWidth="4"
            fill="none"
            strokeDasharray="30 15"
          />
          
          {/* Middle orbit ring */}
          <circle 
            className="middle-ring"
            cx="100"
            cy="100" 
            r="70" 
            stroke="#8EE4AF" 
            strokeWidth="3"
            fill="none"
            strokeDasharray="20 10"
          />

          {/* Background Circle with gradient */}
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="url(#bgGradient)"
          />
          
          {/* Inner Pulsing Circle */}
          <circle
            className="pulse"
            cx="100"
            cy="100"
            r="30"
            fill="url(#pulseGradient)"
          />
          
          {/* Orbital particles */}
          <circle className="particle particle-1" cx="100" cy="30" r="4" fill="#EDF5E1" />
          <circle className="particle particle-2" cx="170" cy="100" r="3" fill="#EDF5E1" />
          <circle className="particle particle-3" cx="100" cy="170" r="5" fill="#EDF5E1" />
          
          {/* Enhanced Calorie Fire Icon */}
          <g className="fire-icon">
            <path
              d="M100 75C105 82 112 82 115 75C123 65 115 50 100 45C85 50 77 65 85 75C88 82 95 82 100 75Z"
              fill="url(#fireGradient)"
            />
            <path
              className="flame-highlight"
              d="M95 65C97 70 103 70 105 65C107 60 104 55 100 53C96 55 93 60 95 65Z"
              fill="#FFEB3B"
              opacity="0.8"
            />
          </g>
          
          {/* Advanced Heartbeat Line */}
          <g className="heartbeat-group">
            <polyline
              className="heartbeat-line"
              points="20,100 40,100 50,80 60,120 70,90 80,110 90,100 110,100 120,80 130,120 140,90 150,110 160,100 180,100"
              fill="none"
              stroke="#FF6F61"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="beat-highlight" cx="60" cy="120" r="0" fill="#FF6F61" />
            <circle className="beat-highlight delay-1" cx="130" cy="120" r="0" fill="#FF6F61" />
          </g>

          {/* Definitions for gradients */}
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0D6E8C" />
              <stop offset="100%" stopColor="#05386B" />
            </radialGradient>
            
            <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EDF5E1" />
            </radialGradient>
            
            <linearGradient id="fireGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6F61" />
              <stop offset="50%" stopColor="#FF9671" />
              <stop offset="100%" stopColor="#FFC75F" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="loader-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;