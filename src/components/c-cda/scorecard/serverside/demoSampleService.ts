// import custom type for the complex JSON response
import { ScorecardJsonResponseType } from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
// importing samples directly, and prior to logic, so they are loaded as fast as possible/loaded during build time
// Note: This requires a rebuild if we want to update the files data
import highScoringSampleJsonData from './samples/json/highScoringSample.json'
import lowScoringSample_r21JsonData from './samples/json/lowScoringSample_r21.json'
import lowScoringSample_r11JsonData from './samples/json/lowScoringSample_r11.json'
import sampleWithErrorsJsonData from './samples/json/sampleWithErrors.json'
import sampleWithSchemaErrorsJsonData from './samples/json/sampleWithSchemaErrors.json'
import sampleWithoutAnyContentJsonData from './samples/json/sampleWithoutAnyContent.json'
import sampleWithIGErrorsJsonData from './samples/json/sampleWithIGErrors.json'
import sampleWithVocabularyErrorsJsonData from './samples/json/sampleWithVocabularyErrors.json'
import site3HighScoringSampleJsonData from './samples/json/site3-highScoringSample.json'
import site3LowScoringSampleJsonData from './samples/json/site3-lowScoringSample.json'
import site3SampleWithErrorsJsonData from './samples/json/site3-sampleWithErrors.json'

const demoSampleMap: { [key: string]: ScorecardJsonResponseType } = {
  'highScoringSample.json': highScoringSampleJsonData,
  'lowScoringSample_r21.json': lowScoringSample_r21JsonData,
  'lowScoringSample_r11.json': lowScoringSample_r11JsonData,
  'sampleWithErrors.json': sampleWithErrorsJsonData,
  'sampleWithSchemaErrors.json': sampleWithSchemaErrorsJsonData,
  'sampleWithoutAnyContent.json': sampleWithoutAnyContentJsonData,
  'sampleWithIGErrors.json': sampleWithIGErrorsJsonData,
  'sampleWithVocabularyErrors.json': sampleWithVocabularyErrorsJsonData,
  'site3-highScoringSample.json': site3HighScoringSampleJsonData,
  'site3-lowScoringSample.json': site3LowScoringSampleJsonData,
  'site3-sampleWithErrors.json': site3SampleWithErrorsJsonData,
}

export const getDemoSample = (optionValue: string): ScorecardJsonResponseType => {
  const demoSample = demoSampleMap[optionValue]
  if (!demoSample) {
    throw new Error('Invalid option value selected or sent from the Scorecard Try Me demo dropdown')
  }
  return demoSample
}
