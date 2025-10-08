import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header({ currentMonth, onPreviousMonth, onNextMonth }) {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-content">
        <div className="title-section">
          <h1 className="site-title">Adirondack 46ers</h1>
          <p className="site-subtitle">Upcoming Mountain Hikes</p>
        </div>
        
        <div className="header-controls">
          <nav className="tabs">
            <Link 
              to="/" 
              className={`tab ${location.pathname === '/' ? 'active' : ''}`}
            >
              The 6
            </Link>
            <Link 
              to="/all-hikes" 
              className={`tab ${location.pathname === '/all-hikes' ? 'active' : ''}`}
            >
              All Upcoming Hikes
            </Link>
            <Link 
              to="/browse-mountains" 
              className={`tab ${location.pathname === '/browse-mountains' || location.pathname.startsWith('/mountain/') ? 'active' : ''}`}
            >
              Browse Mountains
            </Link>
          </nav>
          
          <div className="month-selector">
            <button 
              className="month-arrow" 
              onClick={onPreviousMonth}
              aria-label="Previous month"
            >
              &#8592;
            </button>
            <span className="current-month">{currentMonth}</span>
            <button 
              className="month-arrow" 
              onClick={onNextMonth}
              aria-label="Next month"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

