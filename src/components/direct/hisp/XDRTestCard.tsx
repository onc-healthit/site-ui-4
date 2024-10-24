import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Tooltip,
  Typography,
  FormControl,
} from '@mui/material'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import _ from 'lodash'
import React, { useState, useRef } from 'react'
import DynamicTable from './DynamicTable'
import { handleXDRAPICall, GetStatus } from '../test-by-criteria/ServerActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LoadingButton from '../shared/LoadingButton'
import DocumentSelector from './DocumentSelector'
import { useSession } from 'next-auth/react'
import XMLDisplay from '../shared/colorizeXML'
import ValidatorResultsSummary from '@/components/c-cda/validation/results/ValidationResultsSummary'
import AlertSnackbar from '../shared/AlertSnackbar'

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
  endpointsGenerated: boolean
  criteriaMet: string
}

interface ValidationResults {
  resultsMetaData: ResultsMetaData
  ccdaValidationResults: CCDAValidationResult[]
}

interface ResultsMetaData {
  documentType: string
}

interface CCDAValidationResult {
  errorType: string
  messageId: string
}

const senderText = 'Hit Run to generate your endpoint.'
const receiverText = 'Hit Run to send a XDR message.'

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
  receive?: boolean
}
interface SelectedDocument {
  directory: string
  fileName: string
  fileLink: string
}

const TestCard = ({ test }: TestCardProps) => {
  const defaultEndpoint =
    process.env.XDR_ENDPOINT_PREFIX || 'http://ett.healthit.gov:11084/xdstools/sim/edge-ttp__' + test.id + '/rep/xdrpr'
  const defaultEndpointTLS =
    process.env.XDR_ENDPOINT_TLS_PREFIX ||
    'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__' + test.id + '/rep/xdrpr'
  const [showDetail, setShowDetail] = useState(false)
  const [criteriaMet, setCriteriaMet] = useState<string>('')
  const [testResponse, setTestRequestResponse] = useState<string>('')
  const [testRequest, setTestRequestRequest] = useState<string>('')
  const [showLogs, setShowLogs] = useState(false)
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [endpointsGenerated, setEndpointsGenerated] = useState(false)
  const [endpoint, setEndpoint] = useState(defaultEndpoint)
  const [endpointTLS, setEndpointTLS] = useState(defaultEndpointTLS)
  const [validationResults, setValidationResults] = useState<ValidationResults | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const mdhtErrorRef = useRef<HTMLDivElement>(null)
  const mdhtWarningRef = useRef<HTMLDivElement>(null)
  const mdhtInfoRef = useRef<HTMLDivElement>(null)
  const vocabularyErrorRef = useRef<HTMLDivElement>(null)
  const vocabularyWarningRef = useRef<HTMLDivElement>(null)
  const vocabularyInfoRef = useRef<HTMLDivElement>(null)
  const referenceErrorRef = useRef<HTMLDivElement>(null)
  const referenceWarningRef = useRef<HTMLDivElement>(null)
  const referenceInfoRef = useRef<HTMLDivElement>(null)
  const originalCCDARef = useRef<HTMLDivElement>(null)

  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info')

  const [logType, setLogType] = useState<'request' | 'response' | 'ccdaValidation'>('request')
  const manualValidationIDs = ['4a', '4b', '20amu2', '20bmu2']
  const { data: session } = useSession()
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, link: string) => {
    navigator.clipboard.writeText(link)
    setAlertMessage('Copied to clipboard!')
    setAlertSeverity('success')
    setAlertOpen(true)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
  }
  const toggleLogType = (type: 'request' | 'response' | 'ccdaValidation') => {
    setLogType(type)
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
  const ccdaRequiredTestIds = ['1', '2', '3add']
  const sendEdgeTestsCriteria = ['b1-1']
  const isCCDADocumentRequired = ccdaRequiredTestIds.includes(test.id.toString())
  const StepText = ({ inputs, role, endpointsGenerated, criteriaMet }: StepTextProps) => {
    if (manualValidationIDs.includes(test.id.toString()) && isFinished) {
      if (test.id == '20amu2' || test.id == '20bmu2') {
        console.log('abc')
        testRequest == 'Check your SUT logs and accept or reject'
        testResponse == 'Check your SUT logs and accept or reject'
      }
      return (
        <Typography variant="body2">
          <strong>Step 3:</strong> Check the logs to accept/reject the response
        </Typography>
      )
    }

    if (endpointsGenerated) {
      return (
        <Typography variant="body2">
          <strong>Step 2:</strong> Send XDR message to endpoint and refresh to check status.
        </Typography>
      )
    }

    return (
      <>
        <Typography variant="body2">
          <strong>Step 1:</strong> Provide your{' '}
          {inputs.map((input, i) => (
            <span key={i}>
              {input.name}
              {inputs.length - 1 === i ? '. ' : ', '}
            </span>
          ))}
          {role === 'sender' ? senderText : receiverText}
        </Typography>
      </>
    )
  }
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

  const fixEndpoint = (url: string): string => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url
    }
    return url
  }

  const handleRunTest = async () => {
    if (!session) {
      setAlertMessage('You must be logged in and have a valid session to perform this action.')
      setAlertSeverity('error')
      setAlertOpen(true)
      return
    }

    if (isCCDADocumentRequired && !documentDetails) {
      setAlertMessage(
        'This test requires a CCDA document to be selected. Please select a document before running the test.'
      )
      setAlertSeverity('error')
      setAlertOpen(true)
      return
    }
    const ip_address = fieldValues['ip_address'] || ''
    const port = fieldValues['port'] || ''
    const direct_to = fieldValues['direct_to'] || ''
    const direct_from = fieldValues['direct_from'] || ''
    const targetEndpointTLS = fieldValues['targetEndpointTLS'] || ''
    const outgoing_from = fieldValues['outgoing_from'] || ''
    try {
      setIsLoading(true)
      setIsFinished(false)
      setCriteriaMet('')
      if (endpointsGenerated) {
        const status = await GetStatus(test.id.toString())
        console.log('Test status:', status)
        setTestRequestRequest(status.testRequest)
        setTestRequestResponse(status.testResponse)
        setCriteriaMet(status.criteriaMet)
        setIsFinished(true)
        if (status.results) {
          setValidationResults(status.results)
          setEndpointsGenerated(false)
        }
      } else {
        const response = await handleXDRAPICall({
          ip_address: ip_address,
          port: port,
          direct_to: direct_to,
          direct_from: direct_from,
          targetEndpointTLS: targetEndpointTLS,
          outgoing_from: outgoing_from,
          name: documentDetails ? documentDetails.fileName : '',
          path: documentDetails ? documentDetails.directory : '',
          link: documentDetails ? documentDetails.fileLink : '',
          id: test.id.toString(),
          jsession: session.user.jsessionid,
          cures: false,
          itemNumber: '12',
          selected: true,
          svap: false,
          uscdiv3: false,
        })
        setTimeout(() => {
          setIsFinished(true)
          if (test.criteria && !manualValidationIDs.includes(test.id.toString())) {
            setCriteriaMet(response.criteriaMet)
          }
          if (!endpointTestIds.includes(test.id.toString())) {
            let endpointSet = false
            if (response.endpoint && response.endpoint.length > 10) {
              setEndpoint(fixEndpoint(response.endpoint))
              endpointSet = true
            }
            if (response.endpointTLS && response.endpointTLS.length > 10) {
              setEndpointTLS(fixEndpoint(response.endpointTLS))
              endpointSet = true
            }
            if (endpointSet) {
              console.log('setting endpoints generated')
              setEndpointsGenerated(true)
            }
          }
          setTestRequestRequest(response.testRequest)
          setTestRequestResponse(response.testResponse)
          if (
            !testRequest &&
            !testResponse &&
            test.criteria &&
            !manualValidationIDs.includes(test.id.toString()) &&
            criteriaMet
          ) {
            console.log('Response null, setting criteria met false')
            setCriteriaMet('FALSE')
          }
          console.log('Criteria met: ', response.criteriaMet)
          console.log('Test Request Responses:', response.testResponse)
        }, 10)
      }
    } catch (error) {
      console.error('Failed to run test:', error)
      setApiError(true)
      if (test.criteria && !manualValidationIDs.includes(test.id.toString())) {
        setCriteriaMet('FALSE')
      }
    } finally {
      setIsLoading(false)
      if (test.criteria && !manualValidationIDs.includes(test.id.toString())) {
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
    setEndpointsGenerated(false)
    setEndpoint(defaultEndpoint)
    setEndpointTLS(defaultEndpointTLS)
    setApiError(false)
    setValidationResults(null)
  }

  const renderCriteriaMetIcon = () => {
    if (endpointsGenerated) {
      return <Typography style={{ color: 'red' }}>Pending</Typography>
    } else if (criteriaMet === 'TRUE' || criteriaMet === 'PASSED' || criteriaMet === 'SUCCESS') {
      return <CheckCircleIcon style={{ color: 'green' }} />
    } else if (criteriaMet === 'FALSE' || criteriaMet === 'ERROR') {
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
  const renderLogs = () => {
    if (logType === 'ccdaValidation') {
      if (validationResults) {
        return (
          <ValidatorResultsSummary
            results={validationResults}
            scrollRef={scrollRef}
            summaryRef={summaryRef}
            mdhtErrorRef={mdhtErrorRef}
            mdhtWarningRef={mdhtWarningRef}
            mdhtInfoRef={mdhtInfoRef}
            vocabularyErrorRef={vocabularyErrorRef}
            vocabularyWarningRef={vocabularyWarningRef}
            vocabularyInfoRef={vocabularyInfoRef}
            referenceErrorRef={referenceErrorRef}
            referenceWarningRef={referenceWarningRef}
            referenceInfoRef={referenceInfoRef}
            originalCCDARef={originalCCDARef}
            criteria={test.criteria || ''}
          />
        )
      } else {
        return <Typography>No C-CDA Validation results available.</Typography>
      }
    } else {
      let content = logType === 'request' ? testRequest : testResponse

      if ((test.id === '20amu2' || test.id === '20bmu2') && isFinished && (!testRequest || !testResponse)) {
        content = 'Check your SUT logs and accept or reject'
      }

      return <XMLDisplay xmlContent={content || 'No logs to display.'} />
    }
  }

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
        <AlertSnackbar message={alertMessage} severity={alertSeverity} open={alertOpen} onClose={handleAlertClose} />
        {showDetail ? (
          renderMoreInfo()
        ) : showLogs ? (
          <CardContent>
            <Typography variant="h3">Log for {test.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start', mt: 2, mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => toggleLogType('request')}
                color={logType === 'request' ? 'primary' : 'inherit'}
              >
                Request
              </Button>
              <Button
                variant="contained"
                onClick={() => toggleLogType('response')}
                color={logType === 'response' ? 'primary' : 'inherit'}
              >
                Response
              </Button>
              <Button
                variant="contained"
                onClick={() => toggleLogType('ccdaValidation')}
                color={logType === 'ccdaValidation' ? 'primary' : 'inherit'}
                disabled={!validationResults}
              >
                C-CDA Validation
              </Button>
              <Button variant="outlined" onClick={handleToggleLogs}>
                Close Logs
              </Button>
            </Box>

            <Divider sx={{ mb: 2, mt: 2 }} />
            {renderLogs()}
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              {test.criteria && manualValidationIDs.includes(test.id.toString()) && isFinished && (
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
                <StepText
                  inputs={test.inputs}
                  role={test.sutRole}
                  endpointsGenerated={endpointsGenerated}
                  criteriaMet={criteriaMet}
                />
              )}
              {_.isEqual(test.sutRole, 'sender') && _.has(test, 'inputs') && test.inputs !== undefined && (
                <StepText
                  inputs={test.inputs}
                  role={test.sutRole}
                  endpointsGenerated={endpointsGenerated}
                  criteriaMet={criteriaMet}
                />
              )}
              {_.has(test, 'inputs') &&
                test.inputs &&
                !endpointsGenerated &&
                !isFinished &&
                test.inputs.filter(shouldDisplayInput).map((input) => (
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
              {(endpointTestIds.includes(test.id.toString()) || endpointsGenerated) && (
                <Box width={'50%'}>
                  <Tooltip placement="bottom" title={endpointsGenerated ? endpoint : `${defaultEndpoint}`} arrow>
                    <Button
                      sx={{ ml: 2 }}
                      color="secondary"
                      endIcon={<ContentPasteGoIcon />}
                      onClick={(e) => handleClick(e, endpointsGenerated ? endpoint : `${defaultEndpoint}`)}
                    >
                      Endpoint
                    </Button>
                  </Tooltip>
                  {test.id != 7 && (
                    <Tooltip
                      placement="bottom"
                      title={endpointsGenerated ? endpointTLS : `${defaultEndpointTLS}`}
                      arrow
                    >
                      <Button
                        sx={{ ml: 2 }}
                        color="secondary"
                        endIcon={<ContentPasteGoIcon />}
                        onClick={(e) => handleClick(e, endpointsGenerated ? endpointTLS : `${defaultEndpointTLS}`)}
                      >
                        Endpoint TLS
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              )}
              {requiresCCDADocument() && !endpointsGenerated && (
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
                <DocumentSelector
                  onConfirm={handleDocumentConfirm}
                  onClose={handleDocumentSelectorClose}
                  receive={test.sutRole === 'receiver'}
                />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, pl: 2 }}>
                {renderCriteriaMetIcon()}

                <LoadingButton
                  loading={isLoading}
                  done={isFinished}
                  progressive={false}
                  progressDuration={10000}
                  onClick={handleRunTest}
                  variant="contained"
                  color="primary"
                >
                  {endpointsGenerated ? 'REFRESH' : 'RUN'}
                </LoadingButton>
                <Button variant="contained" onClick={handleToggleDetail}>
                  MORE INFO
                </Button>
                <Button variant="contained" color="inherit" onClick={handleToggleLogs}>
                  LOGS
                </Button>
                {((test.criteria && criteriaMet) || isFinished) && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="inherit" onClick={handleClearTest}>
                      Clear
                    </Button>
                  </Box>
                )}
                {test.criteria && manualValidationIDs.includes(test.id.toString()) && isFinished && !apiError && (
                  <Typography sx={{ ml: 2, color: 'error.main' }}>Waiting Validation</Typography>
                )}
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default TestCard
