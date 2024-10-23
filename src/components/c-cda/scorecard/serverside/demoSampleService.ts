// import custom type for the complex JSON response
import { ScorecardJsonResponseType } from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
// importing samples directly, and prior to logic, so they are loaded as fast as possible/loaded during build time
// Note: This requires a rebuild if we want to update the files data
import highScoringSampleJsonData from './samples/json/highScoringSample.json'
import lowScoringSample_r11JsonData from './samples/json/lowScoringSample_r11.json'
import lowScoringSample_r21JsonData from './samples/json/lowScoringSample_r21.json'
import sampleWithEmptySectionsJsonData from './samples/json/sampleWithEmptySections.json'
import sampleWithEmptySectionsAndErrorsJsonData from './samples/json/sampleWithEmptySectionsAndErrors.json'
import sampleWithErrorsJsonData from './samples/json/sampleWithErrors.json'
import sampleWithIGErrorsJsonData from './samples/json/sampleWithIGErrors.json'
import sampleWithSchemaErrorsJsonData from './samples/json/sampleWithSchemaErrors.json'
import sampleWithVocabularyErrorsJsonData from './samples/json/sampleWithVocabularyErrors.json'
import sampleWithoutAnyContentJsonData from './samples/json/sampleWithoutAnyContent.json'
import site3HighScoringSampleJsonData from './samples/json/site3-highScoringSample.json'
import site3LowScoringSampleJsonData from './samples/json/site3-lowScoringSample.json'
import site3SampleWithErrorsJsonData from './samples/json/site3-sampleWithErrors.json'

const HIGH_SCORING: string = 'highScoringSample.json'
const LOW_SCORING: string = 'lowScoringSample_r21.json'
const LOW_SCORING_R11: string = 'lowScoringSample_r11.json'
const WITH_ERRORS: string = 'sampleWithErrors.json'
const WITH_IG_ERRORS: string = 'sampleWithIGErrors.json'
const WITH_VOCAB_ERRORS: string = 'sampleWithVocabularyErrors.json'
const WITH_EMPTY_SECTIONS: string = 'sampleWithEmptySections.json'
const WITH_EMPTY_SECTIONS_AND_ERRORS: string = 'sampleWithEmptySectionsAndErrors.json'
const SITE3_HIGH_SCORING: string = 'site3-highScoringSample.json'
const SITE3_LOW_SCORING: string = 'site3-lowScoringSample.json'
const SITE3_WITH_ERRORS: string = 'site3-sampleWithErrors.json'
const WITH_SCHEMA_ERRORS: string = 'sampleWithSchemaErrors.json'
const WITHOUT_CONTENT: string = 'sampleWithoutAnyContent.json'

const demoSampleMap: { [jsonResultsFileKey: string]: ScorecardJsonResponseType } = {
  [HIGH_SCORING]: highScoringSampleJsonData,
  [LOW_SCORING]: lowScoringSample_r21JsonData,
  [LOW_SCORING_R11]: lowScoringSample_r11JsonData,
  [WITH_ERRORS]: sampleWithErrorsJsonData,
  [WITH_IG_ERRORS]: sampleWithIGErrorsJsonData,
  [WITH_VOCAB_ERRORS]: sampleWithVocabularyErrorsJsonData,
  [WITH_EMPTY_SECTIONS]: sampleWithEmptySectionsJsonData,
  [WITH_EMPTY_SECTIONS_AND_ERRORS]: sampleWithEmptySectionsAndErrorsJsonData,
  [SITE3_HIGH_SCORING]: site3HighScoringSampleJsonData,
  [SITE3_LOW_SCORING]: site3LowScoringSampleJsonData,
  [SITE3_WITH_ERRORS]: site3SampleWithErrorsJsonData,
  [WITH_SCHEMA_ERRORS]: sampleWithSchemaErrorsJsonData,
  [WITHOUT_CONTENT]: sampleWithoutAnyContentJsonData,
}

export const getDemoSample = (optionValue: string): ScorecardJsonResponseType => {
  const demoSample = demoSampleMap[optionValue]
  console.log('Value of demoSample: ', demoSample)
  if (!demoSample) {
    throw new Error('Invalid option value selected or sent from the Scorecard Try Me demo dropdown')
  }
  return demoSample
}

const currentDemoSampleOptions: { label: string; value: string }[] = [
  {
    label: 'High Scoring Sample',
    value: HIGH_SCORING,
  },
  {
    label: 'Low Scoring Sample (C-CDA R2.1)',
    value: LOW_SCORING,
  },
  {
    label: 'Low Scoring Sample (C-CDA R1.0)',
    value: LOW_SCORING_R11,
  },
  {
    label: 'Sample With Errors',
    value: WITH_ERRORS,
  },
]

const newDemoSampleOptions: { label: string; value: string }[] = [
  {
    label: 'Sample with IG Errors',
    value: WITH_IG_ERRORS,
  },
  {
    label: 'Sample with Vocabulary Errors',
    value: WITH_VOCAB_ERRORS,
  },
  {
    label: 'Sample with Empty Sections',
    value: WITH_EMPTY_SECTIONS,
  },
  {
    label: 'Sample with Empty Sections and Errors',
    value: WITH_EMPTY_SECTIONS_AND_ERRORS,
  },
]

const oldDemoSampleOptions: { label: string; value: string }[] = [
  {
    label: 'SITE 3 High Scoring Sample',
    value: SITE3_HIGH_SCORING,
  },
  {
    label: 'SITE 3 Low Scoring Sample',
    value: SITE3_LOW_SCORING,
  },
  {
    label: 'SITE 3 Sample With Errors',
    value: SITE3_WITH_ERRORS,
  },
]

export const debugSampleOptions: { label: string; value: string }[] = [
  {
    label: 'Schema Errors',
    value: WITH_SCHEMA_ERRORS,
  },
  {
    label: 'No Content',
    value: WITHOUT_CONTENT,
  },
]

export const allSampleOptionsExceptDebug: { label: string; value: string }[] = [
  ...currentDemoSampleOptions,
  ...newDemoSampleOptions,
  ...oldDemoSampleOptions,
]

export const allSampleOptions: { label: string; value: string }[] = [
  ...currentDemoSampleOptions,
  ...newDemoSampleOptions,
  ...oldDemoSampleOptions,
  ...debugSampleOptions,
]
