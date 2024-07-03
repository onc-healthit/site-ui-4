import React from 'react'
import { Typography, Box, Divider, Grid } from '@mui/material'

import ResultsStatusCard from './ValidationTotalResults'
import ValidationStatusIndicator from './ValidationResultsStatusIndicator'
import ValidatorResultsDetails from './ValidationResultsDetails'
import _ from 'lodash'
import OriginalCCDAResult from './OriginalCCDAResult'

interface ValidatorResultsSummaryProps {
  results: object
  scrollRef: React.RefObject<HTMLDivElement>
  summaryRef: React.RefObject<HTMLDivElement>
  mdhtErrorRef: React.RefObject<HTMLDivElement>
  mdhtWarningRef: React.RefObject<HTMLDivElement>
  mdhtInfoRef: React.RefObject<HTMLDivElement>
  vocabularyErrorRef: React.RefObject<HTMLDivElement>
  vocabularyWarningRef: React.RefObject<HTMLDivElement>
  vocabularyInfoRef: React.RefObject<HTMLDivElement>
  referenceErrorRef: React.RefObject<HTMLDivElement>
  referenceWarningRef: React.RefObject<HTMLDivElement>
  referenceInfoRef: React.RefObject<HTMLDivElement>
  originalCCDARef: React.RefObject<HTMLDivElement>
}

export type ResultMetaData = {
  type: string
  count: number
}
export type CCDAValidationResult = {
  type: string
  documentLineNumber: string
  description: string
  xPath: string
  relatedSection?: string
}

interface CCDAValidationResultProps {
  ccdaValidationResults: CCDAValidationResult[]
  mdhtErrorRef: React.RefObject<HTMLDivElement>
  mdhtWarningRef: React.RefObject<HTMLDivElement>
  mdhtInfoRef: React.RefObject<HTMLDivElement>
  vocabularyErrorRef: React.RefObject<HTMLDivElement>
  vocabularyWarningRef: React.RefObject<HTMLDivElement>
  vocabularyInfoRef: React.RefObject<HTMLDivElement>
  referenceErrorRef: React.RefObject<HTMLDivElement>
  referenceWarningRef: React.RefObject<HTMLDivElement>
  referenceInfoRef: React.RefObject<HTMLDivElement>
}

interface ResultMetaDataProps {
  resultMetaData: ResultMetaData[]
}
const TotalResults = ({ resultMetaData }: ResultMetaDataProps) => {
  const errors = _.filter(resultMetaData, function (o) {
    return o?.type?.includes('Error')
  })
  const warnings = _.filter(resultMetaData, function (o) {
    return o?.type?.includes('Warning')
  })
  const infos = _.filter(resultMetaData, function (o) {
    return o?.type?.includes('Info')
  })

  return (
    <Grid flexWrap={'nowrap'} container spacing={2}>
      <Grid item>
        <ResultsStatusCard type="errors" results={errors} />
      </Grid>
      <Grid item>
        <ResultsStatusCard type="warnings" results={warnings} />
      </Grid>
      <Grid item>
        <ResultsStatusCard type="info" results={infos} />
      </Grid>
    </Grid>
  )
}

const StatusIndicator = ({ resultMetaData }: ResultMetaDataProps) => {
  let count: number = 0
  _.filter(resultMetaData, function (o) {
    return o?.type?.includes('Error')
  }).forEach((c) => {
    return (count += c.count ? c.count : 0)
  })
  //console.log(count)
  return <>{count > 0 ? <ValidationStatusIndicator status="fail" /> : <ValidationStatusIndicator status="pass" />}</>
}

const ValidationResults = ({
  ccdaValidationResults,
  mdhtErrorRef,
  mdhtWarningRef,
  mdhtInfoRef,
  vocabularyErrorRef,
  vocabularyInfoRef,
  vocabularyWarningRef,
  referenceErrorRef,
  referenceInfoRef,
  referenceWarningRef,
}: CCDAValidationResultProps) => {
  const ccdaMDHTConformanceValidationResults = ccdaValidationResults.filter((result) =>
    result?.type.includes('C-CDA MDHT Conformance')
  )

  const sccVocabularyValidationResults = ccdaValidationResults.filter((result) =>
    result?.type.includes('S&CC Vocabulary Validation Conformance')
  )
  const sccReferenceCCDAValidationResults = ccdaValidationResults.filter((result) =>
    result?.type.includes('S&CC Reference C-CDA Validation')
  )

  return (
    <>
      <Typography id="C-CDA-MDHT-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        C-CDA IG Conformance
      </Typography>
      <ValidatorResultsDetails
        results={ccdaMDHTConformanceValidationResults}
        errorRef={mdhtErrorRef}
        warningRef={mdhtWarningRef}
        infoRef={mdhtInfoRef}
      />
      <Divider />
      <Typography id="SCC-Vocabulary-Validation-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        S&CC Vocabulary Validation Conformance
      </Typography>
      <ValidatorResultsDetails
        results={sccVocabularyValidationResults}
        errorRef={vocabularyErrorRef}
        warningRef={vocabularyWarningRef}
        infoRef={vocabularyInfoRef}
      />
      <Divider />
      <Typography id="SCC-Reference-CCDA-Validation" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        S&CC Reference C-CDA Validation
      </Typography>
      <ValidatorResultsDetails
        results={sccReferenceCCDAValidationResults}
        errorRef={referenceErrorRef}
        warningRef={referenceWarningRef}
        infoRef={referenceInfoRef}
        referenceCCDAResults={true}
      />
    </>
  )
}
const ValidatorResultsSummary: React.FC<ValidatorResultsSummaryProps> = ({
  results,
  scrollRef,
  summaryRef,
  mdhtErrorRef,
  mdhtInfoRef,
  mdhtWarningRef,
  vocabularyErrorRef,
  vocabularyInfoRef,
  vocabularyWarningRef,
  referenceErrorRef,
  referenceInfoRef,
  referenceWarningRef,
  originalCCDARef,
}) => {
  const resultsMetaData = _.get(results, 'resultsMetaData')
  const ccdaValidationResults = _.get(results, 'ccdaValidationResults')
  const resultMetaData = _.get(resultsMetaData, 'resultMetaData')

  ValidatorResultsSummary.displayName = 'ValidatorResultsSummary' // Assigning displayName
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={4}
      mt={2}
      px={4}
      pb={4}
      sx={{ overflowY: 'none' }}
      ref={scrollRef}
    >
      <Box id="summary" ref={summaryRef}>
        <Typography variant="h3" sx={{ pb: 2, fontWeight: 'bold' }}>
          Summary
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Thank you for using our C-CDA (Consolidated Clinical Document Architecture) Validator. We have processed your
          C-CDA file and here is a summary of the validation results:
        </Typography>
        {resultMetaData ? <StatusIndicator resultMetaData={resultMetaData} /> : null}
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom sx={{ pb: 2, fontWeight: 'bold' }}>
          Totals
        </Typography>

        {resultMetaData ? <TotalResults resultMetaData={resultMetaData} /> : <Typography>No Results</Typography>}
      </Box>
      <Divider />
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Details
      </Typography>
      {ccdaValidationResults ? (
        <ValidationResults
          ccdaValidationResults={ccdaValidationResults}
          mdhtErrorRef={mdhtErrorRef}
          mdhtWarningRef={mdhtWarningRef}
          mdhtInfoRef={mdhtInfoRef}
          vocabularyErrorRef={vocabularyErrorRef}
          vocabularyWarningRef={vocabularyWarningRef}
          vocabularyInfoRef={vocabularyInfoRef}
          referenceErrorRef={referenceErrorRef}
          referenceWarningRef={referenceWarningRef}
          referenceInfoRef={referenceInfoRef}
        />
      ) : (
        <Typography>No Results</Typography>
      )}
      <Divider />

      <Box pb={4} id="original-ccda" ref={originalCCDARef}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 4 }}>
          Original C-CDA
        </Typography>
        {resultsMetaData ? <OriginalCCDAResult xmlData={resultsMetaData} /> : <Typography>No Results</Typography>}
      </Box>
    </Box>
  )
}

export default ValidatorResultsSummary
