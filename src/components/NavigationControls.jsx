import React from 'react'

export const NavigationControls = ({
  next,
  isFirstStep,
  isLastStep,
  isLastInput,
  onSubmit,
  prev
}) => (
  <nav className="controls">
    <button
      className={(isFirstStep) ? "disabled" : ""}
      onClick={prev}
    >
      {"Prev"}
    </button>
    {!isLastStep && (
      <button onClick={isLastInput ? onSubmit : next }>
        {isLastInput ? "Submit" : "Next"}
      </button>
    )}
  </nav>
)

