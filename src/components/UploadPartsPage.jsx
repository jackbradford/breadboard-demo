import React from 'react'
import { ProgressIndicator } from './ProgressIndicator'
import { UploadSteps as StepManager } from './UploadSteps'
import { UploadStep } from './UploadStep'
import { SubmitStep } from './SubmitStep'
import { StepContainer } from './StepContainer'
import { NavigationControls } from './NavigationControls'

const uploadSteps = [
  UploadStep,
  UploadStep,
  SubmitStep
]

const promiseTimeout = seconds => new Promise((res, rej) => {
  setTimeout(() => {
    if (Math.random() > 0.33) res()
    else rej()
  }, seconds*1000)
})

const isInteger = num => Number.isInteger(Number(num))
const isFloat = num => Number(num) === num && num%1 !== 0

const validators = {
  type: str => ["capacitor", "resistor", "transistor"].includes(str),
  nominal_capacitance: isFloat,
  working_voltage: isInteger,
  tolerance: isFloat,
  working_temperature: isInteger,
  temperature_coefficient: isFloat
}

export const UploadPartsPage = () => {

  const { CurrentStep, ...steps } = StepManager(uploadSteps)

  const [parseError, setParseError] = React.useState(false)
  const [data, setData] = React.useState({})
  const [results, setResults] = React.useState({})

  const addData = stepNo => data => setData(prev => ({...prev, [stepNo]: data}))

  const onSubmit = () => {
    setResults({})
    try {
      validate()
      setParseError(false)
      for (const [step, json] of Object.entries(data)) {
        promiseTimeout(step*1.2+1)
          .then(() => setResults(prev => ({...prev, [step]: "success"})))
          .catch(() => setResults(prev => ({...prev, [step]: "fail"})))
      }
      steps.next()
    }
    catch (e) {
      handleError()
    }
  }

  const validate = () => {
    const input = JSON.parse(data[steps.current])
    for (const [key, value] of Object.entries(input)) {
      if (validators[key] && !validators[key](value)) {
        throw new Error()
      }
    }
  }

  const handleError = () => {
    setParseError("JSON is not valid. Please try again.")
  }

  const validateAndProceed = () => {
    try {
      validate()
      setParseError(false)
      steps.next()
    }
    catch (e) {
      handleError()
    }
  }

  return (
    <>
      <h1>Upload Parts</h1>
      <StepContainer
        numSteps={steps.numSteps}
        step={steps.current}
      >
        <ProgressIndicator />
        {parseError && <p className="error">{parseError}</p>}
        <CurrentStep
          addData={addData(steps.current)}
          data={data}
          results={results}
        />
        <NavigationControls
          {...steps}
          next={validateAndProceed}
          onSubmit={onSubmit}
        />
      </StepContainer>
    </>
  )
}

