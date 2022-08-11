import React from 'react'

export const UploadSteps = (steps) => {

  const [currentStep, setCurrentStep]  = React.useState(0)

  const numSteps = steps.length
  const isFirstStep = currentStep === 0
  const isLastInput = currentStep + 2 === numSteps
  const isLastStep = currentStep + 1 === numSteps
  
  const next = () => {
    if (isLastStep) return
    setCurrentStep(prev => prev + 1)
  }

  const prev = () => {
    if (isFirstStep) return
    setCurrentStep(prev => prev - 1)
  }

  return {
    current: currentStep,
    CurrentStep: steps[currentStep],
    isFirstStep,
    isLastInput,
    isLastStep,
    next,
    numSteps,
    prev,
  }
}

