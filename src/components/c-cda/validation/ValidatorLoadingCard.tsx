'use client'
import { useFormStatus } from 'react-dom'
import React, { useState, useEffect, FC } from 'react'
import { Typography, IconButton, LinearProgress, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ValidatorResultsCard from './results/ValidationResultsCard'
import palette from '@/styles/palette'
import _ from 'lodash'

interface ValidatorLoadingCardProps {
  open: boolean
  handleClose: () => void
  // onLoadingComplete: () => void
  estimatedValidationTime: number
}
interface ValidatorComponentProps {
  estimatedValidationTime: number
  response: object
  disabled: boolean
}

interface ErrorDisplayCardProps {
  open: boolean
  handleClose: () => void
  response: { error?: string; errorStatus?: number }
}
const ValidatorLoadingCard: FC<ValidatorLoadingCardProps> = ({ open, handleClose, estimatedValidationTime }) => {
  const [progress, setProgress] = useState(0)
  const totalTime = estimatedValidationTime // total time in seconds
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  useEffect(() => {
    if (open) {
      // console.log(estimatedValidationTime)
      const timer = setInterval(() => {
        setSecondsElapsed((oldSeconds) => {
          const newSeconds = oldSeconds + 1
          //   console.log('newseconds', newSeconds)
          if (newSeconds >= totalTime) {
            clearInterval(timer)
            setSecondsElapsed(0)
          }
          return newSeconds
        })
      }, 1000)
      //  console.log('timer', timer)
      setProgress((secondsElapsed / totalTime) * 100)
      setTimeRemaining(totalTime - secondsElapsed)
      return () => {
        clearInterval(timer)
      }
    } else {
      setProgress(0)
      setTimeRemaining(0)
    }
  }, [open, estimatedValidationTime, secondsElapsed, totalTime])
  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 0 }} id="validating-dialog-title">
        {'Your files are validating...'}
      </DialogTitle>
      <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography>Estimate time: {timeRemaining} seconds</Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 5,
            mt: 2,
            backgroundColor: palette.secondaryLight,
            '& .MuiLinearProgress-bar': {
              backgroundColor: palette.secondary,
            },
          }}
        />
        <Typography sx={{ mt: 2 }}>
          Don&apos;t close out this given tab or refresh the screen, if you do the validation will stop.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

const ErrorDisplayCard = ({ open, handleClose, response }: ErrorDisplayCardProps) => {
  return (
    <>
      {response ? (
        <Dialog open={open} maxWidth="sm">
          <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 0 }} id="validating-dialog-title">
            {'Error Status '} {response.errorStatus!}
          </DialogTitle>
          <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography>{response.error}</Typography>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}
const ValidationComponent = ({ response, estimatedValidationTime, disabled }: ValidatorComponentProps) => {
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

export default ValidationComponent
