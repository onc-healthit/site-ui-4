import * as React from 'react'
import { Box, Card, CardContent, Typography, Divider, ListItemText, ListItem, List, CardHeader } from '@mui/material'
interface QAItem {
  question: string
  answer: string
}

interface FAQOTHERProps {
  header: string
  items: QAItem[]
}

const OTHER: React.FC<FAQOTHERProps> = ({ header, items }) => {
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
        <Divider sx={{ marginY: 2 }} />
        <Typography gutterBottom>
          <strong>Helpful Links</strong>
        </Typography>
        <Typography gutterBottom variant="body2">
          A good cheat-sheet resource for XD* metadata is available at:
          <a href="http://ihewiki.wustl.edu/wiki/index.php/Notes_on_XDS_Profile.">
            http://ihewiki.wustl.edu/wiki/index.php/Notes_on_XDS_Profile.
          </a>
        </Typography>
        <Typography gutterBottom variant="body2">
          A helpful guide for navigating the XDR metadata. There are also example files in this directory:
          <a href="ftp://ftp.ihe.net/%20TFImplementationMaterial/ITI/examples/XDS.b/">
            ftp://ftp.ihe.net/%20TFImplementationMaterial/ITI/examples/XDS.b/ (see ProvideAndRegisterDocument*)
          </a>
        </Typography>
        <Typography gutterBottom variant="body2">
          Here are some examples for XDR:
          <a href="http://wiki.ihe.net/index.php/XDS.bImplementation#ExampleProvideandRegisterDocumentSet-btransaction.28withfullmetadata.29">
            http://wiki.ihe.net/index.php/XDS.bImplementation#ExampleProvideandRegisterDocumentSet-btransaction.28withfullmetadata.29
          </a>
        </Typography>
        <Typography gutterBottom variant="body2">
          Provide and register examples. Some examples for XDM:
          <a href="ftp://ftp.ihe.net/TFImplementationMaterial/ITI/examples/XDS.b/">
            {' '}
            ftp://ftp.ihe.net/Connectathon/samples/XDM_samples/
          </a>
        </Typography>
        <Typography gutterBottom variant="body2">
          A table showing the difference in optionality between the different XD* metadata is available in Vol 3 of IHE
          ITI:
          <a href="http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf">
            http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf
          </a>
          . See table 4.3.1-3: Sending Actor Metadata Attribute Optionality starting on page 109.
        </Typography>
      </CardContent>
    </Card>
  )
}

const FAQOTHER: React.FC = () => {
  const other: QAItem[] = [
    {
      question:
        "In our implementation and definition of our Edge system and our HISP, we are not able to use the ETT as our HISP to connect to our Edge system. (This reference from the Federal Register’s published Final Rule supports our implementation: https://www.federalregister.gov/d/2015-25597/p-1114. Relevant text in the screenshot below). For XDR Test 5, the ETT 'More Info' link says:\n\nDescription: Verify that an Edge system can receive a properly formatted XDR message. The SUT will receive the XDR message with a 'direct:from' and 'direct:to' address of testcase5@ttpedge.sitenv.org. This was designed to require the SUT's endpoint as the only input parameter.\n\nExpected Result: Edge system is capable of receiving and processing a valid message with Full Metadata, test procedure may include other details for verification. Test Tool is satisfied with a good response.\n\nBecause that is not a domain that we manage, our system is rejecting the XDR messages. To resolve this issue, we have mapped inbound XDR messages with a To address domain of @ttpedge.sitenv.org to a domain that we manage in order to successfully receive these messages. We have been able to successfully complete these tests.",
      answer:
        'The demonstration of a successful receipt of the message is the benchmark. The domain mapping approach you describe is acceptable.',
    },
    {
      question: 'Is it safe to send Protected Health Information (PHI) to NIST tooling?',
      answer:
        'No! Never send Protected Health Information (PHI) to the ETT server. If necessary, local copies of our tooling can be downloaded and installed. DO NOT send live data to the tool on our website, there is no protection for PHI/PII.',
    },
    {
      question: 'How do we differentiate between a PRN medication and a Daily once frequency medication?',
      answer:
        'Right now, the presence of a ‘precondition’ with appropriate nullFlavor is an indicator for PRN without a precondition. If you have a precondition, that that is your precondition PRN – if this is a problem in your current live implementation, please come to HL7 SDWG (Thursday 10-12 PM ET - Agenda) – happy to discuss alternative approaches. "QD = daily" & "PRN = As needed"; You can have ‘Daily with a specific precondition (e.g. Back pan) or ‘Daily as-needed’ (aka QD PRN). If you want to present an example with precondition, we are happy to have you on the HL7 examples task force.',
    },
    {
      question:
        'The previous test data (v9) had medications that seemed to fall either within the admission (6/22/15-6/24/15) or to be discharge medications (beginning 6/24/15 with various end dates). The v10 test data changed the dates. Was there a rationale for this change? Are the medications that start during the admission but continue after it (for example, 6/22/15-6/30/15) intended to be prescriptions or inpatient orders?',
      answer:
        'Systems were encountered that were treating medications that had start dates and end dates within the inpatient stay as historical medications. Because of this, they were not sending all the medications as part of the C-CDA document generated. One of the resolutions was to make sure all the medications had an end date after the inpatient stay so that the entire list can be included as part of the C-CDA document. Some of them start during the encounter and continue beyond the encounter. The list of medications can be part of the Medications section or the Discharge medications sections.',
    },
    {
      question: 'Where can ATLs download the latest release of the ETT for local installation?',
      answer: 'The current release packages are available here: https://github.com/siteadmin/ett/releases',
    },
    {
      question: 'Now that the ETT has transitioned to hosting by SITE what inbound IPs and Ports are utilized?',
      answer:
        'The port configurations remain the same, and the information regarding the URLs/certificates/endpoints are in this ONC announcement below - https://groups.google.com/d/msg/edge-test-tool/MZBY5UPsOPE/1RJkv-n8AwAJ',
    },
    {
      question: 'Are there online tutorials to use for the Edge Testing Tool?',
      answer: 'Online tutorials: https://ttpedge.sitenv.org/ttp/#/validators/documents',
    },
    {
      question: `We're having an issue Receiving the Documents and saving to the EHR. We have code to check for a document ID which has been sent in the past. Is there a way we could set the unique document ID in the test so that we can import the files more easily?`,
      answer:
        'The ETT uses a symbolic ID ("Document01") in the metadata to identify the attached document: <rim:ExtrinsicObject id="Document01" mimeType="text/xml" objectType="urn:uuid:7edca82f-054d-47f2-a032-9b2a5b5186c1"> It is incumbent upon the receiving registry in a provide and register transaction to turn the symbolic ID into a UUID of their choosing. In IHE ITI, Volume 2b, see Section 3.42.4.1.3.7 UUIDs and Symbolic Ids: "If a field is formatted as a symbolic Id in the Submission Request, the Document Registry shall replace it with newly generated, properly formatted UUIDs upon acceptance of the submission. If the same symbolic ID appears more than once in the Submission Request, it shall be replaced with the same generated UUID." The receiving system must be able to handle symbolic IDs in accordance with the base IHE specifications.',
    },
    {
      question: `We're getting an error message while trying to validate a C-CDA file- any suggestions?`,
      answer:
        'All prescribable medication formulations are represented using either a "generic" or "brand-specific" concept. This includes RxNorm codes whose Term Type is SCD (semantic clinical drug), SBD (semantic brand drug), GPCK (generic pack), BPCK (brand pack), SCDG (semantic clinical drug group), SBDG (semantic brand drug group), SCDF (semantic clinical drug form), or SBDF (semantic brand drug form). It does not include the PSN term type, hence the error. If PSN needs to be included, it should be an ERRATA through HL7.',
    },
    {
      question: 'How do I check the SHA value of a message digest?',
      answer:
        "You can use the Linux command 'sha1sum': ...IHE_XDM/SUBSET01$ sha1sum DOCUMEN.XML 986f71360224a1bec649d9e49e91e51bce29de07 DOCUMEN.XML An alternative, using a MS-Windows OS, right-click on the Document file and select 'Calculate Digest'. Selecting 'Properties' will also display the file size.",
    },
    {
      question:
        'My system supports direct messaging and SMTP. Is there any information out there on how to add XDR and XDM support?',
      answer:
        'XDR is defined as ITI-41: Provide and Register Document Set-b. This can be found in Section 3.41 in Vol 2 of the IHE ITI Technical Framework: http://ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol2b.pdf XDM is defined as ITI-32: Distribute Document Set on Media. This can be found in section 3.32 of the same document. A Google Group for implementators of these specifications can be found here: https://groups.google.com/forum/#!forum/ihe-xds-implementors.',
    },
  ]

  return <OTHER header="Other FAQs & Helpful Items" items={other} />
}

export default FAQOTHER
