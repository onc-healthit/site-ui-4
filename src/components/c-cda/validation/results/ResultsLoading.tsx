import palette from '@/styles/palette'
import { Dialog, DialogTitle, IconButton, DialogContent, Typography, LinearProgress } from '@mui/material'
import { FC, useState, useEffect } from 'react'

interface ValidatorLoadingCardProps {
  open: boolean
  handleClose: () => void
  estimatedValidationTime: number
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
      <DialogContent>
        <Typography>Estimated time: {timeRemaining} seconds</Typography>
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
      </DialogContent>
    </Dialog>
  )
}

export default ValidatorLoadingCard
