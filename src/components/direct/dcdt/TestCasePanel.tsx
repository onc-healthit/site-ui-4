import palette from '@/styles/palette'
import { Box, List, ListItem, Typography } from '@mui/material'
import _ from 'lodash'
import bulletedList from '../shared/BulletList'

const oneColumnContainer = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginBottom: '8px',
  marginLeft: '16px',
  gap: 1,
}

const twoColumnContainer = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  marginBottom: 1,
  marginLeft: 2,
}
export type LocationFields = {
  Type?: string
  Mail_Address?: string
  Host?: string
  Port?: string
}
export type CertificateFields = {
  name: string
  Valid: string
  Description: string
  Binding_Type: string
  Location: LocationFields[] | []
}
export type TestCaseFields = {
  code?: string
  name?: string
  testcaseid?: string
  Direct_address_2014?: string
  Direct_address_2015?: string
  Binding_Type?: string
  Location_Type?: string
  Negative?: string
  Optional?: string
  Description?: string
  RTM_Sections?: string
  RFC_4398?: string
  RFC_2782?: string
  RFC_2798?: string
  RFC_1035?: string
  RFC_4298?: string
  RFC_5280?: string
  Direct_SHT?: string
  Instructions?: string
  Target_Certificate?: CertificateFields[]
  Background_Certificate?: CertificateFields[]
}

export interface TestCasePanelProps {
  testCaseFields: TestCaseFields[]
}
interface CertificateListProps {
  certificateFields: CertificateFields[] | []
}
interface ListFields {
  name: string
  value: string
}
const CustomListItem = ({ name, value }: ListFields) => {
  return (
    <>
      <ListItem
        sx={{
          display: 'list-item',
        }}
      >
        <Typography variant="body2">
          <strong>{name}: </strong>
          {value}
        </Typography>
      </ListItem>
    </>
  )
}
const CertificateList = ({ certificateFields }: CertificateListProps) => {
  return (
    <>
      {certificateFields.map((c, i) => {
        return (
          <List disablePadding key={i} sx={bulletedList('disc')}>
            {_.has(c, 'name') && <CustomListItem name={c.name} value={''} />}
            <List sx={bulletedList('circle')}>
              {_.has(c, 'Valid') && <CustomListItem name={'Valid'} value={c.Valid} />}
              {_.has(c, 'Binding_Type') && <CustomListItem name={'Binding Type'} value={c.Binding_Type} />}
              {_.has(c, 'Location') && (
                <>
                  <CustomListItem name={'Location'} value={''} />
                  {c.Location.map((l, i) => {
                    return (
                      <List key={i} sx={bulletedList('square')}>
                        {_.has(l, 'Type') && <CustomListItem name={'Type'} value={l.Type || ''} />}
                        {_.has(l, 'Mail_Address') && (
                          <CustomListItem name={'Mail Address'} value={l.Mail_Address || ''} />
                        )}
                        {_.has(l, 'Host') && <CustomListItem name={'Host'} value={l.Host || ''} />}
                        {_.has(l, 'Port') && <CustomListItem name={'Port'} value={l.Port || ''} />}
                      </List>
                    )
                  })}
                </>
              )}
              {_.has(c, 'Description') && <CustomListItem name={'Description'} value={c.Description} />}
            </List>
          </List>
        )
      })}
    </>
  )
}
const TestCasePanel = ({ testCaseFields }: TestCasePanelProps) => {
  return (
    <Box p={2} bgcolor={palette.secondaryLight} borderRadius={1} border={`1px solid ${palette.secondary}`} mb={2}>
      <Box sx={twoColumnContainer}>
        <Box display={'flex'} minWidth={'50%'}>
          {_.has(testCaseFields[0], 'Binding_Type') && (
            <Typography variant="body2">
              <strong>Binding Type: </strong>
              {testCaseFields[0].Binding_Type}
            </Typography>
          )}
        </Box>
        {_.has(testCaseFields[0], 'Location_Type') && (
          <Typography variant="body2">
            <strong>Location Type: </strong>
            {testCaseFields[0].Location_Type}
          </Typography>
        )}
      </Box>
      <Box sx={twoColumnContainer}>
        <Box display={'flex'} minWidth={'50%'}>
          {_.has(testCaseFields[0], 'Negative') && (
            <Typography variant="body2">
              <strong>Negative: </strong>
              {testCaseFields[0].Negative}
            </Typography>
          )}
        </Box>
        {_.has(testCaseFields[0], 'Optional') && (
          <Typography variant="body2">
            <strong>Optional: </strong>
            {testCaseFields[0].Optional}
          </Typography>
        )}
      </Box>
      <Box sx={oneColumnContainer}>
        {_.has(testCaseFields[0], 'RTM_Sections') && (
          <Typography variant="body2">
            <strong>RTM Sections: </strong>
            {testCaseFields[0].RTM_Sections}
          </Typography>
        )}
        {_.has(testCaseFields[0], 'Description') && (
          <Typography variant="body2">
            <strong>Description: </strong>
            {testCaseFields[0].Description}
          </Typography>
        )}

        <Box>
          <Typography variant="body2">
            <strong>Underlying Specification References: </strong>
          </Typography>
          <List disablePadding sx={bulletedList('disc')}>
            {_.has(testCaseFields[0], 'RFC_4398') && (
              <CustomListItem name={'RFC 4398'} value={testCaseFields[0].RFC_4398 || ''} />
            )}

            {_.has(testCaseFields[0], 'RFC_2782') && (
              <CustomListItem name={'RFC 2782'} value={testCaseFields[0].RFC_2782 || ''} />
            )}

            {_.has(testCaseFields[0], 'RFC_2798') && (
              <CustomListItem name={'RFC 2798'} value={testCaseFields[0].RFC_2798 || ''} />
            )}

            {_.has(testCaseFields[0], 'RFC_1035') && (
              <CustomListItem name={'RFC 1035'} value={testCaseFields[0].RFC_1035 || ''} />
            )}
            {_.has(testCaseFields[0], 'RFC_4298') && (
              <CustomListItem name={'RFC 4298'} value={testCaseFields[0].RFC_4298 || ''} />
            )}
            {_.has(testCaseFields[0], 'RFC_5280') && (
              <CustomListItem name={'RFC 5280'} value={testCaseFields[0].RFC_5280 || ''} />
            )}

            {_.has(testCaseFields[0], 'Direct_SHT') && (
              <CustomListItem
                name={'Direct Applicability Statement for Secure Health Transport'}
                value={testCaseFields[0].Direct_SHT || ''}
              />
            )}
          </List>
        </Box>

        {_.has(testCaseFields[0], 'Instructions') && (
          <Typography variant="body2">
            <strong>Instructions: </strong>
            {testCaseFields[0].Instructions}
          </Typography>
        )}
        {_.has(testCaseFields[0], 'Target_Certificate') && (
          <Box>
            <Typography variant="body2">
              <strong>Target Certificate(s)</strong>
            </Typography>
            <CertificateList certificateFields={testCaseFields[0].Target_Certificate || []} />
          </Box>
        )}
        {_.has(testCaseFields[0], 'Background_Certificate') && (
          <Box>
            <Typography variant="body2">
              <strong>Background Certificate(s)</strong>
            </Typography>
            <CertificateList certificateFields={testCaseFields[0].Background_Certificate || []} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TestCasePanel
