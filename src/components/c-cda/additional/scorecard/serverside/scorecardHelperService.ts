import { ScorecardReferenceResultType } from '@/components/c-cda/additional/scorecard/types/ScorecardJsonResponseType'
import { ReferenceInstanceEnum, SectionNameEnum } from '../types/ScorecardConstants'

export const getReferenceResultViaType = (
  referenceResults: ScorecardReferenceResultType[],
  referenceInstanceTypeEnum: ReferenceInstanceEnum
): ScorecardReferenceResultType | null => {
  const matchedResults = referenceResults.find((refInstance) => refInstance.type === referenceInstanceTypeEnum)
  if (!matchedResults) {
    console.warn(`No reference result found for type: ${referenceInstanceTypeEnum}`)
    return null
  }
  return matchedResults
}

export const getDefaultReferenceResult = (
  referenceInstanceTypeEnum: ReferenceInstanceEnum
): ScorecardReferenceResultType => {
  const defaultReferenceResult: ScorecardReferenceResultType = {
    type: referenceInstanceTypeEnum,
    totalErrorCount: 0,
    referenceErrors: [],
  }
  return defaultReferenceResult
}

// If we decide to place IG and vocab errors in sections, we can defualt to Miscellaneous,
// or, Unknown(requires extra accordian)
export const getRefResultWithMissingSectionsUpdatedWithGivenSection = (
  scRefResult: ScorecardReferenceResultType,
  newSectionName: SectionNameEnum
): ScorecardReferenceResultType => {
  return {
    ...scRefResult,
    referenceErrors: scRefResult.referenceErrors.map((error) => ({
      ...error,
      sectionName: !error.sectionName ? newSectionName : error.sectionName,
    })),
  }
}
