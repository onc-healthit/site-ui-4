import { Box, List, ListItem, Typography } from '@mui/material'
import _ from 'lodash'

export type LocationFields = {
  Type?: string
  Mail_Address?: string
  Host?: string
  Port?: string
}
export type CertificateFields = {
  name?: string
  Valid?: string
  Description?: string
  Binding_Type?: string
  Location?: LocationFields[]
}
export type TestCaseFields = {
  code?: string
  name?: string
  Binding_Type?: string
  Location_Type?: string
  Negative?: string
  Optional?: string
  Description?: string
  RTM_Sections?: string
  RFC_4398?: string
  RFC_2782?: string
  RFC_2798?: string
  Direct_SHT?: string
  Instructions?: string
  Target_Certificate?: CertificateFields[]
  Background_Certificate?: CertificateFields[]
}

export interface TestCasePanelProps {
  testCaseFields: TestCaseFields[]
}
const TestCasePanel = ({ testCaseFields }: TestCasePanelProps) => {
  return (
    <Box p={2}>
      {_.has(testCaseFields[0], 'Binding_Type') && (
        <Typography variant="body2">
          <strong>Binding Type: </strong>
          {testCaseFields[0].Binding_Type}
        </Typography>
      )}
      {_.has(testCaseFields[0], 'Location_Type') && (
        <Typography variant="body2">
          <strong>Location Type: </strong>
          {testCaseFields[0].Location_Type}
        </Typography>
      )}
      {_.has(testCaseFields[0], 'Negative') && (
        <Typography variant="body2">
          <strong>Negative: </strong>
          {testCaseFields[0].Negative}
        </Typography>
      )}
      {_.has(testCaseFields[0], 'Optional') && (
        <Typography variant="body2">
          <strong>Optional: </strong>
          {testCaseFields[0].Optional}
        </Typography>
      )}
      {_.has(testCaseFields[0], 'Description') && (
        <Typography variant="body2">
          <strong>Description: </strong>
          {testCaseFields[0].Description}
        </Typography>
      )}
      {_.has(testCaseFields[0], 'RTM_Sections') && (
        <Typography variant="body2">
          <strong>RTM Sections: </strong>
          {testCaseFields[0].RTM_Sections}
        </Typography>
      )}

      <Typography variant="body2">
        <strong>Underlying Specification References: </strong>

        {_.has(testCaseFields[0], 'RFC_4398') && (
          <Typography component="li"> RFC 4398: {testCaseFields[0].RFC_4398}</Typography>
        )}

        {_.has(testCaseFields[0], 'RFC_2782') && (
          <Typography component="li"> RFC 2782: {testCaseFields[0].RFC_2782}</Typography>
        )}

        {_.has(testCaseFields[0], 'RFC_2798') && (
          <Typography component="li"> RFC 2798: {testCaseFields[0].RFC_2798}</Typography>
        )}

        {_.has(testCaseFields[0], 'Direct_SHT') && (
          <Typography component="li">
            Direct Applicability Statement for Secure Health Transport: {testCaseFields[0].Direct_SHT}
          </Typography>
        )}
      </Typography>

      {_.has(testCaseFields[0], 'Instructions') && (
        <Typography variant="body2">
          <strong>Instructions: </strong>
          {testCaseFields[0].Instructions}
        </Typography>
      )}
      {_.has(testCaseFields[0], 'Target_Certificate') && (
        <Typography variant="body2">
          <strong>Target Certificate(s)</strong>
        </Typography>
      )}
    </Box>
  )
}

export default TestCasePanel
