import DynamicTable from './DynamicTable'
import _ from 'lodash'
import React, { useState, useMemo, SyntheticEvent, useContext } from 'react'
import { handleSMTPLogAPICall } from '../test-by-criteria/ServerActions'
import LoadingButton from '../shared/LoadingButton'
import { APICallData, APICallResponse, TestRequestResponses } from '../test-by-criteria/ServerActions'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Tabs,
  Tab,
  SelectChangeEvent,
} from '@mui/material'
import AlertSnackbar from '../shared/AlertSnackbar'
import eventTrack from '@/services/analytics'
import { ProfileContext } from './context'

import palette from '@/styles/palette'
import DocumentSelector from './DocumentSelector'
import { handleAPICall } from '../test-by-criteria/ServerActions'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

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

interface Attachment {
  filename: string
  content: string
}

interface ParsedEmailData {
  email: string
  attachments: Attachment[]
}

interface TestCardProps {
  test: TestCaseFields
  hostname?: string
  email?: string
  username?: string
  password?: string
  tlsRequired?: boolean
  receive?: boolean
  testRequestResponsesRaw: { [key: string]: string }
}

interface SelectedDocument {
  directory: string
  fileName: string
  fileLink: string
}

const TestCard: React.FC<TestCardProps> = ({
  testRequestResponsesRaw,
  test,
  hostname = 'defaultHostname',
  email = 'defaultEmail',
  username = 'defaultUsername',
  password = 'defaultPassword',
  tlsRequired = false,
}) => {
  const attachmentTypeTestIDs = [231, 331]
  const manualValidationCriteria = [
    "['b1-5']",
    "['b1-6']",
    "['b1-5','su1-5']",
    "['b1-6','su1-6']",
    "['h2-8','b1-4','b1-7','su1-4','su1-7','sc2-8']",
    "['b1-4','su1-4']",
    "['b1-4']",
    "['h2-4','sc2-4']",
  ]
  const manualValidationIDs = [521, 523, 524, 525, 526, 527, 528, 529]
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
  const { profilename } = useContext(ProfileContext)
  const [downloadTab, setDownloadTab] = useState(0)
  const [selectedAttachmentTab, setSelectedAttachmentTab] = useState(0)

  const [apiResponse, setApiResponse] = useState<APICallResponse | null>(null)

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
    eventTrack('Clear Test', 'Test By Criteria', `${test.criteria}`)
  }

  const decodeAttachment = (content: string): Uint8Array => {
    const sanitized = content.replace(/\s/g, '')
    const isLikelyBase64 = /^[A-Za-z0-9+/=]+$/.test(sanitized)

    if (isLikelyBase64) {
      try {
        const binaryString = window.atob(sanitized)
        const len = binaryString.length
        const bytes = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        return bytes
      } catch (e) {
        console.error('Base64 decoding failed:', e)
        return new Uint8Array()
      }
    } else {
      const len = content.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = content.charCodeAt(i) & 0xff
      }
      return bytes
    }
  }

  const handleDownload = (content: string, filename: string): void => {
    console.log(`Downloading ${filename} with length:`, content.length)
    let blob: Blob
    if (
      filename.toLowerCase().endsWith('.png') ||
      filename.toLowerCase().endsWith('.jpg') ||
      filename.toLowerCase().endsWith('.jpeg') ||
      filename.toLowerCase().endsWith('.gif')
    ) {
      const bytes = decodeAttachment(content)
      const mimeType = filename.toLowerCase().endsWith('.png')
        ? 'image/png'
        : filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.jpeg')
          ? 'image/jpeg'
          : filename.toLowerCase().endsWith('.gif')
            ? 'image/gif'
            : 'application/octet-stream'
      blob = new Blob([bytes], { type: mimeType })
    } else {
      blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const parseEmailResponse = (raw: string): ParsedEmailData => {
    raw = raw.replace(/\r\n/g, '\n')
    const outerBoundaryMatch = raw.match(/boundary="?([^";]+)"?/i)
    if (!outerBoundaryMatch) {
      return { email: raw, attachments: [] }
    }
    const outerBoundary = '--' + outerBoundaryMatch[1]
    const outerParts = raw.split(outerBoundary)
    let emailContent = ''
    const attachments: Attachment[] = []
    outerParts.forEach((part) => {
      part = part.trim()
      if (!part || part === '--') return
      if (part.toLowerCase().startsWith('content-type: multipart/alternative')) {
        const innerBoundaryMatch = part.match(/boundary="?([^";]+)"?/i)
        if (innerBoundaryMatch) {
          const innerBoundary = '--' + innerBoundaryMatch[1]
          const innerParts = part.split(innerBoundary)
          innerParts.forEach((innerPart) => {
            innerPart = innerPart.trim()
            if (!innerPart || innerPart.startsWith('--')) return
            const headerEnd = innerPart.indexOf('\n\n')
            if (headerEnd === -1) return
            const headers = innerPart.substring(0, headerEnd).toLowerCase()
            const body = innerPart.substring(headerEnd).trim()
            if (headers.includes('content-type: text/plain')) {
              emailContent += body + '\n'
            } else if (headers.includes('content-type: text/html') && !emailContent) {
              emailContent = body
            }
          })
        }
      } else if (part.toLowerCase().includes('content-type: image/')) {
        const headerEnd = part.indexOf('\n\n')
        if (headerEnd === -1) return
        const headers = part.substring(0, headerEnd).toLowerCase()
        const body = part.substring(headerEnd).trim()
        let filename = 'attachment'
        const filenameMatch = headers.match(/filename="?([^"]+\.(png|jpg|jpeg|gif))"?/i)
        if (filenameMatch) {
          filename = filenameMatch[1]
        } else {
          const typeMatch = headers.match(/content-type:\s*image\/(\w+)/i)
          if (typeMatch) {
            filename += '.' + typeMatch[1]
          } else {
            filename += '.bin'
          }
        }
        attachments.push({ filename, content: body })
      } else {
        if (!emailContent) {
          emailContent += part
        }
      }
    })
    return { email: emailContent.trim(), attachments }
  }

  const fixBase64 = (str: string): string => {
    let sanitized = str.replace(/\s/g, '')
    sanitized = sanitized.replace(/-/g, '+').replace(/_/g, '/')
    while (sanitized.length % 4 !== 0) {
      sanitized += '='
    }
    return sanitized
  }

  const base64ToUint8Array = (base64: string): Uint8Array => {
    const fixedBase64 = fixBase64(base64)
    if (!fixedBase64) {
      console.error('Empty base64 string')
      return new Uint8Array()
    }
    try {
      const binaryString = window.atob(fixedBase64)
      console.log('Decoded binaryString length:', binaryString.length)
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      return bytes
    } catch (e) {
      console.error('Failed to decode base64:', e, fixedBase64)
      return new Uint8Array()
    }
  }

  const parsedEmailData: ParsedEmailData = useMemo(() => {
    if (apiResponse && apiResponse.attachments && typeof apiResponse.attachments === 'object') {
      const attachmentsObj = apiResponse.attachments as Record<string, string>
      let emailContent = ''
      const attachments: Attachment[] = []
      if ('Message Content 1' in attachmentsObj) {
        emailContent = attachmentsObj['Message Content 1']
      } else {
        emailContent = Object.values(testRequestResponses).join('\n')
      }
      for (const key in attachmentsObj) {
        if (key !== 'Message Content 1') {
          attachments.push({ filename: key, content: attachmentsObj[key] })
        }
      }
      return { email: emailContent.trim(), attachments }
    } else if (!_.isEmpty(testRequestResponses)) {
      const rawResponse: string = Object.values(testRequestResponses).join('\n')
      return parseEmailResponse(rawResponse)
    }
    return { email: '', attachments: [] }
  }, [apiResponse, testRequestResponses])

  const handleAttachmentTypeChange = (event: SelectChangeEvent<string>) => {
    setAttachmentType(event.target.value)
  }

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setDownloadTab(newValue)
  }

  const logTestResults = async (result: APICallResponse) => {
    if (!_.isEmpty(profilename)) {
      await handleSMTPLogAPICall({
        criteriaMet: result.criteriaMet === 'TRUE',
        testRequestResponses: result.testRequestResponses,
        attachments: [],
        testCaseNumber: test.name,
        profileName: profilename,
      })
    }
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

  const fixEndpoint = (url: string): string => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url
    }
    return url
  }

  const handleRunTest = async () => {
    eventTrack(` Run test for ${test.name}`, 'Test By Criteria', `${test.criteria}`)
    const isMDNTest = test.protocol && mdnTestIds.includes(test.protocol)
    if (test.ccdaFileRequired && !documentDetails && !test.protocol?.includes('mu2')) {
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
        setApiResponse(result)
        if (currentStep === 1) {
          setPreviousResult(result)
          if (result.criteriaMet.includes('STEP2')) {
            setCurrentStep(2)
          }
          setIsFinished(false)
        } else if (currentStep === 2) {
          setPreviousResult(null)
          setIsFinished(false)
        }
        setCriteriaMet(result.criteriaMet)
        setTestRequestResponses(result.testRequestResponses)
        logTestResults(result)
      } else {
        const requestData = createRequestData(0)
        const response = await handleAPICall(requestData)
        const result = response[0]
        setApiResponse(result)
        setIsFinished(true)
        setCriteriaMet(result.criteriaMet)
        setTestRequestResponses(result.testRequestResponses)
        if (result.criteriaMet.includes('STEP2')) {
          setCurrentStep(2)
        }
        logTestResults(result)
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
      if (
        test.criteria &&
        !(manualValidationCriteria.includes(test.criteria) || manualValidationIDs.includes(test.id) || isMDNTest)
      ) {
        setIsFinished(false)
      }
    }
  }

  const renderCriteriaMetIcon = () => {
    if (criteriaMet === 'TRUE' || criteriaMet === 'PASSED') {
      return <Chip color="success" label="Success"></Chip>
    } else if (criteriaMet === 'FALSE' || criteriaMet === 'ERROR' || criteriaMet === 'RETRY') {
      return <Chip color="error" label="Failed"></Chip>
    }
    return null
  }

  const toggleDocumentSelector = () => {
    setShowDocumentSelector(!showDocumentSelector)
  }

  const handleToggleLogs = (buttonText: string) => {
    setShowLogs((prev) => !prev)
    eventTrack(buttonText, 'Test By Criteria - XDR Test', `${test.criteria}`)
  }

  const handleToggleDetail = (buttonText: string) => {
    setShowDetail((prev) => !prev)
    eventTrack(buttonText, 'Test By Criteria - XDR Test', `${test.criteria}`)
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
      <CardHeader titleTypographyProps={{ fontWeight: '500' }} title={test.name} />
      <Divider />
      <CardContent sx={{ px: 2 }}>
        <Card>
          <AlertSnackbar message={alertMessage} severity={alertSeverity} open={alertOpen} onClose={handleAlertClose} />
        </Card>
        {showDetail ? (
          <>
            <CardContent sx={{ px: 0, pb: '0px!important' }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {test.moreInfo?.subHeader}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {test.longDesc ? test.longDesc : test.desc}
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
                {/* <Button variant="contained" color="primary" onClick={() => console.log(formData)}>
                RUN
              </Button> */}
                <Button variant="outlined" color="secondary" onClick={() => handleToggleDetail('RETURN TO TEST')}>
                  RETURN TO TEST
                </Button>
              </Box>
            </CardContent>
          </>
        ) : showLogs ? (
          <CardContent sx={{ display: 'flex', flexDirection: 'column', minWidth: '100%', p: 0, pb: '0px!important' }}>
            <Typography variant="h6">Test Logs</Typography>
            {testRequestResponses ? (
              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {formattedLogs}
              </Typography>
            ) : (
              <Typography variant="body1">No logs to display.</Typography>
            )}
            <Divider sx={{ mb: 2, mt: 2 }} />

            <Tabs value={downloadTab} onChange={(e, newValue) => setDownloadTab(newValue)} aria-label="Download Tabs">
              <Tab label="Email Content" />
              <Tab label="Attachments" />
            </Tabs>

            {downloadTab === 0 && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => handleDownload(parsedEmailData.email, 'email.txt')}
                >
                  Download Content
                </Button>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {parsedEmailData.email}
                </Typography>
              </Box>
            )}

            {downloadTab === 1 && (
              <Box sx={{ mt: 2 }}>
                {parsedEmailData.attachments.length === 0 ? (
                  <Typography>No attachments available.</Typography>
                ) : (
                  <>
                    <Tabs
                      value={selectedAttachmentTab}
                      onChange={(e, newValue) => setSelectedAttachmentTab(newValue)}
                      aria-label="Attachment Tabs"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {parsedEmailData.attachments.map((att, index) => (
                        <Tab key={index} label={att.filename} />
                      ))}
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                      {(() => {
                        const att = parsedEmailData.attachments[selectedAttachmentTab]
                        return (
                          <>
                            <Button
                              variant="outlined"
                              sx={{ mt: 1 }}
                              onClick={() => handleDownload(att.content, att.filename)}
                            >
                              Download {att.filename}
                            </Button>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
                              {att.content}
                            </Typography>
                          </>
                        )
                      })()}
                    </Box>
                  </>
                )}
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mt: 2,
              }}
            >
              <Button variant="outlined" color="secondary" onClick={() => handleToggleLogs('RETURN TO TEST')}>
                RETURN TO TEST
              </Button>
            </Box>
          </CardContent>
        ) : (
          <>
            <CardContent sx={{ px: 0 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {test.desc}
              </Typography>
              {attachmentTypeTestIDs.includes(test.id) && renderAttachmentTypeDropdown()}
            </CardContent>
            <Divider />
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'flex-end'}
              pt={2}
              flexWrap={'wrap'}
              flexDirection={'row-reverse'}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'flex-end',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Box>
                  {test.criteria &&
                    (manualValidationCriteria.includes(test.criteria) || manualValidationIDs.includes(test.id)) &&
                    formattedLogs.length > 0 &&
                    criteriaMet.includes('MANUAL') && (
                      <Typography sx={{ ml: 1, color: 'primary' }}>Awaiting Validation...(Check Logs)</Typography>
                    )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <LoadingButton
                    loading={isLoading}
                    done={isFinished}
                    progressive={false}
                    progressDuration={5000}
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
                  <Button variant="outlined" color="secondary" onClick={() => handleToggleDetail('MORE INFO')}>
                    MORE INFO
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleToggleLogs('LOGS')}>
                    LOGS
                  </Button>
                  {((test.criteria && criteriaMet) || documentDetails || testRequestResponses) && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="text"
                        sx={{ color: palette.errorDark }}
                        color="inherit"
                        onClick={handleClearTest}
                      >
                        Clear
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 1,
                  mt: 1,
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
                    {documentDetails && (
                      <Typography variant="caption" sx={{ lineBreak: 'anywhere', mt: 1 }}>
                        Selected: {documentDetails.fileName}
                      </Typography>
                    )}
                  </Box>
                )}
                {showDocumentSelector && (
                  <DocumentSelector
                    onConfirm={handleDocumentConfirm}
                    onClose={handleDocumentSelectorClose}
                    receive={test.sutRole === 'receiver'}
                    protocol={test.protocol || ''}
                  />
                )}
                {_.has(test, 'fields') &&
                  test.fields !== undefined &&
                  test.fields[0]?.name === 'sutCommandTimeoutInSeconds' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <TextField name={test.fields[0].name} label={test.fields[0].label} />
                    </Box>
                  )}
                {renderCriteriaMetIcon()}
              </Box>
            </Box>
          </>
        )}
        <Divider sx={{ mb: 2, mt: 2 }} />
      </CardContent>
    </Card>
  )
}

export default TestCard
