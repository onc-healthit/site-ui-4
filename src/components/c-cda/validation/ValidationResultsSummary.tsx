import React from 'react'
import { Typography, Box } from '@mui/material'
import ResultsStatusCard from './ResultsStatusCard'
import ValidationStatusIndicator from './ValidationStatusIndicator'

export default function ValidatorResultsSummary() {
  const errors = ['1 Error in C-CDA MDHT Conformance']
  const warnings = ['1 Warning']
  const infos = ['1 Info', '1 Info', '1 Info']
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Summary
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Thank you for using our CCDA (Consolidated Clinical Document Architecture) Validator. We have processed your
        CCDA file and here is a summary of the validation results:
      </Typography>
      <ValidationStatusIndicator status="error" />
      <ValidationStatusIndicator status="warning" />
      <ValidationStatusIndicator status="pass" />

      <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Detailed Report:</Typography>
      <Typography sx={{ mt: 2 }}>
        Pass: Your CCDA document has successfully passed our validation process. Congratulations! It complies with the
        CCDA standards, ensuring its interoperability and correctness.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Warning: Your CCDA document has passed the basic validation, but there are some issues that need your attention.
        Please review the warnings below and take necessary actions to enhance the quality of your document.
      </Typography>
      <Typography sx={{ mt: 1, mb: 2 }}>
        Fail: Unfortunately, your CCDA document did not pass the validation. It indicates significant issues that must
        be resolved. Please review the errors below for detailed information on what needs to be corrected.
      </Typography>

      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
        Results Total
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '0 1 auto' }}>
          <ResultsStatusCard type="error" count={1} messages={errors} />
        </Box>
        <Box sx={{ flex: '0 1 auto' }}>
          <ResultsStatusCard type="warning" count={1} messages={warnings} />
        </Box>
        <Box sx={{ flex: '0 1 auto' }}>
          <ResultsStatusCard type="info" count={3} messages={infos} />
        </Box>
      </Box>

      <Typography sx={{ mt: 4, fontWeight: 'bold' }}>C-CDA MDHT Conformance</Typography>
    </Box>
  )
}
