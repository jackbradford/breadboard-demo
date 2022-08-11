import React from 'react'

export const StepContainer = ({children, numSteps, step}) => (
  <>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { numSteps, step })
      }
      return child
    })}
  </>
)

