import palette from '@/styles/palette'
import { ScorecardGradeStyleDataType } from './ScorecardGradeStyleDataType'
import { ScorecardSectionStyleDataType } from './ScorecardSectionStyleDataType'

// old ui: ReferenceInstanceTypeEnum
export enum ReferenceInstanceEnum {
  IG_CONFORMANCE = 'C-CDA IG Conformance Errors',
  VOCAB = '2015 Edition Certification Feedback',
}

export enum HrefLinkValueEnum {
  CONFORMANCE = '#conformance-errors',
  VOCAB = '#vocabulary-errors',
  BASE_CHECK = '#base-check',
  BEST_PRACTICE = '#best-practice',
  COMPARE = '#compare',
  NEXT_STEPS = '#next-steps',
  DETAILED_RESULTS = '#detailed-results',
}

// old ui: categoryTypes
// 11 sections plus Unknown
// 2 word length variations for side nav
export enum SectionNameEnum {
  PROBLEMS = 'Problems',
  MEDICATIONS = 'Medications',
  ALLERGIES = 'Allergies',
  PROCEDURES = 'Procedures',
  IMMUNIZATIONS = 'Immunizations',
  LABORATORY_TESTS_AND_RESULTS = 'Laboratory Tests and Results',
  LABORATORY_TESTS_AND_RESULTS_SHORT = 'Lab Results',
  VITAL_SIGNS = 'Vital Signs',
  PATIENT_DEMOGRAPHICS = 'Patient Demographics',
  PATIENT_DEMOGRAPHICS_SHORT = 'Patient',
  ENCOUNTERS = 'Encounters',
  SOCIAL_HISTORY = 'Social History',
  MISCELLANEOUS = 'Miscellaneous',
  UNKNOWN = 'Unknown',
}

// old ui: IssueTypeEnum
// These are the type attribute identifiers within referenceErrors arrays for each object/each error
export enum ReferenceErrorTypeEnum {
  MDHT_ERROR = 'C-CDA MDHT Conformance Error',
  VOCAB_ERROR = 'ONC 2015 S&CC Vocabulary Validation Conformance Error',
}

// old ui: ScorecardConstants
// Note: This is located in ScorecardResultsType.igReferenceUrl in the JSON response so do we really need it?
export enum ConstantsEnum {
  IG_URL = 'http://www.hl7.org/implement/standards/product_brief.cfm?product_id=379', // best practice desc link
}

// old ui: UserMessageConstantEnum
export enum ErrorMessage {
  GENERIC = 'Please try a different file and report the issue to edge-test-tool@googlegroups.com.',
  GENERIC_LATER = 'Please try again later or contact edge-test-tool@googlegroups.com for help.',
  GENERIC_COMBINED = 'Please try again later, try a different file, or contact edge-test-tool@googlegroups.com for help.',
  UPLOAD_ERROR = 'Error uploading <unknownFileName>: ',
  TIMEOUT_ERROR = 'The scorecard application has been stopped due to the length of time it has been processing the given request.',
  VALID_JSON_WITH_ERROR = 'Error returned within JSON for filename:',
  INVALID_SCORECARD_SPECIFIC_RESULTS = 'Scorcard specific results within the response are invalid',
}

export enum GradeEnum {
  A_PLUS = 'A+',
  A_MINUS = 'A-',
  B_PLUS = 'B+',
  B_MINUS = 'B-',
  C = 'C',
  D = 'D',
  ERRORS = 'IG or Vocabulary Errors',
  NULL_OR_EMPTY_SECTION = 'Missing or Null section data',
}

export const gradeStyleMap: { [gradeKey: string]: ScorecardGradeStyleDataType } = {
  [GradeEnum.A_PLUS]: {
    color: palette.white,
    backgroundColor: palette.successLight,
    // TODO: Should hoverBackgroundColor be a more unique color? It just matches A- hoverColor for now...
    hoverBackgroundColor: palette.success, // A+ CAN have issues(see high Scoring sample immunizations) - need to define hoverBackground color
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.A_MINUS]: {
    color: palette.white,
    backgroundColor: palette.successDark,
    hoverBackgroundColor: palette.success,
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.B_PLUS]: {
    color: palette.black,
    backgroundColor: '#FFB65D75',
    hoverBackgroundColor: '#FFB65D50',
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.B_MINUS]: {
    color: palette.black,
    backgroundColor: '#C66D0065',
    hoverBackgroundColor: '#C66D0090',
    // backgroundColor: '#FFB65D',
    // hoverBackgroundColor: '#FFB65D75',
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.C]: {
    color: palette.black,
    backgroundColor: '#FFB65D',
    hoverBackgroundColor: '#F3A24F',
    // backgroundColor: '#C66D0065',
    // hoverBackgroundColor: '#C66D0090',
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.D]: {
    color: palette.white,
    backgroundColor: '#6D0D0D',
    hoverBackgroundColor: '#510808',
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.ERRORS]: {
    color: palette.white,
    backgroundColor: palette.greyDark,
    hoverBackgroundColor: 'black', // Need to define so we can navigate to Errors
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
  [GradeEnum.NULL_OR_EMPTY_SECTION]: {
    color: palette.black,
    backgroundColor: palette.greyLight,
    hoverBackgroundColor: null, // OK to be null since we have nowhere to navigate to so will never be seen
    hoverColor: null, // OK to be null as no need to change text color on hover
  },
}

const convertToHrefName = (sectionName: SectionNameEnum) => {
  return '#' + sectionName.replaceAll(' ', '-').toLowerCase()
}

export const sectionStyleMap: { [sectionNameFromJsonKey: string]: ScorecardSectionStyleDataType } = {
  [SectionNameEnum.PROBLEMS]: {
    hrefName: convertToHrefName(SectionNameEnum.PROBLEMS),
  },
  [SectionNameEnum.MEDICATIONS]: {
    hrefName: convertToHrefName(SectionNameEnum.MEDICATIONS),
  },
  [SectionNameEnum.ALLERGIES]: {
    hrefName: convertToHrefName(SectionNameEnum.ALLERGIES),
  },
  [SectionNameEnum.PROCEDURES]: {
    hrefName: convertToHrefName(SectionNameEnum.PROCEDURES),
  },
  [SectionNameEnum.IMMUNIZATIONS]: {
    hrefName: convertToHrefName(SectionNameEnum.IMMUNIZATIONS),
  },
  [SectionNameEnum.LABORATORY_TESTS_AND_RESULTS]: {
    hrefName: convertToHrefName(SectionNameEnum.LABORATORY_TESTS_AND_RESULTS),
  },
  [SectionNameEnum.LABORATORY_TESTS_AND_RESULTS_SHORT]: {
    hrefName: convertToHrefName(SectionNameEnum.LABORATORY_TESTS_AND_RESULTS),
  },
  [SectionNameEnum.VITAL_SIGNS]: {
    hrefName: convertToHrefName(SectionNameEnum.VITAL_SIGNS),
  },
  [SectionNameEnum.PATIENT_DEMOGRAPHICS]: {
    hrefName: convertToHrefName(SectionNameEnum.PATIENT_DEMOGRAPHICS),
  },
  [SectionNameEnum.PATIENT_DEMOGRAPHICS_SHORT]: {
    hrefName: convertToHrefName(SectionNameEnum.PATIENT_DEMOGRAPHICS),
  },
  [SectionNameEnum.ENCOUNTERS]: {
    hrefName: convertToHrefName(SectionNameEnum.ENCOUNTERS),
  },
  [SectionNameEnum.SOCIAL_HISTORY]: {
    hrefName: convertToHrefName(SectionNameEnum.SOCIAL_HISTORY),
  },
  [SectionNameEnum.MISCELLANEOUS]: {
    hrefName: convertToHrefName(SectionNameEnum.MISCELLANEOUS),
  },
  // Don't need to define since there will never be a link to Unknown
  // [SectionNameEnum.UNKNOWN]: {
  //   hrefName: '#' + SectionNameEnum.UNKNOWN.replaceAll(' ', '-').toLowerCase(),
  // },
}

export enum SortOrderEnum {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
}

export const sortOrderMap: { [sortOrderKey: string]: boolean } = {
  [SortOrderEnum.ASCENDING]: true,
  [SortOrderEnum.DESCENDING]: false,
}

export const SORT_ORDER_STARTING_VALUE: boolean = sortOrderMap[SortOrderEnum.ASCENDING]
