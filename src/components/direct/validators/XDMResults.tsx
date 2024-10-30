import { Box, Button, Divider, Typography } from '@mui/material'
import _ from 'lodash'

import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import { useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import palette from '@/styles/palette'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import XDMResultsTemplate from './XDMResultsTemplate'
interface ResultsComponentProps {
  response: ContentProps
  disabled?: boolean
  buttonTitle: string
  onClick: () => void
}
export type ContentProps = {
  pass: boolean
  report: string
  uploadedTrustAnchorFileName?: string
  error?: string
  errorStatus?: number
}
const XDMResults = ({ onClick, response, buttonTitle }: ResultsComponentProps) => {
  const [errorOpen, setErrorOpen] = useState(false)
  const { pending } = useFormStatus()

  const handleErrorClose = () => {
    setErrorOpen(false)
  }

  useEffect(() => {
    if (!pending && _.has(response, 'error')) {
      setErrorOpen(true)
    }
  }, [pending, response, onClick])

  return (
    <>
      <Button onClick={onClick} type="submit" variant="contained" disabled={pending}>
        {pending ? <CircularProgress size={24} /> : buttonTitle}
      </Button>

      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}

      {!pending && !_.has(response, 'error') && !_.isEmpty(response) && <XDMResultsTemplate response={response} />}
    </>
  )
}

export default XDMResults
