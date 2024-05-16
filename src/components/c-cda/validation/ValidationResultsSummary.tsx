import React, { forwardRef } from 'react'
import { Typography, Box, Divider } from '@mui/material'

import ResultsStatusCard from './ResultsStatusCard'
import ValidationStatusIndicator from './ValidationStatusIndicator'
import ValidatorResultsCCDAMDHTConformance from './ValidationResultsCCDAMDHTConformance'
import ValidatorResultsSCCReferenceCCDAValidation from './ValidationResultsSCCReferenceCCDAValidation'
import ValidationResultsSCCVocabularyValidationConformance from './ValidationResultsSCCVocabularyValidationConformance'

const ValidatorResultsSummary = forwardRef<HTMLDivElement>((props, ref) => {
  const errors = ['2 Error in C-CDA MDHT Conformance']
  const warnings = ['1 Error in C-CDA MDHT Conformance']
  const infos = ['1 Error in C-CDA MDHT Conformance', '1 S & CC Vocabulary Validation Conformance']
  ValidatorResultsSummary.displayName = 'ValidatorResultsSummary' // Assigning displayName
  return (
    <Box display={'flex'} flexDirection={'column'} gap={4} mt={2} px={4} pb={4} sx={{ overflowY: 'auto' }} ref={ref}>
      <Box id="summary">
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Summary
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Thank you for using our CCDA (Consolidated Clinical Document Architecture) Validator. We have processed your
          CCDA file and here is a summary of the validation results:
        </Typography>
        <ValidationStatusIndicator status="error" />
        <ValidationStatusIndicator status="pass" />
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ResultsStatusCard type="error" count={1} messages={errors} />
          <ResultsStatusCard type="warning" count={1} messages={warnings} />
          <ResultsStatusCard type="info" count={3} messages={infos} />
        </Box>
      </Box>
      <Divider />
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Details
      </Typography>
      <Typography id="C-CDA-MDHT-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        C-CDA MDHT Conformance
      </Typography>
      <ValidatorResultsCCDAMDHTConformance />
      <Divider />
      <Typography id="SCC-Vocabulary-Validation-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        S&CC Vocabulary Validation Conformance
      </Typography>
      <ValidatorResultsSCCReferenceCCDAValidation />
      <Divider />
      <Typography id="C-CDAMDHT-Conformance" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        C-CDA MDHT Conformance
      </Typography>
      <ValidationResultsSCCVocabularyValidationConformance />
    </Box>
  )
})

export default ValidatorResultsSummary
