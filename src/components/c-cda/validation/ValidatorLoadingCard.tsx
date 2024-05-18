'use client'
import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Button, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import ValidatorResultsCard from './ValidatorResultsCard'
import { useFormStatus } from 'react-dom'

interface ValidatorLoadingCardProps {
  open: boolean
  handleClose: () => void
  onLoadingComplete: () => void
  estimatedValidationTime: number
}
interface ValidatorComponentProps {
  estimatedValidationTime: number
  response: object
}
const ValidatorLoadingCard: FC<ValidatorLoadingCardProps> = ({
  open,
  handleClose,
  onLoadingComplete,
  estimatedValidationTime,
}) => {
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
            onLoadingComplete()
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
  }, [open, onLoadingComplete, estimatedValidationTime, secondsElapsed, totalTime])
  //  const progress = (secondsElapsed / totalTime) * 100
  // timeRemaining = totalTime - secondsElapsed
  //  console.log('time remaining', timeRemaining)
  // console.log('progress', progress)
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <Card sx={{ position: 'absolute', width: '30%', minWidth: 300, pl: '18px', pr: '18px' }}>
        <CardContent>
          <IconButton sx={{ position: 'absolute', right: 18, top: 8 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            Your files are validating...
          </Typography>
          <Typography sx={{ mt: 2, mb: 2 }}>Estimate time: {timeRemaining} seconds</Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 4,
              borderRadius: 5,
              mt: 2,
              backgroundColor: 'lightblue',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'blue',
              },
            }}
          />
          <Typography sx={{ mt: 2 }}>
            Don&apos;t close out this given tab or refresh the screen, if you do the validation will stop.
          </Typography>
        </CardContent>
      </Card>
    </Backdrop>
  )
}
const ValidationComponent = ({ response, estimatedValidationTime }: ValidatorComponentProps) => {
  const [validationOpen, setValidationOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const { pending } = useFormStatus()

  const handleLoadingComplete = () => {
    setValidationOpen(false)

    setResultsOpen(true)
  }
  console.log(response)
  return (
    <>
      <Button type="submit" variant="contained" onClick={() => setValidationOpen(true)}>
        VALIDATE
      </Button>

      {pending && (
        <ValidatorLoadingCard
          open={validationOpen}
          handleClose={() => setValidationOpen(false)}
          onLoadingComplete={handleLoadingComplete}
          estimatedValidationTime={estimatedValidationTime}
        />
      )}

      {!pending && <ValidatorResultsCard open={resultsOpen} handleClose={() => setResultsOpen(false)} />}
    </>
  )
}

export default ValidationComponent
