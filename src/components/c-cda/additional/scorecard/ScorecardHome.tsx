'use client'
import {
  ScorecardJsonResponseType,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/additional/scorecard/types/ScorecardJsonResponseType'
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
import { useEffect, useState } from 'react'
import ScorecardResults from './ScorecardResults'
import { getDemoSample } from './serverside/demoSampleService'
import {
  getDefaultReferenceResult,
  getReferenceResultViaType,
  getRefResultWithMissingSectionsUpdatedWithGivenSection,
} from './serverside/scorecardHelperService'
import { ErrorMessage, ReferenceInstanceEnum, SectionNameEnum } from './types/ScorecardConstants'

export default function ScorecardHome() {
  const [resultsDialogState, setResultsDialogState] = useState(false)
  const handleCloseResultsDialog = () => {
    setResultsDialogState(false)
  }
  const [isTryMeDemo, setIsTryMeDemo] = useState(false)

  const demoSampleOptions: { label: string; value: string }[] = [
    {
      label: 'High Scoring Sample',
      value: 'highScoringSample.json',
    },
    {
      label: 'Low Scoring Sample',
      value: 'lowScoringSample.json',
    },
    {
      label: 'Sample With Errors',
      value: 'sampleWithErrors.json',
    },
  ]
  const debugSampleOptions: { label: string; value: string }[] = [
    {
      label: 'Schema Errors',
      value: 'sampleWithSchemaErrors.json',
    },
    {
      label: 'No Content',
      value: 'sampleWithoutAnyContent.json',
    },
  ]
  // TODO: Tie this to a debug mode env var (if true, push, otherwise, don't, as we don't need these in production)
  demoSampleOptions.push(...debugSampleOptions)

  const [demoSampleOption, setDemoSampleOption] = useState<string>(demoSampleOptions[0].value)
  const [scorecardResponseJson, setScorecardResponseJson] = useState<ScorecardJsonResponseType>()
  const [scResults, setScResults] = useState<ScorecardResultsType>()
  const [igResults, setIgResults] = useState<ScorecardReferenceResultType>(
    getDefaultReferenceResult(ReferenceInstanceEnum.IG_CONFORMANCE)
  )
  const [vocabResults, setVocabResults] = useState<ScorecardReferenceResultType>(
    getDefaultReferenceResult(ReferenceInstanceEnum.VOCAB)
  )

  useEffect(() => {
    if (scorecardResponseJson) {
      console.log('Updated scorecardResponseJson:', scorecardResponseJson)
    }
    if (scResults) {
      console.log('Updated scResults:', scResults)
    }
    if (igResults) {
      console.log('Updated igResults', igResults)
    }
    if (vocabResults) {
      console.log('Updated vocabResults', vocabResults)
    }
  }, [scorecardResponseJson, scResults, igResults, vocabResults])

  const handleDemoSampleChange = (e: SelectChangeEvent) => {
    console.log('handleDemoSampleChange(e), event:', e)
    const demoSampleSelected = e.target.value
    console.log(`Selected ${demoSampleSelected}`)
    setDemoSampleOption(demoSampleSelected)

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Select demo dropdown', {
        event_category: 'dropdown',
        event_label: `Selected ${demoSampleSelected}`,
      })
    }
  }

  const handleSubmitDemoStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitDemoStart(e), event: ', e)
    console.log('Starting demo with sample: ' + demoSampleOption)

    try {
      const newScorecardResponseJson: ScorecardJsonResponseType = getDemoSample(demoSampleOption)
      setScorecardResponseJson(newScorecardResponseJson)

      const [isValidResults, errorMessage]: [boolean, string | null] = processResults(newScorecardResponseJson)
      displayResults(isValidResults, errorMessage, true)
    } catch (error) {
      // TODO: In the extremely unlikely case this happens, we should produce a dialog error
      console.error('Failed to run Try Me Demo in handleSubmitDemoStart(), unable to get demo sample: ', error)
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Try Me', {
        event_category: 'Button',
        event_label: 'Score card try me demo',
      })
    }
  }

  const handleSubmitScorecardStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitScorecardStart(e), event: ', e)

    // TODO:
    // const newScorecardResponseJson: ScorecardJsonResponseType = POST response from API
    // setScorecardResponseJson(newScorecardResponseJson)
    //
    // const [isValidResults, errorMessage]: [boolean, string | null] = processResults(newScorecardResponseJson)
    // displayResults(isValidResults, errorMessage, false)
  }

  const processResults = (newJson: ScorecardJsonResponseType): [boolean, string | null] => {
    if (newJson) {
      if (newJson.success == false) {
        // Handle valid JSON but with an error returned from the server
        const error = newJson.errorMessage
        const file = newJson.filename
        const validJsonWithErrorMessage = `${ErrorMessage.VALID_JSON_WITH_ERROR}
        ${file ? file : 'unknown filename'}: ${error ? error : 'unknown error'}`
        return [false, validJsonWithErrorMessage]
      } else {
        // Handle valid JSON without an error returned from the server
        if (newJson.results) {
          processScorecardResults(newJson)
          processIgAndVocabResults(newJson)
          return [true, null]
        } else {
          return [false, ErrorMessage.INVALID_SCORECARD_SPECIFIC_RESULTS]
        }
      }
    }

    // Default: Handle invalid/no JSON returned from the server
    const jsonUntruthyMessage = 'Scorecard JSON response is untruthy!!!'
    return [false, jsonUntruthyMessage]
  }

  const processScorecardResults = (newJson: ScorecardJsonResponseType) => {
    if (newJson.results) {
      setScResults(newJson.results)
    }
  }

  const processIgAndVocabResults = (newJson: ScorecardJsonResponseType) => {
    if (newJson.referenceResults) {
      const extractedIgResults: ScorecardReferenceResultType | null = getReferenceResultViaType(
        newJson.referenceResults,
        ReferenceInstanceEnum.IG_CONFORMANCE
      )
      if (extractedIgResults) {
        const updatedIgResults = getRefResultWithMissingSectionsUpdatedWithGivenSection(
          extractedIgResults,
          SectionNameEnum.UNKNOWN
        )
        setIgResults(updatedIgResults)
      } else {
        setIgResults(getDefaultReferenceResult(ReferenceInstanceEnum.IG_CONFORMANCE))
      }

      const extractedVocabResults: ScorecardReferenceResultType | null = getReferenceResultViaType(
        newJson.referenceResults,
        ReferenceInstanceEnum.VOCAB
      )
      if (extractedVocabResults) {
        const updatedVocabResults = getRefResultWithMissingSectionsUpdatedWithGivenSection(
          extractedVocabResults,
          SectionNameEnum.UNKNOWN
        )
        setVocabResults(updatedVocabResults)
      } else {
        setVocabResults(getDefaultReferenceResult(ReferenceInstanceEnum.VOCAB))
      }
    } else {
      console.log('newScorecardResponseJson.referenceResults is untruthy')
    }
  }

  const displayResults = (isValidResults: boolean, errorMessage: string | null, isTryMeButtonClick: boolean) => {
    if (isValidResults) {
      setIsTryMeDemo(isTryMeButtonClick)
      setResultsDialogState(true)
    } else {
      const finalErrorMessage = `Error: ${errorMessage ? errorMessage : 'Unknown error message'} `
      console.error(finalErrorMessage)
      // TODO: Replace wuth error dialog used in C-CDA Validator
      alert(finalErrorMessage)
    }
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
          <Box width="70%" component="form" noValidate onSubmit={handleSubmitScorecardStart}>
            <Card>
              <CardHeader
                title="Score your document!"
                subheader="Please select a C-CDA file"
                titleTypographyProps={{ fontWeight: 'bold' }}
                subheaderTypographyProps={{ color: palette.primary }}
              />
              <CardContent>
                <Box width="100%">
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
          <Box width="30%" component="form" noValidate onSubmit={handleSubmitDemoStart}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title="Demo"
                subheader="We've built some examples for you"
                titleTypographyProps={{ fontWeight: 'bold' }}
                subheaderTypographyProps={{ color: palette.primary }}
              />
              <CardContent>
                <Box width="100%">
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

        <ScorecardResults
          dialogState={resultsDialogState}
          handleCloseDialog={handleCloseResultsDialog}
          isTryMeDemo={isTryMeDemo}
          json={scorecardResponseJson}
          results={scResults}
          igResults={igResults}
          vocabResults={vocabResults}
        ></ScorecardResults>
      </Container>
    </>
  )
}
