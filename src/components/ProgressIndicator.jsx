import React from 'react'

export const ProgressIndicator = ({ numSteps, step }) => (
  <nav className="progress">
    {Array.from({ length: numSteps }).map((_, i) => (
      <div className={(i === step) ? "current-step" : ""}>
        <span>{i+1}</span>
      </div>
    ))}
  </nav>
)

