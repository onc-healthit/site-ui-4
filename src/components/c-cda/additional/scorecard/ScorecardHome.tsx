'use client'
import CardWithBorder from '@/components/shared/CardWithBorder'
import DragDropFileUpload from '@/components/shared/DragandDropFile'
import { fetchSanitizedMarkdownData } from '@/services/markdownToHTMLService'
import palette from '@/styles/palette'
import { ArrowForward } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import BannerBox from '@shared/BannerBox'
import SectionHeader from '@shared/SectionHeader'
import styles from '@shared/styles.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ScorecardHome() {
  const demoSampleOptions = [
    {
      label: 'High Scoring Sample',
      value: 'highScoringSample.xml',
    },
    {
      label: 'Low Scoring Sample',
      value: 'lowScoringSample.xml',
    },
    {
      label: 'Sample With Errors',
      value: 'sampleWithErrors.xml',
    },
  ]
  const [demoSampleOption, setDemoSampleOption] = useState<string>(demoSampleOptions[0].value)

  const handleDemoSampleChange = (e: SelectChangeEvent) => {
    console.log('handleDemoSampleChange(e), event:', e)
    const demoSampleSelected = e.target.value
    console.log(`Selected ${demoSampleSelected}`)
    setDemoSampleOption(demoSampleSelected)
  }

  const handleSubmitScorecardStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitScorecardStart(e), event: ', e)
    tempLoadResults()
  }

  const handleSubmitDemoStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitDemoStart(e), event: ', e)
    console.log('Starting demo with sample: ' + demoSampleOption)
    tempLoadResults()
  }

  // TODO: rReplace with shared/dialog/DialogTemplate.tsx modal once generilzation is done in C-CDA Validation
  const router = useRouter()
  const tempLoadResults = async () => {
    router.push('temp-sc-results')
  }

  const modalUrls = [
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/CCDAScorecardIntroduction.md',
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/CCDAScorecardResultsInterpretation.md',
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/CCDAScorecardApiAndExternalTool.md',
  ]
  const [modalContent, setModalContent] = useState<string | undefined>()
  const [modalUrl, setModalUrl] = useState<string | undefined>()

  useEffect(() => {
    if (modalUrl) {
      ;(async () => {
        let sanitizedMarkdown: string | undefined
        try {
          sanitizedMarkdown = await fetchSanitizedMarkdownData(modalUrl)
          setModalContent(sanitizedMarkdown)
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [modalUrl])

  const handleCardWithBorderClick = (index: number) => {
    setModalUrl(modalUrls[index])
  }

  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/c-cda" key="1" className={styles.link}>
            C-CDA
          </Link>,
          <Link color="inherit" href="/c-cda/scorecard" key="2" className={styles.link}>
            Scorecard
          </Link>,
        ]}
        heading={'C-CDA Scorecard'}
        description={
          <>
            The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents by using a
            comprehensive scoring system, which allows implementers to improve the data quality and representation of
            their C-CDA documents.
          </>
        }
      />
      {/* Main Content */}
      <Container>
        <SectionHeader header={'Run the Scorecard'} subHeader={'Upload your file or try the demo'} />

        {/* Actual Scorecard Validation */}
        <Box display="flex" gap={4} alignContent="stretch">
          <Box width="70%">
            <Card>
              <CardHeader
                title="Score your document!"
                subheader="Please select a C-CDA file"
                titleTypographyProps={{ fontWeight: 'bold' }}
                subheaderTypographyProps={{ color: palette.primary }}
              />
              <CardContent>
                <Box component="form" width="100%" noValidate onSubmit={handleSubmitScorecardStart}>
                  <Typography variant="body1">
                    <>
                      <b>PHI Note:</b> The C-CDA Scorecard does not retain your submitted C-CDA file as the file is
                      deleted from the server immediately after processing. However, we strongly suggest that you do not
                      include any Protected Health Information (PHI) or Personally Identifiable Information (PII) in
                      your C-CDA file submissions to the Scorecard. Click{' '}
                      <a
                        href="http://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html"
                        target="_blank"
                      >
                        here
                      </a>{' '}
                      for more information on how to de-identify PHI.
                    </>
                  </Typography>

                  {/* Scorecard User File Upload */}
                  <Box sx={{ pt: 3 }}>
                    <DragDropFileUpload />
                  </Box>

                  {/* Scorecard Validation Submit */}
                  <Box sx={{ pt: 4 }}>
                    <Button type="submit" variant="contained">
                      START
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Demo */}
          <Box width="30%">
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Demo"
                subheader="We've built some examples for you"
                titleTypographyProps={{ fontWeight: 'bold' }}
                subheaderTypographyProps={{ color: palette.primary }}
              />
              <CardContent>
                <Box component="form" width="100%" noValidate onSubmit={handleSubmitDemoStart}>
                  <Typography variant="body1">
                    Please select which sample you would like to use from the dropdown to demo. Enjoy!
                  </Typography>

                  {/* Demo Sample Selection Dropdown */}
                  <Box sx={{ pt: 6 }}>
                    <FormControl fullWidth>
                      <Select id="sc-demo-sample-select" value={demoSampleOption} onChange={handleDemoSampleChange}>
                        {demoSampleOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {/* Demo Submit  */}
                <Box sx={{ pt: 7 }}>
                  <Button type="submit" variant="outlined" color="primary">
                    TRY ME
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Divider sx={{ pt: 2, pb: 2 }} />

        <SectionHeader
          header={'Learn & Implement'}
          subHeader={'Review the information below for a deeper understanding of the Scorecard'}
        />

        <Box display="flex" gap={4} alignItems="stretch">
          <Box display="flex" flexDirection="column" gap={3} width="50%" sx={{ pb: 4 }}>
            <div onClick={() => handleCardWithBorderClick(0)}>
              <CardWithBorder
                cardHeader={'Scorecard Introduction'}
                buttonTitle={'VIEW'}
                buttonIcon={<ArrowForward />}
                useModal={true}
                cardWidthPercent={100}
                modalContent={modalContent}
              />
            </div>
            <div onClick={() => handleCardWithBorderClick(1)}>
              <CardWithBorder
                cardHeader={'How to Interpret the Scorecard Results'}
                buttonTitle={'VIEW'}
                buttonIcon={<ArrowForward />}
                useModal={true}
                cardWidthPercent={100}
                modalContent={modalContent}
              />
            </div>
            <CardWithBorder
              cardHeader={'One Click Scorecard using Direct'}
              buttonTitle={'ACCESS VIDEO'}
              buttonIcon={<ArrowForward />}
              buttonLink="https://oncprojectracking.healthit.gov/wiki/display/TechLabTU/ONC+One+Click+Scorecard"
              cardWidthPercent={100}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={3} width="50%" sx={{ pb: 4 }}>
            <div onClick={() => handleCardWithBorderClick(2)}>
              <CardWithBorder
                cardHeader={'Scorecard API and External Tool Instructions'}
                buttonTitle={'VIEW'}
                buttonIcon={<ArrowForward />}
                useModal={true}
                cardWidthPercent={100}
                modalContent={modalContent}
              />
            </div>
            <CardWithBorder
              cardHeader={'Download the Scorecard for Local Instantiation'}
              buttonTitle={'GO TO GITHUB'}
              buttonIcon={<ArrowForward />}
              buttonLink="https://github.com/onc-healthit/ccda-scorecard"
              cardWidthPercent={100}
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}
