'use client'
import { useFormStatus } from 'react-dom'
import React, { useState, useEffect, FC } from 'react'
import { Button } from '@mui/material'
import ValidatorResultsCard from './ValidationResultsDialog'
import _ from 'lodash'
import ValidatorLoadingCard from './ResultsLoading'
import ErrorDisplayCard from './ErrorDisplay'

interface ValidatorComponentProps {
  estimatedValidationTime: number
  response: object
  disabled: boolean
}

const ValidatorComponent = ({ response, estimatedValidationTime, disabled }: ValidatorComponentProps) => {
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const { pending } = useFormStatus()
  //console.log(response)
  const handleLoadingOpen = () => {
    setLoadingOpen(true)
  }

  const handleLoadingClose = () => {
    setLoadingOpen(false)
  }
  const handleErrorClose = () => {
    setErrorOpen(false)
  }

  useEffect(() => {
    if (!pending && !_.isEmpty(response) && !_.has(response, 'error')) {
      setResultsOpen(true)
    }
    if (!pending && _.has(response, 'error')) {
      setErrorOpen(true)
    }
  }, [pending, response])

  return (
    <>
      <Button type="submit" variant="contained" onClick={handleLoadingOpen} disabled={disabled}>
        VALIDATE
      </Button>

      {pending && (
        <ValidatorLoadingCard
          open={loadingOpen}
          handleClose={handleLoadingClose}
          estimatedValidationTime={estimatedValidationTime}
        />
      )}
      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}
      {!pending && !_.has(response, 'error') && (
        <ValidatorResultsCard results={response} open={resultsOpen} handleClose={() => setResultsOpen(false)} />
      )}
    </>
  )
}

export default ValidatorComponent
