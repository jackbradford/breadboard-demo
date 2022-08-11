import React from 'react'

export const SubmitStep = ({data, results}) => (
  <main className="submit">
    {Object.values(data).map((input, i) => (
      <div>
        <span className={results[i] || ""}></span>
        <p>{`Step ${i+1} result: ${results[i] || "waiting..."}`}</p>
      </div>
    ))}
  </main>
)

