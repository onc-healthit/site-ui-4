import { useFormStatus } from 'react-dom'
import React, { useState, useEffect, FC } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material'
import _ from 'lodash'

import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import CloseIcon from '@mui/icons-material/Close'
import palette from '@/styles/palette'
interface ResultsComponentProps {
  response: object
  disabled?: boolean
  buttonTitle: string
  loadingDialogTitle: string
  loadingDialogContent: React.ReactNode
  resultsDialogTitle: string
  resultsDialogContent: React.ReactNode
}

interface ResultsDialogProps {
  response?: object
  open: boolean
  handleClose: () => void
  contentDisplay?: React.ReactNode
  title: string
}
interface LoadingResultsProps {
  open: boolean
  title?: string
  content?: React.ReactNode
}
const LoadingResults: FC<LoadingResultsProps> = ({ open, title, content }) => {
  return (
    <Dialog open={open} maxWidth="lg">
      <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 2 }} id="dialog-title">
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>{content}</Typography>
        <LinearProgress
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
const ResultsDialog: FC<ResultsDialogProps> = ({ open, handleClose, contentDisplay, title }) => {
  //console.log(JSON.stringify(response))

  return (
    <Dialog open={open} maxWidth="lg">
      <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 2 }}>
        {title}
      </DialogTitle>
      <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Divider />
      <DialogContent>{contentDisplay}</DialogContent>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  )
}
const ResultsComponent = ({
  response,
  disabled,
  buttonTitle,
  loadingDialogTitle,
  loadingDialogContent,
  resultsDialogTitle,
  resultsDialogContent,
}: ResultsComponentProps) => {
  const [loadingOpen, setLoadingOpen] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const { pending } = useFormStatus()
  //console.log(response)
  const handleLoadingOpen = () => {
    setLoadingOpen(true)
  }
  const handleCloseDialog = () => {
    setResultsOpen(false)
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
        {buttonTitle}
      </Button>

      {pending && <LoadingResults open={loadingOpen} title={loadingDialogTitle} content={loadingDialogContent} />}
      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}

      {!pending && !_.has(response, 'error') && (
        <ResultsDialog
          open={resultsOpen}
          handleClose={handleCloseDialog}
          response={response}
          contentDisplay={resultsDialogContent}
          title={resultsDialogTitle}
        />
      )}
    </>
  )
}

export default ResultsComponent
