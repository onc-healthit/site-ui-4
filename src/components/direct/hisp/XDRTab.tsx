import React, { useState } from 'react'

import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from '@mui/material'
import XDRTestCard from '@components/direct/hisp/XDRTestCard'
import { Download } from '@mui/icons-material'
import palette from '@/styles/palette'
const XDR = () => {
  const [option, setOption] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string)
  }

  const dropdown = [
    {
      value: 'Sender',
      label: 'Sender',
    },
    {
      value: 'Reciever',
      label: 'Reciever',
    },
  ]
  return (
    <Container>
      <Box pt={4}>
        <Typography variant="h3">
          Select sender or receiver for your system & fill in the additional fields to get started.{' '}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={4} py={4}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 100 }} display={'flex'} gap={4} flexDirection={'column'}>
          <Card elevation={4}>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="select-label">Choose a sender or reciever to see the test </InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={option}
                  label="Choose a sender or reciever to see the test"
                  onChange={handleChange}
                >
                  {dropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          <Card elevation={4}>
            <CardContent>
              <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={2} pt={1}>
                <Typography>You can also download XDR TLS certificates.</Typography>
                <Button variant="outlined" color="primary" endIcon={<Download />}>
                  Download
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box gap={4} display={'flex'} flexDirection={'column'} width={'60%'}>
          {option === 'Sender' && (
            <XDRTestCard
              cardHeader={'XDR Test 10'}
              cardContent={
                'Test Tool sends a Direct Message to the SUT. The SUT must translate this to an XDR message and send it back to the Edge. Verify that the HISP system can create an XDR message per the specification and forward to Edge. The return endpoint is provided below. The validation report will be sent to the email address registered with the Direct address enter during setup. Provide your Direct To Address. Hit Run to generate your endpoint'
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__10/rep/xdrpr' },
                { label: 'Endpoint TLS', href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__10/rep/xdrpr' },
              ]}
              cardInput="Direct To Address"
              helperText="Direct To Address: SUTs receiving email endpoint for Direct/XDR translation, ETT to SUT workflow."
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Sender' && (
            <XDRTestCard
              cardHeader={'XDR Test 11'}
              cardContent={
                'Test Tool sends a Direct Message + XDM to the SUT. The SUT must translate this to an XDR message with Limited Metadata and send it back to the Edge. Verify that the HISP system can create an XDR message per the specification and forward to Edge. The return endpoint is provided below. The validation report will be sent to the email address registered with the Direct address enter during setup. Provide your Direct To Address. Hit Run to generate your endpoint.'
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__11/rep/xdrpr' },
                { label: 'Endpoint TLS', href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__11/rep/xdrpr' },
              ]}
              cardInput="Direct To Address"
              helperText="Direct To Address: SUTs receiving email endpoint for Direct/XDR translation, ETT to SUT workflow."
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Sender' && (
            <XDRTestCard
              cardHeader={'XDR Test 12'}
              cardContent={
                'Test Tool sends a Direct Message + XDM to the SUT. The SUT must translate this to an XDR message with Full Metadata and send it back to the Edge. Verify that the HISP system can create an XDR message per the specification and forward to Edge. The return endpoint is provided below.The validation report will be sent to the email address registered with the Direct address enter during setup. Provide your Direct To Address. Hit Run to generate your endpoint.'
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__12/rep/xdrpr' },
                { label: 'Endpoint TLS', href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__12/rep/xdrpr' },
              ]}
              cardInput="Direct To Address"
              helperText="Direct To Address: SUTs receiving email endpoint for Direct/XDR translation, ETT to SUT workflow."
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Sender' && (
            <XDRTestCard
              cardHeader={'XDR Test 12'}
              cardContent={
                'Test Tool sends a Direct Message + XDM to the SUT. The SUT must translate this to an XDR message with Full Metadata and send it back to the Edge. Verify that the HISP system can create an XDR message per the specification and forward to Edge. The return endpoint is provided below.The validation report will be sent to the email address registered with the Direct address enter during setup. Provide your Direct To Address. Hit Run to generate your endpoint.'
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__12/rep/xdrpr' },
                { label: 'Endpoint TLS', href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__12/rep/xdrpr' },
              ]}
              cardInput="Direct To Address"
              helperText="Direct To Address: SUT's receiving email endpoint for Direct/XDR translation, ETT to SUT workflow."
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Sender' && (
            <XDRTestCard
              cardHeader={'XDR Test 16'}
              cardContent={
                'Verify that Mutual TLS session is established between the Sender and the Receiver before transimitting data. Provide your Direct From Address. Hit Run to generate your endpoint.'
              }
              links={null}
              cardInput="Direct From Address"
              helperText="Direct From Address: SUT (HISP) outgoing SMTP address (or) MDN."
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Sender' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}

          {/* Reciever Test */}

          {option === 'Reciever' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Reciever' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Reciever' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Reciever' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Reciever' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
          {option === 'Reciever' && (
            <XDRTestCard
              cardHeader={'XDR Test 17'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
            />
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default XDR
