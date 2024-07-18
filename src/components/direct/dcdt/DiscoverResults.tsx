import palette from '@/styles/palette'
import { Dialog, DialogTitle, Divider, DialogContent, Typography, IconButton, Button, Box } from '@mui/material'
import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useFormStatus } from 'react-dom'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import _ from 'lodash'

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

export interface Errors {
  '@type': string
  global: null
  fields: Fields
}

export interface Fields {
  'items[0].directAddress': DirectAddress[]
  'items[0].resultsAddress': ResultsAddress[]
}

export interface DirectAddress {
  '@type': string
  messages: string[]
  stackTrace: null
}

export interface ResultsAddress {
  '@type': string
  messages: string[]
  stackTrace: null
}

const Results = ({ response }: ResultsProps) => {
  const success = response.status ? response.status : ''

  return (
    <Box>
      {_.isEqual(success, 'success') ? (
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
              <strong>Discovery mail mapping modified</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '56px', alignItems: 'center' }}>
              <Typography>{response.items !== undefined ? response.items[0].msg : ''}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
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
            <Typography>
              <strong>Failed</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
              <Typography>{response.errors?.['@type']}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
const DiscoverResultsDialog: FC<DiscoverResultsDialogProps> = ({ open, handleClose, response }) => {
  //console.log(JSON.stringify(response))

  return (
    <Dialog open={open} maxWidth="lg">
      <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 2 }}>
        Test Results
      </DialogTitle>
      <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Divider />
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
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
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
      {!pending && <DiscoverResultsDialog open={openDialog} handleClose={handleCloseDialog} response={response} />}
    </>
  )
}

export default DiscoverResultsComponent
