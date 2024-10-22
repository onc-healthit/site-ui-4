import palette from '@/styles/palette'
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Box,
  List,
  ListItem,
  LinearProgress,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useFormStatus } from 'react-dom'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import _ from 'lodash'
import bulletedList from '../shared/BulletList'
import { CustomListItem } from './TestCasePanel'
import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import eventTrack from '@/services/analytics'

interface HostingResultsDialogProps {
  open: boolean
  handleClose: () => void
  response: object
}
interface HostingResultsComponentProps {
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
  errors?: FieldError
}

type FieldError = {
  '@type': string
  fields: Error
}

type Error = {
  'items[0].directAddress': Fields[]
}
type Fields = {
  messages: string[]
}

type Item = {
  procSteps: ProcStep[]
  msgs: Msg[]
  procMsgs: []
  '@type': string
  success: boolean
  discoveredCertInfo: Cert | null
  invalidDiscoveredCertInfos: Cert[]
}

type ProcStep = {
  bindingType: string
  msgs: Msg[]
  success: boolean
  locType: string
  desc: Desc
}

type Msg = {
  level: string
  '@type': string
  text: string
}

type Desc = {
  '@type': string
  text: string
}

type Testcase = {
  directAddr: string
  '@type': string
  expandResult: boolean
  testcase: string
}

type Cert = {
  cert: string
}

const Results = ({ response }: ResultsProps) => {
  return (
    <Box>
      {response.status === 'success' && response.items !== undefined && response.items[0].success && (
        <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', pb: 2 }}>
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
              <strong>Passed</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '56px', alignItems: 'center' }}>
              <Typography>
                <strong>Testcase:</strong> {response.testcase?.testcase}
              </Typography>
              <Typography>
                <strong>Direct Address:</strong> {response.testcase?.directAddr}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {response.status === 'success' && response.items !== undefined && !response.items[0].success && (
        <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', pb: 2 }}>
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
              <Typography>
                <strong>Testcase:</strong> {response.testcase?.testcase}
              </Typography>
              <Typography>
                <strong>Direct Address:</strong> {response.testcase?.directAddr}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {response.status === 'error' && response.errors !== undefined && (
        <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', pb: 2 }}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'left' }}>
              <Typography>
                <strong>Message:</strong> {response.errors?.fields['items[0].directAddress'][0].messages[0]}
              </Typography>
              <Typography>
                <strong>Testcase:</strong> {response.testcase?.testcase}
              </Typography>
              <Typography>
                <strong>Direct Address:</strong> {response.testcase?.directAddr}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {response.status === 'success' && response.items !== undefined && (
        <Box p={2} bgcolor={'#E3F2FD64'} borderRadius={1} border={`1px solid #E3F2FD64`} mb={2}>
          {response.items?.map((item, i) => {
            return (
              <Box key={i}>
                <Typography>
                  <strong>Success: </strong>
                  {item.success ? 'true' : 'false'}
                </Typography>
                <Typography>
                  <strong>Processing Message(s): </strong>
                  {!_.isEmpty(item.procMsgs) ? item.procMsgs : 'None'}
                </Typography>
                <Typography>
                  <strong>Processed Step(s):</strong>
                </Typography>
                <List disablePadding sx={bulletedList('number')}>
                  {' '}
                  {item.procSteps.map((step, i) => {
                    return (
                      <div key={i}>
                        <CustomListItem name={step.desc.text.replace('.', '')} value={''} />
                        <List sx={bulletedList('circle')}>
                          <CustomListItem name={'Success'} value={step.success ? 'true' : 'false'} />
                          <CustomListItem name={'Message(s)'} value={''} />
                          <List sx={bulletedList('circle')}>
                            {step.msgs.map((msg, i) => {
                              return (
                                <ListItem
                                  key={i}
                                  sx={{
                                    display: 'list-item',
                                    py: 0,
                                  }}
                                >
                                  <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>{msg.text}</pre>
                                </ListItem>
                              )
                            })}
                          </List>
                          <CustomListItem name={'Binding Type'} value={step.bindingType} />
                          <CustomListItem name={'Location Type'} value={step.locType} />
                        </List>
                      </div>
                    )
                  })}{' '}
                </List>
                <Typography>
                  <strong>Discovered Valid Certificate:</strong>
                </Typography>
                <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                  {item.discoveredCertInfo ? item.discoveredCertInfo.cert : 'None'}
                </pre>
                <Typography>
                  <strong>Discovered Invalid Certificate(s):</strong>
                </Typography>
                <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                  {!_.isEmpty(item.invalidDiscoveredCertInfos) ? item.invalidDiscoveredCertInfos[0].cert : 'None'}
                </pre>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
const HostingResultsDialog: FC<HostingResultsDialogProps> = ({ open, handleClose, response }) => {
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

const LoadingResults = () => {
  return (
    <Dialog open maxWidth="lg">
      <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 2 }} id="dialog-title">
        Searching for certificate...
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>{}</Typography>
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

const HostingResultsComponent = ({ response }: HostingResultsComponentProps) => {
  const [openDialog, setOpenDialog] = useState(false)
  const { pending } = useFormStatus()
  const [errorOpen, setErrorOpen] = useState(false)
  const handleOpenDialog = () => {
    setOpenDialog(true)
    eventTrack('Submits Hosting Fields', 'Direct Certificate Discovery Tool', `User clicks submits hosting fields`)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
    eventTrack('Close Hosting Dialog', 'Direct Certificate Discovery Tool', `User clicks close hosting dialog`)
  }
  const handleErrorClose = () => {
    setErrorOpen(false)
    eventTrack('Error on Hosting Fields', 'Direct Certificate Discovery Tool', `User close error on hosting fields`)
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
      {pending && <LoadingResults />}
      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}
      {!pending && !_.has(response, 'error') && !_.isEmpty(response) && (
        <HostingResultsDialog open={openDialog} handleClose={handleCloseDialog} response={response} />
      )}
    </>
  )
}

export default HostingResultsComponent
