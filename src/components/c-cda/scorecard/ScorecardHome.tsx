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
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import ErrorDisplayCard from '../validation/results/ErrorDisplay'
import ValidatorLoadingCard from '../validation/results/ResultsLoading'
import ScorecardResultsDialog from './ScorecardResultsDialog'
import { postToScorecardForValidation } from './serverside/actions'
import { allSampleOptions, allSampleOptionsExceptDebug, getDemoSample } from './serverside/demoSampleService'
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
import eventTrack from '@/services/analytics'

export default function ScorecardHome() {
  const [resultsDialogState, setResultsDialogState] = useState(false)
  const handleCloseResultsDialog = () => {
    setResultsDialogState(false)
  }

  const [isTryMeDemo, setIsTryMeDemo] = useState(false)

  const IS_DEBUG_MODE: boolean = process.env.NEXT_PUBLIC_IS_DEBUG_MODE === 'true'
  const demoSampleOptions = IS_DEBUG_MODE ? allSampleOptions : allSampleOptionsExceptDebug

  const [demoSampleOption, setDemoSampleOption] = useState<string>(demoSampleOptions[0].value)
  const [scorecardResponseJson, setScorecardResponseJson] = useState<ScorecardJsonResponseType>()
  const [scResults, setScResults] = useState<ScorecardResultsType>()
  const [igResults, setIgResults] = useState<ScorecardReferenceResultType>(
    getDefaultReferenceResult(ReferenceInstanceEnum.IG_CONFORMANCE)
  )
  const [vocabResults, setVocabResults] = useState<ScorecardReferenceResultType>(
    getDefaultReferenceResult(ReferenceInstanceEnum.VOCAB)
  )

  const [scorecardHomeError, setScorecardHomeError] = useState('')
  const [isDisableStartButton, setIsDisableStartButton] = useState(true)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(postToScorecardForValidation, { response: null })
  const [fileName, setFileName] = useState('')
  // TODO: Consider setting this based off of file size?
  // Right now, it is the regular validator's estimate for IG + Vocab (15), just like this, but it adds best practice
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [estimatedValidationTime, setEstimatedValidationTime] = useState(20)
  const [isValidating, setIsValidating] = useState(false)

  /* Set API response when updated */
  useEffect(() => {
    if (formState) {
      if (formState.error) {
        setScorecardHomeError(
          formState.error + (formState.errorStatus ? ` Status Number: ${formState.errorStatus}` : '')
        )
        setIsValidating(false)
      } else if (formState.response) {
        const newScorecardResponseJson: ScorecardJsonResponseType = formState.response
        setScorecardResponseJson(newScorecardResponseJson)
      }
    }
  }, [formState])

  /* Handle results display after API call results returned */
  useEffect(() => {
    if (scorecardResponseJson) {
      const [isValidResults, errorMessage] = processResults(scorecardResponseJson)
      setIsValidating(false)
      displayResults(isValidResults, errorMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scorecardResponseJson])

  /* Only enable START button if file is selected */
  useEffect(() => {
    if (!fileName) {
      setIsDisableStartButton(true)
    } else {
      setIsDisableStartButton(false)
    }
  }, [fileName])

  /* Debug logs */
  useEffect(() => {
    if (IS_DEBUG_MODE) {
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
    }
  }, [scorecardResponseJson, scResults, igResults, vocabResults, IS_DEBUG_MODE])

  const handleDemoSampleChange = (e: SelectChangeEvent) => {
    console.log('handleDemoSampleChange(e), event:', e)
    const demoSampleSelected = e.target.value
    console.log(`Selected ${demoSampleSelected}`)
    setDemoSampleOption(demoSampleSelected)

    eventTrack('Dropdown Selection', 'Scorecard', `Selected ${demoSampleSelected} sample within Try Me Demo dropdown`)
  }

  const handleSubmitDemoStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitDemoStart(e), event: ', e)
    console.log('Starting demo with sample: ' + demoSampleOption)

    setIsTryMeDemo(true)

    try {
      const newScorecardResponseJson: ScorecardJsonResponseType = getDemoSample(demoSampleOption)
      setScorecardResponseJson(newScorecardResponseJson)
    } catch (error) {
      const errorMessagePrefix = 'Error running Scorecard Demo'
      console.error(
        `${errorMessagePrefix} in handleSubmitDemoStart():
        Failed to run Scorecard Demo in handleSubmitDemoStart(), unable to get demo sample: `,
        error
      )
      setScorecardHomeError(`${errorMessagePrefix}:
        ${error}. Please try again later.`)
    }

    eventTrack('Button Click Form Submission', 'Scorecard', 'Run the Try Me Demo with selected file and view results')
  }

  const getFileName = (data: File[]) => {
    console.log(data[0]?.name)
    if (data) {
      setFileName(data[0]?.name)
    } else {
      console.log('SC Filename is undefined...')
    }
  }

  const resetResultsData = () => {
    setScorecardResponseJson(undefined)
    setScResults(undefined)
    setIgResults(getDefaultReferenceResult(ReferenceInstanceEnum.IG_CONFORMANCE))
    setVocabResults(getDefaultReferenceResult(ReferenceInstanceEnum.VOCAB))
    setIsTryMeDemo(false)
  }

  const handleSubmitScorecardStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitScorecardStart(e), event: ', e)
    console.log('Starting C-CDA Scorecard validation with submitted C-CDA file: ' + fileName)

    resetResultsData()
    setIsValidating(true)

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current)
        formAction(formData)
        if (formState.error) {
          throw new Error(formState.error)
        }
      }
    } catch (error) {
      const errorMessagePrefix = 'Error running C-CDA Scorecard validation'
      console.error(
        `${errorMessagePrefix} in handleSubmitScorecardStart():
        Failed to run C-CDA Scorecard validation in handleSubmitScorecardStart(), unable to load submitted file: `,
        error
      )
      setScorecardHomeError(`${errorMessagePrefix}: ${error instanceof Error ? error.message : String(error)}.`)
      setIsValidating(false)
    }

    eventTrack('Button Click Form Submission', 'Scorecard', 'Run SC validation with selected file and view results')
  }

  const processResults = (newJson: ScorecardJsonResponseType): [boolean, string | null] => {
    if (newJson) {
      if (!newJson.success) {
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
    isAscending: boolean
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

        const conformanceComparison: number = compareConformance(a, b, isAscending)
        if (conformanceComparison !== 0) return conformanceComparison

        const vocabularyComparison: number = compareVocabulary(a, b, isAscending)
        if (vocabularyComparison !== 0) return vocabularyComparison

        const gradeComparison: number = compareGrades(
          gradeOrder,
          isAscending ? (b.categoryGrade as GradeEnum) : (a.categoryGrade as GradeEnum),
          isAscending ? (a.categoryGrade as GradeEnum) : (b.categoryGrade as GradeEnum)
        )
        if (gradeComparison !== 0) return gradeComparison

        const numberOfIssuesComparison: number = compareNumberOfIssues(a, b, isAscending)
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

  const displayResults = (isValidResults: boolean, errorMessage: string | null) => {
    if (isValidResults) {
      setResultsDialogState(true)
    } else {
      const finalErrorMessage = `Error: ${errorMessage ? errorMessage : 'Unknown error message'} `
      console.error(finalErrorMessage)
      setScorecardHomeError(finalErrorMessage)
    }
  }

  // TODO: Separate out as much modal data and logic as possible into it's own component for cleaner code
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
        <Box display="flex" gap={4} alignContent="stretch">
          {/* Actual Scorecard Validation */}
          <Box width="70%" component="form" noValidate onSubmit={handleSubmitScorecardStart} ref={formRef}>
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
                    <DragDropFileUpload maxFiles={1} name="ccdaFile" fileName={getFileName} />
                  </Box>
                  {/* Scorecard Validation Submit */}
                  <Box sx={{ pt: 4 }}>
                    <Button id="validate" type="submit" variant="contained" disabled={isDisableStartButton}>
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

        {isValidating && (
          <ValidatorLoadingCard open={true} estimatedValidationTime={estimatedValidationTime} fileName={fileName} />
        )}

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

        <ErrorDisplayCard
          open={scorecardHomeError ? true : false}
          handleClose={() => setScorecardHomeError('')}
          response={{ error: scorecardHomeError }}
        />
      </Container>
    </>
  )
}
