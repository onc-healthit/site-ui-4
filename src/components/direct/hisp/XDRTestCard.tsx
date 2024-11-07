import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  TextField,
  Tooltip,
  Typography,
  FormControl,
} from '@mui/material'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import palette from '@/styles/palette'

import _ from 'lodash'
import DynamicTable from './DynamicTable'
import React, { useState, useRef, useEffect } from 'react'
import LoadingButton from '../shared/LoadingButton'
import DocumentSelector from './DocumentSelector'
import { handleXDRAPICall, GetStatus } from '../test-by-criteria/ServerActions'
import { useSession } from 'next-auth/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

import ValidatorMenu from '@/components/c-cda/validation/results/ValidationMenu'
import XMLDisplay from '../shared/colorizeXML'
import ValidatorResultsSummary from '@/components/c-cda/validation/results/ValidationResultsSummary'
import AlertSnackbar from '../shared/AlertSnackbar'
import eventTrack from '@/services/analytics'

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
    process.env.XDR_ENDPOINT_PREFIX || 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__' + test.id + '/rep/xdrpr'
  const defaultEndpointTLS =
    process.env.XDR_ENDPOINT_TLS_PREFIX ||
    'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__' + test.id + '/rep/xdrpr'
  const loadingTime = 60000
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
  const [acceptValidationLogs, setAcceptValidationLogs] = useState<boolean>(false)
  const [displayValidationMessage, setDisplayValidationMessage] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [disableRun, setDisableRun] = useState(true)

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
  const manualValidationIDs = ['4a', '4b', '20amu2', '20bmu2', '13', '14', '15a', '15b', '18', '19', '30mu2', '31mu2']
  const { data: session } = useSession()
  const subHeader = 'Description'
  const subDesc = test['Purpose/Description']
  const expTestHeader = 'Expected Test Results'
  const expTestResults = test['Expected Test Results']

  useEffect(() => {
    const fieldsPresent = areAllFieldsPresent(test.inputs?.filter(shouldDisplayInput) || [], fieldValues)
    setDisableRun(Object.keys(formErrors).length > 0 || !fieldsPresent)
  }, [disableRun, fieldValues, formErrors, test.inputs])
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
  const sendXDRTestsIds = ['16', '17']
  const xdrTestIdsWithThreeSteps = [
    '16',
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
  const sendEdgeTestsIds = ['1', '2', '6', '7', '10', '11', '12', '20amu2', '20bmu2', '49mu2']
  const isCCDADocumentRequired = ccdaRequiredTestIds.includes(test.id.toString())
  const StepText = ({ inputs, role, endpointsGenerated, criteriaMet }: StepTextProps) => {
    if (manualValidationIDs.includes(test.id.toString()) && isFinished) {
      if (test.id == '20amu2' || test.id == '20bmu2') {
        testRequest == 'Check your SUT logs and accept or reject'
        testResponse == 'Check your SUT logs and accept or reject'
      }
      return (
        <Typography variant="body2">
          <strong>Step 3:</strong> Check the logs to accept/reject the response
        </Typography>
      )
    }

    if (endpointsGenerated || xdrTestIdsWithThreeSteps.includes(test.id.toString())) {
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
          {/* {role === 'sender' ? senderText : receiverText} */}
          {/* {role === 'sender' ? senderText : receiverText} */}
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
  const areAllFieldsPresent = (inputs: InputFields[], fieldValues: { [key: string]: string }): boolean => {
    const inputKeys = inputs.map((input) => input.key).filter((key): key is string => key !== undefined)
    const fieldValueKeys = Object.keys(fieldValues)
    const keysPresent =
      inputKeys.every((key) => fieldValueKeys.includes(key)) && fieldValueKeys.every((key) => inputKeys.includes(key))
    return keysPresent
  }

  const handleChange = (key: string, value: string) => {
    const errors = { ...formErrors }

    if (key) {
      setFieldValues((prev) => ({
        ...prev,
        [key]: value,
      }))
      if (value === '') {
        errors[key] = 'This field is required'
      } else if (key === 'direct_to' || key === 'direct_from' || key === 'outgoing_from') {
        if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) {
          errors[key] = 'Please enter a valid email'
        } else {
          delete errors[key]
        }
      } else {
        delete errors[key]
      }
    }

    setFormErrors(errors)
  }

  const fixEndpoint = (url: string): string => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url
    }
    return url
  }

  const handleRunTest = async () => {
    eventTrack(` Run test for ${test.name}`, 'Test By Criteria - XDR Test', `${test.criteria}`)
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

      if (
        endpointsGenerated ||
        (xdrTestIdsWithThreeSteps.includes(test.id.toString()) && !isFinished && criteriaMet === 'PENDING')
      ) {
        const status = await GetStatus(test.id.toString())
        console.log('Test status:', status)
        setTestRequestRequest(status.testRequest)
        setTestRequestResponse(status.testResponse)
        setCriteriaMet(status.criteriaMet)
        setIsFinished(true)
        setIsLoading(false)
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
          setIsLoading(false)
          if (test.criteria && !manualValidationIDs.includes(test.id.toString())) {
            setCriteriaMet(response.criteriaMet)
          }
          if (true) {
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
          console.log('Full response: ', response)
          console.log('Criteria met: ', response.criteriaMet)
          console.log('Test Request Responses:', response.testResponse)
        }, loadingTime)
      }
    } catch (error) {
      console.error('Failed to run test:', error)
      setApiError(true)
      if (test.criteria && !manualValidationIDs.includes(test.id.toString())) {
        setCriteriaMet('FALSE')
      }
      setIsLoading(false)
    } finally {
      if (test.criteria && !manualValidationIDs.includes(test.id.toString())) {
        setTimeout(() => {
          setIsFinished(false)
        }, loadingTime)
      }
    }
  }

  const handleAcceptTest = () => {
    setDisplayValidationMessage(true)
    setAcceptValidationLogs(true)
    setCriteriaMet('TRUE')
    //setShowLogs(false)
  }
  const handleRejectTest = () => {
    setDisplayValidationMessage(true)
    setAcceptValidationLogs(false)
    setCriteriaMet('FALSE')
    // setShowLogs(false)
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
    setDisplayValidationMessage(false)
    eventTrack('Clear Test', 'Test By Criteria - XDR Test', `${test.criteria}`)
  }

  const renderCriteriaMetIcon = () => {
    if (endpointsGenerated && criteriaMet === 'PENDING') {
      return <Chip variant="outlined" color="warning" label="Pending"></Chip>
    }
    if (criteriaMet === 'PENDING' && xdrTestIdsWithThreeSteps.includes(test.id.toString())) {
      return <Chip variant="outlined" color="warning" label="Pending"></Chip>
    }
    if (
      criteriaMet === 'TRUE' ||
      criteriaMet === 'PASSED' ||
      criteriaMet === 'SUCCESS' ||
      (criteriaMet === 'MANUAL' && isFinished && !xdrTestIdsWithThreeSteps.includes(test.id.toString()))
    ) {
      return <Chip color="success" label="Success"></Chip>
    } else if (criteriaMet === 'FALSE' || criteriaMet === 'ERROR' || criteriaMet === 'FAILED') {
      return <Chip color="error" label="Failed"></Chip>
    }
    return null
  }
  const handleToggleLogs = (buttonText: string) => {
    setShowLogs((prev) => !prev)
    eventTrack(buttonText, 'Test By Criteria - XDR Test', `${test.criteria}`)
  }

  const handleToggleDetail = (buttonText: string) => {
    setShowDetail((prev) => !prev)
    eventTrack(buttonText, 'Test By Criteria - XDR Test', `${test.criteria}`)
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

      const xmlString = typeof content === 'string' ? content : 'No logs to display.'
      const issueXmlStyle = {
        overflow: 'auto',
        borderRadius: 0,
        maxHeight: '700px',
      }

      return (
        <Box sx={issueXmlStyle}>
          <SyntaxHighlighter language="xml" style={prism} wrapLongLines={true}>
            {xmlString}
          </SyntaxHighlighter>
        </Box>
      )
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
          {/* <Button variant="contained" color="primary" onClick={() => console.log(formData)}>
            RUN
          </Button> */}
          <Button variant="outlined" color="secondary" onClick={() => handleToggleDetail('RETURN TO TEST')}>
            RETURN TO TEST
          </Button>
        </Box>
      </Box>
    )
  }
  return (
    <Card>
      <CardHeader titleTypographyProps={{ fontWeight: '500' }} title={test.name} />
      <Divider />
      <CardContent>
        <AlertSnackbar message={alertMessage} severity={alertSeverity} open={alertOpen} onClose={handleAlertClose} />
        {showDetail ? (
          renderMoreInfo()
        ) : showLogs ? (
          <Box sx={{ px: 2, pb: 0 }}>
            <Typography variant="h3">Log for {test.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mt: 2, mb: 2 }}>
              <ButtonGroup>
                <Button
                  variant={logType === 'request' ? 'contained' : 'outlined'}
                  onClick={() => toggleLogType('request')}
                  color="primary"
                  size="small"
                >
                  Request
                </Button>
                <Button
                  variant={logType === 'response' ? 'contained' : 'outlined'}
                  onClick={() => toggleLogType('response')}
                  color="primary"
                >
                  Response
                </Button>
                <Button
                  variant={logType === 'ccdaValidation' ? 'contained' : 'outlined'}
                  onClick={() => toggleLogType('ccdaValidation')}
                  color="primary"
                  disabled={!validationResults}
                >
                  C-CDA Validation
                </Button>
              </ButtonGroup>
            </Box>

            <Divider sx={{ mb: 2, mt: 2 }} />
            {renderLogs()}
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={() => handleToggleLogs('RETURN TO TEST')}>
                RETURN TO TEST
              </Button>

              {((test.criteria &&
                manualValidationIDs.includes(test.id.toString()) &&
                testRequest &&
                testRequest.length > 0 &&
                !displayValidationMessage) ||
                (test.criteria &&
                  xdrTestIdsWithThreeSteps.includes(test.id.toString()) &&
                  criteriaMet === 'MANUAL' &&
                  testRequest &&
                  testRequest.length > 0 &&
                  !displayValidationMessage)) && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" color="success" onClick={handleAcceptTest}>
                    Accept
                  </Button>
                  <Button variant="text" sx={{ color: palette.warningDark }} onClick={handleRejectTest}>
                    Reject
                  </Button>
                </Box>
              )}
              {displayValidationMessage &&
                (acceptValidationLogs ? (
                  <Chip color="success" label="Validation Accepted"></Chip>
                ) : (
                  <Chip color="error" label="Validation Rejected"></Chip>
                ))}
            </Box>
          </Box>
        ) : (
          <>
            <CardContent sx={{ px: 0 }}>
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
                        required
                        fullWidth
                        label={input.name}
                        variant="outlined"
                        error={input.key !== undefined && _.has(formErrors, input.key as string)}
                        value={input.key ? fieldValues[input.key] || '' : ''}
                        onChange={(e) => input.key && handleChange(input.key, e.target.value)}
                        helperText={
                          input.key !== undefined && _.has(formErrors, input.key)
                            ? _.get(formErrors, input.key as string, null)
                            : input.hoverlabel
                        }
                      />
                    </FormControl>
                  </Box>
                ))}
            </CardContent>
            <Divider />
            {(endpointTestIds.includes(test.id.toString()) || endpointsGenerated) && (
              <Box display={'flex'} flexDirection={'row'} gap={4} px={2} pt={2}>
                <Box width={'50%'} display={'flex'} flexDirection={'column'}>
                  <Tooltip placement="top" title="Click to copy" arrow>
                    <Button
                      sx={{ width: 'fit-content' }}
                      size="small"
                      color="secondary"
                      endIcon={<ContentPasteGoIcon />}
                      onClick={(e) => handleClick(e, endpointsGenerated ? endpoint : `${defaultEndpoint}`)}
                    >
                      Endpoint
                    </Button>
                  </Tooltip>
                  <Typography whiteSpace={'preline'} variant="caption">
                    {endpointsGenerated ? endpoint : defaultEndpoint}
                  </Typography>
                </Box>
                <Box width={'30%'} display={'flex'} flexDirection={'column'}>
                  <Tooltip placement="top" title="Click to copy" arrow>
                    <Button
                      sx={{ width: 'fit-content' }}
                      size="small"
                      color="secondary"
                      endIcon={<ContentPasteGoIcon />}
                      onClick={(e) => handleClick(e, endpointsGenerated ? endpointTLS : `${defaultEndpointTLS}`)}
                    >
                      Endpoint TLS
                    </Button>
                  </Tooltip>
                  <Typography variant="caption">{endpointsGenerated ? endpointTLS : defaultEndpointTLS}</Typography>
                </Box>
              </Box>
            )}
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
                  mt: 1,
                }}
              >
                <Box>
                  {' '}
                  {((test.criteria &&
                    manualValidationIDs.includes(test.id.toString()) &&
                    (testRequest || testResponse) &&
                    isFinished &&
                    !apiError &&
                    criteriaMet !== 'TRUE' &&
                    criteriaMet !== 'FALSE') ||
                    (test.criteria &&
                      xdrTestIdsWithThreeSteps.includes(test.id.toString()) &&
                      (testRequest || testResponse) &&
                      isFinished &&
                      !apiError &&
                      criteriaMet !== 'TRUE' &&
                      criteriaMet !== 'FALSE' &&
                      criteriaMet === 'MANUAL')) && (
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
                    mt: 1,
                  }}
                >
                  <LoadingButton
                    loading={isLoading}
                    done={isFinished}
                    progressive={
                      (sendEdgeTestsIds.includes(test.id.toString()) ||
                        sendXDRTestsIds.includes(test.id.toString()) ||
                        xdrTestIdsWithThreeSteps.includes(test.id.toString())) &&
                      !endpointsGenerated
                    }
                    progressDuration={loadingTime}
                    onClick={handleRunTest}
                    variant="contained"
                    color="primary"
                    disabled={disableRun}
                  >
                    {endpointsGenerated ||
                    (xdrTestIdsWithThreeSteps.includes(test.id.toString()) && criteriaMet === 'PENDING')
                      ? 'REFRESH'
                      : 'RUN'}
                  </LoadingButton>

                  {/* <div ref={hiddenAnchorRef} style={{ visibility: 'hidden', top: '50px' }}></div> */}

                  <Button variant="outlined" color="secondary" onClick={() => handleToggleDetail('MORE INFO')}>
                    MORE INFO
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleToggleLogs('LOGS')}>
                    LOGS
                  </Button>

                  {((test.criteria && criteriaMet) || documentDetails) && (
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

              {requiresCCDADocument() && !endpointsGenerated && !isFinished && (
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
                  {documentDetails && (
                    <Typography variant="caption" sx={{ mt: 1 }}>
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
                  protocol={test.name?.includes('XDR') ? 'xdr' : ''}
                />
              )}

              {renderCriteriaMetIcon()}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default TestCard
