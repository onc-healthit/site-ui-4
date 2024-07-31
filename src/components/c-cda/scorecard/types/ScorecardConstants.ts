// old ui: ReferenceInstanceTypeEnum
export enum ReferenceInstanceEnum {
  IG_CONFORMANCE = 'C-CDA IG Conformance Errors',
  VOCAB = '2015 Edition Certification Feedback',
}

// old ui: categoryTypes
// 11 sections plus Unknown
export enum SectionNameEnum {
  PROBLEMS = 'Problems',
  MEDICATIONS = 'Medications',
  ALLERGIES = 'Allergies',
  PROCEDURES = 'Procedures',
  IMMUNIZATIONS = 'Immunizations',
  LABORATORY_TESTS_AND_RESULTS = 'Laboratory Tests and Results',
  VITAL_SIGNS = 'Vital Signs',
  PATIENT_DEMOGRAPHICS = 'Patient Demographics',
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
