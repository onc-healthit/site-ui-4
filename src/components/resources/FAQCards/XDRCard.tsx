import * as React from 'react'
import { Box, Card, CardContent, Typography, Divider, ListItemText, ListItem, List, CardHeader } from '@mui/material'
interface QAItem {
  question: string
  answer: string
}

interface FAQXDRProps {
  header: string
  items: QAItem[]
}

const XDR: React.FC<FAQXDRProps> = ({ header, items }) => {
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

const FAQXDR: React.FC = () => {
  const xdr: QAItem[] = [
    {
      question: `XDR Test 16 says "Verify that Mutual TLS session is established between the Sender and the Receiver before transmitting data". I don't fully understand what has to be in place for this test. Do we need to submit a public certificate somewhere in our account that maps to a private key to tell the ETT to trust our system?`,
      answer: `You have downloaded the direct certificates. These are NOT the certs for mutual TLS. You need to download the certs from the embedded URL above the XDR Test 13 test.`,
    },
    {
      question: `The end point I've been testing with is the following: https://vs-... I also just tried running the XDR Validator, and seem to be running into errors there as well?`,
      answer: `Please ensure you have installed the certificates needed for testing. The Direct certificates can be found on the <a href="/direct">Direct Home page</a> and the XDR certificates can be found on the <a href="/xdr">Edge XDR Page</a>, just above the 'Your system as "Sender"' button.</a>.`,
    },
    {
      question: `I ran XDR 5 with his endpoint and I see this error in the logs. Caused by: { code:"500" extendedCode:"0" reason:"XdsInternal error SOAP Fault: com.ctc.wstx.exc.WstxParsingException: Undeclared namespace prefix "soapenv" at [row,col {unknown-source}]: [1,158]" reasonPhrase:"Internal Server Error"}?`,
      answer: `Expand on the error message, the requirement that the format Simple SOAP vs MTOM be the same is specified in IHE ITI Technical Framework, Volume 2, Appendix V: V.8.1 Simple SOAP vs MTOM, "Both the request and the response messages shall use the same encoding.</a>.
        More readable descriptions and the background behind this requirement can be found:
      
      <a href="https://wiki.ihe.net/index.php/XDS.bImplementation#MoreonMTOMvsMTOM.2FXOP">More on MTOM vs MTOM.2FXOP</a> 
  <a href="https://wiki.ihe.net/index.php/XDS.bImplementation#InterpretingWebServicesSpecificationsforXDS.band_XCA">Web Services Specifications for XDS.band_XCA</a>
        `,
    },
  ]

  return <XDR header="XDR FAQs" items={xdr} />
}

export default FAQXDR
