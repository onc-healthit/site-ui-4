import { CCDAValidationResult } from '@/components/c-cda/validation/results/ValidationResultsSummary'
import { ScorecardBestPracticeResultType } from '@/types/ScorecardBestPracticeResultType'
import { Box, Typography } from '@mui/material'
import { useRef } from 'react'
import ScorecardBaseCheckResults from './ScorecardBaseCheckResults'
import ScorecardBestPracticeResults from './ScorecardBestPracticeResults'

export default function ScorecardResultsSummary() {
  const tempIgResults: CCDAValidationResult[] = [
    {
      type: 'Error',
      documentLineNumber: '10',
      description: '1 description of some issue',
      xPath: 'blah/blah/blah',
      relatedSection: 'Medications',
    },
    {
      type: 'Error',
      documentLineNumber: '15',
      description: '2 description of some other issue',
      xPath: 'blah/blah/blah/blah',
      relatedSection: 'Vital Signs',
    },
    {
      type: 'Error',
      documentLineNumber: '20',
      description: '3 description of some other other issue',
      xPath: 'blah/blah/blah/blah/blah',
      relatedSection: 'Allergies',
    },
  ]

  const tempVocabResults: CCDAValidationResult[] = [
    {
      type: 'Error',
      documentLineNumber: '40',
      description: '1 description of some issue',
      xPath: 'blah/blah/blah',
      relatedSection: 'Medications',
    },
    {
      type: 'Error',
      documentLineNumber: '86',
      description: '2 description of some other issue',
      xPath: 'blah/blah/blah/blah',
      relatedSection: 'Vital Signs',
    },
  ]

  const tempBestPracticeResults: ScorecardBestPracticeResultType[] = [
    {
      section: 'Medications',
      grade: 'B+',
      issueCount: 3,
      lineNumbers: [10, 20, 30],
      xPaths: ['/blah', '/a/b/c', '/x/y/x'],
      rule: 'All Template Ids should be Valid with correct extension value',
      description: `All Template Ids should be present with valid extension value.
      Please refer to: Section 2.4.1: Allergies and Intolerances Section, in the C- CDA Implementation Guide for help resolving the issue.`,
      bestPracticeLinks: [
        'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Problems_Section_20140226.xml',
      ],
    },
    {
      section: 'Allergies',
      grade: 'C',
      issueCount: 3,
      lineNumbers: [10, 20, 30],
      xPaths: ['/blah', '/a/b/c', '/x/y/x'],
      rule: 'All Template Ids should be Valid with correct extension value',
      description: `All Template Ids should be present with valid extension value.
      Please refer to: Section 2.4.1: Allergies and Intolerances Section, in the C- CDA Implementation Guide for help resolving the issue.`,
      bestPracticeLinks: [
        'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Problems_Section_20140226.xml',
      ],
    },
  ]

  const mdhtErrorRef = useRef<HTMLDivElement>(null)

  // TODO: For the best functionality, maybe these results will eventually be hidden/only show one category at a time,
  // based on what category is clicked via heat map or side nav. Maybe all is shown to start,
  // but a click causes isolation. That way, it works for either workflow depending on the user's needs

  return (
    <Box sx={{ pb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 2, pt: 2 }}>
        Detailed Results
      </Typography>
      <ScorecardBaseCheckResults
        category={'Conformance Errors'}
        relatedSection={'Medications'}
        results={tempIgResults}
        errorRef={mdhtErrorRef}
      />
      <br />
      <ScorecardBaseCheckResults
        category={'Vocabulary Errors'}
        relatedSection={'Allergies'}
        results={tempVocabResults}
        errorRef={mdhtErrorRef}
      />
      <br />
      {/* This may need to be split up into a Results section FOR each section
      as in, ScorecardBestPracticeAllergyResults
      and then the main one will iterate all of them... */}
      <ScorecardBestPracticeResults section={'Allergies'} results={tempBestPracticeResults} errorRef={mdhtErrorRef} />
    </Box>
  )
}
