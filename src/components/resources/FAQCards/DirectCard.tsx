import * as React from 'react'
import { Box, Card, CardContent, Typography, Divider, ListItemText, ListItem, List, CardHeader } from '@mui/material'
interface QAItem {
  question: string
  answer: string
}

interface FAQDirectProps {
  header: string
  items: QAItem[]
}

const Direct: React.FC<FAQDirectProps> = ({ header, items }) => {
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

const FAQDirect: React.FC = () => {
  const direct: QAItem[] = [
    {
      question:
        'We are trying to use the "Send a Direct Message" from the Edge Testing Tool to our implementation and are showing a "time-out" status in the Message Status portal.',
      answer: 'Please ensure that you have installed the Trust Anchor for the ETT into your system.',
    },
    {
      question:
        'We are testing the "Send a Direct Message" functionality as part of our <a href=https://ttpedge.sitenv.org/ttp/#/direct/send/>H1 Testing</a>. But having an issue with the SHA-256 option. Can you confirm the SHA-256 option is sending the correct hash? It appears to be sending the SHA-1 hash in the message.',
      answer:
        'The first is the hash used to sign the Direct message. The second is the hash that is used in the XD* metadata and refers only to the hash of the attachment itself. These are two separate hashes, calculated independently. The first hash is defined in the Direct Applicability Statement. Version 1.0 mentions both SHA-1 and SHA-256 which is why the Direct portion of the ETT tooling allows both to be used for testing. The second hash (which is the one from the SOAP body below) is part of the XD* metadata. The definition of the hash slot is in IHE ITI TF Vol 3 Table 4.2.3.2-1 (page 64) <a href="http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf">IHE ITI TF Vol3</a>. The data type for this hash is "SHA1" only. The document metadata is separate from the signing of the Direct message.',
    },
    {
      question: 'Why am I not receiving a validation report?',
      answer:
        "Please verify that you have registered your direct address with a corresponding contact address which is where the validation report will be delivered, see <a href= https://ttpedge.sitenv.org/ttp/#/direct/register>register</a>. If you have registered, please check the spam folder to see if the validation report has been held there. Also, the local mailbox (the part before the '@' symbol) portion is case-sensitive;verify that the case in what was registered matches what is being sent.",
    },
    {
      question: "Why can't the ETT find my certificate via LDAP?",
      answer:
        'Please make sure that the LDAP server and port are accessible and not blocked by a firewall. We have been told of issues with older library packages (such as ApacheDS) that were resolved when the library packages were upgraded.',
    },
    {
      question:
        'The proctor sheet states: “using the health module functionality, the user sends an encrypted and signed direct “wrapped” message payload to the ETT Direct to email address.” Where is the ETT Direct to email address?',
      answer:
        '<a href=https://ttpedge.sitenv.org/ttp/#/direct>Access Here</a> If you are using CCDA R1.1, the scope and direct addresses are in the lower section of the page. Clicking the widget on the right side, for the corresponding address, will copy it to your clipboard.If you are using CCDA R2.1, the direct address will be generated when you select the document you are conforming to. Use the button to select the document and the direct to address will appear underneath it',
    },
    {
      question:
        "In the Direct section of the ETT, sending a direct message to the system under test results in a validation result for the MDNs the SUT produces. I don't believe this case should be sending validation results at all since the testing is around the certificates rather than the MDNs. It looks like the MDNs are being validated as direct messages whether or not the MDN is wrapped. The ETT also seems to be fine with the MDNs in test cases 39, 40 and 41. Should we be receiving validation results for our MDNs in this case?",
      answer:
        "The Direct section of the tool always returns validation reports because it has no programmatic way of knowing what the endpoint is being used for. If the test you are running doesn't need a validation report, the validation report can be ignored. The tool accepts wrapped or unwrapped because of backward compatibility with the previous round of certification where wrapped was optional. Information on whether the message was wrapped or unwrapped is contained in the validation report. Edge test cases won't produce separate validation reports.",
    },
    {
      question: "I'm not getting validation emails from the Direct Testing part of the ETT?",
      answer: 'The address registered, needs to have a contact email address associated with it.',
    },
    {
      question:
        'SMTP MT Test 39, 40 and 41 are not working. All have been working for us previously. After clicking "Run", I see no attempt at an inbound SMTP connection to my server. I have tried using both a hostname and an IP address?',
      answer:
        'Please upload your trust anchor/public cert using the "Upload Certificate" on the left bottom corner of the "More Info" section for the these tests.',
    },
    {
      question:
        "I have imported the invalid trust anchor in DIRECT Server & removed the valid Trust anchor of the ETT. I'm sending an email from the ETT, selecting 'GOOD_CERT' what is the expected functionality. My DIRECT Server is not rejecting this message, though I have an invalid trust anchor in my DIRECT Server.",
      answer:
        'The certificate that you are selecting is the “Signing Certificate”. So a GOOD CERT will send a message with a signing certificate that is valid. The trust anchor, that you have, should dictate whether messages from a particular address is accepted or rejected. If you don’t have the right trust anchor, then the message should be rejected. That is the expected behavior.',
    },
    {
      question: 'Q: What are the SMTP MT addresses?',
      answer: `The addresses are listed below.
      Also consult with your ALT for any changes or updates.
      SMTP MT Test 21: processeddispatched6@ttpedge.sitenv.org
      SMTP MT Test 23: badaddresst@ttpds2.siten.org
      SMTP MT Test 24: provider1@direct2.sitenv.org
      SMTP MT Test 25: failure15@ttpds.sitenv.org
      SMTP MT Test 26: nomdn8@ttpedge.sitenv.org
      SMTP MT Test 27: processedonly5@ttpedge.sitenv.org
      SMTP MT Test 29: processeddispatched6@ttpedge.sitenv.org`,
    },
  ]

  return <Direct header="Direct Project Tooling FAQs" items={direct} />
}

export default FAQDirect
