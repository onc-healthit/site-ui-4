'use client'
import {
  ScorecardCategory,
  ScorecardJsonResponseType,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
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
  FormHelperText,
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
import ScorecardResultsDialog from './ScorecardResultsDialog'
import { getDemoSample } from './serverside/demoSampleService'
import {
  getDefaultReferenceResult,
  getFailingSectionSpecificErrorCount,
  getReferenceResultViaType,
  getRefResultWithMissingSectionsUpdatedWithGivenSection,
} from './serverside/scorecardHelperService'
import {
  ErrorMessage,
  GradeEnum,
  ReferenceInstanceEnum,
  SectionNameEnum,
  SORT_ORDER_STARTING_VALUE,
} from './types/ScorecardConstants'

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
      label: 'Low Scoring Sample (C-CDA R2.1)',
      value: 'lowScoringSample_r21.json',
    },
    {
      label: 'Low Scoring Sample (C-CDA R1.0)',
      value: 'lowScoringSample_r11.json',
    },
    {
      label: 'Sample With Errors',
      value: 'sampleWithErrors.json',
    },
  ]

  const newDemoSampleOptions: { label: string; value: string }[] = [
    {
      label: 'Sample with IG Errors',
      value: 'sampleWithIGErrors.json',
    },
    {
      label: 'Sample with Vocabulary Errors',
      value: 'sampleWithVocabularyErrors.json',
    },
    {
      label: 'Sample with Empty Sections',
      value: 'sampleWithEmptySections.json',
    },
    {
      label: 'Sample with Empty Sections and Errors',
      value: 'sampleWithEmptySectionsAndErrors.json',
    },
  ]
  demoSampleOptions.push(...newDemoSampleOptions)

  const debugSampleOptions: { label: string; value: string }[] = [
    {
      label: 'Schema Errors',
      value: 'sampleWithSchemaErrors.json',
    },
    {
      label: 'No Content',
      value: 'sampleWithoutAnyContent.json',
    },
    {
      label: 'SITE 3 High Scoring Sample',
      value: 'site3-highScoringSample.json',
    },
    {
      label: 'SITE 3 Low Scoring Sample',
      value: 'site3-lowScoringSample.json',
    },
    {
      label: 'SITE 3 Sample With Errors',
      value: 'site3-sampleWithErrors.json',
    },
  ]
  // TODO: Tie this to a debug mode env var (if true, push, otherwise maybe don't as may not want in production)
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

    // TODO: Support POST response from API
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
          addConfAndVocabErrorCountsToScResults(newJson)
          sortResultsOrderByGradeTypeAndNumberOfIssues(newJson?.results, SORT_ORDER_STARTING_VALUE)
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
        ReferenceInstanceEnum.IG_CONFORMANCE,
        newJson.referenceResults
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
        ReferenceInstanceEnum.VOCAB,
        newJson.referenceResults
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

  const addConfAndVocabErrorCountsToScResults = (newJson: ScorecardJsonResponseType) => {
    if (newJson.results) {
      newJson.results.categoryList.forEach((scCategory: ScorecardCategory) => {
        scCategory.conformanceErrorCount = getFailingSectionSpecificErrorCount(
          scCategory.categoryName as SectionNameEnum,
          ReferenceInstanceEnum.IG_CONFORMANCE,
          newJson.referenceResults
        )
        scCategory.vocabularyErrorCount = getFailingSectionSpecificErrorCount(
          scCategory.categoryName as SectionNameEnum,
          ReferenceInstanceEnum.VOCAB,
          newJson.referenceResults
        )
      })
      setScResults(newJson.results)
    }
  }

  /* Sort sections:
  Descending: Sort by Numerical Grade first (lower number of issues first),
  then Vocabulary (lower number of issues first), then IG Conformance (lower number of issues first),
  and empty sections (nullFlavorNI) last.
  isAscending: Sort by IG Conformance (higher number of issues first),
  then Vocabulary (higher number of issues first), then Grade (higher number of issues first),
  and empty sections (nullFlavorNI) last.
  Return values explanation:
  A negative value (-1): If the first element should come before the second element.
  A positive value (1): If the first element should come after the second element.
  Zero (0): If the two elements are considered equal in terms of sorting order.
  Note: This is used as a callback function via NextSteps with a toggle switch in addition to as a default here
  */
  const sortResultsOrderByGradeTypeAndNumberOfIssues = (
    results: ScorecardResultsType | undefined,
    isisAscending: boolean
  ) => {
    if (results?.categoryList) {
      const gradeOrder: { [key: string]: number } = {
        [GradeEnum.A_PLUS]: 1,
        [GradeEnum.A_MINUS]: 2,
        [GradeEnum.B_PLUS]: 3,
        [GradeEnum.B_MINUS]: 4,
        [GradeEnum.C]: 5,
        [GradeEnum.D]: 6,
        // Left out ERRORS and NULL_OR_EMPTY_SECTION on purpose as they are handled more uniquely than a linear order
      }

      const sortedCategoryList = [...results.categoryList].sort((a, b) => {
        // Places nullFlavorNI at the end of the list in all cases
        const nullFlavorNIComparison: number = compareNullFlavorNI(a, b)
        if (nullFlavorNIComparison !== 0) return nullFlavorNIComparison

        const conformanceComparison: number = compareConformance(a, b, isisAscending)
        if (conformanceComparison !== 0) return conformanceComparison

        const vocabularyComparison: number = compareVocabulary(a, b, isisAscending)
        if (vocabularyComparison !== 0) return vocabularyComparison

        const gradeComparison: number = compareGrades(
          gradeOrder,
          isisAscending ? (b.categoryGrade as GradeEnum) : (a.categoryGrade as GradeEnum),
          isisAscending ? (a.categoryGrade as GradeEnum) : (b.categoryGrade as GradeEnum)
        )
        if (gradeComparison !== 0) return gradeComparison

        const numberOfIssuesComparison: number = compareNumberOfIssues(a, b, isisAscending)
        return numberOfIssuesComparison // No check for 0 on last comparison because we have to return something
      })

      setScResults({ ...results, categoryList: sortedCategoryList })
    }
  }

  const compareNullFlavorNI = (a: ScorecardCategory, b: ScorecardCategory): number => {
    if (a.nullFlavorNI !== b.nullFlavorNI) {
      return a.nullFlavorNI ? 1 : -1
    }
    return 0
  }

  const compareConformance = (a: ScorecardCategory, b: ScorecardCategory, isAscending: boolean): number => {
    // Check if one is failing conformance
    if (a.failingConformance !== b.failingConformance) {
      return isAscending ? (b.failingConformance ? 1 : -1) : a.failingConformance ? 1 : -1
    }
    // Otherwise, if both are the same (failingConformance), compare error count
    return isAscending
      ? (b.conformanceErrorCount ?? 0) - (a.conformanceErrorCount ?? 0)
      : (a.conformanceErrorCount ?? 0) - (b.conformanceErrorCount ?? 0)
  }

  const compareVocabulary = (a: ScorecardCategory, b: ScorecardCategory, isAscending: boolean): number => {
    if (a.certificationFeedback !== b.certificationFeedback) {
      return isAscending ? (b.certificationFeedback ? 1 : -1) : a.certificationFeedback ? 1 : -1
    }
    return isAscending
      ? (b.vocabularyErrorCount ?? 0) - (a.vocabularyErrorCount ?? 0)
      : (a.vocabularyErrorCount ?? 0) - (b.vocabularyErrorCount ?? 0)
  }

  const compareGrades = (gradeOrder: { [key: string]: number }, a: GradeEnum, b: GradeEnum): number => {
    // If either grade is undefined, default to D (worst grade)
    const gradeA = a ?? GradeEnum.D
    const gradeB = b ?? GradeEnum.D
    // Otherwise, return the difference between the order of the two grades
    return gradeOrder[gradeA] - gradeOrder[gradeB]
  }

  const compareNumberOfIssues = (a: ScorecardCategory, b: ScorecardCategory, isisAscending: boolean): number => {
    return isisAscending
      ? (b.numberOfIssues ?? 0) - (a.numberOfIssues ?? 0)
      : (a.numberOfIssues ?? 0) - (b.numberOfIssues ?? 0)
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
                subheader="We've built some examples for you."
                titleTypographyProps={{ fontWeight: 'bold' }}
                subheaderTypographyProps={{ color: palette.primary }}
              />
              <CardContent>
                <Box width="100%">
                  <Typography variant="body1" pb={2}>
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
                      <FormHelperText>Choose an option from the list</FormHelperText>
                    </FormControl>
                  </Box>
                </Box>

                {/* Demo Submit  */}
                <Box sx={{ pt: 5 }}>
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

        <ScorecardResultsDialog
          dialogState={resultsDialogState}
          handleCloseDialog={handleCloseResultsDialog}
          isTryMeDemo={isTryMeDemo}
          json={scorecardResponseJson}
          results={scResults}
          igResults={igResults}
          vocabResults={vocabResults}
          sortFunction={sortResultsOrderByGradeTypeAndNumberOfIssues}
        ></ScorecardResultsDialog>
      </Container>
    </>
  )
}
