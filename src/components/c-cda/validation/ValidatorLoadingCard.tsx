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
  //  const progress = (secondsElapsed / totalTime) * 100
  // timeRemaining = totalTime - secondsElapsed
  //  console.log('time remaining', timeRemaining)
  // console.log('progress', progress)
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
const ValidationComponent = ({ response, estimatedValidationTime }: ValidatorComponentProps) => {
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const { pending } = useFormStatus()

  const handleLoadingOpen = () => {
    setLoadingOpen(true)
  }

  const handleLoadingClose = () => {
    setLoadingOpen(false)
  }

  useEffect(() => {
    if (!pending && !_.isEmpty(response)) {
      setResultsOpen(true)
    }
  }, [pending, response])

  return (
    <>
      <Button type="submit" variant="contained" onClick={handleLoadingOpen}>
        VALIDATE
      </Button>

      {pending && (
        <ValidatorLoadingCard
          open={loadingOpen}
          handleClose={handleLoadingClose}
          estimatedValidationTime={estimatedValidationTime}
        />
      )}

      {!pending && (
        <ValidatorResultsCard results={response} open={resultsOpen} handleClose={() => setResultsOpen(false)} />
      )}
    </>
  )
}

export default ValidationComponent
