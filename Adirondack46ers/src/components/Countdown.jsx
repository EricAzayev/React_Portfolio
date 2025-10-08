import React, { useState, useEffect, useCallback } from 'react'

function Countdown({ eventDate }) {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date()
    const event = new Date(eventDate)
    const difference = event - now

    if (difference <= 0) {
      // Event has passed
      const absDifference = Math.abs(difference)
      const days = Math.floor(absDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((absDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      
      return {
        isPast: true,
        days,
        hours,
        minutes: Math.floor((absDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((absDifference % (1000 * 60)) / 1000)
      }
    }

    // Event is upcoming
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      isPast: false,
      days,
      hours,
      minutes,
      seconds
    }
  }, [eventDate])

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeRemaining])

  const formatTimeUnit = (value, label) => {
    return `${value} ${label}${value !== 1 ? 's' : ''}`
  }

  const { isPast, days, hours, minutes, seconds } = timeRemaining

  if (isPast) {
    return (
      <div className="countdown countdown-past">
        <span className="countdown-label">Event Completed</span>
        <span className="countdown-time past-time">
          {days > 0 && `${formatTimeUnit(days, 'day')} `}
          {hours > 0 && `${formatTimeUnit(hours, 'hour')} `}
          ago
        </span>
      </div>
    )
  }

  // For upcoming events
  if (days > 7) {
    return (
      <div className="countdown countdown-future">
        <span className="countdown-label">Starts in</span>
        <span className="countdown-time">{formatTimeUnit(days, 'day')}</span>
      </div>
    )
  }

  if (days > 0) {
    return (
      <div className="countdown countdown-soon">
        <span className="countdown-label">Starts in</span>
        <span className="countdown-time">
          {formatTimeUnit(days, 'day')} {formatTimeUnit(hours, 'hour')}
        </span>
      </div>
    )
  }

  // Less than 24 hours
  return (
    <div className="countdown countdown-imminent">
      <span className="countdown-label">⚠️ Starts in</span>
      <span className="countdown-time countdown-urgent">
        {hours > 0 && `${formatTimeUnit(hours, 'hour')} `}
        {formatTimeUnit(minutes, 'minute')} {formatTimeUnit(seconds, 'second')}
      </span>
    </div>
  )
}

export default Countdown

