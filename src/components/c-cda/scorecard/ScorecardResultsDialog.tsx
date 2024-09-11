'use client'
import { Box, Button, Container, Divider, Typography } from '@mui/material'

import {
  ScorecardJsonResponseType,
  ScorecardReferenceResultType,
  ScorecardResultsType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import DialogTemplate from '@/components/shared/dialog/DialogTemplate' // Adjust the path if needed
import palette from '@/styles/palette'
import ScorecardNextSteps from './next-steps/ScorecardNextSteps'
import ScorecardSideNav from './ScorecardSideNav'
import { removeHashtagToUseHrefLinkAsIdForAnchor } from './serverside/scorecardHelperService'
import ScorecardBaseCheckSummary from './summary/ScorecardBaseCheckSummary'
import ScorecardBestPracticeSummary from './summary/ScorecardBestPracticeSummary'
import ScorecardCompareChartSummary from './summary/ScorecardCompareChartSummary'
import { HrefLinkValueEnum } from './types/ScorecardConstants'
import { useState } from 'react'

import site3SampleWithErrorsJsonData from '@components/c-cda/scorecard/serverside/samples/json/site3-sampleWithErrors.json'
import {
  saveScorecardReportAction,
  saveScorecardReportAxiosAction,
  saveScorecardReportAxiosDebugAction,
} from './serverside/actions'
import ErrorDisplayCard from '../validation/results/ErrorDisplay'

interface ScorecardResultsDialogProps {
  dialogState: boolean
  handleCloseDialog: () => void
  isTryMeDemo: boolean
  json: ScorecardJsonResponseType | undefined
  results: ScorecardResultsType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
  sortFunction: (results: ScorecardResultsType | undefined, isAscending: boolean) => void
}

export default function ScorecardResultsDialog({
  dialogState,
  handleCloseDialog,
  isTryMeDemo,
  json,
  results,
  igResults,
  vocabResults,
  sortFunction,
}: ScorecardResultsDialogProps) {
  const dividerPaddingStyle = {
    paddingTop: 2,
  }

  const [isSaveReportLoading, setIsSaveReportLoading] = useState(false)
  const [saveReportError, setSaveReportError] = useState('')

  const handleSaveReport = async () => {
    console.log('Enter handleSaveReport()')
    setIsSaveReportLoading(true)
    setSaveReportError('')

    try {
      /* Backend route call */
      // const apiUrl = '/api/c-cda/scorecard/savescorecardservice'
      // const response = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     ContentType: 'application/json',
      //   },
      //   // body: JSON.stringify(site3SampleWithErrorsJsonData),
      //   // body: JSON.stringify(json),
      //   // body: JSON.stringify(...),
      // })

      /* Direct client call with CORS bypass for testing */
      // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
      // const apiUrl = 'https://ccda.healthit.gov/scorecard/savescorecardservice'
      // const response = await fetch(corsProxyUrl + apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // prettier-ignore
      //     'Accept': 'application/pdf',
      //   },
      //   // body: JSON.stringify(site3SampleWithErrorsJsonData),
      //   body: JSON.stringify(json),
      // })

      // if (!response.ok) {
      //   throw new Error(`HTTP error encountered while saving scorecard results! status: ${response.status}`)
      // }

      // const pdfBlobResponse = await saveScorecardReportAction(site3SampleWithErrorsJsonData)
      // if (json) {
      // const pdfBlobResponse = await saveScorecardReportAction(json)
      // const pdfBlobResponse = await response.blob()
      // const pdfBlobResponse = await saveScorecardReportAction({

      const inlineJsonObjectForDebug: ScorecardJsonResponseType = {
        errorMessage: null,
        filename: 'sampleWithErrors.xml',
        ccdaDocumentType: 'CCD',
        results: {
          finalGrade: 'D',
          finalNumericalGrade: 64,
          categoryList: [
            {
              categoryName: 'Miscellaneous',
              categoryGrade: 'A+',
              categoryNumericalScore: 100,
              categoryRubrics: [
                {
                  rule: 'Generally, the identifiers found within a CDA document should be unique and non-reoccurring within the same document.',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
              ],
              numberOfIssues: 0,
              numberOfChecks: 65,
              numberOfFailedRubrics: 0,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Medications',
              categoryGrade: null,
              categoryNumericalScore: 0,
              categoryRubrics: [],
              numberOfIssues: 0,
              numberOfChecks: 0,
              numberOfFailedRubrics: 0,
              certificationFeedback: true,
              failingConformance: true,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Immunizations',
              categoryGrade: null,
              categoryNumericalScore: 0,
              categoryRubrics: [],
              numberOfIssues: 0,
              numberOfChecks: 0,
              numberOfFailedRubrics: 0,
              certificationFeedback: false,
              failingConformance: true,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Patient Demographics',
              categoryGrade: null,
              categoryNumericalScore: 0,
              categoryRubrics: [],
              numberOfIssues: 0,
              numberOfChecks: 1,
              numberOfFailedRubrics: 0,
              certificationFeedback: true,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Allergies',
              categoryGrade: 'C',
              categoryNumericalScore: 79,
              categoryRubrics: [
                {
                  rule: 'EffectiveDate/Time elements have the right time and timezone offsets',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'EffectiveDate/Times for all historical activities should be within the lifespan on the patient',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
                  numberOfIssues: 6,
                  issuesList: [
                    {
                      lineNumber: '542',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction1"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>',
                    },
                    {
                      lineNumber: '553',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="7982" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Penicillin G benzathine">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product1"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>',
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
                    {
                      lineNumber: '796',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="81982" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Clindamycin Hydrochloride">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product3"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Allergies_Status_with_Author_Timestamp.xml',
                  ],
                  igReferences: ['Section 2.4.1: Allergies and Intolerances Section'],
                  description:
                    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
                },
                {
                  rule: 'Allergies Concern observation effective times reflect the appropriate allergy concern status',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Each entry has to be linked to related narrative text',
                  numberOfIssues: 3,
                  issuesList: [
                    {
                      lineNumber: '499 - 616',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.30"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.30"/>\n\t\t\t\t\t\t\t<id root="36e3e930-7b14-11db-9fe1-0800200c9a66"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="19800501"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<time value="19800501"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<id root="4adc1020-7b14-11db-9fe1-0800200c9a66"/>\n\t\t\t\t\t\t\t\t\t<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>\n\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t<reference value="#allergytype1"/>\n\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="19980501"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction1"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t<participant typeCode="CSM">\n\t\t\t\t\t\t\t\t\t\t<participantRole classCode="MANU">\n\t\t\t\t\t\t\t\t\t\t\t<playingEntity classCode="MMAT">\n\t\t\t\t\t\t\t\t\t\t\t\t<code code="7982" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Penicillin G benzathine">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product1"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\t\t</playingEntity>\n\t\t\t\t\t\t\t\t\t\t</participantRole>\n\t\t\t\t\t\t\t\t\t</participant>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<entryRelationship inversionInd="true" typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="SEV" codeSystem="2.16.840.1.113883.5.4" codeSystemName="ActCode" displayName="Severity Observation"/>\n\t\t\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#severity1"/>\n\t\t\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t\t\t<value code="6736007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Moderate" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t\t\t\t<entryRelationship inversionInd="true" typeCode="MFST">\n\t\t\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.9"/>\n\t\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.9"/>\n\t\t\t\t\t\t\t\t\t\t\t<id root="4adc1020-7b14-11db-9fe1-0800200c9a64"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>\n\t\t\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction1"/>\n\t\t\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\t\t<low value="200802260805-0800"/>\n\t\t\t\t\t\t\t\t\t\t\t\t<high value="200802281205-0800"/>\n\t\t\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\t<value code="247472004" codeSystem="2.16.840.1.113883.6.96" displayName="Hives" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\t\t<entryRelationship inversionInd="true" typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<code code="SEV" codeSystem="2.16.840.1.113883.5.4" codeSystemName="ActCode" displayName="Severity Observation"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<value code="6736007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Moderate" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '619 - 736',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.30"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.30"/>\n\t\t\t\t\t\t\t<id root="b03805bd-2eb6-4ab8-a9ff-473c6653971a"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="19800501"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<time value="19800501"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<id root="4adc1020-7b14-11db-9fe1-0800200c9a66"/>\n\t\t\t\t\t\t\t\t\t<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>\n\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t<reference value="#allergytype2"/>\n\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="19980501"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction2"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t<participant typeCode="CSM">\n\t\t\t\t\t\t\t\t\t\t<participantRole classCode="MANU">\n\t\t\t\t\t\t\t\t\t\t\t<playingEntity classCode="MMAT">\n\t\t\t\t\t\t\t\t\t\t\t\t<code code="81953" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Ampicillin">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product2"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\t\t</playingEntity>\n\t\t\t\t\t\t\t\t\t\t</participantRole>\n\t\t\t\t\t\t\t\t\t</participant>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<entryRelationship inversionInd="true" typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="SEV" codeSystem="2.16.840.1.113883.5.4" codeSystemName="ActCode" displayName="Severity Observation"/>\n\t\t\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#severity2"/>\n\t\t\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t\t\t<value code="6736007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Moderate" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t\t\t\t<entryRelationship inversionInd="true" typeCode="MFST">\n\t\t\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.9"/>\n\t\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.9"/>\n\t\t\t\t\t\t\t\t\t\t\t<id root="4adc1020-7b14-11db-9fe1-0800200c9a64"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>\n\t\t\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction2"/>\n\t\t\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\t\t<low value="200802260805-0800"/>\n\t\t\t\t\t\t\t\t\t\t\t\t<high value="200802281205-0800"/>\n\t\t\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\t<value code="247472004" codeSystem="2.16.840.1.113883.6.96" displayName="Hives" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\t\t<entryRelationship inversionInd="true" typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.8"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<code code="SEV" codeSystem="2.16.840.1.113883.5.4" codeSystemName="ActCode" displayName="Severity Observation"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<value code="6736007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Moderate" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '743 - 806',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.30"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.30"/>\n\t\t\t\t\t\t\t<id root="b03805bd-2eb6-4ab8-a9ff-473c6653971a"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t<low nullFlavor="NA"/>\n\t\t\t\t\t\t\t\t<high value="19800501"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<time value="19800501"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN" negationInd="true">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<id root="4adc1020-7b14-11db-9fe1-0800200c9a66"/>\n\t\t\t\t\t\t\t\t\t<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>\n\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t<reference value="#allergytype3"/>\n\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime nullFlavor="NA"/>\n\t\t\t\t\t\t\t\t\t<value code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction3"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t<participant typeCode="CSM">\n\t\t\t\t\t\t\t\t\t\t<participantRole classCode="MANU">\n\t\t\t\t\t\t\t\t\t\t\t<playingEntity classCode="MMAT">\n\t\t\t\t\t\t\t\t\t\t\t\t<code code="81982" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Clindamycin Hydrochloride">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product3"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\t\t</playingEntity>\n\t\t\t\t\t\t\t\t\t\t</participantRole>\n\t\t\t\t\t\t\t\t\t</participant>\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Allergies_Status_with_Author_Timestamp.xml',
                  ],
                  igReferences: ['Section 2.4.1: Allergies and Intolerances Section'],
                  description: 'Each entry has to be linked to related narrative text',
                },
                {
                  rule: 'All Template Ids should be Valid with correct extension value',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Reaction Observation in the Allergy template is a SHOULD, this Rubic takes it to a SHALL. Preference is to have a Reaction present and Null the value if the reaction is uknown',
                  numberOfIssues: 1,
                  issuesList: [
                    {
                      lineNumber: '770 - 804',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN" negationInd="true">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.7"/>\n\t\t\t\t\t\t\t\t\t<id root="4adc1020-7b14-11db-9fe1-0800200c9a66"/>\n\t\t\t\t\t\t\t\t\t<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>\n\t\t\t\t\t\t\t\t\t<text>\n\t\t\t\t\t\t\t\t\t\t<reference value="#allergytype3"/>\n\t\t\t\t\t\t\t\t\t</text>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime nullFlavor="NA"/>\n\t\t\t\t\t\t\t\t\t<value code="419511003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Propensity to adverse reaction to drug" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t<reference value="#reaction3"/>\n\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t<participant typeCode="CSM">\n\t\t\t\t\t\t\t\t\t\t<participantRole classCode="MANU">\n\t\t\t\t\t\t\t\t\t\t\t<playingEntity classCode="MMAT">\n\t\t\t\t\t\t\t\t\t\t\t\t<code code="81982" codeSystem="2.16.840.1.113883.6.88" codeSystemName="RxNorm" displayName="Clindamycin Hydrochloride">\n\t\t\t\t\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t<reference value="#product3"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\t\t</playingEntity>\n\t\t\t\t\t\t\t\t\t\t</participantRole>\n\t\t\t\t\t\t\t\t\t</participant>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Allergies_Status_with_Author_Timestamp.xml',
                  ],
                  igReferences: ['Section 2.4.1: Allergies and Intolerances Section'],
                  description:
                    'Reaction Observation in the Allergy template is a SHOULD, this Rubic takes it to a SHALL. Preference is to have a Reaction present and Null the value if the reaction is uknown',
                },
                {
                  rule: 'Author entry must include at least a timestamp with information of the last modified date and be present within the Allergies entry, which could be at the concern or observation level.',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Allergies should be structured in UNII, NDF-RT, SNOMED or RxNorm',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
              ],
              numberOfIssues: 10,
              numberOfChecks: 34,
              numberOfFailedRubrics: 3,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Encounters',
              categoryGrade: 'C',
              categoryNumericalScore: 75,
              categoryRubrics: [
                {
                  rule: 'EffectiveDate/Time elements have the right time and timezone offsets',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'EffectiveDate/Times for all historical activities should be within the lifespan on the patient',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
                  numberOfIssues: 4,
                  issuesList: [
                    {
                      lineNumber: '1470',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="46240-8" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="History of encounters"/>',
                    },
                    {
                      lineNumber: '1498',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="99213" codeSystem="2.16.840.1.113883.6.12" codeSystemName="CPT-4" displayName="Office outpatient visit 15 minutes">\n\t\t\t\t\t\t\t\t<originalText>\n\t\t\t\t\t\t\t\t\t<reference value="#Encounter1"/>\n\t\t\t\t\t\t\t\t</originalText>\n\t\t\t\t\t\t\t\t        <translation code="AMB" codeSystem="2.16.840.1.113883.5.4" codeSystemName="HL7 ActEncounterCode" displayName="Ambulatory"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1542',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="404684003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Finding">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1551',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="386661006" codeSystem="2.16.840.1.113883.6.96" displayName="Fever" xsi:type="CD"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/ENC_Encounter_hospitalization_with_diagnoses.xml',
                  ],
                  igReferences: ['Section 2.16: Encounters'],
                  description:
                    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
                },
                {
                  rule: 'Each entry has to be linked to related narrative text',
                  numberOfIssues: 1,
                  issuesList: [
                    {
                      lineNumber: '1537 - 1552',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.19"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.19"/>\n\t\t\t\t\t\t\t\t\t<id extension="45665" root="db734647-fc99-424c-a864-7e3cda82e703"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<code code="404684003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Finding">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="386661006" codeSystem="2.16.840.1.113883.6.96" displayName="Fever" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/ENC_Encounter_hospitalization_with_diagnoses.xml',
                  ],
                  igReferences: ['Section 2.16: Encounters'],
                  description: 'Each entry has to be linked to related narrative text',
                },
                {
                  rule: 'All Template Ids should be Valid with correct extension value',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'A document with an encompassingEncounter AND encounter activities should reiterate the encompassing encounter in an encounter activity and the information must align',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
              ],
              numberOfIssues: 5,
              numberOfChecks: 15,
              numberOfFailedRubrics: 2,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Laboratory Tests and Results',
              categoryGrade: null,
              categoryNumericalScore: 0,
              categoryRubrics: [],
              numberOfIssues: 0,
              numberOfChecks: 82,
              numberOfFailedRubrics: 3,
              certificationFeedback: true,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Problems',
              categoryGrade: 'D',
              categoryNumericalScore: 58,
              categoryRubrics: [
                {
                  rule: 'EffectiveDate/Time elements have the right time and timezone offsets',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'EffectiveDate/Times for all historical activities should be within the lifespan on the patient',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
                  numberOfIssues: 19,
                  issuesList: [
                    {
                      lineNumber: '1138',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="11450-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="PROBLEM LIST"/>',
                    },
                    {
                      lineNumber: '1207',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1221',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="59621000" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Essential hypertension" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1211',
                      xmlString:
                        '<translation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>',
                    },
                    {
                      lineNumber: '1255',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1269',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="83986005" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Severe Hypothyroidism" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1259',
                      xmlString:
                        '<translation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>',
                    },
                    {
                      lineNumber: '1296',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1310',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="236578006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Chronic rejection of renal transplant" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1300',
                      xmlString:
                        '<translation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>',
                    },
                    {
                      lineNumber: '1337',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1351',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="386661006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Fever" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1341',
                      xmlString:
                        '<translation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>',
                    },
                    {
                      lineNumber: '1380',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1394',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="238131007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Overweight" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1384',
                      xmlString:
                        '<translation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>',
                    },
                    {
                      lineNumber: '1435',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="55607006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Problem">\n\t\t\t\t\t\t\t\t\t\t<translation code="75326-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Problem"/>\n\t\t\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1450',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="44054006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diabetes Mellitus Type 2" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t<originalText><reference value="#problemTypeNoDiabetes"/></originalText>\n\t\t\t\t\t\t\t\t\t</value>',
                    },
                    {
                      lineNumber: '1436',
                      xmlString:
                        '<translation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="75326-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Problem"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Problems_Section_20140226.xml',
                  ],
                  igReferences: ['Section 2.53.1: Problem Section'],
                  description:
                    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
                },
                {
                  rule: 'All problem codes are should express with core subset of SNOMED codes',
                  numberOfIssues: 6,
                  issuesList: [
                    {
                      lineNumber: '1221',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="59621000" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Essential hypertension" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1269',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="83986005" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Severe Hypothyroidism" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1310',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="236578006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Chronic rejection of renal transplant" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1351',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="386661006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Fever" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1394',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="238131007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Overweight" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1450',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="44054006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diabetes Mellitus Type 2" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t<originalText><reference value="#problemTypeNoDiabetes"/></originalText>\n\t\t\t\t\t\t\t\t\t</value>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Problems_Section_20140226.xml',
                  ],
                  igReferences: ['Section 3.79: Problem Observation'],
                  description: 'code validation Rubric failed for Problems',
                },
                {
                  rule: 'Problem Concern effective times reflect the appropriate problem concern status',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Each entry has to be linked to related narrative text',
                  numberOfIssues: 11,
                  issuesList: [
                    {
                      lineNumber: '1179 - 1232',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45de7"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20111005"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<time value="20111005"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a66"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20111005"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="59621000" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Essential hypertension" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\t\t<time value="200808141030-0800"/>\n\t\t\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1202 - 1230',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a66"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20111005"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="59621000" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Essential hypertension" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\t\t<time value="200808141030-0800"/>\n\t\t\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1235 - 1273',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45de8"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a68"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="83986005" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Severe Hypothyroidism" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1250 - 1271',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a68"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="83986005" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Severe Hypothyroidism" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1276 - 1314',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45de9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a69"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="236578006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Chronic rejection of renal transplant" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1291 - 1312',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a69"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="236578006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Chronic rejection of renal transplant" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1317 - 1355',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45df9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a79"/>\n\t\t\t\t\t\t\t\t\t<code code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="386661006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Fever" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1332 - 1353',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a79"/>\n\t\t\t\t\t\t\t\t\t<code code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="386661006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Fever" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1358 - 1398',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45df9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<high value="20070601"/>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c2b11"/>\n\t\t\t\t\t\t\t\t\t<code code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<high value="20070601"/>\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="238131007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Overweight" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1375 - 1396',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c2b11"/>\n\t\t\t\t\t\t\t\t\t<code code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<high value="20070601"/>\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="238131007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Overweight" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1401 - 1456',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45df9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low nullFlavor="NI"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<high nullFlavor="NI"/>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN" negationInd="true">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-2222222x2z33"/>\n\t\t\t\t\t\t\t\t\t<code code="55607006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Problem">\n\t\t\t\t\t\t\t\t\t\t<translation code="75326-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Problem"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t<text><reference value="#problemsNoDiabetes"/></text>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low nullFlavor="NI"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<high nullFlavor="NI"/>\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="44054006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diabetes Mellitus Type 2" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t<originalText><reference value="#problemTypeNoDiabetes"/></originalText>\n\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Problems_Section_20140226.xml',
                  ],
                  igReferences: ['Section 2.53.1: Problem Section'],
                  description: 'Each entry has to be linked to related narrative text',
                },
                {
                  rule: 'All Template Ids should be Valid with correct extension value',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'The problem observation value should not be set to the problem observation code (problem type value set)',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Author entry must include the most recent author with at least a timestamp with information of the last modified date and be present within the Problems entry, which could be at the concern or observation level.',
                  numberOfIssues: 5,
                  issuesList: [
                    {
                      lineNumber: '1235 - 1273',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45de8"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a68"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="83986005" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Severe Hypothyroidism" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1276 - 1314',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45de9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a69"/>\n\t\t\t\t\t\t\t\t\t<code code="64572001" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Condition">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="75323-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Condition"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="236578006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Chronic rejection of renal transplant" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1317 - 1355',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45df9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="active"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c9a79"/>\n\t\t\t\t\t\t\t\t\t<code code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="386661006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Fever" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1358 - 1398',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45df9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20061231"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<high value="20070601"/>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-0800200c2b11"/>\n\t\t\t\t\t\t\t\t\t<code code="29308" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diagnosis">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<translation code="29308-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Diagnosis"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<high value="20070601"/>\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="238131007" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Overweight" xsi:type="CD"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                    {
                      lineNumber: '1401 - 1456',
                      xmlString:
                        '<act xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="ACT" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.3"/>\n\t\t\t\t\t\t\t<id root="ec8a6ff8-ed4b-4f7e-82c3-e98e58b45df9"/>\n\t\t\t\t\t\t\t<code code="CONC" codeSystem="2.16.840.1.113883.5.6" displayName="Concern"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low nullFlavor="NI"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<high nullFlavor="NI"/>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<entryRelationship typeCode="SUBJ">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN" negationInd="true">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.4"/>\n\t\t\t\t\t\t\t\t\t<id root="ab1791b0-5c71-11db-b0de-2222222x2z33"/>\n\t\t\t\t\t\t\t\t\t<code code="55607006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Problem">\n\t\t\t\t\t\t\t\t\t\t<translation code="75326-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Problem"/>\n\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t<text><reference value="#problemsNoDiabetes"/></text>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<low nullFlavor="NI"/>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<high nullFlavor="NI"/>\t\n\t\t\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\t\t<value code="44054006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName="Diabetes Mellitus Type 2" xsi:type="CD">\n\t\t\t\t\t\t\t\t\t<originalText><reference value="#problemTypeNoDiabetes"/></originalText>\n\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</observation>\n\t\t\t\t\t\t\t</entryRelationship>\n\t\t\t\t\t\t</act>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/brettmarquard/HL7-C-CDA-Task-Force-Examples/blob/master/No_Known_Problems_Section_20140226.xml',
                  ],
                  igReferences: ['Section 2.53.1: Problem Section'],
                  description:
                    'Author entry must include the most recent author with at least a timestamp with information of the last modified date and be present within the Problems entry, which could be at the concern or observation level.',
                },
              ],
              numberOfIssues: 41,
              numberOfChecks: 100,
              numberOfFailedRubrics: 4,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Procedures',
              categoryGrade: 'D',
              categoryNumericalScore: 33,
              categoryRubrics: [
                {
                  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
                  numberOfIssues: 4,
                  issuesList: [
                    {
                      lineNumber: '2068',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="47519-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="HISTORY OF PROCEDURES"/>',
                    },
                    {
                      lineNumber: '2096',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="56251003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Nebulizer Therapy">\n\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '2137',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="175135009" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Introduction of cardiac pacemaker system via vein">\n\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '2182',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="704708004" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Cardiac resynchronization therapy implantable pacemaker">\n\t\t\t\t\t\t\t</code>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/PROCEDURE_Observation_Example.xml',
                  ],
                  igReferences: ['Section 2.61.1 :Procedures Section'],
                  description:
                    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
                },
                {
                  rule: 'Each entry has to be linked to related narrative text',
                  numberOfIssues: 3,
                  issuesList: [
                    {
                      lineNumber: '2091 - 2129',
                      xmlString:
                        '<procedure xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="PROC" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.14"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.14"/>\n\t\t\t\t\t\t\t<id root="d68b7e32-7810-4f5b-9cc2-acd54b0fd85d"/>\n\t\t\t\t\t\t\t<code code="56251003" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Nebulizer Therapy">\n\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime value="20150622"/>\n\t\t\t\t\t\t\t<methodCode nullFlavor="UNK"/>\n\t\t\t\t\t\t\t<targetSiteCode code="82094008" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Lower Respiratory Tract Structure"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<performer>\n\t\t\t\t\t\t\t\t<assignedEntity>\n\t\t\t\t\t\t\t\t\t<id extension="2981823" root="2.16.840.1.113883.19.5.9999.456"/>\n\t\t\t\t\t\t\t\t\t<addr use="WP">\n\t\t\t\t\t\t\t\t\t\t<streetAddressLine>2472 Rocky place</streetAddressLine>\n\t\t\t\t\t\t\t\t\t\t<city>Beaverton</city>\n\t\t\t\t\t\t\t\t\t\t<state>OR</state>\n\t\t\t\t\t\t\t\t\t\t<postalCode>97006</postalCode>\n\t\t\t\t\t\t\t\t\t\t<country>US</country>\n\t\t\t\t\t\t\t\t\t</addr>\n\t\t\t\t\t\t\t\t\t<telecom use="WP" value="tel:+1(555)-555-1002"/>\n\t\t\t\t\t\t\t\t\t<representedOrganization>\n\t\t\t\t\t\t\t\t\t\t<id extension="99999999" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t<name>Neighborhood Physicians Practice</name>\n\t\t\t\t\t\t\t\t\t\t<telecom use="WP" value="tel:+1(555)-555-1002"/>\n\t\t\t\t\t\t\t\t\t\t<addr use="WP">\n\t\t\t\t\t\t\t\t\t\t\t<streetAddressLine>2472 Rocky place</streetAddressLine>\n\t\t\t\t\t\t\t\t\t\t\t<city>Beaverton</city>\n\t\t\t\t\t\t\t\t\t\t\t<state>OR</state>\n\t\t\t\t\t\t\t\t\t\t\t<postalCode>97006</postalCode>\n\t\t\t\t\t\t\t\t\t\t\t<country>US</country>\n\t\t\t\t\t\t\t\t\t\t</addr>\n\t\t\t\t\t\t\t\t\t</representedOrganization>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</assignedEntity>\n\t\t\t\t\t\t\t</performer>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</procedure>',
                    },
                    {
                      lineNumber: '2132 - 2170',
                      xmlString:
                        '<procedure xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="PROC" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.14"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.14"/>\n\t\t\t\t\t\t\t<id root="d68b7e32-7810-4f5b-9cc2-acd54b0fd85e"/>\n\t\t\t\t\t\t\t<code code="175135009" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Introduction of cardiac pacemaker system via vein">\n\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime value="20111005"/>\n\t\t\t\t\t\t\t<methodCode nullFlavor="UNK"/>\n\t\t\t\t\t\t\t<targetSiteCode code="9454009" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Structure of subclavian vein"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<performer>\n\t\t\t\t\t\t\t\t<assignedEntity>\n\t\t\t\t\t\t\t\t\t<id extension="2981823" root="2.16.840.1.113883.19.5.9999.456"/>\n\t\t\t\t\t\t\t\t\t<addr use="WP">\n\t\t\t\t\t\t\t\t\t\t<streetAddressLine>3525 Newberry Avenue</streetAddressLine>\n\t\t\t\t\t\t\t\t\t\t<city>Beaverton</city>\n\t\t\t\t\t\t\t\t\t\t<state>OR</state>\n\t\t\t\t\t\t\t\t\t\t<postalCode>97006</postalCode>\n\t\t\t\t\t\t\t\t\t\t<country>US</country>\n\t\t\t\t\t\t\t\t\t</addr>\n\t\t\t\t\t\t\t\t\t<telecom use="WP" value="tel:+1(555)-555-5000"/>\n\t\t\t\t\t\t\t\t\t<representedOrganization classCode="ORG">\n\t\t\t\t\t\t\t\t\t\t<id root="2.16.840.1.113883.19.5.9999.1393"/>\n\t\t\t\t\t\t\t\t\t\t<name>Community Health Hospitals</name>\n\t\t\t\t\t\t\t\t\t\t<telecom use="WP" value="tel:+1(555)-555-5000"/>\n\t\t\t\t\t\t\t\t\t\t<addr use="WP">\n\t\t\t\t\t\t\t\t\t\t\t<streetAddressLine>3525 Newberry Avenue</streetAddressLine>\n\t\t\t\t\t\t\t\t\t\t\t<city>Beaverton</city>\n\t\t\t\t\t\t\t\t\t\t\t<state>OR</state>\n\t\t\t\t\t\t\t\t\t\t\t<postalCode>97006</postalCode>\n\t\t\t\t\t\t\t\t\t\t\t<country>US</country>\n\t\t\t\t\t\t\t\t\t\t</addr>\n\t\t\t\t\t\t\t\t\t</representedOrganization>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</assignedEntity>\n\t\t\t\t\t\t\t</performer>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</procedure>',
                    },
                    {
                      lineNumber: '2176 - 2234',
                      xmlString:
                        '<procedure xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="PROC" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.14"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.14"/>\n\t\t\t\t\t\t\t<id root="d68b7e32-7810-4f5b-9cc2-acd54b0ge76f"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="704708004" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Cardiac resynchronization therapy implantable pacemaker">\n\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime value="20100101"/>\n\t\t\t\t\t\t\t<methodCode nullFlavor="UNK"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<targetSiteCode code="9454009" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Structure of subclavian vein"/>\n\t\t\t\t\t\t\t<performer>\n\t\t\t\t\t\t\t\t<assignedEntity>\n\t\t\t\t\t\t\t\t\t<id extension="2981823" root="2.16.840.1.113883.19.5.9999.456"/>\n\t\t\t\t\t\t\t\t\t<addr use="WP">\n\t\t\t\t\t\t\t\t\t\t<streetAddressLine>3525 Newberry Avenue</streetAddressLine>\n\t\t\t\t\t\t\t\t\t\t<city>Beaverton</city>\n\t\t\t\t\t\t\t\t\t\t<state>OR</state>\n\t\t\t\t\t\t\t\t\t\t<postalCode>97006</postalCode>\n\t\t\t\t\t\t\t\t\t\t<country>US</country>\n\t\t\t\t\t\t\t\t\t</addr>\n\t\t\t\t\t\t\t\t\t<telecom use="WP" value="tel:+1(555)-555-5000"/>\n\t\t\t\t\t\t\t\t\t<representedOrganization classCode="ORG">\n\t\t\t\t\t\t\t\t\t\t<id root="2.16.840.1.113883.19.5.9999.1393"/>\n\t\t\t\t\t\t\t\t\t\t<name>Community Health Hospitals</name>\n\t\t\t\t\t\t\t\t\t\t<telecom use="WP" value="tel:+1(555)-555-5000"/>\n\t\t\t\t\t\t\t\t\t\t<addr use="WP">\n\t\t\t\t\t\t\t\t\t\t\t<streetAddressLine>3525 Newberry Avenue</streetAddressLine>\n\t\t\t\t\t\t\t\t\t\t\t<city>Beaverton</city>\n\t\t\t\t\t\t\t\t\t\t\t<state>OR</state>\n\t\t\t\t\t\t\t\t\t\t\t<postalCode>97006</postalCode>\n\t\t\t\t\t\t\t\t\t\t\t<country>US</country>\n\t\t\t\t\t\t\t\t\t\t</addr>\n\t\t\t\t\t\t\t\t\t</representedOrganization>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</assignedEntity>\n\t\t\t\t\t\t\t</performer>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<participant typeCode="DEV">\n\t\t\t\t\t\t\t\t<participantRole classCode="MANU">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.37"/>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<id nullFlavor="UNK"/>\n\t\t\t\t\t\t\t\t\t<playingDevice>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<code code="704708004" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Cardiac resynchronization therapy implantable pacemaker">\n\t\t\t\t\t\t\t\t\t\t</code>\n\t\t\t\t\t\t\t\t\t</playingDevice>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<scopingEntity>\n\t\t\t\t\t\t\t\t\t\t<id root="2.16.840.1.113883.3.3719"/>\n\t\t\t\t\t\t\t\t\t</scopingEntity>\n\t\t\t\t\t\t\t\t</participantRole>\n\t\t\t\t\t\t\t</participant>\n\t\t\t\t\t\t</procedure>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/PROCEDURE_Observation_Example.xml',
                  ],
                  igReferences: ['Section 2.61.1 :Procedures Section'],
                  description: 'Each entry has to be linked to related narrative text',
                },
                {
                  rule: 'All Template Ids should be Valid with correct extension value',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
              ],
              numberOfIssues: 7,
              numberOfChecks: 15,
              numberOfFailedRubrics: 2,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Social History',
              categoryGrade: 'D',
              categoryNumericalScore: 54,
              categoryRubrics: [
                {
                  rule: 'EffectiveDate/Time elements have the right time and timezone offsets',
                  numberOfIssues: 1,
                  issuesList: [
                    {
                      lineNumber: '2043 - 2043',
                      xmlString:
                        '<effectiveTime xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" value="201506221130"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/SMOKING_Former_Smoker.xml',
                  ],
                  igReferences: ['Section 2.66: Social History Section'],
                  description:
                    'EffectiveTime elements in the section are expected to have timeoffsets along with the date and are typically nonzero timeoffsets. In addition they are expected to have the timezone information for proper interpretation.For e.g if the time is being defaulted to 000000 for hours, minutes and seconds for multiple entries it might be worth checking if the data was entered properly. Also if the time offsets are present without a timezone, the time may be interpreted incorrectly, hence timezones should be specified as part of the time element.',
                },
                {
                  rule: 'EffectiveDate/Times for all historical activities should be within the lifespan on the patient',
                  numberOfIssues: 1,
                  issuesList: [
                    {
                      lineNumber: '2043 - 2043',
                      xmlString:
                        '<effectiveTime xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" value="201506221130"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/SMOKING_Former_Smoker.xml',
                  ],
                  igReferences: ['Section 2.66: Social History Section'],
                  description:
                    " EffectiveDate/Times for historical events should be greater than the patient's date of birth and less than the earliest of current time or patient's date of death. ",
                },
                {
                  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
                  numberOfIssues: 4,
                  issuesList: [
                    {
                      lineNumber: '1943',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="29762-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Social History"/>',
                    },
                    {
                      lineNumber: '2021',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '2046',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker" xsi:type="CD"/>',
                    },
                    {
                      lineNumber: '1990',
                      xmlString:
                        '<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="428071000124103" codeSystem="2.16.840.1.113883.6.96" displayName="Heavy tobacco smoker" xsi:type="CD"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/SMOKING_Former_Smoker.xml',
                  ],
                  igReferences: ['Section 2.66: Social History Section'],
                  description:
                    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
                },
                {
                  rule: 'Smoking status code value should be valid',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Smoking status observation Template Id should be valid',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Systems should capture birth sex independent of the Administrative Gender and encode them as an observation in the Social History Section',
                  numberOfIssues: 1,
                  issuesList: [
                    {
                      lineNumber: '1939 - 2058',
                      xmlString:
                        '<section xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n\t\t\t\t\t\n\t\t\t\t\t<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.2.17"/>\n\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.2.17"/>\n\t\t\t\t\t<code code="29762-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Social History"/>\n\t\t\t\t\t<title>SOCIAL HISTORY</title>\n\t\t\t\t\t<text>\n\t\t\t\t\t\t<table border="1" width="100%">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>Social History Observation</th>\n\t\t\t\t\t\t\t\t\t<th>Description</th>\n\t\t\t\t\t\t\t\t\t<th>Dates Observed</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>Smoking Status</td>\n\t\t\t\t\t\t\t\t\t<td>Heavy tobacco smoker, ??-??/day</td>\n\t\t\t\t\t\t\t\t\t<td>May 1, 2005 - February 27, 2011</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>Smoking Status</td>\n\t\t\t\t\t\t\t\t\t<td>Current every day smoker</td>\n\t\t\t\t\t\t\t\t\t<td>February 27, 2011</td>\n\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td>Current Smoking Status</td>\n\t\t\t\t\t\t\t\t\t<td>Current every day</td>\n\t\t\t\t\t\t\t\t\t<td>June 22, 2015</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</text>\n\t\t\t\t\t\n\t\t\t\t\t<entry typeCode="DRIV">\n\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.85"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.85"/>\n\t\t\t\t\t\t\t<id root="45efb604-7049-4a2e-ad33-d38556c9636c"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="11367-0" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="History of tobacco use"/>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20050501"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<high value="20110227"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<value code="428071000124103" codeSystem="2.16.840.1.113883.6.96" displayName="Heavy tobacco smoker" xsi:type="CD"/>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t<time value="201209101145-0800"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t</observation>\n\t\t\t\t\t</entry>\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t<entry typeCode="DRIV">\n\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<id extension="123456789" root="2.16.840.1.113883.19"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="72166-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tobacco smoking status NHIS"/>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<effectiveTime value="20110227"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<value code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker" xsi:type="CD"/>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t<time value="201209101145-0800"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t</observation>\n\t\t\t\t\t</entry>\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t<entry typeCode="DRIV">\n\t\t\t\t\t\t<observation classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<id extension="123456789" root="2.16.840.1.113883.19"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="72166-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tobacco smoking status NHIS"/>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<effectiveTime value="201506221130"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<value code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker" xsi:type="CD"/>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t<time value="201209101145-0800"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t</observation>\n\t\t\t\t\t</entry>\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t</section>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/SMOKING_Former_Smoker.xml',
                  ],
                  igReferences: ['Section 3.101: Social History Observation'],
                  description:
                    'Systems should capture birth sex independent of the Administrative Gender and encode them as an observation in the Social History Section.',
                },
                {
                  rule: 'Each entry has to be linked to related narrative text',
                  numberOfIssues: 3,
                  issuesList: [
                    {
                      lineNumber: '2009 - 2030',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<id extension="123456789" root="2.16.840.1.113883.19"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="72166-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tobacco smoking status NHIS"/>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<effectiveTime value="20110227"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<value code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker" xsi:type="CD"/>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t<time value="201209101145-0800"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '2034 - 2055',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.78"/>\n\t\t\t\t\t\t\t<id extension="123456789" root="2.16.840.1.113883.19"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="72166-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tobacco smoking status NHIS"/>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<effectiveTime value="201506221130"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<value code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker" xsi:type="CD"/>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t<time value="201209101145-0800"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1975 - 1999',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.85"/>\n\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.85"/>\n\t\t\t\t\t\t\t<id root="45efb604-7049-4a2e-ad33-d38556c9636c"/>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<code code="11367-0" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="History of tobacco use"/>\n\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t<effectiveTime>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<low value="20050501"/>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<high value="20110227"/>\n\t\t\t\t\t\t\t</effectiveTime>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<value code="428071000124103" codeSystem="2.16.840.1.113883.6.96" displayName="Heavy tobacco smoker" xsi:type="CD"/>\n\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t<time value="201209101145-0800"/>\n\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t</observation>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/SMOKING_Former_Smoker.xml',
                  ],
                  igReferences: ['Section 2.66: Social History Section'],
                  description: 'Each entry has to be linked to related narrative text',
                },
                {
                  rule: 'All Template Ids should be Valid with correct extension value',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
              ],
              numberOfIssues: 10,
              numberOfChecks: 28,
              numberOfFailedRubrics: 5,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
            {
              categoryName: 'Vital Signs',
              categoryGrade: 'D',
              categoryNumericalScore: 63,
              categoryRubrics: [
                {
                  rule: 'EffectiveDate/Time elements have the right time and timezone offsets',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'EffectiveDate/Times for all historical activities should be within the lifespan on the patient',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'The Display Names used by the structured data should match the Display Name (Preferred Name) within the Terminology',
                  numberOfIssues: 6,
                  issuesList: [
                    {
                      lineNumber: '1806',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8716-3" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="VITAL SIGNS"/>',
                    },
                    {
                      lineNumber: '1838',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="46680005" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Vital signs">\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<translation code="74728-7" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Vital signs"/>\n\t\t\t\t\t\t\t</code>',
                    },
                    {
                      lineNumber: '1853',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8302-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Height"/>',
                    },
                    {
                      lineNumber: '1874',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="3141-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Patient Body Weight - Measured"/>',
                    },
                    {
                      lineNumber: '1895',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8462-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="BP Diastolic"/>',
                    },
                    {
                      lineNumber: '1916',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8480-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Intravascular Systolic"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/VITALS_Complete_Panel_Metric.xml',
                  ],
                  igReferences: ['Section 2.70.1: Vital Signs Section'],
                  description:
                    'Each of the code systems, value sets specified by the C-CDA IG refers back to standard terminologies like SNOMED-CT, LOINC, RxNorm, ICD9, ICD10. When codes from these codesystems are used to represent structured data the display name corresponding to the code should be used as part of the document',
                },
                {
                  rule: 'The Vital Sign Observation entries should use LOINC codes to represent the type of vital sign being captured',
                  numberOfIssues: 4,
                  issuesList: [
                    {
                      lineNumber: '1853',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8302-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Height"/>',
                    },
                    {
                      lineNumber: '1874',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="3141-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Patient Body Weight - Measured"/>',
                    },
                    {
                      lineNumber: '1895',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8462-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="BP Diastolic"/>',
                    },
                    {
                      lineNumber: '1916',
                      xmlString:
                        '<code xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" code="8480-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Intravascular Systolic"/>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/VITALS_Complete_Panel_Metric.xml',
                  ],
                  igReferences: ['Section 3.108: Vital Sign Observation'],
                  description:
                    'Each of the vital sign observation present in the document should use the recommended LOINC codes to represent the vital sign.',
                },
                {
                  rule: 'Each of the Vital Sign Observations should use the recommended UCUM units to represent the vital sign measurement result',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'The EffectiveDate/Time elements for the Vital Sign Organizer must encompass the underlying observations',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
                {
                  rule: 'Each entry has to be linked to related narrative text',
                  numberOfIssues: 4,
                  issuesList: [
                    {
                      lineNumber: '1848 - 1866',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<id root="ed9589fd-fda0-41f7-a3d0-dc537554f5c2"/>\n\t\t\t\t\t\t\t\t\t<code code="8302-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Height"/>\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime value="20150622"/>\n\t\t\t\t\t\t\t\t\t<value unit="cm" value="177" xsi:type="PQ"/>\n\t\t\t\t\t\t\t\t\t<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>\n\t\t\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\t\t<time value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1869 - 1887',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<id root="f4e729e2-a97f-4a7e-8e23-c92f9b6b55cf"/>\n\t\t\t\t\t\t\t\t\t<code code="3141-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Patient Body Weight - Measured"/>\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime value="20150622"/>\n\t\t\t\t\t\t\t\t\t<value unit="kg" value="88" xsi:type="PQ"/>\n\t\t\t\t\t\t\t\t\t<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>\n\t\t\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\t\t<time value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1890 - 1908',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<id root="1c2748b7-e440-41ba-bc01-dde97d84a036"/>\n\t\t\t\t\t\t\t\t\t<code code="8462-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="BP Diastolic"/>\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime value="20150622"/>\n\t\t\t\t\t\t\t\t\t<value unit="mm[Hg]" value="88" xsi:type="PQ"/>\n\t\t\t\t\t\t\t\t\t<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>\n\t\t\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\t\t<time value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                    {
                      lineNumber: '1911 - 1929',
                      xmlString:
                        '<observation xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" classCode="OBS" moodCode="EVN">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<templateId extension="2014-06-09" root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.27"/>\n\t\t\t\t\t\t\t\t\t<id root="a0e39c70-9674-4b2a-9837-cdf74200d8d5"/>\n\t\t\t\t\t\t\t\t\t<code code="8480-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Intravascular Systolic"/>\n\t\t\t\t\t\t\t\t\t<statusCode code="completed"/>\n\t\t\t\t\t\t\t\t\t<effectiveTime value="20150622"/>\n\t\t\t\t\t\t\t\t\t<value unit="mm[Hg]" value="145" xsi:type="PQ"/>\n\t\t\t\t\t\t\t\t\t<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>\n\t\t\t\t\t\t\t\t\t<author typeCode="AUT">\n\t\t\t\t\t\t\t\t\t\t<templateId root="2.16.840.1.113883.10.20.22.4.119"/>\n\t\t\t\t\t\t\t\t\t\t<time value="20150622"/>\n\t\t\t\t\t\t\t\t\t\t<assignedAuthor>\n\t\t\t\t\t\t\t\t\t\t\t<id extension="555555555" root="2.16.840.1.113883.4.6"/>\n\t\t\t\t\t\t\t\t\t\t\t<code code="207QA0505X" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)" displayName="Adult Medicine"/>\n\t\t\t\t\t\t\t\t\t\t</assignedAuthor>\n\t\t\t\t\t\t\t\t\t</author>\n\t\t\t\t\t\t\t\t</observation>',
                    },
                  ],
                  exampleTaskForceLinks: [
                    'https://github.com/jddamore/HL7-Task-Force-Examples/blob/master/VITALS_Complete_Panel_Metric.xml',
                  ],
                  igReferences: ['Section 2.70.1: Vital Signs Section'],
                  description: 'Each entry has to be linked to related narrative text',
                },
                {
                  rule: 'All Template Ids should be Valid with correct extension value',
                  numberOfIssues: 0,
                  issuesList: [],
                  exampleTaskForceLinks: [],
                  igReferences: [],
                  description: null,
                },
              ],
              numberOfIssues: 14,
              numberOfChecks: 44,
              numberOfFailedRubrics: 3,
              certificationFeedback: false,
              failingConformance: false,
              nullFlavorNI: false,
            },
          ],
          numberOfIssues: 87,
          igReferenceUrl: 'http://www.hl7.org/implement/standards/product_brief.cfm?product_id=379',
          industryAverageScore: 84,
          industryAverageGrade: 'B-',
          numberOfDocumentsScored: 455,
          ccdaVersion: 'R2.1',
          passedCertification: null,
          numberOfDocsScoredPerCcdaDocumentType: 423,
          industryAverageScoreForCcdaDocumentType: 83,
          industryAverageGradeForCcdaDocumentType: 'B-',
          numberOfRules: 44,
          totalElementsChecked: 384,
          numberOfFailedRules: 22,
          totalCertificationErrorChecks: 175,
          totalConformanceErrorChecks: 6280,
          totalGradesGiven: {
            aPlusGrades: 130,
            aMinusGrades: 56,
            bPlusGrades: 62,
            bMinusGrades: 63,
            cGrades: 81,
            dGrades: 72,
          },
        },
        referenceResults: [
          {
            type: 'C-CDA IG Conformance Errors',
            totalErrorCount: 7,
            referenceErrors: [
              {
                description:
                  'Consol Medication Activity2 SHOULD contain zero or one [0..1] routeCode, which SHALL be selected from ValueSet SPL Drug Route of Administration Terminology 2.16.840.1.113883.3.88.12.3221.8.7 DYNAMIC (CONF:1098-7514, DSTU:1276)',
                type: 'C-CDA MDHT Conformance Error',
                xPath:
                  '/ClinicalDocument/component/structuredBody/component[2]/section/entry[4]/substanceAdministration',
                validatorConfiguredXpath: null,
                documentLineNumber: '970',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description:
                  'Consol Medication Activity2 MAY contain zero or one [0..1] administrationUnitCode, which SHALL be selected from ValueSet AdministrationUnitDoseForm 2.16.840.1.113762.1.4.1021.30 DYNAMIC (CONF:1098-7519)',
                type: 'C-CDA MDHT Conformance Error',
                xPath:
                  '/ClinicalDocument/component/structuredBody/component[2]/section/entry[5]/substanceAdministration',
                validatorConfiguredXpath: null,
                documentLineNumber: '1006',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description:
                  'Consol Medication Activity2 MAY contain zero or one [0..1] administrationUnitCode, which SHALL be selected from ValueSet AdministrationUnitDoseForm 2.16.840.1.113762.1.4.1021.30 DYNAMIC (CONF:1098-7519)',
                type: 'C-CDA MDHT Conformance Error',
                xPath:
                  '/ClinicalDocument/component/structuredBody/component[2]/section/entry[6]/substanceAdministration',
                validatorConfiguredXpath: null,
                documentLineNumber: '1047',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description:
                  'Consol Medication Activity2 MAY contain zero or one [0..1] administrationUnitCode, which SHALL be selected from ValueSet AdministrationUnitDoseForm 2.16.840.1.113762.1.4.1021.30 DYNAMIC (CONF:1098-7519)',
                type: 'C-CDA MDHT Conformance Error',
                xPath:
                  '/ClinicalDocument/component/structuredBody/component[2]/section/entry[7]/substanceAdministration',
                validatorConfiguredXpath: null,
                documentLineNumber: '1088',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description:
                  'Consol Immunization Medication Information2 SHALL contain exactly one [1..1] manufacturedMaterial, where its type is Immunization Medication Information Manufactured Material (CONF:1098-9006) manufacturedMaterial SHALL contain exactly one [1..1] code, which SHALL be selected from ValueSet CVX Vaccines Administered - Vaccine Set 2.16.840.1.113762.1.4.1010.6 DYNAMIC (CONF:1098-9007)',
                type: 'C-CDA MDHT Conformance Error',
                xPath:
                  '/ClinicalDocument/component/structuredBody/component[5]/section/entry/substanceAdministration/consumable/manufacturedProduct/manufacturedMaterial',
                validatorConfiguredXpath: null,
                documentLineNumber: '1620',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Immunizations',
              },
              {
                description:
                  'Consol Immunization Medication Information2 SHALL contain exactly one [1..1] manufacturedMaterial, where its type is Immunization Medication Information Manufactured Material (CONF:1098-9006) manufacturedMaterial SHALL contain exactly one [1..1] code, which SHALL be selected from ValueSet CVX Vaccines Administered - Vaccine Set 2.16.840.1.113762.1.4.1010.6 DYNAMIC (CONF:1098-9007)',
                type: 'C-CDA MDHT Conformance Error',
                xPath:
                  '/ClinicalDocument/component/structuredBody/component[5]/section/entry[2]/substanceAdministration/consumable/manufacturedProduct/manufacturedMaterial',
                validatorConfiguredXpath: null,
                documentLineNumber: '1692',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Immunizations',
              },
              {
                description:
                  'Consol Health Status Observation SHALL contain exactly one [1..1] value with @xsi:type="CD", which SHALL be selected from ValueSet HealthStatus 2.16.840.1.113883.1.11.20.12 DYNAMIC (CONF:9075, R2.0=CONF:1098-9075)',
                type: 'C-CDA MDHT Conformance Error',
                xPath: '/ClinicalDocument/component/structuredBody/component[13]/section/entry/observation',
                validatorConfiguredXpath: null,
                documentLineNumber: '3070',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: null,
              },
            ],
          },
          {
            type: '2015 Edition Certification Feedback',
            totalErrorCount: 12,
            referenceErrors: [
              {
                description: "Code 'ENG (from ENG)' does not exist in the value set (2.16.840.1.113883.1.11.11526)",
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/recordTarget[1]/patientRole[1]/patient[1]/languageCommunication[1]/languageCode[1]',
                validatorConfiguredXpath:
                  "/v3:ClinicalDocument/v3:templateId[@root='2.16.840.1.113883.10.20.22.1.1' and @extension='2015-08-01']/ancestor::v3:ClinicalDocument[1]/v3:recordTarget/v3:patientRole/v3:patient/v3:languageCommunication/v3:languageCode[not(@nullFlavor)]",
                documentLineNumber: '111',
                actualCode: 'ENG',
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Patient Demographics',
              },
              {
                description: 'Code 161901003 does not exist in the value set(s) 2.16.840.1.113883.1.11.20.12',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[13]/section[1]/entry[1]/observation[1]/value[1]',
                validatorConfiguredXpath:
                  "//v3:observation/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.5' and @extension='2014-06-09']/ancestor::v3:observation[1]/v3:value[not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '3076',
                actualCode: '161901003',
                actualCodeSystem: '2.16.840.1.113883.6.96',
                actualCodeSystemName: 'SNOMED CT',
                actualDisplayName: 'CHRONICALLY ILL',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: null,
              },
              {
                description:
                  'Code SAHGDAKGDGFHDKSAFAEFEFGWYFGF does not exist in the value set(s) 2.16.840.1.113883.3.88.12.3221.8.7',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[2]/substanceAdministration[1]/routeCode[1]',
                validatorConfiguredXpath:
                  "//v3:substanceAdministration/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.16' and @extension='2014-06-09']/ancestor::v3:substanceAdministration[1]/v3:routeCode[not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '912',
                actualCode: 'SAHGDAKGDGFHDKSAFAEFEFGWYFGF',
                actualCodeSystem: '2.16.840.1.113883.3.26.1.1',
                actualCodeSystemName: 'NCI THESAURUS',
                actualDisplayName: 'INTRAVENOUS',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code C22559 does not exist in the value set(s) 2.16.840.1.113883.3.88.12.3221.8.7',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[3]/substanceAdministration[1]/routeCode[1]',
                validatorConfiguredXpath:
                  "//v3:substanceAdministration/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.16' and @extension='2014-06-09']/ancestor::v3:substanceAdministration[1]/v3:routeCode[not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '948',
                actualCode: 'C22559',
                actualCodeSystem: '2.16.840.1.113883.3.26.1.1',
                actualCodeSystemName: 'NCI THESAURUS',
                actualDisplayName: 'INTRAVENOUS',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description:
                  'Code YREWIUYUIWYIUSFHSAKJFHSKFHA does not exist in the value set(s) 2.16.840.1.113762.1.4.1021.30',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[5]/substanceAdministration[1]/administrationUnitCode[1]',
                validatorConfiguredXpath:
                  "//v3:substanceAdministration/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.16' and @extension='2014-06-09']/ancestor::v3:substanceAdministration[1]/v3:administrationUnitCode[not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '1030',
                actualCode: 'YREWIUYUIWYIUSFHSAKJFHSKFHA',
                actualCodeSystem: '2.16.840.1.113883.5.85',
                actualCodeSystemName: 'ORDERABLE DRUG FORM',
                actualDisplayName: 'SCOOPS',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code CEMENT does not exist in the value set(s) 2.16.840.1.113762.1.4.1021.30',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[6]/substanceAdministration[1]/administrationUnitCode[1]',
                validatorConfiguredXpath:
                  "//v3:substanceAdministration/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.16' and @extension='2014-06-09']/ancestor::v3:substanceAdministration[1]/v3:administrationUnitCode[not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '1071',
                actualCode: 'CEMENT',
                actualCodeSystem: '2.16.840.1.113883.5.85',
                actualCodeSystemName: 'ORDERABLE DRUG FORM',
                actualDisplayName: 'SCOOPS',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code SCOOP does not exist in the value set(s) 2.16.840.1.113762.1.4.1021.30',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[7]/substanceAdministration[1]/administrationUnitCode[1]',
                validatorConfiguredXpath:
                  "//v3:substanceAdministration/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.16' and @extension='2014-06-09']/ancestor::v3:substanceAdministration[1]/v3:administrationUnitCode[not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '1112',
                actualCode: 'SCOOP',
                actualCodeSystem: '1.22.333.4.555555.6.77',
                actualCodeSystemName: 'ORDERABLE DRUG FORM',
                actualDisplayName: 'SCOOPS',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code 563973 does not exist in the value set(s) 2.16.840.1.113762.1.4.1010.4',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[1]/substanceAdministration[1]/consumable[1]/manufacturedProduct[1]/manufacturedMaterial[1]/code[1]',
                validatorConfiguredXpath:
                  "//v3:manufacturedProduct/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.23' and @extension='2014-06-09']/ancestor::v3:manufacturedProduct[1]/v3:manufacturedMaterial/v3:code[not(@nullFlavor)]",
                documentLineNumber: '889',
                actualCode: '563973',
                actualCodeSystem: '2.16.840.1.113883.6.88',
                actualCodeSystemName: '',
                actualDisplayName: 'CEFTRIAXONE 250MG/ML',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code 563973 does not exist in the value set(s) 2.16.840.1.113762.1.4.1010.4',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[2]/substanceAdministration[1]/consumable[1]/manufacturedProduct[1]/manufacturedMaterial[1]/code[1]',
                validatorConfiguredXpath:
                  "//v3:manufacturedProduct/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.23' and @extension='2014-06-09']/ancestor::v3:manufacturedProduct[1]/v3:manufacturedMaterial/v3:code[not(@nullFlavor)]",
                documentLineNumber: '925',
                actualCode: '563973',
                actualCodeSystem: '2.16.840.1.113883.6.88',
                actualCodeSystemName: '',
                actualDisplayName: 'CEFTRIAXONE 250MG/ML',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code 563973 does not exist in the value set(s) 2.16.840.1.113762.1.4.1010.4',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[3]/substanceAdministration[1]/consumable[1]/manufacturedProduct[1]/manufacturedMaterial[1]/code[1]',
                validatorConfiguredXpath:
                  "//v3:manufacturedProduct/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.23' and @extension='2014-06-09']/ancestor::v3:manufacturedProduct[1]/v3:manufacturedMaterial/v3:code[not(@nullFlavor)]",
                documentLineNumber: '961',
                actualCode: '563973',
                actualCodeSystem: '2.16.840.1.113883.6.88',
                actualCodeSystemName: '',
                actualDisplayName: 'CEFTRIAXONE 250MG/ML',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description: 'Code 563973 does not exist in the value set(s) 2.16.840.1.113762.1.4.1010.4',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[2]/section[1]/entry[4]/substanceAdministration[1]/consumable[1]/manufacturedProduct[1]/manufacturedMaterial[1]/code[1]',
                validatorConfiguredXpath:
                  "//v3:manufacturedProduct/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.23' and @extension='2014-06-09']/ancestor::v3:manufacturedProduct[1]/v3:manufacturedMaterial/v3:code[not(@nullFlavor)]",
                documentLineNumber: '997',
                actualCode: '563973',
                actualCodeSystem: '2.16.840.1.113883.6.88',
                actualCodeSystemName: '',
                actualDisplayName: 'CEFTRIAXONE 250MG/ML',
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Medications',
              },
              {
                description:
                  'The node \'@unit\' does not exist at the expected path /ClinicalDocument[1]/component[1]/structuredBody[1]/component[9]/section[1]/entry[2]/organizer[1]/component[3]/observation[1]/value[1] but is required as per the specification: If Observation/value is a physical quantity (xsi:type="PQ"), the unit of measure SHALL be selected from ValueSet UnitsOfMeasureCaseSensitive 2.16.840.1.113883.1.11.12839 DYNAMIC (CONF:1198-31484).',
                type: 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
                xPath:
                  '/ClinicalDocument[1]/component[1]/structuredBody[1]/component[9]/section[1]/entry[2]/organizer[1]/component[3]/observation[1]/value[1]',
                validatorConfiguredXpath:
                  "//v3:observation/v3:templateId[@root='2.16.840.1.113883.10.20.22.4.2' and @extension='2015-08-01']/ancestor::v3:observation[1]/v3:value[@xsi:type='PQ' and not(@nullFlavor) and ancestor::v3:section[not(@nullFlavor)]]",
                documentLineNumber: '2423',
                actualCode: null,
                actualCodeSystem: null,
                actualCodeSystemName: null,
                actualDisplayName: null,
                schemaError: false,
                dataTypeSchemaError: false,
                sectionName: 'Laboratory Tests and Results',
              },
            ],
          },
        ],
        schemaErrorList: null,
        schemaErrors: false,
        success: true,
      }
      // for server action version, this one uses a smaller JSON object for testing
      // WIP, maybe not in the proper state at this point as I just reverted from client-based but have not tested
      // But the issue with route and action version is an invalid header for an unknown reason
      const pdfBlobResponse = await saveScorecardReportAxiosAction(inlineJsonObjectForDebug)

      // const pdfBlobResponse = await saveScorecardReportAxiosDebugAction()

      /* Direct client call WITHOUT CORS bypass */
      // const apiUrl = 'https://ccda.healthit.gov/scorecard/savescorecardservice'
      // const response = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // prettier-ignore
      //     'Accept': 'application/pdf',
      //   },
      //   body: JSON.stringify(json),
      // })

      // const jsonString: string = ``
      // const pdfBlobResponse = await saveScorecardReportAxiosAction(jsonString)

      // // for client call version
      // if (!response.ok) {
      //   throw new Error(`HTTP error encountered while saving scorecard results! status: ${response.status}`)
      // }

      // if (json) {

      // // for client call version
      // const pdfBlobResponse = await response.blob()

      console.log('pdfBlobResponse', pdfBlobResponse)

      // force download of file
      const url = window.URL.createObjectURL(pdfBlobResponse)
      if (url) {
        console.log('setting up download')
        const link = document.createElement('a')
        // link.style.display = 'none'
        link.href = url
        link.download = json?.filename ? `SITE_C-CDA_Scorecard_${json.filename}.pdf` : 'scorecardReport.pdf'
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
      // }
    } catch (error) {
      console.error('Error saving scorecard report:', error)
      setSaveReportError('Error saving Scorecard report. Please try again later.')
    } finally {
      setIsSaveReportLoading(false)
    }
  }

  // const handleSaveReport = async () => {
  //   console.log('Enter handleSaveReport()')
  //   setIsSaveReportLoading(true)
  //   setSaveReportError('')

  //   try {
  //     const response = await fetch('/api/c-cda/scorecard/savescorecardservice', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(site3SampleWithErrorsJsonData),
  //     })

  //     if (!response.ok) {
  //       throw new Error(`HTTP error encounered while saving scorecard results! status: ${response.status}`)
  //     }

  //     // Create a blob from the PDF stream
  //     const blob = await response.blob()
  //     // Create a link and trigger the download
  //     const url = window.URL.createObjectURL(blob)
  //     const link = document.createElement('a')
  //     link.style.display = 'none'
  //     link.href = url
  //     link.download = json?.filename ? `SITE_C-CDA_Scorecard_${json.filename}.pdf` : 'scorecardReport.pdf'
  //     document.body.appendChild(link)
  //     link.click()
  //     window.URL.revokeObjectURL(url)
  //   } catch (error) {
  //     console.error('Error saving scorecard:', error)
  //     setSaveReportError('Error saving report...')
  //   } finally {
  //     setIsSaveReportLoading(false)
  //   }
  // }

  const handleDownloadSampleDocument = () => {
    console.log('Enter handleDownloadSampleDocument()')
    // Create an anchor element since next.js can use that cleanly to download a static asset in the public folder
    const locationPrefix = '/c-cda/scorecard/samples/'
    const link = document.createElement('a')
    link.setAttribute('download', '') // Force download vs nav, no filenmae set so uses default url name
    link.href = locationPrefix + (json?.filename ? json.filename : 'UnknownFilename.xml')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const isShowSampleDownloadButton: boolean = isTryMeDemo

  return (
    <Container>
      <DialogTemplate
        open={dialogState}
        handleClose={handleCloseDialog}
        title={`Scorecard Results: ${json?.filename || 'Unknown Filename'}`}
        menuContent={<ScorecardSideNav results={results} />}
        resultsContent={
          <Box
            id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.TOP)}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
            mt={2}
            px={4}
            pb={4}
            sx={{ overflowY: 'none' }}
          >
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.BASE_CHECK)}>
              <ScorecardBaseCheckSummary json={json} igResults={igResults} vocabResults={vocabResults} />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.BEST_PRACTICE)}>
              <ScorecardBestPracticeSummary results={results} />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.COMPARE)}>
              <ScorecardCompareChartSummary />
            </Box>
            <Divider sx={dividerPaddingStyle} />
            <Box id={removeHashtagToUseHrefLinkAsIdForAnchor(HrefLinkValueEnum.NEXT_STEPS)}>
              <ScorecardNextSteps
                results={results}
                igResults={igResults}
                vocabResults={vocabResults}
                sortFunction={sortFunction}
              />
            </Box>
          </Box>
        }
        actionsContent={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderTop: `1px solid ${palette.divider}`,
            }}
          >
            <Box display={'flex'} gap={4}>
              <Button onClick={handleSaveReport} disabled={isSaveReportLoading} color="primary" variant="contained">
                {isSaveReportLoading ? 'Saving...' : 'Save Report'}
              </Button>
              <ErrorDisplayCard
                open={saveReportError ? true : false}
                // handleClose={() => setErrorOpen(false)}
                handleClose={() => setSaveReportError('')}
                response={{ error: saveReportError }}
              />
              {isShowSampleDownloadButton && (
                <Button onClick={handleDownloadSampleDocument} color="primary" variant="outlined">
                  Download Sample Document
                </Button>
              )}
            </Box>
            <Button
              component="a"
              sx={{
                'color': palette.primary,
                '&:hover': {
                  color: palette.primaryDark,
                },
                '&:visited': {
                  color: palette.primary,
                },
              }}
              href={HrefLinkValueEnum.TOP}
              variant="outlined"
            >
              Back to Top
            </Button>
          </Box>
        }
      />
    </Container>
  )
}
