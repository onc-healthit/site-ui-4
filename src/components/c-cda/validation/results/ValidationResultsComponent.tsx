'use client'
import { useFormStatus } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import ValidatorResultsCard from './ValidationResultsDialog'
import _ from 'lodash'
import ValidatorLoadingCard from './ResultsLoading'
import ErrorDisplayCard from './ErrorDisplay'
import eventTrack from '@/services/analytics'

interface ValidatorComponentProps {
  estimatedValidationTime: number
  response: object
  disabled?: boolean
  fileName: string
  criteria: string
}
interface ResultsMetaData {
  serviceError?: boolean
  serviceErrorMessage?: string | null
}

const ValidatorComponent = ({
  response,
  estimatedValidationTime,
  disabled,
  fileName,
  criteria,
}: ValidatorComponentProps) => {
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const { pending } = useFormStatus()
  //console.log(response)
  const handleLoadingOpen = () => {
    setLoadingOpen(true)
    eventTrack(`Submit C-CDA Validation Form`, 'C-CDA Validation', 'User clicks to submit C-CDA Validation Results')
  }

  const handleLoadingClose = () => {
    setLoadingOpen(false)
    eventTrack(
      `Close loading C-CDA Validation Form - ${criteria}`,
      'C-CDA Validation',
      'User clicks off of C-CDA Validation Results'
    )
  }
  const handleErrorClose = () => {
    setErrorOpen(false)
    eventTrack(
      `Error on C-CDA Validation - ${criteria}`,
      'C-CDA Validation',
      'Error appears on C-CDA Validation Results'
    )
  }
  //if there is service error from the response
  const resultsMetaData: ResultsMetaData = _.get(response, 'resultsMetaData')!
  const isServiceError = _.has(resultsMetaData, 'serviceError') ? resultsMetaData?.serviceError : false
  const serviceErrorMessage = isServiceError ? resultsMetaData?.serviceErrorMessage : ''

  useEffect(() => {
    if (!pending && !_.isEmpty(response) && !_.has(response, 'error')) {
      setResultsOpen(true)
    }
    if (!pending && _.has(response, 'error')) {
      setErrorOpen(true)
    }
    if (!pending && isServiceError) {
      setErrorOpen(true)
    }
  }, [isServiceError, pending, response])

  return (
    <>
      <Button id="validate" type="submit" variant="contained" onClick={handleLoadingOpen} disabled={disabled}>
        VALIDATE
      </Button>

      {pending && (
        <ValidatorLoadingCard
          open={loadingOpen}
          handleClose={handleLoadingClose}
          estimatedValidationTime={estimatedValidationTime}
          fileName={fileName}
        />
      )}
      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}
      {!pending && !_.has(response, 'error') && isServiceError && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={{ error: serviceErrorMessage }} />
      )}
      {!pending && !_.has(response, 'error') && !isServiceError && (
        <ValidatorResultsCard
          results={response}
          open={resultsOpen}
          fileName={fileName}
          criteria={criteria}
          handleClose={() => setResultsOpen(false)}
        />
      )}
    </>
  )
}

export default ValidatorComponent
