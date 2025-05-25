import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-content">
          {/* Main animated logo */}
          <div className="logo-container">
            <svg className="logo-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#45B7D1" />
                </linearGradient>
                
                <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#96CEB4" />
                  <stop offset="50%" stopColor="#FFEAA7" />
                  <stop offset="100%" stopColor="#DDA0DD" />
                </linearGradient>

                <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="70%" stopColor="rgba(78, 205, 196, 0.4)" />
                  <stop offset="100%" stopColor="rgba(78, 205, 196, 0)" />
                </radialGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Outer rotating rings */}
              <circle 
                className="ring ring-1" 
                cx="60" 
                cy="60" 
                r="50" 
                fill="none" 
                stroke="url(#primaryGradient)" 
                strokeWidth="2"
                strokeDasharray="20 10"
                filter="url(#glow)"
              />
              
              <circle 
                className="ring ring-2" 
                cx="60" 
                cy="60" 
                r="40" 
                fill="none" 
                stroke="url(#secondaryGradient)" 
                strokeWidth="1.5"
                strokeDasharray="15 8"
                filter="url(#glow)"
              />

              <circle 
                className="ring ring-3" 
                cx="60" 
                cy="60" 
                r="30" 
                fill="none" 
                stroke="url(#primaryGradient)" 
                strokeWidth="1"
                strokeDasharray="10 5"
                filter="url(#glow)"
              />

              {/* Central pulsing core */}
              <circle 
                className="core" 
                cx="60" 
                cy="60" 
                r="15" 
                fill="url(#glowGradient)"
                filter="url(#glow)"
              />

              {/* Floating particles */}
              <circle className="particle particle-1" cx="60" cy="20" r="2" fill="#FF6B6B" />
              <circle className="particle particle-2" cx="100" cy="60" r="1.5" fill="#4ECDC4" />
              <circle className="particle particle-3" cx="60" cy="100" r="2.5" fill="#45B7D1" />
              <circle className="particle particle-4" cx="20" cy="60" r="1.8" fill="#96CEB4" />
              <circle className="particle particle-5" cx="85" cy="35" r="1.2" fill="#FFEAA7" />
              <circle className="particle particle-6" cx="35" cy="85" r="1.6" fill="#DDA0DD" />
            </svg>
          </div>

          {/* Animated text */}
          <div className="loading-text">
            <div className="text-container">
              <span className="letter">S</span>
              <span className="letter">L</span>
              <span className="letter">I</span>
              <span className="letter">M</span>
              <span className="letter-space"></span>
              <span className="letter">M</span>
              <span className="letter">O</span>
              <span className="letter">M</span>
            </div>
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="floating-elements">
            <div className="float-element float-1">🥗</div>
            <div className="float-element float-2">🏃‍♀️</div>
            <div className="float-element float-3">💪</div>
            <div className="float-element float-4">🎯</div>
            <div className="float-element float-5">⚡</div>
            <div className="float-element float-6">🌟</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;