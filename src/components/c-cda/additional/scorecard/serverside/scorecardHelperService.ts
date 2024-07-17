import { ScorecardReferenceResultType } from '@/types/ScorecardJsonResponseType'

export enum ReferenceInstanceTypeEnum {
  IG_CONFORMANCE = 'C-CDA IG Conformance Errors',
  VOCAB = '2015 Edition Certification Feedback',
}

export const getReferenceResultViaType = (
  referenceResults: ScorecardReferenceResultType[],
  referenceInstanceTypeEnum: ReferenceInstanceTypeEnum
): ScorecardReferenceResultType | null => {
  const matchedResults = referenceResults.find((refInstance) => refInstance.type === referenceInstanceTypeEnum)
  if (!matchedResults) {
    console.warn(`No reference result found for type: ${referenceInstanceTypeEnum}`)
    return null
  }
  return matchedResults
}

export const getDefaultReferenceResult = (
  referenceInstanceTypeEnum: ReferenceInstanceTypeEnum
): ScorecardReferenceResultType => {
  const defaultReferenceResult: ScorecardReferenceResultType = {
    type: referenceInstanceTypeEnum,
    totalErrorCount: 0,
    referenceErrors: [],
  }
  return defaultReferenceResult
}
