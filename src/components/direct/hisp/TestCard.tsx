import DynamicTable from './DynamicTable'
import InfoIcon from '@mui/icons-material/Info'
import _ from 'lodash'
import React, { useState } from 'react'
import DocumentSelector from './DocumentSelector'
import { handleAPICall } from '../test-by-criteria/ServerActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material'

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
    tableData?: TableRowData[]
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
  datatype: 'checkbox' | 'text' | 'number' | string
  placeholder?: string
  value: FieldValue
  readonly?: boolean
  display?: boolean
  render?: (value: FieldValue) => JSX.Element
}

interface TestCardProps {
  test: TestCaseFields
  hostname: string
  email: string
  username: string
  password: string
  tlsRequired: boolean
}

interface SelectedDocument {
  directory: string
  fileName: string
  fileLink: string
}

const TestCard = ({ test, hostname, email, username, password, tlsRequired }: TestCardProps) => {
  const [showDetail, setShowDetail] = useState(false)
  const [criteriaMet, setCriteriaMet] = useState<string>('')
  const [testRequestResponses, setTestRequestResponses] = useState<string>('')
  const [showLogs, setShowLogs] = useState(false)

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
  const [formData, setFormData] = useState<{ [key: string]: FieldValue }>(() => {
    const initialData: { [key: string]: FieldValue } = {}
    test.moreInfo?.fields?.forEach((field) => {
      initialData[field.name] = field.value
    })
    return initialData
  })

  const [showDocumentSelector, setShowDocumentSelector] = useState(false)

  const handleChange = (name: string, value: FieldValue) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRunTest = async () => {
    if (test.ccdaFileRequired && !documentDetails) {
      alert('This test requires a CCDA document to be selected. Please select a document before running the test.')
    } else {
      try {
        const response = await handleAPICall({
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
          ccdaValidationObjective: documentDetails ? documentDetails.directory : '',
          ccdaFileLink: documentDetails ? documentDetails.fileLink : '',
          cures: true,
          year: '2021',
          hostingcase: 'YES',
        })
        setCriteriaMet(response.criteriaMet)
        setTestRequestResponses(JSON.stringify(response.testRequestResponses, null, 2))
        console.log('Criteria met: ', response.criteriaMet)
        console.log('Test Request Responses:', response.testRequestResponses)
      } catch (error) {
        console.error('Failed to run test:', error)
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
    console.log('Current state before toggle:', showLogs)
    setShowLogs((prev) => !prev)
    console.log('Toggling logs view.')
  }

  const handleToggleDetail = () => {
    console.log('Current state before toggle:', showDetail)
    setShowDetail((prev) => !prev)
    console.log('Toggling details view.')
  }

  return (
    <Card>
      <CardHeader title={test.name} />
      <Divider />

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
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
              {testRequestResponses}
            </Typography>
          ) : (
            <Typography variant="body1">No logs to display.</Typography>
          )}
          <Divider sx={{ mb: 2, mt: 2 }} />
          <Button variant="contained" onClick={handleToggleLogs}>
            Close Logs
          </Button>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {test.desc}
          </Typography>
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
                <Typography>
                  CCDA Document Type <InfoIcon color="primary" fontSize="small" />
                </Typography>
                <Button variant="outlined" color="primary" onClick={toggleDocumentSelector}>
                  SELECT A DOCUMENT
                </Button>
                {documentDetails && <Typography sx={{ mt: 1 }}>Selected: {documentDetails.fileName}</Typography>}
              </Box>
            )}

            {showDocumentSelector && (
              <DocumentSelector onConfirm={handleDocumentConfirm} onClose={handleDocumentSelectorClose} />
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
              <Button variant="contained" color="primary" onClick={handleRunTest}>
                RUN
              </Button>
              <Button variant="contained" onClick={handleToggleDetail}>
                MORE INFO
              </Button>
              <Button variant="contained" color="inherit" onClick={handleToggleLogs}>
                LOGS
              </Button>
            </Box>
          </Box>
        </CardContent>
      )}
    </Card>
  )
}

export default TestCard
