import React from 'react'
import ScorecardTabs from './ScorecardTabs'
import { ScorecardCategoryRubric } from '../types/ScorecardJsonResponseType'

const mockRubric: ScorecardCategoryRubric = {
  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
  numberOfIssues: 4,
  issuesList: [
    {
      lineNumber: '542',
      xmlString:
        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction1"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>',
    },
    {
      lineNumber: '662',
      xmlString:
        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction2"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>',
    },
    {
      lineNumber: '673',
      xmlString:
        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="81953" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Ampicillin">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product2"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>',
    },
    {
      lineNumber: '785',
      xmlString:
        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction3"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>',
    },
  ],
  exampleTaskForceLinks: [
    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Allergies_Status_with_Author_Timestamp.xml',
  ],
  igReferences: ['Section 2.4.1: Allergies and Intolerances Section'],
  description:
    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
}

describe('<ScorecardTabs />', () => {
  it('renders', () => {
    cy.mount(<ScorecardTabs rubric={mockRubric} />)
  })
})
