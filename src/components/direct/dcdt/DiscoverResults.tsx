import palette from '@/styles/palette'
import { Dialog, Divider, DialogContent, Typography, Button, Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import _ from 'lodash'
import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'

interface DiscoverResultsDialogProps {
  open: boolean
  handleClose: () => void
  response: object
}
interface DiscoverResultsComponentProps {
  response: object
}

interface ResultsProps {
  response: Root
}

type Root = {
  '@type'?: string
  items?: Item[]
  testcase?: Testcase
  status?: string
  errors?: Errors
}

type Item = {
  msg: string
  directAddr: string
  '@type': string
  resultsAddr: string
}

type Testcase = {
  directAddr: string
  '@type': string
  resultsAddr: string
  expandResult: boolean
}

type Errors = {
  '@type': string
  global: null
  fields: Fields
}

interface Fields {
  'items[0].directAddress': DirectAddress[]
  'items[0].resultsAddress': ResultsAddress[]
}

type DirectAddress = {
  '@type': string
  messages: string[]
  stackTrace: null
}

type ResultsAddress = {
  '@type': string
  messages: string[]
  stackTrace: null
}

const Results = ({ response }: ResultsProps) => {
  const success = response.status ? response.status : ''

  return (
    <Box>
      {_.isEqual(success, 'success') && (
        <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center' }}>
          <Check
            fontSize="large"
            sx={{
              color: palette.success,
              transition: 'transform 0.3s ease-in-out',
              transform: 'scale(1)',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
          <Box>
            <Typography>
              <strong>Discovery mail mapping modified:</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '56px', alignItems: 'center' }}>
              <Typography>{response.items !== undefined ? response.items[0].msg : ''}</Typography>
            </Box>
          </Box>
        </Box>
      )}
      {_.isEqual(success, 'error') && (
        <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center' }}>
          <ErrorIcon
            fontSize="large"
            sx={{
              color: palette.error,
              transition: 'transform 0.3s ease-in-out',
              transform: 'scale(1)',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
          <Box>
            <Typography pb={2}>
              <strong>Error:</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {response.errors?.fields['items[0].directAddress'] && (
                <Typography>
                  Direct Address: {response.errors?.fields['items[0].directAddress'][0].messages[0]}
                </Typography>
              )}
              {response.errors?.fields['items[0].resultsAddress'] && (
                <Typography>
                  Results Address: {response.errors?.fields['items[0].resultsAddress'][0].messages[0]}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
const DiscoverResultsDialog: FC<DiscoverResultsDialogProps> = ({ open, handleClose, response }) => {
  return (
    <Dialog open={open} maxWidth="lg">
      <DialogContent>
        <Results response={response} />
      </DialogContent>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  )
}

const DiscoverResultsComponent = ({ response }: DiscoverResultsComponentProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const { pending } = useFormStatus()
  const [errorOpen, setErrorOpen] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleErrorClose = () => {
    setErrorOpen(false)
  }
  useEffect(() => {
    if (!pending && !_.isEmpty(response) && !_.has(response, 'error')) {
      setOpenDialog(true)
    }
    if (!pending && _.has(response, 'error')) {
      setErrorOpen(true)
    }
  }, [pending, response])
  return (
    <>
      <Button
        variant="contained"
        sx={{ color: palette.white }}
        type="submit"
        onClick={handleOpenDialog}
        disabled={pending}
      >
        SUBMIT
      </Button>
      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}
      {!pending && !_.isEmpty(response) && !_.has(response, 'error') && (
        <DiscoverResultsDialog open={openDialog} handleClose={handleCloseDialog} response={response} />
      )}
    </>
  )
}

export default DiscoverResultsComponent
