import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Button, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import ValidatorResultsCard from './ValidatorResultsCard'

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
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <Card sx={{ position: 'absolute', width: '30%', minWidth: 300, pl: '18px', pr: '18px' }}>
        <CardContent>
          <IconButton sx={{ position: 'absolute', right: 18, top: 8 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            Your files are validating...
          </Typography>
          <Typography sx={{ mt: 2, mb: 2 }}>Estimate time: {Math.round((1 - progress / 100) * 3)} seconds</Typography>
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
const ValidationComponent = () => {
  const [validationOpen, setValidationOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)

  const handleLoadingComplete = () => {
    setValidationOpen(false)
    setResultsOpen(true)
  }

  return (
    <>
      <Button type="submit" variant="contained" onClick={() => setValidationOpen(true)}>
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
