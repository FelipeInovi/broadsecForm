import { useState } from 'react'

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0)

  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  const next = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0))
  const goTo = (step: number) => setCurrentStep(step)

  return { currentStep, totalSteps, isFirst, isLast, next, back, goTo }
}
