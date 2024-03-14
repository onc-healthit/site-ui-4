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
} from '@mui/material'
import XDRTestCard from '@components/direct/hisp/XDRTestCard'
import { Download } from '@mui/icons-material'

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
      value: 'Receiver',
      label: 'Receiver',
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
        <Box
          sx={{ position: 'sticky', top: '80px', zIndex: 100, height: '100%' }}
          display={'flex'}
          gap={4}
          flexDirection={'column'}
        >
          <Card elevation={4}>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="select-label">Choose a sender or Receiver to see the test </InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={option}
                  label="Choose a sender or Receiver to see the test"
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
        <Box display={'flex'} flexDirection={'column'} width={'60%'} gap={4}>
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
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
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
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
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
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
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
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
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
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
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
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
            />
          )}

          {/* Receiver Test */}

          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR Test 13'}
              cardContent={
                'Before this test is run, the vendor must register a Direct Address / Contact address pairing using the Direct portion of the ETT tool. Test Tool sends an XDR Message with Limited metadata to the SUT (HISP). The SUT must then translate the message into Direct and send it back to the ETT which is acting as the Destination HISP. The Direct Address it passes the message along to must match the Direct Address that has been pre-registered. A validation report will be sent to the Contact address. Verify that an HISP system can receive a properly formatted XDR message and translate to Direct Message. Provide your Endpoint, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message.'
              }
              links={null}
              cardInput={null}
              helperText={null}
              directFromInput={null}
              portInput={null}
              ipInput={null}
              endpointInput="Endpoint URL"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address:"
              helperOutgoingText="SUT (HISP) outgoing SMTP address."
              helperTimeoutText={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 13'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond to a delivery to a non-existent address. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite. Before this test is run, the vendor must register a Direct Address / Contact address pairing using the Direct portion of the ETT tool. Test Tool sends an XDR Message with Full (XDS) metadata to the SUT (HISP). The SUT must then translate the message into Direct"
              }
              links={[
                { label: 'Endpoint', href: ' http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__32mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: ' https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__32mu2/rep/xdrpr',
                },
              ]}
              cardInput={null}
              helperText={null}
              directFromInput={null}
              portInput={null}
              ipInput={null}
              endpointInput="Endpoint URL"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address:"
              helperOutgoingText="SUT (HISP) outgoing SMTP address."
              helperTimeoutText={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR Test 14'}
              cardContent={
                "Before this test is run, the vendor must register a Direct Address / Contact address pairing using the Direct portion of the ETT tool. Test Tool sends an XDR Message with Full (XDS) metadata to the SUT (HISP). The SUT must then translate the message into Direct and send it back to the ETT which is acting as the Destination HISP. The Direct Address it passes the message along to must match the Direct Address that has been pre-registered. A validation report will be sent to the Contact address. Verify that an HISP system can receive a properly formatted XDR message and translate to Direct Message. Verify the ability of the SUT to appropriately respond to a delivery to an untrusted HISP. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite. Provide your Endpoint, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message."
              }
              links={null}
              cardInput="IP Address:"
              helperText="IP Address (eg: 202.255.24.62)"
              directFromInput={null}
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address:"
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 14'}
              cardContent={
                "Before this test is run, the vendor must register a Direct Address / Contact address pairing using the Direct portion of the ETT tool. Test Tool sends an XDR Message with Full (XDS) metadata to the SUT (HISP). The SUT must then translate the message into Direct and send it back to the ETT which is acting as the Destination HISP. The Direct Address it passes the message along to must match the Direct Address that has been pre-registered. A validation report will be sent to the Contact address. Verify that an HISP system can receive a properly formatted XDR message and translate to Direct Message. Verify the ability of the SUT to appropriately respond to a delivery to an untrusted HISP. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Message Tracking Using Processed MDN test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message."
              }
              links={null}
              cardInput={null}
              helperText={null}
              directFromInput="Direct From Address:"
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address: "
              helperOutgoingText={null}
              helperTimeoutText={null}
              helperEndpointText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR Test 15a'}
              cardContent={
                'Verify that HISP disconnects when the Server provided certificate is invalid. Only the IP address of the SUT shall be entered below. As this is a socket based test, the full endpoint is not required. Only the IP Address and port are needed and provided. Provide your IP Address. Hit Run to generate your endpoint'
              }
              links={null}
              cardInput={null}
              helperText={null}
              directFromInput={null}
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput={null}
              helperOutgoingText={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages"
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR Test 15b'}
              cardContent={
                'Verify the ability of the receiving system to appropriately respond to a malformed message. This test is for an invalid SOAP body.'
              }
              links={null}
              cardInput={null}
              helperText={null}
              directFromInput={null}
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput={null}
              helperOutgoingText={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages"
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 15'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for."
              }
              links={null}
              cardInput={null}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct From Address:"
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput={null}
              portInput={null}
              ipInput={null}
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address:"
              helperTimeoutText={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR Test 18'}
              cardContent={
                'Test Tool authenticates with the HISP using Mutual TLS correctly. Certificates for this testing tool can be downloaded from the top of this page. This is a socket-level test, the full endpoint is not required. Enter only the  IP Address and port below. Provide your IP Address, and Port. Hit Run to send a XDR message.'
              }
              links={null}
              cardInput={null}
              helperText="Port"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
              helperOutgoingText={null}
              helperTimeoutText="IP Address (eg: 202.255.24.62)"
              helperEndpointText={null}
              portInput="Port Number"
              ipInput="IP Address"
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR Test 19'}
              cardContent={
                'Test Tool authenticates with the HISP using bad certificates. The SUT is expected to disconnect before any meaningful data is sent. Certificates for this testing tool can be downloaded from the top of this page. This is a socket-level test, the full endpoint is not required. Enter only the IP Address and port below. Provide your IP Address, and Port. Hit Run to send a XDR message.'
              }
              links={null}
              cardInput={null}
              helperText="Port"
              directFromInput={null}
              endpointInput={null}
              timeoutInput={null}
              outgoingInput={null}
              helperOutgoingText={null}
              helperTimeoutText="IP Address (eg: 202.255.24.62)"
              helperEndpointText={null}
              portInput="Port Number"
              ipInput="IP Address"
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 30'}
              cardContent={
                'Verify the ability of the receiving system to appropriately handle a VALID delivery notifications request, including X-DIRECT-FINAL-DESTINATION-DELIVERY data. ETT will create the Direct address block Header following section 4.1 of the XDR and XDM for Direct Messaging v1.0 and include the X-DIRECT-FINAL-DESTINATION-DELIVERY data following section 1.3 of Implementation Guide for Delivery Notification in Direct v1.0 and send it to the SUT.  Provide your Endpoint, a Direct To Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message.'
              }
              links={null}
              cardInput={null}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperTimeoutText={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 31'}
              cardContent={
                'Verify the ability of the receiving system to appropriately handle an INVALID delivery notifications request, including X-DIRECT-FINAL-DESTINATION-DELIVERY data. ETT will create the Direct address block Header following section 4.1 of the XDR and XDM for Direct Messaging v1.0 and include INVALID X-DIRECT-FINAL-DESTINATION-DELIVERY data following section 1.3 of Implementation Guide for Delivery Notification in Direct v1.0 and send it to the SUT. Provide your Endpoint, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message.'
              }
              links={null}
              cardInput={null}
              helperText={null}
              directFromInput={null}
              portInput={null}
              ipInput={null}
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperTimeoutText={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 32'}
              cardContent={
                'Verify the ability of the SUT to appropriately respond to a delivery to a non-existent address.  ETT will send a message via XDR to the SUT.  If the SUTs final response is delivered synchronously, that message will be saved in the logs (click Logs).  If the SUTs final response is delivered asynchronously: 1) wait until the SUTs message has been sent and the ETTs response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available.  The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message. '
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__32mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__32mu2/rep/xdrpr',
                },
              ]}
              cardInput={null}
              portInput={null}
              ipInput={null}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              timeoutInput={null}
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperTimeoutText={null}
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 33'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond to a delivery to an untrusted HISP. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message."
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__33mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__33mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              cardInput={null}
              timeoutInput={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 34'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond to a delivery to a HISP which does not have a published certificate. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message. "
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__34mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__34mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              timeoutInput={null}
              cardInput={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 35'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond in the event of a lack of a Processed MDN. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message. "
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__35mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__35mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              cardInput={null}
              timeoutInput={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 36'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond in the event of a lack of a Dispatched MDN. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message."
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__36mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__36mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              cardInput={null}
              timeoutInput={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 37'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond in the event of a message timeout failure. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite.  Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message."
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__37mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__37mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              cardInput={null}
              timeoutInput={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 38'}
              cardContent={
                "Verify the ability of the SUT to appropriately respond in the event of positive delivery notification. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message"
              }
              links={[
                { label: 'Endpoint', href: 'http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__38mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__38mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              cardInput={null}
              timeoutInput={null}
              helperTimeoutText={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 43'}
              cardContent={
                'Verify the ability of the SUT to appropriately respond to a delivery to an untrusted HISP. ETT will send a message via XDR to the SUT. If the SUTs final response is delivered synchronously, that message will be saved in the logs (click Logs). If the SUTs final response is delivered asynchronously: 1) wait until the SUTs message has been sent and the ETTs response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite. Provide your Endpoint, a Direct From Address, and Outgoing (ETT --> SUT) Direct From Address. Hit Run to send a XDR message.'
              }
              links={[
                { label: 'Endpoint', href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__43mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__43mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              timeoutInput={null}
              helperTimeoutText={null}
              cardInput={null}
              portInput={null}
              ipInput={null}
            />
          )}
          {option === 'Receiver' && (
            <XDRTestCard
              cardHeader={'XDR MT Test 44'}
              cardContent={
                "Verify the ability of the SUT to appropriately provide a delivery failure message if it is unable to deliver the message to the destination. ETT will send a message via XDR to the SUT. If the SUT's final response is delivered synchronously, that message will be saved in the logs (click 'Logs'). If the SUT's final response is delivered asynchronously: 1) wait until the SUT's message has been sent and the ETT's response has been received, 2) click the Pending Refresh button to continue, 3) the logs for the asynchronous communication will then be available. The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response."
              }
              links={[
                { label: 'Endpoint', href: ' http://ett.healthit.gov:11080/xdstools/sim/edge-ttp__44mu2/rep/xdrpr' },
                {
                  label: 'Endpoint TLS',
                  href: 'https://ett.healthit.gov:11084/xdstools/sim/edge-ttp__44mu2/rep/xdrpr',
                },
              ]}
              helperText="SUT (HISP) outgoing SMTP address."
              directFromInput="Direct To Address"
              endpointInput="Endpoint"
              timeoutInput="Timeout"
              outgoingInput="Outgoing (ETT --> SUT) Direct From Address"
              helperOutgoingText="Outgoing (ETT --> SUT) Direct From Address"
              helperTimeoutText="Timeout"
              helperEndpointText="Receiving endpoint of the SUT for XDR SOAP messages."
              cardInput={null}
              portInput={null}
              ipInput={null}
            />
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default XDR
