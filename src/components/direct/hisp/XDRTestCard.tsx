import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material'

import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import _ from 'lodash'
import React, { useState } from 'react'
import DynamicTable from './DynamicTable'

export type TestCaseFields = {
  name?: string
  id?: string | number
  protocol?: string
  desc?: string
  sutEdge?: boolean
  sutHisp?: boolean
  sutRole?: string
  criteria?: string
  status?: string
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
  type: 'text' | 'checkbox' | 'icon'
  isChecked?: boolean
}

export interface TestCardProps {
  test: TestCaseFields
}
interface StepTextProps {
  inputs: InputFields[]
  role?: string
}
const handleClick = (link: string) => {
  navigator.clipboard
    .writeText(link)
    .then(() => {
      alert('Link copied to clipboard: ' + link)
    })
    .catch((err) => {
      console.error('Failed to copy link: ', err)
      alert('Failed to copy link. Please try again.')
    })
}
const flexColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  pt: 2,
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

const TestCard = ({ test }: TestCardProps) => {
  const [showDetail, setShowDetail] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: FieldValue }>(() => {
    const initialData: { [key: string]: FieldValue } = {}
    test.moreInfo?.fields?.forEach((field) => {
      initialData[field.name] = field.value
    })
    return initialData
  })

  const handleToggleDetail = () => {
    setShowDetail((prev) => !prev)
  }

  const handleChange = (name: string, value: FieldValue) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const renderMoreInfo = () => {
    const { moreInfo } = test
    return (
      <Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {moreInfo?.subHeader}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {moreInfo?.subDesc}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {moreInfo?.subDesc2}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {moreInfo?.expTestHeader}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {moreInfo?.expTestResults}
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
                test.inputs !== undefined &&
                test.inputs.map((input) => {
                  return (
                    <Box sx={flexColumnStyle} key={input.key}>
                      <FormControl fullWidth>
                        <TextField fullWidth id="card-input" label={input.name} variant="outlined" />
                        <FormHelperText>{input.hoverlabel}</FormHelperText>
                      </FormControl>
                    </Box>
                  )
                })}
            </CardContent>
            <Divider />

            {/* Note: This might change with functionality to generate the endpoint*/}
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
              {_.includes(
                ['10', '11', '12', '32mu2', '33mu2', '34mu2', '35mu2', '36mu2', '37mu2', '38mu2', '43mu2', '44mu2'],
                test.id
              ) && (
                <Box width={'50%'}>
                  <Box>
                    <Button
                      sx={{ ml: 2 }}
                      color="secondary"
                      endIcon={<ContentPasteGoIcon color="secondary" />}
                      onClick={() => handleClick(endpoint + 'edge-ttp__' + test.id + '/rep/xdrpr')}
                    >
                      Endpoint
                    </Button>
                    <Button
                      sx={{ ml: 2 }}
                      color="secondary"
                      endIcon={<ContentPasteGoIcon color="secondary" />}
                      onClick={() => handleClick(endpointTLS + 'edge-ttp__' + test.id + '/rep/xdrpr')}
                    >
                      Endpoint TLS
                    </Button>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, pl: 2 }}>
                <Button variant="contained" color="primary">
                  RUN
                </Button>
                <Button variant="contained" onClick={handleToggleDetail}>
                  MORE INFO
                </Button>
                <Button variant="contained" color="inherit">
                  LOGS
                </Button>
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
