import DynamicTable from './DynamicTable'
import _ from 'lodash'
import React, { useState } from 'react'
import DocumentSelector from './DocumentSelector'
import { handleAPICall } from '../test-by-criteria/ServerActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LoadingButton from '../shared/LoadingButton'
import { APICallData, APICallResponse, TestRequestResponses } from '../test-by-criteria/ServerActions'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  SelectChangeEvent,
} from '@mui/material'
import AlertSnackbar from '../shared/AlertSnackbar'

export type TestCaseFields = {
  name: string
  id: number
  protocol?: string
  desc?: string
  longDesc?: string
  sutRole?: string
  sutHisp?: boolean
  criteria?: string
  sutEdge?: boolean
  ccdaFileRequired?: boolean
  fields?: ExtraFields[]
  moreInfo?: {
    subHeader?: string
    subDesc?: string
    fields?: ExtraFields[]
    headers: string[]
    tableData: TableRowData[]
    actionLabel?: string
    optionalTextField?: {
      label: string
      helperText: string
      defaultValue?: string
    }
  }
}

export type TableRowData = {
  cells: TableCellData[]
}

export type TableCellData = {
  content: string | JSX.Element
  type: 'text' | 'checkbox' | 'icon' | string
  isChecked?: boolean
}

export type FieldValue = boolean | string | number

export type ExtraFields = {
  label: string
  name: string
  datatype: string
  value?: FieldValue
  allowedValues?: string[]
  readonly?: boolean
  display: boolean
  render?: (value: FieldValue) => JSX.Element
}

interface TestCardProps {
  test: TestCaseFields
  hostname?: string
  email?: string
  username?: string
  password?: string
  tlsRequired?: boolean
  receive?: boolean
}

interface SelectedDocument {
  directory: string
  fileName: string
  fileLink: string
}

const TestCard = ({
  test,
  hostname = 'defaultHostname',
  email = 'defaultEmail',
  username = 'defaultUsername',
  password = 'defaultPassword',
  tlsRequired = false,
}: TestCardProps) => {
  const attachmentTypeTestIDs = [231, 331]
  const manualValidationCriteria = [
    "['b1-5']",
    "['b1-6']",
    "['b1-5','su1-5']",
    "['b1-6','su1-6']",
    "['h2-8','b1-4','b1-7','su1-4','su1-7','sc2-8']",
    "['b1-4','su1-4']",
    "['b1-4']",
  ]
  const mdnTestIds = ['mu2']
  const clearButtonVisibleOnCriteriaSet = new Set(['TRUE', 'FALSE', 'ERROR', 'PASSED', 'PENDING', 'SUCCESS', 'STEP2'])
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [previousResult, setPreviousResult] = useState<APICallResponse | null>(null)

  const [showDetail, setShowDetail] = useState(false)
  const [criteriaMet, setCriteriaMet] = useState<string>('')
  const [testRequestResponses, setTestRequestResponses] = useState<TestRequestResponses>({})
  const [showLogs, setShowLogs] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [attachmentType, setAttachmentType] = useState('')

  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('error')

  const handleDocumentConfirm = (selectedData: SelectedDocument) => {
    console.log('Confirmed Document', selectedData)
    setDocumentDetails(selectedData)
    setShowDocumentSelector(false)
  }

  const handleDocumentSelectorClose = () => {
    setShowDocumentSelector(false)
  }
  const [showDocumentSelector, setShowDocumentSelector] = useState(false)
  const handleAcceptTest = () => {
    setCriteriaMet('TRUE')
    setShowLogs(false)
    setIsFinished(false)
  }

  const handleRejectTest = () => {
    setCriteriaMet('FALSE')
    setShowLogs(false)
    setIsFinished(false)
  }

  const handleClearTest = () => {
    setCurrentStep(1)
    setCriteriaMet('')
    setTestRequestResponses({})
    setIsFinished(false)
    setShowLogs(false)
    setDocumentDetails(null)
    setApiError(false)
    setPreviousResult(null)
  }

  const handleAttachmentTypeChange = (event: SelectChangeEvent<string>) => {
    setAttachmentType(event.target.value)
  }

  const [documentDetails, setDocumentDetails] = useState<{
    directory: string
    fileName: string
    fileLink: string
  } | null>(null)
  const baseRequestData: APICallData = {
    testCaseNumber: test.id,
    sutSmtpAddress: hostname,
    sutEmailAddress: email,
    useTLS: tlsRequired,
    sutCommandTimeoutInSeconds: 0,
    sutUserName: username,
    sutPassword: password,
    tttUserName: '',
    tttPassword: '',
    startTlsPort: 0,
    status: '',
    ccdaReferenceFilename: documentDetails ? documentDetails.fileName : '',
    ccdaValidationObjective: test.criteria || '',
    ccdaFileLink: documentDetails ? documentDetails.fileLink : '',
    cures: true,
    year: '2021',
    hostingcase: 'YES',
    attachmentType: attachmentType,
    previousResult: undefined,
  }

  const createRequestData = (step: number, prevResult?: APICallResponse | null): APICallData => {
    const requestData = { ...baseRequestData }

    if (step === 1) {
      requestData.status = 'na'
    } else if (step === 2 && prevResult) {
      requestData.status = 'fetching'
      requestData.previousResult = prevResult
    } else {
      requestData.status = ''
    }

    return requestData
  }

  const formattedLogs = Object.entries(testRequestResponses).map(([key, value]) => {
    const cleanedKey = key.trim()
    const cleanedValue = value.trim()

    return (
      <Typography key={key} variant="body1" style={{ whiteSpace: 'pre-line' }}>
        {`${cleanedKey}: ${cleanedValue}`}
      </Typography>
    )
  })

  const [formData, setFormData] = useState<{ [key: string]: FieldValue }>(() => {
    const initialData: { [key: string]: FieldValue } = {}
    test.moreInfo?.fields?.forEach((field) => {
      let defaultValue: FieldValue
      switch (field.datatype) {
        case 'text':
        case 'DropdownString':
          defaultValue = field.value ?? ''
          break
        case 'checkbox':
          defaultValue = field.value ?? false
          break
        case 'number':
          defaultValue = field.value ?? 0
          break
        default:
          defaultValue = field.value ?? ''
      }
      initialData[field.name] = defaultValue
    })
    return initialData
  })

  const handleChange = (name: string, value: FieldValue) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRunTest = async () => {
    const isMDNTest = test.protocol && mdnTestIds.includes(test.protocol)

    if (test.ccdaFileRequired && !documentDetails && !test.name.includes('MT')) {
      setAlertMessage(
        'This test requires a CCDA document to be selected. Please select a document before running the test.'
      )
      setAlertSeverity('error')
      setAlertOpen(true)
      return
    }
    try {
      setIsLoading(true)
      setIsFinished(false)
      setCriteriaMet('')

      if (isMDNTest) {
        const requestData = createRequestData(currentStep, previousResult)

        const response = await handleAPICall(requestData)
        const result = response[0]

        setIsFinished(true)
        setCriteriaMet(result.criteriaMet)
        setTestRequestResponses(result.testRequestResponses)

        if (currentStep === 1) {
          setPreviousResult(result)
          if (result.criteriaMet.includes('STEP2')) {
            setCurrentStep(2)
          }
        } else if (currentStep === 2) {
          setPreviousResult(null)
          setCurrentStep(1)
        }
      } else {
        const requestData = createRequestData(0)
        const response = await handleAPICall(requestData)
        const result = response[0]

        setIsFinished(true)
        setCriteriaMet(result.criteriaMet)
        setTestRequestResponses(result.testRequestResponses)

        if (result.criteriaMet.includes('STEP2')) {
          setCurrentStep(2)
        }
      }
    } catch (error) {
      console.error('Failed to run test:', error)
      setApiError(true)
      setAlertMessage('An error occurred while running the test.')
      setAlertSeverity('error')
      setAlertOpen(true)
      setCriteriaMet('FALSE')
    } finally {
      setIsLoading(false)
      if (test.criteria && !manualValidationCriteria.includes(test.criteria)) {
        setTimeout(() => {
          setIsFinished(false)
        }, 100)
      }
    }
  }

  const renderCriteriaMetIcon = () => {
    if (criteriaMet === 'TRUE') {
      return <CheckCircleIcon style={{ color: 'green' }} />
    } else if (criteriaMet === 'FALSE') {
      return <CancelIcon style={{ color: 'red' }} />
    }
    return null
  }

  const toggleDocumentSelector = () => {
    setShowDocumentSelector(!showDocumentSelector)
  }

  const handleToggleLogs = () => {
    setShowLogs((prev) => !prev)
  }

  const handleToggleDetail = () => {
    setShowDetail((prev) => !prev)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  const renderAttachmentTypeDropdown = () => {
    if (test.fields) {
      const field = test.fields.find((f) => f.name === 'attachmentType')
      return (
        field &&
        field.allowedValues && (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={attachmentType}
              label={field.label}
              onChange={handleAttachmentTypeChange}
              disabled={field.readonly}
            >
              {field.allowedValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader title={test.name} />
      <Divider />
      <Card>
        <AlertSnackbar message={alertMessage} severity={alertSeverity} open={alertOpen} onClose={handleAlertClose} />
      </Card>
      {showDetail ? (
        <>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {test.moreInfo?.subHeader}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {test.longDesc}
            </Typography>
            {test.moreInfo?.tableData && (
              <DynamicTable headers={test.moreInfo.headers} rows={test.moreInfo.tableData} />
            )}
            <Box sx={{ mt: 2 }}>
              {test.moreInfo?.fields?.map((field) => (
                <Box key={field.name} sx={{ mb: 2 }}>
                  {field.render ? (
                    field.render(formData[field.name])
                  ) : field.datatype === 'checkbox' ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData[field.name] as boolean}
                          onChange={(e) => handleChange(field.name, e.target.checked)}
                        />
                      }
                      label={field.label}
                    />
                  ) : (
                    <TextField
                      label={field.label}
                      type={field.datatype === 'number' ? 'number' : 'text'}
                      value={formData[field.name] as string}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              ))}
            </Box>

            {test.moreInfo?.optionalTextField && (
              <TextField
                fullWidth
                label={test.moreInfo.optionalTextField.label}
                helperText={test.moreInfo.optionalTextField.helperText}
                defaultValue={test.moreInfo.optionalTextField.defaultValue}
                sx={{ mt: 2 }}
              />
            )}
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
          </CardContent>
        </>
      ) : showLogs ? (
        <CardContent>
          <Typography variant="h6">Test Logs</Typography>
          {testRequestResponses ? (
            <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
              {formattedLogs}
            </Typography>
          ) : (
            <Typography variant="body1">No logs to display.</Typography>
          )}
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            {test.criteria &&
              manualValidationCriteria.includes(test.criteria) &&
              formattedLogs.length > 0 &&
              criteriaMet.includes('MANUAL') && (
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
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {test.desc}
          </Typography>
          {attachmentTypeTestIDs.includes(test.id) && renderAttachmentTypeDropdown()}
          <Divider sx={{ mb: 0 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'end',
              width: '100%',
              p: 1,
            }}
          >
            {test.ccdaFileRequired && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
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
              <DocumentSelector
                onConfirm={handleDocumentConfirm}
                onClose={handleDocumentSelectorClose}
                receive={test.sutRole === 'receiver'}
              />
            )}

            {_.has(test, 'fields') &&
              test.fields !== undefined &&
              test.fields[0]?.name === 'sutCommandTimeoutInSeconds' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <TextField name={test.fields[0].name} label={test.fields[0].label} />
                </Box>
              )}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              {renderCriteriaMetIcon()}
              <LoadingButton
                loading={isLoading}
                done={isFinished}
                onClick={handleRunTest}
                variant="contained"
                color="primary"
              >
                <LoadingButton
                  loading={isLoading}
                  done={isFinished}
                  onClick={handleRunTest}
                  variant="contained"
                  color="primary"
                >
                  {test.protocol && mdnTestIds.includes(test.protocol)
                    ? currentStep === 1
                      ? 'RUN'
                      : 'CHECK MDN'
                    : 'RUN'}
                </LoadingButton>
              </LoadingButton>
              <Button variant="contained" onClick={handleToggleDetail}>
                MORE INFO
              </Button>
              <Button variant="contained" color="inherit" onClick={handleToggleLogs}>
                LOGS
              </Button>
              {test.criteria &&
                criteriaMet &&
                Array.from(clearButtonVisibleOnCriteriaSet).some((status) => criteriaMet.includes(status)) && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="inherit" onClick={handleClearTest}>
                      Clear
                    </Button>
                  </Box>
                )}
              {test.criteria && manualValidationCriteria.includes(test.criteria) && !apiError && isFinished && (
                <Typography sx={{ ml: 2, color: 'error.main' }}>Waiting Validation</Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      )}
    </Card>
  )
}

export default TestCard
