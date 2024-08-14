import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  FormControl,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import _ from 'lodash'
import React, { useState } from 'react'
import DynamicTable from './DynamicTable'
import { handleXDRAPICall } from '../test-by-criteria/ServerActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LoadingButton from '../shared/LoadingButton'
import DocumentSelector from './DocumentSelector'

export type TestCaseFields = {
  name?: string
  id: string | number
  protocol?: string
  desc?: string
  sutEdge?: boolean
  sutHisp?: boolean
  sutRole?: string
  criteria?: string
  status?: string
  ccdaFileRequired?: boolean
  inputs?: InputFields[]
  moreInfo?: {
    subHeader?: string
    subDesc?: string
    subDesc2?: string
    expTestHeader?: string
    expTestResults?: string
    fields?: ExtraFields[]
    headers: string[]
    tableData?: TableRowData[]
    actionLabel?: string
    optionalTextField?: {
      label: string
      helperText: string
      defaultValue?: string
    }
  }
  'Test Focus'?: string
  'Data Flow in Direct'?: string
  'Metadata Included'?: string
  'Direct Address Block'?: string
  'SUT: Sender/ Receiver'?: string
  'Test Tool: Sender / Receiver'?: string
  'Purpose/Description'?: string
  'Conformance  Test Details'?: string
  'Expected Test Results'?: string
  'Required / Conditional per Direct Edge Protocol Guide'?: string
  'Direct Edge Protocol Guide 1.1 RTM Reference'?: number
  'Test Data IDs'?: string | null
}

export type InputFields = {
  name?: string
  hoverlabel?: string
  key?: string
  type?: string
}

export type TableRowData = {
  cells: TableCellData[]
}

export type TableCellData = {
  content: string | JSX.Element
  type: 'text' | 'checkbox' | 'icon' | string
  isChecked?: boolean
}

interface StepTextProps {
  inputs: InputFields[]
  role?: string
}

const senderText = 'Hit Run to generate your endpoint.'
const receiverText = 'Hit Run to send a XDR message.'
const endpoint = 'http://ett.healthit.gov:11080/xdstools/sim/'
const endpointTLS = 'https://ett.healthit.gov:11084/xdstools/sim/'

const StepText = ({ inputs, role }: StepTextProps) => {
  return (
    <>
      <Typography variant="body2">
        <strong>Step 1</strong>: Provide your{' '}
        {inputs.map((input, i) => {
          return (
            <span key={i}>
              {input.name}
              {inputs !== undefined ? (i === inputs.length - 1 ? '. ' : ', ') : '. '}
            </span>
          )
        })}
        {role === 'sender' && senderText}
        {role === 'receiver' && receiverText}
      </Typography>
    </>
  )
}

export type FieldValue = boolean | string | number

export type ExtraFields = {
  label: string
  name: string
  datatype: 'checkbox' | 'text' | 'number'
  placeholder?: string
  value: FieldValue
  render?: (value: FieldValue) => JSX.Element
}

interface TestCardProps {
  test: TestCaseFields
  hostname?: string
  email?: string
  username?: string
  password?: string
  tlsRequired?: boolean
}

interface SelectedDocument {
  directory: string
  fileName: string
  fileLink: string
}

const TestCard = ({ test }: TestCardProps) => {
  const [showDetail, setShowDetail] = useState(false)
  const [criteriaMet, setCriteriaMet] = useState<string>('')
  const [testRequestResponse, setTestRequestResponse] = useState<string>('')
  const [testRequestRequest, setTestRequestRequest] = useState<string>('')
  const [showLogs, setShowLogs] = useState(false)
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const manualValidationCriteria = ["['b1-3']", "['b1-3','su1-3']"]

  const subHeader = 'Description'
  const subDesc = test['Purpose/Description']
  const expTestHeader = 'Expected Test Results'
  const expTestResults = test['Expected Test Results']

  const requiresCCDADocument = () => {
    return test.inputs?.some((input) => input.key === 'payload' && input.type?.includes('CCDAWidget'))
  }

  const shouldDisplayInput = (input: InputFields) => {
    return !(input.key === 'payload' && input.type?.includes('CCDAWidget'))
  }

  const handleClick = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setOpenSnackbar(true)
        setTimeout(() => setOpenSnackbar(false), 1500)
      })
      .catch((err) => {
        console.error('Failed to copy link:', err)
        alert('Failed to copy link. Please try again.')
      })
  }

  const endpointTestIds = [
    '10',
    '11',
    '12',
    '20amu2',
    '20bmu2',
    '32mu2',
    '33mu2',
    '34mu2',
    '35mu2',
    '36mu2',
    '37mu2',
    '38mu2',
    '43mu2',
    '44mu2',
  ]

  const [formData] = useState<{ [key: string]: FieldValue }>(() => {
    const initialData: { [key: string]: FieldValue } = {}
    test.moreInfo?.fields?.forEach((field) => {
      initialData[field.name] = field.value
    })
    return initialData
  })

  const handleChange = (key: string | undefined, value: string) => {
    if (key) {
      setFieldValues((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const handleRunTest = async () => {
    console.log('initial')
    if (test.ccdaFileRequired && !documentDetails) {
      alert('This test requires a CCDA document to be selected. Please select a document before running the test.')
    } else {
      console.log('initial')
      const ip_address = fieldValues['ip_address'] || ''
      const port = fieldValues['port'] || ''
      const direct_to = fieldValues['direct_to'] || ''
      const direct_from = fieldValues['direct_from'] || ''
      const targetEndpointTLS = fieldValues['targetEndpointTLS'] || ''
      const outgoing_from = fieldValues['outgoing_from'] || ''
      console.log('Sending call')
      try {
        setIsLoading(true)
        setIsFinished(false)
        setCriteriaMet('')
        console.log('TLS: ', targetEndpointTLS)
        const response = await handleXDRAPICall({
          targetEndpointTLS,
        })
        setIsFinished(true)
        setCriteriaMet(response.criteriaMet)
        setTestRequestRequest(response.testRequestRequest)
        setTestRequestResponse(response.testRequestResponse)
        setApiError(true)
        console.log('Criteria met: ', response.criteriaMet)
        console.log('Test Request Responses:', response.testRequestResponse)
      } catch (error) {
        console.error('Failed to run test:', error)
        setApiError(true)
        setCriteriaMet('FALSE')
      } finally {
        setIsLoading(false)
        setTimeout(() => {
          setIsFinished(false)
        }, 100)
      }
    }
  }

  const handleAcceptTest = () => {
    setIsFinished(false)
    setCriteriaMet('TRUE')
    setShowLogs(false)
  }

  const handleRejectTest = () => {
    setIsFinished(false)
    setCriteriaMet('FALSE')
    setShowLogs(false)
  }

  const handleClearTest = () => {
    setCriteriaMet('')
    setTestRequestResponse('')
    setTestRequestRequest('')
    setIsFinished(false)
    setShowLogs(false)
    setDocumentDetails(null)
    setApiError(false)
  }

  const formattedLogs = Object.entries(testRequestResponse).map(([key, value]) => (
    <Typography key={key} variant="body1" style={{ whiteSpace: 'pre-line' }}>
      {value}
    </Typography>
  ))

  const renderCriteriaMetIcon = () => {
    if (criteriaMet === 'TRUE') {
      return <CheckCircleIcon style={{ color: 'green' }} />
    } else if (criteriaMet === 'FALSE') {
      return <CancelIcon style={{ color: 'red' }} />
    }
    return null
  }

  const handleToggleLogs = () => {
    setShowLogs((prev) => !prev)
  }

  const handleToggleDetail = () => {
    setShowDetail((prev) => !prev)
  }

  const toggleDocumentSelector = () => {
    setShowDocumentSelector(!showDocumentSelector)
  }

  const handleDocumentConfirm = (selectedData: SelectedDocument) => {
    console.log('Confirmed Document', selectedData)
    setDocumentDetails(selectedData)
    setShowDocumentSelector(false)
  }

  const handleDocumentSelectorClose = () => {
    setShowDocumentSelector(false)
  }

  const [documentDetails, setDocumentDetails] = useState<{
    directory: string
    fileName: string
    fileLink: string
  } | null>(null)

  const [showDocumentSelector, setShowDocumentSelector] = useState(false)

  const renderMoreInfo = () => {
    const { moreInfo } = test
    return (
      <Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {subHeader}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {subDesc}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {expTestHeader}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {expTestResults}
          </Typography>
        </Box>

        {test.moreInfo?.tableData && <DynamicTable headers={test.moreInfo.headers} rows={test.moreInfo.tableData} />}
        {moreInfo?.fields?.map((field, index) => (
          <TextField key={index} label={field.label} defaultValue={field.value} variant="outlined" fullWidth disabled />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => console.log(formData)}>
            RUN
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: 'black',
              backgroundColor: '#E8E8E8',
              borderColor: 'transparent',
              boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.20)',
              '&:hover': {
                backgroundColor: '#E8E8E8',
                boxShadow: '0px 4px 2px -1px rgba(0, 0, 0, 0.22)',
              },
            }}
            onClick={handleToggleDetail}
          >
            RETURN TO TEST
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Card>
      <CardHeader title={test.name}></CardHeader>
      <Divider />
      <CardContent>
        {showDetail ? (
          renderMoreInfo()
        ) : showLogs ? (
          <CardContent>
            <Typography variant="h6">Test Logs</Typography>
            {testRequestResponse ? (
              <Typography variant="body1">{formattedLogs}</Typography>
            ) : (
              <Typography variant="body1">No logs to display.</Typography>
            )}
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              {test.criteria &&
                manualValidationCriteria.includes(test.criteria) &&
                formattedLogs.length > 0 &&
                !criteriaMet.includes('TRUE') &&
                !criteriaMet.includes('FALSE') &&
                !apiError && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="primary" onClick={handleAcceptTest}>
                      Accept
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleRejectTest}>
                      Reject
                    </Button>
                  </Box>
                )}
              <Button variant="contained" onClick={handleToggleLogs}>
                Close Logs
              </Button>
            </Box>
          </CardContent>
        ) : (
          <>
            <CardContent>
              <Typography variant="body2" sx={{ pb: 2 }}>
                {test.desc}
              </Typography>
              {_.isEqual(test.sutRole, 'receiver') && _.has(test, 'inputs') && test.inputs !== undefined && (
                <StepText inputs={test.inputs} role={test.sutRole} />
              )}
              {_.isEqual(test.sutRole, 'sender') && _.has(test, 'inputs') && test.inputs !== undefined && (
                <StepText inputs={test.inputs} role={test.sutRole} />
              )}
              {_.has(test, 'inputs') &&
                test.inputs &&
                test.inputs.filter(shouldDisplayInput).map((input, index) => (
                  <Box sx={{ pt: 2 }} key={input.key || 'default-key'}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label={input.name}
                        variant="outlined"
                        value={input.key ? fieldValues[input.key] || '' : ''}
                        onChange={(e) => input.key && handleChange(input.key, e.target.value)}
                        helperText={input.hoverlabel}
                      />
                    </FormControl>
                  </Box>
                ))}
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                paddingY: 2,
                pr: 2,
              }}
            >
              {endpointTestIds.includes(test.id.toString()) && (
                <Box width={'50%'}>
                  <Tooltip placement="bottom" title={endpoint + 'edge-ttp__' + test.id + '/rep/xdrpr'} arrow>
                    <Button
                      sx={{ ml: 2 }}
                      color="secondary"
                      endIcon={<ContentPasteGoIcon color="secondary" />}
                      onClick={() => handleClick(endpoint + 'edge-ttp__' + test.id + '/rep/xdrpr')}
                    >
                      Endpoint
                    </Button>
                  </Tooltip>
                  <Tooltip placement="bottom" title={endpointTLS + 'edge-ttp__' + test.id + '/rep/xdrpr'} arrow>
                    <Button
                      sx={{ ml: 2 }}
                      color="secondary"
                      endIcon={<ContentPasteGoIcon color="secondary" />}
                      onClick={() => handleClick(endpointTLS + 'edge-ttp__' + test.id + '/rep/xdrpr')}
                    >
                      Endpoint TLS
                    </Button>
                  </Tooltip>
                </Box>
              )}
              <Snackbar
                open={openSnackbar}
                message="Copied to clipboard"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              />
              {requiresCCDADocument() && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    ml: 1,
                  }}
                >
                  <Typography>CCDA Document Type</Typography>

                  <Button variant="outlined" color="primary" onClick={toggleDocumentSelector}>
                    SELECT A DOCUMENT
                  </Button>
                  {documentDetails && <Typography sx={{ mt: 1 }}>Selected: {documentDetails.fileName}</Typography>}
                </Box>
              )}

              {showDocumentSelector && (
                <DocumentSelector onConfirm={handleDocumentConfirm} onClose={handleDocumentSelectorClose} />
              )}

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, pl: 2 }}>
                {renderCriteriaMetIcon()}
                <LoadingButton
                  loading={isLoading}
                  done={isFinished}
                  onClick={handleRunTest}
                  variant="contained"
                  color="primary"
                >
                  RUN
                </LoadingButton>
                <Button variant="contained" onClick={handleToggleDetail}>
                  MORE INFO
                </Button>
                <Button variant="contained" color="inherit" onClick={handleToggleLogs}>
                  LOGS
                </Button>
                {test.criteria &&
                  manualValidationCriteria.includes(test.criteria) &&
                  formattedLogs.length > 0 &&
                  (criteriaMet.includes('TRUE') || criteriaMet.includes('FALSE')) && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="contained" color="inherit" onClick={handleClearTest}>
                        Clear
                      </Button>
                    </Box>
                  )}
                {test.criteria && manualValidationCriteria.includes(test.criteria) && isFinished && !apiError && (
                  <Typography sx={{ ml: 2, color: 'error.main' }}>Waiting Validation</Typography>
                )}
              </Box>
            </Box>
          </>
        )}
      </CardContent>
      <Divider />

      <Divider />
    </Card>
  )
}
export default TestCard
