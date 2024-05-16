import React, { useState, useEffect, FC } from 'react'
import { Typography, IconButton, LinearProgress, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ValidatorResultsCard from './results/ValidatorResultsCard'
import palette from '@/styles/palette'

interface ValidatorLoadingCardProps {
  open: boolean
  handleClose: () => void
  onLoadingComplete: () => void
}

const ValidatorLoadingCard: FC<ValidatorLoadingCardProps> = ({ open, handleClose, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (open) {
      setProgress(0)
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer)
            onLoadingComplete()
            return 100
          }
          return prevProgress + 10
        })
      }, 300)

      return () => {
        clearInterval(timer)
      }
    } else {
      setProgress(0)
    }
  }, [open, onLoadingComplete])

  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 0 }} id="validating-dialog-title">
        {'Your files are validating...'}
      </DialogTitle>
      <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography>Estimate time: {Math.round((1 - progress / 100) * 3)} seconds</Typography>
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
const ValidationComponent = () => {
  const [validationOpen, setValidationOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)

  const handleLoadingComplete = () => {
    setValidationOpen(false)
    setResultsOpen(true)
  }

  return (
    <>
      <Button variant="contained" onClick={() => setValidationOpen(true)}>
        VALIDATE
      </Button>
      <ValidatorLoadingCard
        open={validationOpen}
        handleClose={() => setValidationOpen(false)}
        onLoadingComplete={handleLoadingComplete}
      />
      <ValidatorResultsCard open={resultsOpen} handleClose={() => setResultsOpen(false)} />
    </>
  )
}

export default ValidationComponent
