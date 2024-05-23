import React, { forwardRef } from 'react'
import { Typography, Box, Divider } from '@mui/material'

import ResultsStatusCard from './ValidationResultsStatusCard'
import ValidationStatusIndicator from './ValidationResultsStatusIndicator'
import ValidatorResultsDetails from './ValidationResultsDetails'
import _ from 'lodash'
import { Analytics } from '@mui/icons-material'

interface ValidatorResultsSummaryProps {
  results: object
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
}

interface CCDAValidationResultProps {
  ccdaValidationResults: CCDAValidationResult[]
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
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ResultsStatusCard type="error" messages={errors} />

      <ResultsStatusCard type="warning" messages={warnings} />

      <ResultsStatusCard type="info" messages={infos} />
    </Box>
  )
}

const StatusIndicator = ({ resultMetaData }: ResultMetaDataProps) => {
  let count: number = 0
  const errors = _.filter(resultMetaData, function (o) {
    return o?.type?.includes('Error')
  }).forEach((c) => {
    return (count += c.count ? c.count : 0)
  })
  console.log(count)
  return <>{count > 0 ? <ValidationStatusIndicator status="error" /> : <ValidationStatusIndicator status="pass" />}</>
}

const ValidationResults = ({ ccdaValidationResults }: CCDAValidationResultProps) => {
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
        C-CDA MDHT Conformance
      </Typography>
      <ValidatorResultsDetails results={ccdaMDHTConformanceValidationResults} />
      <Divider />
      <Typography id="SCC-Vocabulary-Validation-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        S&CC Vocabulary Validation Conformance
      </Typography>
      <ValidatorResultsDetails results={sccVocabularyValidationResults} />
      <Divider />
      <Typography id="C-CDAMDHT-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        S&CC Reference CCDA Validation
      </Typography>
      <ValidatorResultsDetails results={sccReferenceCCDAValidationResults} />
    </>
  )
}
const ValidatorResultsSummary: React.FC<ValidatorResultsSummaryProps> = ({ results }) => {
  const resultsMetaData = _.get(results, 'resultsMetaData')
  const ccdaValidationResults = _.get(results, 'ccdaValidationResults')

  //console.log(resultsMetaData)
  //console.log(ccdaValidationResults)
  const resultMetaData = _.get(resultsMetaData, 'resultMetaData')

  ValidatorResultsSummary.displayName = 'ValidatorResultsSummary' // Assigning displayName
  return (
    <Box display={'flex'} flexDirection={'column'} gap={4} mt={2} px={4} pb={4} sx={{ overflowY: 'auto' }}>
      <Box id="summary">
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Summary
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Thank you for using our CCDA (Consolidated Clinical Document Architecture) Validator. We have processed your
          CCDA file and here is a summary of the validation results:
        </Typography>
        {resultMetaData ? <StatusIndicator resultMetaData={resultMetaData} /> : null}
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold' }}>
          Detailed Report
        </Typography>
        <Typography>
          <strong>Pass:</strong> Your CCDA document has successfully passed our validation process. Congratulations! It
          complies with the CCDA standards, ensuring its interoperability and correctness.
        </Typography>
        <Typography gutterBottom>
          <strong>Warning:</strong> Your CCDA document has passed the basic validation, but there are some issues that
          need your attention. Please review the warnings below and take necessary actions to enhance the quality of
          your document.
        </Typography>
        <Typography gutterBottom>
          <strong>Fail:</strong> Unfortunately, your CCDA document did not pass the validation. It indicates significant
          issues that must be resolved. Please review the errors below for detailed information on what needs to be
          corrected.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Results Total
        </Typography>

        {resultMetaData ? <TotalResults resultMetaData={resultMetaData} /> : <Typography>No Results</Typography>}
      </Box>
      <Divider />
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Details
      </Typography>
      {ccdaValidationResults ? (
        <ValidationResults ccdaValidationResults={ccdaValidationResults} />
      ) : (
        <Typography>No Results</Typography>
      )}
    </Box>
  )
}

export default ValidatorResultsSummary
