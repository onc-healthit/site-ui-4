// import custom type for the complex JSON response
import { ScorecardJsonResponseType } from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
// importing samples directly, and prior to logic, so they are loaded as fast as possible/loaded during build time
// Note: This requires a rebuild if we want to update the files data
import highScoringSampleJsonData from './samples/json/highScoringSample.json'
import lowScoringSampleJsonData from './samples/json/lowScoringSample.json'
import sampleWithErrorsJsonData from './samples/json/sampleWithErrors.json'
import sampleWithSchemaErrorsJsonData from './samples/json/sampleWithSchemaErrors.json'
import sampleWithoutAnyContentJsonData from './samples/json/sampleWithoutAnyContent.json'

const demoSampleMap: { [key: string]: ScorecardJsonResponseType } = {
  'highScoringSample.json': highScoringSampleJsonData,
  'lowScoringSample.json': lowScoringSampleJsonData,
  'sampleWithErrors.json': sampleWithErrorsJsonData,
  'sampleWithSchemaErrors.json': sampleWithSchemaErrorsJsonData,
  'sampleWithoutAnyContent.json': sampleWithoutAnyContentJsonData,
}

export const getDemoSample = (optionValue: string): ScorecardJsonResponseType => {
  const demoSample = demoSampleMap[optionValue]
  if (!demoSample) {
    throw new Error('Invalid option value selected or sent from the Scorecard Try Me demo dropdown')
  }
  return demoSample
}
