import React from 'react'
import Countdown from './Countdown'

function AllUpcomingHikes({ events, currentMonth, loading }) {
  // Map month index to image filename
  const getBackgroundImage = () => {
    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ]
    const monthIndex = currentMonth.getMonth()
    return `/images/top6_${monthNames[monthIndex]}.jpg`
  }

  const filterEventsByMonth = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth.getMonth() &&
        eventDate.getFullYear() === currentMonth.getFullYear()
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const filteredEvents = filterEventsByMonth()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const isEventPast = (dateString) => {
    const eventDate = new Date(dateString)
    const now = new Date()
    return eventDate < now
  }

  if (loading) {
    return <div className="loading">Loading hikes...</div>
  }

  return (
    <div className="page-content all-hikes-page" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      <div className="page-header">
        <h2>All Upcoming Hikes</h2>
        <p className="page-description">
          Complete list of scheduled hikes for all 46 peaks this month
        </p>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="no-events">
          <p>No hikes scheduled this month.</p>
          <p className="hint">Try navigating to a different month using the arrows above.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <div key={index} className={`event-card ${isEventPast(event.date) ? 'event-past' : ''}`}>
              <div className="event-header">
                <h3 className={`mountain-name ${isEventPast(event.date) ? 'past-event-text' : ''}`}>
                  {event.mountain}
                </h3>
                <div className="date-badge">{formatDate(event.date)}</div>
              </div>
              
              <Countdown eventDate={event.date} />
              
              <div className="event-details">
                <div className="detail-row">
                  <span className="detail-label">Organizer:</span>
                  <span className="detail-value">{event.organizer}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Distance:</span>
                  <span className="detail-value">{event.miles}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Start Time:</span>
                  <span className="detail-value">{event.starttime || event.startTime}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{event.duration}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Registered:</span>
                  <span className="detail-value">{event.register} hikers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllUpcomingHikes

