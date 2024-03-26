import * as React from 'react'
import { Box, Card, CardContent, Typography, Divider, ListItemText, ListItem, List, CardHeader } from '@mui/material'
interface QAItem {
  question: string
  answer: string
}

interface FAQXDMProps {
  header: string
  items: QAItem[]
}

const XDM: React.FC<FAQXDMProps> = ({ header, items }) => {
  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <CardHeader titleTypographyProps={{ fontWeight: 700 }} title={header} />
      <Divider />
      <CardContent>
        <List disablePadding>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ pb: 1, px: 0 }}>
                <ListItemText>
                  <Box display={'flex'} gap={1} flexDirection={'row'}>
                    <Typography fontWeight={'600'} variant="h6" gutterBottom>
                      Q:
                    </Typography>
                    <Typography fontWeight={'600'} variant="h6" gutterBottom>
                      <span dangerouslySetInnerHTML={{ __html: item.question }} />
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={1} flexDirection={'row'}>
                    <Typography variant="body2" gutterBottom>
                      A:
                    </Typography>
                    <Typography variant="body2">
                      <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

const FAQXDM: React.FC = () => {
  const xdm: QAItem[] = [
    {
      question:
        'My XDM is not being validated because the tooling says it cannot find the metadata, or cannot open the zip, or is not moving forward in the validation steps.?',
      answer: `A: Check that the IHE_XDM and SUBSET01 directories have been explicitly created. When the ZIP file is viewed, there should be a specific entry for each directory listing.
      <a href="ftp://ftp.ihe.net/Connectathon/samples/XDM_samples/">Some examples for XDM.</a> `,
    },
    {
      question: `I have tried to validate some XDM zip's, but it seems that the validator stops at point 'Decoding ZIP'. It works with the sample found on <a href="ftp://ftp.ihe.net/Connectathon/samples/ITI-profiles/XDM_samples/">ftp://ftp.ihe.net/Connectathon/samples/ITI-profiles/XDM_samples/</a> but if you try to decompress and compress it again, it does not work anymore.?`,
      answer: `I've experimented with various compression algorithms like 'Deflate', 'Deflate64', 'LZMA', 'PPMd', 'BZIP2', but none of them have proven effective. When attempting to use these algorithms, the validator throws Java exceptions stating 'not supported algorithm...'. Consequently, my current inquiry revolves around determining the correct method for compressing files to generate a valid XDM-Zip.
        Tested and verified solutions include: Utilizing 7-Zip (17.00 beta): However, it necessitates resetting the 'relative path' within the graphical user interface (GUI).
        Leveraging MacOS X command line: Navigate to the directory containing all XDM-files and execute 'zip -r <archiveName> *'.
        Employing WinRAR 5.40 (64bit): Ensure that the value 'Store relative path' is selected under the 'Files' tab. It's important to note that the IHE specification specifies the use of the ZIP format, not the RAR format, for compression purposes.
        Most web service packages/libraries (such as Apache Axis2, etc) will make this switch automatically.
        The timeout for the registry / XDS Toolkit is 60 seconds.`,
    },
    {
      question: `What are the XDR, Direct From Address, email endpoints?`,
      answer: 'The endpoints can be found at: https://github.com/siteadmin/ett/wiki/XDR-Endpoints',
    },
    {
      question: `Edge XDR Test 6 (Send): I need to check the integrity, but can't because ETT tool generated HASH is in SHA-1 and is giving a mismatch error. How do I check D* integrity test case along with b1? Is there any link to check this?`,
      answer:
        'For this test, all the SUT needs to do is establish an HTTPS connection using the provided certificates. Please download the certificates found at the top of the page.',
    },
    {
      question: `Edge XDR Test 5 (Receive): I am getting Request from ETT tool I validate it and genererate the below response with return type 'String'. Want to know how to validate XDR soap header & body ? And also what should be response format ?`,
      answer:
        'Please refer to the IHE specifications and wiki for how to create/validate the XDR messages. There are a few threads in the google group that you can use for reference.',
    },
    {
      question: `Can you confirm that XDR MT Test 50a and XDR MT Test 50b require us to send 1 message with multiple intended recipients? We assume this is the approach vs. 1 message with 1 intended recipient to differentiate it from test XDR MT Test 20a and XDR MT Test 20b (positive and negative MDNs). These tests, XDR MT Test 20a and XDR MT Test 20b, appear to be redundant with regard to tests XDR MT Test 50a and XDR MT Test 50b.`,
      answer:
        'The tests, XDR MT 50a and XDR MT Test 50b weren’t designed for multiple recipients, each test requires an individual endpoint for testing. The intention of the XDR MT Test 50 a and XDR MT Test 50 b are to demonstrate the rigor of the SUT by sending to several recipients. The Test Procedure directs the SUT to send to one recipient using tests XDR MT Test 20 a and XDR MT Test 20 b, then to multiple recipients using XDR MT Test 50 a and XDR MT Test 50b. Note: The test script does not direct the SUT to test sending to several recipients at the same time; understanding the confusion, it is asking the SUT to send to multiple valid recipients.',
    },
    {
      question: `To deliver disposition statuses asynchronously for XDR transmissions, is it expected that first a ResponseStatusType:Success is included by default in the synchronous reply or should it be omitted entirely?`,
      answer: 'Based on the underlying XDR work-flow, ResponseStatusType of Success would be expected to be sent back.',
    },
    {
      question: `To which endpoint should XDR MDN’s be sent?`,
      answer: 'The endpoint for each test case should be listed in the UI for each individual test case.',
    },
    {
      question: `What is a sample xml for an XDR MDN that includes both envelope and body?`,
      answer:
        'An example of the overall XDR package is available here: http://wiki.ihe.net/index.php/XDS.bImplementation#ExampleProvideandRegisterDocumentSet-btransaction Instead of sending a document as they have in the example, the message disposition would be sent as defined in section 1.5.2.1.1 of this document (which includes an example): https://www.healthit.gov/sites/default/files/implementationguidefordirectedgeprotocolsv11.pdf',
    },
    {
      question: `When testing XDR sending, the user must click “RUN” on the tool (to generate the endpoint) and then send a message. When testing SMTP sending, it’s the opposite. The user must send the message and then click “RUN.” This inconsistency makes use of the tool more challenging.`,
      answer: `This difference in the workflows is an artifact of the underlying technologies and unfortunately not something that would be easy to change on our UI. For XDR, the endpoints must be established ahead of time or else the systems wouldn't know where to send messages. The Direct From address must be known so that the message can be properly routed within the ETT to the correct test instance while the test case is running. The ETT and Toolkit are an active part of this communication. The ETT must be primed BEFORE the communication takes place. For SMTP, the ETT only becomes involved after the mail has been sent and is sitting in a mailbox. The SMTP communication/commands must be completed before ETT can check, or else there is nothing for ETT to find. The underlying protocols themselves have different workflows.`,
    },
    {
      question: `I have sent my XDR message to the endpoint and receive a Registry Response. However, the ETT never moves past the Pending Refresh button no matter how many times I press it. How do I move forward?`,
      answer:
        'Verify that your XDR message contains the Direct Address Block and that Block is completely filled out and matches what was entered into the Test Case UI. The ETT uses the Direct Address block to route the messages; so if the values do not match, they will not be forwarded to the correct module within ETT.',
    },
    {
      question: `I used WCF to implement the XDR recipient web service. When testing XDR Test Case 4a and 4b, the process pipeline created CommunicationException and returned 400 server error to ETT before my codes get control. Here is the message from the ETT log: HTTP/1.1 400 Bad Request Cache-Control: private Server: Microsoft-IIS/7.5 MIME-Version: 1.0 X-AspNet-Version: 4.0.30319 X-Powered-By: ASP.NET Date: Tue, 11 Oct 2016 16:01:14 GMT Content-Length: 0 My question is, do we need to return a RegistryResponse with status urn:oasis:names:tc:ebxml-regrep:ResponseStatusType:Failure, or the 400 server error should be enough for this situation?`,
      answer:
        'Test case 4a and 4b are negative test cases in the sense that the incoming messages are malformed and must be treated appropriately. The SUT needs to demonstrate that it has detected the abnormality and reacted appropriately (i.e. not accepting the message).',
    },
    {
      question: `I haven't figured out how to get ETT to show logs from asynchronous replies for the HISP XDR message tracking tests? The fields are: Endpoint, Direct From Address, and * Outgoing (ETT --> SUT) Direct From Address.`,
      answer:
        'Test Case: XDR MT Test 13 Notes: The specifications detail how an error should be reported back asynchronously, but do not specify when this method should be used; therefore, it is acceptable for a system to send back a registry response failure synchronously or a message delivery failure asynchronously.',
    },
    {
      question: `For XDR Test Case 7 why do we not enter a full endpoint?`,
      answer:
        'The ETT tracks the incoming messages via the Direct Address block; however, in this case, the SUT is supposed to stop the communication before a message is sent because the certificate is bad. Since, the message should not come through, we will not have access to the Direct Address; therefore, the ETT asks for the IP address and tracks the request through that. Since, this is happening at the socket level, the full path for an endpoint is not applicable.',
    },
    {
      question: `Does anyone know whether it's required to use HTTPS for the sending tests other than 6 &7?`,
      answer: 'HTTPS is required for XDR 6 and 7; however, other XDR tests can be demonstrated using HTTP or HTTPS.',
    },
    {
      question: `Where is the functionality in the ETT for testing the two requirements listed below referenced in the test procedure (https://www.healthit.gov/sites/default/files/170315h2DirectProjectEdgeProtocolandXDRXDMv1_2.pdf)?`,
      answer: `That functionality is under 'Edge Testing' from the ETT main menu, then the 'XDR Test Cases' navbar link at the top of the page.`,
    },
    {
      question: `In order to pass XDR Test Case 1, is it necessary to create XDR requests which include the selected document? Where can these samples be found?`,
      answer:
        "If you navigate to: <a href='https://ttpedge.sitenv.org/ttp/#/validators'>https://ttpedge.sitenv.org/ttp/#/validators</a>, select CCDA R2.1 Validator, then download all files. " +
        "The samples can be found in the download under: <a href='file:///CDAs/2015-Certification-C-CDA-Test-Data-master/Receiver%20SUT%20Test%20Data'>Receiver SUT Test Data</a>. " +
        "Alternatively, the file is also at: <a href='https://github.com/siteadmin/2015-Certification-C-CDA-Test-Data/tree/master'>https://github.com/siteadmin/2015-Certification-C-CDA-Test-Data/tree/master</a>",
    },
    {
      question:
        'Unlike the other edge reliable messaging tests there is no place to configure the callback URL for the message dispositions. Is the test expecting to find a HISP with the associated endpoint or is the intent to verify that the direct:addressBlock contains the X-DIRECT-FINAL-DESTINATION-DELIVERY element?',
      answer:
        "XDR MT test 48 is testing only the SUT's ability to generate three messages with unique IDs. The message dispositions are out-of-scope for this test. Once the three unique message IDs are found (or found not to be unique) the test is complete.",
    },
    {
      question: 'What are the differences between tests XDR MT Test 19 and XDR MT Test 48?',
      answer:
        'We have downloaded the keystore from the above site and configured our tomcat server to use it for secure connection; however, no secure connection can be established. ' +
        "We performed the tests this afternoon, around '1:30pm' Central. " +
        'Our endpoints are as follows Non-secure http://ych-qa-mu3.test.yourcareuniverse.net:9280/connex-ett/xdsb/pushDocumentSet ' +
        'Secure: https://ych-qa-mu3.test.yourcareuniverse.net:9283/connex-ett/xdsb/pushDocumentSet. ' +
        'Please advise us of how to resolve this issue.',
    },
    {
      question: `XDR Test 3 (Revieve): We believe we having an issue Receiving the Documents and saving to the EHR. We have code to check for a document ID which has been sent in the past. Is there a way we could set the unique document ID in the test so that we can import the files more easily?`,
      answer:
        'The ETT uses a symbolic ID ("Document01") in the metadata to identify the attached document:\n<rim:ExtrinsicObject id="Document01" mimeType="text/xml" objectType="urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1">\n\nIt is incumbent upon the receiving registry in a provide and register transaction to turn the symbolic ID into a UUID of their choosing. In IHE ITI, Volume 2b, see Section 3.42.4.1.3.7 UUIDs and Symbolic Ids:\n\n"If a field is formatted as a symbolic Id in the Submission Request, the Document Registry shall replace it with newly generated, properly formatted UUIDs upon acceptance of the submission. If the same symbolic Id appears more than once in the Submission Request, it shall be replaced with the same generated UUID."\n\nThe receiving system must be able to handle symbolic IDs in accordance with the base IHE specifications.',
    },
    {
      question: `What are the differences between tests XDR MT Test 19 and XDR MT Test 48?`,
      answer: `XDR MT Test 19 is for Message Tracking Using Processed MDN. XDR MT Test 48 is for Message Tracking Using "Implementation Guide for Delivery Notification".`,
    },
    {
      question: `ETT is not succeeding for us on XDR Test 8, though we seem to be able to perform mutual SSL with the provided client certificate using OpenSSL. XDR Test 8 is not giving us much information about why it is failing. I suspect ETT is not trusting our server certificate. We have had issues before with certain systems not including GoDaddy's intermediate certificate authority, resulting in an incomplete certificate chain.`,
      answer: `The certificate provided for the XDR transactions needs to be used in both sides of the mutual TLS connection (it's loaded into our keystore and your keystore or equivalent). We don't look for your server certificate, the toolkit is already loaded with the provided, self-signed cert.`,
    },
    {
      question: `In the XDR test 8 for mutual TLS, the following test step is used: “Verifies the ability of the receiving system to complete a mutual TLS handshake before data is sent across. Certificates for this test can be downloaded from the link at the top of this page. As this is a socket-level test, the full endpoint is not necessary and only hostname and port are to be entered below”. Where can the referenced certs be downloaded from?`,
      answer: `There is a download link above the “Your System as: Sender” with light blue text, “Click to download TLS Certificates”.`,
    },
    {
      question: `XDR MT Test 30 includes a Direct To Address field, which is only used for async responses in other tests. However, my understanding is that this test is only checking that the SUT can handle the X-DIRECT-FINAL-DESTINATION-DELIVERY header, not that the resulting delivery notification is valid. Am I correct? If so, what is the purpose of the Direct To Address field?`,
      answer: `The X-DIRECT-FINAL-DESTINATION-DELIVERY header is what is checked for this test case. The “DIRECT To:” is the direct address that is responded to and is registered/mapped in the Direct portion of the ETT. The "Outgoing (ETT --> SUT) Direct From Address" refers to the value that we place in the <direct:from> element in all outgoing messages from ETT to the SUT. This may be optional for your system.`,
    },
    {
      question: `Is there a sample you can provided for XDR MT TEST 30 so show what the header should look like?`,
      answer: `The soap body could itself be inspected from the "Log" section of the test by clicking the "Waiting for Validation" or "Logs" button after running the test.. Please let us know if this is not what you are looking for.
        Of particular interest is this part <direct:X-DIRECT-FINAL-DESTINATION-DELIVERY>true</direct:X-DIRECT-FINAL-DESTINATION-DELIVERY> Follow-up: In the 30 and 31, the proctor needs to verify that the headers are being processed and "accept" / "reject" based on the demonstration. For 32 and above, the "Logs" button can be used to see the synchronous/asynchronous delivery notification produced by the System Under Test (SUT), however, the process of accept/reject still remains the same - a verification by the proctor as per IG for Delivery Notification 1.5.2.1.1.
        "The proctor will read the logs for the synchronous communication or the asynchronous communication for an appropriate response. This test is part of the Implementation Guide for Delivery Notification test suite"`,
    },
    {
      question: `Please confirm my understanding. The ETT for XDR MT TEST 30 sends a a VALID delivery notifications request to the system under test in the following format. The system under test then sends a Direct message based on the VALID delivery notifications request. If I am correct then is the format above that you sent me the complete VALID delivery notifications request? We are trying to give vendors a sample of what the VALID delivery notifications request looks like.`,
      answer: `Yes, that is correct; the format is same - however the multi-part identifier and other ids and direct:from/to elements will differ based on the session.`,
    },
    {
      question: `Please confirm my understanding. The ETT for XDR MT TEST 30 sends a a VALID delivery notifications request to the system under test in the following format. The system under test then sends a Direct message based on the VALID delivery notifications request. If I am correct then is the format above that you sent me the complete VALID delivery notifications request? We are trying to give vendors a sample of what the VALID delivery notifications request looks like`,
      answer: `Yes, that is correct; the format is same - however the multi-part identifier and other ids and direct:from/to elements will differ based on the session.`,
    },
    {
      question: `Where is the XDR SAML validation in the ETT?`,
      answer: `It is available in the XDR Validator in the Message Validators section: https://ttpedge.sitenv.org/ttp/#/validators/xdr. The receive part validates the incoming SAML and the send part has the ability to include the headers in the outgoing message.`,
    },
    {
      question: `The HTTPS XDR test endpoints aren't working properly, specifically XDR Tests 3 & 5.`,
      answer: `Please ensure you have downloaded the certificates and installed them. The certificates can be found at the top of each test section, beneath the ribbon bar and above the button "Your System as: Sender". Look for, "Click to download XDR TLS certificates". Here are some examples for XDR: http://wiki.ihe.net/index.php/XDS.bImplementation#ExampleProvideandRegisterDocumentSet-btransaction.28withfullmetadata.29 ftp://ftp.ihe.net/TFImplementationMaterial/ITI/examples/XDS.b/ (Provide and register examples)`,
    },
  ]

  return <XDM header="XDM FAQs" items={xdm} />
}

export default FAQXDM
