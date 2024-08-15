import {
  ScorecardCategory,
  ScorecardReferenceErrorType,
  ScorecardReferenceResultType,
} from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import {
  GradeEnum,
  gradeStyleMap,
  HrefLinkValueEnum,
  ReferenceInstanceEnum,
  SectionNameEnum,
  sectionStyleMap,
} from '../types/ScorecardConstants'
import { ScorecardGradeStyleDataType } from '../types/ScorecardGradeStyleDataType'

export const getReferenceResultViaType = (
  referenceInstanceTypeEnum: ReferenceInstanceEnum,
  referenceResults: ScorecardReferenceResultType[]
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

export const getGradeStyleValueByProperty = (
  section: ScorecardCategory,
  property: keyof ScorecardGradeStyleDataType
): string | null => {
  if (section.failingConformance || section.certificationFeedback) {
    return gradeStyleMap[GradeEnum.ERRORS][property]
  } else if (section.nullFlavorNI) {
    return gradeStyleMap[GradeEnum.NULL_OR_EMPTY_SECTION][property]
  } else {
    return (
      gradeStyleMap[section.categoryGrade as GradeEnum]?.[property] ??
      gradeStyleMap[GradeEnum.NULL_OR_EMPTY_SECTION][property]
    )
  }
}

export const getNumberOfIssuesForDisplay = (section: ScorecardCategory): number => {
  if (section.failingConformance) {
    return section.conformanceErrorCount ?? 0
  } else if (section.certificationFeedback) {
    return section.vocabularyErrorCount ?? 0
  }
  return section.numberOfIssues
}

export const getCategoryLabelText = (section: ScorecardCategory): string | null => {
  const result = section.categoryName
  if (section.failingConformance) {
    return result + ': Conformance Errors'
  } else if (section.certificationFeedback) {
    return result + ': Vocabulary Errors'
  } else if (section.nullFlavorNI) {
    return result + ': Empty Section (Not Scored)'
  } else {
    return result + `: ${section.categoryGrade}`
  }
}

export const convertCategoryToShortName = (sectionName: SectionNameEnum): SectionNameEnum => {
  switch (sectionName) {
    case SectionNameEnum.LABORATORY_TESTS_AND_RESULTS:
      return SectionNameEnum.LABORATORY_TESTS_AND_RESULTS_SHORT
    case SectionNameEnum.PATIENT_DEMOGRAPHICS:
      return SectionNameEnum.PATIENT_DEMOGRAPHICS_SHORT
    default:
      return sectionName
  }
}

export const getCategorySideNavText = (section: ScorecardCategory): string | null => {
  const result = convertCategoryToShortName(section.categoryName as SectionNameEnum)
  if (section.failingConformance) {
    return result + ': Con.'
  } else if (section.certificationFeedback) {
    return result + ': Voc.'
  } else {
    return result + `: ${section.categoryGrade}`
  }
}

export const getHrefLinkValue = (section: ScorecardCategory): string | undefined => {
  if (section.failingConformance) {
    console.log('failing conformance')
    return HrefLinkValueEnum.CONFORMANCE
  } else if (section.certificationFeedback) {
    console.log('certification feedback')
    return HrefLinkValueEnum.VOCAB
  } else {
    console.log('No IG or Vocab Errors, calling getSectionHrefLinkValue')
    return getSectionHrefLinkValue(section)
  }
}

export const removeHashtagToUseHrefLinkAsIdForAnchor = (
  hrefLinkWithHashtag: string | undefined
): string | undefined => {
  if (hrefLinkWithHashtag === undefined) {
    console.warn('sent (and returned) undefined in useHrefLinkAsIdForAnchor function: ')
    return undefined
  }
  let result = hrefLinkWithHashtag
  if (hrefLinkWithHashtag.startsWith('#')) {
    result = result.slice(1)
    console.log('removed hash tag: ' + result)
  } else {
    console.warn('Did not remove hash tag ' + result)
  }
  return result
}

export const getSectionHrefLinkValueAsAnchor = (section: ScorecardCategory): string | undefined => {
  return removeHashtagToUseHrefLinkAsIdForAnchor(getSectionHrefLinkValue(section))
}

export const getSectionHrefLinkValue = (section: ScorecardCategory): string | undefined => {
  return sectionStyleMap[section.categoryName as SectionNameEnum]?.hrefName ?? undefined
}

export const getFailingSectionSpecificErrorCount = (
  categoryName: SectionNameEnum,
  referenceInstanceTypeEnumCertOrIG: ReferenceInstanceEnum,
  refValResults: ScorecardReferenceResultType[]
): number => {
  if (refValResults && refValResults.length > 0) {
    if (referenceInstanceTypeEnumCertOrIG === ReferenceInstanceEnum.IG_CONFORMANCE) {
      const igResults = getReferenceResultViaType(ReferenceInstanceEnum.IG_CONFORMANCE, refValResults)?.referenceErrors
      if (igResults) {
        return getFailingSectionSpecificErrorCountProcessor(categoryName, igResults)
      }
    } else if (referenceInstanceTypeEnumCertOrIG === ReferenceInstanceEnum.VOCAB) {
      const certResults = getReferenceResultViaType(ReferenceInstanceEnum.VOCAB, refValResults)?.referenceErrors
      if (certResults) {
        return getFailingSectionSpecificErrorCountProcessor(categoryName, certResults)
      }
    }
  }
  return 0
}

const getFailingSectionSpecificErrorCountProcessor = (
  categoryName: SectionNameEnum,
  refValResults: ScorecardReferenceErrorType[]
): number => {
  let count = 0
  for (const currentSectionInReferenceErrors of refValResults) {
    if (currentSectionInReferenceErrors?.sectionName === categoryName) {
      count++
    }
  }
  return count
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getHrefName = (sectionName: SectionNameEnum) => {
  return sectionStyleMap[sectionName].hrefName
}
