import * as React from 'react'
import { Box, Card, CardContent, Typography, Divider, ListItemText, ListItem, List, CardHeader } from '@mui/material'
interface QAItem {
  question: string
  answer: string
}

interface FAQSMTPProps {
  header: string
  items: QAItem[]
}

const SMTP: React.FC<FAQSMTPProps> = ({ header, items }) => {
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

const FAQSMTP: React.FC = () => {
  const smtp: QAItem[] = [
    {
      question: `XDR Test 16 says "Verify that Mutual TLS session is established between the Sender and the Receiver before transmitting data". I don't fully understand what has to be in place for this test. Do we need to submit a public certificate somewhere in our account that maps to a private key to tell the ETT to trust our system?`,
      answer: `You have downloaded the direct certificates. These are NOT the certs for mutual TLS. You need to download the certs from the embedded URL above the XDR Test 13 test.`,
    },
    {
      question: `We are having issues running SMTP Test 8, 14, 18 (Send) and SMTP MT Test 46, the credentials don't work.`,
      answer: `Please look at the information in the 'More Info' pages for the credentials required to run these tests.\n\nSMTP Test 8, 14, 18 (Send): wellformed1@ttpedge.sitenv.org, vendoraccount@ttpds.sitenv.org / vendortesting123\nSMTP MT Test 46: wellformed14@ttpds.sitenv.org, vendoraccount@ttpds.sitenv.org / vendortesting123`,
    },
    {
      question: `We are testing SMTP Test 8, 14 (Send), per the test in the ETT and following the user guide and it keeps failing. Do we need to install a certificate for this test? We also checked our Direct server and it works with the other Direct protocol tests.`,
      answer: `This is a SMTP protocol test, not a DIRECT test. If you send using Direct to an SMTP endpoint, it will always fail. A Direct message employs an encryption standard using the certificates published in DNS/LDAP built on the top of SMTP to allow the secure exchange of messages; whereas, plain SMTP does not.`,
    },
    {
      question: `The Edge test case SMTP 18 states, the SUT needs to connect to the ETT SMTP server using the credentials vendor...@ttpds.sitenv.org / vendortesting123 and send an email to wellf...@ttpedge.sitenv.org". Is the ETT SMTP server ttpds.siteenv.org?`,
      answer: `Yes, ttpds.sitenv.org is the SMTP ETT server.`,
    },
    {
      question: `SMTP MT Test 1 (Message to Bad Address); I am responding with a DSN rather than an MDN. I am using SMTP for both sending and receiving. I am not using IMAP or POP at this time. Is that acceptable? If not, why not?`,
      answer: `For these cases, ETT acts as the EDGE SMTP sender (and also the notification SMTP receiver) - and so, the ETT is set up to check for the MDNs in the failure15@ttpds.sitenv.org inbox. The SMTP/SMTP cases are designed such that ETT as an Edge SMTP server sends through the HISP, and expects the HISP to deliver the mail to its inbox failure15@hisp-testing2.nist.gov.`,
    },
    {
      question: `I entered my profile information, went to message tracking and followed the instructions for each of the testcases. These test cases are failing: EDGE SMTP MT Test 18(a), EDGE SMTP MT Test 47(a), EDGE SMTP MT Test 45 and EDGE SMTP MT Test 46. Can anyone outline the procedure of testing these?`,
      answer: `For EDGE SMTP MT Test 45 and EDGE SMTP MT Test 46 you need to have Disposition-Notification-Options header for the test case to pass. Try the test cases again with the required header.\nEDGE SMTP MT Test 18(a) and EDGE SMTP MT Test 47(a) is a SMTP-SMTP scenario. The system under test (SUT) needs to authenticate with ETT using the credentials vendor1smtpsmtp@ttpds.sitenv.org / vendortesting123. After authentication, a mail needs to be sent to the specified addresses(goodaddress-plain@ttpedge.sitenv.org and noaddressfailure9-plain@dnsops.ttpedge.sitenv.org) to generate the MDN. The MAIL FROM should be vendor1smtpsmtp@ttpds.sitenv.org. After the above step enter the SUT information (hostname, vendor email address, username, and address) in the profile window.\n\nExecuting the testcase will fetch the MDNs from vendor1smtpsmtp@ttpds.sitenv.org inbox and deliver to the SUT using the information provided in the profile window.\n\nFor EDGE SMTP MT Test 18(a) and EDGE SMTP MT Test 47(a), you need to:\n\nEnter your account information in the 'Profile Panel' on the test page.\nReview the account in the 'More Info' page.\nConnect to the vendor1smtpsmtp@ttpds.sitenv.org account, authenticating with using the credentials shown in more info.\nSend an email to dispatchedonly-plain@ttpedge.sitenv.org and noaddressfailure9-plain@dnsops.ttpedge.sitenv.org from the vendor1smtpsmtp@ttpds.sitenv.org account.\nWait for a few minutes to allow the MDNs to return.\nExecute the test (RUN), then 'Awaiting Validation', there should be a success notification and the forwarding message.\nLook for negative MDNs in your inbox.`,
    },
    {
      question: `We have not been able to successfully send SMTP Messages to wellformed14@ttpds.sitenv.org because we do not have a Trust Anchor and Public Certificate for this domain.\n\nWe are having the same issue with noaddressfailure9-plain@dnsops.ttpedge.sitenv.org from Test 18. We have already loaded the certificates/trust anchor available here: https://ttpedge.sitenv.org/ttp/#/direct`,
      answer: `This is the self-signed server certificate that is used by the James server\nat ttpds.sitenv.org:25. Please add it to your trust store and let us know if this helps. Please note these test cases are Edge protocol plain SMTP-STARTTLS (not Direct)`,
    },
    {
      question: `Where is the certificate for the Apache James server?`,
      answer: `The certificate for Apache James can be found here: https://github.com/siteadmin/ett/blob/resources/certificates/common/james/ttpds.sitenv.org.james-tls.cert`,
    },
    {
      question: `SMTP MT Test 46 Certificate Issue: We have installed the Trust Anchor from the TTP site. However, when I attempt to send I got an error as unable to find domain bound certificate for this (wellformed14@ttpds.siten.org) address. Is another way to discover their certificate?`,
      answer: `This is NOT a direct endpoint. You need to send an SMTP message. If you have you passed SMTP MT 17 and 45, this test should be similar.`,
    },
  ]

  return <SMTP header="SMTP FAQs" items={smtp} />
}

export default FAQSMTP
