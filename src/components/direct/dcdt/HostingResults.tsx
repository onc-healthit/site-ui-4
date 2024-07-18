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
} from '@mui/material'
import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useFormStatus } from 'react-dom'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import _ from 'lodash'
import bulletedList from '../shared/BulletList'
import { CustomListItem } from './TestCasePanel'
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
  const success = response.items ? response.items[0].success : false
  return (
    <Box>
      {success ? (
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
      <Box p={2} bgcolor={palette.secondaryLight} borderRadius={1} border={`1px solid ${palette.secondary}`} mb={2}>
        {response.items?.map((item, i) => {
          return (
            <Box key={i}>
              <Typography>
                <strong>Success: </strong>
                {item.success ? 'true' : 'false'}
              </Typography>
              <Typography>
                <strong>Processing Messages:</strong>
                {item.procMsgs ? item.procMsgs : 'None'}
              </Typography>
              <Typography>
                <strong>Processing Steps:</strong>
              </Typography>
              <List disablePadding sx={bulletedList('number')}>
                {' '}
                {item.procSteps.map((step, i) => {
                  return (
                    <>
                      <CustomListItem key={i} name={step.desc.text} value={''} />
                      <List sx={bulletedList('circle')}>
                        <CustomListItem name={'Success'} value={step.success ? 'true' : 'false'} />
                        <CustomListItem name={'Messages'} value={''} />
                        <List sx={bulletedList('circle')}>
                          {step.msgs.map((msg, i) => {
                            return (
                              <>
                                <ListItem
                                  sx={{
                                    display: 'list-item',
                                    py: 0,
                                  }}
                                >
                                  <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>{msg.text}</pre>
                                </ListItem>
                              </>
                            )
                          })}
                        </List>
                        <CustomListItem name={'Binding Type'} value={step.bindingType} />
                        <CustomListItem name={'Location Type'} value={step.locType} />
                      </List>
                    </>
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
                <strong>Discovered InValid Certificate:</strong>
              </Typography>
              <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                {!_.isEmpty(item.invalidDiscoveredCertInfos) ? item.invalidDiscoveredCertInfos[0].cert : 'None'}
              </pre>
            </Box>
          )
        })}
      </Box>
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

const HostingResultsComponent = ({ response }: HostingResultsComponentProps) => {
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
      {!pending && <HostingResultsDialog open={openDialog} handleClose={handleCloseDialog} response={response} />}
    </>
  )
}

export default HostingResultsComponent
